"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Kandoliya Temple",
      description:
        "Kandoliya Temple is dedicated to Kandoliya Devta and is located amidst pine forests. It offers scenic views of the Himalayan ranges and the Alaknanda Valley.",
      image: "/kandoliya-temple.webp",
    },
    {
      name: "Jwalpa Devi Temple",
      description:
        "Jwalpa Devi Temple is a famous Shakti Peeth dedicated to Goddess Jwalpa. Pilgrims visit the temple throughout the year, especially during Navratri.",
      image: "/jwalpa-devi-temple.avif",
    },
    {
      name: "Kyunkaleshwar Mahadev Temple",
      description:
        "Kyunkaleshwar Mahadev Temple is an ancient Shiva temple believed to have been established by Adi Shankaracharya. It features intricate carvings and a peaceful atmosphere.",
      image: "/kyunkaleshwar-mahadev-temple.jpg",
    },
    {
      name: "Dhari Devi Temple",
      description:
        "Dhari Devi Temple is situated on the banks of the Alaknanda River and is dedicated to Goddess Dhari. It is considered a protector of the Char Dham pilgrimage.",
      image: "/dhari-devi-temple.jpg",
    },
  ];

  const attractions = [
    {
      name: "Khirsu",
      description:
        "Khirsu is a quiet hill station surrounded by apple orchards and oak forests. It offers panoramic views of the snow-capped Himalayas.",
      image: "/khirsu.jpg",
    },
    {
      name: "Nag Devta Temple",
      description:
        "Nag Devta Temple is dedicated to the serpent god and is located on a hilltop. It provides a stunning view of the surrounding valleys and hills.",
      image: "/nagraja.jpg",
    },
    {
      name: "Tara Kund",
      description:
        "Tara Kund is a small lake situated at a high altitude. It is surrounded by lush meadows and is a popular trekking destination.",
      image: "/Tara-Kund.webp",
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
          src="/pauri.jpeg"
          alt="Pauri Garhwal"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Pauri Garhwal
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Pauri Garhwal, nestled in the Garhwal region of Uttarakhand, is known
          for its breathtaking views of the Himalayan peaks, ancient temples,
          and vibrant culture.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Perched at an altitude of 1,814 meters, Pauri Garhwal offers panoramic
          views of the snow-capped peaks of Nanda Devi, Trishul, and Chaukhamba.
          The region&apos;s pristine environment and pleasant climate make it an
          ideal destination for nature lovers and peace seekers. The town of
          Pauri is dotted with pine and deodar forests, adding to its natural
          charm.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pauri Garhwal is also a significant spiritual destination, home to
          several ancient temples. The Kandoliya Temple, dedicated to Kandoliya
          Devta, offers stunning views of the valley and is surrounded by lush
          greenery. The Kyunkaleshwar Mahadev Temple, built during the 8th
          century, is an important pilgrimage site dedicated to Lord Shiva. The
          temple&apos;s architecture reflects the traditional Garhwali style.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure enthusiasts can explore the nearby Khirsu village, known for
          its apple orchards and breathtaking Himalayan views. Trekking routes
          from Pauri lead to scenic locations like Chaukhamba Viewpoint and the
          serene Tara Kund Lake, which is surrounded by dense forests and
          meadows. The town also serves as a gateway to some of
          Uttarakhand&apos;s lesser-explored trekking trails.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pauri Garhwal&apos;s rich cultural heritage is reflected in its
          vibrant fairs and festivals, including the Kandoliya Fair and the
          Bikhoti Festival, which celebrate the region&apos;s deep-rooted
          traditions. The local markets offer a glimpse of the Garhwali
          lifestyle, with stalls selling traditional woolens, handicrafts, and
          organic produce. Pauri Garhwal&apos;s serene atmosphere, spiritual
          energy, and natural beauty make it a captivating destination in the
          heart of the Himalayas.
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
          value={5438}
          unit="km²"
          label="Area"
          district="Pauri"
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
          value={687271}
          unit=""
          label="Population"
          district="Pauri"
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
          value={82.02}
          unit="%"
          label="Literacy Rate"
          district="Pauri"
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Pauri Garhwal
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
          Attractions in Pauri Garhwal
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
              <p className="text-gray-700 font-serif">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
