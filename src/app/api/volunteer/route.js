import { NextResponse } from 'next/server';
import { VOLUNTEER_SHIFTS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ success: true, data: VOLUNTEER_SHIFTS }, { status: 200 });
}