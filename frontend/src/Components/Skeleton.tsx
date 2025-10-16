export const BlogSkeleton = () => {
  return (
    <div>
      <div className="flex animate-pulse justify-center lg:pt-4 lg:pr-12 pt-2">
        <div className="ms-4 mt-2  md:max-w-2xl sm:w-full lg:w-lg border-b  pb-4 border-slate-200">
          <ul className="mt-5 space-y-3">
            <li className="flex items-center space-x-2">
              <span className="size-5 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
              <div className="w-1/3 h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></div>
            </li>
            <li className="w-sm lg:w-lg h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="w-sm lg:w-lg h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="w-sm lg:w-lg h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const FullBlogSkeleton = () => {
  return (
    <div className="flex animate-pulse justify-center">
      <div className="grid lg:grid-cols-12 sm:grid-cols-2 px-10 w-full pt-20 max-w-screen-xl">
        {/* Left Section - Blog Content */}
        <div className="col-span-12 md:col-span-8">
          <ul className="space-y-4">
            {/* Title */}
            <li className="h-10 w-3/4 lg:w-sm bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            {/* Date */}
            <li className="h-4 w-50 lg:w-60 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            {/* Content lines */}
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700 pt-2"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            <li className="h-6 sm:w-full lg:w-lg bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          </ul>
        </div>

        {/* Right Section - Author Info */}
        <div className="col-span-12 md:col-span-4 mt-10 md:mt-0">
          {/* "Author" heading */}
          <div className="h-6 w-1/4 bg-gray-200 rounded-full dark:bg-neutral-700 mb-6"></div>

          <div className="flex w-full">
            {/* Avatar */}
            <div className="pr-4 flex flex-col justify-center">
              <span className="w-10 h-10 bg-gray-200 rounded-full dark:bg-neutral-700"></span>
            </div>

            {/* Author Info Lines */}
            <ul className="space-y-3 w-full">
              <li className="h-5 w-1/2 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="h-4 w-3/4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
              <li className="h-4 w-2/3 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
