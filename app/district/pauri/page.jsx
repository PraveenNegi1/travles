import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Kandoliya Temple",
      description:
        "Kandoliya Temple is dedicated to Kandoliya Devta and is located amidst pine forests. It offers scenic views of the Himalayan ranges and the Alaknanda Valley.",
      image:
        "https://www.euttaranchal.com/tourism/photos/kandoliya-temple-159065.jpg",
    },
    {
      name: "Jwalpa Devi Temple",
      description:
        "Jwalpa Devi Temple is a famous Shakti Peeth dedicated to Goddess Jwalpa. Pilgrims visit the temple throughout the year, especially during Navratri.",
      image:
        "https://www.euttaranchal.com/tourism/photos/jwalpa-devi-temple-162065.jpg",
    },
    {
      name: "Kyunkaleshwar Mahadev Temple",
      description:
        "Kyunkaleshwar Mahadev Temple is an ancient Shiva temple believed to have been established by Adi Shankaracharya. It features intricate carvings and a peaceful atmosphere.",
      image:
        "https://www.euttaranchal.com/tourism/photos/kyunkaleshwar-temple-158065.jpg",
    },
  ];

  const attractions = [
    {
      name: "Khirsu",
      description:
        "Khirsu is a quiet hill station surrounded by apple orchards and oak forests. It offers panoramic views of the snow-capped Himalayas.",
      image: "https://www.euttaranchal.com/tourism/photos/khirsu-166065.jpg",
    },
    {
      name: "Nag Devta Temple",
      description:
        "Nag Devta Temple is dedicated to the serpent god and is located on a hilltop. It provides a stunning view of the surrounding valleys and hills.",
      image:
        "https://www.euttaranchal.com/tourism/photos/nag-devta-temple-167065.jpg",
    },
    {
      name: "Tara Kund",
      description:
        "Tara Kund is a small lake situated at a high altitude. It is surrounded by lush meadows and is a popular trekking destination.",
      image: "https://www.euttaranchal.com/tourism/photos/tara-kund-169065.jpg",
    },
    {
      name: "Dhari Devi Temple",
      description:
        "Dhari Devi Temple is situated on the banks of the Alaknanda River and is dedicated to Goddess Dhari. It is considered a protector of the Char Dham pilgrimage.",
      image:
        "https://www.euttaranchal.com/tourism/photos/dhari-devi-temple-168065.jpg",
    },
  ];

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
      <div className="text-center mb-10">
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

      <div className="mb-16">
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

      <div>
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
