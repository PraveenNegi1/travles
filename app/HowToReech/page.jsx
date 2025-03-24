import Head from "next/head";

export default function HowToReach() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6 merriweather md:text-[20px]">
        <h1 className="text-4xl font-extrabold text-center text-[#205781] mb-6">
          How to Reach Uttarakhand
        </h1>

        {/* <div className="w-full md:w-[600px] md:h-[500px] ">
          <img
            src="/uttarakhand_drainage_map.jpg"
            alt="Beautiful Uttarakhand"
            className="w-full h-full object-cover"
          />
        </div> */}

        <section className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-800">By Air</h2>
          <p className="mt-2 text-gray-700">
            The nearest major airport is Jolly Grant Airport in Dehradun, which
            is well-connected to major cities like Delhi, Mumbai, and Bangalore.
            From the airport, you can hire taxis or take buses to reach
            different parts of Uttarakhand.
          </p>
          <p className="mt-2 text-gray-700">
            Other nearby airports include Pantnagar Airport, which serves the
            Kumaon region, and Indira Gandhi International Airport in Delhi,
            which is a major hub for international travelers. From Delhi, you
            can take a domestic flight, train, or road transport to reach
            Uttarakhand.
          </p>
        </section>

        <section className="mb-6 p-4 bg-green-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-green-800">By Rail</h2>
          <p className="mt-2 text-gray-700">
            Uttarakhand has several important railway stations, including
            Dehradun, Haridwar, Kathgodam, and Rishikesh. These stations are
            well-connected with major Indian cities like Delhi, Kolkata, Mumbai,
            Lucknow, and Varanasi. From the railway stations, local transport
            options like buses and taxis are available.
          </p>
          <p className="mt-2 text-gray-700">
            If traveling from Delhi, you can board trains like Shatabdi Express,
            Nanda Devi Express, or Jan Shatabdi Express to Dehradun and
            Haridwar. From Kolkata, Mumbai, or Chennai, direct trains to
            Haridwar and Kathgodam are available.
          </p>
        </section>

        <section className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-blue-800">By Road</h2>
          <p className="mt-2 text-gray-700">
            Uttarakhand has a well-developed road network, making it accessible
            from various parts of India. Major highways connect cities like
            Delhi, Chandigarh, and Lucknow to popular destinations in
            Uttarakhand. State-run and private buses, as well as taxis, are
            readily available.
          </p>
          <p className="mt-2 text-gray-700">
            From Delhi, you can take NH 334 to reach Haridwar and Dehradun, or
            NH 9 for destinations in the Kumaon region like Nainital and Almora.
            Buses from Anand Vihar ISBT in Delhi frequently run to Haridwar,
            Rishikesh, Dehradun, and other cities in Uttarakhand.
          </p>
          <p className="mt-2 text-gray-700">
            If traveling from Chandigarh, take NH 7 or NH 72 to reach Dehradun
            and nearby hill stations. From Lucknow, buses and taxis are
            available via Bareilly and Rampur for destinations like Nainital and
            Haldwani.
          </p>
        </section>
      </div>
    </div>
  );
}
