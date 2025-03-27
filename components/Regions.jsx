"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const diversityData = [
  {
    id: "garhwal",
    title: "Diversity of Garhwal",
    image: "/garhwal.jpg",
    
    contentAnimation: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }, // Slide from Top
    imageAnimation: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    }, // Slide from Right
    content: [
      {
        label: "🌿 Rich Cultural Heritage:",
        text: "Known for traditional music, dance, and festivals.",
      },
      {
        label: "🛕 Sacred Pilgrimage:",
        text: "Home to the Char Dham — Badrinath, Kedarnath, Gangotri, and Yamunotri.",
      },
      {
        label: "🎶 Folk Music & Dance:",
        text: '"Pandav Nritya" and "Langvir Nritya" showcase its spiritual roots.',
      },
      {
        label: "🍛 Cuisine:",
        text: 'Famous for "Chainsoo," "Aloo Ke Gutke," and "Mandua Roti."',
      },
      {
        label: "🎊 Festivals:",
        list: [
          "Phool Dei (celebrating spring)",
          "Ghee Sankranti (harvest festival)",
        ],
      },
      {
        label: "🏞️ Major Attractions:",
        list: [
          "Valley of Flowers (UNESCO site)",
          "Tungnath Temple (world's highest Shiva temple)",
          "Auli (famous for skiing)",
        ],
      },
    ],
  },
  {
    id: "kumaon",
    title: "Diversity of Kumaon",
    image: "/kumon.jpg",
   
    contentAnimation: {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    }, // Slide from Bottom
    imageAnimation: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    }, // Slide from Left
    content: [
      {
        label: "🎨 Vibrant Culture:",
        text: "Famous for colorful festivals, folk music, and crafts.",
      },
      {
        label: "🏔️ Scenic Beauty:",
        text: "Known for the lush green hills of Almora and tranquil lakes of Nainital.",
      },
      {
        label: "🎶 Folk Music & Dance:",
        text: 'Includes "Hudka" and "Turri" instruments, reflecting themes of nature and love.',
      },
      {
        label: "🍛 Cuisine:",
        list: [
          "Bhatt Ki Churkani (black bean curry)",
          "Thechwani (radish-based curry)",
          "Baadi (black soy curry)",
        ],
      },
      {
        label: "🎊 Festivals:",
        list: [
          "Nanda Devi Fair (Goddess Nanda celebration)",
          "Hilljatra (harvest festival)",
          "Harela (welcoming the monsoon)",
        ],
      },
      {
        label: "🌄 Major Attractions:",
        list: [
          "Jim Corbett National Park (India's first tiger reserve)",
          "Ranikhet (colonial hill station)",
          "Kausani (Himalayan panoramic views)",
        ],
      },
    ],
  },
];

const DiversityPage = () => {
  return (
    <div className="p-8 rounded-lg shadow-xl space-y-12 merriweather">
      {diversityData.map((region, index) => (
        <div
          key={region.id}
          className={`flex flex-col md:flex-row ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          } items-center rounded-lg shadow-lg overflow-hidden `}
        >
          <motion.div
            className="md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={region.imageAnimation}
          >
            <Image
              src={region.image}
              alt={region.title}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            className="p-6 md:w-1/2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={region.contentAnimation}
          >
            <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-4 font-serif border-l-4 pl-4">
              {region.title}
            </h2>
            <ul className="text-gray-700 space-y-3 md:text-[20px] leading-relaxed">
              {region.content.map((item, idx) => (
                <li key={idx}>
                  <span className="font-semibold text-gray-900">
                    {item.label}
                  </span>{" "}
                  {item.text}
                  {item.list && (
                    <ul className="pl-6 list-disc">
                      {item.list.map((subItem, subIdx) => (
                        <li key={subIdx}>{subItem}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default DiversityPage;
