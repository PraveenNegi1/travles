"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div
        className="relative h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608497582912-bf412dc8963e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold text-white leading-tight"
          >
            Explore Uttarakhand
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-2xl text-gray-300 mt-4"
          >
            Discover the land of gods and breathtaking beauty
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
            href="/district"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg"
            >
              Discover More
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-6">
            Welcome to Uttarakhand
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto">
            Uttarakhand, known as the "Land of Gods," is a paradise for nature
            lovers and spiritual seekers. From the snow-clad peaks of the
            Himalayas to the holy rivers of the Ganges, Uttarakhand offers a
            blend of adventure, peace, and spirituality.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            Home to the famous Char Dham pilgrimage sites — Yamunotri, Gangotri,
            Kedarnath, and Badrinath — Uttarakhand holds immense religious
            significance for Hindus. The state&apos;s sacred rivers and temples
            attract devotees and spiritual seekers from all over the world.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            Beyond its spiritual allure, Uttarakhand offers breathtaking natural
            beauty. From the serene lakes of Nainital to the lush valleys of
            Mussoorie and the rugged trails of Auli, the state is a haven for
            trekkers, nature enthusiasts, and adventure lovers.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            Uttarakhand is also rich in culture and tradition. The vibrant
            festivals, folk music, and traditional Garhwali and Kumaoni cuisine
            reflect the deep-rooted heritage of the region. The warmth and
            hospitality of the local people make every visitor feel at home.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto mt-4">
            Whether you're seeking a peaceful retreat in the mountains, a
            spiritual journey to the holy sites, or an adrenaline-pumping
            adventure in the great outdoors, Uttarakhand promises an
            unforgettable experience.
          </p>
        </div>
      </motion.section>

      <section className="py-16 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Top Highlights of Uttarakhand
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Himalayas",
                description: "Experience the majestic snow-capped peaks.",
                image:
                  "https://images.unsplash.com/photo-1623727705498-51a6a4154384?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Spiritual Temples",
                description: "Visit ancient temples and sacred sites.",
                image:
                  "https://images.unsplash.com/photo-1650341259809-9314b0de9268?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                title: "Adventure & Trekking",
                description: "Explore the trails and untouched wilderness.",
                image:
                  "https://images.unsplash.com/photo-1628152979775-851a3980851d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzc0fHx1dHRhcmFraGFuZHxlbnwwfHwwfHx8MA%3D%3D",
              },
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300"
              >
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-56 object-cover group-hover:brightness-75 transition duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 mt-3">{highlight.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Plan Your Journey to Uttarakhand
        </h2>
        <p className="text-lg mt-2">Embark on an unforgettable adventure</p>
        <Link
          href="https://www.google.com/maps?q=Uttarakhand"
          target="_blank"
          className="mt-6 inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition duration-300"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
