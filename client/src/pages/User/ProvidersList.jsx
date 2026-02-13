import React from 'react';
import { Link } from 'react-router-dom';
import { IoLocation, IoTime, IoCalendar, IoCall, IoMail } from "react-icons/io5";
import { useAllProviders } from '../../services/hooks/User/useUserProviders';

const ProvidersList = () => {
    const { data: providersData, isLoading, isError } = useAllProviders();
    const providers = providersData?.data?.providers || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading providers...</p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 font-medium">Failed to load providers. Please try again later.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Our Providers</h1>
                        <p className="text-gray-600 mt-2">Discover and book appointments with top-rated professionals</p>
                    </div>
                    <p className="text-gray-500 font-medium bg-white px-4 py-2 rounded-lg shadow-sm">
                        Showing {providers.length} providers
                    </p>
                </div>

                {providers.length > 0 ? (
                    <div className="space-y-8">
                        {providers.map((provider) => (
                            <div key={provider._id} className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-100 flex flex-col lg:flex-row transition-transform hover:-translate-y-1 duration-300">
                                {/* Left Column: Image & Basic Info */}
                                <div className="lg:w-[320px] p-6 lg:p-8 flex flex-col border-r border-gray-100 bg-gray-50/50">
                                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 shadow-sm group">
                                        <img
                                            src={provider.profileImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"}
                                            alt={provider.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-bold text-xl text-gray-900">{provider.name}</h3>
                                            <p className="text-sm text-blue-600 font-medium mt-1">{provider.services?.[0]?.category || 'Service Provider'}</p>
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-gray-200/60">
                                            <div className="flex items-start gap-3 text-gray-600 group">
                                                <IoLocation className="text-xl text-gray-400 mt-0.5 group-hover:text-blue-500 transition-colors" />
                                                <span className="text-sm leading-snug">{provider.address}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 group">
                                                <IoCall className="text-xl text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                <span className="text-sm">{provider.phoneNumber}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-gray-600 group">
                                                <IoMail className="text-xl text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                <span className="text-sm truncate">{provider.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Details & Services */}
                                <div className="flex-1 p-6 lg:p-8 flex flex-col">
                                    <div className="mb-8">
                                        <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            About
                                            <div className="h-px flex-1 bg-gray-100"></div>
                                        </h2>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                            {provider.about}
                                        </p>
                                    </div>

                                    <div className="flex-grow">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            Top Services
                                            <div className="h-px flex-1 bg-gray-100"></div>
                                        </h3>

                                        {provider.services && provider.services.length > 0 ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                                {provider.services.slice(0, 4).map((service, index) => (
                                                    <div key={index} className="flex flex-col p-4 rounded-xl border border-gray-100 bg-gray-50/30 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-200">
                                                        <div className="flex justify-between items-start mb-2">
                                                            <p className="font-bold text-gray-900 line-clamp-1">{service.name}</p>
                                                            <span className="font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-sm">${service.price}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-2">
                                                            <IoTime className="text-gray-400" />
                                                            <span>{service.duration} min</span>
                                                        </div>
                                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{service.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-100 mb-8 border-dashed">
                                                <p className="text-gray-500 text-sm">No services listed yet.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <Link
                                            to={`/providers/${provider._id}`}
                                            className="w-full md:w-auto md:min-w-[200px] md:ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3.5 px-8 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <IoCalendar className="text-xl" />
                                            <span>Book Appointment</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-200">
                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoCalendar className="text-3xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No Providers Found</h3>
                        <p className="text-gray-500 max-w-md mx-auto">
                            We couldn't find any service providers at the moment. Please check back later as new professionals join our platform.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProvidersList;
