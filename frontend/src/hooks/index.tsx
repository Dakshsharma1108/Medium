import axios from "axios";
import { useEffect, useState } from "react";
import { Api } from "../config";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../Components/Alerts";

// Export the auth protection hook
export { useAuthProtection } from './useAuthProtection';

export interface Blog {
  id: string;
  title: string;
  content: string;
  createdAt: string; // from Prisma
  author: {
    name: string;
  };
  formattedDate: string; // optional computed field
  day?: number;
  monthShort?: string;
  year?: number;
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
   axios
    .get(`${Api}/blog/all`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      const blogsWithDates = response.data.map((blog: Blog) => {
        const date = new Date(blog.createdAt);
        const day = date.getDate();
        const monthShort = date.toLocaleString("en-US", { month: "short" });
        const year = date.getFullYear();
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return {
          ...blog,
          day,
          monthShort,
          year,
          formattedDate,
        };
      });

      setBlogs(blogsWithDates);
      setLoading(false);
    });
  }, []);
  return {
    loading,
    blogs,
  };
};

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${Api}/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        console.log(response.data);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

interface postinputs {
  name?: string;
  email?: string;
  password?: string;
  title?: string;
  content?: string;
}

export function useAuth(type: "Signup" | "Signin") {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<postinputs>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();
  
  async function sendRequest() {
    setLoading(true);
    try {
      const endpoint = `${Api}/auth/${type === "Signup" ? "signup" : "signin"}`;
      const response = await axios.post(endpoint, postInputs);

      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);

      showSuccess(response.data.message, type === "Signup" ? "Account Created!" : "Welcome Back!");
      navigate("/blogs");
    } catch (error: any) {
      console.error(error);
      showError(
        error?.response?.data?.message || "Authentication failed",
        type === "Signup" ? "Signup Failed" : "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    postInputs,
    setPostInputs,
    sendRequest,
  };
}

export function useCreateBlog() {
  const [loading, setLoading] = useState(false);
  const [postInputs, setPostInputs] = useState<postinputs>({
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const { showSuccess, showError } = useAlert();

  async function sendRequest() {
    setLoading(true);
    try {
      const endpoint = `${Api}/blog/create`;
      const response = await axios.post(endpoint, postInputs, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      showSuccess(response.data.message, "Blog Published!");
      navigate("/blogs");
    } catch (error: any) {
      console.error(error);
      showError(
        error?.response?.data?.message || "Something went wrong",
        "Publication Failed"
      );
    } finally {
      setLoading(false);
    }
  }
  return {
    loading,
    postInputs,
    setPostInputs,
    sendRequest,
  };
}
