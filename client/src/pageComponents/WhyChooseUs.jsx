import React from 'react';
import { CheckCircle, DollarSign, HeadphonesIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <i class="fa-regular fa-circle-check text-3xl"></i>,
      title: "Rigorous Verification",
      description: "We employ AI-enhanced verification processes to ensure the highest quality service providers for your needs."
    },
    {
      icon: <i class="fa-solid fa-dollar-sign"></i>,
      title: "Transparent Pricing",
      description: "Clear, upfront pricing with no hidden fees. Get exactly what you pay for, including service guarantees."
    },
    {
      icon: <i class="fa-solid fa-headphones"></i>,
      title: "24/7 Customer Support",
      description: "Our dedicated team is always available to assist you and address any concerns promptly."
    }
  ];

  return (
    <div className="bg-gray-50 py-16 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Sevamitra</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                {reason.icon}
                <CardTitle className="mt-4 text-xl font-semibold">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;