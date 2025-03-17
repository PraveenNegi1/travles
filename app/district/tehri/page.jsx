import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Chandrabadni Temple",
      description:
        "Chandrabadni Temple is dedicated to Goddess Sati and offers panoramic views of the Himalayan peaks. It is located at an altitude of 2,277 meters.",
      image:
        "https://www.euttaranchal.com/tourism/photos/chandrabadni-temple-159065.jpg",
    },
    {
      name: "Surkanda Devi Temple",
      description:
        "Surkanda Devi Temple is one of the Shakti Peethas, dedicated to Goddess Parvati. It is located at a height of 2,757 meters and offers stunning mountain views.",
      image:
        "https://www.euttaranchal.com/tourism/photos/surkanda-devi-temple-162065.jpg",
    },
    {
      name: "Sem Mukhem Temple",
      description:
        "Sem Mukhem Temple is dedicated to Lord Nag Raja. It is surrounded by thick forests and is known for its peaceful atmosphere.",
      image:
        "https://www.euttaranchal.com/tourism/photos/sem-mukhem-temple-158065.jpg",
    },
  ];

  const attractions = [
    {
      name: "Tehri Dam",
      description:
        "Tehri Dam is one of the tallest dams in the world. It offers adventure activities like boating, jet skiing, and kayaking.",
      image: "https://www.euttaranchal.com/tourism/photos/tehri-dam-166065.jpg",
    },
    {
      name: "Dhanaulti",
      description:
        "Dhanaulti is a serene hill station known for its eco-parks, Deodar forests, and breathtaking mountain views.",
      image: "https://www.euttaranchal.com/tourism/photos/dhanaulti-167065.jpg",
    },
    {
      name: "Kanatal",
      description:
        "Kanatal is a hidden gem known for its apple orchards and camping spots. It offers stunning views of snow-covered peaks.",
      image: "https://www.euttaranchal.com/tourism/photos/kanatal-169065.jpg",
    },
    {
      name: "New Tehri",
      description:
        "New Tehri is a modern town overlooking the Tehri Lake. It serves as the administrative center of the district.",
      image: "https://www.euttaranchal.com/tourism/photos/new-tehri-168065.jpg",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="/tehri.jpeg"
          alt="Tehri"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>

      <div className="text-center mb-10">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Tehri Garhwal
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Tehri is famous for its massive dam, scenic landscapes, and spiritual
          significance. It offers a perfect blend of adventure, nature, and
          tranquility.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Situated at the confluence of the Bhagirathi and Bhilangna rivers,
          Tehri Garhwal is known for the Tehri Dam, one of the tallest dams in
          the world. The dam, standing at a height of 260.5 meters, generates
          hydroelectric power and also serves as a major source of irrigation
          and drinking water for the region. The vast reservoir created by the
          dam, known as Tehri Lake, has become a hub for water sports and
          adventure activities.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Tehri Lake offers thrilling opportunities for jet skiing, kayaking,
          banana boat rides, and parasailing, attracting adventure enthusiasts
          from across the country. The calm waters of the lake, surrounded by
          lush green hills and the snow-capped Himalayas, provide a breathtaking
          backdrop for relaxation and exploration.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Apart from its modern marvel, Tehri is deeply rooted in spirituality
          and history. The old town of Tehri, which now lies submerged beneath
          the reservoir, was once the capital of the Garhwal Kingdom. The region
          is dotted with ancient temples like the Chandrabadni Temple, dedicated
          to Goddess Shakti, and the Surkanda Devi Temple, offering panoramic
          views of the Himalayas.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          The nearby town of New Tehri is a planned settlement with
          well-developed infrastructure and serves as a base for exploring the
          region. The Kunjapuri Temple, perched at an altitude of 1,676 meters,
          is a popular destination for witnessing the mesmerizing sunrise over
          the Himalayan peaks, including Swargarohini and Bandarpunch.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Tehri Garhwal also offers scenic trekking trails through dense
          forests, alpine meadows, and remote villages. The trek to Nag Tibba,
          located at an altitude of 3,022 meters, is one of the most popular
          trails, offering spectacular views of the Bandarpoonch and Kedarnath
          peaks. The region&apos;s rich cultural heritage is reflected in the
          vibrant local fairs and festivals, where traditional music, dance, and
          cuisine come alive.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Tehri Garhwal&apos;s blend of engineering marvel, natural beauty, and
          spiritual significance makes it a unique destination, appealing to
          both adventure seekers and spiritual travelers alike.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Tehri
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
          Attractions in Tehri
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
