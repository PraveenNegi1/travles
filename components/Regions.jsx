import Image from "next/image";

const DiversityPage = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg shadow-xl space-y-12 merriweather">
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02]">
        <div className="md:w-1/2">
          <Image
            src="/garhwal.jpg"
            alt="Garhwal"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-4 font-serif border-l-4 border-blue-500 pl-4">
            Diversity of Garhwal
          </h2>
          <ul className="text-gray-700 space-y-3 md:text-[20px] leading-relaxed">
            <li>
              <span className="font-semibold text-gray-900">
                🌿 Rich Cultural Heritage:
              </span>
              Known for traditional music, dance, and festivals.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                🛕 Sacred Pilgrimage:
              </span>
              Home to the Char Dham — Badrinath, Kedarnath, Gangotri, and
              Yamunotri.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                🎶 Folk Music & Dance:
              </span>
              "Pandav Nritya" and "Langvir Nritya" showcase its spiritual roots.
            </li>
            <li>
              <span className="font-semibold text-gray-900">🍛 Cuisine:</span>{" "}
              Famous for "Chainsoo," "Aloo Ke Gutke," and "Mandua Roti."
            </li>
            <li>
              <span className="font-semibold text-gray-900">🎊 Festivals:</span>
              <ul className="pl-6 list-disc">
                <li>Phool Dei (celebrating spring)</li>
                <li>Ghee Sankranti (harvest festival)</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                🏞️ Major Attractions:
              </span>
              <ul className="pl-6 list-disc">
                <li>Valley of Flowers (UNESCO site)</li>
                <li>Tungnath Temple (world's highest Shiva temple)</li>
                <li>Auli (famous for skiing)</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-[1.02]">
        <div className="md:w-1/2">
          <Image
            src="/kumon.jpg"
            alt="Kumaon"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2">
          <h2 className="md:text-4xl text-2xl font-bold text-gray-800 mb-4 font-serif border-l-4 border-blue-500 pl-4">
            Diversity of Kumaon
          </h2>
          <ul className="text-gray-700 space-y-3 md:text-[20px] leading-relaxed">
            <li>
              <span className="font-semibold text-gray-900">
                🎨 Vibrant Culture:
              </span>
              Famous for colorful festivals, folk music, and crafts.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                🏔️ Scenic Beauty:
              </span>
              Known for the lush green hills of Almora and tranquil lakes of
              Nainital.
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                🎶 Folk Music & Dance:
              </span>
              Includes "Hudka" and "Turri" instruments, reflecting themes of
              nature and love.
            </li>
            <li>
              <span className="font-semibold text-gray-900">🍛 Cuisine:</span>
              <ul className="pl-6 list-disc">
                <li>Bhatt Ki Churkani (black bean curry)</li>
                <li>Thechwani (radish-based curry)</li>
                <li>Baadi (black soy curry)</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold text-gray-900">🎊 Festivals:</span>
              <ul className="pl-6 list-disc">
                <li>Nanda Devi Fair (Goddess Nanda celebration)</li>
                <li>Hilljatra (harvest festival)</li>
                <li>Harela (welcoming the monsoon)</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold text-gray-900">
                🌄 Major Attractions:
              </span>
              <ul className="pl-6 list-disc">
                <li>Jim Corbett National Park (India’s first tiger reserve)</li>
                <li>Ranikhet (colonial hill station)</li>
                <li>Kausani (Himalayan panoramic views)</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiversityPage;
