import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('course_id') || 'default';
    const parentFolderId = searchParams.get('parent_folder_id');

    const db = await getDb();
    const query: any = { course_id: courseId };
    
    if (parentFolderId) {
      query.parent_folder_id = parentFolderId;
    } else {
      query.$or = [{ parent_folder_id: null }, { parent_folder_id: { $exists: false } }];
    }

    const folders = await db.collection('course_folders')
      .find(query)
      .sort({ sort_order: 1 })
      .toArray();

    return NextResponse.json(folders.map(f => ({ ...f, id: f._id.toString(), _id: undefined })));
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
