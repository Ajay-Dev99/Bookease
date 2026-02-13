import React from 'react';

const ProviderDashboard = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome to your provider dashboard</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Today's Bookings</p>
                    <p className="text-4xl font-bold text-blue-600">8</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Active Services</p>
                    <p className="text-4xl font-bold text-purple-600">12</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Total Revenue</p>
                    <p className="text-4xl font-bold text-green-600">$2,450</p>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
