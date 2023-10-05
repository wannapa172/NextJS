// pages/api/create-post.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async function createPost(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    try {
      const { title, content } = req.body;

      // ทำการสร้างโพสต์ในฐานข้อมูลหรือที่ต้องการ
      const createdPost = {
        id: 1, // ตั้งค่า ID ให้ตรงกับโพสต์ที่สร้างขึ้น
        title,
        content,
      };

      res.status(201).json(createdPost);
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Error creating post' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
