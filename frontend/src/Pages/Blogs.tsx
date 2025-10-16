
import { AppBar } from "../Components/AppBar";
import { BlogCard } from "../Components/BlogCard";
import { BlogSkeleton } from "../Components/Skeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="max-w-xl w-full px-4 mt-8 space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                id={blog.id}
                key={blog.id}
                authorname={blog.author.name || "Daksh"}
                title={blog.title}
                content={blog.content}
                date={blog.formattedDate} // you can replace this with blog.date if available
              />
            ))
          ) : (
            <div className="text-center text-gray-500">No blogs available.</div>
          )}
        </div>
      </div>
    </div>
  );
};
