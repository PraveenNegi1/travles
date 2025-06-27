import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function UttarakhandTravelBlog() {
  const blogPosts = [
    {
      title: "Rishikesh: Spiritual & Thrilling",
      image: "https://images.unsplash.com/photo-1592229505726-fb7a0a844b2d",
      description:
        "Find peace with yoga retreats or chase adrenaline with river rafting in the Ganges.",
      link: "/rishikesh",
    },
    {
      title: "Nainital: Lakeside Serenity",
      image: "https://images.unsplash.com/photo-1585409677983-0f6c41ca9d3b",
      description:
        "Relax by the emerald lakes and explore the charming hill station of Nainital.",
      link: "/nainital",
    },
    {
      title: "Valley of Flowers",
      image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2",
      description:
        "Trek through vibrant meadows in this UNESCO World Heritage Site.",
      link: "/valley-of-flowers",
    },
    {
      title: "Auli: Snowy Slopes & Skiing",
      image: "https://images.unsplash.com/photo-1603320021943-b6a6e7e999d6",
      description:
        "Experience the snowy slopes and breathtaking views of this Himalayan ski paradise.",
      link: "/auli",
    },
    {
      title: "Kedarnath: Sacred Himalayan Pilgrimage",
      image: "https://images.unsplash.com/photo-1654024357492-65a8be6ff964",
      description:
        "Undertake the soul-stirring trek to one of India's most revered temples.",
      link: "/kedarnath",
    },
    {
      title: "Jim Corbett: Into the Wild",
      image: "https://images.unsplash.com/photo-1624793980170-f1a1b184c35e",
      description:
        "Explore rich biodiversity, tigers, and jungle safaris in India’s oldest national park.",
      link: "/jim-corbett",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Head>
        <title>Explore Uttarakhand - Travel Blog</title>
        <meta
          name="description"
          content="Discover the beauty of Uttarakhand through our travel blog"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="relative h-[60vh] w-full">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          alt="Uttarakhand Mountains"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-10">
          <div className="text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Discover Uttarakhand
            </h1>
            <p className="text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md">
              Spiritual journeys, mountain magic, and hidden Himalayan escapes.
            </p>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-800">
            Welcome to Our Travel Blog
          </h2>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
            From spiritual trails to snow-capped peaks, our blog brings you the
            best of Uttarakhand’s destinations. Browse travel tips, local
            stories, hidden spots, and breathtaking experiences.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full border-t border-gray-200" />

      {/* Blog Cards Section */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transform transition duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">
                  {post.description}
                </p>
                <Link
                  href={post.link}
                  className="inline-block mt-2 text-teal-600 hover:text-teal-800 font-medium text-sm"
                >
                  Explore →
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
