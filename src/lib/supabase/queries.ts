import { createClient } from './server'
import { createAdminClient } from './admin'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Simple client for public operations (no cookies needed)
function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ============ NEWS ============

export interface NewsItem {
  id: string
  slug: string
  title: string
  titleKz: string
  titleEn: string
  excerpt: string
  excerptKz: string
  excerptEn: string
  content: string
  contentKz: string
  contentEn: string
  image: string
  category: 'news' | 'promotion' | 'article'
  publishedAt: string
  featured: boolean
  createdAt: string
}

export interface NewsInsert {
  slug: string
  title: string
  titleKz: string
  titleEn: string
  excerpt: string
  excerptKz: string
  excerptEn: string
  content: string
  contentKz: string
  contentEn: string
  image: string
  category?: 'news' | 'promotion' | 'article'
  publishedAt?: string
  featured?: boolean
}

export type NewsUpdate = Partial<NewsInsert>

interface NewsRow {
  id: string
  slug: string
  title: string
  title_kz: string
  title_en: string
  excerpt: string
  excerpt_kz: string
  excerpt_en: string
  content: string
  content_kz: string
  content_en: string
  image: string
  category: 'news' | 'promotion' | 'article'
  published_at: string
  featured: boolean
  created_at: string
}

function mapNewsRow(row: NewsRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    titleKz: row.title_kz,
    titleEn: row.title_en,
    excerpt: row.excerpt,
    excerptKz: row.excerpt_kz,
    excerptEn: row.excerpt_en,
    content: row.content,
    contentKz: row.content_kz,
    contentEn: row.content_en,
    image: row.image,
    category: row.category,
    publishedAt: row.published_at,
    featured: row.featured,
    createdAt: row.created_at,
  }
}

function newsToDb(news: NewsInsert) {
  return {
    slug: news.slug,
    title: news.title,
    title_kz: news.titleKz,
    title_en: news.titleEn,
    excerpt: news.excerpt,
    excerpt_kz: news.excerptKz,
    excerpt_en: news.excerptEn,
    content: news.content,
    content_kz: news.contentKz,
    content_en: news.contentEn,
    image: news.image,
    category: news.category,
    published_at: news.publishedAt,
    featured: news.featured,
  }
}

export async function getNews(): Promise<NewsItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }
  return (data as NewsRow[]).map(mapNewsRow)
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching news by id:', error)
    return null
  }
  return mapNewsRow(data as NewsRow)
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching news by slug:', error)
    return null
  }
  return mapNewsRow(data as NewsRow)
}

export async function createNews(news: NewsInsert): Promise<NewsItem | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('news')
    .insert(newsToDb(news) as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating news:', error)
    return null
  }
  return mapNewsRow(data as NewsRow)
}

export async function updateNews(id: string, updates: NewsUpdate): Promise<NewsItem | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {}
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug
  if (updates.title !== undefined) dbUpdates.title = updates.title
  if (updates.titleKz !== undefined) dbUpdates.title_kz = updates.titleKz
  if (updates.titleEn !== undefined) dbUpdates.title_en = updates.titleEn
  if (updates.excerpt !== undefined) dbUpdates.excerpt = updates.excerpt
  if (updates.excerptKz !== undefined) dbUpdates.excerpt_kz = updates.excerptKz
  if (updates.excerptEn !== undefined) dbUpdates.excerpt_en = updates.excerptEn
  if (updates.content !== undefined) dbUpdates.content = updates.content
  if (updates.contentKz !== undefined) dbUpdates.content_kz = updates.contentKz
  if (updates.contentEn !== undefined) dbUpdates.content_en = updates.contentEn
  if (updates.image !== undefined) dbUpdates.image = updates.image
  if (updates.category !== undefined) dbUpdates.category = updates.category
  if (updates.publishedAt !== undefined) dbUpdates.published_at = updates.publishedAt
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured

  const { data, error } = await supabase
    .from('news')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating news:', error)
    return null
  }
  return mapNewsRow(data as NewsRow)
}

export async function deleteNews(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('news')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting news:', error)
    return false
  }
  return true
}

export async function getFeaturedNews(limit: number = 3): Promise<NewsItem[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('featured', true)
    .eq('category', 'news')
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching featured news:', error)
    return []
  }
  return (data as NewsRow[]).map(mapNewsRow)
}

export async function getPromotions(limit?: number): Promise<NewsItem[]> {
  const supabase = await createClient()
  let query = supabase
    .from('news')
    .select('*')
    .eq('category', 'promotion')
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching promotions:', error)
    return []
  }
  return (data as NewsRow[]).map(mapNewsRow)
}

