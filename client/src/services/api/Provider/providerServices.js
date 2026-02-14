import axiosInstance from '../../../config/axios';

/**
 * Get all services for the logged-in provider
 */
export const getProviderServices = async () => {
    const response = await axiosInstance.get('/services/my-services');
    return response.data;
};

/**
 * Delete a service
 */
export const deleteService = async (serviceId) => {
    const response = await axiosInstance.delete(`/services/${serviceId}`);
    return response.data;
};

/**
 * Toggle service active status
 */
export const toggleServiceStatus = async (serviceId, isActive) => {
    const response = await axiosInstance.patch(`/services/${serviceId}`, { isActive });
    return response.data;
};

/**
 * Create a new service
 */
export const createService = async (serviceData, imageFiles, blockedDates) => {
    const formData = new FormData();

    // Add basic service data
    formData.append('name', serviceData.name);
    formData.append('description', serviceData.description);
    formData.append('duration', serviceData.duration);
    formData.append('price', serviceData.price);
    formData.append('slotDuration', serviceData.slotDuration);
    formData.append('maxBookingsPerSlot', serviceData.maxBookingsPerSlot);

    // Add schedule as JSON string
    formData.append('schedule', JSON.stringify(serviceData.schedule));

    // Add images
    imageFiles.forEach((file) => {
        formData.append('images', file);
    });

    const response = await axiosInstance.post('/services', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    // If service created successfully and there are blocked dates, add them
    if (response.data.status === 'success' && blockedDates.length > 0) {
        const serviceId = response.data.data.service._id;

        // Add blocked dates one by one
        for (const blocked of blockedDates) {
            await axiosInstance.post(`/services/${serviceId}/blocked-dates`, {
                date: blocked.date,
                reason: blocked.reason,
                startTime: blocked.isFullDay ? null : blocked.startTime,
                endTime: blocked.isFullDay ? null : blocked.endTime
            });
        }
    }

    return response.data;
};


export const updateService = async ({ serviceId, serviceData, imageFiles }) => {
    const formData = new FormData();

    // Add basic service data if present
    if (serviceData.name) formData.append('name', serviceData.name);
    if (serviceData.description) formData.append('description', serviceData.description);
    if (serviceData.duration) formData.append('duration', serviceData.duration);
    if (serviceData.price) formData.append('price', serviceData.price);
    if (serviceData.slotDuration) formData.append('slotDuration', serviceData.slotDuration);
    if (serviceData.maxBookingsPerSlot) formData.append('maxBookingsPerSlot', serviceData.maxBookingsPerSlot);

    // Add schedule as JSON string if present
    if (serviceData.schedule) {
        formData.append('schedule', JSON.stringify(serviceData.schedule));
    }

    // Add new images if any
    if (imageFiles && imageFiles.length > 0) {
        imageFiles.forEach((file) => {
            formData.append('images', file);
        });
    }

    // Add removed images list if any
    if (serviceData.removeImages && serviceData.removeImages.length > 0) {
        formData.append('removeImages', JSON.stringify(serviceData.removeImages));
    }

    const response = await axiosInstance.patch(`/services/${serviceId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

/**
 * Add a blocked date to a service
 */
export const addBlockedDate = async (serviceId, blockedDateData) => {
    const response = await axiosInstance.post(`/services/${serviceId}/blocked-dates`, blockedDateData);
    return response.data;
};

/**
 * Remove a blocked date from a service
 */
export const removeBlockedDate = async (serviceId, blockId) => {
    const response = await axiosInstance.delete(`/services/${serviceId}/blocked-dates/${blockId}`);
    return response.data;
};

/**
 * Get blocked dates for a service
 */
export const getBlockedDates = async (serviceId) => {
    const response = await axiosInstance.get(`/services/${serviceId}/blocked-dates`);
    return response.data;
};
