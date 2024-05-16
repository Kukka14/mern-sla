import React from "react";
import img16 from "../../images/img16.jpg";

export default function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center">
          <div>
            <h6 className="text-green-500 font-semibold text-sm uppercase">
              About Us
            </h6>
            <h2 className="text-4xl font-bold text-zinc-800 mt-2">
              Welcome to Green Harvest Farms
            </h2>
            <p className="mt-4 text-zinc-600">
              We are an agricultural selling company dedicated to connecting
              farmers with buyers for natural, organic produce. Our mission is
              to promote sustainable farming practices and ensure access to
              high-quality, healthy food for everyone.
            </p>
            <p className="mt-2 text-zinc-500">
              At Green Harvest Farms, we are passionate about supporting local
              farmers and promoting the benefits of fresh, locally grown food.
              Our commitment to quality and sustainability drives everything we
              do.
            </p>
            <div className="mt-6">
              <div className="flex items-center">
                <div className="text-green-500 text-3xl font-bold">01</div>
                <div className="ml-4 text-lg text-zinc-800">
                  Direct from Farm to Table
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="text-green-500 text-3xl font-bold">02</div>
                <div className="ml-4 text-lg text-zinc-800">
                  Promoting Sustainable Agriculture
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 md:mt-0">
          <img
            src={img16}
            alt="Fresh vegetables"
            className="rounded-lg shadow-lg"
          />
          <div className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg mt-4 mr-4">
            <div className="text-orange-500 text-4xl font-bold">18</div>
            <div className="text-zinc-800 text-sm">Years of experience</div>
          </div>
        </div>
      </div>
    </div>
  );
}
