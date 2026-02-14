import React, { useState } from 'react';
import { IoAdd, IoTrashOutline, IoPencilOutline, IoToggle, IoTimeOutline, IoCashOutline, IoCalendarOutline } from 'react-icons/io5';
import { useProviderServices, useDeleteService, useToggleServiceStatus } from '../../services/hooks/Provider/useProviderServices';
import CreateServiceModal from '../../components/Provider/CreateServiceModal';

const ProviderServicesPage = () => {
    const { data, isLoading, isError, error } = useProviderServices();
    const { mutate: deleteService, isPending: isDeleting } = useDeleteService();
    const { mutate: toggleStatus, isPending: isToggling } = useToggleServiceStatus();

    const [deletingId, setDeletingId] = useState(null);
    const [togglingId, setTogglingId] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [serviceToEdit, setServiceToEdit] = useState(null);

    const handleDelete = (serviceId) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            setDeletingId(serviceId);
            deleteService(serviceId, {
                onSettled: () => setDeletingId(null)
            });
        }
    };

    const handleEdit = (service) => {
        setServiceToEdit(service);
        setIsCreateModalOpen(true);
    };

    const handleToggleStatus = (serviceId, currentStatus) => {
        setTogglingId(serviceId);
        toggleStatus(
            { serviceId, isActive: !currentStatus },
            { onSettled: () => setTogglingId(null) }
        );
    };

    const handleModalClose = () => {
        setIsCreateModalOpen(false);
        setServiceToEdit(null);
    };

    const handleCreateSuccess = () => {
        handleModalClose();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <p className="text-red-600 font-bold">
                    {error?.response?.data?.message || 'Failed to load services. Please try again.'}
                </p>
            </div>
        );
    }

    const services = data?.data?.services || [];

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Services</h1>
                    <p className="text-gray-600">Manage your service offerings and availability</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                >
                    <IoAdd size={20} />
                    Add Service
                </button>
            </div>

            {/* Services Grid */}
            {services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service._id}
                            className="bg-white rounded-2xl border border-gray-200 p-6 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            {/* Header with Status and Actions */}
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className={`px-3 py-1 text-xs font-bold rounded-full ${service.isActive
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {service.isActive ? 'Active' : 'Inactive'}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(service)}
                                        className="w-8 h-8 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-600 transition-colors"
                                        title="Edit service"
                                    >
                                        <IoPencilOutline size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleToggleStatus(service._id, service.isActive)}
                                        disabled={togglingId === service._id}
                                        className="w-8 h-8 rounded-lg hover:bg-purple-50 flex items-center justify-center text-purple-600 transition-colors disabled:opacity-50"
                                        title={service.isActive ? 'Deactivate' : 'Activate'}
                                    >
                                        {togglingId === service._id ? (
                                            <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <IoToggle size={18} />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(service._id)}
                                        disabled={deletingId === service._id}
                                        className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-600 transition-colors disabled:opacity-50"
                                        title="Delete service"
                                    >
                                        {deletingId === service._id ? (
                                            <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <IoTrashOutline size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Service Images */}
                            {service.images && service.images.length > 0 && (
                                <div className="mb-4 rounded-xl overflow-hidden">
                                    <img
                                        src={service.images[0]}
                                        alt={service.name}
                                        className="w-full h-40 object-cover"
                                    />
                                </div>
                            )}

                            {/* Service Info */}
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>

                            {/* Price and Duration */}
                            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4">
                                <div className="flex items-center gap-2">
                                    <IoCashOutline className="text-green-600" size={20} />
                                    <span className="font-bold text-gray-900">${service.price}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <IoTimeOutline className="text-blue-600" size={20} />
                                    <span className="font-bold text-gray-600">{service.duration} min</span>
                                </div>
                            </div>

                            {/* Schedule Info */}
                            {service.schedule && (
                                <div>
                                    <p className="text-sm font-bold text-gray-600 mb-2 flex items-center gap-2">
                                        <IoCalendarOutline size={16} />
                                        Working Days
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.entries(service.schedule).map(([day, config]) => (
                                            config.isActive && (
                                                <span
                                                    key={day}
                                                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg capitalize"
                                                >
                                                    {day.slice(0, 3)}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">
                                        Slot: {service.slotDuration || 60} min | Max: {service.maxBookingsPerSlot || 1} per slot
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-300">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IoCalendarOutline size={40} className="text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-600 mb-2">No Services Yet</h3>
                    <p className="text-gray-500 mb-6">Create your first service to start receiving bookings</p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all mx-auto"
                        style={{ background: 'linear-gradient(90deg, #155DFC 0%, #9810FA 100%)' }}
                    >
                        <IoAdd size={20} />
                        Add Your First Service
                    </button>
                </div>
            )}

            {/* Create Service Modal */}
            <CreateServiceModal
                isOpen={isCreateModalOpen}
                onClose={handleModalClose}
                onSuccess={handleCreateSuccess}
                serviceToEdit={serviceToEdit}
            />
        </div>
    );
};

export default ProviderServicesPage;