// ============ ANALYSES ============

export interface Analysis {
  id: string
  slug: string
  name: string
  nameKz: string
  nameEn: string
  description: string
  descriptionKz: string
  descriptionEn: string
  categoryId: string
  price: number
  collectionPrice: number
  deadline: string
  deadlineKz: string
  deadlineEn: string
  biomaterial: string
  biomaterialKz: string
  biomaterialEn: string
  preparation: string
  preparationKz: string
  preparationEn: string
  createdAt?: string
}

export interface AnalysisInsert {
  slug: string
  name: string
  nameKz: string
  nameEn: string
  description?: string
  descriptionKz?: string
  descriptionEn?: string
  categoryId: string
  price?: number
  collectionPrice?: number
  deadline?: string
  deadlineKz?: string
  deadlineEn?: string
  biomaterial?: string
  biomaterialKz?: string
  biomaterialEn?: string
  preparation?: string
  preparationKz?: string
  preparationEn?: string
}

export type AnalysisUpdate = Partial<AnalysisInsert>

interface AnalysisRow {
  id: string
  slug: string
  name: string
  name_kz: string
  name_en: string
  description: string
  description_kz: string
  description_en: string
  category_id: string
  price: number
  collection_price: number
  deadline: string
  deadline_kz: string
  deadline_en: string
  biomaterial: string
  biomaterial_kz: string
  biomaterial_en: string
  preparation: string
  preparation_kz: string
  preparation_en: string
  created_at: string
}

function mapAnalysisRow(row: AnalysisRow): Analysis {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    nameKz: row.name_kz,
    nameEn: row.name_en,
    description: row.description,
    descriptionKz: row.description_kz,
    descriptionEn: row.description_en,
    categoryId: row.category_id,
    price: row.price,
    collectionPrice: row.collection_price,
    deadline: row.deadline,
    deadlineKz: row.deadline_kz,
    deadlineEn: row.deadline_en,
    biomaterial: row.biomaterial,
    biomaterialKz: row.biomaterial_kz,
    biomaterialEn: row.biomaterial_en,
    preparation: row.preparation,
    preparationKz: row.preparation_kz,
    preparationEn: row.preparation_en,
    createdAt: row.created_at,
  }
}

function analysisToDb(a: AnalysisInsert) {
  return {
    slug: a.slug,
    name: a.name,
    name_kz: a.nameKz,
    name_en: a.nameEn,
    description: a.description || '',
    description_kz: a.descriptionKz || '',
    description_en: a.descriptionEn || '',
    category_id: a.categoryId,
    price: a.price || 0,
    collection_price: a.collectionPrice || 0,
    deadline: a.deadline || '',
    deadline_kz: a.deadlineKz || '',
    deadline_en: a.deadlineEn || '',
    biomaterial: a.biomaterial || '',
    biomaterial_kz: a.biomaterialKz || '',
    biomaterial_en: a.biomaterialEn || '',
    preparation: a.preparation || '',
    preparation_kz: a.preparationKz || '',
    preparation_en: a.preparationEn || '',
  }
}

export async function getAnalyses(): Promise<Analysis[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching analyses:', error)
    return []
  }
  return (data as AnalysisRow[]).map(mapAnalysisRow)
}

export async function getAnalysisById(id: string): Promise<Analysis | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching analysis by id:', error)
    return null
  }
  return mapAnalysisRow(data as AnalysisRow)
}

export async function getAnalysisBySlug(slug: string): Promise<Analysis | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching analysis by slug:', error)
    return null
  }
  return mapAnalysisRow(data as AnalysisRow)
}

export async function getAnalysesByCategory(categoryId: string): Promise<Analysis[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('analyses')
    .select('*')
    .eq('category_id', categoryId)
    .order('name')

  if (error) {
    console.error('Error fetching analyses by category:', error)
    return []
  }
  return (data as AnalysisRow[]).map(mapAnalysisRow)
}

export async function createAnalysis(analysis: AnalysisInsert): Promise<Analysis | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('analyses')
    .insert(analysisToDb(analysis) as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating analysis:', error)
    return null
  }
  return mapAnalysisRow(data as AnalysisRow)
}

