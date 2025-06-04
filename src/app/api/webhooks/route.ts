// app/api/clerk/webhook/route.ts
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  const payload = await req.text();
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id') || '';
  const svixTimestamp = headerPayload.get('svix-timestamp') || '';
  const svixSignature = headerPayload.get('svix-signature') || '';

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: { type: string; data: unknown };

  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as { type: string; data: unknown };
  } catch (err) {
    console.error('Webhook verification failed:', err);
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { type, data } = evt;

  // Handle specific event types
  switch (type) {
    case 'user.created':
      console.log('User created:', data);
      break;
    case 'user.updated':
      console.log('User updated:', data);
      break;
    // Add other events if needed
    default:
      console.log(`Unhandled event type: ${type}`);
  }

  return NextResponse.json({ received: true });
}
