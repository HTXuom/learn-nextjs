import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'userProfile.json'); // Đường dẫn đến tệp JSON lưu trữ thông tin người dùng

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Đọc dữ liệu từ tệp JSON
        let userData = {};
        if (fs.existsSync(filePath)) {
            userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }

        res.status(200).json(userData);
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
