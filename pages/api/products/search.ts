// src/pages/api/products/search.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const API_URL = 'https://66b485189f9169621ea34bb0.mockapi.io/products'; // Thay đổi URL nếu cần

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;

    if (typeof query !== 'string') {
        return res.status(400).json({ message: 'Invalid query' });
    }

    try {
        const response = await axios.get(`${API_URL}?search=${encodeURIComponent(query)}`);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}