export async function updateAnalysis(id: string, updates: AnalysisUpdate): Promise<Analysis | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {}
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.nameKz !== undefined) dbUpdates.name_kz = updates.nameKz
  if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.descriptionKz !== undefined) dbUpdates.description_kz = updates.descriptionKz
  if (updates.descriptionEn !== undefined) dbUpdates.description_en = updates.descriptionEn
  if (updates.categoryId !== undefined) dbUpdates.category_id = updates.categoryId
  if (updates.price !== undefined) dbUpdates.price = updates.price
  if (updates.collectionPrice !== undefined) dbUpdates.collection_price = updates.collectionPrice
  if (updates.deadline !== undefined) dbUpdates.deadline = updates.deadline
  if (updates.deadlineKz !== undefined) dbUpdates.deadline_kz = updates.deadlineKz
  if (updates.deadlineEn !== undefined) dbUpdates.deadline_en = updates.deadlineEn
  if (updates.biomaterial !== undefined) dbUpdates.biomaterial = updates.biomaterial
  if (updates.biomaterialKz !== undefined) dbUpdates.biomaterial_kz = updates.biomaterialKz
  if (updates.biomaterialEn !== undefined) dbUpdates.biomaterial_en = updates.biomaterialEn
  if (updates.preparation !== undefined) dbUpdates.preparation = updates.preparation
  if (updates.preparationKz !== undefined) dbUpdates.preparation_kz = updates.preparationKz
  if (updates.preparationEn !== undefined) dbUpdates.preparation_en = updates.preparationEn

  const { data, error } = await supabase
    .from('analyses')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating analysis:', error)
    return null
  }
  return mapAnalysisRow(data as AnalysisRow)
}

export async function deleteAnalysis(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('analyses')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting analysis:', error)
    return false
  }
  return true
}

// ============ CATEGORIES ============

export interface Category {
  id: string
  name: string
  nameKz: string
  nameEn: string
  slug: string
  createdAt?: string
}

export interface CategoryInsert {
  name: string
  nameKz: string
  nameEn: string
  slug: string
}

export type CategoryUpdate = Partial<CategoryInsert>

interface CategoryRow {
  id: string
  name: string
  name_kz: string
  name_en: string
  slug: string
  created_at: string
}

function mapCategoryRow(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    nameKz: row.name_kz,
    nameEn: row.name_en,
    slug: row.slug,
    createdAt: row.created_at,
  }
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }
  return (data as CategoryRow[]).map(mapCategoryRow)
}

export async function getCategoryById(id: string): Promise<Category | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching category by id:', error)
    return null
  }
  return mapCategoryRow(data as CategoryRow)
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching category by slug:', error)
    return null
  }
  return mapCategoryRow(data as CategoryRow)
}

export async function createCategory(category: CategoryInsert): Promise<Category | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('categories')
    .insert({
      name: category.name,
      name_kz: category.nameKz,
      name_en: category.nameEn,
      slug: category.slug,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating category:', error)
    return null
  }
  return mapCategoryRow(data as CategoryRow)
}

export async function updateCategory(id: string, updates: CategoryUpdate): Promise<Category | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.nameKz !== undefined) dbUpdates.name_kz = updates.nameKz
  if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn
  if (updates.slug !== undefined) dbUpdates.slug = updates.slug

  const { data, error } = await supabase
    .from('categories')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating category:', error)
    return null
  }
  return mapCategoryRow(data as CategoryRow)
}

export async function deleteCategory(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting category:', error)
    return false
  }
  return true
}

// ============ SUBMISSIONS ============

export interface Submission {
  id: string
  type: 'contact' | 'booking'
  firstName: string
  lastName?: string
  email?: string
  phone: string
  message?: string
  rating?: number
  analysisId?: string
  analysisName?: string
  preferredDate?: string
  createdAt: string
}

export interface SubmissionInsert {
  type: 'contact' | 'booking'
  firstName: string
  lastName?: string
  email?: string
  phone: string
  message?: string
  rating?: number
  analysisId?: string
  analysisName?: string
  preferredDate?: string
}

interface SubmissionRow {
  id: string
  type: 'contact' | 'booking'
  first_name: string
  last_name: string | null
  email: string | null
  phone: string
  message: string | null
  rating: number | null
  analysis_id: string | null
  analysis_name: string | null
  preferred_date: string | null
  created_at: string
}

function mapSubmissionRow(row: SubmissionRow): Submission {
  return {
    id: row.id,
    type: row.type,
    firstName: row.first_name,
    lastName: row.last_name || undefined,
    email: row.email || undefined,
    phone: row.phone,
    message: row.message || undefined,
    rating: row.rating || undefined,
    analysisId: row.analysis_id || undefined,
    analysisName: row.analysis_name || undefined,
    preferredDate: row.preferred_date || undefined,
    createdAt: row.created_at,
  }
}

export async function getSubmissions(): Promise<Submission[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching submissions:', error)
    return []
  }
  return (data as SubmissionRow[]).map(mapSubmissionRow)
}

