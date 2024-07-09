import React from 'react';
import { useRouter } from 'next/router';
import Products from '../data/Products'; // Assuming you have a products data file

const ProductDetail = () => {
    const router = useRouter();
    const { id } = router.query;

    const product = Products.find((product) => product.id === id);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="relative">
                        <img
                            alt={product.name}
                            src={product.image}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{product.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Product details and information</p>
                        <dl className="mt-5 border-t border-gray-200">
                            <div className="py-3">
                                <dt className="font-medium text-gray-900">Product ID</dt>
                                <dd className="mt-1 text-gray-700">{product.id}</dd>
                            </div>
                            <div className="py-3">
                                <dt className="font-medium text-gray-900">Price</dt>
                                <dd className="mt-1 text-gray-700">${product.price}</dd>
                            </div>
                            <div className="py-3">
                                <dt className="font-medium text-gray-900">Description</dt>
                                <dd className="mt-1 text-gray-700">{product.description}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
