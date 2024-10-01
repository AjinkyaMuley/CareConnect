import { useState } from "react";
import { FindAJob } from "./FindAJob";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginPage from "./CustomerLogin";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false)

    return (
        <nav className="bg-gray-50 border-b border-gray-200 ">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                {/* Logo */}
                <a href="#" className="text-2xl ms-6 font-bold text-blue-600">
                    SevaMitra
                </a>

                <div>
                    <FindAJob />
                </div>

                {/* Menu Items for larger screens */}
                <div className="hidden md:flex space-x-6 me-7">
                    <Link
                        to={'/'}
                        className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100"
                    >
                        Home
                    </Link>
                    <a
                        href="#"
                        className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100"
                    >
                        About Us
                    </a>
                    <Link
                        to={'/contact'}
                        className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100"
                    >
                        Contact Us
                    </Link>
                    <span
                        className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100"
                    >
                        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                            <DialogTrigger asChild>
                                <span><i class="fa-solid fa-right-to-bracket"></i> Login</span>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-[425px]'>
                                <LoginPage />
                            </DialogContent>
                        </Dialog>
                    </span>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden">
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                    >
                        Home
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                    >
                        About
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                    >
                        Services
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                    >
                        Contact
                    </a>
                    <a
                        href="#"
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300"
                    >
                        Login
                    </a>
                </div>
            )}
        </nav>
    );
}
