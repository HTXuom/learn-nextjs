"use client";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Profile from './profile/page'; // Adjust the path if needed

const App: React.FC = () => {
    return (
        <>
            <Profile />
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default App;
