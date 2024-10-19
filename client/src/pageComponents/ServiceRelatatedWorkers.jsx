import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, MapPin, Loader2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ServiceRelatedWorkers = () => {
  const [workersData, setWorkersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { profession } = useParams();

  const handleChatClick = (workerId) => {
    console.log(`Open chat with worker ${workerId}`);
    // Implement chat functionality here
  };

  const getAllWorkersByService = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/api/workers/get-all-workers-by-profession/' + profession);
      setWorkersData(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllWorkersByService();
  }, [profession]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="ml-2">Loading workers...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Available Mitras</h1>
      {workersData.length === 0 && (
        <p className="text-center text-gray-500">No workers available for this service</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workersData.map((worker) => (
          <Card key={worker.id} className="flex flex-col">
            <CardContent className="flex-grow p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{worker.name}</h2>
                  <p className="text-sm text-gray-500">{worker.profession}</p>
                </div>
              </div>
              <div className="flex items-center mb-2">
                <MapPin className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm">{worker.location}</span>
              </div>
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 mr-2 text-yellow-400" />
                <span className="text-sm">{worker.rating.toFixed(1)}</span>
              </div>
              <Badge variant="outline" className="mb-2">{worker.availability}</Badge>
            </CardContent>
            <CardFooter className="p-4">
              <Button 
                className="w-full" 
                onClick={() => handleChatClick(worker.id)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with {worker.name}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ServiceRelatedWorkers; 