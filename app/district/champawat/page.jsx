import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Baleshwar Temple",
      description:
        "Baleshwar Temple is an ancient Hindu temple dedicated to Lord Shiva. It is known for its intricate stone carvings and architectural brilliance.",
      image: "/baleshwar-temple.jpg",
    },
    {
      name: "Kranteshwar Mahadev Temple",
      description:
        "Kranteshwar Mahadev Temple, situated on a hilltop, offers stunning views of the surrounding valleys. It is dedicated to Lord Shiva and holds deep spiritual significance.",
      image: "/kranteshwar.jpg",
    },
    {
      name: "Purnagiri Temple",
      description:
        "Purnagiri Temple, located on the banks of the Kali River, is one of the 108 Shakti Peethas. It attracts thousands of pilgrims during the Navratri festival.",
      image: "/purnagiri-devi-temple.jpg",
    },
    {
      name: "Champawat Kali Mandir",
      description:
        "Champawat Kali Mandir is dedicated to Goddess Kali. Its serene environment and panoramic views make it a peaceful place for meditation and worship.",
      image: "/champawarkali.webp",
    },
  ];

  const trekkingPlaces = [
    {
      name: "Lohaghat Trek",
      description:
        "Lohaghat Trek is known for its natural beauty and historical significance. The trail passes through lush forests and offers scenic views of the Himalayas.",
      image: "/Lohaghat.png",
    },
    {
      name: "Abbott Mount",
      description:
        "Abbott Mount offers a peaceful trekking experience amidst deodar forests and colonial-era bungalows. The trek provides breathtaking views of snow-capped peaks.",
      image: "/abbott-mount.webp",
    },
    {
      name: "Mayawati Ashram Trek",
      description:
        "Mayawati Ashram Trek leads to the Advaita Ashram, a spiritual center associated with Swami Vivekananda. The trek is surrounded by dense forests and scenic hills.",
      image: "/mayawati-ashram.webp",
    },
    {
      name: "Devidhura Trek",
      description:
        "Devidhura Trek leads to the famous Barahi Temple, known for the annual Bagwal festival. The trek offers panoramic views of the surrounding hills.",
      image: "/devidhura.jpg",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="/champawat.webp"
          alt="Champawat"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Champawat
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Champawat, steeped in history and spirituality, is a serene district
          in Uttarakhand. Known for its ancient temples and scenic landscapes,
          it offers a perfect blend of religious devotion and natural beauty.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Champawat holds historical significance as the capital of the Chand
          dynasty in the 16th century. The district is home to the ancient
          Baleshwar Temple, dedicated to Lord Shiva, which showcases remarkable
          stone carvings and intricate architecture. The Kranteshwar Mahadev
          Temple, perched on a hilltop, offers panoramic views of the
          surrounding valley and a tranquil atmosphere for meditation and
          reflection.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nature lovers can explore the lush green forests and rolling hills
          that surround Champawat. The district is blessed with pristine rivers
          and waterfalls, including the scenic Lohaghat and Mayawati Ashram,
          which provide a peaceful retreat amidst nature. The Purnagiri Temple,
          located near the Kali River, is a revered pilgrimage site attracting
          thousands of devotees every year.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Champawat&apos;s rich cultural heritage is reflected in its vibrant
          festivals, folk music, and traditional Kumaoni cuisine. The district's
          welcoming locals and serene environment make it an ideal destination
          for spiritual seekers and adventure enthusiasts alike. Whether
          exploring its historic sites or soaking in the natural beauty,
          Champawat offers a captivating experience for every traveler.
        </p>
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Champawat
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
          Trekking Places in Champawat
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
