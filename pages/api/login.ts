import type { NextApiRequest, NextApiResponse } from 'next';

// Giả lập một cơ sở dữ liệu người dùng trong bộ nhớ
const users = [
    { id: '1', name: 'Test User', email: 'test@example.com', password: 'password' }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        // Kiểm tra thông tin đầu vào
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Tìm người dùng với email và mật khẩu khớp
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            // Giả lập JWT token
            const jwt = 'mock-jwt-token';

            // Trả về thông tin người dùng và token
            res.status(200).json({ success: true, user, token: jwt });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
