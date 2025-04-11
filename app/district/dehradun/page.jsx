"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Tapkeshwar Temple",
      description:
        "Tapkeshwar Temple is a popular cave temple dedicated to Lord Shiva. It is known for the continuous water droplets falling on the Shivling.",
      image: "/tapkeshwar-temple.jpg",
    },
    {
      name: "Sai Darbar Temple",
      description:
        "Sai Darbar Temple is a peaceful shrine dedicated to Sai Baba. The temple is adorned with beautiful marble architecture and peaceful surroundings.",
      image: "/Sai-Darbar-Temple-Dehradun-Uttarakhand.jpg",
    },
    {
      name: "Mindrolling Monastery",
      description:
        "Mindrolling Monastery is one of the largest Buddhist centers in India. It features a 60-meter tall stupa and beautiful wall paintings.",
      image: "/mindrolling-monastery.jpeg",
    },
    {
      name: "Shiv Mandir",
      description:
        "Shiv Mandir is a sacred temple dedicated to Lord Shiva, located on the Mussoorie road. It attracts devotees throughout the year.",
      image: "/shivmandir.avif",
    },
  ];

  const trekkingPlaces = [
    {
      name: "George Everest Trek",
      description:
        "George Everest Trek offers a scenic trail leading to the historic house of Sir George Everest. It provides panoramic views of the Doon Valley and the Himalayas.",
      image: "/georgeEverest.webp",
    },
    {
      name: "Nag Tibba Trek",
      description:
        "Nag Tibba Trek is a popular weekend trek known for its breathtaking views of the snow-capped peaks and rich flora and fauna.",
      image: "/nag-tibba-range.jpg",
    },
    {
      name: "Robber's Cave Trek",
      description:
        "Robber's Cave is a narrow gorge formed by a river. It is a popular spot for trekking and exploring the natural rock formations.",
      image: "/Robbers-Caves.jpg",
    },
    {
      name: "Bhadraj Temple Trek",
      description:
        "Bhadraj Temple Trek leads to the Bhadraj Temple, dedicated to Lord Balbhadra. The trek offers stunning views of the Doon Valley and Chakrata ranges.",
      image: "/bhadraj-temple.webp",
    },
  ];

  const CountUp = ({ end, duration }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let startTime;
      let animationFrame;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;

        if (progress < duration) {
          setCount(Math.floor((progress / duration) * end));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <>{count.toLocaleString()}</>;
  };

  const StatCard = ({ icon, value, unit, label, district }) => {
    return (
      <div className="bg-[#205781] p-8 flex flex-col items-center text-center">
        <div className="text-[#FAF1E6] mb-3">{icon}</div>
        <div className="text-[#FAF1E6] text-5xl font-bold mb-1">
          <CountUp end={value} duration={5000} />
          {unit}
        </div>
        <div className="text-[#FAF1E6] text-xl mb-2">{label}</div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1664310448423-1883f165b607?q=80&w=2187&auto=format&fit=crop"
          alt="Dehradun"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Dehradun
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Dehradun, the capital of Uttarakhand, is known for its picturesque
          landscapes, religious landmarks, and adventurous trekking routes. It
          serves as a gateway to the Garhwal Himalayas.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nestled in the Doon Valley, Dehradun is surrounded by the Shivalik
          Hills and the Ganges River, offering breathtaking views and a pleasant
          climate throughout the year. The city&apos;s rich history is reflected
          in its colonial-era architecture and the presence of prestigious
          institutions like the Forest Research Institute (FRI) and the Indian
          Military Academy (IMA).
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Dehradun is also a hub for spiritual seekers, with prominent temples
          such as the Tapkeshwar Temple, dedicated to Lord Shiva, and the
          Mindrolling Monastery, a center of Tibetan Buddhism. Robber's Cave
          (Guchhupani), a natural limestone formation with flowing streams, is a
          popular spot for exploration and relaxation.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure enthusiasts can explore trekking routes to nearby
          destinations like Mussoorie and Chakrata, while nature lovers can
          visit the Rajaji National Park, home to elephants, leopards, and a
          rich variety of bird species. Sahastradhara, meaning 'Thousandfold
          Spring,' is known for its therapeutic sulphur water and stunning
          natural beauty.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The city&apos;s vibrant culture is reflected in its bustling markets,
          where visitors can shop for handicrafts, woolens, and local
          delicacies. Dehradun&apos;s mix of natural beauty, adventure,
          spirituality, and modern comforts makes it a captivating destination
          for all kinds of travelers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto my-12">
        <StatCard
          icon={
            <svg
              className="w-8 h-8 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
              />
            </svg>
          }
          value={3088}
          unit="km²"
          label="Area"
          district="Dehradun"
        />
        <StatCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          }
          value={1696694}
          unit=""
          label="Population"
          district="Dehradun"
        />
        <StatCard
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
            </svg>
          }
          value={84.25}
          unit="%"
          label="Literacy Rate"
          district="Dehradun"
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Dehradun
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {religiousPlaces.map((place, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-t-4 border-blue-500"
            >
              <Image
                src={place.image}
                alt={place.name}
                width={1000}
                height={1000}
                className="rounded-lg mb-4 h-[250px] w-full object-cover "
              />
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {place.name}
              </h3>
              <p className="text-gray-700 font-serif">{place.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Trekking Places in Dehradun
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trekkingPlaces.map((place, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-t-4 border-green-500"
            >
              <Image
                src={place.image}
                alt={place.name}
                width={1000}
                height={1000}
                className="rounded-lg mb-4 h-[250px] w-full object-cover "
              />
              <h3 className="text-xl font-bold text-green-600 mb-2">
                {place.name}
              </h3>
              <p className="text-gray-700 font-serif">{place.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
