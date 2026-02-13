const Service = require('../model/serviceModel');
const BlockedDate = require('../model/blockedDateModel');
const CustomAvailability = require('../model/customAvailabilityModel');
const Booking = require('../../bookings/model/bookingModel');

/**
 * Get available time slots for a service on a specific date
 * @param {String} serviceId - Service ID
 * @param {Date} date - Date to check availability
 * @returns {Array} Array of available time slots
 */
async function getAvailableSlots(serviceId, date) {
    try {
        // Create clean copies for query boundaries (UTC Day)
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);

        // Get the service
        const service = await Service.findById(serviceId);
        if (!service || !service.isActive) {
            return [];
        }

        // Get day of week (0 = Sunday, 1 = Monday, etc.)
        const dayOfWeek = date.getDay();
        const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const dayName = dayNames[dayOfWeek];

        // Check if service is available on this day
        const daySchedule = service.schedule[dayName];
        if (!daySchedule || !daySchedule.isActive) {
            return [];
        }

        // Get start and end times for the day
        let startTime = daySchedule.startTime;
        let endTime = daySchedule.endTime;

        // Check for custom availability override
        const customAvailability = await CustomAvailability.findOne({
            service: serviceId,
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        if (customAvailability) {
            startTime = customAvailability.startTime;
            endTime = customAvailability.endTime;
        }

        // Check for blocked dates
        const blockedDates = await BlockedDate.find({
            service: serviceId,
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });

        // If entire day is blocked
        const fullDayBlock = blockedDates.find(block => !block.startTime && !block.endTime);
        if (fullDayBlock) {
            return [];
        }

        // Generate time slots
        const slots = generateTimeSlots(startTime, endTime, service.slotDuration);

        // Filter out blocked time slots
        const availableSlots = slots.filter(slot => {
            return !isSlotBlocked(slot, blockedDates);
        });

        // Get existing bookings for this date
        const existingBookings = await Booking.find({
            service: serviceId,
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            },
            status: { $ne: 'cancelled' }
        });

        // Filter out fully booked slots
        const finalSlots = availableSlots.map(slot => {
            const bookingsForSlot = existingBookings.filter(booking => booking.startTime === slot);
            const availableSpots = service.maxBookingsPerSlot - bookingsForSlot.length;

            return {
                time: slot,
                available: availableSpots > 0,
                spotsLeft: availableSpots
            };
        });

        return finalSlots;
    } catch (error) {
        console.error('Error getting available slots:', error);
        return [];
    }
}

/**
 * Generate time slots between start and end time
 * @param {String} startTime - Start time in HH:MM format
 * @param {String} endTime - End time in HH:MM format
 * @param {Number} duration - Slot duration in minutes
 * @returns {Array} Array of time slots
 */
function generateTimeSlots(startTime, endTime, duration) {
    const slots = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    let currentMinutes = startHour * 60 + startMinute;
    const endMinutes = endHour * 60 + endMinute;

    while (currentMinutes + duration <= endMinutes) {
        const hours = Math.floor(currentMinutes / 60);
        const minutes = currentMinutes % 60;
        const timeSlot = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        slots.push(timeSlot);
        currentMinutes += duration;
    }

    return slots;
}

/**
 * Check if a time slot is blocked
 * @param {String} slot - Time slot in HH:MM format
 * @param {Array} blockedDates - Array of blocked date objects
 * @returns {Boolean} True if slot is blocked
 */
function isSlotBlocked(slot, blockedDates) {
    for (const block of blockedDates) {
        // Skip full day blocks (already handled)
        if (!block.startTime && !block.endTime) continue;

        // Check if slot falls within blocked time range
        if (block.startTime && block.endTime) {
            if (slot >= block.startTime && slot < block.endTime) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Check if a specific time slot is available
 * @param {String} serviceId - Service ID
 * @param {Date} date - Date to check
 * @param {String} timeSlot - Time slot in HH:MM format
 * @returns {Boolean} True if slot is available
 */
async function isSlotAvailable(serviceId, date, timeSlot) {
    const availableSlots = await getAvailableSlots(serviceId, date);
    const slot = availableSlots.find(s => s.time === timeSlot);
    return slot && slot.available;
}

module.exports = {
    getAvailableSlots,
    generateTimeSlots,
    isSlotBlocked,
    isSlotAvailable
};
