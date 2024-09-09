import type { NextApiRequest, NextApiResponse } from 'next';

// Giả lập một cơ sở dữ liệu người dùng trong bộ nhớ
let users = [
    { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        // Kiểm tra thông tin đầu vào
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Tạo người dùng mới
        const newUser = { id: (users.length + 1).toString(), name, email, password };
        users.push(newUser);

        // Giả lập JWT token
        const jwt = 'mock-jwt-token';

        res.status(201).json({ user: newUser, jwt });
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
