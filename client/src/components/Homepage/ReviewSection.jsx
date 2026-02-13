import React from 'react';
import { IoStar } from "react-icons/io5";

const ReviewSection = () => {
    const reviews = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Marketing Manager",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
            review: "BookEase has transformed how I schedule appointments. The interface is intuitive and booking is incredibly fast!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Small Business Owner",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
            review: "As a service provider, this platform has simplified my booking process. My clients love how easy it is to schedule.",
            rating: 5
        },
        {
            id: 3,
            name: "Emily Rodriguez",
            role: "Freelance Consultant",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
            review: "The real-time availability feature is a game-changer. No more back-and-forth emails to find a suitable time!",
            rating: 5
        }
    ];

    return (
        <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Don't just take our word for it
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <IoStar key={i} className="text-yellow-400 text-xl" />
                                    ))}
                                </div>

                                {/* Review Text */}
                                <p className="text-gray-700 leading-relaxed text-lg italic">
                                    "{review.review}"
                                </p>
                            </div>

                            {/* User Profile */}
                            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-gray-50">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-blue-50">
                                        <img
                                            src={review.image}
                                            alt={review.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">
                                        {review.name}
                                    </h4>
                                    <p className="text-sm text-gray-500 font-medium">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewSection;