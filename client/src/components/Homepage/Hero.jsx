import { Link } from 'react-router-dom';
import { IoCheckmarkCircle, IoShieldCheckmark } from "react-icons/io5";

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 h-[calc(100vh-4rem)] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                    <div className="flex flex-col items-start space-y-8 z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm border border-purple-200/50 rounded-full shadow-sm">
                            <IoShieldCheckmark className="text-purple-600 text-lg" />
                            <span className="text-sm font-medium text-purple-700">Trusted by 1000+ users</span>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                            Book Appointments <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                in seconds
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                            Connect with trusted professionals. Choose your time. Confirm instantly. The easiest way to manage your schedule.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link
                                to="/providers"
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-semibold rounded-full hover:shadow-lg hover:opacity-95 transition-all transform hover:-translate-y-1 text-center"
                            >
                                Explore Providers
                            </Link>
                            <Link
                                to="/signup"
                                className="px-8 py-3 bg-white text-gray-700 border-2 border-gray-200 text-base font-semibold rounded-full hover:border-blue-200 hover:bg-blue-50 transition-all transform hover:-translate-y-1 text-center"
                            >
                                Login / Sign Up
                            </Link>
                        </div>
                    </div>

                    <div className="relative lg:h-[500px] flex items-center justify-center">
                        <div className="relative w-full max-w-xs rounded-3xl overflow-hidden shadow-2xl bg-white border-4 border-white">
                            <img
                                src="/HeroSection.png"
                                alt="App Interface"
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        <div className="absolute top-20 left-0 lg:left-8 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-white/50 flex items-center gap-3 animate-bounce-slow">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white">
                                <IoCheckmarkCircle size={20} />
                            </div>
                            <div>
                                <p className="font-bold text-gray-900 text-xs">Your Booking</p>
                                <p className="text-green-600 text-[10px] font-medium">Confirmed ✓</p>
                            </div>
                        </div>


                        <div className="absolute bottom-20 right-0 lg:right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 flex flex-col items-center gap-1 animate-bounce-slow [animation-delay:1000ms]">
                            <p className="text-blue-600 font-bold text-2xl">Today</p>
                            <p className="text-gray-500 text-xs font-medium">20+ Appointments</p>
                        </div>

                    </div>
                </div>
            </div>


        </section>
    );
};

export default Hero;
