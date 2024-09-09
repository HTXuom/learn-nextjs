'use client';
import React, { useEffect, useState, FormEvent } from 'react';
import { MdLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBasket, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartItemList from './CartItemList';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { locales } from '../i18n/i18n';
import { useProfile } from '@/app/_contexts/ProfileContext';

function Header() {
    const { t, i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cartCount, setCartCount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<any[]>([]);
    const { profileImage, setProfileImage } = useProfile(); // Use context to get profile image
    const [currentLanguage, setCurrentLanguage] = useState<string>('Language');
    const pathname = usePathname();
    const router = useRouter();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const isAuthPage = pathname === '/login' || pathname === '/register';

    useEffect(() => {
        // Load user profile data from Local Storage
        const userProfile = localStorage.getItem('user');
        if (userProfile) {
            const { avatar } = JSON.parse(userProfile);
            setProfileImage(avatar || '/avatar.jpg');
        }
    }, [setProfileImage]);

    useEffect(() => {
        // Only perform on client-side
        if (typeof window !== 'undefined') {
            const storedToken = sessionStorage.getItem('jwt');
            setIsLogin(!!storedToken);

            updateCartCount();
            window.addEventListener('storage', updateCartCount);
            return () => {
                window.removeEventListener('storage', updateCartCount);
            };
        }
    }, []);

    useEffect(() => {
        setCurrentLanguage(locales[i18n.language as keyof typeof locales] || 'Language');
    }, [i18n.language]);

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const count = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
        setCartCount(count);
        setCartItems(cart);
    };

    const handleRemoveItem = (itemId: string) => {
        const updatedCart = cartItems.filter((item: any) => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        updateCartCount();
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push('/register');
    };

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const changeLanguage = (lng: 'en' | 'vi') => {
        i18n.changeLanguage(lng);
    };

    return (
        <header className="bg-white mt-5">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <Link href="/">
                    <Image
                        src="/logo1.jpg"
                        alt="Logo"
                        width={80}
                        height={80}
                    />
                </Link>
                <div className="flex flex-1 items-center justify-end md:justify-between">
                    <nav aria-label="Global" className="hidden md:block">
                        <ul className="flex items-center gap-6 text-sm">
                            <li>
                                <Link className="text-black text-sm text-[22px] transition hover:text-gray-500/75" href="/about">{t('about us')}</Link>
                            </li>
                            <li>
                                <Link className="text-black text-sm text-[22px] transition hover:text-gray-500/75" href="/profile">{t('profile')}</Link>
                            </li>
                            <li>
                                <Link className="text-black text-sm text-[22px] transition hover:text-gray-500/75" href="/contact">{t('contact us')}</Link>
                            </li>
                        </ul>
                    </nav>
                    <form onSubmit={handleSearch} className="md:flex items-center border rounded-full p-2 px-5">
                        <Search />
                        <input
                            type="text"
                            placeholder={t('filter search')}
                            className="outline-none ml-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="hidden">Search</button>
                    </form>

                    <div className="relative flex items-center gap-4">
                        {!isAuthPage && (
                            <>
                                <Sheet>
                                    <SheetTrigger>
                                        <div className="relative flex items-center ml-[-10px]">
                                            <ShoppingBasket className="relative top-2" />
                                            <span className="absolute top-[-5px] right-[-2px] bg-teal-500 text-white px-1.5 py-0.5 rounded-full text-xs">
                                                {cartCount}
                                            </span>
                                        </div>
                                    </SheetTrigger>
                                    <SheetContent>
                                        <SheetHeader>
                                            <SheetTitle className="bg-teal-500 text-white font-bold text-lg p-2">{t('cart')}</SheetTitle>
                                            <SheetDescription>
                                                <CartItemList cartItems={cartItems} onRemoveItem={handleRemoveItem} />
                                            </SheetDescription>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <div className="h-12 w-12 bg-green-100 p-2 rounded-full cursor-pointer">
                                            <Image
                                                src={profileImage || '/avatar.jpg'}
                                                alt="Profile Image"
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                        </div>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuSeparator />
                                        <Link href={'/history'}>
                                            <DropdownMenuItem>{t('history')}</DropdownMenuItem>
                                        </Link>
                                        <DropdownMenuItem>{t('orders')}</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>{t('logout')}</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        )}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 bg-teal-400 text-white px-4 py-2 rounded-full">
                                    <MdLanguage />
                                    {currentLanguage}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="ml-4">
                                <DropdownMenuItem onClick={() => changeLanguage('vi')}>
                                    Tiếng Việt
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                                    English
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <div className="sm:flex sm:gap-4">
                            {isAuthPage && (
                                <>
                                    <Link href="/login">
                                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">{t('login')}</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-teal-500 hover:bg-teal-600 text-white">{t('register')}</Button>
                                    </Link>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
