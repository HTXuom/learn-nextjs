import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Product {
    id: string;
    name: string;
    avatar: string;
    price: number;
}

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const { t } = useTranslation();

    return (
        <>
            <Link href={`/product/${product.id}`}>
                <div className="my-5 mx-6 max-w-xs w-full">
                    <div className="group relative block border bg-gray-900 overflow-hidden rounded-xl cursor-pointer">
                        <div className="h-48 w-full overflow-hidden transition duration-500 group-hover:scale-105 sm:h-72 p-2 bg-white">
                            <Image
                                width={200}
                                height={200}
                                src={product.avatar}
                                alt={product.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="relative border border-gray-100 bg-white p-5 pt-2">
                            <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                                    {[...Array(4)].map((_, index) => (
                                        <svg key={index} className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    ))}
                                    <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </div>
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
                            </div>
                            <p className="mt-1.5 text-sm text-gray-700 mb-2">
                                {Number(product.price).toFixed(2)}
                            </p>
                            <hr />
                            <h5 className="mt-4">
                                <span className="text-red-500 font-bold">{t('now')}</span>, {t('express_delivery')}
                            </h5>
                        </div>
                    </div>
                </div>
            </Link>
        </>

    );
};

export default ProductItem;
