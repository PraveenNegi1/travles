"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const districts = [
    {
      name: "Almora",
      image:
        "https://images.unsplash.com/photo-1588305665522-1c6af1f69b09?q=80&w=2070&auto=format&fit=crop",
      description:
        "Almora is known for its rich cultural heritage, scenic views of the Himalayas, and ancient temples.",
    },
    {
      name: "Bageshwar",
      image:
        "https://www.uttarapedia.com/wp-content/uploads/2023/04/Bageshwar.jpg",
      description:
        "Bageshwar is a spiritual town situated at the confluence of the Saryu and Gomti rivers.",
    },
    {
      name: "Chamoli",
      image:
        "https://images.unsplash.com/photo-1740217078341-c2a42a248f7e?q=80&w=2070&auto=format&fit=crop",
      description:
        "Chamoli is known for its beautiful meadows, temples, and the Valley of Flowers National Park.",
    },
    {
      name: "Champawat",
      image:
        "https://images.unsplash.com/photo-1667029839334-73226679baca?q=80&w=2070&auto=format&fit=crop",
      description:
        "Champawat is a historical town with ancient temples and lush green landscapes.",
    },
    {
      name: "Dehradun",
      image:
        "https://images.unsplash.com/photo-1664310448423-1883f165b607?q=80&w=2187&auto=format&fit=crop",
      description:
        "Dehradun, the capital of Uttarakhand, is known for its pleasant climate and prestigious educational institutions.",
    },
    {
      name: "Haridwar",
      image:
        "https://images.unsplash.com/photo-1653392083932-d5e9e7d2ccd1?q=80&w=2070&auto=format&fit=crop",
      description:
        "Haridwar is one of the seven holiest places in Hinduism, known for the Ganga Aarti at Har Ki Pauri.",
    },
    {
      name: "Nainital",
      image:
        "https://images.unsplash.com/photo-1610712147665-04400af97a32?q=80&w=1974&auto=format&fit=crop",
      description:
        "Nainital is a popular hill station known for its lakes, scenic views, and colonial architecture.",
    },
    {
      name: "Pauri",
      image: "/pauri.jpeg",
      description:
        "Pauri Garhwal offers panoramic views of the Himalayas and is home to many ancient temples.",
    },
    {
      name: "Pithoragarh",
      image:
        "https://images.unsplash.com/photo-1608497582272-627e105265ab?q=80&w=2070&auto=format&fit=crop",
      description:
        "Pithoragarh is known for its breathtaking valleys and the gateway to the Kailash Mansarovar Yatra.",
    },
    {
      name: "Rudraprayag",
      image:
        "https://images.unsplash.com/photo-1606722581293-628fa217a6f7?q=80&w=1974&auto=format&fit=crop",
      description:
        "Rudraprayag is one of the Panch Prayag, where the Alaknanda and Mandakini rivers meet.",
    },
    {
      name: "Tehri",
      image: "/tehri.jpeg",
      description:
        "Tehri Garhwal is known for the Tehri Dam, one of the tallest dams in the world.",
    },
    {
      name: "Udham-Singh-Nagar",
      image:
        "https://uttarakhandguide.com/wp-content/uploads/2023/04/Udham-singh-nagar.jpg",
      description:
        "Udham Singh Nagar is an agricultural hub known for its lush green fields and industrial areas.",
    },
    {
      name: "Uttarkashi",
      image:
        "https://images.unsplash.com/photo-1674594342594-c33dcc58c5f2?q=80&w=1976&auto=format&fit=crop",
      description:
        "Uttarkashi is a sacred town and a starting point for the Char Dham Yatra.",
    },
  ];

  const handleClick = (districtName) => {
    router.push(`/district/${districtName.toLowerCase()}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-center font-serif text-4xl font-bold mb-6">
        Districts of Uttarakhand
      </h1>

      <div className="md:px-24">
      <p className="text-center text-lg mb-8 text-gray-600">
        Explore the beauty and diversity of Uttarakhand's districts, each
        offering its own unique charm and attractions. From the snow-capped
        peaks of the Garhwal Himalayas to the serene lakes of Kumaon,
        Uttarakhand is a land of unmatched natural splendor and spiritual
        significance.
      </p>
      <p className="text-center text-lg mb-8 text-gray-600">
        Discover the sacred rivers and ancient temples that define the cultural
        heartbeat of the state. Experience the vibrant traditions, warm
        hospitality, and rich history that make Uttarakhand a captivating
        destination for travelers and pilgrims alike.
      </p>
      <p className="text-center text-lg mb-8 text-gray-600">
        Whether you're seeking adventure in the rugged mountain trails,
        tranquility in the peaceful valleys, or a spiritual awakening at the
        holy sites, Uttarakhand offers an experience that touches the soul. Each
        district has its own story to tell, inviting you to immerse yourself in
        the natural and cultural treasures of the 'Land of the Gods.'
      </p>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-10 text-center font-serif">
          Explore Uttarakhand's Districts
        </h2>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {districts.map((district, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
            >
              <img
                src={district.image}
                alt={district.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {district.name}
                </h3>
                <p className="text-gray-600 mt-3">{district.description}</p>
              </div>

              <div className="mt-4 mb-4 flex justify-end items-end">
                <button
                  onClick={() => handleClick(district.name)}
                  className="border bg-gradient-to-r from-blue-400 to-blue-700 rounded-lg mx-4 p-2 text-white font-serif cursor-pointer"
                >
                  know more
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
