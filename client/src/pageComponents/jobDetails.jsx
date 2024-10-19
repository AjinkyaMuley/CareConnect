import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { MessageCircle, MapPin, Clock, Calendar, DollarSign, Briefcase, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const JobDetailsPage = () => {
    const { id } = useParams();
    const [jobData, setJobData] = useState(null)
    const [loading, setLoading] = useState(true)

    const getJobDetails = async () => {
        try {
            setLoading(true)
            const response = await axios.get('http://localhost:8000/api/jobs/get-job-details/' + id)
            setJobData(response.data)
            console.log(response.data)
        } catch (error) {
            toast.error('Error fetching data')
        } finally {
            setLoading(false)
        }
    }

    console.log(jobData)

    useEffect(() => {
        getJobDetails()
    }, [])

    if (loading) {
        return (
            <div className="container mx-auto p-4 max-w-3xl flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-lg">Loading job details...</span>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            {jobData && (
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{jobData.title}</CardTitle>
                        <CardDescription>{jobData.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <p className="text-gray-700">{jobData.description}</p>
                            <div className="flex items-center">
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>{jobData.location}</span>
                            </div>
                            <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4" />
                                <span>{jobData.timing}</span>
                            </div>
                            <div className="flex items-center">
                                <DollarSign className="mr-2 h-4 w-4" />
                                <span>₹{jobData.salary} per month</span>
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="mr-2 h-4 w-4" />
                                <span>{jobData.experience} years experience required</span>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Preferences:</h3>
                                <p>{jobData.preferences}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Availability:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {jobData.availability?.length > 0 ? (
                                        jobData.availability.map((day, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {day}
                                            </span>
                                        ))
                                    ) : (
                                        <p>No availability information</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-500">Posted on: {new Date(jobData.createdAt).toLocaleDateString()}</p>
                        </div>
                        <Button className="bg-blue-500 hover:bg-blue-600">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Chat with Employer
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default JobDetailsPage;