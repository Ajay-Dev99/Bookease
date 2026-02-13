import React from 'react';
import { Link } from 'react-router-dom';
import { IoLocation, IoTime, IoCalendar, IoCall, IoMail } from "react-icons/io5";


const providers = [
    {
        _id: "3",
        name: "Elite Fitness Center",
        about: "Achieve your fitness goals with our world-class facilities, expert trainers, and diverse range of group classes.",
        address: "Miami Beach, FL",
        email: "join@elitefitness.com",
        phoneNumber: "+1 555-0789",
        profileImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
        services: [
            { name: "Day Pass", price: 25, duration: 1440, description: "Full access to gym facilities for a single day." },
            { name: "Personal Training", price: 80, duration: 60, description: "One-on-one session with a certified personal trainer." },
            { name: "Yoga Class", price: 20, duration: 45, description: "Group yoga session for flexibility and mindfulness." },
            { name: "HIIT Session", price: 25, duration: 45, description: "High-Intensity Interval Training for maximum calorie burn." }
        ]
    },
    {
        _id: "4",
        name: "Serenity Spa & Wellness",
        about: "Escape the hustle and bustle. Rejuvenate your mind and body with our holistic spa treatments and therapeutic massages.",
        address: "San Francisco, CA",
        email: "relax@serenityspa.com",
        phoneNumber: "+1 555-1011",
        profileImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        services: [
            { name: "Swedish Massage", price: 110, duration: 60, description: "Relaxing full-body massage to ease tension." },
            { name: "Deep Tissue Massage", price: 130, duration: 60, description: "Therapeutic massage targeting deep muscle layers." },
            { name: "Aromatherapy", price: 100, duration: 50, description: "Massage using essential oils for emotional healing." },
            { name: "Hot Stone Therapy", price: 140, duration: 75, description: "Massage with smooth, heated stones for relaxation." }
        ]
    },
    {
        _id: "5",
        name: "Bright Smile Dental Clinic",
        about: "Comprehensive dental care for the whole family. We use the latest technology to ensure a comfortable and effective treatment.",
        address: "Chicago, IL",
        email: "care@brightsmile.com",
        phoneNumber: "+1 555-1213",
        profileImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
        services: [
            { name: "Regular Cleaning", price: 100, duration: 45, description: "Routine dental cleaning to maintain oral hygiene." },
            { name: "Teeth Whitening", price: 250, duration: 60, description: "Professional whitening treatment for a brighter smile." },
            { name: "Dental Exam & X-Ray", price: 150, duration: 45, description: "Complete checkup including digital X-rays." },
            { name: "Root Canal", price: 800, duration: 90, description: "Endodontic therapy to save a damaged tooth." }
        ]
    }
];

const ProvidersList = () => {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <p className="text-gray-600 font-medium">Showing {providers.length} providers</p>
                </div>

                <div className="space-y-8">
                    {providers.map((provider) => (
                        <div key={provider._id} className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                            {/* Left Column: Image & Basic Info */}
                            <div className="lg:w-[330px] p-8 flex flex-col border-r border-gray-100 bg-gray-50/50">
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-sm">
                                    <img src={provider.profileImage} alt={provider.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <h3 className="font-bold text-xl">{provider.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <IoLocation className="text-xl text-gray-400" />
                                        <span>{provider.address}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <IoCall className="text-xl text-gray-400" />
                                        <span>{provider.phoneNumber}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <IoMail className="text-xl text-gray-400" />
                                        <span className="truncate">{provider.email}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details & Services */}
                            <div className="flex-1 p-8">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">About Us</h2>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{provider.about}</p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Services Offered</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        {provider.services.map((service, index) => (
                                            <div key={index} className="flex flex-col p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                                                <div className="flex justify-between items-start mb-1">
                                                    <p className="font-bold text-gray-800">{service.name}</p>
                                                    <span className="font-bold text-blue-600 text-lg">${service.price}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                                                    <IoTime size={14} />
                                                    <span>{service.duration} min</span>
                                                </div>
                                                <p className="text-sm text-gray-500 line-clamp-2">{service.description}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to={`/providers/${provider._id}`} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                                        <IoCalendar size={24} />
                                        Book with {provider.name}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProvidersList;
