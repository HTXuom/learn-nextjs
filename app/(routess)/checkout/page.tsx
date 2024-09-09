'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowBigRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [delivery, setDelivery] = useState(15.0); // Example delivery fee
    const [tax, setTax] = useState(0); // Calculated based on subtotal
    const [total, setTotal] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(cart);
        calculateTotals(cart);
    }, []);

    const calculateTotals = (items) => {
        let total = 0;
        items.forEach((item) => {
            const itemTotal = (item.sellingPrice ? item.sellingPrice : item.price) * item.quantity;
            total += itemTotal;
        });

        const taxAmount = total * 0.09; // 9% tax
        const totalAmount = total + delivery + taxAmount;

        setSubtotal(total);
        setTax(taxAmount);
        setTotal(totalAmount);
    };

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: total,
                    ipAddr: '13.160.92.201',
                    txnRef: '23570',
                    orderInfo: total,
                    returnUrl: 'http://localhost:3000',
                }),
            });

            const result = await response.json();
            if (result.paymentUrl) {
                // Save order in the history
                await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartItems }),
                });

                // Clear the cart and redirect to the payment URL
                localStorage.removeItem('cart');
                window.location.href = result.paymentUrl;
            } else {
                toast.error('Payment failed');
            }
        } catch (error) {
            console.error('Payment failed:', error);
            toast.error('Payment failed');
        }
    };

    return (
        <div className='mt-8'>
            <h2 className='p-3 bg-teal-500 text-xl font-bold text-center text-white truncate'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8'>
                <div className='md:col-span-2 mx-20'>
                    <h2 className='font-bold text-3xl'>Billing Details</h2>
                    <div className='grid grid-cols-2 gap-5 mt-8'>
                        <Input className='h-12 p-3 border border-gray-300 rounded-md' placeholder='Name' />
                        <Input className='h-12 p-3 border border-gray-300 rounded-md' placeholder='Email' />
                        <Input className='h-12 p-3 border border-gray-300 rounded-md' placeholder='Phone' />
                        <Input className='h-12 p-3 border border-gray-300 rounded-md' placeholder='Address' />
                    </div>
                </div>
                <div className='mx-10 border'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Total Cart ({cartItems.length})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'>Subtotal: <span>${subtotal.toFixed(2)}</span></h2>
                        <hr />
                        <h2 className='flex justify-between'>Delivery: <span>${delivery.toFixed(2)}</span></h2>
                        <h2 className='flex justify-between'>Tax (9%): <span>${tax.toFixed(2)}</span></h2>
                        <hr />
                        <h2 className='font-bold flex justify-between'>Total: <span>${total.toFixed(2)}</span></h2>
                        <Button className='bg-teal-500 p-4' onClick={handleCheckout}>
                            Payment <ArrowBigRight />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
