"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useCheckAdmin } from '../hooks/useCheckingAdmin';
import { Pencil } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Input, Button, Select, SelectItem, Avatar, Card, Spacer } from '@nextui-org/react';

function MainSetting() {
    const { userData } = useCheckAdmin();
    const [name, setName] = useState<string>(userData?.user?.name || '');
    const [newPassword, setNewPassword] = useState<string>('');
    const { update } = useSession();
    const session = useSession();
    const { isAdmin } = useCheckAdmin();

    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [profileImage, setProfileImage] = useState<string>(userData?.user?.image || '');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [availability, setAvailability] = useState<string>(userData?.user?.isAvailable ? "true" : "false");
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    const handleSaveChanges = async () => {
        if (newPassword && newPassword !== confirmNewPassword) {
            setError("Confirm Password does not match.");
            return;
        }
        setLoading(true);

        let imageUrl = profileImage;

        if (selectedImage) {
            const formData = new FormData();
            formData.append("file", selectedImage);
            formData.append("upload_preset", "bagwise");

            try {
                const cloudinaryResponse = await axios.post(
                    `https://api.cloudinary.com/v1_1/di6r722sv/image/upload`,
                    formData
                );
                imageUrl = cloudinaryResponse.data.secure_url;
            } catch (error) {
                setError("Failed to upload image. Please try again.");
                setLoading(false);
                return;
            }
        }

        try {
            const response = await axios.put(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/update/${userData?.user?.id}`,
                {
                    name,
                    newPassword,
                    profileImage: imageUrl,
                    isAvailable: availability,
                }
            );
            setProfileImage(imageUrl);
            setError('');
            toast.success("User Updated Successfully");

            update({
                user: {
                    // @ts-ignore
                    ...session.user,
                    name: response.data.user.full_name,
                    image: response.data.user.profileImage,
                    isAvailable: availability === "true"
                }
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="p-6 bg-white">

            <div className='flex gap-3'>
                <div className="relative w-20 h-20">
                    <label htmlFor="modalProfileImageInput" className="h-20 w-20 rounded-full cursor-pointer relative">
                        <Pencil className="p-1 rounded-full bg-[#222222b9] text-white dark:bg-neutral-800 dark:text-gray-500 absolute h-5 w-5 right-1 bottom-1" />
                        <img
                            // @ts-ignore
                            src={profileImage}
                            alt="Profile"
                            className="rounded-full h-20 w-20 object-cover"
                        />
                        <input
                            type="file"
                            id="modalProfileImageInput"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <div className='flex flex-col items-start'>

                    <h2 className='font-semibold text-4xl capitalize'>
                        {name}
                    </h2>
                    <p>
                        {userData?.user?.email}
                    </p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row items-center mt-4 gap-x-4'>

                <Input
                    label="Name"
                    value={name || ''}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />
                <Input
                    label="Email (You Cannot Change your Email)"
                    value={userData?.user?.email || ''}
                    disabled
                    fullWidth
                />
                {/* <Select
                    label="Availability"
                    selectedKeys={new Set([availability])}
                    onSelectionChange={(keys) => {
                        const selectedValue = Array.from(keys).pop() as string;
                        setAvailability(selectedValue);
                    }}
                    fullWidth
                >
                    <SelectItem key="true">Available</SelectItem>
                    <SelectItem key="false">Busy</SelectItem>
                </Select> */}

            </div>
            <div className='flex flex-col md:flex-row items-center mt-4 mb-9 gap-x-4'>

                <Input
                    label="New Password"
                    value={newPassword || ''}
                    onChange={(e: any) => setNewPassword(e.target.value)}
                    fullWidth
                />
                <Input
                    label="Confirm New Password"
                    value={confirmNewPassword || ''}
                    onChange={(e: any) => setConfirmNewPassword(e.target.value)}
                    fullWidth
                />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <Button
                onClick={handleSaveChanges}
                disabled={loading}
                color="primary"
            >
                {loading ? "Updating..." : "Save Changes"}
            </Button>
        </div>

    );
}

export default MainSetting;
