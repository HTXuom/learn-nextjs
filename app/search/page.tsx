"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from '../_components/productItem';

const SearchPage = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || ''; // Lấy giá trị của tham số 'q'

    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (searchQuery) {
            setLoading(true);
            axios.get(`https://66b485189f9169621ea34bb0.mockapi.io/products`)
                .then(response => {
                    const filteredProducts = response.data.filter(product =>
                        product.name.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                    setProducts(filteredProducts);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to fetch products');
                    setLoading(false);
                });
        }
    }, [searchQuery]); // Thay đổi dependency array

    return (
        <div className="container mx-auto p-4">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2zm10-8a8 8 0 018 8h-2a6 6 0 00-6-6v2z"></path>
                    </svg>
                </div>
            ) : error ? (
                <p className="text-red-600">{error}</p>
            ) : (
                <div>
                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                            {products.map(product => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-2xl font-bold mb-4 mt-8 p-12" >No products found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
