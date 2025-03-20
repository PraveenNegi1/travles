import Image from "next/image";
import React from "react";

const Page = () => {
  const lakes = [
    {
      name: "Naini Lake",
      description:
        "Naini Lake is the centerpiece of Nainital, offering beautiful views and boating experiences. It is surrounded by hills and is believed to be one of the Shakti Peethas.",
      image: "/nainilake.jpeg",
    },
    {
      name: "Bhimtal Lake",
      description:
        "Bhimtal Lake is larger than Naini Lake and features an island at its center. Visitors can enjoy boating and the scenic beauty of the surrounding hills.",
      image: "/bhimtal-lake-nainital.jpg",
    },
    {
      name: "Sattal Lake",
      description:
        "Sattal is a group of seven interconnected lakes surrounded by lush forests. It is a peaceful spot for birdwatching and nature walks.",
      image: "/sattal-lake.jpg",
    },
    {
      name: "Naukuchiatal Lake",
      description:
        "Naukuchiatal is a nine-cornered lake known for its tranquility and opportunities for kayaking and paragliding.",
      image: "/Naukuchiatal.webp",
    },
  ];

  const attractions = [
    {
      name: "Naina Devi Temple",
      description:
        "Naina Devi Temple, located near Naini Lake, is dedicated to Goddess Naina Devi. It is one of the 51 Shakti Peethas and holds great religious significance.",
      image: "/nainadevitample.jpg",
    },
    {
      name: "Snow View Point",
      description:
        "Snow View Point offers a panoramic view of the snow-capped Himalayan peaks. It can be reached by a cable car ride from Mallital.",
      image: "/view-from-snow-point.jpg",
    },
    {
      name: "The Mall Road",
      description:
        "The Mall Road runs along the side of Naini Lake and is lined with shops, restaurants, and hotels. It&apos;s a popular spot for evening walks and shopping.",
      image: "/mallroad.jpg",
    },
    {
      name: "Eco Cave Gardens",
      description:
        "Eco Cave Gardens is a cluster of interconnected caves and hanging gardens, offering a fun experience for kids and nature lovers.",
      image: "/ecocave.jpeg",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1610712147665-04400af97a32?q=80&w=1974&auto=format&fit=crop"
          alt="Nainital"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Nainital
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Nainital, known as the 'Lake District of India,' is a charming hill
          station surrounded by lakes and mountains. It is famous for its scenic
          beauty, pleasant weather, and colonial-era charm.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nestled around the emerald-green Naini Lake, the town derives its name
          from the goddess Naina Devi, whose temple overlooks the lake. Boating
          in Naini Lake while enjoying the panoramic views of the surrounding
          hills is one of the most popular activities for visitors. The lake is
          beautifully illuminated at night, creating a magical reflection of
          lights on the water.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The Mall Road, running along the edge of the lake, is the heart of
          Nainital's social and cultural life. Lined with colonial-style
          buildings, cafes, and shops, it&apos;s an ideal spot for leisurely
          walks and shopping for local handicrafts, woolens, and candles. The
          nearby Naina Devi Temple is a major pilgrimage site, believed to be
          one of the 51 Shakti Peeths.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          For panoramic views of the Himalayas, visitors can take a cable car
          ride to Snow View Point or trek to Tiffin Top, which offers
          breathtaking vistas of Nanda Devi and other snow-capped peaks. The Eco
          Cave Gardens provide a fun and educational experience with
          interconnected caves representing different animals.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nainital is also home to several prestigious educational institutions,
          including the historic Sherwood College. The town&apos;s colonial
          heritage is evident in the architecture of the Governor's House (Raj
          Bhavan), a majestic British-era building surrounded by lush gardens
          and a golf course. With its mix of natural splendor, cultural
          richness, and historical significance, Nainital remains one of
          Uttarakhand&apos;s most beloved destinations.
        </p>
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Lakes in Nainital
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lakes.map((lake, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 border-t-4 border-blue-500"
            >
              <Image
                src={lake.image}
                alt={lake.name}
                width={1000}
                height={1000}
                className="rounded-lg mb-4 h-[250px] w-full object-cover "
              />
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {lake.name}
              </h3>
              <p className="text-gray-700 font-serif">{lake.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Attractions in Nainital
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
