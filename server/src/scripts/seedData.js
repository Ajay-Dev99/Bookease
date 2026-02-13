const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const connectDatabase = require('../config/database');
const Provider = require('../modules/provider/model/providerModel');
const Service = require('../modules/services/model/serviceModel');

const seedData = async () => {
    try {
        await connectDatabase();
        console.log('Connected to database...');

        const hashedPassword = await bcrypt.hash('password123', 10);

        const providersList = [
            {
                name: "City General Hospital",
                email: "contact@cityhospital.com",
                phoneNumber: "555-0100",
                address: "123 Health Ave, Downtown, New York",
                about: "Leading medical center providing comprehensive healthcare services with state-of-the-art facilities and expert medical professionals.",
                password: hashedPassword,
                profileImage: "https://images.unsplash.com/photo-1587351021759-3e566b9af923?q=80&w=2070&auto=format&fit=crop",
                servicesData: [
                    {
                        name: "General Checkup",
                        description: "Comprehensive health assessment covering vital signs and physical examination.",
                        duration: 30,
                        price: 150,
                        images: ["https://images.unsplash.com/photo-1579684385186-53890f9c490a?q=80&w=2070&auto=format&fit=crop"],
                        category: "Medical",
                        isActive: true
                    },
                    {
                        name: "Specialist Consultation",
                        description: "In-depth consultation with a specialized medical professional.",
                        duration: 45,
                        price: 250,
                        images: ["https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"],
                        category: "Medical",
                        isActive: true
                    },
                    {
                        name: "Lab Testing",
                        description: "Blood work and diagnostic tests for accurate health analysis.",
                        duration: 30,
                        price: 100,
                        images: ["https://images.unsplash.com/photo-1579165466741-7f35a4755657?q=80&w=2079&auto=format&fit=crop"],
                        category: "Medical",
                        isActive: true
                    }
                ]
            },
            {
                name: "Luxe Beauty Lounge",
                email: "info@luxebeauty.com",
                phoneNumber: "555-0200",
                address: "456 Glamour Blvd, Beverly Hills, CA",
                about: "Premium luxury salon offering high-end beauty treatments, hair styling, and skincare services in a relaxing environment.",
                password: hashedPassword,
                profileImage: "https://images.unsplash.com/photo-1560066984-138fa6ca6bd6?q=80&w=2070&auto=format&fit=crop",
                servicesData: [
                    {
                        name: "Haircut & Style",
                        description: "Expert cut and styling tailored to your face shape and preference.",
                        duration: 60,
                        price: 85,
                        images: ["https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=2069&auto=format&fit=crop"],
                        category: "Salon",
                        isActive: true
                    },
                    {
                        name: "Premium Facial",
                        description: "Rejuvenating facial treatment for glowing and healthy skin.",
                        duration: 75,
                        price: 120,
                        images: ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"],
                        category: "Salon",
                        isActive: true
                    },
                    {
                        name: "Hair Coloring",
                        description: "Full hair coloring service using high-quality products.",
                        duration: 120,
                        price: 200,
                        images: ["https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop"],
                        category: "Salon",
                        isActive: true
                    }
                ]
            },
            {
                name: "Elite Fitness Center",
                email: "join@elitefitness.com",
                phoneNumber: "555-0300",
                address: "789 Active Way, Miami Beach, FL",
                about: "Achieve your fitness goals with our world-class facilities, expert trainers, and diverse range of group classes.",
                password: hashedPassword,
                profileImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
                servicesData: [
                    {
                        name: "Personal Training",
                        description: "One-on-one session with a certified personal trainer.",
                        duration: 60,
                        price: 80,
                        images: ["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop"],
                        category: "Fitness",
                        isActive: true
                    },
                    {
                        name: "Yoga Class",
                        description: "Group yoga session for flexibility and mindfulness.",
                        duration: 45,
                        price: 20,
                        images: ["https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=2069&auto=format&fit=crop"],
                        category: "Fitness",
                        isActive: true
                    },
                    {
                        name: "HIIT Session",
                        description: "High-Intensity Interval Training for maximum calorie burn.",
                        duration: 45,
                        price: 25,
                        images: ["https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"],
                        category: "Fitness",
                        isActive: true
                    }
                ]
            },
            {
                name: "Serenity Spa & Wellness",
                email: "relax@serenityspa.com",
                phoneNumber: "555-0400",
                address: "321 Calm St, San Francisco, CA",
                about: "Escape the hustle and bustle. Rejuvenate your mind and body with our holistic spa treatments and therapeutic massages.",
                password: hashedPassword,
                profileImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
                servicesData: [
                    {
                        name: "Swedish Massage",
                        description: "Relaxing full-body massage to ease tension.",
                        duration: 60,
                        price: 110,
                        images: ["https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=2070&auto=format&fit=crop"],
                        category: "Spa",
                        isActive: true
                    },
                    {
                        name: "Deep Tissue Massage",
                        description: "Therapeutic massage targeting deep muscle layers.",
                        duration: 60,
                        price: 130,
                        images: ["https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2070&auto=format&fit=crop"],
                        category: "Spa",
                        isActive: true
                    },
                    {
                        name: "Hot Stone Therapy",
                        description: "Massage with smooth, heated stones for relaxation.",
                        duration: 75,
                        price: 140,
                        images: ["https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"],
                        category: "Spa",
                        isActive: true
                    }
                ]
            },
            {
                name: "Bright Smile Dental Clinic",
                email: "care@brightsmile.com",
                phoneNumber: "555-0500",
                address: "654 Smile Rd, Chicago, IL",
                about: "Comprehensive dental care for the whole family. We use the latest technology to ensure a comfortable and effective treatment.",
                password: hashedPassword,
                profileImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop",
                servicesData: [
                    {
                        name: "Regular Cleaning",
                        description: "Routine dental cleaning to maintain oral hygiene.",
                        duration: 45,
                        price: 100,
                        images: ["https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2070&auto=format&fit=crop"],
                        category: "Dental",
                        isActive: true
                    },
                    {
                        name: "Teeth Whitening",
                        description: "Professional whitening treatment for a brighter smile.",
                        duration: 60,
                        price: 250,
                        images: ["https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2070&auto=format&fit=crop"],
                        category: "Dental",
                        isActive: true
                    },
                    {
                        name: "Dental Exam & X-Ray",
                        description: "Complete checkup including digital X-rays.",
                        duration: 45,
                        price: 150,
                        images: ["https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2070&auto=format&fit=crop"],
                        category: "Dental",
                        isActive: true
                    }
                ]
            }
        ];

        for (const providerData of providersList) {
            // Check if provider exists by email
            let provider = await Provider.findOne({ email: providerData.email });

            if (provider) {
                console.log(`Provider ${providerData.name} already exists. Skipping...`);
                // Optionally update services if provider exists
                continue;
            }

            // Create provider first
            const { servicesData, ...providerInfo } = providerData;
            provider = await new Provider(providerInfo).save();
            console.log(`Created provider: ${provider.name}`);

            const serviceIds = [];
            for (const serviceData of servicesData) {
                const service = await new Service({
                    ...serviceData,
                    provider: provider._id
                }).save();
                serviceIds.push(service._id);
            }
            console.log(`Created ${serviceIds.length} services for ${provider.name}`);

            // Update provider with service IDs
            provider.services = serviceIds;
            await provider.save();
        }

        console.log('Seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
