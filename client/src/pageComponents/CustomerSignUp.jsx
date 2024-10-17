import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import CustomerLogin from './CustomerLogin';

const CustomerSignUp = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [getOtpClicked, setGetOtpClicked] = useState(false);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleGetOtp = (e) => {
    e.preventDefault();
    setGetOtpClicked(true);
    // Implement OTP sending logic here
    console.log('Sending OTP to', phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission with OTP
    console.log('Form submitted with OTP:', otp);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign Up for Sevamitra</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={getOtpClicked ? handleSubmit : handleGetOtp} className="space-y-4">
            {!getOtpClicked && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Enter your name" 
                    className="w-full" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="Enter your phone number" 
                    className="w-full" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button className="w-full" type="submit">Get OTP</Button>
              </>
            )}
            {getOtpClicked && (
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-medium text-gray-700">Enter OTP</Label>
                <div className="flex space-x-2">
                  <Input 
                    id="otp" 
                    type="text" 
                    placeholder="Enter 6-digit OTP" 
                    className="w-full" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                  />
                  <Button onClick={handleGetOtp}>
                    Resend OTP
                  </Button>
                </div>
                <Button className="w-full mt-4" type="submit" disabled={otp.length !== 6}>
                  Submit
                </Button>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
            <DialogTrigger asChild>
              <Button variant="link">Log in</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <CustomerLogin />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerSignUp;