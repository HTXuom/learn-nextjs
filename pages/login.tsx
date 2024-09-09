'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    password: string;
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            router.push('/');
        }
    }, [router]);

    const onSignIn = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await fetch('https://66b485189f9169621ea34bb0.mockapi.io/users');
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const users: User[] = await response.json();
            const user = users.find((user) => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('jwt', 'mock-jwt-token'); // Mock JWT token
                toast.success('Login Successfully.');
                router.push('/');
            } else {
                toast.error('Invalid email or password.');
            }
        } catch (e) {
            console.error('Error signing in:', e);
            toast.error('Error while logging in.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-5 bg-slate-100 border-gray-200 rounded-lg'>
                <Image src='/logo2.jpg' width={400} height={400} alt='logo' />
                <h2 className='font-bold text-3xl mt-5'>Sign In</h2>
                <h2 className='text-gray-500'>Enter your Email and Password to sign in</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='Email'
                        className='h-14 text-lg px-4'
                    />
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name='Password'
                        className='h-14 text-lg px-4'
                    />
                    <Button
                        onClick={onSignIn}
                        disabled={loading || !(email && password)}
                        className='h-14 text-lg px-4'
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </Button>
                    <p className='text-lg'>
                        Don&apos;t have an account?{' '}
                        <Link href='/register' className='text-blue-500'>
                            Click here to Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
