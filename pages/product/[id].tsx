// pages/products/[id].tsx

import { GetServerSideProps } from 'next';
import ProductDetail from '@/app/_components/ProductDetail';
import { fetchProductById } from '@/lib/api';

type Product = {
    id: string;
    name: string;
    avatar: string;
    price: number;
    sellingPrice?: number;
    quantity: number;
    itemQuantityType: string;
    description: string;
};

type ProductPageProps = {
    product: Product | null;
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
    const { id } = context.params!;
    try {
        // Fetch product data by ID
        const product = await fetchProductById(id as string);

        // If no product is found, return 404
        if (!product) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                product,
            },
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return {
            notFound: true, // Hiển thị trang 404 nếu có lỗi xảy ra
        };
    }
};

const ProductPage = ({ product }: ProductPageProps) => {
    // Kiểm tra xem product có hợp lệ không trước khi render
    if (!product) {
        return <div>Product not found</div>;
    }

    return <ProductDetail product={product} />;
};

export default ProductPage;
