import css from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {

    return (
    <p className={css.errorMessage}>Oops! An error occurred while fetching the images. Please try again!
</p>)
};
export default ErrorMessage;