import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoBook, IoArrowForward, IoArrowBack } from 'react-icons/io5';
import RegistrationSteps from '../../components/Provider/RegistrationSteps';
import BasicInfoStep from '../../components/Provider/BasicInfoStep';
import AboutYouStep from '../../components/Provider/AboutYouStep';
import { useProviderSignup } from '../../services/hooks/Provider/useProviderAuth';

const ProviderSignup = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        name: '',
        email: '',
        phoneNumber: '',
        specialty: '',
        password: '',
        confirmPassword: '',

        // Step 2: About You
        about: '',
        address: '',
        businessName: '',

        // Other
        agreeToTerms: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [profileImageFile, setProfileImageFile] = useState(null);

    // React Query mutation
    const { mutate: signup, isPending, isError, error } = useProviderSignup();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Store the actual file for upload
            setProfileImageFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateStep1 = () => {
        if (!formData.name || !formData.email || !formData.phoneNumber || !formData.specialty) {
            alert('Please fill in all required fields');
            return false;
        }
        if (!formData.password || !formData.confirmPassword) {
            alert('Please enter and confirm your password');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return false;
        }
        if (formData.password.length < 6) {
            alert('Password must be at least 6 characters long');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.about || !formData.address || !formData.businessName) {
            alert('Please fill in all required fields');
            return false;
        }
        if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return false;
        }
        return true;
    };

    const handleNext = (e) => {
        e.preventDefault();

        if (currentStep === 1) {
            if (validateStep1()) {
                setCurrentStep(2);
            }
        } else if (currentStep === 2) {
            if (validateStep2()) {
                handleSubmit();
            }
        }
    };

    const handleBack = () => {
        setCurrentStep(1);
    };

    const handleSubmit = () => {
        // Prepare data for submission
        const submitData = {
            name: formData.name,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            about: `${formData.specialty} - ${formData.about} `,
            address: formData.address,
            password: formData.password,
            profileImage: profileImageFile // Send the actual file
        };

        // Call the mutation
        signup(submitData);
    };

    const progress = currentStep === 1 ? 50 : 100;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-5 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg"
                        style={{ background: 'linear-gradient(135deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        <IoBook size={24} />
                    </div>
                    <span
                        className="text-2xl font-bold bg-clip-text text-transparent"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        BookEase
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Already a provider?</span>
                    <Link
                        to="/login/provider"
                        className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Page Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">Become a Provider</h1>
                    <p className="text-xl text-gray-600">Join thousands of professionals on BookEase</p>
                </div>

                <div className="flex gap-8">
                    {/* Left Sidebar - Registration Steps */}
                    <RegistrationSteps currentStep={currentStep} progress={progress} />

                    {/* Main Form */}
                    <div className="flex-1">
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <form onSubmit={handleNext}>
                                {/* Step Content */}
                                {currentStep === 1 && (
                                    <BasicInfoStep
                                        formData={formData}
                                        profileImage={profileImage}
                                        showPassword={showPassword}
                                        showConfirmPassword={showConfirmPassword}
                                        onFormChange={handleChange}
                                        onImageUpload={handleImageUpload}
                                        onTogglePassword={() => setShowPassword(!showPassword)}
                                        onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                )}

                                {currentStep === 2 && (
                                    <AboutYouStep
                                        formData={formData}
                                        onFormChange={handleChange}
                                    />
                                )}

                                {/* Terms and Conditions - Only on Step 2 */}
                                {currentStep === 2 && (
                                    <div className="mt-6 flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="agreeToTerms"
                                            name="agreeToTerms"
                                            checked={formData.agreeToTerms}
                                            onChange={handleChange}
                                            className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            required
                                        />
                                        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
                                            I agree to the{' '}
                                            <Link to="/provider-terms" className="text-blue-600 font-bold hover:underline">
                                                Provider Terms and Conditions
                                            </Link>
                                            {' '}and{' '}
                                            <Link to="/privacy-policy" className="text-blue-600 font-bold hover:underline">
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>
                                )}

                                {/* Error Message */}
                                {isError && (
                                    <div className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-2xl">
                                        <p className="text-red-600 font-bold">
                                            {error?.response?.data?.message || 'Registration failed. Please try again.'}
                                        </p>
                                    </div>
                                )}

                                {/* Form Footer */}
                                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
                                    {currentStep > 1 && (
                                        <button
                                            type="button"
                                            onClick={handleBack}
                                            disabled={isPending}
                                            className="px-8 py-3.5 rounded-2xl bg-gray-100 text-gray-700 font-bold flex items-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <IoArrowBack size={20} />
                                            Back
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="px-8 py-3.5 rounded-2xl text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                        style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                                    >
                                        {isPending ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {currentStep === 2 ? 'Complete Registration' : 'Next'}
                                                <IoArrowForward size={20} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderSignup;
