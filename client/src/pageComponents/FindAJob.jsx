import React, { useState } from 'react';
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

export function FindAJob() {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');

    const handleSendOTP = () => {
        // Implement OTP sending logic here
        console.log('Sending OTP to', phoneNumber);
        setOtpSent(true);
    };

    const handleSubmit = () => {
        // Implement submit logic here
        console.log('Submitting with OTP:', otp);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant=""
                    className="relative bg-gray-50 font-mono text-xl hover:bg-gray-100 hover:text-blue-600 transition duration-300 before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-blue-600 before:transition-transform before:duration-300 before:origin-left hover:before:scale-x-100 text-gray-600"
                >
                    Search Job
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Login as a SevaMitra</SheetTitle>
                </SheetHeader>
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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="col-span-3" 
                        />
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
            </SheetContent>
        </Sheet>
    )
}