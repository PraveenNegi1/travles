"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const groups = [
  {
    id: "panch-badri",
    title: "Panch Badri",
    places: [
      {
        id: "badrinath",
        name: "Badrinath",
        image: "/images/badri/badrinath.webp",
        description:
          "Located at an altitude of 3,133 meters, Badrinath is the most significant of the Panch Badri. It lies between Nar and Narayan mountain ranges and is dedicated to Lord Vishnu. The temple is part of the Char Dham and Chota Char Dham Yatra and is known for its hot water spring 'Tapt Kund'.",
      },
      {
        id: "yogdhyan-badri",
        name: "Yogdhyan Badri",
        image: "/images/badri/yogdhyan-badri.jpg",
        description:
          "Situated in Pandukeshwar, Yogdhyan Badri is where King Pandu meditated and is said to have installed the bronze idol of Lord Vishnu. The idol here is in a meditative pose, unlike the standing posture in Badrinath.",
      },
      {
        id: "bhavishya-badri",
        name: "Bhavishya Badri",
        image: "/images/badri/Bhavishya-Badri-temple.jpg",
        description:
          "Located in Subain village near Joshimath, this temple is believed to be the future seat of Lord Badrinath. It is said that when the road to Badrinath is blocked due to natural calamities, Bhavishya Badri will be the new sacred site.",
      },
      {
        id: "adibadri",
        name: "Adibadri",
        image: "/images/badri/AdiBadri.JPG",
        description:
          "Adibadri is a group of 16 temples, believed to be established by Adi Shankaracharya to promote Hinduism in remote areas. The main temple is dedicated to Narayan and is one of the oldest Vishnu temples in the region.",
      },
      {
        id: "vriddha-badri",
        name: "Vriddha Badri",
        image: "/images/badri/Vridha-Badri.jpg",
        description:
          "Located in Animath village, this temple is believed to be the place where Lord Vishnu appeared as an old man before Sage Narada. The idol here is said to be carved by divine forces and is worshipped in a serene forest setting.",
      },
    ],
  },
  {
    id: "panch-kedar",
    title: "Panch Kedar",
    places: [
      {
        id: "kedarnath",
        name: "Kedarnath",
        image: "/images/kedar/kedarnath.avif",
        description:
          "The most famous of the Panch Kedar, Kedarnath is one of the twelve Jyotirlingas and is dedicated to Lord Shiva. It is believed that Shiva took refuge here in the form of a bull after the Kurukshetra war. The temple stands at 3,583 meters and is surrounded by snow-capped peaks.",
      },
      {
        id: "madmaheshwar",
        name: "Madmaheshwar",
        image: "/images/kedar/Madhyamaheshwar.JPG",
        description:
          "This temple is located at an elevation of 3,289 meters in the Garhwal Himalayas. It is believed that the navel of Shiva appeared here. Surrounded by lush meadows and a backdrop of Chaukhamba peaks, it offers a tranquil spiritual experience.",
      },
      {
        id: "tungnath",
        name: "Tungnath",
        image: "/Tungnath-Temple.jpg",
        description:
          "At an altitude of 3,680 meters, Tungnath is the highest Shiva temple in the world. It is associated with the arms of Shiva and lies on the Chandrashila trek route. Its stunning location and spiritual aura attract both pilgrims and trekkers.",
      },
      {
        id: "rudranath",
        name: "Rudranath",
        image: "/Rudranath-Temple.webp",
        description:
          "This natural rock temple is where the face of Lord Shiva is worshipped. Located amidst rhododendron forests and alpine meadows, Rudranath provides a scenic and meditative atmosphere for devotees.",
      },
      {
        id: "kalpeshwar",
        name: "Kalpeshwar",
        image: "/images/kedar/Kalpeshwar.webp",
        description:
          "The only Panch Kedar temple accessible throughout the year, Kalpeshwar is located in the Urgam Valley. It is associated with Lord Shiva's hair (jata) and is reached after a short trek through terraced fields and ancient villages.",
      },
    ],
  },
  {
    id: "panch-prayag",
    title: "Panch Prayag",
    places: [
      {
        id: "devprayag",
        name: "Devprayag",
        image: "/images/pryags/Devprayag.jpeg",
        description:
          "Devprayag marks the confluence of the Alaknanda and Bhagirathi rivers to form the sacred Ganga. It holds immense spiritual significance and is believed to be the meditation site of sage Devasharma.",
      },
      {
        id: "rudraprayag",
        name: "Rudraprayag",
        image: "/images/pryags/rudraprayag.jpg",
        description:
          "Here, the Alaknanda meets the Mandakini River. The place is named after Lord Rudra (a form of Shiva) and has ancient temples such as Rudranath and Chamunda Devi that enhance its sanctity.",
      },
      {
        id: "karnaprayag",
        name: "Karnaprayag",
        image: "/images/pryags/Karanprayag1.jpg",
        description:
          "This confluence of the Alaknanda and Pindar rivers is named after Karna from the Mahabharata. It is believed that Karna meditated and performed penance here to attain divine powers.",
      },
      {
        id: "nandaprayag",
        name: "Nandaprayag",
        image: "/images/pryags/Nandaprayag-1.jpg",
        description:
          "At Nandaprayag, the Alaknanda and Nandakini rivers meet. It is associated with King Nanda, the foster father of Lord Krishna, and is surrounded by beautiful Himalayan vistas.",
      },
      {
        id: "vishnuprayag",
        name: "Vishnuprayag",
        image: "/images/pryags/Vishnuprayag.webp",
        description:
          "The first of the five Prayags, Vishnuprayag is the confluence of the Alaknanda and Dhauliganga rivers. According to mythology, Sage Narada meditated here and was blessed by Lord Vishnu.",
      },
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ImageWithFallback = ({ src, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = useCallback(() => {
    setImgSrc("/api/placeholder/400/300");
  }, []);

  return (
    <div className={`${className} relative bg-gray-100 overflow-hidden`}>
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
        onError={handleError}
      />
    </div>
  );
};

const DestinationCard = ({ place, index }) => {
  return (
    <motion.div
      custom={index}
      variants={fadeIn}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="bg-white border border-gray-200 rounded-2xl shadow-md transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-400"
      tabIndex={0}
    >
      <ImageWithFallback
        src={place.image}
        alt={`View of ${place.name}`}
        className="w-full h-48"
      />
      <div className="p-5">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 font-serif">
          {place.name}
        </h3>
        <p className="text-base sm:text-lg md:text-xl merriweather text-gray-700 leading-relaxed">
          {place.description}
        </p>
      </div>
    </motion.div>
  );
};

const DestinationGroup = ({ group, index }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.section
      key={group.id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      custom={index}
      className="mb-12 md:mb-20"
      aria-labelledby={`heading-${group.id}`}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center gap-2 group focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-lg py-2"
        aria-expanded={isExpanded}
        aria-controls={`section-${group.id}`}
      >
        <h2
          id={`heading-${group.id}`}
          className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-800 underline underline-offset-4 group-hover:text-[#205781] transition-colors merriweather"
        >
          {group.title}
        </h2>
        <span
          className="text-gray-600 text-xl transition-transform duration-300"
          aria-hidden="true"
        >
          {isExpanded ? "▼" : "►"}
        </span>
      </button>

      {isExpanded && (
        <>
          {/* ✅ Mobile Swiper Carousel */}
          <div className="sm:hidden mt-6">
            <Swiper spaceBetween={16} slidesPerView={1}>
              {group.places.map((place, placeIndex) => (
                <SwiperSlide key={place.id}>
                  <DestinationCard place={place} index={placeIndex} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ✅ Grid Layout for sm and above */}
          <motion.div
            id={`section-${group.id}`}
            className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 mt-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {group.places.map((place, placeIndex) => (
              <DestinationCard
                key={place.id}
                place={place}
                index={placeIndex}
              />
            ))}
          </motion.div>
        </>
      )}
    </motion.section>
  );
};

const Sacreddestinations = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 md:py-20">
      <header>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-black sm:mb-16"
        >
          <span className="text-black font-serif">
            Sacred destinations of Uttarakhand
          </span>
        </motion.h1>
      </header>

      <main>
        {groups.map((group, index) => (
          <DestinationGroup key={group.id} group={group} index={index} />
        ))}
      </main>

      <footer className="mt-16 text-center text-gray-500 text-lg merriweather">
        <p>
          Explore the divine journey through the sacred sites of Uttarakhand
        </p>
      </footer>
    </div>
  );
};

export default Sacreddestinations;
