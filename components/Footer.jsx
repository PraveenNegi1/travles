"use client";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#205781] text-[#FAF1E6] py-8 merriweather md:text-[20px]">
      <div className="container px-4 ">
        <div className="grid grid-cols-1 md:flex md:justify-center items-center gap-8 md:gap-36 ">
          <div>
            <h2 className="text-lg font-semibold mb-4">About Us</h2>
            <p className="text-[#FAF1E6]">
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
                <Link
                  href="/about"
                  className={`relative text-[#FAF1E6] font-medium transition duration-300 hover:text-blue-300 
                `}
                >
                  About
                </Link>
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
                className="bg-gradient-to-r from-[#FF0069]  to-[#7638FA] transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <FaInstagram size={24} />
              </a>

              <a
                href="https://www.linkedin.com/in/praveen-negi1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF1E6] transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <FaLinkedin size={24} />
              </a>
              <a
                href="https://github.com/PraveenNegi1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-900 transition duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#FAF1E6] my-6"></div>

        <div className="flex flex-col md:flex-row items-center justify-between md:px-4">
          <p className="text-[#FAF1E6] text-sm">
            © {new Date().getFullYear()} Travels. All rights reserved.
          </p>
          <p className="text-[#FAF1E6] text-sm">Designed with for travels.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
