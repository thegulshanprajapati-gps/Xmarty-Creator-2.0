import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function POST(request: Request) {
  try {
    const { subscription } = await request.json();

    if (!subscription || !subscription.endpoint) {
      return NextResponse.json({ error: 'Invalid subscription' }, { status: 400 });
    }

    const db = await getDb();
    
    // Store subscription in the 'push_subscriptions' collection.
    // Use the endpoint as a unique filter to upsert to prevent duplicates.
    await db.collection('push_subscriptions').updateOne(
      { endpoint: subscription.endpoint },
      { 
        $set: { 
          subscription,
          updated_at: new Date().toISOString()
        } 
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[SUBSCRIBE NOTIFICATION ERROR]', err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
