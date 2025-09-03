import React from "react";
import { useNavigate } from "react-router-dom";

const buttonNames = [
  "Book Finder",
  "Weather Now",
  "Recipe Idea",
  "Earthquake Visualizer",
];

function Landing() {
  const navigate = useNavigate();

  const pageLinks = {
    "Home": '/',
    "Book Finder": '/Bookfinder',
    "Earthquake Visualizer": '/Earthquake-Visualizer',
    "Recipe Idea": '/Recipe-Idea',
    "Weather Now": '/Weather-now'
  };

  return (
    <div className="w-full h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col justify-center items-center text-center text-white px-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3 animate-pulse"></div>

      <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fadeIn">
        Welcome to My Assignment
      </h1>
      <p className="text-xl md:text-2xl mb-12 animate-fadeIn delay-200">
        Explore amazing code and it's output.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {buttonNames.map((name, id) => (
          <button
            key={id}
            onClick={() => navigate(pageLinks[name])}
            className="bg-white cursor-pointer text-purple-600 font-semibold px-8 py-4 rounded-2xl shadow-2xl hover:scale-105 hover:bg-purple-50 transform transition duration-300"
          >
            {name}
          </button>
        ))}
      </div>
      <p>Candidate ID: <a href="https://www.naukri.com/mnjuser/profile?id=&altresid" target="_blank" className="font-bold underline">Naukri0925</a></p>
      <p>Developed by <a href="https://github.com/TariqueMdHasan" target="_blank" className="font-bold underline">Md Tarique Hasan</a></p>
      
    </div>
  );
}

export default Landing;
