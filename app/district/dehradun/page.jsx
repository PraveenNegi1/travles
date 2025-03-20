import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Tapkeshwar Temple",
      description:
        "Tapkeshwar Temple is a popular cave temple dedicated to Lord Shiva. It is known for the continuous water droplets falling on the Shivling.",
      image:
        "/tapkeshwar-temple.jpg",
    },
    {
      name: "Sai Darbar Temple",
      description:
        "Sai Darbar Temple is a peaceful shrine dedicated to Sai Baba. The temple is adorned with beautiful marble architecture and peaceful surroundings.",
      image:
        "/Sai-Darbar-Temple-Dehradun-Uttarakhand.jpg",
    },
    {
      name: "Mindrolling Monastery",
      description:
        "Mindrolling Monastery is one of the largest Buddhist centers in India. It features a 60-meter tall stupa and beautiful wall paintings.",
      image:
        "/mindrolling-monastery.jpeg",
    },
    {
      name: "Shiv Mandir",
      description:
        "Shiv Mandir is a sacred temple dedicated to Lord Shiva, located on the Mussoorie road. It attracts devotees throughout the year.",
      image:
        "/shivmandir.avif",
    },
  ];

  const trekkingPlaces = [
    {
      name: "George Everest Trek",
      description:
        "George Everest Trek offers a scenic trail leading to the historic house of Sir George Everest. It provides panoramic views of the Doon Valley and the Himalayas.",
      image:
        "/georgeEverest.webp",
    },
    {
      name: "Nag Tibba Trek",
      description:
        "Nag Tibba Trek is a popular weekend trek known for its breathtaking views of the snow-capped peaks and rich flora and fauna.",
      image:
        "/nag-tibba-range.jpg",
    },
    {
      name: "Robber's Cave Trek",
      description:
        "Robber's Cave is a narrow gorge formed by a river. It is a popular spot for trekking and exploring the natural rock formations.",
      image:
        "/Robbers-Caves.jpg",
    },
    {
      name: "Bhadraj Temple Trek",
      description:
        "Bhadraj Temple Trek leads to the Bhadraj Temple, dedicated to Lord Balbhadra. The trek offers stunning views of the Doon Valley and Chakrata ranges.",
      image:
        "/bhadraj-temple.webp",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1664310448423-1883f165b607?q=80&w=2187&auto=format&fit=crop"
          alt="Dehradun"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10 merriweather">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Dehradun
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Dehradun, the capital of Uttarakhand, is known for its picturesque
          landscapes, religious landmarks, and adventurous trekking routes. It
          serves as a gateway to the Garhwal Himalayas.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nestled in the Doon Valley, Dehradun is surrounded by the Shivalik
          Hills and the Ganges River, offering breathtaking views and a pleasant
          climate throughout the year. The city&apos;s rich history is reflected
          in its colonial-era architecture and the presence of prestigious
          institutions like the Forest Research Institute (FRI) and the Indian
          Military Academy (IMA).
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Dehradun is also a hub for spiritual seekers, with prominent temples
          such as the Tapkeshwar Temple, dedicated to Lord Shiva, and the
          Mindrolling Monastery, a center of Tibetan Buddhism. Robber's Cave
          (Guchhupani), a natural limestone formation with flowing streams, is a
          popular spot for exploration and relaxation.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure enthusiasts can explore trekking routes to nearby
          destinations like Mussoorie and Chakrata, while nature lovers can
          visit the Rajaji National Park, home to elephants, leopards, and a
          rich variety of bird species. Sahastradhara, meaning 'Thousandfold
          Spring,' is known for its therapeutic sulphur water and stunning
          natural beauty.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The city&apos;s vibrant culture is reflected in its bustling markets,
          where visitors can shop for handicrafts, woolens, and local
          delicacies. Dehradun&apos;s mix of natural beauty, adventure,
          spirituality, and modern comforts makes it a captivating destination
          for all kinds of travelers.
        </p>
      </div>

      <div className="mb-16 merriweather">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Dehradun
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
          Trekking Places in Dehradun
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
