import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description?: string;
  width: number | null;
  height: number | null;
}
interface ImageGalleryProps {
  items: Image[];
  openModal: (image: Image) => void; // Змінили тип на (image: Image) => void
}


const ImageGallery: React.FC<ImageGalleryProps> = ({ items, openModal }) => {
  return (
    <div>
      <ul className={css.imageGallery}>
        {items.map((item) => (
          <li key={item.id}>
            <ImageCard image={item} 
              onClick={(event: React.MouseEvent<HTMLImageElement>) => openModal(item)} // Типізація onClick
              />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImageGallery;
