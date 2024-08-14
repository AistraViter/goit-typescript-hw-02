import { Formik, Form, Field } from "formik";
import { PiMagnifyingGlass } from "react-icons/pi";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (topic: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const initialValues = {
    topic: "",
  };

  const handleSubmit = (values: typeof initialValues, actions: any) => {
    if (values.topic.trim() === "") {
      toast.error("Please enter search term!");
      return;
    }

    onSearch(values.topic);
    actions.resetForm();
  };
  // Типізація onClick події
  const handleIconClick = (event: React.MouseEvent<SVGElement>) => {
    // Викликаємо handleSubmit при натисканні на іконку
    // Тут ви можете або викликати handleSubmit, або просто логіку
    console.log("Icon clicked");
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ handleSubmit }) => (
          <Form className={css.searchBar} onSubmit={handleSubmit}>
            <div className={css.searchBarInputContainer}>
              <PiMagnifyingGlass
                className={css.searchBarIcon}
                onClick={(e) => {
                  handleIconClick(e);
                  handleSubmit(); // Виклик handleSubmit для виконання логіки форми
                }}
              />
              <Field
                type="text"
                name="topic"
                placeholder="Search images and photos"
              />
            </div>
          </Form>
        )}
      </Formik>
      <Toaster />
    </>
  );
};

export default SearchBar;
