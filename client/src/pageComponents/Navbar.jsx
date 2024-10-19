import { useState, useEffect } from "react";
import { FindAJob } from "./FindAJob";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginPage from "./CustomerLogin";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const { isLoggedIn, userEmail, logout } = useAuth();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('isWorker');
        localStorage.removeItem('user_login');
    };

    const getInitial = (email) => {
        return email.charAt(0).toUpperCase();
    };

    const isWorker = localStorage.getItem('isWorker') === 'true';
    const isUserLoggedIn = localStorage.getItem('user_login') === 'true';

    return (
        <nav className="bg-gray-50 border-b border-gray-200">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="#" className="text-2xl ms-6 font-bold text-blue-600">
                    SevaMitra
                </a>

                <div>
                    <FindAJob />
                </div>

                <div className="hidden md:flex space-x-6 me-7">
                    <Link to={'/'} className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 mt-2">
                        Home
                    </Link>
                    <Link to={'/services'} className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 mt-2">
                        Services
                    </Link>
                    <Link to={'/workersList'} className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 mt-2">
                        Mitras
                    </Link>
                    <Link to={'/contact'} className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 mt-2">
                        Contact Us
                    </Link>
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-10 justify-center h-10 rounded-full bg-blue-600 text-white">
                                    {getInitial(userEmail)}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {isWorker && isUserLoggedIn ? (
                                    <>
                                        <Link to={'/all-jobs'}>
                                            <DropdownMenuItem onSelect={() => {/* Handle find job */ }}>
                                                Find Job
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onSelect={() => {/* Handle chats */ }}>
                                            Chats
                                        </DropdownMenuItem>
                                    </>
                                ) : (
                                    <>
                                        <Link to={'/post-a-job'}>
                                            <DropdownMenuItem onSelect={() => {/* Handle post a job */ }}>
                                                Post A Job
                                            </DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem onSelect={() => {/* Handle contact/messages */ }}>
                                            Contact/Messages
                                        </DropdownMenuItem>
                                    </>
                                )}
                                <DropdownMenuItem onSelect={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                            <DialogTrigger asChild>
                                <span className="relative text-gray-600 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 mt-2">
                                    <i className="fa-solid fa-right-to-bracket"></i> Login
                                </span>
                            </DialogTrigger>
                            <DialogContent className='sm:max-w-[425px]'>
                                <LoginPage />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>

                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <Link to="/" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300">Home</Link>
                    <Link to="/services" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300">Services</Link>
                    <Link to="/workersList" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300">Mitras</Link>
                    <Link to="/contact" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300">Contact Us</Link>
                    {isLoggedIn ? (
                        <>
                            {isWorker && isUserLoggedIn ? (
                                <>
                                    <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => {/* Handle find job */ }}>Find Job</a>
                                    <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => {/* Handle chats */ }}>Chats</a>
                                </>
                            ) : (
                                <>
                                    <Link to={'/post-a-job'} className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => {/* Handle post a job */ }}>Post A Job</Link>

                                    <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => {/* Handle contact/messages */ }}>Contact/Messages</a>
                                </>
                            )}
                            <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300" onClick={handleLogout}>Logout</a>
                        </>
                    ) : (
                        <a href="#" className="block px-4 py-2 text-gray-600 hover:text-blue-600 transition duration-300" onClick={() => setIsLoginOpen(true)}>Login</a>
                    )}
                </div>
            )}
        </nav>
    );
}