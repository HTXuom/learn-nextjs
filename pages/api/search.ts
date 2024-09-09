
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req.query;
    try {
        const response = await axios.get('https://66b485189f9169621ea34bb0.mockapi.io/products');
        const products = response.data;
        const filteredProducts = products.filter((product: any) =>
            product.name.toLowerCase().includes(query?.toString().toLowerCase() || '')
        );
        res.status(200).json(filteredProducts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

export default handler;
