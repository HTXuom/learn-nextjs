// components/ProductList.js
import React from 'react';
import ProductItem from './ProductItem';
import Products from '../data/Products'; // Import tệp dữ liệu sản phẩm

function ProductList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Products.map((Products) => (
                <ProductItem key={Products.id} product={Products} />
            ))}
        </div>
    );
}

export default ProductList;


