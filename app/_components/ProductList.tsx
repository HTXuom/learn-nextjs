"use client"; // Đánh dấu là Client Component

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

const ITEMS_PER_PAGE = 10; // Số sản phẩm hiển thị trên mỗi trang

function ProductList() {
    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Lấy dữ liệu sản phẩm từ API
        axios.get('https://66b485189f9169621ea34bb0.mockapi.io/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, []);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageCount - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getCurrentProducts = () => {
        const offset = currentPage * ITEMS_PER_PAGE;
        return products.slice(offset, offset + ITEMS_PER_PAGE);
    };

    const pageCount = Math.ceil(products.length / ITEMS_PER_PAGE);
    const currentProducts = getCurrentProducts();

    return (
        <div className="relative">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[50px]">
                        {currentProducts.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="absolute right-4">
                        <div className="main_pagination">
                            <ul className="mx-8 md:mx-16 flex items-center">
                                <li className="previous">
                                    <a
                                        tabIndex={0}
                                        role="button"
                                        aria-disabled={currentPage === 0}
                                        aria-label="Previous page"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handlePrevious();
                                        }}
                                    >
                                        <svg
                                            className="text-gray-600 dark:text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="9"
                                            height="16"
                                            viewBox="0 0 9 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M7.66669 15.0001L1.00002 8.33339L7.66669 1.66673"
                                                stroke="currentColor"
                                                strokeWidth="1.75"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </a>
                                </li>
                                {Array.from({ length: pageCount }, (_, index) => (
                                    <li key={index}>
                                        <a
                                            tabIndex={0}
                                            role="button"
                                            className={`mx-3 md:... ${currentPage === index ? 'active' : ''}`}
                                            onClick={() => handlePageClick(index)}
                                        >
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}
                                <li className="next">
                                    <a
                                        tabIndex={0}
                                        role="button"
                                        aria-disabled={currentPage === pageCount - 1}
                                        aria-label="Next page"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNext();
                                        }}
                                    >
                                        <svg
                                            className="text-gray-600 dark:text-gray-400"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="9"
                                            height="16"
                                            viewBox="0 0 9 16"
                                            fill="none"
                                        >
                                            <path
                                                d="M1.33337 15L8.00004 8.33333L1.33337 1.66667"
                                                stroke="currentColor"
                                                strokeWidth="1.75"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            ></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default ProductList;
