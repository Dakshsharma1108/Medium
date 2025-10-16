import { type ChangeEvent } from "react";
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
              className="text-white bg-gray-800 w-sm  hover:bg-gray-900 focus:outline-none  focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
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
  return (
    <>
      <div>
        <label className=" mb-2 text-sm font-bold text-black  text-center ">
          {Label || null}
        </label>
        <input
          type={type}
          onChange={onChangeInput}
          minLength={type== "password"? 6:undefined}
          className={`bg-gray-50 ${
            size == "large" ? "p-8" : ""
          } text-left border border-gray-300  text-sm rounded-lg  block w-sm mt-3  p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black`}
          placeholder={Placeholder}
          required
        />
      </div>
    </>
  );
}

export function LaballedTextarea({ Placeholder, onChangeTextArea }: Inputs) {
  return (
    <textarea
      onChange={onChangeTextArea}
      className={`block p-2.5 w-sm text-sm h-32 text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black`}
      placeholder={Placeholder}
      required
    ></textarea>
  );
}
