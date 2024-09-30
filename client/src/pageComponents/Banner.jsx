import React from 'react';
// import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SevaMitraBanner = () => {
    return (
        <div className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-white text-center mb-4">
                    Welcome to SevaMitra
                </h1>
                <p className="text-xl text-white text-center mb-8">
                    Connecting Employers with Skilled Service Providers
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ServiceCategory icon="👨‍🍳" title="Home Services" description="Maids, Cooks, Babysitters, Cleaners" />
                    <ServiceCategory icon="🔧" title="Skilled Labor" description="Electricians, Plumbers, Gardeners, Masons" />
                    <ServiceCategory icon="🚗" title="Transportation" description="Drivers, Chauffeurs, Transporters" />
                </div>
                <Alert className="mt-8 bg-white bg-opacity-90">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <AlertTitle>Find the Perfect Match</AlertTitle>
                    <AlertDescription>
                        SevaMitra simplifies the process of hiring reliable service providers for all your needs.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
};

const ServiceCategory = ({ icon, title, description }) => {
    return (
        <div className="bg-white bg-opacity-20 rounded-lg p-6 text-center">
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
            <p className="text-white">{description}</p>
        </div>
    );
};

export default SevaMitraBanner;