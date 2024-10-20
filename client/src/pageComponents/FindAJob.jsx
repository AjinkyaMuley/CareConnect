import React, { useCallback, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export function FindAJob() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSendOTP = () => {
        // Implement OTP sending logic here
        console.log('Sending OTP to', phoneNumber);
        setOtpSent(true);
    };


    const handleSubmit = async () => {
        setIsLoading(true);
        // Implement submit logic here
        console.log('Submitting with OTP:', otp);

        try {
            const response = await axios.get('http://localhost:8000/api/login/worker/', {
                params: {
                    phone: phoneNumber
                }
            });

            if (response.status === 200) {
                login(response.data.email, true, response.data.id);
                toast.success('Login Successful');
                navigate('/all-jobs');
            }

        } catch (error) {
            toast.error('Login failed. Please try again.')
        } finally {
            setIsLoading(false);
        }
    };
    const checkLoginStatus = useCallback(() => {
        const userLogin = localStorage.getItem('user_login') === 'true';
        const isWorker = localStorage.getItem('isWorker') === 'true';
        if (userLogin && isWorker) {
            navigate('/all-jobs');
            return true;
        }
        return false;
    }, [navigate]);

    const handleSheetOpen = () => {
        if (!checkLoginStatus()) {
            setIsOpen(true);
        }
    };

    return (
        <Sheet>
            <Toaster position="top-center" reverseOrder={false} onOpenChange={handleSheetOpen} />
            <Toaster position="top-center" reverseOrder={false} />
            {
                (localStorage.getItem('user_login') == 'true' && localStorage.getItem('isWorker') == 'true') ? (
                    <Link to={'/all-jobs'}>
                        <Button
                            variant=""
                            className="relative bg-gray-50 font-mono text-xl hover:bg-gray-100 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 text-gray-600"
                        >
                            Search Job
                        </Button>
                    </Link>
                )
                    :
                    (
                        <SheetTrigger asChild>
                            <Button
                                variant=""
                                className="relative bg-gray-50 font-mono text-xl hover:bg-gray-100 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 text-gray-600"
                            >
                                Search Job
                            </Button>
                        </SheetTrigger>
                    )
            }

            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Login as a SevaMitra</SheetTitle>
                </SheetHeader>
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Phone
                                </Label>
                                <div className="col-span-3 flex space-x-2">
                                    <Input
                                        id="phone"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                    <Button onClick={handleSendOTP} disabled={otpSent}>
                                        {otpSent ? 'OTP Sent' : 'Send OTP'}
                                    </Button>
                                </div>
                            </div>
                            {otpSent && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="otp" className="text-right">
                                        OTP
                                    </Label>
                                    <Input
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="col-span-3"
                                        maxLength={6}
                                        placeholder="Enter 6-digit OTP"
                                    />
                                </div>
                            )}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit" onClick={handleSubmit} disabled={!otpSent || otp.length !== 6}>
                                    Submit
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                        <div className="mt-4 text-center">
                            <p>Not registered yet?</p>
                            <a href="/register" className="text-blue-600 hover:underline">Register as a SevaMitra</a>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}