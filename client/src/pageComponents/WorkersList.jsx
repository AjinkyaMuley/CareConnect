import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, MapPin, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const WorkersList = () => {
  const [workersData, setWorkersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChatClick = (workerId) => {
    console.log(`Open chat with worker ${workerId}`);
    // Implement chat functionality here
  };

  const getAllWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/workers/get-all-workers');
      setWorkersData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    getAllWorkers();
  }, []);
  
  console.log(workersData);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <span className="ml-2 text-xl font-semibold">Loading Mitras...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold ms-5 mb-6">Available Mitras</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-8">
        {workersData.map((worker) => (
          <Link to={`/worker/${worker.id}`} key={worker.id}>
            <Card className="flex flex-col">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={worker.avatarUrl} alt={worker.name} />
                    <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">{worker.name}</h2>
                    <div className="flex space-x-2 mt-1">
                      <Badge variant="secondary">{worker.profession}</Badge>
                      <Badge variant="outline" className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {worker.location}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span>{worker.rating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600">{worker.availability}</p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Link to={'/chat'}>
                  <Button
                    className="w-full"
                    onClick={() => handleChatClick(worker.id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" /> Chat with {worker.name}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WorkersList;