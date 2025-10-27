import { type ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { MediumLoader } from "./Loader";
import { Quote } from "./Quote";
import { useAuth } from "../hooks";


export function Auth({ type }: { type: "Signup" | "Signin" }) {
  const { loading, postInputs, setPostInputs, sendRequest } = useAuth(type);

  return (
    <>
      {loading ? (
        <div>
          <MediumLoader />
        </div>
      ) : null}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Stop normal form submission
            sendRequest(); // Call your async function
          }}
          className="flex justify-center h-screen flex-col"
        >
          <div className=" flex justify-center">
            <div className="max-w-lg">
              <div className="text-3xl font-extrabold">
                {type === "Signup"
                  ? "Create An Account"
                  : "Login to your Account"}
              </div>
              <div className="text-slate-400">
                {type === "Signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  to={type === "Signin" ? "/signup" : "/signin"}
                  className="underline"
                >
                  {type === "Signin" ? "Signup" : "Signin"}
                </Link>
              </div>
            </div>
          </div>
          {type === "Signup" ? (
            <div className=" flex justify-center mt-6">
              <LaballedInput
                Label="Name"
                Placeholder="Enter your name"
                type="text"
                onChangeInput={(e) => {
                  setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  });
                }}
              />
            </div>
          ) : null}
          <div className=" flex justify-center mt-6">
            <LaballedInput
              Label="Email"
              Placeholder="xyz@example.com"
              type="Email"
              onChangeInput={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className=" flex justify-center mt-6">
            <LaballedInput
              Label="Password"
              Placeholder="123456"
              type="Password"
              onChangeInput={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className=" flex justify-center mt-6">
            <button
              type="submit"
              className="text-white bg-gray-800 w-85 lg:w-sm  hover:bg-gray-900 focus:outline-none  focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type == "Signin" ? "Sign in" : "Sign Up"}
            </button>
          </div>
        </form>
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </>
  );
}

export interface Inputs {
  Label?: string;
  Placeholder: string;
  type?: string;
  onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChangeTextArea?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  size?: "small" | "large";
}
export function LaballedInput({
  Label,
  Placeholder,
  onChangeInput,
  type,
  size,
}: Inputs) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type?.toLowerCase() === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;

  return (
    <>
      <div>
        <label className=" mb-2 text-sm font-bold text-black  text-center ">
          {Label || null}
        </label>
        <div className="relative">
          <input
            type={inputType}
            onChange={onChangeInput}
            minLength={type == "password" ? 6 : undefined}
            className={`bg-gray-50 ${
              size == "large" ? "p-8" : ""
            } text-left border border-gray-300 text-sm rounded-lg block w-86 lg:w-sm mt-3 p-2.5 ${
              isPasswordField ? "pr-12" : ""
            } dark:border-gray-600 dark:placeholder-gray-400 dark:text-black`}
            placeholder={Placeholder}
            required
          />
          {isPasswordField && (
            <button
              type="button"
              className="absolute right-3 top-1/3 transform -translate-y-1/2 mt-1.5 text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                // Hide password icon (eye with slash)
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              ) : (
                // Show password icon (eye)
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export function LaballedTextarea({ Placeholder, onChangeTextArea }: Inputs) {
  return (
    <textarea
      onChange={onChangeTextArea}
      className={`block p-2.5 lg:w-sm w-86 text-sm h-32 text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black`}
      placeholder={Placeholder}
      required
    ></textarea>
  );
}
