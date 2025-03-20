import React from "react";

export default function Page() {
  return (
    <div> 
      <h1 className="justify-center text-center text-5xl font-bold font-serif mt-4">
        About Us
      </h1>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center merriweather">
          Explore the World with Travels
        </h1>

        <div className="merriweather text-[20px]">
        <p className=" text-gray-700 leading-relaxed mb-4">
          Welcome to{" "}
          <span className="font-semibold text-blue-600">Travels</span> — your
          gateway to unforgettable adventures! We believe that traveling should
          be easy, exciting, and stress-free. That&apos;s why we&apos;ve
          designed a platform that helps you explore the world effortlessly,
          with carefully curated destinations and seamless booking experiences.
        </p>
        <p className=" text-gray-700 leading-relaxed mb-4">
          Whether you&apos;re planning a relaxing beach getaway, an adventurous
          mountain trek, or a cultural city tour, Travels has got you covered.
          Discover hidden gems, enjoy exclusive travel deals, and let us handle
          the details so you can focus on making memories.
        </p>
        </div>
        <div className="md:flex items-center gap-6 mb-6 merriweather">
          <div className="flex-1 bg-blue-50 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">
              Tailored Itineraries
            </h3>
            <p className="text-gray-600">
              Get personalized travel plans designed to match your preferences
              and budget.
            </p>
          </div>
          <div className="flex-1 bg-green-50 p-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105 hover:shadow-xl mt-6 md:mt-0">
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Hassle-Free Booking
            </h3>
            <p className="text-gray-600">
              Enjoy easy and secure booking with 24/7 customer support.
            </p>
          </div>
        </div>
        <p className=" text-gray-700 leading-relaxed merriweather text-[20px]">
          Thank you for choosing Travels. Let us make your next journey
          unforgettable. Start exploring today!
        </p>
      </div>
    </div>
  );
}
