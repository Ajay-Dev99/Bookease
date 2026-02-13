import React from 'react';
import { Link } from 'react-router-dom';
import { IoCheckmarkCircle, IoStar, IoLocation, IoTime, IoBriefcase, IoSchool, IoGlobe, IoCalendar } from "react-icons/io5";

const providers = [
    {
        id: 1,
        name: "City General Hospital",
        title: "Medical Center",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b9af923?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        rating: 4.8,
        reviews: 1240,
        location: "Downtown, New York",
        responseTime: "24/7 Service",
        experience: "25+ years serving community",
        bio: "A premier healthcare facility offering comprehensive medical services with state-of-the-art technology and compassionate care.",
        education: "JCI Accredited",
        languages: "Multilingual Staff",
        services: [
            { name: "General Checkup", price: 150, duration: "30 min" },
            { name: "Specialist Consultation", price: 250, duration: "45 min" },
            { name: "Emergency Care", price: 500, duration: "Variable" },
            { name: "Lab Testing", price: 100, duration: "30 min" }
        ]
    },
    {
        id: 2,
        name: "Luxe Beauty Lounge",
        title: "Luxury Salon",
        image: "https://images.unsplash.com/photo-1560066984-138fa6ca6bd6?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        rating: 4.9,
        reviews: 850,
        location: "Beverly Hills, CA",
        responseTime: "Within 1 hour",
        experience: "Award-winning stylists",
        bio: "Experience the epitome of luxury and style. Our salon offers premium hair, nail, and beauty treatments in a relaxing atmosphere.",
        education: "Certified Experts",
        languages: "English, Spanish",
        services: [
            { name: "Haircut & Style", price: 85, duration: "60 min" },
            { name: "Premium Facial", price: 120, duration: "75 min" },
            { name: "Manicure & Pedicure", price: 95, duration: "90 min" },
            { name: "Hair Coloring", price: 200, duration: "120 min" }
        ]
    },
    {
        id: 3,
        name: "Elite Fitness Center",
        title: "Gym & Wellness",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        rating: 4.7,
        reviews: 2100,
        location: "Miami Beach, FL",
        responseTime: "Instant Booking",
        experience: "Top-tier equipment",
        bio: "Achieve your fitness goals with our world-class facilities, expert trainers, and diverse range of group classes.",
        education: "NASM Certified Trainers",
        languages: "English",
        services: [
            { name: "Day Pass", price: 25, duration: "1 Day" },
            { name: "Personal Training", price: 80, duration: "60 min" },
            { name: "Yoga Class", price: 20, duration: "45 min" },
            { name: "HIIT Session", price: 25, duration: "45 min" }
        ]
    },
    {
        id: 4,
        name: "Serenity Spa & Wellness",
        title: "Spa & Massage",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        rating: 4.9,
        reviews: 560,
        location: "San Francisco, CA",
        responseTime: "Within 2 hours",
        experience: "Holistic Therapies",
        bio: "Escape the hustle and bustle. Rejuvenate your mind and body with our holistic spa treatments and therapeutic massages.",
        education: "Licensed Therapists",
        languages: "English, Mandarin",
        services: [
            { name: "Swedish Massage", price: 110, duration: "60 min" },
            { name: "Deep Tissue Massage", price: 130, duration: "60 min" },
            { name: "Aromatherapy", price: 100, duration: "50 min" },
            { name: "Hot Stone Therapy", price: 140, duration: "75 min" }
        ]
    },
    {
        id: 5,
        name: "Bright Smile Dental Clinic",
        title: "Dental Clinic",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
        verified: true,
        rating: 4.8,
        reviews: 420,
        location: "Chicago, IL",
        responseTime: "Same Day Appointments",
        experience: "Advanced Technology",
        bio: "Comprehensive dental care for the whole family. We use the latest technology to ensure a comfortable and effective treatment.",
        education: "Board Certified Dentists",
        languages: "English, Polish",
        services: [
            { name: "Regular Cleaning", price: 100, duration: "45 min" },
            { name: "Teeth Whitening", price: 250, duration: "60 min" },
            { name: "Dental Exam & X-Ray", price: 150, duration: "45 min" },
            { name: "Root Canal", price: 800, duration: "90 min" }
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
                        <div key={provider.id} className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
                            {/* Left Column: Image & Basic Info */}
                            <div className="lg:w-[330px] p-8 flex flex-col border-r border-gray-100 bg-gray-50/50">
                                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-sm">
                                    <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                                </div>
                                {provider.verified && (
                                    <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full w-fit mb-6">
                                        <IoCheckmarkCircle className="text-lg" />
                                        <span className="text-sm font-bold">Verified</span>
                                    </div>
                                )}

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <IoStar className="text-yellow-400 text-xl" />
                                        <span className="font-bold text-lg">{provider.rating}</span>
                                        <span className="text-gray-500">({provider.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <IoLocation className="text-xl text-gray-400" />
                                        <span>{provider.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <IoTime className="text-xl text-gray-400" />
                                        <span>Responds {provider.responseTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <IoBriefcase className="text-xl text-gray-400" />
                                        <span>{provider.experience}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details & Services */}
                            <div className="flex-1 p-8">
                                <div className="mb-8">
                                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4 mb-2">
                                        <h2 className="text-3xl font-bold text-gray-900">{provider.name}</h2>
                                        <span className="text-lg text-blue-600 font-medium">{provider.title}</span>
                                    </div>
                                    <p className="text-gray-600 text-lg leading-relaxed mb-6">{provider.bio}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Credentials</h4>
                                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                                                <IoSchool className="text-blue-500" />
                                                {provider.education}
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Languages</h4>
                                            <div className="flex items-center gap-2 text-gray-800 font-medium">
                                                <IoGlobe className="text-blue-500" />
                                                {provider.languages}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">Services Offered</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        {provider.services.map((service, index) => (
                                            <div key={index} className="flex justify-between items-center p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/30 transition-colors">
                                                <div>
                                                    <p className="font-bold text-gray-800">{service.name}</p>
                                                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                                                        <IoTime size={14} />
                                                        <span>{service.duration}</span>
                                                    </div>
                                                </div>
                                                <span className="font-bold text-blue-600 text-lg">${service.price}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link to={`/providers/${provider.id}`} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
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
