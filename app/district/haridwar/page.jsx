import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Har Ki Pauri",
      description:
        "Har Ki Pauri is a sacred ghat on the banks of the Ganges, where the famous Ganga Aarti is performed daily. It is a major pilgrimage site for Hindus.",
      image: "/har-ki-pauri-haridwar.jpeg",
    },
    {
      name: "Mansa Devi Temple",
      description:
        "Mansa Devi Temple is situated on the Bilwa Parvat and is dedicated to Goddess Mansa Devi. It offers a panoramic view of Haridwar and the Ganges.",
      image: "/mansadevitemple.jpg",
    },
    {
      name: "Chandi Devi Temple",
      description:
        "Chandi Devi Temple, located on the Neel Parvat, is one of the major Shakti Peethas in India. The temple can be reached by a cable car ride.",
      image: "/chandi-devi-temple-haridwar.jpg",
    },
    {
      name: "Maya Devi Temple",
      description:
        "Maya Devi Temple is one of the oldest temples in Haridwar, dedicated to Goddess Maya. It is considered one of the Siddh Peethas.",
      image: "/maya-devi-temple.jpg",
    },
  ];

  const attractions = [
    {
      name: "Ganga Aarti",
      description:
        "Ganga Aarti at Har Ki Pauri is a mesmerizing ritual where priests perform prayers with fire lamps while chanting mantras. Thousands of devotees gather to witness it.",
      image: "/Ganga-Aarti-Haridwar.webp",
    },
    {
      name: "Shanti Kunj",
      description:
        "Shanti Kunj is the headquarters of the All World Gayatri Pariwar. It is a spiritual center offering meditation, yoga, and spiritual discourses.",
      image: "/santikunj.webp",
    },
    {
      name: "Bharat Mata Mandir",
      description:
        "Bharat Mata Mandir is a unique temple dedicated to Mother India. It features a map of undivided India and statues of freedom fighters and deities.",
      image: "/bharatmatamandir.webp",
    },
    {
      name: "Rajaji National Park",
      description:
        "Rajaji National Park is a wildlife sanctuary known for its elephants, tigers, and leopards. It offers jeep safaris and nature walks.",
      image: "/rajaji-national-park-haridwar.jpg",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1653392083932-d5e9e7d2ccd1?q=80&w=2070&auto=format&fit=crop"
          alt="Haridwar"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Haridwar
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Haridwar, one of the seven holiest places in Hinduism, is located on
          the banks of the Ganges River. It is known for its spiritual
          significance, ancient temples, and the iconic Ganga Aarti at Har Ki
          Pauri.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Haridwar serves as the gateway to the Char Dham Yatra, attracting
          millions of pilgrims seeking spiritual blessings and purification in
          the sacred waters of the Ganges. The city&apos;s name means "Gateway
          to God," and its spiritual atmosphere is heightened by the chanting of
          Vedic hymns and the ringing of temple bells.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Har Ki Pauri, the most sacred ghat in Haridwar, is where the evening
          Ganga Aarti takes place. Devotees gather to offer prayers and float
          diyas (oil lamps) on the river, creating a mesmerizing sight of
          flickering lights on the flowing waters. The Kumbh Mela, held every 12
          years, is one of the largest religious gatherings in the world, where
          millions of devotees take a holy dip in the Ganges to cleanse their
          sins.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Apart from its religious importance, Haridwar is also known for its
          historic temples such as the Mansa Devi Temple, perched on Bilwa
          Parvat, and the Chandi Devi Temple, accessible via a scenic cable car
          ride. The Bharat Mata Mandir, dedicated to Mother India, showcases the
          country's rich cultural heritage through intricate sculptures and
          murals.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Haridwar is also a center for Ayurvedic healing and yoga, with the
          Patanjali Yogpeeth attracting wellness seekers from around the globe.
          The bustling markets of Haridwar offer a wide array of religious
          souvenirs, Rudraksha beads, and Ayurvedic products. With its sacred
          ambiance, natural beauty, and rich cultural tapestry, Haridwar stands
          as a timeless spiritual destination.
        </p>
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Haridwar
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
          Attractions in Haridwar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((place, index) => (
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
