"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Kapileshwar Mahadev Temple",
      description:
        "Kapileshwar Mahadev Temple is a sacred cave temple dedicated to Lord Shiva. It is located amidst lush greenery and offers a peaceful atmosphere.",
      image: "/kaplipeshwermandir.jpg",
    },
    {
      name: "Thal Kedar Temple",
      description:
        "Thal Kedar Temple is an ancient Shiva temple situated at a high altitude. It attracts devotees and trekkers for its spiritual significance and scenic views.",
      image: "/thal-kedar-temple.jpeg",
    },
    {
      name: "Patal Bhuvaneshwar",
      description:
        "Patal Bhuvaneshwar is a limestone cave temple dedicated to Lord Shiva. The cave features intricate natural rock formations and holds religious significance.",
      image: "/patalbhuvanshwer.webp",
    },

    {
      name: "Om Parvat",
      description:
        " Om Parvat, located in Pithoragarh, is a sacred mountain where the snow formation naturally creates the symbol 'ॐ'(Om).",
      image: "/om-parvat.jpg",
    },
  ];

  const attractions = [
    {
      name: "Askot Wildlife Sanctuary",
      description:
        "Askot Wildlife Sanctuary is home to diverse flora and fauna, including the Himalayan musk deer. It offers breathtaking views of the surrounding peaks.",
      image: "/-Askot-Musk-Deer-SanctuaryPithoragarh-Uttarakhand.webp",
    },
    {
      name: "Munsiyari",
      description:
        "Munsiyari is a picturesque hill station known for its panoramic views of the Panchachuli peaks. It serves as a base for various treks in the region.",
      image: "/Nanda-Devi-Munsiyari-Pithoragarh.jpg",
    },
    {
      name: "Narayan Ashram",
      description:
        "Narayan Ashram is a spiritual and educational center established in 1936. It offers a serene environment and is surrounded by stunning landscapes.",
      image: "/narayanashram.jpg",
    },
    {
      name: "Jauljibi",
      description:
        "Jauljibi is a small town located at the confluence of the Kali and Gori rivers. It is known for its annual trade fair and vibrant local culture.",
      image: "/jauljibi.jpg",
    },

    {
      name: "Darma Valley",
      description:
        " Nestled in Pithoragarh, Darma Valley is known for its lush greenery, quaint villages, and breathtaking trekking routes.",
      image: "/darmavalley.jpg",
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
      <div className="flex justify-center mb-8 w-full h-[50vh] sm:h-[80vh] relative">
        <Image
          src="https://images.unsplash.com/photo-1608497582272-627e105265ab?q=80&w=2070&auto=format&fit=crop"
          alt="Pithoragarh"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg object-cover brightness-75 w-full h-full"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Pithoragarh
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Pithoragarh, known as the 'Little Kashmir,' is a scenic town in
          Uttarakhand. It is renowned for its natural beauty, ancient temples,
          and proximity to the Indo-Tibetan border.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nestled in the easternmost part of Uttarakhand, Pithoragarh is
          surrounded by towering snow-capped peaks, lush valleys, and alpine
          meadows. The town serves as a major stop for pilgrims en route to the
          sacred Kailash Mansarovar Yatra. Its strategic location near the
          Indo-Tibetan border adds to its historical and cultural significance.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pithoragarh Fort, built by the Gorkhas in the 18th century, offers
          panoramic views of the surrounding valley and mountains. Another
          significant landmark is the Kapileshwar Mahadev Temple, located inside
          a cave and dedicated to Lord Shiva. The Dhwaj Temple, perched at an
          altitude of 2,100 meters, provides stunning views of the Himalayan
          peaks and is a popular trekking destination.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure seekers can explore the scenic trekking trails leading to
          the Milam and Ralam Glaciers, which pass through charming villages and
          verdant forests. The Askot Wildlife Sanctuary, home to a variety of
          flora and fauna including the elusive snow leopard and Himalayan musk
          deer, is a must-visit for nature enthusiasts.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pithoragarh&apos;s cultural vibrancy is reflected in its traditional
          fairs and festivals. The Jauljibi Mela, held at the confluence of the
          Kali and Gori rivers, showcases the local trade and cultural heritage.
          The markets of Pithoragarh offer handmade woolens, Pashmina shawls,
          and traditional Garhwali crafts. The town's blend of natural splendor,
          spiritual significance, and rich history makes it a captivating
          destination for travelers.
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
          value={7217.7}
          unit="km²"
          label="Area"
          district="Pithoragarh"
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
          value={483439}
          unit=""
          label="Population"
          district="Pithoragarh"
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
          value={82.25}
          unit="%"
          label="Literacy Rate"
          district="Pithoragarh"
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Pithoragarh
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
          Attractions in Pithoragarh
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
