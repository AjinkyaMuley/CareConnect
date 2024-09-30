import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    name: 'Anita Sharma',
    role: 'Maid',
    content: "Sevamitra helped me find consistent work and improve my life. I'm grateful for the opportunities it has provided.",
    avatar: '/api/placeholder/100/100'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Gardener',
    content: "Thanks to Sevamitra, I've been able to showcase my skills and connect with great employers. It's been a game-changer for me.",
    avatar: '/api/placeholder/100/100'
  },
  {
    name: 'Priya Patel',
    role: 'Cook',
    content: "Sevamitra has given me the flexibility to work on my own terms. I've met wonderful families and expanded my culinary skills.",
    avatar: '/api/placeholder/100/100'
  },
  {
    name: 'Amit Singh',
    role: 'Driver',
    content: 'Finding reliable driving jobs was a challenge until I discovered Sevamitra. Now, I have a steady income and enjoy my work.',
    avatar: '/api/placeholder/100/100'
  },
  {
    name: 'Sunita Gupta',
    role: 'Babysitter',
    content: 'As a babysitter, trust is crucial. Sevamitra has helped me build a strong reputation and connect with loving families.',
    avatar: '/api/placeholder/100/100'
  }
];

const WorkersTestimonialSection = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Service Providers Say</h2>
        <Carousel className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <p className="text-gray-600 italic mb-4">"{testimonial.content}"</p>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default WorkersTestimonialSection;