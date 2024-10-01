import React from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const CustomerSignUp = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">Sign Up for Sevamitra</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
              <Input id="name" placeholder="Enter your name" className="w-full" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
              <Input id="email" type="email" placeholder="Enter your email" className="w-full" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" className="w-full" />
            </div>
            <Button className="w-full">Get OTP</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Log in</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerSignUp;