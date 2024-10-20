import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Star } from 'lucide-react';
import WhyChooseUs from './WhyChooseUs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const services = [
  { name: 'Maid', rating: 4.3, image: '/api/placeholder/400/300' },
  { name: 'Cook', rating: 4.8, image: '/api/placeholder/400/300' },
  { name: 'Babysitter', rating: 4.9, image: '/api/placeholder/400/300' },
  { name: 'All-Rounder', rating: 4.7, image: '/api/placeholder/400/300' },
  { name: 'Driver', rating: 4.4, image: '/api/placeholder/400/300' },
  { name: 'Gardener', rating: 4.5, image: '/api/placeholder/400/300' },
  { name: 'Electrician', rating: 4.6, image: '/api/placeholder/400/300' },
  { name: 'Carwasher', rating: 4.2, image: '/api/placeholder/400/300' },
];

const ServiceCard = ({ name, rating, image }) => (
  <Card className="overflow-hidden">
    <div className="relative">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="absolute top-2 left-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
        <Star className="w-3 h-3 mr-1" />
        {rating}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
        <p className="font-semibold">{name}</p>
      </div>
    </div>
    <CardContent className="p-4">
      <Link to={`/service/${name}`}>
        <Button className="w-full bg-yellow-400 text-black font-bold py-2 px-4 rounded hover:bg-yellow-500 transition duration-300">
          Book Now
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const AllServices = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Want your chores simplified?
        <br />
        Book a Service on SevaMitra
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-16">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
      <WhyChooseUs />
    </div>
  );
};

export default AllServices;