export async function getSubmissionById(id: string): Promise<Submission | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching submission by id:', error)
    return null
  }
  return mapSubmissionRow(data as SubmissionRow)
}

export async function createSubmission(submission: SubmissionInsert): Promise<Submission | null> {
  // Use admin client to bypass RLS issues
  const supabase = createAdminClient()

  const insertData = {
    type: submission.type,
    first_name: submission.firstName,
    last_name: submission.lastName || null,
    email: submission.email || null,
    phone: submission.phone,
    message: submission.message || null,
    rating: submission.rating || null,
    analysis_id: submission.analysisId || null,
    analysis_name: submission.analysisName || null,
    preferred_date: submission.preferredDate || null,
  }

  console.log('Creating submission with data:', JSON.stringify(insertData, null, 2))

  const { data, error } = await supabase
    .from('submissions')
    .insert(insertData as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating submission:', error.message, error.details, error.hint, error.code)
    return null
  }
  return mapSubmissionRow(data as SubmissionRow)
}

export async function deleteSubmission(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('submissions')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting submission:', error)
    return false
  }
  return true
}

// ============ DOCTOR REGISTRATIONS ============

export interface DoctorRegistration {
  id: string
  fullName: string
  phone: string
  workplace: string
  profession: string
  createdAt: string
}

export interface DoctorRegistrationInsert {
  fullName: string
  phone: string
  workplace: string
  profession: string
}

interface DoctorRegistrationRow {
  id: string
  full_name: string
  phone: string
  workplace: string
  profession: string
  created_at: string
}

function mapDoctorRegistrationRow(row: DoctorRegistrationRow): DoctorRegistration {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    workplace: row.workplace,
    profession: row.profession,
    createdAt: row.created_at,
  }
}

export async function getDoctorRegistrations(): Promise<DoctorRegistration[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('doctor_registrations')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching doctor registrations:', error)
    return []
  }
  return (data as DoctorRegistrationRow[]).map(mapDoctorRegistrationRow)
}

export async function createDoctorRegistration(reg: DoctorRegistrationInsert): Promise<DoctorRegistration | null> {
  const supabase = createAdminClient()

  const { data, error } = await supabase
    .from('doctor_registrations')
    .insert({
      full_name: reg.fullName,
      phone: reg.phone,
      workplace: reg.workplace,
      profession: reg.profession,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating doctor registration:', error)
    return null
  }
  return mapDoctorRegistrationRow(data as DoctorRegistrationRow)
}

export async function deleteDoctorRegistration(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('doctor_registrations')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting doctor registration:', error)
    return false
  }
  return true
}

// ============ HOMEPAGE SERVICES ============

export interface HomepageService {
  id: string
  title: string
  titleKz: string
  titleEn: string
  description: string
  descriptionKz: string
  descriptionEn: string
  icon: string
  order: number
  createdAt?: string
}

export interface HomepageServiceInsert {
  title: string
  titleKz: string
  titleEn: string
  description: string
  descriptionKz: string
  descriptionEn: string
  icon: string
  order?: number
}

export type HomepageServiceUpdate = Partial<HomepageServiceInsert>

interface HomepageServiceRow {
  id: string
  title: string
  title_kz: string
  title_en: string
  description: string
  description_kz: string
  description_en: string
  icon: string
  order: number
  created_at: string
}

function mapHomepageServiceRow(row: HomepageServiceRow): HomepageService {
  return {
    id: row.id,
    title: row.title,
    titleKz: row.title_kz,
    titleEn: row.title_en,
    description: row.description,
    descriptionKz: row.description_kz,
    descriptionEn: row.description_en,
    icon: row.icon,
    order: row.order,
    createdAt: row.created_at,
  }
}

export async function getHomepageServices(): Promise<HomepageService[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_services')
    .select('*')
    .order('order')

  if (error) {
    console.error('Error fetching homepage services:', error)
    return []
  }
  return (data as HomepageServiceRow[]).map(mapHomepageServiceRow)
}

export async function getHomepageServiceById(id: string): Promise<HomepageService | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_services')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching homepage service by id:', error)
    return null
  }
  return mapHomepageServiceRow(data as HomepageServiceRow)
}

export async function createHomepageService(service: HomepageServiceInsert): Promise<HomepageService | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('homepage_services')
    .insert({
      title: service.title,
      title_kz: service.titleKz,
      title_en: service.titleEn,
      description: service.description,
      description_kz: service.descriptionKz,
      description_en: service.descriptionEn,
      icon: service.icon,
      order: service.order || 0,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating homepage service:', error)
    return null
  }
  return mapHomepageServiceRow(data as HomepageServiceRow)
}

