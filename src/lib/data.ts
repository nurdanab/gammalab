// Re-export all types and functions from Supabase queries
// This file maintains backward compatibility with existing imports

export type {
  NewsItem,
  NewsInsert,
  NewsUpdate,
  Analysis,
  AnalysisInsert,
  AnalysisUpdate,
  Category,
  CategoryInsert,
  CategoryUpdate,
  Submission,
  SubmissionInsert,
  HomepageService,
  HomepageServiceInsert,
  HomepageServiceUpdate,
  Review,
  ReviewInsert,
  ReviewUpdate,
  HomepageCategory,
  HomepageCategoryInsert,
  HomepageCategoryUpdate,
} from './supabase/queries'

export {
  // News
  getNews,
  getNewsById,
  getNewsBySlug,
  createNews,
  updateNews,
  deleteNews,
  getFeaturedNews,
  getPromotions,

  // Analyses
  getAnalyses,
  getAnalysisById,
  getAnalysisBySlug,
  getAnalysesByCategory,
  createAnalysis,
  updateAnalysis,
  deleteAnalysis,

  // Categories
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,

  // Submissions
  getSubmissions,
  getSubmissionById,
  createSubmission,
  deleteSubmission,

  // Homepage Services
  getHomepageServices,
  getHomepageServiceById,
  createHomepageService,
  updateHomepageService,
  deleteHomepageService,

  // Reviews
  getReviews,
  getHomepageReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,

  // Homepage Categories
  getHomepageCategories,
  getHomepageCategoryById,
  getFeaturedHomepageCategory,
  createHomepageCategory,
  updateHomepageCategory,
  deleteHomepageCategory,

  // Stats
  getStats,
} from './supabase/queries'

// Alias functions for backward compatibility
export { getFeaturedNews as getFeaturedNewsFromCMS } from './supabase/queries'
export { getPromotions as getFeaturedPromotions } from './supabase/queries'

// Get all news and promotions sorted by date
import { getNews as getNewsFromSupabase } from './supabase/queries'
export async function getAllNewsAndPromotions() {
  return getNewsFromSupabase()
}
