import { AppBar } from "../Components/AppBar";
import { LaballedInput, LaballedTextarea } from "../Components/Auth";
import { MediumLoader } from "../Components/Loader";
import { useCreateBlog } from "../hooks";

export const CreateBlog = () => {
  const { loading, postInputs, setPostInputs, sendRequest } = useCreateBlog();

  return (
    <div>
      <AppBar Createblog />
     <div className="flex justify-center pt-4">
        {loading ? <MediumLoader /> : null}
      </div>
      <div className="grid grid-cols-1">
      <div className="flex justify-center pt-4">
        <div className="text-4xl font-extrabold">Write your Blog</div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault(); // Stop normal form submission
          sendRequest(); // Correctly call async function
        }}
      >
        <div className="flex justify-center pt-4">
          <LaballedInput
            Label=""
            Placeholder="Enter title"
            type="text"
            onChangeInput={(e) => {
              setPostInputs({
                ...postInputs,
                title: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex justify-center pt-4">
          <LaballedTextarea
            Placeholder="Write your thoughts about it..."
            onChangeTextArea={(e) => {
              setPostInputs({
                ...postInputs,
                content: e.target.value,
              });
            }}
          />
        </div>

        <div className="flex justify-center mr-72 pt-4">
          <button
            type="submit"
            className="text-white border border-gray-800 bg-gray-900 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
          >
            Publish
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