export async function updateHomepageService(id: string, updates: HomepageServiceUpdate): Promise<HomepageService | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {}
  if (updates.title !== undefined) dbUpdates.title = updates.title
  if (updates.titleKz !== undefined) dbUpdates.title_kz = updates.titleKz
  if (updates.titleEn !== undefined) dbUpdates.title_en = updates.titleEn
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.descriptionKz !== undefined) dbUpdates.description_kz = updates.descriptionKz
  if (updates.descriptionEn !== undefined) dbUpdates.description_en = updates.descriptionEn
  if (updates.icon !== undefined) dbUpdates.icon = updates.icon
  if (updates.order !== undefined) dbUpdates.order = updates.order

  const { data, error } = await supabase
    .from('homepage_services')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating homepage service:', error)
    return null
  }
  return mapHomepageServiceRow(data as HomepageServiceRow)
}

export async function deleteHomepageService(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('homepage_services')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting homepage service:', error)
    return false
  }
  return true
}

// ============ REVIEWS ============

export interface Review {
  id: string
  name: string
  nameKz: string
  nameEn: string
  text: string
  textKz: string
  textEn: string
  rating: number
  date: string
  photo?: string
  showOnHomepage: boolean
  order: number
  createdAt?: string
}

export interface ReviewInsert {
  name: string
  nameKz: string
  nameEn: string
  text: string
  textKz: string
  textEn: string
  rating: number
  date?: string
  photo?: string
  showOnHomepage?: boolean
  order?: number
}

export type ReviewUpdate = Partial<ReviewInsert>

interface ReviewRow {
  id: string
  name: string
  name_kz: string
  name_en: string
  text: string
  text_kz: string
  text_en: string
  rating: number
  date: string
  photo: string | null
  show_on_homepage: boolean
  order: number
  created_at: string
}

function mapReviewRow(row: ReviewRow): Review {
  return {
    id: row.id,
    name: row.name,
    nameKz: row.name_kz,
    nameEn: row.name_en,
    text: row.text,
    textKz: row.text_kz,
    textEn: row.text_en,
    rating: row.rating,
    date: row.date,
    photo: row.photo || undefined,
    showOnHomepage: row.show_on_homepage,
    order: row.order,
    createdAt: row.created_at,
  }
}

export async function getReviews(): Promise<Review[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('order')

  if (error) {
    console.error('Error fetching reviews:', error)
    return []
  }
  return (data as ReviewRow[]).map(mapReviewRow)
}

export async function getHomepageReviews(): Promise<Review[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('show_on_homepage', true)
    .order('order')

  if (error) {
    console.error('Error fetching homepage reviews:', error)
    return []
  }
  return (data as ReviewRow[]).map(mapReviewRow)
}

export async function getReviewById(id: string): Promise<Review | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching review by id:', error)
    return null
  }
  return mapReviewRow(data as ReviewRow)
}

export async function createReview(review: ReviewInsert): Promise<Review | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('reviews')
    .insert({
      name: review.name,
      name_kz: review.nameKz,
      name_en: review.nameEn,
      text: review.text,
      text_kz: review.textKz,
      text_en: review.textEn,
      rating: review.rating,
      date: review.date || new Date().toISOString().split('T')[0],
      photo: review.photo || null,
      show_on_homepage: review.showOnHomepage ?? false,
      order: review.order || 0,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating review:', error)
    return null
  }
  return mapReviewRow(data as ReviewRow)
}

export async function updateReview(id: string, updates: ReviewUpdate): Promise<Review | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.nameKz !== undefined) dbUpdates.name_kz = updates.nameKz
  if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn
  if (updates.text !== undefined) dbUpdates.text = updates.text
  if (updates.textKz !== undefined) dbUpdates.text_kz = updates.textKz
  if (updates.textEn !== undefined) dbUpdates.text_en = updates.textEn
  if (updates.rating !== undefined) dbUpdates.rating = updates.rating
  if (updates.date !== undefined) dbUpdates.date = updates.date
  if (updates.photo !== undefined) dbUpdates.photo = updates.photo || null
  if (updates.showOnHomepage !== undefined) dbUpdates.show_on_homepage = updates.showOnHomepage
  if (updates.order !== undefined) dbUpdates.order = updates.order

  const { data, error } = await supabase
    .from('reviews')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating review:', error)
    return null
  }
  return mapReviewRow(data as ReviewRow)
}

export async function deleteReview(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting review:', error)
    return false
  }
  return true
}

