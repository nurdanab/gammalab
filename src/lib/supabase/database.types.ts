export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
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
        Insert: {
          id?: string
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
          category?: 'news' | 'promotion' | 'article'
          published_at?: string
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          title_kz?: string
          title_en?: string
          excerpt?: string
          excerpt_kz?: string
          excerpt_en?: string
          content?: string
          content_kz?: string
          content_en?: string
          image?: string
          category?: 'news' | 'promotion' | 'article'
          published_at?: string
          featured?: boolean
          created_at?: string
        }
      }
      analyses: {
        Row: {
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
        Insert: {
          id?: string
          slug: string
          name: string
          name_kz: string
          name_en: string
          description?: string
          description_kz?: string
          description_en?: string
          category_id: string
          price?: number
          collection_price?: number
          deadline?: string
          deadline_kz?: string
          deadline_en?: string
          biomaterial?: string
          biomaterial_kz?: string
          biomaterial_en?: string
          preparation?: string
          preparation_kz?: string
          preparation_en?: string
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          name_kz?: string
          name_en?: string
          description?: string
          description_kz?: string
          description_en?: string
          category_id?: string
          price?: number
          collection_price?: number
          deadline?: string
          deadline_kz?: string
          deadline_en?: string
          biomaterial?: string
          biomaterial_kz?: string
          biomaterial_en?: string
          preparation?: string
          preparation_kz?: string
          preparation_en?: string
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          name_kz: string
          name_en: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          name_kz: string
          name_en: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_kz?: string
          name_en?: string
          slug?: string
          created_at?: string
        }
      }
      submissions: {
        Row: {
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
        Insert: {
          id?: string
          type: 'contact' | 'booking'
          first_name: string
          last_name?: string | null
          email?: string | null
          phone: string
          message?: string | null
          rating?: number | null
          analysis_id?: string | null
          analysis_name?: string | null
          preferred_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'contact' | 'booking'
          first_name?: string
          last_name?: string | null
          email?: string | null
          phone?: string
          message?: string | null
          rating?: number | null
          analysis_id?: string | null
          analysis_name?: string | null
          preferred_date?: string | null
          created_at?: string
        }
      }
      homepage_services: {
        Row: {
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
        Insert: {
          id?: string
          title: string
          title_kz: string
          title_en: string
          description: string
          description_kz: string
          description_en: string
          icon: string
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_kz?: string
          title_en?: string
          description?: string
          description_kz?: string
          description_en?: string
          icon?: string
          order?: number
          created_at?: string
        }
      }
      reviews: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          name_kz: string
          name_en: string
          text: string
          text_kz: string
          text_en: string
          rating: number
          date?: string
          photo?: string | null
          show_on_homepage?: boolean
          order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_kz?: string
          name_en?: string
          text?: string
          text_kz?: string
          text_en?: string
          rating?: number
          date?: string
          photo?: string | null
          show_on_homepage?: boolean
          order?: number
          created_at?: string
        }
      }
      doctor_registrations: {
        Row: {
          id: string
          full_name: string
          phone: string
          workplace: string
          profession: string
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          phone: string
          workplace: string
          profession: string
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          phone?: string
          workplace?: string
          profession?: string
          created_at?: string
        }
      }
      homepage_categories: {
        Row: {
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
        Insert: {
          id?: string
          name: string
          name_kz: string
          name_en: string
          description?: string
          description_kz?: string
          description_en?: string
          description2?: string
          description2_kz?: string
          description2_en?: string
          tags?: string[]
          tags_kz?: string[]
          tags_en?: string[]
          order?: number
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_kz?: string
          name_en?: string
          description?: string
          description_kz?: string
          description_en?: string
          description2?: string
          description2_kz?: string
          description2_en?: string
          tags?: string[]
          tags_kz?: string[]
          tags_en?: string[]
          order?: number
          featured?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      news_category: 'news' | 'promotion' | 'article'
      submission_type: 'contact' | 'booking'
    }
  }
}
