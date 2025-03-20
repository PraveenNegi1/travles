import Image from "next/image";
import React from "react";

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

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full ">
        <Image
          src="/Town_of_Bageshwar.jpg"
          alt="Bageshwar"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
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

      {/* Trekking Places Section */}
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