// ============ HOMEPAGE CATEGORIES ============

export interface HomepageCategory {
  id: string
  name: string
  nameKz: string
  nameEn: string
  description: string
  descriptionKz: string
  descriptionEn: string
  description2: string
  description2Kz: string
  description2En: string
  tags: string[]
  tagsKz: string[]
  tagsEn: string[]
  order: number
  featured: boolean
  createdAt?: string
}

export interface HomepageCategoryInsert {
  name: string
  nameKz: string
  nameEn: string
  description?: string
  descriptionKz?: string
  descriptionEn?: string
  description2?: string
  description2Kz?: string
  description2En?: string
  tags?: string[]
  tagsKz?: string[]
  tagsEn?: string[]
  order?: number
  featured?: boolean
}

export type HomepageCategoryUpdate = Partial<HomepageCategoryInsert>

interface HomepageCategoryRow {
  id: string
  name: string
  name_kz: string
  name_en: string
  description: string
  description_kz: string
  description_en: string
  description2: string
  description2_kz: string
  description2_en: string
  tags: string[]
  tags_kz: string[]
  tags_en: string[]
  order: number
  featured: boolean
  created_at: string
}

function mapHomepageCategoryRow(row: HomepageCategoryRow): HomepageCategory {
  return {
    id: row.id,
    name: row.name,
    nameKz: row.name_kz,
    nameEn: row.name_en,
    description: row.description,
    descriptionKz: row.description_kz,
    descriptionEn: row.description_en,
    description2: row.description2,
    description2Kz: row.description2_kz,
    description2En: row.description2_en,
    tags: row.tags,
    tagsKz: row.tags_kz,
    tagsEn: row.tags_en,
    order: row.order,
    featured: row.featured,
    createdAt: row.created_at,
  }
}

export async function getHomepageCategories(): Promise<HomepageCategory[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_categories')
    .select('*')
    .order('order')

  if (error) {
    console.error('Error fetching homepage categories:', error)
    return []
  }
  return (data as HomepageCategoryRow[]).map(mapHomepageCategoryRow)
}

export async function getHomepageCategoryById(id: string): Promise<HomepageCategory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_categories')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching homepage category by id:', error)
    return null
  }
  return mapHomepageCategoryRow(data as HomepageCategoryRow)
}

export async function getFeaturedHomepageCategory(): Promise<HomepageCategory | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('homepage_categories')
    .select('*')
    .eq('featured', true)
    .single()

  if (error) {
    console.error('Error fetching featured homepage category:', error)
    return null
  }
  return mapHomepageCategoryRow(data as HomepageCategoryRow)
}

export async function createHomepageCategory(category: HomepageCategoryInsert): Promise<HomepageCategory | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('homepage_categories')
    .insert({
      name: category.name,
      name_kz: category.nameKz,
      name_en: category.nameEn,
      description: category.description || '',
      description_kz: category.descriptionKz || '',
      description_en: category.descriptionEn || '',
      description2: category.description2 || '',
      description2_kz: category.description2Kz || '',
      description2_en: category.description2En || '',
      tags: category.tags || [],
      tags_kz: category.tagsKz || [],
      tags_en: category.tagsEn || [],
      order: category.order || 0,
      featured: category.featured || false,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating homepage category:', error)
    return null
  }
  return mapHomepageCategoryRow(data as HomepageCategoryRow)
}

export async function updateHomepageCategory(id: string, updates: HomepageCategoryUpdate): Promise<HomepageCategory | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {}
  if (updates.name !== undefined) dbUpdates.name = updates.name
  if (updates.nameKz !== undefined) dbUpdates.name_kz = updates.nameKz
  if (updates.nameEn !== undefined) dbUpdates.name_en = updates.nameEn
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.descriptionKz !== undefined) dbUpdates.description_kz = updates.descriptionKz
  if (updates.descriptionEn !== undefined) dbUpdates.description_en = updates.descriptionEn
  if (updates.description2 !== undefined) dbUpdates.description2 = updates.description2
  if (updates.description2Kz !== undefined) dbUpdates.description2_kz = updates.description2Kz
  if (updates.description2En !== undefined) dbUpdates.description2_en = updates.description2En
  if (updates.tags !== undefined) dbUpdates.tags = updates.tags
  if (updates.tagsKz !== undefined) dbUpdates.tags_kz = updates.tagsKz
  if (updates.tagsEn !== undefined) dbUpdates.tags_en = updates.tagsEn
  if (updates.order !== undefined) dbUpdates.order = updates.order
  if (updates.featured !== undefined) dbUpdates.featured = updates.featured

  const { data, error } = await supabase
    .from('homepage_categories')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating homepage category:', error)
    return null
  }
  return mapHomepageCategoryRow(data as HomepageCategoryRow)
}

