"use client";

import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Camera,
  Mountain,
  Heart,
  Filter,
  ChevronDown,
  Eye,
  TrendingUp,
  Zap,
  Image,
} from "lucide-react";

const PackagesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState(new Set());
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = [
    {
      id: "all",
      name: "All Packages",
      icon: Mountain,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "adventure",
      name: "Adventure",
      icon: Mountain,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "spiritual",
      name: "Spiritual",
      icon: Heart,
      color: "from-orange-500 to-red-600",
    },
    {
      id: "wildlife",
      name: "Wildlife",
      icon: Camera,
      color: "from-yellow-500 to-orange-600",
    },
    {
      id: "family",
      name: "Family",
      icon: Users,
      color: "from-pink-500 to-rose-600",
    },
  ];

  const packages = [
    {
      id: 1,
      title: "Char Dham Yatra Complete Package",
      category: "spiritual",
      duration: "12 Days",
      price: "₹45,000",
      originalPrice: "₹55,000",
      rating: 4.8,
      reviews: 324,
      location: "Yamunotri, Gangotri, Kedarnath, Badrinath",
      groupSize: "6-8 people",
      image: "/package/chardham.webp",
      highlights: [
        "Comfortable accommodation",
        "Experienced guide",
        "All meals included",
      ],
      description:
        "Complete spiritual journey covering all four sacred shrines of Uttarakhand with premium services.",
      badge: "Most Popular",
      trending: true,
      views: "2.1k",
    },
    {
      id: 2,
      title: "Nainital & Mussoorie Hill Station Tour",
      category: "family",
      duration: "6 Days",
      price: "₹18,000",
      originalPrice: "₹22,000",
      rating: 4.6,
      reviews: 156,
      location: "Nainital, Mussoorie, Dehradun",
      groupSize: "4-12 people",
      image: "/nainilake.jpeg",
      highlights: [
        "Boating in Naini Lake",
        "Cable car rides",
        "Mall Road shopping",
        "Kempty Falls visit",
      ],
      description:
        "Perfect family getaway to the beautiful hill stations with scenic views and pleasant weather.",
      badge: "Family Favorite",
      views: "1.8k",
    },
    {
      id: 3,
      title: "Valley of Flowers Trek",
      category: "adventure",
      duration: "8 Days",
      price: "₹25,000",
      originalPrice: "₹30,000",
      rating: 4.9,
      reviews: 89,
      location: "Chamoli, Valley of Flowers",
      groupSize: "6-10 people",
      image: "/trackingof vallyofflower.jpg",
      highlights: [
        "UNESCO World Heritage site",
        "Rare Himalayan flowers",
        "Professional trek guide",
        "Camping experience",
      ],
      description:
        "Trek through the mesmerizing Valley of Flowers with its carpet of alpine flowers and stunning landscapes.",
      badge: "UNESCO Site",
      trending: true,
      views: "956",
    },
    {
      id: 4,
      title: "Jim Corbett Wildlife Safari",
      category: "wildlife",
      duration: "4 Days",
      price: "₹12,000",
      originalPrice: "₹15,000",
      rating: 4.7,
      reviews: 203,
      location: "Jim Corbett National Park",
      groupSize: "4-8 people",
      image: "/junglesafari1.jpg",
      highlights: [
        "Tiger spotting",
        "Elephant safari",
        "Bird watching",
        "Nature photography",
      ],
      description:
        "Experience the wild side of Uttarakhand with exciting wildlife safaris in India's oldest national park.",
      badge: "Wildlife Special",
      views: "1.2k",
    },
    {
      id: 5,
      title: "Rishikesh Adventure Package",
      category: "adventure",
      duration: "5 Days",
      price: "₹15,000",
      originalPrice: "₹18,000",
      rating: 4.5,
      reviews: 267,
      location: "Rishikesh, Haridwar",
      groupSize: "6-12 people",
      image: "/riverRafting.jpg",
      highlights: [
        "White water rafting",
        "Bungee jumping",
        "Yoga sessions",
        "Ganga Aarti",
      ],
      description:
        "Ultimate adventure package combining thrilling activities with spiritual experiences in the yoga capital.",
      badge: "Adventure Plus",
      views: "1.5k",
    },
    {
      id: 6,
      title: "Auli Skiing & Joshimath Tour",
      category: "adventure",
      duration: "7 Days",
      price: "₹28,000",
      originalPrice: "₹35,000",
      rating: 4.8,
      reviews: 124,
      location: "Auli, Joshimath",
      groupSize: "4-10 people",
      image: "/package/View-of-snow-covered-mountains-from-Auli.jpg",
      highlights: [
        "Skiing lessons",
        "Cable car rides",
        "Snow activities",
        "Mountain views",
      ],
      description:
        "Winter sports paradise with world-class skiing facilities and breathtaking Himalayan views.",
      badge: "Winter Special",
      trending: true,
      views: "867",
    },
  ];

  const filteredPackages =
    selectedCategory === "all"
      ? packages
      : packages.filter((pkg) => pkg.category === selectedCategory);

  const toggleFavorite = (packageId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(packageId)) {
      newFavorites.delete(packageId);
    } else {
      newFavorites.add(packageId);
    }
    setFavorites(newFavorites);
  };

  const getDiscountPercentage = (original, current) => {
    const originalNum = parseInt(original.replace("₹", "").replace(",", ""));
    const currentNum = parseInt(current.replace("₹", "").replace(",", ""));
    return Math.round(((originalNum - currentNum) / originalNum) * 100);
  };

  return (
    <div className="min-h-screen font-serif bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#1c4e75] opacity-95"></div>
          <div className="absolute inset-0 bg-black opacity-20"></div>

          {/* Animated Gradients */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40">
          <div
            className={`text-center text-white transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="flex justify-center mb-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-full p-6 border border-white border-opacity-20 shadow-2xl hover:scale-110 transition-transform duration-300">
                <Mountain className="text-white" size={64} />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black mb-8 text-white  bg-clip-text  leading-tight">
              Discover Uttarakhand
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-white leading-relaxed">
              Explore the divine beauty of Devbhoomi with our carefully curated
              travel packages. From spiritual journeys to thrilling adventures.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  50+
                </div>
                <div className="text-sm text-blue-200">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  10k+
                </div>
                <div className="text-sm text-blue-200">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  4.8★
                </div>
                <div className="text-sm text-blue-200">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="relative -mt-8 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white bg-opacity-80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white border-opacity-20">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowMobileFilter(!showMobileFilter)}
                className="w-full flex items-center justify-between bg-gradient-to-r from-slate-800 to-blue-600 text-white px-6 py-4 rounded-xl font-medium shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Filter size={20} />
                  {categories.find((c) => c.id === selectedCategory)?.name}
                </div>
                <ChevronDown
                  className={`transition-transform ${
                    showMobileFilter ? "rotate-180" : ""
                  }`}
                  size={20}
                />
              </button>
            </div>

            {/* Filter Options */}
            <div
              className={`${showMobileFilter ? "block" : "hidden"} lg:block`}
            >
              <div className="flex flex-col lg:flex-row flex-wrap gap-3 lg:gap-4 justify-center">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setShowMobileFilter(false);
                      }}
                      className={`flex items-center gap-3 px-4 sm:px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                        selectedCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : "bg-white bg-opacity-70 text-gray-700 hover:bg-white hover:bg-opacity-90 border border-gray-200 border-opacity-50 hover:shadow-lg"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="whitespace-nowrap">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-4 lg:mb-6">
            {selectedCategory === "all"
              ? "All Travel Packages"
              : `${
                  categories.find((c) => c.id === selectedCategory)?.name
                } Packages`}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Choose from our handpicked selection of amazing experiences crafted
            for unforgettable memories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 group transform hover:-translate-y-2 border border-white border-opacity-30 ${
                isVisible ? "animate-fadeIn" : ""
              }`}
              style={{
                animationDelay: `${index * 150}ms`,
              }}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-64 sm:h-72 relative">
                  {/* Package Image */}
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-[380px] h-[200px] object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                </div>

                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                  {pkg.trending && (
                    <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg backdrop-blur-sm">
                      <TrendingUp size={12} />
                      Trending
                    </span>
                  )}
                  <span className="bg-gradient-to-r from-slate-700 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                    {pkg.badge}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                    {getDiscountPercentage(pkg.originalPrice, pkg.price)}% OFF
                  </div>

                  <div className="flex items-center gap-1 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-600">
                    <Eye size={12} />
                    {pkg.views}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition duration-300 flex-1 pr-4">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 shrink-0">
                    <Star className="text-yellow-500 fill-current" size={14} />
                    <span className="text-sm font-medium text-gray-700">
                      {pkg.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <MapPin size={16} className="text-slate-700" />
                  <span className="text-sm">{pkg.location}</span>
                </div>

                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {pkg.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-slate-700" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-700" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-slate-700" />
                    <span className="text-sm font-medium text-gray-700">
                      Package Highlights:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {pkg.highlights.slice(0, 2).map((highlight, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gradient-to-r from-blue-50 to-indigo-50 text-slate-700 px-3 py-1 rounded-full border border-blue-200 border-opacity-50"
                      >
                        {highlight}
                      </span>
                    ))}
                    {pkg.highlights.length > 2 && (
                      <span className="text-xs bg-gradient-to-r from-gray-50 to-slate-50 text-gray-600 px-3 py-1 rounded-full border border-gray-200 border-opacity-50">
                        +{pkg.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl sm:text-3xl font-bold text-slate-800">
                        {pkg.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500">per person</p>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">
                        {pkg.reviews} reviews
                      </span>
                    </div>
                  </div>
                  <button className="bg-[#205781] text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 group">
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .from-opacity-60 {
          --tw-gradient-from: rgba(0, 0, 0, 0.6);
          --tw-gradient-to: rgba(0, 0, 0, 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }

        .via-opacity-20 {
          --tw-gradient-to: rgba(0, 0, 0, 0);
          --tw-gradient-stops: var(--tw-gradient-from), rgba(0, 0, 0, 0.2),
            var(--tw-gradient-to);
        }

        .from-opacity-90 {
          --tw-gradient-from: rgba(37, 99, 235, 0.9);
          --tw-gradient-to: rgba(37, 99, 235, 0);
          --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
        }
      `}</style>
    </div>
  );
};

export default PackagesPage;
