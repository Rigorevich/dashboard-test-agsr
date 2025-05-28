import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

import { NextResponse } from 'next/server';

const filePath = join(process.cwd(), 'dashboard.json');

export async function GET() {
  try {
    const content = await readFile(filePath, 'utf-8');
    return NextResponse.json(content ? JSON.parse(content) : { lists: [] });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ lists: [] });
  }
}

export async function POST(request: Request) {
  try {
    const lists = await request.json();
    await writeFile(filePath, JSON.stringify({ lists }, null, 2));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Failed to save dashboard:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
