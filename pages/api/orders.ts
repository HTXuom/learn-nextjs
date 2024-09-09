// pages/api/orders.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

const orders: any[] = []; // Thay bằng cơ sở dữ liệu thực tế

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, items, total, date } = req.body;
        const newOrder = {
            id: uuidv4(),
            userId,
            items,
            total,
            date
        };
        orders.push(newOrder); // Thay bằng cơ sở dữ liệu thực tế
        return res.status(201).json(newOrder);
    }
    return res.status(405).json({ message: 'Method not allowed' });
}
