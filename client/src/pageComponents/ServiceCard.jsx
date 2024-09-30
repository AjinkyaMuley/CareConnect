import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import logo from '../assets/logo.png';

const ServiceCard = () => {
  return (
    <Card className="max-w-xs md:max-w-sm w-64 me-2 border-r-2 shadow-lg hover:shadow-xl rounded-2xl transform hover:scale-105 transition-transform duration-300 mb-4">
      {/* Logo */}
      <div className="flex justify-center pt-2">
        <img src={logo} alt="logo" className="w-40 md:w-48 p-1 rounded-2xl" /> {/* Increased image width */}
      </div>

      {/* Title */}
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-lg md:text-xl font-semibold text-gray-700">Maid</CardTitle>
      </CardHeader>

      {/* Rating */}
      <CardContent className="flex flex-row justify-center items-center space-x-1 py-2">
        <div className="flex space-x-1">
          <i className="fa-solid fa-star text-yellow-400"></i>
          <i className="fa-solid fa-star text-yellow-400"></i>
          <i className="fa-solid fa-star text-yellow-400"></i>
          <i className="fa-solid fa-star text-yellow-400"></i>
          <i className="fa-solid fa-star text-yellow-400"></i>
        </div>
        <p className="text-gray-600 text-sm md:text-base">4.0</p>
      </CardContent>
    </Card>
  );
}

export default ServiceCard;
