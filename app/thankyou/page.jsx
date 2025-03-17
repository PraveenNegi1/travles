export default function ThankYouPage() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#f0f4f8] to-[#d9eaf1] ">
        <div className="bg-white p-8 rounded-2xl max-w-md text-center shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl">
          <h1 className="text-4xl font-extrabold text-[#0563a1] mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Your request has been received. We&apos;ll get back to you shortly.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-[#0b4856] to-[#A1C5CD] text-white font-semibold rounded-full shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            Back to Home
          </a>
        </div>
      </div>
    </>
  );
}
