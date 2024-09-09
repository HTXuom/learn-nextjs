// app/history/parent-component.tsx
"use client";

import React, { useEffect, useState } from 'react';
import OrderHistory from './OrderHistory';

const ParentComponent: React.FC = () => {
    const [orderHistory, setOrderHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Giả sử getOrderHistory là một hàm lấy dữ liệu từ API
        const fetchOrderHistory = async () => {
            try {
                const data = await getOrderHistory();
                setOrderHistory(data);
                setLoading(false);
            } catch (error) {
                setError('Failed to load order history.');
                setLoading(false);
            }
        };

        fetchOrderHistory();
    }, []);

    return (
        <div>
            <h1>Order History</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!loading && !error && <OrderHistory orders={orderHistory} />}
        </div>
    );
};

export default ParentComponent;
