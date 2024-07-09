import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProductsData from '../data/Products'; // Sử dụng tên ProductsData thay vì Products

function Slider() {
    return (
        <div className="relative w-full max-w-full mx-auto">
            <Carousel>
                <CarouselContent>
                    {ProductsData.map((product) => (
                        <CarouselItem key={product.id} className="relative">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-2xl"
                                style={{ maxWidth: '100%', maxHeight: '60vh' }} 
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
}

export default Slider;
