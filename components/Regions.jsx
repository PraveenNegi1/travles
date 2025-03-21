import Image from "next/image";

const DiversityPage = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg shadow-lg space-y-12">
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md overflow-hidden merriweather">
        <div className="md:w-1/2 p-5">
          <Image
            src="/garhwal.jpg"
            alt="Garhwal"
            width={500}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2 ">
          <h2 className="md:text-3xl text-2xl font-extrabold text-gray-800 mb-4 inline-block font-serif">
            Diversity of Garhwal
          </h2>
          <ul className="list-none list-inside text-gray-700 space-y-2 merriweather md:text-[20px] ">
            <li>
              <span className="font-bold">Rich Cultural Heritage:</span> Known for traditional
              music, dance, and festivals.
            </li>
            <li>
              <span className="font-bold">Sacred Pilgrimage:</span> Home to the Char Dham —
              Badrinath, Kedarnath, Gangotri, and Yamunotri.
            </li>
            <li>
              <span className="font-bold">Folk Music & Dance:</span> Includes "Pandav Nritya" and
              "Langvir Nritya" which reflect the spiritual and historical roots
              of the region.
            </li>
            <li>
              <span className="font-bold">Cuisine:</span> Famous for dishes like "Chainsoo" (black
              gram curry), "Aloo Ke Gutke" (spicy potato dish), and "Mandua
              Roti" (finger millet bread).
            </li>
            <li>
              <span className="font-bold">Festivals:</span> Major festivals include:
              <ul className="list-none pl-6">
                <li>Phool Dei (celebrating spring)</li>
                <li>Ghee Sankranti (celebrating the harvest)</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Major Attractions:</span>
              <ul className="list-none pl-6">
                <li>Valley of Flowers (UNESCO World Heritage Site)</li>
                <li>Tungnath Temple (world's highest Shiva temple)</li>
                <li>Auli (famous for skiing)</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row-reverse items-center bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md overflow-hidden">
        <div className="md:w-1/2 p-5">
          <Image
            src="/kumon.jpg"
            alt="Kumaon"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="p-6 md:w-1/2 merriweather">
          <h2 className="md:text-3xl text-2xl font-extrabold text-gray-800 mb-4 inline-block font-serif">
            Diversity of Kumaon
          </h2>
          <ul className="list-none list-inside text-gray-700 space-y-2 merriweather md:text-[20px] ">
            <li>
              <span className="font-bold">Vibrant Culture:</span> Famous for colorful festivals,
              folk music, and crafts.
            </li>
            <li>
              <span className="font-bold">Scenic Beauty:</span> Known for the lush green hills of
              Almora and the tranquil lakes of Nainital.
            </li>
            <li>
              <span className="font-bold">Folk Music & Dance:</span> Kumaoni music reflects themes
              of nature and love with instruments like "Hudka" (hand drum) and
              "Turri" (wind instrument).
            </li>
            <li>
              <span className="font-bold">Cuisine:</span> Includes:
              <ul className="list-none pl-6">
                <li>"Bhatt Ki Churkani" (black bean curry)</li>
                <li>"Thechwani" (radish-based curry)</li>
                <li>"Baadi" (black soy curry)</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Festivals:</span> Major festivals include:
              <ul className="list-none pl-6">
                <li>Nanda Devi Fair (celebrating Goddess Nanda)</li>
                <li>Hilljatra (harvest festival)</li>
                <li>Harela (welcoming the monsoon)</li>
              </ul>
            </li>
            <li>
              <span className="font-bold">Major Attractions:</span>
              <ul className=" list-none pl-6">
                <li>Jim Corbett National Park (India's first tiger reserve)</li>
                <li>Ranikhet (colonial hill station)</li>
                <li>
                  Kausani (known for its panoramic views of the Himalayas)
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DiversityPage;
