import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, MapPin, Clock, IndianRupee } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';


const AllJobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [jobsData, setJobsData] = useState([])

  const filteredJobs = jobsData.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || job.category === selectedCategory)
  );

  useEffect(() => {
    getAllJobs()
  }, [])

  const getAllJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/jobs/get-all-jobs/')
      setJobsData(response.data)
    } catch (error) {
      console.log(error)
      toast.error('Failed to Fetch data')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />
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
            {/* Add more categories as needed */}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map(job => (
          <Link to={`/jobDetail/${job.id}`}>
            <Card key={job.id}>
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
                    <span>Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
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