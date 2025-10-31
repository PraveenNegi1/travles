export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-blue-400 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-teal-500 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-cyan-400 animate-pulse"></div>
      </div>

      <div className="relative z-10 bg-white p-10 rounded-3xl max-w-md w-full text-center shadow-lg backdrop-blur-sm bg-opacity-90 border border-blue-100">
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-[#205781] to-cyan-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#205781] to-cyan-800">
          Thank You!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Your request has been received. We'll get back to you shortly.
        </p>

        <div className="mb-8 w-1/2 h-1 mx-auto rounded-full bg-gradient-to-r from-[#205781] to-teal-100"></div>

        <a
          href="/"
          className=" px-8 py-4 bg-gradient-to-r from-[#205781] to-cyan-800 text-white font-semibold rounded-full shadow-lg transition duration-300 transform hover:translate-y-1 hover:shadow-xl flex items-center justify-center space-x-2"
        >
          <span>Back to Home</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
