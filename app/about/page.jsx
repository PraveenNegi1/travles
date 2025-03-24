import React from "react";

export default function Page() {
  return (
    <div>
      <h1 className="justify-center text-center md:text-5xl text-3xl font-bold font-serif mt-4">
        About Us
      </h1>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h1 className="md:text-3xl text-2xl font-bold text-gray-900 mb-6 text-center merriweather">
          Explore the Beauty of Uttarakhand with Us
        </h1>

        <div className="merriweather md:text-[20px]">
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to{" "}
            <span className="font-semibold text-blue-600">Travels</span> — your
            trusted companion for exploring the divine land of Uttarakhand!
            Known as the "Land of Gods," Uttarakhand is a paradise of
            breathtaking landscapes, serene pilgrimage sites, and thrilling
            adventure spots. Our mission is to make your journey through
            Uttarakhand seamless, enjoyable, and unforgettable.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            Whether you wish to seek blessings at the sacred{" "}
            <span className="font-semibold text-blue-600">Char Dham</span>{" "}
            pilgrimage, unwind in the peaceful hill stations of{" "}
            <span className="font-semibold text-blue-600">Nainital</span> and{" "}
            <span className="font-semibold text-blue-600">Mussoorie</span>, or
            challenge yourself with thrilling treks in{" "}
            <span className="font-semibold text-blue-600">Kedarkantha</span> and{" "}
            <span className="font-semibold text-blue-600">
              Valley of Flowers
            </span>
            , we have got you covered. Our expert-curated travel plans help you
            experience the magic of Uttarakhand in the best possible way.
          </p>
        </div>

        {/* <div className="md:flex items-center gap-6 mb-6 merriweather">
          <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Tailored Itineraries
            </h3>
            <p className="text-gray-600">
              Get customized travel plans suited to your preferences and budget,
              ensuring a hassle-free experience.
            </p>
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl mt-6 md:mt-0">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Hassle-Free Booking
            </h3>
            <p className="text-gray-600">
              Enjoy secure bookings, guided tours, and 24/7 customer support for
              a stress-free travel experience.
            </p>
          </div>
        </div> */}

        <div className="bg-gray-100 p-6 rounded-xl shadow-md merriweather">
          <h2 className="md:text-3xl text-2xl font-bold text-gray-900 mb-4 text-center">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700 md:text-[20px] leading-relaxed">
            <li>
              <span className="font-semibold text-blue-600">
                Authentic Local Experience:
              </span>{" "}
              Explore hidden gems and cultural sites guided by local experts.
            </li>
            <li>
              <span className="font-semibold text-blue-600">
                Adventure & Nature:
              </span>{" "}
              From river rafting in Rishikesh to wildlife safaris in Jim
              Corbett, experience the thrill of nature.
            </li>
            <li>
              <span className="font-semibold text-blue-600">
                Affordable Packages:
              </span>{" "}
              Budget-friendly tours with premium services to make your trip
              memorable.
            </li>
            <li>
              <span className="font-semibold text-blue-600">
                Eco-Friendly Tourism:
              </span>{" "}
              We promote sustainable travel to preserve the beauty of
              Uttarakhand.
            </li>
          </ul>
        </div>

        <p className="text-gray-700 leading-relaxed merriweather md:text-[20px] mt-6">
          Thank you for choosing Travels. Let us make your journey truly
          special. Start exploring today and discover the wonders of this
          heavenly state!
        </p>
      </div>
    </div>
  );
}
