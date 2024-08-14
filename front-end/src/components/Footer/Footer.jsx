import React from 'react';
import bug from '../../assets/bug.png';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black container mx-auto text-white flex flex-col items-center py-10">
      {/* Horizontal Line */}
      <hr className="border-t-2 border-gray-custom w-full mb-10"/>

      {/* Footer Content */}
      <div className="container w-full flex flex-col items-center">
        {/* Top Row with Logo and Student Info */}
        <div className="px-40 flex justify-between">
          {/* School Logo and Description */}
          <div className="w-2/6 flex">
            <img src={bug} alt="School Logo" className="mb-4 w-[80px] h-[70px]" />
            <p className="text-white text-opacity-80 text-sm ms-5">
              This project was completed by Atlas School students for educational purposes. You can contact the students using the media provided links.
            </p>
          </div>

          {/* Student Info */}
          <div className="w-3/6 flex justify-between">
            {/* Lee */}
            <div className="flex flex-col items-start">
              <p className="text-white text-lg font-semibold">Lee West</p>
              <p className="text-white text-opacity-80 text-sm font-light">Backend developer</p>
              <div className="flex space-x-4 mt-2">
                <a href="https://github.com/LeeWest89" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/lee-a-west/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
                <a href="https://www.lee-west.com/" target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
              </div>
            </div>

            {/* Mei */}
            <div className="flex flex-col items-start">
              <p className="text-white text-lg font-semibold">Mei Sibley</p>
              <p className="text-white text-opacity-80 text-sm font-light">Backend developer</p>
              <div className="flex space-x-4 mt-2">
                <a href="https://github.com/meisibley" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/mei-sibley/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
                <a href="https://meisibley.github.io/" target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
              </div>
            </div>

            {/* Svitlana */}
            <div className="flex flex-col items-start">
              <p className="text-white text-lg font-semibold">Svitlana Pavlovska</p>
              <p className="text-white text-opacity-80 text-sm font-light">Frontend developer</p>
              <div className="flex space-x-4 mt-2">
                <a href="https://github.com/SvitLanaPavl" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
                <a href="https://www.linkedin.com/in/svitlanapavlovska/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
                <a href="https://svitlanapavl.github.io/Portfolio/" target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="text-white hover:text-primary transition ease-in-out duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Sign Up */}
        <div className="mt-12 flex container justify-center">
          <p className="text-white text-opacity-50 my-auto text-xl font-normal">Newsletter Sign Up</p>
          <div className="flex items-center w-full max-w-[799px] ml-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 rounded-full px-4 bg-[rgba(51,51,51,0.8)] text-white outline-none"
            />
            <button className="ml-4 px-8 py-2 rounded-full bg-primary text-white font-normal hover:brightness-110 transition ease-in-out duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 text-center text-white text-opacity-50 text-sm font-light">
          © 2024 Atlas School • All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
