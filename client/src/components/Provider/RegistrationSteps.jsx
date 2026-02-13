import React from 'react';

const RegistrationSteps = ({ currentStep, progress }) => {
    const steps = [
        {
            id: 1,
            title: 'Basic Info',
            description: 'Personal details',
            icon: '👤'
        },
        {
            id: 2,
            title: 'About You',
            description: 'Experience & location',
            icon: '📋'
        }
    ];

    return (
        <div className="w-64 shrink-0">
            <div className="bg-white rounded-3xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Registration Steps</h3>

                {/* Steps */}
                <div className="space-y-3">
                    {steps.map((step) => {
                        const isActive = currentStep === step.id;
                        const isCompleted = currentStep > step.id;

                        return (
                            <div
                                key={step.id}
                                className={`p-4 rounded-2xl transition-all ${isActive
                                        ? 'shadow-lg'
                                        : isCompleted
                                            ? 'bg-green-50 border-2 border-green-200'
                                            : 'bg-gray-50'
                                    }`}
                                style={
                                    isActive
                                        ? { background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }
                                        : {}
                                }
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive
                                                ? 'bg-white/20'
                                                : isCompleted
                                                    ? 'bg-green-200'
                                                    : 'bg-gray-200'
                                            }`}
                                    >
                                        <span
                                            className={`text-xl ${isActive
                                                    ? 'text-white'
                                                    : isCompleted
                                                        ? 'text-green-700'
                                                        : 'text-gray-500'
                                                }`}
                                        >
                                            {isCompleted ? '✓' : step.icon}
                                        </span>
                                    </div>
                                    <div>
                                        <p
                                            className={`font-bold ${isActive
                                                    ? 'text-white'
                                                    : isCompleted
                                                        ? 'text-green-700'
                                                        : 'text-gray-400'
                                                }`}
                                        >
                                            {step.title}
                                        </p>
                                        <p
                                            className={`text-xs ${isActive
                                                    ? 'text-white/80'
                                                    : isCompleted
                                                        ? 'text-green-600'
                                                        : 'text-gray-500'
                                                }`}
                                        >
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Progress */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-600">Progress</span>
                        <span className="text-sm font-bold text-blue-600">{progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                                width: `${progress}%`,
                                background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationSteps;
