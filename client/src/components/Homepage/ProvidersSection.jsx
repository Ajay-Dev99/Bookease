import React from 'react';
import { Link } from 'react-router-dom';
import { IoStar, IoLocation, IoTime, IoCash, IoCalendar, IoCheckmarkCircle } from "react-icons/io5";

const ProvidersSection = () => {
    const providers = [
        {
            id: 1,
            name: "Dr. Sarah Mitchell",
            specialty: "General Physician",
            rating: 4.9,
            reviews: 127,
            location: "New York, NY",
            experience: "12 years",
            price: 150,
            availability: "Today",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
            categoryColor: "from-blue-500 to-cyan-400"
        },
        {
            id: 2,
            name: "James Anderson",
            specialty: "Mental Health",
            rating: 4.8,
            reviews: 95,
            location: "Los Angeles, CA",
            experience: "8 years",
            price: 120,
            availability: "Tomorrow",
            image: "https://images.unsplash.com/photo-1537368910025-40035f8ee502?auto=format&fit=crop&q=80&w=300&h=300",
            categoryColor: "from-purple-500 to-pink-500"
        },
        {
            id: 3,
            name: "Marcus Johnson",
            specialty: "Fitness Trainer",
            rating: 5.0,
            reviews: 143,
            location: "Miami, FL",
            experience: "10 years",
            price: 80,
            availability: "Today",
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=300&h=300",
            categoryColor: "from-orange-500 to-red-500"
        },
        {
            id: 4,
            name: "Dr. Emily Parker",
            specialty: "Dental Specialist",
            rating: 4.9,
            reviews: 156,
            location: "Chicago, IL",
            experience: "14 years",
            price: 180,
            availability: "Tomorrow",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
            categoryColor: "from-emerald-500 to-green-400"
        },
        {
            id: 5,
            name: "David Chen",
            specialty: "Business Consultant",
            rating: 4.9,
            reviews: 88,
            location: "San Francisco, CA",
            experience: "15 years",
            price: 200,
            availability: "This Week",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=300&h=300",
            categoryColor: "from-indigo-500 to-blue-500"
        },
        {
            id: 6,
            name: "Lisa Thompson",
            specialty: "Yoga Instructor",
            rating: 5.0,
            reviews: 112,
            location: "Austin, TX",
            experience: "9 years",
            price: 60,
            availability: "Today",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300",
            categoryColor: "from-pink-500 to-rose-400"
        }
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Service Providers</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Connect with verified professionals across various specialties
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {providers.map((provider) => (
                        <div key={provider.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group flex flex-col">
                            {/* Image Container */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={provider.image}
                                    alt={provider.name}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                {/* Availability Badge */}
                                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                                    <IoCalendar className={`text-sm ${provider.availability === 'Today' ? 'text-green-500' : 'text-blue-500'}`} />
                                    <span className={`text-xs font-bold ${provider.availability === 'Today' ? 'text-green-700' : 'text-blue-700'}`}>
                                        {provider.availability}
                                    </span>
                                </div>

                                {/* Specialty Badge */}
                                <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${provider.categoryColor} px-4 py-1.5 rounded-full shadow-lg`}>
                                    <span className="text-white text-sm font-bold tracking-wide">
                                        {provider.specialty}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {provider.name}
                                    </h3>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                        <IoStar className="text-yellow-400 text-sm" />
                                        <span className="font-bold text-gray-900 text-sm">{provider.rating}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6 flex-grow">
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <IoLocation className="text-gray-400" />
                                        <span>{provider.location}</span>
                                    </div>

                                    <div className="flex items-center justifying-between w-full pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">{provider.experience} exp</span>
                                        </div>
                                        <div className="flex items-center gap-1 ml-auto">
                                            <span className="text-lg font-bold text-gray-900">${provider.price}</span>
                                            <span className="text-xs text-gray-400">/hr</span>
                                        </div>
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-sm">
                                    Book Appointment
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        to="/providers"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 text-blue-600 text-lg font-bold rounded-full hover:bg-blue-50 transition-colors duration-300"
                    >
                        View All Providers
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProvidersSection;