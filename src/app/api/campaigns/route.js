import { NextResponse } from 'next/server';
import { CAMPAIGNS } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ success: true, data: CAMPAIGNS }, { status: 200 });
}