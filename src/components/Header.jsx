import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex flex-col md:flex-row justify-between items-center rounded-lg md:rounded-r-2xl">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center md:text-left">
          Algorithm Visualizer
        </h1>
      </div>
      <div className="flex justify-center items-center space-x-4 mt-4 md:mt-0">
        <SocialIcon href="https://github.com/cod3-assassin">
          <FaGithub />
        </SocialIcon>
        <SocialIcon href="https://twitter.com/cod3_assassin">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://www.instagram.com/cod3_assassin/">
          <FaInstagram />
        </SocialIcon>
      </div>
    </header>
  );
};

const SocialIcon = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white rounded-full p-2 hover:bg-gray-700 transition duration-300 transform hover:scale-110 flex items-center justify-center"
    >
      {children}
    </a>
  );
};

export default Header;
