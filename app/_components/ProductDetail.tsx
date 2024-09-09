"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaShoppingBasket } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductItem from '../_components/ProductItem';
import { useTranslation } from 'react-i18next';
import Header from "../_components/Header";
import Footer from "../_components/Footer";
type ProductDetailProps = {
    product: {
        id: string;
        name: string;
        avatar: string;
        price: number;
        sellingPrice?: number;
        quantity: number;
        itemQuantityType: string;
        description: string;
    };
};

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchRelatedProducts = async () => {
            try {
                const response = await fetch('https://66b485189f9169621ea34bb0.mockapi.io/products');
                const data = await response.json();
                setRelatedProducts(data.filter((p: any) => p.id !== product.id));
            } catch (error) {
                console.error('Failed to fetch related products:', error);
            }
        };

        fetchRelatedProducts();
    }, [product.id]);

    const handleIncrease = () => {
        if (quantity < product.quantity) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleAddToCart = () => {
        setLoading(true);
        setTimeout(() => {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.sellingPrice ?? product.price,
                    quantity,
                    avatar: product.avatar,
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            // window.dispatchEvent(new Event('storage'));
            setLoading(false);
            toast.success(`${product.name} ${t('add_to_cart')}`);
        }, 1000);
    };

    const totalPrice = (product.sellingPrice ?? product.price) * quantity;

    return (
        <>
            <Header />
            <div className=" mt-6 rounded-sm overflow-hidden border border-gray-300 dark:border-gray-800">
                <div className="bg-gray-800 p-5 mt-5">
                    <h2 id={`product_detail_${product.id}`} className="text-xl font-semibold text-white capitalize">
                        {t('product_detail')}
                    </h2>
                </div>
                <div className="flex">
                    <div className="w-1/2 bg-gray-100 p-8 flex justify-center items-center">
                        <Image
                            src={product.avatar}
                            alt={`${product.name} image`}
                            layout="intrinsic"
                            width={900}
                            height={700}
                            className="object-cover"
                        />
                    </div>
                    <div className="w-1/2 p-8 flex flex-col">
                        <h2 className="text-3xl font-extrabold mb-6">{product.name}</h2>
                        <p className="text-gray-800 text-base mb-4">{product.description}</p>
                        <div className="flex items-center gap-4 mb-4">
                            {product.sellingPrice && (
                                <h2 className="text-2xl font-bold text-red-500">
                                    ${product.sellingPrice.toFixed(2)}
                                </h2>
                            )}
                            <h2 className={`text-lg font-bold ${product.sellingPrice ? 'line-through text-gray-500' : ''}`}>
                                ${product.price.toFixed(2)}
                            </h2>
                        </div>
                        <p className="text-lg font-medium mb-4">{t('item_quantity_type')}: {product.itemQuantityType}</p>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-shrink-0">
                                <button
                                    className="px-4 py-2 text-lg font-bold bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                    onClick={handleDecrease}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-4 py-2 text-xl font-semibold">{quantity}</span>
                                <button
                                    className="px-4 py-2 text-lg font-bold bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                    onClick={handleIncrease}
                                    disabled={quantity >= product.quantity}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={loading}
                                className="ml-[24px] px-4 py-2 bg-teal-500 text-white font-bold rounded-lg flex items-center gap-2 hover:bg-teal-600 min-w-[150px] transition-all"
                            >
                                {loading ? 'Adding...' : <FaShoppingBasket />} {t('add_to_cart')}
                            </button>
                        </div>

                        <p className="text-lg font-bold">{t('total_price')}: ${totalPrice.toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-6">{t('related_products')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                        {relatedProducts.length > 0 ? (
                            relatedProducts.map((relatedProduct) => (
                                <ProductItem key={relatedProduct.id} product={relatedProduct} />
                            ))
                        ) : (
                            <p>{t('no_related_products')}</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );

};

export default ProductDetail;
