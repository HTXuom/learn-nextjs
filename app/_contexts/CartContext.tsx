// app/_contexts/CartContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';

type CartItem = {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    quantity: number;
};

type CartContextType = {
    cartItems: CartItem[];
    getCartCount: () => number;
    getCartItems: () => CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const getCartCount = () => cartItems.reduce((count, item) => count + item.quantity, 0);
    const getCartItems = () => cartItems;
    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
                return updatedItems;
            }
            return [...prevItems, item];
        });
    };
    const removeFromCart = (id: string) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, getCartCount, getCartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
