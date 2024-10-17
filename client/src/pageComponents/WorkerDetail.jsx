import React, { useEffect, useState } from 'react';
import { Star, MapPin, Briefcase, Users, Phone, Mail, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WorkerDetail = () => {
  const [workerDetailData, setWorkerDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchWorkerDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8000/api/workers/worker/${id}`);
        setWorkerDetailData(response.data[0]); // Access the first (and only) item in the array
      } catch (err) {
        setError('Failed to fetch worker details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workerDetailData) return <div>No worker data found</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <Card className="mb-8 shadow-lg">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-4 border-white shadow-md">
              <AvatarImage src={workerDetailData.avatarUrl} alt={workerDetailData.name} />
              <AvatarFallback className="text-2xl">{workerDetailData.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold">{workerDetailData.name}</CardTitle>
              <CardDescription className="text-xl text-blue-100">{workerDetailData.profession}</CardDescription>
              <div className="flex items-center mt-2 bg-blue-500 rounded-full px-3 py-1 inline-block">
                <Star className="text-yellow-300 mr-1" size={18} />
                <span className="font-semibold">{workerDetailData.rating} / 5</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="mr-3 text-blue-500" size={20} />
                  <span>{workerDetailData.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="mr-3 text-blue-500" size={20} />
                  <span>{workerDetailData.experience} experience</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-3 text-blue-500" size={20} />
                  <span>{workerDetailData.familyBackground}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="mr-3 text-blue-500" size={20} />
                  <span>{workerDetailData.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="mr-3 text-blue-500" size={20} />
                  <span>{workerDetailData.email}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="mr-3 text-blue-500" size={20} />
                  <span>{workerDetailData.availability}</span>
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">About Me</h3>
              <p className="text-gray-700 leading-relaxed">{workerDetailData.description}</p>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {workerDetailData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Work Experience</h3>
            <div className="bg-white rounded-lg shadow p-4">
              {workerDetailData.pastWork.map((work, index) => (
                <div key={index} className="flex justify-between items-center mb-2 last:mb-0 pb-2 last:pb-0 border-b last:border-b-0">
                  <span className="font-medium">{work.company}</span>
                  <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded">{work.duration}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Reviews</h3>
            <div className="space-y-4">
              {workerDetailData.reviews.map((review, index) => (
                <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">{review.author}</CardTitle>
                      <div className="flex items-center bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                        <Star className="text-yellow-500 mr-1" size={16} />
                        <span className="font-medium">{review.rating} / 5</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 italic">"{review.content}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-100 rounded-b-lg flex justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300">Contact {workerDetailData.name}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WorkerDetail;