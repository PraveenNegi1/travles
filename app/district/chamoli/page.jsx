import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Badrinath Temple",
      description:
        "Badrinath Temple is one of the Char Dham pilgrimage sites dedicated to Lord Vishnu. Situated along the banks of the Alaknanda River, it is known for its stunning backdrop of the Neelkanth Peak.",
      image: "/badrinath-temple.jpg",
    },
    {
      name: "Joshimath",
      description:
        "Joshimath is a sacred town and winter seat of Lord Badri. It is known for its connection to Adi Shankaracharya and houses several ancient temples.",
      image: "/joshimath.jpg",
    },
    {
      name: "Hemkund Sahib",
      description:
        "Hemkund Sahib is a revered Sikh pilgrimage site situated at an altitude of 4,329 meters. It is surrounded by snow-capped peaks and a glacial lake, offering a serene spiritual experience.",
      image: "/hemkund.webp",
    },
    {
      name: "Rudranath Temple",
      description:
        "Rudranath Temple is one of the Panch Kedar temples dedicated to Lord Shiva. Located amidst dense forests and alpine meadows, it offers a tranquil and mystical atmosphere.",
      image: "/Rudranath-Temple.webp",
    },
  ];

  const trekkingPlaces = [
    {
      name: "Valley of Flowers",
      description:
        "Valley of Flowers is a UNESCO World Heritage Site known for its vibrant meadows of alpine flowers and rich biodiversity. The trek offers mesmerizing views of snow-covered peaks.",
      image: "/valleyofflowers.avif",
    },
    {
      name: "Kuari Pass Trek",
      description:
        "Kuari Pass Trek offers panoramic views of Himalayan peaks like Nanda Devi, Dronagiri, and Kamet. It is a relatively easy trek, perfect for beginners and nature lovers.",
      image: "/kauripass.webp",
    },
    {
      name: "Roopkund Trek",
      description:
        "Roopkund Trek is famous for its mysterious skeleton lake at an altitude of 5,029 meters. The trek passes through dense forests, alpine meadows, and glacial terrain.",
      image: "/Roopkund_Lake.jpg",
    },
    {
      name: "Satopanth Lake",
      description:
        "Satopanth Lake is a sacred glacial lake surrounded by Chaukhamba peaks. The trek offers stunning views of the Garhwal Himalayas and is steeped in mythological significance.",
      image: "/Satopanth-Lake-Trek.jpg",
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <div className="flex justify-center mb-8 w-full  ">
        <Image
          src="https://images.unsplash.com/photo-1740217078341-c2a42a248f7e?q=80&w=2070&auto=format&fit=crop"
          alt="Chamoli"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-8 merriweather">
        <h1 className="md:text-5xl text-3xl font-serif font-bold text-gray-800 mb-4">
          Chamoli
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto font-serif">
          Chamoli, known for its spiritual aura and natural beauty, is a serene
          district in Uttarakhand. Surrounded by the majestic Himalayas, Chamoli
          offers a perfect blend of spirituality, adventure, and breathtaking
          landscapes.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-serif">
          Chamoli is home to some of the most revered pilgrimage sites in India,
          including the sacred Badrinath Temple, which is one of the four Char
          Dham destinations. The district is also the gateway to the Valley of
          Flowers, a UNESCO World Heritage Site known for its vibrant alpine
          meadows and rare flora.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-serif">
          Adventure enthusiasts can explore the treacherous yet scenic trails
          leading to Hemkund Sahib, a high-altitude Sikh pilgrimage site
          surrounded by glacial lakes and towering peaks. The pristine beauty of
          Auli, with its world-class skiing slopes and panoramic views of Nanda
          Devi, makes it a must-visit destination for adventure lovers.
        </p>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mt-4 font-serif">
          Chamoli is also steeped in rich cultural heritage, with vibrant
          festivals, traditional music, and folk dances adding to its charm. The
          district&apos;s eco-friendly villages, terraced fields, and warm
          hospitality make it an ideal destination for those seeking peace and
          connection with nature.
        </p>
      </div>

      <div className="mb-12 merriweather">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 inline-block font-serif">
          Religious Places in Chamoli
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {place.name}
              </h3>
              <p className="text-gray-700 font-serif">{place.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="merriweather">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 inline-block font-serif">
          Trekking Places in Chamoli
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <h3 className="text-xl font-semibold text-green-600 mb-2">
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
