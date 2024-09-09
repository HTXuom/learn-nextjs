// app/_contexts/UserContext.tsx

import React, { createContext, useContext, ReactNode, useState } from 'react';

interface UserContextType {
    user: any; // Thay thế `any` bằng kiểu dữ liệu người dùng cụ thể của bạn
    setUser: (user: any) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<any>(null); // Thay thế `any` bằng kiểu dữ liệu người dùng cụ thể của bạn

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
