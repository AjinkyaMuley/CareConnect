import React from 'react'
import SevaMitraBanner from './Banner'
import ServiceCard from './ServiceCard'
import WorkersTestimonialSection from './WorkerTestimonials'
import WhyChooseUs from './WhyChooseUs'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <SevaMitraBanner />
            {/* Service Section */}

            {/* INTRO */}
            <div className='my-8'>
                <p className='flex flex-row justify-center text-3xl font-serif mb-8 font-medium
                '>Our Featured Services</p>
                <p className='flex flex-row justify-center text-3xl font-sans font-semibold mb-3'>Hire professionals,</p>
                <p className='flex flex-row justify-center text-3xl font-sans font-semibold'>Experienced specifically for your needs</p>
            </div>

            {/* Services */}
            <div className='flex flex-row flex-wrap justify-center w-auto mb-6'>
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <ServiceCard />
                <div className='flex flex-col justify-center ms-6'>
                    <Link to={'/services'} className='flex items-center justify-center bg-gray-200 rounded-full p-3'>
                        <i className="fa-solid fa-ellipsis text-2xl me-2"></i>
                        <p className="text-lg font-medium leading-none">more</p>
                    </Link>
                </div>
            </div>

            {/* Workers Testimonials */}
            <WorkersTestimonialSection />

            {/* Why Choose Us */}
            <WhyChooseUs />
        </div>
    )
}

export default Home
