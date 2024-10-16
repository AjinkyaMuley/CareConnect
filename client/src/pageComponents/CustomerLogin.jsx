import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import CustomerSignUp from './CustomerSignUp';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const CustomerLogin = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const {login} = useAuth();

  const handleSendOTP = () => {
    // Implement OTP sending logic here
    console.log('Sending OTP to', phoneNumber);
    setOtpSent(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/login/user', {
        params: {
          phone_number: phoneNumber
        }
      });

      if (response.status === 200) {
        login(response.data.email);
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Toaster position="top-center" reverseOrder={false} />
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Sevamitra</CardTitle>
          <CardDescription className="text-center">Login to find service providers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex space-x-2">
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button onClick={handleSendOTP} disabled={otpSent}>
                  {otpSent ? 'OTP Sent' : 'Send OTP'}
                </Button>
              </div>
            </div>
            {otpSent && (
              <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                  id="otp"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                />
                <Button className="w-full mt-4" onClick={handleLogin} disabled={otp.length !== 6}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DialogTrigger asChild>
              <Button variant="link">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <CustomerSignUp />
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerLogin;