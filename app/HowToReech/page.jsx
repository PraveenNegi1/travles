"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HowToReach() {
  const travelModes = [
    {
      id: 1,
      title: "By Air ✈️",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      animation: {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
      },
      content: [
        "The nearest major airport is Jolly Grant Airport in Dehradun, offering daily flights to Delhi, Mumbai, and Bangalore.",
        "Pantnagar Airport serves the Kumaon region and operates flights from Delhi. It's a key entry point for Nainital and Jim Corbett National Park.",
        "For international travelers, Indira Gandhi International Airport (Delhi) is the closest major hub.",
        "Helicopter services are available for Kedarnath and Badrinath during the Char Dham Yatra season.",
      ],
    },
    {
      id: 2,
      title: "By Rail 🚆",
      bgColor: "bg-green-50",
      textColor: "text-green-800",
      animation: {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
      },
      content: [
        "Uttarakhand has several key railway stations: Dehradun, Haridwar, Kathgodam, and Rishikesh, well-connected to major cities.",
        "From Delhi, express trains like Shatabdi Express, Nanda Devi Express, and Jan Shatabdi Express reach Uttarakhand.",
        "Kathgodam railway station is the gateway to Nainital and Kumaon.",
        "Haridwar and Rishikesh stations serve as entry points for Char Dham Yatra and adventure activities.",
      ],
    },
    {
      id: 3,
      title: "By Road 🚗",
      bgColor: "bg-blue-50",
      textColor: "text-blue-800",
      animation: {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
      },
      content: [
        "Uttarakhand is well connected by a network of highways, accessible by car, bus, and taxi.",
        "From Delhi, NH 334 leads to Haridwar and Dehradun, while NH 9 leads to Kumaon destinations.",
        "From Chandigarh, NH 7 or NH 72 provides access to Dehradun and Mussoorie.",
        "Well-paved roads make destinations like Ranikhet, Auli, and Lansdowne easily accessible.",
      ],
    },
    {
      id: 4,
      title: "By Bus 🚌",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-800",
      animation: {
        hidden: { x: 100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 },
      },
      content: [
        "Uttarakhand Transport Corporation (UTC) operates government buses from Delhi, Chandigarh, and Lucknow.",
        "Buses from Anand Vihar ISBT (Delhi) run frequently to Haridwar, Rishikesh, Dehradun, and Nainital.",
        "Private luxury buses and Volvo services provide comfortable travel to hill stations like Mussoorie and Almora.",
      ],
    },
    {
      id: 5,
      title: "Self-Drive 🚙",
      bgColor: "bg-gray-50",
      textColor: "text-gray-800",
      animation: {
        hidden: { x: -100, opacity: 0 },
        visible: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 },
      },
      content: [
        "Driving to Uttarakhand is a scenic experience, especially for hill stations like Nainital and Mussoorie.",
        "The roads are well-maintained, but caution is required in hilly terrain.",
        "Fuel stations, roadside eateries, and repair shops are available along major highways.",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-4 overflow-hidden">
      <h1 className="text-4xl font-extrabold text-center text-[#205781] mb-12">
        How to Reach Uttarakhand
      </h1>
      <div className="flex justify-center mb-8 md:w-[600px] md:h-[500px]">
        <Image
          src="/uttarakhand-map.png"
          alt="Almora"
          width={1000}
          height={1000}
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="container mx-auto space-y-10">
        {travelModes.map((mode) => (
          <motion.div
            key={mode.id}
            className={`w-full md:w-3/4 lg:w-2/3 mx-auto p-6 rounded-xl shadow-lg border-l-4 border-opacity-75 ${mode.bgColor} border-${mode.textColor}`}
            initial="hidden"
            whileInView="visible"
            exit="hidden"
            viewport={{ amount: 0.2, once: false }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            variants={mode.animation}
          >
            <h2 className={`text-2xl font-semibold ${mode.textColor}`}>
              {mode.title}
            </h2>
            <ul className="mt-3 text-gray-700 space-y-2">
              {mode.content.map((text, idx) => (
                <li key={idx}>• {text}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
