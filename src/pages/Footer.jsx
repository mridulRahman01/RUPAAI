import React from "react";
import { FaFacebook, FaDiscord, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-500 to-green-600 text-white py-6 mt-16">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Side - Info */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-bold">Rupaai</h2>
          <p className="text-sm">
            A platform for kids to nourish their mental development and learn
            programming in a fun and creative way.
          </p>
          <p className="text-sm mt-2">
            All rights reserved © Rupaai {currentYear}
          </p>
        </div>

        {/* Right Side - Social Media */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            <FaDiscord size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaLinkedin size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