export async function deleteHomepageCategory(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('homepage_categories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting homepage category:', error)
    return false
  }
  return true
}

// ============ PAGES ============

export interface PageSection {
  title: string
  content: string
}

export interface Page {
  id: string
  title: string
  titleKz: string
  titleEn: string
  lastUpdated: string
  lastUpdatedKz: string
  lastUpdatedEn: string
  sections: PageSection[]
  sectionsKz: PageSection[]
  sectionsEn: PageSection[]
  createdAt?: string
  updatedAt?: string
}

export interface PageUpdate {
  title?: string
  titleKz?: string
  titleEn?: string
  lastUpdated?: string
  lastUpdatedKz?: string
  lastUpdatedEn?: string
  sections?: PageSection[]
  sectionsKz?: PageSection[]
  sectionsEn?: PageSection[]
}

interface PageRow {
  id: string
  title: string
  title_kz: string
  title_en: string
  last_updated: string
  last_updated_kz: string
  last_updated_en: string
  sections: PageSection[]
  sections_kz: PageSection[]
  sections_en: PageSection[]
  created_at: string
  updated_at: string
}

function mapPageRow(row: PageRow): Page {
  return {
    id: row.id,
    title: row.title,
    titleKz: row.title_kz,
    titleEn: row.title_en,
    lastUpdated: row.last_updated,
    lastUpdatedKz: row.last_updated_kz,
    lastUpdatedEn: row.last_updated_en,
    sections: row.sections,
    sectionsKz: row.sections_kz,
    sectionsEn: row.sections_en,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getPageById(id: string): Promise<Page | null> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching page by id:', error)
    return null
  }
  return mapPageRow(data as PageRow)
}

export async function updatePage(id: string, updates: PageUpdate): Promise<Page | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }
  if (updates.title !== undefined) dbUpdates.title = updates.title
  if (updates.titleKz !== undefined) dbUpdates.title_kz = updates.titleKz
  if (updates.titleEn !== undefined) dbUpdates.title_en = updates.titleEn
  if (updates.lastUpdated !== undefined) dbUpdates.last_updated = updates.lastUpdated
  if (updates.lastUpdatedKz !== undefined) dbUpdates.last_updated_kz = updates.lastUpdatedKz
  if (updates.lastUpdatedEn !== undefined) dbUpdates.last_updated_en = updates.lastUpdatedEn
  if (updates.sections !== undefined) dbUpdates.sections = updates.sections
  if (updates.sectionsKz !== undefined) dbUpdates.sections_kz = updates.sectionsKz
  if (updates.sectionsEn !== undefined) dbUpdates.sections_en = updates.sectionsEn

  const { data, error } = await supabase
    .from('pages')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating page:', error)
    return null
  }
  return mapPageRow(data as PageRow)
}

// ============ STATS ============

export async function getStats() {
  const supabase = await createClient()

  const [newsResult, analysesResult, submissionsResult, servicesResult, reviewsResult] = await Promise.all([
    supabase.from('news').select('category'),
    supabase.from('analyses').select('id', { count: 'exact', head: true }),
    supabase.from('submissions').select('*').order('created_at', { ascending: false }).limit(5),
    supabase.from('homepage_services').select('id', { count: 'exact', head: true }),
    supabase.from('reviews').select('id', { count: 'exact', head: true }),
  ])

  const newsData = (newsResult.data || []) as { category: string }[]
  const newsCount = newsData.filter(n => n.category === 'news').length
  const promotionsCount = newsData.filter(n => n.category === 'promotion').length

  return {
    newsCount,
    promotionsCount,
    analysesCount: analysesResult.count || 0,
    submissionsCount: (submissionsResult.data || []).length,
    homepageServicesCount: servicesResult.count || 0,
    reviewsCount: reviewsResult.count || 0,
    recentSubmissions: ((submissionsResult.data || []) as SubmissionRow[]).map(mapSubmissionRow),
  }
}

// ============ DOCUMENTS ============

