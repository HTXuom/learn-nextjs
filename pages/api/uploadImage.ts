import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false
    }
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const form = new formidable.IncomingForm();
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            console.error('Error parsing form:', err);
            return res.status(500).json({ error: 'Failed to upload image' });
        }

        const file = files.file[0];
        const filePath = path.join(uploadDir, file.newFilename);

        try {
            fs.renameSync(file.filepath, filePath);
            res.status(200).json({ filePath: `/uploads/${file.newFilename}` });
        } catch (error) {
            console.error('Error moving file:', error);
            res.status(500).json({ error: 'Failed to move file' });
        }
    });
}
