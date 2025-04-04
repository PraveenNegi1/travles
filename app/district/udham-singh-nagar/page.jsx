"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Nanakmatta Sahib",
      description:
        "Nanakmatta Sahib is a revered Sikh pilgrimage site associated with Guru Nanak Dev Ji. It is situated on the banks of the Ghaggar River.",
      image: "/Gurdwara_Nanak_Matta_Sahib.jpg",
    },
    {
      name: "Purnagiri Temple",
      description:
        "Purnagiri Temple is one of the 108 Siddha Peethas dedicated to Goddess Purnagiri. It is located atop a hill and offers panoramic views of the surrounding valleys.",
      image: "/Purnagiri-temple-7.jpg",
    },
    {
      name: "Chaiti Devi Temple",
      description:
        "Chaiti Devi Temple is a popular Hindu temple dedicated to Goddess Chaiti. It attracts numerous devotees during the Chaitra Navratri festival.",
      image: "/Maa-Bal-Sundari-Chaiti-Devi-Temple.webp",
    },
  ];

  const attractions = [
    {
      name: "Jim Corbett National Park",
      description:
        "Jim Corbett National Park is a renowned wildlife sanctuary known for its rich biodiversity and Bengal tigers. It offers jeep safaris and eco-tourism activities.",
      image: "/jimcorbett.jpeg",
    },
    {
      name: "Khatima",
      description:
        "Khatima is a picturesque town known for its tea gardens and natural beauty. It serves as a gateway to the Nepal border.",
      image: "/khatima.jpeg",
    },
    {
      name: "Rudrapur",
      description:
        "Rudrapur is the industrial hub of Uttarakhand. It is known for its manufacturing industries and modern infrastructure.",
      image: "/Rudrapur.avif",
    },
    {
      name: "Sitarganj",
      description:
        "Sitarganj is a peaceful town surrounded by lush green fields. It is known for its agricultural activities and vibrant local markets.",
      image: "/Sitarganj.jpg",
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
          src="/Udham-singh-nagar.jpg"
          alt="Udham Singh Nagar"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Udham Singh Nagar
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Udham Singh Nagar is a vibrant district known for its religious
          diversity, natural beauty, and industrial growth. It serves as the
          gateway to the Terai region of Uttarakhand.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Named after the legendary freedom fighter Udham Singh, the district
          has a rich historical and cultural legacy. It was established as an
          industrial hub to boost the economy of Uttarakhand and has grown into
          one of the most economically significant regions in the state. The
          district is home to major industrial estates, including Pantnagar and
          Rudrapur, which house a wide range of manufacturing units and
          multinational companies.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pantnagar is also home to the Govind Ballabh Pant University of
          Agriculture and Technology, which played a pivotal role in the Green
          Revolution in India. The university is one of the oldest and most
          prestigious agricultural institutions in the country, attracting
          students and researchers from across India.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Despite its industrial growth, Udham Singh Nagar has retained its
          natural beauty and cultural heritage. The district is dotted with
          religious sites such as the Nanakmatta Gurudwara, one of the most
          important Sikh pilgrimage sites in India. The Gurudwara is believed to
          have been blessed by Guru Nanak Dev Ji, the founder of Sikhism, and
          continues to attract devotees throughout the year.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The town of Khatima is known for its beautiful temples and vibrant
          markets. The Atariya Temple, dedicated to Goddess Durga, is a popular
          religious site, especially during the Navratri festival. The Kali
          Temple in Sitarganj also draws many devotees seeking blessings and
          spiritual peace.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Udham Singh Nagar is rich in natural beauty, with lush green fields,
          dense forests, and serene rivers. The region's proximity to the
          foothills of the Himalayas makes it an ideal destination for nature
          lovers. The Drona Sagar Lake in Kashipur, steeped in mythology, is
          believed to have been created by the Pandavas during their exile and
          remains a place of spiritual significance.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The cultural diversity of Udham Singh Nagar is reflected in its
          festivals, food, and local traditions. The district hosts a variety of
          fairs and festivals, including Holi, Diwali, Baisakhi, and Eid, where
          people from different communities come together to celebrate. The
          local cuisine, influenced by both the hills and the plains, includes
          delicacies like aloo ke gutke, bhang ki chutney, and stuffed parathas.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Udham Singh Nagar&apos;s unique blend of industrial growth, religious
          harmony, and natural beauty makes it a dynamic and captivating
          destination for travelers and business enthusiasts alike.
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
          value={3055}
          unit="km²"
          label="Area"
          district="Udham Singh Nagar "
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
          value={1648902}
          unit=""
          label="Population"
          district="Udham Singh Nagar "
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
          value={73.1}
          unit="%"
          label="Literacy Rate"
          district="Udham Singh Nagar "
        />
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Udham Singh Nagar
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
          Attractions in Udham Singh Nagar
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
