import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAllDocuments, createDocument } from '@/lib/data';

export async function GET() {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const documents = await getAllDocuments();
    return NextResponse.json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const document = await createDocument({
      title: data.title,
      titleKz: data.titleKz,
      titleEn: data.titleEn,
      description: data.description,
      descriptionKz: data.descriptionKz,
      descriptionEn: data.descriptionEn,
      fileUrl: data.fileUrl,
      fileName: data.fileName,
      fileType: data.fileType || 'license',
      order: data.order,
      isActive: data.isActive ?? true,
    });

    if (!document) {
      return NextResponse.json({ error: 'Failed to create document' }, { status: 500 });
    }

    return NextResponse.json(document);
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
