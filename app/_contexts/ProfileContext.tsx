'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProfileContextProps {
    profileImage: string | null;
    setProfileImage: (avatar: string | null) => void;
}

const ProfileContext = createContext<ProfileContextProps>({
    profileImage: null,
    setProfileImage: () => { },
});

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setProfileImage(storedImage);
        }
    }, []);

    useEffect(() => {
        if (profileImage) {
            localStorage.setItem('profileImage', profileImage);
        }
    }, [profileImage]);

    return (
        <ProfileContext.Provider value={{ profileImage, setProfileImage }}>
            {children}
        </ProfileContext.Provider>
    );
};
