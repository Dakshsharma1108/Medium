// import { Link } from "react-router-dom";
// import { Avatar } from "./BlogCard";

// interface AppBarProps {
//   Createblog: boolean;
// }

// export const AppBar = ({ Createblog }: AppBarProps) => {
//   return (
//     <div className="border-b flex justify-between items-center px-10 py-3">
//       {/* Left: Logo */}
//       <Link to="/blogs" className="flex flex-col justify-center">
//         <div className="font-semibold text-xl">Medium</div>
//       </Link>

//       {/* Right Section */}
//       <div className="flex items-center space-x-6">
//         {/* Conditionally show "Write" button */}
//         {!Createblog && (
//           <Link
//             to="/blog/new"
//             className="flex items-center gap-1 text-slate-600 hover:text-slate-800 transition-colors duration-200"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="24"
//               height="24"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="w-5 h-5"
//             >
//               <path
//                 fill="currentColor"
//                 d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
//               ></path>
//               <path
//                 stroke="currentColor"
//                 d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
//               ></path>
//             </svg>
//             <span className="text-sm">Write</span>
//           </Link>
//         )}

//         {/* Avatar always visible */}
//         <Avatar name="Daksh" size="big" />
//       </div>
//     </div>
//   );
// };
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

interface AppBarProps {
  Createblog?: boolean;
}

export const AppBar = ({ Createblog }: AppBarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
        {/* Left: Logo */}
        <Link to="/blogs" className="flex items-center space-x-2">
          <div className="font-bold text-2xl tracking-tight text-gray-800">
            Medium
          </div>
        </Link>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-6">
          {!Createblog && (
            <Link
              to="/blog/new"
              className="flex items-center gap-1 text-gray-700 hover:text-black transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5"
              >
                <path
                  fill="currentColor"
                  d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
                ></path>
                <path
                  stroke="currentColor"
                  d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
                ></path>
              </svg>
              <span className="text-sm font-medium">Write</span>
            </Link>
          )}

          {/* Avatar + Dropdown */}
          <div className="relative" ref={menuRef}>
            <div
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <Avatar name="Daksh" size="big" />
            </div>

            {menuOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl border rounded-xl overflow-hidden animate-fadeIn z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => {
                    setMenuOpen(false);
                    console.log("Logout clicked");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 hover:text-black focus:outline-none"
          onClick={() => setMobileMenu((prev) => !prev)}
        >
          {mobileMenu ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && (
        <div className="md:hidden border-t bg-white animate-slideDown shadow-md">
          <div className="flex flex-col p-3 space-y-2">
            {!Createblog && (
              <Link
                to="/blog/new"
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setMobileMenu(false)}
              >
                ✏️ Write
              </Link>
            )}
            <Link
              to="/profile"
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setMobileMenu(false)}
            >
              👤 Profile
            </Link>
            <button
              onClick={() => {
                setMobileMenu(false);
                console.log("Logout clicked");
              }}
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition text-left"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
