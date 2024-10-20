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
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSendOTP = () => {
    // Implement OTP sending logic here
    console.log('Sending OTP to', phoneNumber);
    setOtpSent(true);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/login/user', {
        params: { phone_number: phoneNumber }
      });
      if (response.status === 200) {
        login(response.data.email, false, response.data.id);
        toast.success('Login successful!');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Sevamitra Login</CardTitle>
        <CardDescription>Login to find service providers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </div>
          {!otpSent && (
            <Button onClick={handleSendOTP}>Send OTP</Button>
          )}
          {otpSent && (
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="otp">Enter OTP</Label>
              <Input id="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} />
              <Button onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Sign Up</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <CustomerSignUp />
          </DialogContent>
        </Dialog>
      </CardFooter>
      <Toaster />
    </Card>
  );
};

export default CustomerLogin;