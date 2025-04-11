"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Chandrabadni Temple",
      description:
        "Chandrabadni Temple is dedicated to Goddess Sati and offers panoramic views of the Himalayan peaks. It is located at an altitude of 2,277 meters.",
      image: "/chandrabadni-img3.jpg",
    },
    {
      name: "Surkanda Devi Temple",
      description:
        "Surkanda Devi Temple is one of the Shakti Peethas, dedicated to Goddess Parvati. It is located at a height of 2,757 meters and offers stunning mountain views.",
      image: "/Surkanda-Devi-Temple-1.jpg",
    },
    {
      name: "Sem Mukhem Temple",
      description:
        "Sem Mukhem Temple is dedicated to Lord Nag Raja. It is surrounded by thick forests and is known for its peaceful atmosphere.",
      image: "/sem-mukhem.jpg",
    },
  ];

  const attractions = [
    {
      name: "Tehri Dam",
      description:
        "Tehri Dam is one of the tallest dams in the world. It offers adventure activities like boating, jet skiing, and kayaking.",
      image: "/tehridam.jpg",
    },
    {
      name: "Dhanaulti",
      description:
        "Dhanaulti is a serene hill station known for its eco-parks, Deodar forests, and breathtaking mountain views.",
      image: "/dhanaulti.jpg",
    },
    {
      name: "Kanatal",
      description:
        "Kanatal is a hidden gem known for its apple orchards and camping spots. It offers stunning views of snow-covered peaks.",
      image: "/kanatal-tour-package.jpg",
    },
    {
      name: "New Tehri",
      description:
        "New Tehri is a modern town overlooking the Tehri Lake. It serves as the administrative center of the district.",
      image: "/New-Tehri.jpg",
    },
    {
      name: "Khatling Glacier",
      description:
        "Khatling glacier is located in district Tehri Garhwal of Uttarakhand, the state which is known for his high, calm and beautiful hills.",
      image: "/khatling-glacier.jpg",
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
          src="/tehri.jpeg"
          alt="Tehri"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4">
          Tehri Garhwal
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto ">
          Tehri is famous for its massive dam, scenic landscapes, and spiritual
          significance. It offers a perfect blend of adventure, nature, and
          tranquility.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 ">
          Situated at the confluence of the Bhagirathi and Bhilangna rivers,
          Tehri Garhwal is known for the Tehri Dam, one of the tallest dams in
          the world. The dam, standing at a height of 260.5 meters, generates
          hydroelectric power and also serves as a major source of irrigation
          and drinking water for the region. The vast reservoir created by the
          dam, known as Tehri Lake, has become a hub for water sports and
          adventure activities.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 ">
          Tehri Lake offers thrilling opportunities for jet skiing, kayaking,
          banana boat rides, and parasailing, attracting adventure enthusiasts
          from across the country. The calm waters of the lake, surrounded by
          lush green hills and the snow-capped Himalayas, provide a breathtaking
          backdrop for relaxation and exploration.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 ">
          Apart from its modern marvel, Tehri is deeply rooted in spirituality
          and history. The old town of Tehri, which now lies submerged beneath
          the reservoir, was once the capital of the Garhwal Kingdom. The region
          is dotted with ancient temples like the Chandrabadni Temple, dedicated
          to Goddess Shakti, and the Surkanda Devi Temple, offering panoramic
          views of the Himalayas.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 ">
          The nearby town of New Tehri is a planned settlement with
          well-developed infrastructure and serves as a base for exploring the
          region. The Kunjapuri Temple, perched at an altitude of 1,676 meters,
          is a popular destination for witnessing the mesmerizing sunrise over
          the Himalayan peaks, including Swargarohini and Bandarpunch.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 ">
          Tehri Garhwal also offers scenic trekking trails through dense
          forests, alpine meadows, and remote villages. The trek to Nag Tibba,
          located at an altitude of 3,022 meters, is one of the most popular
          trails, offering spectacular views of the Bandarpoonch and Kedarnath
          peaks. The region&apos;s rich cultural heritage is reflected in the
          vibrant local fairs and festivals, where traditional music, dance, and
          cuisine come alive.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 ">
          Tehri Garhwal&apos;s blend of engineering marvel, natural beauty, and
          spiritual significance makes it a unique destination, appealing to
          both adventure seekers and spiritual travelers alike.
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
          value={4080}
          unit="km²"
          label="Area"
          district="Tehri "
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
          value={618931}
          unit=""
          label="Population"
          district="Tehri "
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
          value={76.36}
          unit="%"
          label="Literacy Rate"
          district="Tehri "
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 ">
          Religious Places in Tehri
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
              <p className="text-gray-700 ">{place.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 ">
          Attractions in Tehri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-t-4 border-green-500"
            >
              <Image
                src={attraction.image}
                alt={attraction.name}
                width={1000}
                height={1000}
                className="rounded-lg mb-4 h-[250px] w-full object-cover "
              />
              <h3 className="text-xl font-bold text-green-600 mb-2">
                {attraction.name}
              </h3>
              <p className="text-gray-700 ">{attraction.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
