import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

const LoginPage = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSendOTP = () => {
    // Implement OTP sending logic here
    console.log('Sending OTP to', phoneNumber);
  };

  return (
    <div className="flex items-center justify-center">
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
                <Button onClick={handleSendOTP}>Send OTP</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Dialog open={isSignUpOpen} onOpenChange={setIsSignUpOpen}>
            <DialogTrigger asChild>
              <Button variant="link">Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Sign Up</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="signup-phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="signup-phone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" className="col-span-3" />
                </div>
              </div>
              <Button className="w-full">Create Account</Button>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;