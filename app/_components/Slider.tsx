'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import ProductsData from '../data/Products';

function Slider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % ProductsData.length);
        }, 4000); // 3000ms = 3s

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    const handlePreviousClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + ProductsData.length) % ProductsData.length);
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % ProductsData.length);
    };

    return (
        <div className="relative w-full max-w-full mx-auto overflow-hidden">
            <div
                className="relative flex transition-transform duration-1000"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {ProductsData.slice(0, 4).map((product) => (
                    <div key={product.id} className="min-w-full">
                        <Image
                            width={800}      // Chiều rộng ảnh
                            height={400}     // Chiều cao ảnh
                            src={product.imageUrl}  // Sử dụng ảnh của sản phẩm
                            alt={product.name}
                            layout="responsive"
                            className="object-contain rounded-2xl"
                            style={{ maxWidth: '100%', maxHeight: '60vh' }}
                        />
                    </div>
                ))}
                {/* Thêm các ảnh đầu tiên vào cuối danh sách để tạo hiệu ứng lặp lại */}
                {ProductsData.slice(0, 4).map((product) => (
                    <div key={`copy-${product.id}`} className="min-w-full">
                        <Image
                            width={800}      // Chiều rộng ảnh
                            height={400}     // Chiều cao ảnh
                            src={product.imageUrl}  // Sử dụng ảnh của sản phẩm
                            alt={product.name}
                            layout="responsive"
                            className="object-contain rounded-2xl"
                            style={{ maxWidth: '100%', maxHeight: '60vh' }}
                        />
                    </div>
                ))}
            </div>
           

            {/* Dots Indicator */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
                {ProductsData.slice(0, 4).map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentIndex % ProductsData.slice(0, 4).length ? 'bg-green-600' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;
