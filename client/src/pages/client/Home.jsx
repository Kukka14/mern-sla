import React, { useState, useEffect } from "react";
import heroback1 from "../../images/heroBg1.jpg";
import heroback2 from "../../images/heroBg2.jpg";
import heroback3 from "../../images/heroBg3.jpg";
import heroicon1 from "../../images/iconher01.png";
import heroicon2 from "../../images/iconher02.png";
import heroicon3 from "../../images/iconher03.png";
import { Link } from "react-router-dom";

import img from "../../images/img1.jpg";
import img12 from "../../images/img12.jpeg";
import img13 from "../../images/img13.jpeg";
import img14 from "../../images/img14.jpeg";
import img15 from "../../images/img15.jpeg";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [heroback1, heroback2, heroback3];
  const intervalDuration = 3000; 

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
    <div className="relative w-full bg-sideNavButton">
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
              <Link to="/product-view-client">
              <a
                href="/client/src/pages/client/ProductView.jsx"
                className="bg-green-500 py-2 px-4 text-lg text-white font-bold rounded-lg"
              >
                Shop Now
              </a></Link>
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
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center">
          <div className=" flex w-full lg:w-1/2 justify-center">
            <img
              src={img}
              alt="Organic Food Provider"
              className="rounded-lg shadow-lg"
              style={{ height: "470px" }}
            />
          </div>
          <div className="w-full lg:w-1/2 pl-4">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-2">
                Organic & healthy fresh food provider
              </h2>
              <p className="mb-4">Farming with Love</p>
              <div className="flex mb-4">
                <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded inline-flex items-center mr-2">
                  <span className="mr-2">🌿</span>
                  The natural products
                </button>
                <button className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                  <span className="mr-2">📅</span>
                  Everyday fresh food
                </button>
              </div>
              <p className="mb-4">
                We connect buyers and sellers of natural, are so beguiled
                demoralized charms of pleasure.
              </p>
              <p className="mb-4">
                Aliquam viverra arcu. Donec aliquet blandit enim. Suspendisse id
                quam sed eros tincidunt luctus sit amet eu nibh egestas tempus
                turpis, sit amet mattis magna varius non.
              </p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                Discover more
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-white p-10">
            <h2 className="text-center text-3xl font-bold mb-10">What we're offering to customers</h2>
            <div className="flex justify-center space-x-4">
                <div className="flex flex-col items-center bg-sideNavButtonhover p-5 rounded-lg">
                    <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
                        <img src={img12} alt="Vegetables"/>
                    </div>
                    <h3 className="text-xl mt-4">Bush Cutter</h3>
                    <p className="text-center mt-2">When nothing prevents our to we like best be.</p>
                </div>
                <div className="flex flex-col items-center bg-sideNavButtonhover p-5 rounded-lg">
                    <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
                        <img src={img13} alt="Fresh fruits" />
                    </div>
                    <h3 className="text-xl mt-4">Fertilizer</h3>
                    <p className="text-center mt-2">When nothing prevents our to we like best be.</p>
                </div>
                <div className="flex flex-col items-center bg-sideNavButtonhover p-5 rounded-lg">
                    <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
                        <img src={img14} alt="Spices" />
                    </div>
                    <h3 className="text-xl mt-4">Energizer</h3>
                    <p className="text-center mt-2">When nothing prevents our to we like best be.</p>
                </div>
                <div className="flex flex-col items-center bg-sideNavButtonhover p-5 rounded-lg">
                    <div className="w-40 h-40 bg-white rounded-full overflow-hidden">
                        <img src={img15} alt="Dried products" />
                    </div>
                    <h3 className="text-xl mt-4">Tractor</h3>
                    <p className="text-center mt-2">When nothing prevents our to we like best be.</p>
                </div>
            </div>
        </div>
    </div>
  );
}
