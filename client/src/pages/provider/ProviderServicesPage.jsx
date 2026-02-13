import React from 'react';
import { IoAdd } from 'react-icons/io5';

const ProviderServicesPage = () => {
    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Services</h1>
                    <p className="text-gray-600">Manage your service offerings and availability</p>
                </div>
                <button
                    className="px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                >
                    <IoAdd size={20} />
                    Add Service
                </button>
            </div>

            {/* Services Grid - Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Service cards will go here */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            Active
                        </span>
                        <div className="flex gap-2">
                            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                                ✏️
                            </button>
                            <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center">
                                🗑️
                            </button>
                        </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">General Consultation</h3>
                    <p className="text-sm text-gray-600 mb-4">Comprehensive health checkup and consultation</p>
                    <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">💰</span>
                            <span className="font-bold text-gray-900">$150</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">⏱️</span>
                            <span className="font-bold text-gray-600">30 min</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-600 mb-2">Available Time Slots</p>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">9:00 AM</span>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">10:00 AM</span>
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg">11:00 AM</span>
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg">+2 more</span>
                        </div>
                    </div>
                    <button className="w-full mt-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                        Deactivate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderServicesPage;
