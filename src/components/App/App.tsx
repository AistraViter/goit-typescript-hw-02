import { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../../gallery-api";
import { Image } from "../../types/ImageTypes";
import css from "./App.module.css";

interface AppProps {
  errorMessage?: string; // Може бути необов'язковим
}


const App: React.FC<AppProps> = ({ errorMessage }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState <boolean>(false);
  const [loadMore, setLoadMore] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);


  const imagesContainerRef = useRef<HTMLDivElement | null>(null); // Типізація рефу

  const handleSearch = async (newTopic: string) => {
    setImages([]);
    setTopic(newTopic);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < Math.min(totalPages, 200)) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (!topic) return; // Перевірка на порожній topic
    async function getImages() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchImages(topic, page);
        setImages((prevImages) => {
          return [...prevImages, ...data.results];
        });
        setTotalPages(data.total_pages);
        if (page === Math.min(data.total_pages, 200)) {
          toast.success(
            errorMessage ||
              "We're sorry, but you've reached the end of search results."
          );
        }
        if (data.results.length === 0) {
          toast.error(
            errorMessage ||
              "Sorry, there are no images matching your search query. Please try again!"
          );
        }

        setLoadMore(page < Math.min(data.total_pages, 200)); // Set loadMore only if there are more pages to load
      } catch (error) {
        setError(true);
        toast.error(
          errorMessage ||
            "Oops! An error occurred while fetching the images. Please try again!"
        );
      } finally {
        setLoading(false);
      }
    }
    getImages();
  }, [topic, page, errorMessage]);

  // Прокрутка вниз до контейнера зображень після оновлення зображень

  useEffect(() => {
    if (imagesContainerRef.current) {
      const containerBottom =
        imagesContainerRef.current.offsetTop +
        imagesContainerRef.current.clientHeight;

      const imageHeight = 220;
      const offset = imageHeight * 4;

      window.scrollTo({
        top: containerBottom - offset, // Прокрутка до нижнього краю контейнера з підняттям на половину зображення
        behavior: "smooth", // Додає плавну прокрутку
      });
    }
  }, [images]); // Залежність від зображень

  // Мадальне вікно

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <header className={css.header}>
        <SearchBar onSearch={handleSearch} />
      </header>
      <div className={css.container} ref={imagesContainerRef}>
        {loading && <Loader />}
        {error && <ErrorMessage />}
        {images.length > 0 && (
          <ImageGallery items={images} openModal={openModal} />
        )}
        {loadMore && page < totalPages && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
        <Toaster />
        {selectedImage && (
          <ImageModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            selectedImage={selectedImage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
