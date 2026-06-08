import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

function parseSort(sortBy: string | null): any {
  switch (sortBy) {
    case 'oldest':
      return { uploaded_at: 1 };
    case 'name':
      return { name: 1 };
    case 'size':
      return { size: 1 };
    case 'type':
      return { media_type: 1 };
    default:
      return { uploaded_at: -1 };
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');
    const search = searchParams.get('search')?.trim();
    const sortBy = searchParams.get('sortBy');
    const view = searchParams.get('view');
    const page = Math.max(1, Number(searchParams.get('page') || '1'));
    const pageSize = Math.min(72, Math.max(12, Number(searchParams.get('pageSize') || '36')));
    const type = searchParams.get('type');
    const recycle = searchParams.get('recycle') === 'true';

    const db = await getDb();
    const collection = db.collection('media_assets');

    const query: any = {};
    if (recycle) {
      query.deleted = true;
    } else {
      query.deleted = { $ne: true };
    }
    if (folderId) {
      query.folder_id = folderId;
    }
    if (type) {
      query.media_type = type;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
        { folder_name: { $regex: search, $options: 'i' } },
        { mime_type: { $regex: search, $options: 'i' } },
      ];
    }

    const sort = parseSort(sortBy);
    const total = await collection.countDocuments(query);
    const items = await collection
      .find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .toArray();

    return NextResponse.json({
      items: items.map(item => ({
        ...item,
        id: item._id.toString(),
        _id: undefined,
      })),
      total,
      page,
      pageSize,
      view: view || 'grid',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'File upload is required.' }, { status: 400 });
    }

    const folderId = formData.get('folderId')?.toString() || null;
    const folderName = formData.get('folderName')?.toString() || null;
    const tagsRaw = formData.get('tags')?.toString() || '';
    const tags = tagsRaw ? tagsRaw.split(',').map(tag => tag.trim()).filter(Boolean) : [];
    const name = formData.get('name')?.toString() || file.name;
    const mimeType = file.type || 'application/octet-stream';
    const mediaType = mimeType.startsWith('video') ? 'video' : 'image';
    const size = file.size;
    const uploadedAt = new Date();

    let url = '';
    let thumbnailUrl = '';

    if (CLOUDINARY_CLOUD_NAME && (CLOUDINARY_UPLOAD_PRESET || (CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET))) {
      const cloudForm = new FormData();
      cloudForm.append('file', file);
      if (CLOUDINARY_UPLOAD_PRESET) {
        cloudForm.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      }
      if (CLOUDINARY_API_KEY) {
        cloudForm.append('api_key', CLOUDINARY_API_KEY);
      }
      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`;
      const response = await fetch(cloudinaryUrl, { method: 'POST', body: cloudForm });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'Cloudinary upload failed');
      }
      url = data.secure_url || data.url;
      thumbnailUrl = data.secure_url || data.url;
    } else {
      const fs = await import('fs');
      const path = await import('path');
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const targetPath = path.join(uploadsDir, safeName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.promises.writeFile(targetPath, buffer);
      url = `/uploads/${safeName}`;
      thumbnailUrl = url;
    }

    const db = await getDb();
    const collection = db.collection('media_assets');
    const item = {
      name,
      mime_type: mimeType,
      media_type: mediaType,
      size,
      url,
      thumbnail_url: thumbnailUrl,
      tags,
      folder_id: folderId,
      folder_name: folderName,
      deleted: false,
      favorite: false,
      created_at: uploadedAt,
      updated_at: uploadedAt,
      metadata: {
        width: null,
        height: null,
      },
    };

    const result = await collection.insertOne(item);
    return NextResponse.json({
      ...item,
      id: result.insertedId.toString(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
