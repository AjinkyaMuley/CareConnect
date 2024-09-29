import React from 'react'
import contactImage from '../assets/careConnectContact.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const Contact = () => {
    return (
        <div className='flex flex-row'>
            <div className='ms-4 basis-1/2 h-screen w-full p-6 bg-[rgb(241,240,240)] shadow-md rounded-md'>
                <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-6">Fill the form to to connect with us</h2>
                {/* Full Name Field */}
                <div className='lg:flex flex-row ms-4'>
                    <div className='basis-1/2 mb-6'>
                        <Label htmlFor="full-name" className="block text-gray-700 font-medium mb-2">
                            Full Name
                        </Label>
                        <Input
                            id="full-name"
                            type="text"
                            placeholder="Enter your full name"
                            className="border w-3/4 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 me-1"
                        />
                    </div>
                    <div className='basis-1/2'>
                        <div className="mb-6">
                            <Label htmlFor="phone" className="block ms-2 text-gray-700 font-medium mb-2">
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                type="number"
                                placeholder="Enter your phone number"
                                className="w-3/4 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                        </div>
                    </div>
                </div>
                <div className='lg:flex flex-row mb-36 ms-4'>
                    <div className='basis-1/2'>
                        <Label htmlFor="full-name" className="block text-gray-700 font-medium mb-2">
                            Email
                        </Label>
                        <Input
                            id="full-name"
                            type="email"
                            placeholder="Email Address"
                            className="border w-3/4 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600 me-1"
                        />
                    </div>
                    <div className='basis-1/2'>
                        <Button className="w-3/4 mt-5 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            Submit
                        </Button>
                    </div>
                </div>


                {/* Social Media Handles */}

                <div className='mt-8 flex flex-row justify-evenly text-center me-12'>
                    <div className='fill-blue-400 text-4xl'><i class="fa-brands fa-instagram"></i></div>
                    <div className='ms-2 fill-blue-800 text-4xl'><i class="fa-brands fa-square-facebook"></i></div>
                    <div className='ms-2 fill-blue-400 text-4xl'><i class="fa-brands fa-youtube"></i></div>
                    <div className='ms-2 fill-blue-400 text-4xl'><i class="fa-brands fa-linkedin"></i></div>
                    <div className='ms-2 fill-blue-400 text-4xl'><i class="fa-brands fa-x-twitter"></i></div>
                </div>

                {/* Terms & Conditions */}

                <div className='mt-12 me-12 flex flex-row justify-evenly'>
                    <p className='text-black/80'>Terms & Conditions</p>
                    <p className='text-black/80'>Privacy Policy</p>
                    <p className='text-black/80'>Refund Policy</p>
                </div>
            </div>
            <div className='basis-1/2 bg-gray-50 h-auto'>
                <section
                    className="relative h-screen bg-cover bg-center py-16 text-white flex flex-col items-center justify-center"
                    style={{ backgroundImage: `url(${contactImage})`}}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="relative container mx-auto px-4 -translate-y-5">
                        <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
                        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12">
                            <div className="flex items-center">
                            <i class="fa-solid fa-phone mr-3 text-2xl"></i>
                                <div>
                                    <p className="font-semibold">Helpline Number</p>
                                    <p className="text-xl">1-800-123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                            <i class="fa-solid fa-envelope mr-3 text-2xl"></i>
                                <div>
                                    <p className="font-semibold">Email Address</p>
                                    <p className="text-xl">help@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Contact