export interface Document {
  id: string
  title: string
  titleKz: string | null
  titleEn: string | null
  description: string | null
  descriptionKz: string | null
  descriptionEn: string | null
  fileUrl: string
  fileName: string | null
  fileType: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface DocumentCreate {
  title: string
  titleKz?: string
  titleEn?: string
  description?: string
  descriptionKz?: string
  descriptionEn?: string
  fileUrl: string
  fileName?: string
  fileType: string
  order?: number
  isActive?: boolean
}

export interface DocumentUpdate {
  title?: string
  titleKz?: string
  titleEn?: string
  description?: string
  descriptionKz?: string
  descriptionEn?: string
  fileUrl?: string
  fileName?: string
  fileType?: string
  order?: number
  isActive?: boolean
}

interface DocumentRow {
  id: string
  title: string
  title_kz: string | null
  title_en: string | null
  description: string | null
  description_kz: string | null
  description_en: string | null
  file_url: string
  file_name: string | null
  file_type: string
  order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

function mapDocumentRow(row: DocumentRow): Document {
  return {
    id: row.id,
    title: row.title,
    titleKz: row.title_kz,
    titleEn: row.title_en,
    description: row.description,
    descriptionKz: row.description_kz,
    descriptionEn: row.description_en,
    fileUrl: row.file_url,
    fileName: row.file_name,
    fileType: row.file_type,
    order: row.order,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export async function getDocuments(fileType?: string): Promise<Document[]> {
  const supabase = createPublicClient()
  let query = supabase
    .from('documents')
    .select('*')
    .eq('is_active', true)
    .order('order')

  if (fileType) {
    query = query.eq('file_type', fileType)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching documents:', error)
    return []
  }
  return (data as DocumentRow[]).map(mapDocumentRow)
}

export async function getAllDocuments(): Promise<Document[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('order')

  if (error) {
    console.error('Error fetching all documents:', error)
    return []
  }
  return (data as DocumentRow[]).map(mapDocumentRow)
}

export async function getDocumentById(id: string): Promise<Document | null> {
  const supabase = createPublicClient()
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching document by id:', error)
    return null
  }
  return mapDocumentRow(data as DocumentRow)
}

export async function createDocument(doc: DocumentCreate): Promise<Document | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('documents')
    .insert({
      title: doc.title,
      title_kz: doc.titleKz || null,
      title_en: doc.titleEn || null,
      description: doc.description || null,
      description_kz: doc.descriptionKz || null,
      description_en: doc.descriptionEn || null,
      file_url: doc.fileUrl,
      file_name: doc.fileName || null,
      file_type: doc.fileType,
      order: doc.order ?? 0,
      is_active: doc.isActive ?? true,
    } as never)
    .select()
    .single()

  if (error) {
    console.error('Error creating document:', error)
    return null
  }
  return mapDocumentRow(data as DocumentRow)
}

export async function updateDocument(id: string, updates: DocumentUpdate): Promise<Document | null> {
  const supabase = createAdminClient()
  const dbUpdates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (updates.title !== undefined) dbUpdates.title = updates.title
  if (updates.titleKz !== undefined) dbUpdates.title_kz = updates.titleKz
  if (updates.titleEn !== undefined) dbUpdates.title_en = updates.titleEn
  if (updates.description !== undefined) dbUpdates.description = updates.description
  if (updates.descriptionKz !== undefined) dbUpdates.description_kz = updates.descriptionKz
  if (updates.descriptionEn !== undefined) dbUpdates.description_en = updates.descriptionEn
  if (updates.fileUrl !== undefined) dbUpdates.file_url = updates.fileUrl
  if (updates.fileName !== undefined) dbUpdates.file_name = updates.fileName
  if (updates.fileType !== undefined) dbUpdates.file_type = updates.fileType
  if (updates.order !== undefined) dbUpdates.order = updates.order
  if (updates.isActive !== undefined) dbUpdates.is_active = updates.isActive

  const { data, error } = await supabase
    .from('documents')
    .update(dbUpdates as never)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating document:', error)
    return null
  }
  return mapDocumentRow(data as DocumentRow)
}

export async function deleteDocument(id: string): Promise<boolean> {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('documents')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting document:', error)
    return false
  }
  return true
}

export async function uploadDocumentFile(file: File): Promise<string | null> {
  const supabase = createAdminClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { error } = await supabase.storage
    .from('documents')
    .upload(fileName, file)

  if (error) {
    console.error('Error uploading document file:', error)
    return null
  }

  const { data: urlData } = supabase.storage
    .from('documents')
    .getPublicUrl(fileName)

  return urlData.publicUrl
}

export async function deleteDocumentFile(fileUrl: string): Promise<boolean> {
  const supabase = createAdminClient()

  // Extract file name from URL
  const urlParts = fileUrl.split('/')
  const fileName = urlParts[urlParts.length - 1]

  const { error } = await supabase.storage
    .from('documents')
    .remove([fileName])

  if (error) {
    console.error('Error deleting document file:', error)
    return false
  }
  return true
}
