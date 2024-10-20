import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, IndianRupee, Loader } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [jobsData, setJobsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()
  
  useEffect(() => {
    if (localStorage.getItem('user_login') !== 'true' || localStorage.getItem('isWorker') !== 'true') {
      toast.custom(
        <div className="flex items-center p-4 bg-yellow-400 text-black rounded-lg shadow-lg">
          <svg
            className="w-6 h-6 mr-2 text-black"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 18h0m-9 0a9 9 0 1118 0 9 9 0 01-18 0z"
            ></path>
          </svg>
          <span className="font-medium">Please log in first!</span>
        </div>,
      );

      navigate('/')
    }
  }, [navigate,localStorage]);


  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || job.category === selectedCategory)
  );


  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:8000/api/jobs/get-all-jobs/');
      setJobsData(response.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to Fetch data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-12 w-12 animate-spin text-primary" />
        <span className="ml-2 text-xl font-semibold">Loading jobs...</span>
      </div>
    );
  }


  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />
      {jobsData.length === 0 && (
        <div className="text-center text-2xl mt-10">No Jobs Found</div>
      )}
      <h1 className="text-3xl font-bold text-center mb-8">Job Listings on Sevamitra</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Maid">Maid</SelectItem>
            <SelectItem value="Cook">Cook</SelectItem>
            <SelectItem value="Driver">Driver</SelectItem>
            <SelectItem value="Electrician">Electrician</SelectItem>
            <SelectItem value="Gardener">Gardener</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <Link to={`/jobDetail/${job.id}`} key={job.id}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{job.title}</CardTitle>
                <Badge variant="secondary" className="mt-2">{job.category}</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <IndianRupee className="h-4 w-4 mr-2" />
                    <span>₹{job.salary} per month</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{job.timing}</span>
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    <span>Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <Button className="w-full mt-4">Apply Now</Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No jobs found matching your criteria.</p>
      )}
    </div>
  );
};

export default AllJobs;