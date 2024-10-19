import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const PostAJob = () => {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isWorker, setIsWorker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userLogin = localStorage.getItem('user_login') === 'true';
    const workerStatus = localStorage.getItem('isWorker') === 'true';
    setIsLoggedIn(userLogin);
    setIsWorker(workerStatus);

    if (!userLogin || workerStatus) {
      navigate('/')
    }
  }, [navigate]);

  const [jobDetails, setJobDetails] = useState({
    title: '',
    category: '',
    description: '',
    salary: '',
    timing: '',
    location: '',
    experience: '',
    preferences: '',
    availability: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvailabilityChange = (day) => {
    setJobDetails((prev) => ({
      ...prev,
      availability: prev.availability.includes(day)
        ? prev.availability.filter((d) => d !== day)
        : [...prev.availability, day],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/jobs/post-job',
        {jobDetails, userId: localStorage.getItem('user_id')},
        {
          headers: {
            'Content-Type': 'application/json'
          }
        },
        {withCredentials: true}
      );
      toast.success('Data Saved Successfully');
      setJobDetails({
        title: '',
        category: '',
        description: '',
        salary: '',
        timing: '',
        location: '',
        experience: '',
        preferences: '',
        availability: [],
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Data is not saved');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn || isWorker) {
    return null; // The useEffect will handle the redirect
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Post a Job on Sevamitra</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={jobDetails.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Experienced Cook for Family of Four"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select name="category" onValueChange={(value) => handleInputChange({ target: { name: 'category', value } })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Maid">Maid</SelectItem>
                    <SelectItem value="Cook">Cook</SelectItem>
                    <SelectItem value="Driver">Driver</SelectItem>
                    <SelectItem value="Gardener">Gardener</SelectItem>
                    <SelectItem value="Electrician">Electrician</SelectItem>
                    <SelectItem value="Babysitter">Babysitter</SelectItem>
                    {/* Add more categories as needed */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={jobDetails.description}
                  onChange={handleInputChange}
                  placeholder="Describe the job responsibilities and requirements"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary (₹ per month)</Label>
                  <Input
                    id="salary"
                    name="salary"
                    type="number"
                    value={jobDetails.salary}
                    onChange={handleInputChange}
                    placeholder="e.g., 15000"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timing">Work Timing</Label>
                  <Input
                    id="timing"
                    name="timing"
                    value={jobDetails.timing}
                    onChange={handleInputChange}
                    placeholder="e.g., 9 AM - 5 PM"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={jobDetails.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Mumbai, Maharashtra"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Required (years)</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    value={jobDetails.experience}
                    onChange={handleInputChange}
                    placeholder="e.g., 2"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferences">Preferences (optional)</Label>
                <Input
                  id="preferences"
                  name="preferences"
                  value={jobDetails.preferences}
                  onChange={handleInputChange}
                  placeholder="e.g., Non-smoker, Speaks Hindi"
                />
              </div>

              <div className="space-y-2">
                <Label>Availability Required</Label>
                <div className="flex flex-wrap gap-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={jobDetails.availability.includes(day)}
                        onCheckedChange={() => handleAvailabilityChange(day)}
                      />
                      <Label htmlFor={day}>{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  Please ensure all information is accurate. Verified employers get faster responses.
                </AlertDescription>
              </Alert>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Posting Job...' : 'Post Job'}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PostAJob;