import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="px-4 py-10">
      <div>
        <div>
          <label
            htmlFor="file"
            className="flex items-center justify-center w-full h-48 py-6 text-gray-600 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:text-orange-500 hover:border-orange-500"
          >
            <svg
              className="w-12 h-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-label="파일 업로드"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="sr-only">파일 업로드</span>
            <input className="hidden" id="file" type="file" />
          </label>
        </div>
      </div>
      <div className="my-5">
        <label
          className="block mb-1 text-sm font-medium text-gray-700"
          htmlFor="price"
        >
          Price
        </label>
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500 pointer-events-none">$</span>
          </div>
          <input
            className="w-full px-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 pl-7"
            id="price"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label
          className="block mb-1 text-sm font-medium text-gray-700"
          htmlFor="textArea"
        >
          Description
        </label>
        <textarea
          className="w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          id="textArea"
          rows={4}
        />
      </div>
      <button
        className="w-full px-4 py-2 mt-5 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md shadow-sm hover:bg-orange-600 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
        type="button"
      >
        Upload product
      </button>
    </div>
  );
};

export default Upload;