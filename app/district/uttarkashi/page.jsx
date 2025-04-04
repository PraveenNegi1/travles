"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Gangotri Temple",
      description:
        "Gangotri Temple is one of the four Char Dham pilgrimage sites. It is dedicated to Goddess Ganga and situated at an altitude of 3,100 meters.",
      image: "/Gangotri-Dham-Temple.jpg",
    },
    {
      name: "Yamunotri Temple",
      description:
        "Yamunotri Temple is dedicated to Goddess Yamuna. It is located at an altitude of 3,293 meters and is the starting point of the Char Dham Yatra.",
      image: "/Yamunotri_Dham.webp",
    },
    {
      name: "Vishwanath Temple",
      description:
        "Vishwanath Temple in Uttarkashi is dedicated to Lord Shiva. It is one of the oldest temples in the region and holds immense religious significance.",
      image: "/kashi-vishwanath-uttarkashi.jpg",
    },
  ];

  const attractions = [
    {
      name: "Dayara Bugyal",
      description:
        "Dayara Bugyal is a high-altitude meadow offering stunning views of the Himalayas. It is a popular trekking destination.",
      image: "/Dayara-Bugyal-7.webp",
    },
    {
      name: "Har Ki Doon",
      description:
        "Har Ki Doon is a cradle-shaped valley known for its rich flora and fauna. It offers breathtaking views of snow-covered peaks.",
      image: "/harkidoon.webp",
    },
    {
      name: "Dodital Lake",
      description:
        "Dodital Lake is a serene freshwater lake surrounded by pine and oak forests. It is also considered the birthplace of Lord Ganesha.",
      image: "/dodital.jpg",
    },
    {
      name: "Nachiketa Tal",
      description:
        "Nachiketa Tal is a pristine lake surrounded by lush green forests. It is named after Nachiketa, a character from Hindu mythology.",
      image: "/nachiketa-tal-lake.webp",
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
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center  mb-8 w-full  md:h-[850px]">
        <Image
          src="https://images.unsplash.com/photo-1674594342594-c33dcc58c5f2?q=80&w=1976&auto=format&fit=crop"
          alt="Uttarkashi"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center  mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Uttarkashi
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Uttarkashi is a sacred town on the banks of the Bhagirathi River.
          Known as the 'Kashi of the North,' it is a major pilgrimage site and a
          gateway to the Char Dham Yatra.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Situated at an altitude of 1,165 meters, Uttarkashi is surrounded by
          towering Himalayan peaks and lush green forests, creating a serene and
          spiritual atmosphere. The town is home to the famous Vishwanath
          Temple, dedicated to Lord Shiva, which attracts thousands of devotees
          each year. The temple's history is believed to date back to the time
          of the Mahabharata, and it remains a symbol of faith and devotion.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Uttarkashi is also a major stop on the sacred Char Dham Yatra, which
          includes the holy sites of Yamunotri, Gangotri, Kedarnath, and
          Badrinath. The Gangotri Temple, located about 100 km from Uttarkashi,
          is the origin of the holy River Ganges and holds immense spiritual
          significance for Hindus.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure seekers are drawn to Uttarkashi for its challenging trekking
          routes and mountaineering expeditions. The town serves as a base for
          treks to Dayara Bugyal, a high-altitude meadow known for its
          breathtaking views of the snow-capped Himalayas. The Har Ki Doon trek,
          which passes through dense forests and quaint villages, is another
          popular route for trekking enthusiasts.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Uttarkashi is also home to the Nehru Institute of Mountaineering
          (NIM), one of the most prestigious mountaineering institutes in India.
          Established in 1965, NIM trains aspiring climbers and adventurers from
          around the world, offering courses in rock climbing, ice climbing, and
          high-altitude survival.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The town&apos;s spiritual essence is further enhanced by the presence
          of numerous ashrams and yoga centers, where visitors can immerse
          themselves in meditation and spiritual practices. The tranquil
          environment, combined with the rhythmic sound of the Bhagirathi River,
          creates an ideal setting for self-discovery and inner peace.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The cultural richness of Uttarkashi is reflected in its vibrant
          festivals and fairs. The Magh Mela, held annually in January, is a
          grand celebration where devotees gather to take a holy dip in the
          Bhagirathi River and offer prayers at the Vishwanath Temple.
          Traditional folk music and dance performances add to the festive
          atmosphere.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Uttarkashi&apos;s natural beauty is equally captivating. The nearby
          Nachiketa Tal, a pristine mountain lake surrounded by dense deodar
          forests, offers a peaceful retreat for nature lovers. Dodital, another
          high-altitude lake located at 3,024 meters, is known for its
          crystal-clear waters and is home to the rare golden trout.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Uttarkashi&apos;s unique blend of spirituality, adventure, and natural
          beauty makes it a must-visit destination for pilgrims, trekkers, and
          peace seekers alike.
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
          value={8016}
          unit="km²"
          label="Area"
          district="Uttarkashi"
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
          value={330086}
          unit=""
          label="Population"
          district="Uttarkashi"
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
          value={75.81}
          unit="%"
          label="Literacy Rate"
          district="Uttarkashi"
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Uttarkashi
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
          Attractions in Uttarkashi
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
                className="rounded-lg mb-4 h-[250px] w-full object-cover"
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
