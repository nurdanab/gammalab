import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getNews, createNews } from '@/lib/data';

export async function GET() {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const news = await getNews();
    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// Transliterate Russian to Latin for slug
function transliterate(text: string): string {
  const map: Record<string, string> = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch', 'ъ': '',
    'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ё': 'E',
    'Ж': 'Zh', 'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M',
    'Н': 'N', 'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U',
    'Ф': 'F', 'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sch', 'Ъ': '',
    'Ы': 'Y', 'Ь': '', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
  };
  return text.split('').map(char => map[char] || char).join('');
}

function generateSlug(title: string): string {
  return transliterate(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

export async function POST(request: NextRequest) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    // Validate required fields
    if (!data.title || !data.category) {
      return NextResponse.json(
        { error: 'Заголовок и тип обязательны' },
        { status: 400 }
      );
    }

    // Auto-generate slug from title
    const slug = generateSlug(data.title);

    const newsItem = await createNews({
      slug,
      title: data.title,
      titleKz: data.titleKz || data.title,
      titleEn: data.titleEn || data.title,
      excerpt: data.excerpt || '',
      excerptKz: data.excerptKz || data.excerpt || '',
      excerptEn: data.excerptEn || data.excerpt || '',
      content: data.content || '',
      contentKz: data.contentKz || data.content || '',
      contentEn: data.contentEn || data.content || '',
      image: data.image || '',
      category: data.category,
      publishedAt: data.publishedAt || new Date().toISOString().split('T')[0],
      featured: data.featured || false,
    });

    return NextResponse.json(newsItem, { status: 201 });
  } catch (error) {
    console.error('Error creating news:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
