import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { IoTime, IoPricetag, IoArrowBack, IoStar, IoLocation, IoCheckmarkCircle } from "react-icons/io5";
import BookingModal from '../../components/Booking/BookingModal';
import { useProviderDetails } from '../../services/hooks/User/useUserProviders';

const ProviderServices = () => {
    const { id } = useParams();
    const { data: providerData, isLoading, isError } = useProviderDetails(id);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const provider = providerData?.data?.provider;

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading provider details...</p>
                </div>
            </div>
        );
    }

    if (isError || !provider) {
        return (
            <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 font-medium">Failed to load provider details. Please try again later.</p>
                    <Link to="/providers" className="text-blue-600 font-medium mt-4 block hover:underline">
                        Back to Providers
                    </Link>
                </div>
            </div>
        );
    }



    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <Link to="/providers" className="inline-flex items-center text-blue-600 font-semibold mb-6 hover:underline">
                    <IoArrowBack className="mr-2" /> Back to Providers
                </Link>

                <div className="bg-white rounded-[24px] shadow-lg overflow-hidden border border-gray-100 mb-8 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden shadow-md flex-shrink-0 group">
                        <img
                            src={provider.profileImage || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300"}
                            alt={provider.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
                            <h1 className="text-3xl font-bold text-gray-900">{provider.name}</h1>
                            <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-0.5 rounded-full text-sm font-bold w-fit mx-auto md:mx-0">
                                <IoCheckmarkCircle /> Verified
                            </span>
                        </div>
                        <p className="text-lg text-gray-600 mb-4 max-w-2xl">{provider.about}</p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-600">
                            {provider.rating && (
                                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                    <IoStar className="text-yellow-400 text-lg" />
                                    <span className="font-bold text-gray-900">{provider.rating}</span>
                                    <span className="text-gray-400 text-sm">({provider.reviews || 0} reviews)</span>
                                </div>
                            )}
                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-lg">
                                <IoLocation className="text-lg text-gray-500" />
                                <span>{provider.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-end mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Available Services</h2>
                        <p className="text-gray-500 mt-1">Select a service to book an appointment</p>
                    </div>
                    <p className="text-sm font-medium text-gray-500 mt-2 md:mt-0 bg-white px-3 py-1 rounded-lg shadow-sm">
                        {provider.services?.length || 0} services available
                    </p>
                </div>

                {provider.services && provider.services.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {provider.services.map((service) => (
                            <div key={service._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                                <div className="h-48 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60"></div>
                                    <img
                                        src={service.images && service.images.length > 0 ? service.images[0] : `https://source.unsplash.com/random/800x600/?${(service.category || 'general').replace(' ', ',')}`}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop"
                                        }}
                                        alt={service.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 z-20">
                                        <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm border border-gray-100">
                                            ${service.price}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 left-4 z-20">
                                        <span className="text-white font-bold text-lg shadow-black drop-shadow-md">{service.name}</span>
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">{service.description}</p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        <div className="flex items-center gap-1.5">
                                            <IoTime className="text-blue-500" />
                                            <span className="font-medium">{service.duration} min</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-300"></div>
                                        <div className="flex items-center gap-1.5">
                                            <IoPricetag className="text-blue-500" />
                                            <span className="font-medium">Fixed Price</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setSelectedService(service);
                                            setIsModalOpen(true);
                                        }}
                                        className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98]">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 border-dashed">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <IoPricetag className="text-2xl text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No Services Available</h3>
                        <p className="text-gray-500">This provider hasn't listed any services yet.</p>
                    </div>
                )}
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
