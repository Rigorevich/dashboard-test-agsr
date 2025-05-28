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

export async function POST(req: Request) {
  const body = await req.json();
  await writeFile(filePath, JSON.stringify(body, null, 2));
  return NextResponse.json({ success: true });
}
