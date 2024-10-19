import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function WorkerRegister() {
    const navigate = useNavigate();
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        name: "",
        profession: "",
        avatarUrl: "",
        location: "",
        experience: "",
        familyBackground: "",
        phone: "",
        email: "",
        availability: "",
        description: "",
        skills: "",
        pastWork: [{ company: "", duration: "" }],
        rating: ""
    });

    const [errors, setErrors] = useState({});
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSelectChange = (value, name) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePastWorkChange = (index, field, value) => {
        const newPastWork = [...formData.pastWork];
        newPastWork[index][field] = value;
        setFormData(prevData => ({
            ...prevData,
            pastWork: newPastWork
        }));
    };

    const addPastWork = () => {
        setFormData(prevData => ({
            ...prevData,
            pastWork: [...prevData.pastWork, { company: "", duration: "" }]
        }));
    };

    const removePastWork = (index) => {
        const newPastWork = [...formData.pastWork];
        newPastWork.splice(index, 1);
        setFormData(prevData => ({
            ...prevData,
            pastWork: newPastWork
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.profession) newErrors.profession = "Profession is required";
        if (!formData.location) newErrors.location = "Location is required";
        if (!formData.experience) newErrors.experience = "Experience is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
        if (!formData.availability) newErrors.availability = "Availability is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.skills) newErrors.skills = "Skills are required";
        if (!formData.rating) newErrors.rating = "Self-rating is required";
        if (formData.rating && (isNaN(formData.rating) || parseFloat(formData.rating) < 1 || parseFloat(formData.rating) > 5)) {
            newErrors.rating = "Rating must be a number between 1 and 5";
        }

        formData.pastWork.forEach((work, index) => {
            if (!work.company) newErrors[`pastWork${index}Company`] = "Company is required";
            if (!work.duration) newErrors[`pastWork${index}Duration`] = "Duration is required";
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form submitted:", formData);
            setIsLoading(true);
            setSubmitSuccess(true);
            // Here you would typically send the data to your backend

            try {
                const worker = {
                    name: formData.name,
                    profession: formData.profession,
                    location: formData.location,
                    experience: formData.experience,
                    phone: formData.phone,
                    email: formData.email,
                    availability: formData.availability,
                    description: formData.description,
                    skills: formData.skills.split(','),
                    rating: parseFloat(formData.rating),
                }
                const pastWork = formData.pastWork
                const response = await axios.post('http://localhost:8000/api/workers/add-worker/',
                    { worker, pastWork },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    },
                    { withCredentials: true }
                )

                toast.success('Data saved Successfully');
                setFormData({
                    name: '',
                    profession: '',
                    location: '',
                    experience: '',
                    phone: '',
                    email: '',
                    availability: '',
                    description: '',
                    skills: '',
                    rating: '',
                })
                login(response.data.email, true, response.data.id);
                navigate('/all-jobs')

            } catch (error) {
                toast.error("Couldn't Save Data....")
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Register as a Sevamitra</h1>
            {submitSuccess && (
                <Alert className="mb-6">
                    <AlertDescription>
                        Registration successful! Thank you for joining Sevamitra.
                    </AlertDescription>
                </Alert>
            )}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                    <p className="ml-4 text-lg font-semibold">Saving your data...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Profession</label>
                        <Select onValueChange={(value) => handleSelectChange(value, "profession")}>
                            <SelectTrigger className={errors.profession ? "border-red-500" : ""}>
                                <SelectValue placeholder="Select your profession" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="maid">Maid</SelectItem>
                                <SelectItem value="cook">Cook</SelectItem>
                                <SelectItem value="chauffeur">Chauffeur</SelectItem>
                                <SelectItem value="waiter">Waiter</SelectItem>
                                <SelectItem value="electrician">Electrician</SelectItem>
                                <SelectItem value="gardener">Gardener</SelectItem>
                                <SelectItem value="carwasher">Car Washer</SelectItem>
                                <SelectItem value="driver">Driver</SelectItem>
                                <SelectItem value="transporter">Transporter</SelectItem>
                                <SelectItem value="mason">Mason</SelectItem>
                                <SelectItem value="babysitter">Babysitter</SelectItem>
                                <SelectItem value="cleaner">Cleaner</SelectItem>
                                <SelectItem value="utensilwasher">Utensil Washer</SelectItem>
                                <SelectItem value="clotheswasher">Clothes Washer</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.profession && <p className="text-red-500 text-xs mt-1">{errors.profession}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Avatar URL (optional)</label>
                        <Input
                            name="avatarUrl"
                            value={formData.avatarUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/your-avatar.jpg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <Input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Your city or area"
                            className={errors.location ? "border-red-500" : ""}
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Experience</label>
                        <Input
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            placeholder="e.g., 5 years"
                            className={errors.experience ? "border-red-500" : ""}
                        />
                        {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Family Background (optional)</label>
                        <Textarea
                            name="familyBackground"
                            value={formData.familyBackground}
                            onChange={handleChange}
                            placeholder="Brief description of your family background"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+91xxxxxxxxxx"
                            className={errors.phone ? "border-red-500" : ""}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <Input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Availability</label>
                        <Input
                            name="availability"
                            value={formData.availability}
                            onChange={handleChange}
                            placeholder="e.g., Weekdays 9 AM - 5 PM"
                            className={errors.availability ? "border-red-500" : ""}
                        />
                        {errors.availability && <p className="text-red-500 text-xs mt-1">{errors.availability}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe yourself and your services"
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Skills</label>
                        <Input
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="Enter skills separated by commas"
                            className={errors.skills ? "border-red-500" : ""}
                        />
                        {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Past Work Experience</label>
                        {formData.pastWork && formData.pastWork.map((work, index) => (
                            <div key={index} className="mb-4 p-4 border rounded">
                                <Input
                                    name={`pastWork${index}Company`}
                                    value={work.company}
                                    onChange={(e) => handlePastWorkChange(index, 'company', e.target.value)}
                                    placeholder="Company name"
                                    className={errors[`pastWork${index}Company`] ? "border-red-500 mb-1" : "mb-2"}
                                />
                                {errors[`pastWork${index}Company`] && <p className="text-red-500 text-xs mb-2">{errors[`pastWork${index}Company`]}</p>}
                                <Input
                                    name={`pastWork${index}Duration`}
                                    value={work.duration}
                                    onChange={(e) => handlePastWorkChange(index, 'duration', e.target.value)}
                                    placeholder="Duration (e.g., 2 years)"
                                    className={errors[`pastWork${index}Duration`] ? "border-red-500 mb-1" : "mb-2"}
                                />
                                {errors[`pastWork${index}Duration`] && <p className="text-red-500 text-xs mb-2">{errors[`pastWork${index}Duration`]}</p>}
                                {index > 0 && (
                                    <Button type="button" onClick={() => removePastWork(index)} className="mt-2" variant="destructive">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button type="button" onClick={addPastWork} className="mt-2" variant="outline">
                            Add Past Work
                        </Button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Self-Rating (1-5)</label>
                        <Input
                            name="rating"
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={formData.rating}
                            onChange={handleChange}
                            placeholder="Rate yourself out of 5"
                            className={errors.rating ? "border-red-500" : ""}
                        />
                        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </Button>
                </form>
            )}
        </div>
    );
}