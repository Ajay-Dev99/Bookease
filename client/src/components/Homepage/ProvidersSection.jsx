import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { IoStar, IoLocation, IoTime, IoCash, IoCalendar, IoCheckmarkCircle } from "react-icons/io5";
import { useAllProviders } from '../../services/hooks/User/useUserProviders';

const ProvidersSection = () => {
    const { data: providersData, isLoading, isError } = useAllProviders();

    const getRandomStats = (id) => {
        const ratings = [4.8, 4.9, 5.0];
        const randomRating = ratings[id.toString().charCodeAt(0) % ratings.length];
        const randomReviews = (id.toString().charCodeAt(id.toString().length - 1) * 3) + 20;
        return { rating: randomRating, reviews: randomReviews };
    };

    const providers = useMemo(() => {
        if (!providersData?.data?.providers) return [];

        return providersData.data.providers.slice(0, 6).map(provider => {
            const stats = getRandomStats(provider._id);
            const mainService = provider.services?.[0];
            const price = mainService ? mainService.price : 'Varies';
            const specialty = mainService ? mainService.category : 'General Service';

            const colors = [
                "from-blue-500 to-cyan-400",
                "from-purple-500 to-pink-500",
                "from-orange-500 to-red-500",
                "from-emerald-500 to-green-400",
                "from-indigo-500 to-blue-500",
                "from-pink-500 to-rose-400"
            ];
            const colorIndex = provider.name.length % colors.length;

            return {
                id: provider._id,
                name: provider.name,
                specialty: specialty,
                rating: stats.rating,
                reviews: stats.reviews,
                location: provider.address,
                experience: "Verified",
                price: price,
                availability: "Available",
                image: provider.profileImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300",
                categoryColor: colors[colorIndex]
            };
        });
    }, [providersData]);

    if (isLoading) {
        return (
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading verified providers...</p>
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-red-500">Failed to load providers. Please try again later.</p>
                </div>
            </section>
        );
    }

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

                {providers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {providers.map((provider) => (
                            <Link to={`/providers/${provider.id}`} key={provider.id} className="block group">
                                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
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
                                            <IoCalendar className="text-green-500 text-sm" />
                                            <span className="text-xs font-bold text-green-700">
                                                {provider.availability}
                                            </span>
                                        </div>

                                        {/* Specialty Badge */}
                                        <div className={`absolute bottom-4 left-4 bg-gradient-to-r ${provider.categoryColor} px-4 py-1.5 rounded-full shadow-lg`}>
                                            <span className="text-white text-sm font-bold tracking-wide capitalize">
                                                {provider.specialty}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                                {provider.name}
                                            </h3>
                                            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg shrink-0">
                                                <IoStar className="text-yellow-400 text-sm" />
                                                <span className="font-bold text-gray-900 text-sm">{provider.rating}</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6 flex-grow">
                                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                                <IoLocation className="text-gray-400 shrink-0" />
                                                <span className="line-clamp-1">{provider.location}</span>
                                            </div>

                                            <div className="flex items-center justify-between w-full pt-3 border-t border-gray-100">
                                                <div className="flex items-center gap-2">
                                                    <IoCheckmarkCircle className="text-blue-500" />
                                                    <span className="text-sm text-gray-500">{provider.experience}</span>
                                                </div>
                                                <div className="flex items-center gap-1 ml-auto">
                                                    <span className="text-lg font-bold text-gray-900">${provider.price}</span>
                                                    {typeof provider.price === 'number' && <span className="text-xs text-gray-400">/hr</span>}
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all active:translate-y-0 active:shadow-sm">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-3xl shadow-sm border border-gray-200">
                        <p className="text-gray-500 text-lg">No verified providers found at the moment.</p>
                        <p className="text-gray-400 mt-2">Check back soon for new professionals!</p>
                    </div>
                )}

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