import Image from "next/image";
import React from "react";

const Page = () => {
  const religiousPlaces = [
    {
      name: "Kapileshwar Mahadev Temple",
      description:
        "Kapileshwar Mahadev Temple is a sacred cave temple dedicated to Lord Shiva. It is located amidst lush greenery and offers a peaceful atmosphere.",
      image:
        "https://www.euttaranchal.com/tourism/photos/kapileshwar-mahadev-temple-159065.jpg",
    },
    {
      name: "Thal Kedar Temple",
      description:
        "Thal Kedar Temple is an ancient Shiva temple situated at a high altitude. It attracts devotees and trekkers for its spiritual significance and scenic views.",
      image:
        "https://www.euttaranchal.com/tourism/photos/thal-kedar-temple-162065.jpg",
    },
    {
      name: "Patal Bhuvaneshwar",
      description:
        "Patal Bhuvaneshwar is a limestone cave temple dedicated to Lord Shiva. The cave features intricate natural rock formations and holds religious significance.",
      image:
        "https://www.euttaranchal.com/tourism/photos/patal-bhuvaneshwar-158065.jpg",
    },
  ];

  const attractions = [
    {
      name: "Askot Wildlife Sanctuary",
      description:
        "Askot Wildlife Sanctuary is home to diverse flora and fauna, including the Himalayan musk deer. It offers breathtaking views of the surrounding peaks.",
      image:
        "https://www.euttaranchal.com/tourism/photos/askot-wildlife-sanctuary-166065.jpg",
    },
    {
      name: "Munsiyari",
      description:
        "Munsiyari is a picturesque hill station known for its panoramic views of the Panchachuli peaks. It serves as a base for various treks in the region.",
      image: "https://www.euttaranchal.com/tourism/photos/munsiyari-167065.jpg",
    },
    {
      name: "Narayan Ashram",
      description:
        "Narayan Ashram is a spiritual and educational center established in 1936. It offers a serene environment and is surrounded by stunning landscapes.",
      image:
        "https://www.euttaranchal.com/tourism/photos/narayan-ashram-169065.jpg",
    },
    {
      name: "Jauljibi",
      description:
        "Jauljibi is a small town located at the confluence of the Kali and Gori rivers. It is known for its annual trade fair and vibrant local culture.",
      image: "https://www.euttaranchal.com/tourism/photos/jauljibi-168065.jpg",
    },
  ];

  return (
    <div className="p-8 bg-gray-50">
      <div className="flex justify-center mb-8 w-full">
        <Image
          src="https://images.unsplash.com/photo-1608497582272-627e105265ab?q=80&w=2070&auto=format&fit=crop"
          alt="Pithoragarh"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="text-center mb-10">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-900 mb-4 font-serif">
          Pithoragarh
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto font-serif">
          Pithoragarh, known as the 'Little Kashmir,' is a scenic town in
          Uttarakhand. It is renowned for its natural beauty, ancient temples,
          and proximity to the Indo-Tibetan border.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Nestled in the easternmost part of Uttarakhand, Pithoragarh is
          surrounded by towering snow-capped peaks, lush valleys, and alpine
          meadows. The town serves as a major stop for pilgrims en route to the
          sacred Kailash Mansarovar Yatra. Its strategic location near the
          Indo-Tibetan border adds to its historical and cultural significance.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pithoragarh Fort, built by the Gorkhas in the 18th century, offers
          panoramic views of the surrounding valley and mountains. Another
          significant landmark is the Kapileshwar Mahadev Temple, located inside
          a cave and dedicated to Lord Shiva. The Dhwaj Temple, perched at an
          altitude of 2,100 meters, provides stunning views of the Himalayan
          peaks and is a popular trekking destination.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Adventure seekers can explore the scenic trekking trails leading to
          the Milam and Ralam Glaciers, which pass through charming villages and
          verdant forests. The Askot Wildlife Sanctuary, home to a variety of
          flora and fauna including the elusive snow leopard and Himalayan musk
          deer, is a must-visit for nature enthusiasts.
        </p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4 font-serif">
          Pithoragarh&apos;s cultural vibrancy is reflected in its traditional
          fairs and festivals. The Jauljibi Mela, held at the confluence of the
          Kali and Gori rivers, showcases the local trade and cultural heritage.
          The markets of Pithoragarh offer handmade woolens, Pashmina shawls,
          and traditional Garhwali crafts. The town's blend of natural splendor,
          spiritual significance, and rich history makes it a captivating
          destination for travelers.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 font-serif">
          Religious Places in Pithoragarh
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
          Attractions in Pithoragarh
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
