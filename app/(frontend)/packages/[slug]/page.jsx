"use client";

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

const PackageDetails = () => {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const pkg = packages.find((item) => item.id === slug);

  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 font-serif">
      <div className="relative">
        <div className="relative h-[500px] overflow-hidden bg-gray-200">
          <Image
            src={pkg.image}
            alt={pkg.title}
            fill
            className="object-cover w-full h-full"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-opacity-40" />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {pkg.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{pkg.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                <span>{pkg.views} views</span>
              </div>
              {pkg.trending && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                  🔥 Trending
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <Clock className="w-6 h-6 text-blue-600 mb-2" />,
                  label: "Duration",
                  value: pkg.duration,
                },
                {
                  icon: <Users className="w-6 h-6 text-green-600 mb-2" />,
                  label: "Group Size",
                  value: pkg.groupSize,
                },
                {
                  icon: <Calendar className="w-6 h-6 text-purple-600 mb-2" />,
                  label: "Best Time",
                  value: pkg.bestTime,
                },
                {
                  icon: <Star className="w-6 h-6 text-yellow-500 mb-2" />,
                  label: "Rating",
                  value: `${pkg.rating} (${pkg.reviews})`,
                },
              ].map(({ icon, label, value }, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition"
                >
                  {icon}
                  <p className="text-sm text-gray-600">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Mountain className="w-6 h-6 text-blue-600" />
                About This Package
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {pkg.description}
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Camera className="w-6 h-6 text-green-600" />
                Package Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {pkg.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-4 text-green-700">
                What's Included
              </h2>
              <div className="grid md:grid-cols-2 gap-3">
                {pkg.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
              <div className="space-y-4">
                {pkg.itinerary.map((day, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">{day}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg border sticky top-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    {pkg.price}
                  </span>
                  {pkg.originalPrice && (
                    <span className="text-gray-500 line-through text-lg">
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
                    {pkg.rating} ({pkg.reviews} reviews)
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Book Now
              </button>

              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-2">
                  Need help with booking?
                </p>
                <p className="font-semibold text-blue-600">📞 +91-XXXX-XXXXX</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetails;
