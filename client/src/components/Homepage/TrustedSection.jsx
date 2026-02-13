import { IoCalendar, IoPeople, IoStar } from "react-icons/io5";

const TrustedSection = () => {
    const stats = [
        {
            icon: <IoCalendar size={32} className="text-white" />,
            value: "1,000+",
            label: "Appointments",
            gradient: "from-blue-400 to-cyan-400"
        },
        {
            icon: <IoPeople size={32} className="text-white" />,
            value: "200+",
            label: "Providers",
            gradient: "from-purple-400 to-pink-400"
        },
        {
            icon: <IoStar size={32} className="text-white" />,
            value: "4.9",
            label: "Average Rating",
            gradient: "from-orange-400 to-red-400"
        }
    ];

    return (
        <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            <div className="relative max-w-7xl mx-auto z-10">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        Trusted by Thousands
                    </h2>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Join our growing community of users and providers
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
                        >
                            {/* Icon Container */}
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                                {stat.icon}
                            </div>

                            {/* Value */}
                            <h3 className="text-5xl font-bold text-white mb-2 tracking-tight">
                                {stat.value}
                            </h3>

                            {/* Label */}
                            <p className="text-blue-100 text-xl font-medium">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedSection;