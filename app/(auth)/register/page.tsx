"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function FormRegister() {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    return (
        <div className='flex items-baseline justify-center my-20'>
            <div className='flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200'>
                <Image src='/logo.png' width={700} height={300} alt='logo' />
                <h2 className='font-bold text-3xl mt-5'>Create an Account</h2>
                <h2 className='text-gray-500'>Enter your Email and Password to Create an account</h2>
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
                        placeholder='Confirm password'
                        name='Confirm password'
                        className='h-14 text-lg px-4'
                    />
                    <Button type='submit' className='h-14 text-lg px-4'>
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
