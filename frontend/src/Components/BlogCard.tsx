// import { Link } from "react-router-dom";

// interface CardProps {
//   authorname: string;
//   title: string;
//   content: string;
//   date: string;
//   id:string
// }
export function Avatar({ name ,size = 'small'}: { name: string ,size : "small" | "big"}) {
    return (
      <div className={`relative inline-flex items-center justify-center ${size==='small' ? "w-5 h-5":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className={`font-medium ${size==='small'?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>
          {name[0]}
        </span>
      </div>
    );
  }

// export const BlogCard = ({
//   authorname,
//   title,
//   content,
//   date,
//   id
// }: CardProps) => {
//   function Circle() {
//     return <div className="h-1 w-1 rounded-full bg-slate-400 "></div>;
//   }

  
//   return (
//     <Link to={`/blog/${id}`}>
//     <div className=" pt-1 lg:p-4 border-b border-slate-200 pb-4 cursor-pointer">
//       <div className="flex">
//         <div className="flex justify-center flex-col">
//           <Avatar name={authorname} size="small"/>
//         </div>
//         <div className="font-extralight pl-2">{authorname}</div>
//         <div className="flex justify-center flex-col pl-2">
//           <Circle />
//         </div>
//         <div className="pl-2 font-thin text-slate-500">{date}</div>
//       </div>
//       <div className="text-xl font-bold pt-2">{title}</div>
//       <div className="text-md font-thin">{content.slice(0,100) + "..."}</div>
//       <div className="text-slate-400 text-sm font-thin pt-2">
//         {`${Math.ceil(content.length / 100)} minutes(s) read`}
//       </div>
//     </div>
//     </Link>
//   );
// };
import { Link } from "react-router-dom";// adjust the import path

interface CardProps {
  id: string;
  authorname: string;
  title: string;
  content: string;
  date: string; // createdAt ISO string from backend
}

export const BlogCard = ({
  authorname,
  title,
  content,
  date,
  id,
  
}: CardProps) => {
  function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
  }

  // Format date inside the component
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Link to={`/blog/${id}`}>
      <div className="pt-1 lg:p-4 border-b border-slate-200 pb-4 cursor-pointer hover:bg-slate-50 transition-colors">
        {/* Author + Date */}
        <div className="flex items-center">
          <Avatar name={authorname} size="small" />
          <div className="font-extralight pl-2">{authorname}</div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-500">{formattedDate}</div>
        </div>

        {/* Title */}
        <div className="text-xl font-bold pt-2">{title}</div>

        {/* Content preview */}
        <div className="text-md font-thin">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>

        {/* Read time */}
        <div className="text-slate-400 text-sm font-thin pt-2">
          {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
      </div>
    </Link>
  );
};
