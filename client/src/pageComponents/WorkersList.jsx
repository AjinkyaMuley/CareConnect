import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle } from 'lucide-react';

const workers = [
  { id: 1, name: "John Doe", category: "Maid", rating: 4.5, image: "/api/placeholder/150/150", details: "5 years experience, available on weekends" },
  { id: 2, name: "Jane Smith", category: "Driver", rating: 4.8, image: "/api/placeholder/150/150", details: "10 years experience, owns vehicle" },
  { id: 3, name: "Bob Johnson", category: "Gardener", rating: 4.2, image: "/api/placeholder/150/150", details: "Expert in organic gardening" },
  { id: 3, name: "Bob Johnson", category: "Gardener", rating: 4.2, image: "/api/placeholder/150/150", details: "Expert in organic gardening" },
  { id: 3, name: "Bob Johnson", category: "Gardener", rating: 4.2, image: "/api/placeholder/150/150", details: "Expert in organic gardening" },
  // Add more worker data as needed
];

const WorkersList = () => {
  const handleChatClick = (workerId) => {
    console.log(`Open chat with worker ${workerId}`);
    // Implement chat functionality here
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold ms-5 mb-6">Available Mitras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        {workers.map((worker) => (
          <Card key={worker.id} className="flex flex-col">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={worker.image} alt={worker.name} />
                  <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{worker.name}</h2>
                  <Badge variant="secondary" className="mt-1">{worker.category}</Badge>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span>{worker.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-600">{worker.details}</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button 
                className="w-full" 
                onClick={() => handleChatClick(worker.id)}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Chat with {worker.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkersList;