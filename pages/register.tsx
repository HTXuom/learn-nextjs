'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import GlobalApi from '@/app/_utils/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUsers } from '@/app/_utils/api';

function FormRegister() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        const jwt = sessionStorage.getItem('jwt');
        if (jwt) {
            router.push('/home'); // If already logged in, redirect to the main page
        }
    }, [router]);

    const onCreateAccount = async () => {
        if (password !== confirmPassword) {
            toast.error('Passwords do not match.');
            return;
        }
        try {
            // const users = await getUsers();
            // const emailExists = users.some(user => user.email === email);

            // if (emailExists) {
            //     toast.error('Email already exists.');
            //     return;
            // }
            await GlobalApi.registerUser(username, email, password);
            // Display success message
            toast.success('Account created successfully.');
            // Redirect to login page after 2 seconds
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (e) {
            console.error(e);
            toast.error('Error creating account.');
        }
    };

    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-5 bg-slate-100 border-gray-200 rounded-lg'>
                <Image src='/logo2.jpg' width={400} height={400} alt='logo' />
                <h2 className='font-bold text-3xl mt-5'>Create an Account</h2>
                <h2 className='text-gray-500'>Enter your Email and Password to create an account</h2>
                <div className='w-full flex flex-col gap-5 mt-7'>
                    <Input
                        placeholder='Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        name='Username'
                        className='h-14 text-lg px-4'
                    />
                    <Input
                        placeholder='name@example.com'
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
                    <Input
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        name='Confirm Password'
                        className='h-14 text-lg px-4'
                    />
                    <Button
                        onClick={onCreateAccount}
                        disabled={!(username && email && password && confirmPassword)}
                        className='h-14 text-lg px-4 bg-black '
                    >
                        Create an Account
                    </Button>
                    <p className='text-lg'>
                        Already have an account?
                        <Link href='/login' className='text-blue-500'>
                            Click here to Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default FormRegister;
