import React, { useState, useEffect } from 'react';
import { IoClose, IoArrowForward, IoArrowBack, IoAdd, IoTrash } from 'react-icons/io5';
import { useCreateService, useUpdateService, useAddBlockedDate, useRemoveBlockedDate, useGetBlockedDates } from '../../services/hooks/Provider/useProviderServices';

const ServiceModal = ({ isOpen, onClose, onSuccess, serviceToEdit = null }) => {
    const { mutate: createService, isPending: isCreating } = useCreateService();
    const { mutate: updateService, isPending: isUpdating } = useUpdateService();

    // Hooks for managing blocked dates in Edit Mode
    const { mutate: addBlockedDateApi, isPending: isAddingDate } = useAddBlockedDate();
    const { mutate: removeBlockedDateApi, isPending: isRemovingDate } = useRemoveBlockedDate();
    const { data: serverBlockedDates, isLoading: isLoadingDates } = useGetBlockedDates(serviceToEdit?._id);

    const isEditMode = !!serviceToEdit;
    const isPending = isCreating || isUpdating;

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Info
        name: '',
        description: '',
        duration: '',
        price: '',
        images: [],

        // Step 2: Schedule & Slots
        schedule: {
            monday: { isActive: false, startTime: '09:00', endTime: '17:00' },
            tuesday: { isActive: false, startTime: '09:00', endTime: '17:00' },
            wednesday: { isActive: false, startTime: '09:00', endTime: '17:00' },
            thursday: { isActive: false, startTime: '09:00', endTime: '17:00' },
            friday: { isActive: false, startTime: '09:00', endTime: '17:00' },
            saturday: { isActive: false, startTime: '09:00', endTime: '17:00' },
            sunday: { isActive: false, startTime: '09:00', endTime: '17:00' },
        },
        slotDuration: '30',
        maxBookingsPerSlot: '1',

        // Step 3: Blocked Dates (Create Mode only)
        blockedDates: []
    });

    const [imageFiles, setImageFiles] = useState([]);
    const [existingImages, setExistingImages] = useState([]); // For edit mode
    const [removedImages, setRemovedImages] = useState([]); // Track removed existing images
    const [newBlockedDate, setNewBlockedDate] = useState({
        date: '',
        reason: '',
        isFullDay: true,
        startTime: '',
        endTime: ''
    });

    // Populate form data when editing
    useEffect(() => {
        if (serviceToEdit) {
            setFormData({
                name: serviceToEdit.name || '',
                description: serviceToEdit.description || '',
                duration: serviceToEdit.duration || '',
                price: serviceToEdit.price || '',
                images: [], // New images start empty
                schedule: serviceToEdit.schedule || formData.schedule,
                slotDuration: serviceToEdit.slotDuration || '30',
                maxBookingsPerSlot: serviceToEdit.maxBookingsPerSlot || '1',
                blockedDates: [] // Not used in edit mode (we use serverBlockedDates)
            });
            setExistingImages(serviceToEdit.images || []);
            setRemovedImages([]);
            // Reset step to 1 when opening a new edit
            setCurrentStep(1);
        } else {
            // Reset for create mode
            setFormData({
                name: '',
                description: '',
                duration: '',
                price: '',
                images: [],
                schedule: {
                    monday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                    tuesday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                    wednesday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                    thursday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                    friday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                    saturday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                    sunday: { isActive: false, startTime: '09:00', endTime: '17:00' },
                },
                slotDuration: '30',
                maxBookingsPerSlot: '1',
                blockedDates: []
            });
            setExistingImages([]);
            setRemovedImages([]);
            setImageFiles([]);
            setCurrentStep(1);
        }
    }, [serviceToEdit, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleScheduleToggle = (day) => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: {
                    ...prev.schedule[day],
                    isActive: !prev.schedule[day].isActive
                }
            }
        }));
    };

    const handleScheduleTimeChange = (day, field, value) => {
        setFormData(prev => ({
            ...prev,
            schedule: {
                ...prev.schedule,
                [day]: {
                    ...prev.schedule[day],
                    [field]: value
                }
            }
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImageFiles(prev => [...prev, ...files].slice(0, 5)); // Max 5 images total (simplification)
    };

    const removeImage = (index) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (imageUrl) => {
        setRemovedImages(prev => [...prev, imageUrl]);
        setExistingImages(prev => prev.filter(img => img !== imageUrl));
    };

    // Helper to reset blocked date inputs
    const resetBlockedDateInput = () => {
        setNewBlockedDate({
            date: '',
            reason: '',
            isFullDay: true,
            startTime: '',
            endTime: ''
        });
    };

    const handleAddBlockedDate = () => {
        if (!newBlockedDate.date) {
            alert('Please select a date');
            return;
        }

        if (isEditMode) {
            // In Edit Mode, call API immediately
            addBlockedDateApi({
                serviceId: serviceToEdit._id,
                blockedDateData: newBlockedDate
            }, {
                onSuccess: () => resetBlockedDateInput(),
                onError: (err) => alert(err.response?.data?.message || 'Failed to add blocked date')
            });
        } else {
            // In Create Mode, add to state
            setFormData(prev => ({
                ...prev,
                blockedDates: [...prev.blockedDates, { ...newBlockedDate }]
            }));
            resetBlockedDateInput();
        }
    };

    const handleRemoveBlockedDate = (index, blockId) => {
        if (isEditMode) {
            // In Edit Mode, call API immediately with blockId
            if (window.confirm('Are you sure you want to remove this blocked date?')) {
                removeBlockedDateApi({ serviceId: serviceToEdit._id, blockId }, {
                    onError: (err) => alert('Failed to remove blocked date')
                });
            }
        } else {
            // In Create Mode, remove from state by index
            setFormData(prev => ({
                ...prev,
                blockedDates: prev.blockedDates.filter((_, i) => i !== index)
            }));
        }
    };

    const validateStep1 = () => {
        if (!formData.name || !formData.description || !formData.duration || !formData.price) {
            alert('Please fill in all required fields');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        const hasActiveDay = Object.values(formData.schedule).some(day => day.isActive);
        if (!hasActiveDay) {
            alert('Please select at least one working day');
            return false;
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep === 1 && !validateStep1()) return;
        if (currentStep === 2 && !validateStep2()) return;

        if (currentStep < 3) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = async () => {
        if (isEditMode) {
            updateService(
                {
                    serviceId: serviceToEdit._id,
                    serviceData: {
                        ...formData,
                        removeImages: removedImages
                    },
                    imageFiles
                },
                {
                    onSuccess: () => {
                        alert('Service updated successfully!');
                        onSuccess?.();
                        onClose();
                    },
                    onError: (error) => {
                        alert(error?.response?.data?.message || 'Failed to update service. Please try again.');
                    }
                }
            );
        } else {
            createService(
                {
                    serviceData: formData,
                    imageFiles,
                    blockedDates: formData.blockedDates
                },
                {
                    onSuccess: () => {
                        alert('Service created successfully!');
                        onSuccess?.();
                        onClose();
                    },
                    onError: (error) => {
                        alert(error?.response?.data?.message || 'Failed to create service. Please try again.');
                    }
                }
            );
        }
    };

    if (!isOpen) return null;

    const progress = (currentStep / 3) * 100;

    // Determine which blocked dates list to show
    const displayBlockedDates = isEditMode
        ? (serverBlockedDates?.data?.blockedDates || [])
        : formData.blockedDates;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-3xl font-bold">{isEditMode ? 'Edit Service' : 'Create New Service'}</h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition-all"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-white h-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="text-sm font-bold">Step {currentStep} of 3</span>
                    </div>

                    {/* Step Labels */}
                    <div className="flex justify-between text-sm mt-4">
                        <span className={currentStep >= 1 ? 'font-bold' : 'opacity-60'}>Basic Info</span>
                        <span className={currentStep >= 2 ? 'font-bold' : 'opacity-60'}>Schedule & Slots</span>
                        <span className={currentStep >= 3 ? 'font-bold' : 'opacity-60'}>Block Holidays</span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
                    {/* Step 1: Basic Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Service Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                    placeholder="e.g., Haircut, Massage, Consultation"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none resize-none"
                                    placeholder="Describe your service in detail..."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Duration (minutes) *
                                    </label>
                                    <input
                                        type="number"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                        placeholder="30"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Price ($) *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                        placeholder="50"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Service Images (Max 5)
                                </label>

                                {/* Show existing images if in edit mode */}
                                {isEditMode && existingImages.length > 0 && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-2">Existing Images:</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {existingImages.map((img, idx) => (
                                                <div key={idx} className="relative group">
                                                    <img src={img} alt="Existing" className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                                                    <button
                                                        onClick={() => handleRemoveExistingImage(img)}
                                                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                        title="Remove image"
                                                    >
                                                        <IoClose size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    id="image-upload"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="block w-full px-4 py-8 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 cursor-pointer text-center transition-colors"
                                >
                                    <IoAdd size={32} className="mx-auto text-gray-400 mb-2" />
                                    <span className="text-gray-600">Click to upload new images</span>
                                </label>

                                {imageFiles.length > 0 && (
                                    <div className="grid grid-cols-5 gap-2 mt-4">
                                        {imageFiles.map((file, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-20 object-cover rounded-lg"
                                                />
                                                <button
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <IoClose size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Schedule & Slots */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Working Hours</h3>
                                <div className="space-y-3">
                                    {Object.entries(formData.schedule).map(([day, config]) => (
                                        <div key={day} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                            <label className="flex items-center gap-3 cursor-pointer flex-1">
                                                <input
                                                    type="checkbox"
                                                    checked={config.isActive}
                                                    onChange={() => handleScheduleToggle(day)}
                                                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="font-bold text-gray-900 capitalize w-24">{day}</span>
                                            </label>

                                            {config.isActive && (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="time"
                                                        value={config.startTime}
                                                        onChange={(e) => handleScheduleTimeChange(day, 'startTime', e.target.value)}
                                                        className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                    <span className="text-gray-600">to</span>
                                                    <input
                                                        type="time"
                                                        value={config.endTime}
                                                        onChange={(e) => handleScheduleTimeChange(day, 'endTime', e.target.value)}
                                                        className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Slot Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        name="slotDuration"
                                        value={formData.slotDuration}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                        min="1"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Time between appointments</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">
                                        Max Bookings Per Slot
                                    </label>
                                    <input
                                        type="number"
                                        name="maxBookingsPerSlot"
                                        value={formData.maxBookingsPerSlot}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                        min="1"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Customers per time slot</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Block Holidays */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Block Dates (Optional)</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Block specific dates when this service won't be available (holidays, vacations, etc.)
                                    {isEditMode && <span className="font-bold block text-blue-600 mt-1">Changes here are saved immediately.</span>}
                                </p>

                                <div className="bg-gray-50 p-4 rounded-xl space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                value={newBlockedDate.date}
                                                onChange={(e) => setNewBlockedDate(prev => ({ ...prev, date: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                                min={new Date().toISOString().split('T')[0]}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Reason
                                            </label>
                                            <input
                                                type="text"
                                                value={newBlockedDate.reason}
                                                onChange={(e) => setNewBlockedDate(prev => ({ ...prev, reason: e.target.value }))}
                                                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                                placeholder="e.g., Christmas, Vacation"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={newBlockedDate.isFullDay}
                                                onChange={(e) => setNewBlockedDate(prev => ({ ...prev, isFullDay: e.target.checked }))}
                                                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <span className="text-sm font-bold text-gray-700">Block entire day</span>
                                        </label>
                                    </div>

                                    {!newBlockedDate.isFullDay && (
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    Start Time
                                                </label>
                                                <input
                                                    type="time"
                                                    value={newBlockedDate.startTime}
                                                    onChange={(e) => setNewBlockedDate(prev => ({ ...prev, startTime: e.target.value }))}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                                    End Time
                                                </label>
                                                <input
                                                    type="time"
                                                    value={newBlockedDate.endTime}
                                                    onChange={(e) => setNewBlockedDate(prev => ({ ...prev, endTime: e.target.value }))}
                                                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleAddBlockedDate}
                                        disabled={isAddingDate}
                                        className="w-full px-4 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isAddingDate ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <IoAdd size={20} />
                                                Add Blocked Date
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Blocked Dates List */}
                                <div className="mt-6">
                                    <h4 className="font-bold text-gray-900 mb-3">Blocked Dates ({displayBlockedDates.length})</h4>

                                    {isEditMode && isLoadingDates ? (
                                        <div className="flex justify-center p-4">
                                            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            {displayBlockedDates.length === 0 && <p className="text-gray-500 text-sm">No blocked dates scheduled.</p>}

                                            {displayBlockedDates.map((blocked, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                                                    <div>
                                                        <p className="font-bold text-gray-900">
                                                            {new Date(blocked.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {blocked.reason || 'No reason specified'}
                                                            {!blocked.isFullDay && ` • ${blocked.startTime} - ${blocked.endTime}`}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveBlockedDate(index, blocked._id)} // Pass _id for remote delete
                                                        disabled={isRemovingDate}
                                                        className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50"
                                                    >
                                                        <IoTrash size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 flex items-center justify-between">
                    <button
                        onClick={currentStep === 1 ? onClose : handleBack}
                        className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <IoArrowBack size={20} />
                        {currentStep === 1 ? 'Cancel' : 'Back'}
                    </button>

                    <button
                        onClick={currentStep === 3 ? handleSubmit : handleNext}
                        disabled={isPending}
                        className="px-6 py-3 rounded-xl text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        {isPending ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                {isEditMode ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                {currentStep === 3 ? (isEditMode ? 'Save Changes' : 'Create Service') : 'Next'}
                                <IoArrowForward size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
