"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface OrderItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
}

interface Order {
    id: string;
    items: OrderItem[];
    date: string;
}

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const userId = 'your-user-id'; // Lấy từ context hoặc session

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://66b485189f9169621ea34bb0.mockapi.io/orders?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch order history:', error);
                setError('Failed to load order history.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return <p className="text-center text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    return (
        <section className="py-24 bg-white">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <h2 className="text-2xl font-semibold mb-8">Order History</h2>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div key={order.id} className="bg-gray-100 p-6 mb-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold mb-4">Order ID: {order.id}</h3>
                            <p className="text-gray-600 mb-2">Date: {new Date(order.date).toLocaleDateString()}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {order.items.map(item => (
                                    <div key={item.productId} className="bg-white p-4 border border-gray-200 rounded-lg">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={200}
                                            height={150}
                                            className="object-cover mb-4"
                                            placeholder="blur"
                                            blurDataURL="/path-to-placeholder-image.jpg"
                                        />
                                        <h4 className="text-xl font-semibold mb-2">{item.name}</h4>
                                        <p className="text-gray-600 mb-1">Price: ${item.price.toFixed(2)}</p>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">No orders found.</p>
                )}
            </div>
        </section>
    );
};

export default OrderHistory;
