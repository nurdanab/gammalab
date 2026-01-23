import { promises as fs } from 'fs';
import path from 'path';

// Types
export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  titleKz: string;
  titleEn: string;
  excerpt: string;
  excerptKz: string;
  excerptEn: string;
  content: string;
  contentKz: string;
  contentEn: string;
  image: string;
  category: 'news' | 'promotion' | 'article';
  publishedAt: string;
  featured: boolean;
}

export interface HomepageService {
  id: string;
  title: string;
  titleKz: string;
  titleEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  icon: string;
  order: number;
}

export interface Review {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  text: string;
  textKz: string;
  textEn: string;
  rating: number;
  date: string;
  photo?: string;
  showOnHomepage: boolean;
  order: number;
}

export interface Analysis {
  id: string;
  slug: string;
  name: string;
  nameKz: string;
  nameEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  categoryId: string;
  price: number;
  collectionPrice: number;
  deadline: string;
  deadlineKz: string;
  deadlineEn: string;
  biomaterial: string;
  biomaterialKz: string;
  biomaterialEn: string;
  preparation: string;
  preparationKz: string;
  preparationEn: string;
}

export interface Category {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  slug: string;
}

export interface Submission {
  id: string;
  type: 'contact' | 'booking';
  firstName: string;
  lastName?: string;
  email?: string;
  phone: string;
  message?: string;
  rating?: number;
  analysisId?: string;
  analysisName?: string;
  preferredDate?: string;
  createdAt: string;
}

export interface HomepageCategory {
  id: string;
  name: string;
  nameKz: string;
  nameEn: string;
  description: string;
  descriptionKz: string;
  descriptionEn: string;
  description2: string;
  description2Kz: string;
  description2En: string;
  tags: string[];
  tagsKz: string[];
  tagsEn: string[];
  order: number;
  featured: boolean;
}

// File paths
const dataDir = path.join(process.cwd(), 'src', 'data', 'json');

const getFilePath = (filename: string) => path.join(dataDir, filename);

