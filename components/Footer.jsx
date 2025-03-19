"use client";
import Link from "next/link";
import { FaInstagram, FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-8">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-gray-300">
              Discover the world's best destinations with us. Your adventure
              starts here!
            </p>
          </div>

          <div className="">
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <ul>
              <li>
                <Link
                  href="/Destinations"
                  className={`relative text-white font-medium transition duration-300 hover:text-blue-300 `}
                >
                  Destinations
                </Link>
              </li>
              <li>
                <a
                  href="/blogs"
                  className="text-gray-300 hover:text-white transition"
                >
                  Travel Blogs
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition"
                >
                  About
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>

            <div className="flex items-center space-x-4 mt-4">
              <a
                href="https://instagram.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-500 transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/praveen-negi1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800 transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/PraveenNegi1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-700 my-6"></div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} TravelGo. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">Designed with for travelers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
