import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          created_at: string
          updated_at: string
          published: boolean
          slug: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          created_at?: string
          updated_at?: string
          published?: boolean
          slug: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          created_at?: string
          updated_at?: string
          published?: boolean
          slug?: string
        }
      }
    }
  }
}