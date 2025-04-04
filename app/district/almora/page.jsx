"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Jageshwar Temple",
      description:
        "Jageshwar Temple is a complex of over 100 stone temples dedicated to Lord Shiva. It is known for its ancient architecture and spiritual significance, located amidst deodar forests.",
      image: "/jageshwartample.jpg",
    },
    {
      name: "Katarmal Sun Temple",
      description:
        "Built in the 9th century, Katarmal Sun Temple is dedicated to the Sun God. It is an architectural marvel with intricate carvings and panoramic views of the surrounding hills.",
      image: "/katarmaltample.gif",
    },
    {
      name: "Kasaar Devi Temple",
      description:
        "Kasaar Devi Temple, perched on a hilltop, is known for its magnetic field similar to that of Machu Picchu. It offers stunning views of the Himalayas and attracts spiritual seekers.",
      image: "/Kasar-Devi-Template.jpg",
    },
    {
      name: "Chitai Golu Devta Temple",
      description:
        "Dedicated to Golu Devta, the god of justice, Chitai Temple is famous for its thousands of hanging bells offered by devotees as a symbol of fulfilled wishes.",
      image: "/chitaigolutample.jpg",
    },
  ];

  const trekkingPlaces = [
    {
      name: "Binsar Wildlife Sanctuary",
      description:
        "Binsar Wildlife Sanctuary is a paradise for nature lovers and trekkers. It offers lush greenery, diverse wildlife, and breathtaking views of the Himalayan peaks.",
      image: "/binsar-wildlife-sanctuary-almora-uttarakhand.jpeg",
    },
    {
      name: "Zero Point",
      description:
        "Zero Point is the highest point in Binsar Wildlife Sanctuary. It provides panoramic views of famous Himalayan peaks like Nanda Devi, Kedarnath, and Trishul.",
      image: "/zeropoint.jpg",
    },
    {
      name: "Pindari Glacier Trek",
      description:
        "Pindari Glacier Trek is a challenging yet rewarding trek. It passes through picturesque villages, alpine meadows, and offers views of the majestic Pindari Glacier.",
      image: "/pindariglacier.jpg",
    },
    {
      name: "Kasar Devi Hill",
      description:
        "Kasar Devi Hill is known for its spiritual energy and natural beauty. It offers scenic trails and a peaceful atmosphere, making it a perfect spot for meditation and hiking.",
      image: "/kasarhills.jpg",
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
          <CountUp end={value} duration={2000} />
          {unit}
        </div>
        <div className="text-[#FAF1E6] text-xl mb-2">{label}</div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1588305665522-1c6af1f69b09?q=80&w=2070&auto=format&fit=crop"
          alt="Almora"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center mb-8 merriweather">
        <h1 className="md:text-5xl text-3xl font-serif font-bold text-gray-800 mb-4">
          Almora
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">
          Almora, known for its rich cultural heritage and stunning landscapes,
          is a picturesque district in Uttarakhand. Surrounded by the majestic
          Himalayas, Almora offers a perfect blend of spirituality, adventure,
          and natural beauty.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Established in 1568 by King Kalyan Chand, Almora is renowned for its
          ancient temples, including the Nanda Devi and Kasar Devi temples,
          which hold deep spiritual significance. The town's cobbled streets,
          traditional wooden houses, and bustling local markets reflect its
          vibrant history and culture.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          Almora is also a paradise for nature lovers and adventure enthusiasts.
          The panoramic views of the snow-clad Himalayas from Bright End Corner
          are mesmerizing, while treks to nearby destinations like Zero Point in
          Binsar Wildlife Sanctuary and Katarmal Sun Temple offer a thrilling
          experience.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4">
          The town is famous for its delicious local cuisine, especially "Bal
          Mithai" and "Singori," which are a must-try for visitors.
          Almora&apos;s pleasant weather, rich biodiversity, and warm
          hospitality make it an ideal destination for a rejuvenating escape
          into the lap of nature.
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
          value={3082}
          unit="km²"
          label="Area"
          district="Almora"
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
          value={622506}
          unit=""
          label="Population"
          district="Almora"
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
          value={81.06}
          unit="%"
          label="Literacy Rate"
          district="Almora"
        />
      </div>

      <div className="mb-12 merriweather">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Religious Places in Almora
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {place.name}
              </h3>
              <p className="text-gray-700">{place.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="merriweather">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Trekking Places in Almora
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                {place.name}
              </h3>
              <p className="text-gray-700">{place.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
