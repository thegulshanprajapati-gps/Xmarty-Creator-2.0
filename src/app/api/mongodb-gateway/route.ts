import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(req: NextRequest) {
  try {
    const { action, collection: collectionName, filter = {}, data = {}, options = {} } = await req.json();

    if (!collectionName) {
      return NextResponse.json({ error: 'Collection name is required' }, { status: 400 });
    }

    const db = await getDb();
    const collection = db.collection(collectionName);

    // Convert string _id to ObjectId if present in filter or data
    if (filter._id && typeof filter._id === 'string' && ObjectId.isValid(filter._id)) {
      filter._id = new ObjectId(filter._id);
    }
    if (data._id && typeof data._id === 'string' && ObjectId.isValid(data._id)) {
      data._id = new ObjectId(data._id);
    }

    let result: any = null;

    switch (action) {
      case 'find':
        const cursor = collection.find(filter);
        if (options.sort) cursor.sort(options.sort);
        if (options.limit) cursor.limit(options.limit);
        if (options.skip) cursor.skip(options.skip);
        result = await cursor.toArray();
        break;

      case 'findOne':
        result = await collection.findOne(filter);
        break;

      case 'insertOne':
        const insertRes = await collection.insertOne(data);
        result = { ...data, _id: insertRes.insertedId };
        break;

      case 'updateOne':
        const updateRes = await collection.updateOne(filter, { $set: data }, options);
        result = { matchedCount: updateRes.matchedCount, modifiedCount: updateRes.modifiedCount };
        break;

      case 'upsert':
        // Custom helper for upsert
        const upsertRes = await collection.updateOne(
          filter,
          { $set: data },
          { upsert: true }
        );
        result = { matchedCount: upsertRes.matchedCount, modifiedCount: upsertRes.modifiedCount, upsertedId: upsertRes.upsertedId };
        break;

      case 'deleteOne':
        const deleteRes = await collection.deleteOne(filter);
        result = { deletedCount: deleteRes.deletedCount };
        break;

      default:
        return NextResponse.json({ error: `Unsupported action: ${action}` }, { status: 400 });
    }

    return NextResponse.json({ data: result });
  } catch (error: any) {
    console.error('[MONGODB GATEWAY ERROR]', error);
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 });
  }
}
