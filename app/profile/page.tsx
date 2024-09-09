'use client';

import React, { useEffect, useState, FormEvent } from 'react';
import Image from 'next/image';
import { useProfile } from '@/app/_contexts/ProfileContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile: React.FC = () => {
    const { profileImage, setProfileImage } = useProfile();
    const [fullName, setFullName] = useState('John Doe');
    const [email, setEmail] = useState('john.doe@example.com');
    const [address, setAddress] = useState('123 Main St');
    const [city, setCity] = useState('Springfield');
    const [date, setDate] = useState('2024-08-20');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://66b485189f9169621ea34bb0.mockapi.io/users/22');
                const data = await response.json();

                setFullName(data.name || fullName);
                setEmail(data.email || email);
                setAddress(data.address || address);
                setCity(data.city || city);
                setDate(data.createdAt ? new Date(data.createdAt).toISOString().split('T')[0] : date);
                setProfileImage(data.avatar || profileImage);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                toast.error('Failed to fetch user data');
            }
        };

        fetchData();
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
            console.log(imageUrl)// Update profile image in context
        }
    };

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        const userData = { fullName, email, address, city, date, imageUrl: imageFile };
        console.log(userData)
        try {
            const updateResponse = await fetch('/api/updateProfile.ts', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!updateResponse.ok) {
                const errorText = await updateResponse.text();
                console.error('Profile update failed:', errorText);
                throw new Error('Profile update failed');
            }

            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const uploadResponse = await fetch('/api/uploadImage', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error('Image upload failed:', errorText);
                    throw new Error('Image upload failed');
                }

                const result = await uploadResponse.json();
                const imageUrl = result.filePath;
                setProfileImage(imageUrl); // Update profile image URL

                localStorage.setItem('profileImage', imageUrl); // Save to localStorage
            }

            localStorage.setItem('userProfile', JSON.stringify(userData));

            toast.success('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile:', error);
            toast.success('Profile updated successfully');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="bg-gray-50 py-8 min-h-screen mt-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-6 rounded-lg shadow-md mb-10 mt-5">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Update Profile</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-lg font-bold text-gray-700 mb-2">Profile Image</h2>
                        <div className="relative flex items-center mb-4">
                            <div className="w-40 h-40 rounded-full overflow-hidden mr-4 cursor-pointer">
                                <Image
                                    src={profileImage || '/default-profile.png'}
                                    alt="Profile Image"
                                    width={300}
                                    height={300}
                                    objectFit="contain"
                                    className="object-contain"
                                    onClick={() => document.getElementById('fileInput')?.click()}
                                />
                                <input
                                    id="fileInput"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-gray-700 mb-2">Change User Information</h2>
                        <form className="bg-white p-4 rounded-md shadow-md" onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700 mb-2">Address *</label>
                                <input
                                    type="text"
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-gray-700 mb-2">City *</label>
                                <input
                                    type="text"
                                    id="city"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-700 mb-2">Date *</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight bg-white focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-300"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className={`bg-teal-600 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isUpdating ? 'cursor-not-allowed opacity-50' : ''
                                        }`}
                                >
                                    {isUpdating ? 'Updating...' : 'Update Profile'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
