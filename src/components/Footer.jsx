import React from "react";
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const socialIcons = [
    { icon: <FaGithub />, href: "https://github.com/cod3-assassin" },
    { icon: <FaTwitter />, href: "https://twitter.com/cod3_assassin" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/cod3_assassin/" },
  ];

  return (
    <footer className="bg-gray-800 text-white py-4 rounded-lg md:rounded-r-2xl">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm md:text-base mb-2 md:mb-0">
          Made with{" "}
          <span role="img" aria-label="heart">
            ❤️
          </span>{" "}
          by cod3_assassin
        </p>
        <div className="flex justify-center md:justify-end space-x-4">
          {socialIcons.map((socialIcon, index) => (
            <SocialIcon key={index} {...socialIcon} />
          ))}
        </div>
        <p className="text-sm md:text-base">© 2024 All rights reserved</p>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white rounded-full p-2 hover:bg-gray-700 transition duration-300 transform hover:scale-110 flex items-center justify-center"
    >
      {icon}
    </a>
  );
};

export default Footer;
