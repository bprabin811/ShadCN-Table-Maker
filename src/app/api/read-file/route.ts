import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get('path');

  if (!filePath) {
    return NextResponse.json({ error: 'No file path provided' }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), filePath);

  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    return NextResponse.json({ content });
  } catch (error) {
    console.error(`Error reading file from ${fullPath}:`, error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

