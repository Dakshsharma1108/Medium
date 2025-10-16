import { useParams } from "react-router-dom"
import { useBlog } from "../hooks"
import { FullBlog } from "../Components/FullBlog";
import { AppBar } from "../Components/AppBar";
import { FullBlogSkeleton } from "../Components/Skeleton";

export function Blog(){
    const {id} = useParams()
  const {loading ,blog} = useBlog({
        id: id || ""
  })

  if (loading || !blog) {
    return (
      <div>
        <AppBar/>
        <FullBlogSkeleton/>
        </div>
    );
  }
  return (
    <>
    <FullBlog blog={blog}/>
    {/* {console.log(blog)} */}
    </>
  )
}