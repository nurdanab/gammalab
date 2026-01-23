import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth';
import { getAnalyses, createAnalysis, getCategories } from '@/lib/data';

export async function GET(request: NextRequest) {
  try {
    if (!await isAuthenticated()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const includeCategories = searchParams.get('includeCategories') === 'true';

    const analyses = await getAnalyses();

    if (includeCategories) {
      const categories = await getCategories();
      return NextResponse.json({ analyses, categories });
    }

    return NextResponse.json(analyses);
  } catch (error) {
    console.error('Error fetching analyses:', error);
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

function generateSlug(name: string): string {
  return transliterate(name)
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
    if (!data.name || !data.categoryId) {
      return NextResponse.json(
        { error: 'Название и категория обязательны' },
        { status: 400 }
      );
    }

    // Auto-generate ID and slug
    const id = `analysis_${Date.now()}`;
    const slug = generateSlug(data.name);

    const analysis = await createAnalysis({
      id,
      slug,
      name: data.name,
      nameKz: data.nameKz || data.name,
      nameEn: data.nameEn || data.name,
      description: data.description || '',
      descriptionKz: data.descriptionKz || data.description || '',
      descriptionEn: data.descriptionEn || data.description || '',
      categoryId: data.categoryId,
      price: data.price || 0,
      collectionPrice: data.collectionPrice || 0,
      deadline: data.deadline || '',
      deadlineKz: data.deadlineKz || data.deadline || '',
      deadlineEn: data.deadlineEn || data.deadline || '',
      biomaterial: data.biomaterial || '',
      biomaterialKz: data.biomaterialKz || data.biomaterial || '',
      biomaterialEn: data.biomaterialEn || data.biomaterial || '',
      preparation: data.preparation || '',
      preparationKz: data.preparationKz || data.preparation || '',
      preparationEn: data.preparationEn || data.preparation || '',
    });

    return NextResponse.json(analysis, { status: 201 });
  } catch (error) {
    console.error('Error creating analysis:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
