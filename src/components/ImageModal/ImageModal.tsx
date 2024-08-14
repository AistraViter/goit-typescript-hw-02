import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface Image {
  urls: {
    regular: string;
  };
  alt_description?: string;
}

interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  selectedImage?: Image | null; // Може бути undefined або null, якщо зображення не вибрано
}



const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, selectedImage }) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Image Modal"
      className={css.imageModalContent}
      overlayClassName={css.imageModalOverlay}
    >
      {
        selectedImage && (
          <div className={css.imageModalContainer} onClick={onRequestClose}>
            <img
              src={selectedImage.urls.regular}
              alt={selectedImage.alt_description || "Image without description"}
              onClick={(e: React.MouseEvent<HTMLImageElement>) => e.stopPropagation()} // Типізація обробника події
              />
          </div>
        )
      }
    </Modal>
)};
export default ImageModal;
