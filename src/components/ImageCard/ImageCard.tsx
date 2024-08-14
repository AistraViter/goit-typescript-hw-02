import css from "./ImageCard.module.css";

interface Image {
  urls: {
    small: string;
  };
  alt_description?: string;
  width: number | null;
  height: number | null;
}

interface ImageCardProps {
  image: Image;
  onClick: (event: React.MouseEvent<HTMLImageElement>) => void;
}
const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  const imageUrl: string = image.urls.small;
  let orientation: string | null = null;

  if (image.width !== null && image.height !== null) {
    if (
      Math.abs(image.width - image.height) <
      0.1 * Math.max(image.width, image.height)
    ) {
      orientation = "squarish";
    } else if (image.width > image.height) {
      orientation = "landscape";
    } else {
      orientation = "portrait";
    }
  }
  return (
    <div className={css.imageCard} onClick={onClick}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={image.alt_description || "Image without description"}
        />
      ) : (
        <span>No image available</span>
      )}
      <span>{orientation}</span>
    </div>
  );
};
export default ImageCard;
