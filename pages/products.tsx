// src/pages/product.tsx

import { GetServerSideProps } from 'next';
import ProductDetail from '../app/_components/ProductDetail';
import api from '../app/_utils/api'; // Đảm bảo đường dẫn đúng

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string; // Đảm bảo rằng bạn có thuộc tính imageUrl nếu cần hiển thị hình ảnh sản phẩm
    // Các thuộc tính khác nếu cần
}

interface ProductPageProps {
    product: Product;
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
    return (
        <div>
            <ProductDetail product={product} />
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
    const { id } = context.query; // Lấy ID từ query params

    try {
        const product = await api.getProduct(id as string);
        return {
            props: {
                product
            }
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return {
            notFound: true
        };
    }
};

export default ProductPage;
