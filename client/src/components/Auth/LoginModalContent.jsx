import { IoPerson, IoBriefcase, IoArrowForward } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const LoginModalContent = ({ onClose }) => {
    const navigate = useNavigate();

    const handleSelect = (role) => {
        onClose();
        if (role === 'customer') {
            navigate('/login/customer');
        } else {
            navigate('/login/provider');
        }
    };

    return (
        <div className="relative w-full overflow-hidden bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-[24px]">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 -z-10" />

            <div className="text-center mb-12 space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Continue As</h2>
                <p className="text-lg text-gray-600">Choose how you want to use BookEase</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Customer Card */}
                <button
                    onClick={() => handleSelect('customer')}
                    className="group relative flex flex-col items-start p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all duration-300 text-left w-full h-full"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IoPerson size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Customer</h3>
                    <p className="text-gray-500 mb-8 flex-grow">Book services from trusted providers</p>
                    <div className="mt-auto flex items-center text-blue-600 font-bold text-lg group-hover:gap-2 transition-all pt-4">
                        Get Started <IoArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>

                {/* Provider Card */}
                <button
                    onClick={() => handleSelect('provider')}
                    className="group relative flex flex-col items-start p-8 bg-white border-2 border-gray-100 rounded-2xl hover:border-purple-500 hover:shadow-xl transition-all duration-300 text-left w-full h-full"
                >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IoBriefcase size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">I'm a Service Provider</h3>
                    <p className="text-gray-500 mb-8 flex-grow">Offer services and manage bookings</p>
                    <div className="mt-auto flex items-center text-purple-600 font-bold text-lg group-hover:gap-2 transition-all pt-4">
                        Get Started <IoArrowForward className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                </button>
            </div>
        </div>
    );
};

export default LoginModalContent;
