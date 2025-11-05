"use client";

import { useState } from "react";
import { packages } from "@/lib/packageData";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  CheckCircle,
  Eye,
  Mountain,
  Camera,
} from "lucide-react";
import Popup from "@/components/PopUp";


const PackageDetails = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const pkg = packages.find((item) => item.id === slug);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-2">
            Package not found
          </h1>
          <p className="text-gray-600">
            The package you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 font-serif">
      <div className="relative md:h-[70vh] h-[40vh]  md:w-full  overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 text-white bg-gradient-to-t from-black/80 to-transparent">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">{pkg.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm sm:text-base">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{pkg.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              <span>{pkg.views} views</span>
            </div>
            {pkg.trending && (
              <span className="bg-[#205781] px-3 py-1 rounded-full text-xs sm:text-sm">
                 Trending
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: <Clock className="w-6 h-6 text-[#205781]" />,
                  label: "Duration",
                  value: pkg.duration,
                },
                {
                  icon: <Users className="w-6 h-6 text-green-600" />,
                  label: "Group Size",
                  value: pkg.groupSize,
                },
                {
                  icon: <Calendar className="w-6 h-6 text-purple-600" />,
                  label: "Best Time",
                  value: pkg.bestTime,
                },
                {
                  icon: <Star className="w-6 h-6 text-yellow-500" />,
                  label: "Rating",
                  value: `${pkg.rating} (${pkg.reviews})`,
                },
              ].map(({ icon, label, value }, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-md border hover:shadow-lg transition-all duration-300"
                >
                  {icon}
                  <p className="text-sm text-gray-500 mt-2">{label}</p>
                  <p className="font-semibold text-gray-800">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mountain className="w-6 h-6 text-[#205781]" />
                About This Package
              </h2>
              <p className="text-gray-700 text-[17px] leading-relaxed">
                {pkg.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-[#205781]" />
                Package Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {pkg.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition"
                  >
                    <CheckCircle className="w-5 h-5 text-[#205781]" />
                    <span className="font-medium text-gray-700">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow border">
              <h2 className="text-2xl font-bold mb-4 text-[#205781]">
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {pkg.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#205781]" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow border">
              <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
              <div className="space-y-4">
                {pkg.itinerary.map((day, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-[#205781]"
                  >
                    <div className="w-8 h-8 bg-[#205781] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="text-gray-800 font-medium">{day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border sticky top-28">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-3xl font-bold text-[#205781]">
                    {pkg.price}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      {pkg.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600">per person</p>

                <div className="flex items-center gap-2 mt-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(pkg.rating)
                            ? "text-yellow-500 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {pkg.rating} ({pkg.reviews})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsPopupOpen(true)} 
                className="w-full cursor-pointer bg-[#205781] text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
              >
                Book Now
              </button>

              <div className="mt-6 pt-6 border-t border-gray-200 cursor-pointer">
                <p className="text-sm text-gray-600 mb-2">
                  Need help with booking?
                </p>
                <p className="font-semibold text-[#205781]">
                   +91-9758354290
                </p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      

      <Popup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        price={pkg.price}
        packageTitle={pkg.title}
      />
    </div>
  );
};

export default PackageDetails;
