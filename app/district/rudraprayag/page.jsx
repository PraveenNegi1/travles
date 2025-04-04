"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Kedarnath Temple",
      description:
        "Kedarnath Temple is one of the twelve Jyotirlingas of Lord Shiva, situated at an altitude of 3,583 meters. It is a major pilgrimage site and part of the Char Dham Yatra.",
      image:
        "https://images.unsplash.com/photo-1612438214708-f428a707dd4e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      name: "Tungnath",
      description:
        "Tungnath is one of the Panch Kedar temples, dedicated to Lord Shiva. It is surrounded by rhododendron forests and offers a peaceful atmosphere.",
      image: "/Tungnath-Temple.jpg",
    },
    {
      name: "Triyuginarayan Temple",
      description:
        "Triyuginarayan Temple is believed to be the place where Lord Shiva and Goddess Parvati were married. A perpetual fire burns in front of the temple as a symbol of their union.",
      image: "/Triyuginarayan.jpg",
    },
  ];

  const attractions = [
    {
      name: "Chopta",
      description:
        "Chopta, known as the 'Mini Switzerland of India,' is a starting point for the Tungnath trek. It offers breathtaking views of the Himalayan peaks.",
      image: "/chopta-mountain.webp",
    },

    {
      name: "Deoria Tal",
      description:
        "Deoria Tal is a pristine lake known for its reflection of the Chaukhamba peaks. It is a popular trekking destination surrounded by dense forests.",
      image: "/deoriyatal.jpg",
    },
    {
      name: "Kartik Swami ",
      description:
        "Kartik Swami Temple is a sacred Hindu temple located in the Rudraprayag district of Uttarakhand, dedicated to Lord Kartikeya, the son of Lord Shiva and Goddess Parvati.",
      image: "/Kartik-Swami-Temple.jpg",
    },
    {
      name: "Guptkashi",
      description:
        "Guptkashi is a sacred town known for the Vishwanath Temple dedicated to Lord Shiva. It holds religious significance and offers stunning views of the Chaukhamba peaks.",
      image: "/GuptKashi-Tours.jpg",
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
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1606722581293-628fa217a6f7?q=80&w=1974&auto=format&fit=crop"
          alt="Rudraprayag"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Rudraprayag
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Rudraprayag, located at the confluence of the Alaknanda and Mandakini
          rivers, is known for its spiritual importance and breathtaking natural
          beauty.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Named after Lord Shiva, Rudraprayag is one of the five sacred
          confluences (Panch Prayag) in Uttarakhand. According to Hindu
          mythology, it is believed that Lord Shiva appeared here in the form of
          Rudra to bless the sage Narada. The meeting point of the two rivers
          creates a mesmerizing sight, attracting pilgrims and nature lovers
          alike.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The Rudranath Temple, dedicated to Lord Shiva, stands as a testament
          to the region's deep spiritual roots. The Koteshwar Mahadev Temple,
          located in a cave along the banks of the Alaknanda River, is another
          sacred site where devotees seek blessings and meditate in peace. The
          temple is believed to have been a place where Lord Shiva meditated
          before proceeding to Kedarnath.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Rudraprayag also serves as a major stopover for pilgrims traveling to
          Kedarnath, one of the twelve Jyotirlingas. The scenic routes leading
          to Kedarnath pass through lush forests, cascading waterfalls, and
          picturesque villages, making the journey a spiritual and visual
          delight. The nearby Chopta Valley, known as the 'Mini Switzerland of
          India,' offers breathtaking views of the Trishul, Nanda Devi, and
          Chaukhamba peaks.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          For adventure enthusiasts, Rudraprayag offers excellent opportunities
          for trekking, camping, and river rafting. The trek to Deoria Tal,
          surrounded by rhododendron forests and reflecting the majestic
          Chaukhamba peaks, is a must-visit. The town also hosts vibrant fairs
          and festivals, where local traditions, music, and dance bring the
          cultural essence of Uttarakhand to life.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Rudraprayag&apos;s blend of spiritual energy, natural beauty, and rich
          cultural heritage makes it a captivating destination for pilgrims and
          travelers seeking tranquility and adventure.
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
          value={2439}
          unit="km²"
          label="Area"
          district="Rudraprayag "
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
          value={242285}
          unit=""
          label="Population"
          district="Rudraprayag "
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
          value={81.3}
          unit="%"
          label="Literacy Rate"
          district="Rudraprayag "
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Rudraprayag
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
          Attractions in Rudraprayag
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
