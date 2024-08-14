import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { Image } from "../../types/ImageTypes";

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
            <ImageCard
              image={item}
              onClick={(event: React.MouseEvent<HTMLImageElement>) =>
                openModal(item)
              } // Типізація onClick
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ImageGallery;
