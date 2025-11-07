"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Bagnath Temple",
      description:
        "Bagnath Temple, located at the confluence of the Gomti and Saryu rivers, is dedicated to Lord Shiva. It attracts thousands of devotees during the annual Shivratri festival.",
      image: "/bagnathtemple.jpg",
    },
    {
      name: "Baijnath Temple",
      description:
        "Baijnath Temple is an ancient Shiva temple situated along the Gomti River. It is known for its intricate stone carvings and spiritual significance.",
      image: "/baijnath.jpg",
    },
    {
      name: "Chandika Temple",
      description:
        "Chandika Temple, dedicated to Goddess Chandika, is perched on a hilltop. It offers panoramic views of the surrounding valleys and a peaceful atmosphere for meditation.",
      image: "/Chandika-Devi-Temple-webp",
    },
    {
      name: "Gauri Udiyar",
      description:
        "Gauri Udiyar is a large cave temple dedicated to Lord Shiva. It houses ancient stone idols and is a serene spot for spiritual seekers.",
      image: "/gauri-udiyal-cavd.jpg",
    },
  ];

  const trekkingPlaces = [
    {
      name: "Pindari Glacier Trek",
      description:
        "Pindari Glacier Trek is one of the most popular treks in Bageshwar. It offers breathtaking views of the snow-covered peaks and lush green valleys.",
      image: "/pindariglacier.jpg",
    },
    {
      name: "Sunderdhunga Trek",
      description:
        "Sunderdhunga Trek, also known as the 'Valley of Beautiful Stones,' offers scenic views of glaciers and rocky terrains.",
      image: "/sunderdhunga.jpg",
    },
    {
      name: "Kafni Glacier Trek",
      description:
        "Kafni Glacier Trek is known for its tranquil atmosphere and stunning views of the Nanda Kot and Nanda Devi peaks.",
      image: "/kafni-glacier-trek.webp",
    },
    {
      name: "Kausani Trek",
      description:
        "Kausani Trek takes you through tea gardens and pine forests, offering panoramic views of the Himalayan range.",
      image: "/kausani2.jpeg",
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
      <div className="flex justify-center mb-8 w-full h-[50vh] sm:h-[70vh] relative">
        <Image
          src="/Town_of_Bageshwar.jpg"
          alt="Bageshwar"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg object-cover brightness-75 w-full h-full"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Bageshwar
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Bageshwar, a serene district in Uttarakhand, is known for its ancient
          temples, spiritual significance, and scenic Himalayan landscapes. It's
          a perfect blend of spirituality and adventure.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Located at the confluence of the Gomti and Saryu rivers, Bageshwar
          holds deep religious significance. The district is home to the famous
          Bagnath Temple, dedicated to Lord Shiva, which attracts thousands of
          devotees every year. The annual Uttarayani Fair held here is a vibrant
          celebration of culture and tradition.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure seekers can explore the nearby Pindari Glacier and
          Sunderdhunga Valley, which offer breathtaking views of snow-clad peaks
          and challenging trekking routes. The picturesque trails, surrounded by
          rhododendron forests and alpine meadows, provide an unforgettable
          experience for trekkers and nature enthusiasts.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Bageshwar is also known for its rich cultural heritage and warm
          hospitality. The local markets offer a glimpse into the region's
          traditional crafts and delicious Kumaoni cuisine. With its peaceful
          ambiance, spiritual charm, and natural beauty, Bageshwar is a hidden
          gem for travelers seeking solace and adventure alike.
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
          value={2246}
          unit="km²"
          label="Area"
          district="Bageshwar"
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
          value={259898}
          unit=""
          label="Population"
          district="Bageshwar"
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
          value={80.01}
          unit="%"
          label="Literacy Rate"
          district="Bageshwar"
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Bageshwar
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
          Trekking Places in Bageshwar
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
