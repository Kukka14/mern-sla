import React, { useState, useEffect } from "react";
import heroback1 from "../../images/heroBg1.jpg";
import heroback2 from "../../images/heroBg2.jpg";
import heroback3 from "../../images/heroBg3.jpg";
import heroicon1 from "../../images/iconher01.png";
import heroicon2 from "../../images/iconher02.png";
import heroicon3 from "../../images/iconher03.png";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [heroback1, heroback2, heroback3];
  const intervalDuration = 3000; // Change slide every 5 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, intervalDuration);

    return () => clearInterval(intervalId);
  }, [slides.length]);

  const changeSlide = (n) => {
    setCurrentSlide(
      (prevSlide) => (prevSlide + n + slides.length) % slides.length
    );
  };

  return (
    <div className="relative w-full">
      <div id="carousel" className="overflow-hidden relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="bg-cover bg-center h-96 text-white py-24 px-10 object-fill"
            style={{
              backgroundImage: `url(${slide})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              height: "587px",
              display: index === currentSlide ? "block" : "none",
            }}
          >
            {/* Black overlay */}
            <div
              className="absolute inset-0 bg-black opacity-50"
              style={{ zIndex: 0 }}
            ></div>
            <div className="md:w-1/2 relative z-10">
              <p className="text-4xl font-bold">Discover the Journey Ahead</p>
              <p className="text-2xl mb-10 leading-none">
                Explore our latest machinery and tools.
              </p>
              <a
                href="#"
                className="bg-green-500 py-2 px-4 text-lg text-white font-bold rounded-lg"
              >
                Shop Now
              </a>
              <a
                href="#"
                className="bg-yellow-500 py-2 px-4 text-lg text-white font-bold rounded-lg ml-4"
              >
                Learn More
              </a>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black text-white bg-opacity-50 hover:bg-opacity-75 p-2 cursor-pointer z-10"
        onClick={() => changeSlide(-1)}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black text-white bg-opacity-50 hover:bg-opacity-75 p-2 cursor-pointer z-10"
        onClick={() => changeSlide(1)}
      >
        &#10095;
      </button>
      <div className="flex justify-center gap-48 bg-herobelow">
        <div className="flex justify-around items-center">
          <img src={heroicon1} alt="Hero Icon 1" className="h-28 w-28" />
          <div>
            <p className="font-bold text-sideNavText">Return policy</p>
            <p className="text-sideNavText">Money back guarantee</p>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <img src={heroicon2} alt="Hero Icon 1" className="h-28 w-28" />
          <div>
            <p className="font-bold text-sideNavText">Return policy</p>
            <p className="text-sideNavText">Money back guarantee</p>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <img src={heroicon3} alt="Hero Icon 1" className="h-28 w-28" />
          <div>
            <p className="font-bold text-sideNavText">Return policy</p>
            <p className="text-sideNavText">Money back guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
}
