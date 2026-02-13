import React from 'react';
import { IoFlash, IoCalendar, IoShieldCheckmark } from "react-icons/io5";

const WhyChoose = () => {
    const features = [
        {
            icon: <IoFlash size={32} className="text-white" />,
            title: "Instant Booking",
            description: "Book appointments in seconds with our streamlined interface. No waiting, no hassle.",
            gradient: "from-blue-500 to-cyan-400"
        },
        {
            icon: <IoCalendar size={32} className="text-white" />,
            title: "Real-Time Availability",
            description: "See live availability and choose the perfect time slot that works for you.",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            icon: <IoShieldCheckmark size={32} className="text-white" />,
            title: "Secure & Reliable",
            description: "Your data is encrypted and protected. Trust in our secure booking platform.",
            gradient: "from-indigo-500 to-purple-500"
        }
    ];

    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">BookEase</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Everything you need to manage appointments effortlessly
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col items-start text-left group"
                        >
                            {/* Icon Container */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChoose;