import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { IoTime, IoPricetag, IoArrowBack, IoStar, IoLocation, IoCheckmarkCircle } from "react-icons/io5";
import BookingModal from '../../components/Booking/BookingModal';

// Mock data for providers (reused from ProvidersList for context)
const providersData = [
    {
        id: 1,
        name: "City General Hospital",
        type: "Medical Center",
        rating: 4.8,
        location: "Downtown, New York",
        image: "https://images.unsplash.com/photo-1587351021759-3e566b9af923?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        services: [
            { id: 101, name: "General Checkup", description: "Comprehensive health assessment covering vital signs and physical examination.", duration: 30, price: 150, image: "https://images.unsplash.com/photo-1579684385186-53890f9c490a?q=80&w=2070&auto=format&fit=crop" },
            { id: 102, name: "Specialist Consultation", description: "In-depth consultation with a specialized medical professional.", duration: 45, price: 250, image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop" },
            { id: 103, name: "Emergency Care", description: "Immediate medical attention for urgent health conditions.", duration: 60, price: 500, image: "https://images.unsplash.com/photo-1516574187841-693005a39649?q=80&w=2070&auto=format&fit=crop" },
            { id: 104, name: "Lab Testing", description: "Blood work and diagnostic tests for accurate health analysis.", duration: 30, price: 100, image: "https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2079&auto=format&fit=crop" }
        ]
    },
    {
        id: 2,
        name: "Luxe Beauty Lounge",
        type: "Luxury Salon",
        rating: 4.9,
        location: "Beverly Hills, CA",
        image: "https://images.unsplash.com/photo-1560066984-138fa6ca6bd6?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        services: [
            { id: 201, name: "Haircut & Style", description: "Expert cut and styling tailored to your face shape and preference.", duration: 60, price: 85, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop" },
            { id: 202, name: "Premium Facial", description: "Rejuvenating facial treatment for glowing and healthy skin.", duration: 75, price: 120, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop" },
            { id: 203, name: "Manicure & Pedicure", description: "Simultaneous hand and foot care with premium polish.", duration: 90, price: 95, image: "https://images.unsplash.com/photo-1632345031635-fe1564ea7d5f?q=80&w=2070&auto=format&fit=crop" },
            { id: 204, name: "Hair Coloring", description: "Full hair coloring service using high-quality products.", duration: 120, price: 200, image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop" }
        ]
    },
    {
        id: 3,
        name: "Elite Fitness Center",
        type: "Gym & Wellness",
        rating: 4.7,
        location: "Miami Beach, FL",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        services: [
            { id: 301, name: "Day Pass", description: "Full access to gym facilities for a single day.", duration: 1440, price: 25, image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop" }, // Duration in minutes for consistency, stored as number
            { id: 302, name: "Personal Training", description: "One-on-one session with a certified personal trainer.", duration: 60, price: 80, image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" },
            { id: 303, name: "Yoga Class", description: "Group yoga session for flexibility and mindfulness.", duration: 45, price: 20, image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop" },
            { id: 304, name: "HIIT Session", description: "High-Intensity Interval Training for maximum calorie burn.", duration: 45, price: 25, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop" }
        ]
    },
    {
        id: 4,
        name: "Serenity Spa & Wellness",
        type: "Spa & Massage",
        rating: 4.9,
        location: "San Francisco, CA",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
        verified: true,
        services: [
            { id: 401, name: "Swedish Massage", description: "Relaxing full-body massage to ease tension.", duration: 60, price: 110, image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop" },
            { id: 402, name: "Deep Tissue Massage", description: "Therapeutic massage targeting deep muscle layers.", duration: 60, price: 130, image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop" },
            { id: 403, name: "Aromatherapy", description: "Massage using essential oils for emotional healing.", duration: 50, price: 100, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=2070&auto=format&fit=crop" },
            { id: 404, name: "Hot Stone Therapy", description: "Massage with smooth, heated stones for relaxation.", duration: 75, price: 140, image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop" }
        ]
    },
    {
        id: 5,
        name: "Bright Smile Dental Clinic",
        type: "Dental Clinic",
        rating: 4.8,
        location: "Chicago, IL",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
        verified: true,
        services: [
            { id: 501, name: "Regular Cleaning", description: "Routine dental cleaning to maintain oral hygiene.", duration: 45, price: 100, image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070&auto=format&fit=crop" },
            { id: 502, name: "Teeth Whitening", description: "Professional whitening treatment for a brighter smile.", duration: 60, price: 250, image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop" },
            { id: 503, name: "Dental Exam & X-Ray", description: "Complete checkup including digital X-rays.", duration: 45, price: 150, image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2070&auto=format&fit=crop" },
            { id: 504, name: "Root Canal", description: "Endodontic therapy to save a damaged tooth.", duration: 90, price: 800, image: "https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=2070&auto=format&fit=crop" }
        ]
    }
];

const ProviderServices = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [provider, setProvider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        // Simulate API fetch by finding the provider in mock data
        const foundProvider = providersData.find(p => p.id === parseInt(id));
        setProvider(foundProvider);
    }, [id]);

    if (!provider) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading services...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/providers" className="inline-flex items-center text-blue-600 font-semibold mb-6 hover:underline">
                    <IoArrowBack className="mr-2" /> Back to Providers
                </Link>

                <div className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-100 mb-8 p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                        <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                            {provider.verified && (
                                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-0.5 rounded-full text-sm font-bold w-fit mx-auto md:mx-0">
                                    <IoCheckmarkCircle /> Verified
                                </span>
                            )}
                        </div>
                        <p className="text-xl text-blue-600 font-medium mb-3">{provider.type}</p>
                        <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600">
                            <div className="flex items-center gap-1">
                                <IoStar className="text-yellow-400 text-lg" />
                                <span className="font-bold text-gray-900">{provider.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <IoLocation className="text-lg text-gray-400" />
                                <span>{provider.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {provider.services.map((service) => (
                        <div key={service.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
                            <div className="h-48 overflow-hidden relative group">
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{service.name}</h3>
                                    <span className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-sm font-bold">${service.price}</span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{service.description}</p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center gap-1">
                                        <IoTime className="text-blue-500" />
                                        <span>{service.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoPricetag className="text-blue-500" />
                                        <span>Fixed Price</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSelectedService(service);
                                        setIsModalOpen(true);
                                    }}
                                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors mt-auto shadow-md shadow-blue-200">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                provider={provider}
                service={selectedService}
            />
        </div>
    );
};

export default ProviderServices;