// Generic read/write functions
async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = getFilePath(filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  try {
    const filePath = getFilePath(filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
}

// News functions
export async function getNews(): Promise<NewsItem[]> {
  return readJsonFile<NewsItem>('news.json');
}

export async function getNewsById(id: string): Promise<NewsItem | undefined> {
  const news = await getNews();
  return news.find(n => n.id === id);
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | undefined> {
  const news = await getNews();
  return news.find(n => n.slug === slug);
}

export async function createNews(newsItem: Omit<NewsItem, 'id'>): Promise<NewsItem> {
  const news = await getNews();
  const newId = String(Math.max(0, ...news.map(n => parseInt(n.id))) + 1);
  const newItem: NewsItem = { ...newsItem, id: newId };
  news.unshift(newItem);
  await writeJsonFile('news.json', news);
  return newItem;
}

export async function updateNews(id: string, updates: Partial<NewsItem>): Promise<NewsItem | null> {
  const news = await getNews();
  const index = news.findIndex(n => n.id === id);
  if (index === -1) return null;

  news[index] = { ...news[index], ...updates, id };
  await writeJsonFile('news.json', news);
  return news[index];
}

export async function deleteNews(id: string): Promise<boolean> {
  const news = await getNews();
  const index = news.findIndex(n => n.id === id);
  if (index === -1) return false;

  news.splice(index, 1);
  await writeJsonFile('news.json', news);
  return true;
}

// Analyses functions
export async function getAnalyses(): Promise<Analysis[]> {
  return readJsonFile<Analysis>('analyses.json');
}

export async function getAnalysisById(id: string): Promise<Analysis | undefined> {
  const analyses = await getAnalyses();
  return analyses.find(a => a.id === id);
}

export async function getAnalysisBySlug(slug: string): Promise<Analysis | undefined> {
  const analyses = await getAnalyses();
  return analyses.find(a => a.slug === slug);
}

export async function createAnalysis(analysis: Analysis): Promise<Analysis> {
  const analyses = await getAnalyses();
  analyses.push(analysis);
  await writeJsonFile('analyses.json', analyses);
  return analysis;
}

export async function updateAnalysis(id: string, updates: Partial<Analysis>): Promise<Analysis | null> {
  const analyses = await getAnalyses();
  const index = analyses.findIndex(a => a.id === id);
  if (index === -1) return null;

  analyses[index] = { ...analyses[index], ...updates, id };
  await writeJsonFile('analyses.json', analyses);
  return analyses[index];
}

export async function deleteAnalysis(id: string): Promise<boolean> {
  const analyses = await getAnalyses();
  const index = analyses.findIndex(a => a.id === id);
  if (index === -1) return false;

  analyses.splice(index, 1);
  await writeJsonFile('analyses.json', analyses);
  return true;
}

// Categories functions
export async function getCategories(): Promise<Category[]> {
  return readJsonFile<Category>('categories.json');
}

// Submissions functions
export async function getSubmissions(): Promise<Submission[]> {
  return readJsonFile<Submission>('submissions.json');
}

export async function getSubmissionById(id: string): Promise<Submission | undefined> {
  const submissions = await getSubmissions();
  return submissions.find(s => s.id === id);
}

export async function createSubmission(submission: Omit<Submission, 'id' | 'createdAt'>): Promise<Submission> {
  const submissions = await getSubmissions();
  const newId = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const newSubmission: Submission = {
    ...submission,
    id: newId,
    createdAt: new Date().toISOString(),
  };
  submissions.unshift(newSubmission);
  await writeJsonFile('submissions.json', submissions);
  return newSubmission;
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const submissions = await getSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  if (index === -1) return false;

  submissions.splice(index, 1);
  await writeJsonFile('submissions.json', submissions);
  return true;
}

// Homepage Services functions
export async function getHomepageServices(): Promise<HomepageService[]> {
  const services = await readJsonFile<HomepageService>('homepage-services.json');
  return services.sort((a, b) => a.order - b.order);
}

export async function getHomepageServiceById(id: string): Promise<HomepageService | undefined> {
  const services = await getHomepageServices();
  return services.find(s => s.id === id);
}

export async function createHomepageService(service: Omit<HomepageService, 'id'>): Promise<HomepageService> {
  const services = await getHomepageServices();
  const newId = `service_${Date.now()}`;
  const newService: HomepageService = { ...service, id: newId };
  services.push(newService);
  await writeJsonFile('homepage-services.json', services);
  return newService;
}

export async function updateHomepageService(id: string, updates: Partial<HomepageService>): Promise<HomepageService | null> {
  const services = await getHomepageServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return null;

  services[index] = { ...services[index], ...updates, id };
  await writeJsonFile('homepage-services.json', services);
  return services[index];
}

export async function deleteHomepageService(id: string): Promise<boolean> {
  const services = await getHomepageServices();
  const index = services.findIndex(s => s.id === id);
  if (index === -1) return false;

  services.splice(index, 1);
  await writeJsonFile('homepage-services.json', services);
  return true;
}

// Reviews functions
export async function getReviews(): Promise<Review[]> {
  const reviews = await readJsonFile<Review>('reviews.json');
  return reviews.sort((a, b) => a.order - b.order);
}

export async function getHomepageReviews(): Promise<Review[]> {
  const reviews = await getReviews();
  return reviews.filter(r => r.showOnHomepage).sort((a, b) => a.order - b.order);
}

export async function getReviewById(id: string): Promise<Review | undefined> {
  const reviews = await getReviews();
  return reviews.find(r => r.id === id);
}

export async function createReview(review: Omit<Review, 'id'>): Promise<Review> {
  const reviews = await getReviews();
  const newId = `review_${Date.now()}`;
  const newReview: Review = { ...review, id: newId };
  reviews.push(newReview);
  await writeJsonFile('reviews.json', reviews);
  return newReview;
}

export async function updateReview(id: string, updates: Partial<Review>): Promise<Review | null> {
  const reviews = await getReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return null;

  reviews[index] = { ...reviews[index], ...updates, id };
  await writeJsonFile('reviews.json', reviews);
  return reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
  const reviews = await getReviews();
  const index = reviews.findIndex(r => r.id === id);
  if (index === -1) return false;

  reviews.splice(index, 1);
  await writeJsonFile('reviews.json', reviews);
  return true;
}

// Homepage Categories functions
export async function getHomepageCategories(): Promise<HomepageCategory[]> {
  const categories = await readJsonFile<HomepageCategory>('homepage-categories.json');
  return categories.sort((a, b) => a.order - b.order);
}

export async function getHomepageCategoryById(id: string): Promise<HomepageCategory | undefined> {
  const categories = await getHomepageCategories();
  return categories.find(c => c.id === id);
}

export async function getFeaturedHomepageCategory(): Promise<HomepageCategory | undefined> {
  const categories = await getHomepageCategories();
  return categories.find(c => c.featured);
}

export async function createHomepageCategory(category: Omit<HomepageCategory, 'id'>): Promise<HomepageCategory> {
  const categories = await getHomepageCategories();
  const newId = `hcat_${Date.now()}`;
  const newCategory: HomepageCategory = { ...category, id: newId };
  categories.push(newCategory);
  await writeJsonFile('homepage-categories.json', categories);
  return newCategory;
}

export async function updateHomepageCategory(id: string, updates: Partial<HomepageCategory>): Promise<HomepageCategory | null> {
  const categories = await getHomepageCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return null;

  categories[index] = { ...categories[index], ...updates, id };
  await writeJsonFile('homepage-categories.json', categories);
  return categories[index];
}

export async function deleteHomepageCategory(id: string): Promise<boolean> {
  const categories = await getHomepageCategories();
  const index = categories.findIndex(c => c.id === id);
  if (index === -1) return false;

  categories.splice(index, 1);
  await writeJsonFile('homepage-categories.json', categories);
  return true;
}

// Helper functions for news on public pages
export async function getFeaturedNewsFromCMS(limit: number = 3): Promise<NewsItem[]> {
  const news = await getNews();
  return news
    .filter(n => n.featured && n.category === 'news')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getFeaturedPromotions(limit: number = 3): Promise<NewsItem[]> {
  const news = await getNews();
  return news
    .filter(n => n.category === 'promotion')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export async function getAllNewsAndPromotions(): Promise<NewsItem[]> {
  const news = await getNews();
  return news.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Stats
export async function getStats() {
  const [news, analyses, submissions, homepageServices, reviews] = await Promise.all([
    getNews(),
    getAnalyses(),
    getSubmissions(),
    getHomepageServices(),
    getReviews(),
  ]);

  return {
    newsCount: news.filter(n => n.category === 'news').length,
    promotionsCount: news.filter(n => n.category === 'promotion').length,
    analysesCount: analyses.length,
    submissionsCount: submissions.length,
    homepageServicesCount: homepageServices.length,
    reviewsCount: reviews.length,
    recentSubmissions: submissions.slice(0, 5),
  };
}
