import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'userProfile.json');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { fullName, email, address, city, date, imageUrl } = req.body;

        try {
            let userData = {};
            if (fs.existsSync(filePath)) {
                userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            }

            userData = {
                fullName,
                email,
                address,
                city,
                date,
                imageUrl
            };

            fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf-8');

            res.status(200).json(userData);
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: 'Failed to update profile' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
