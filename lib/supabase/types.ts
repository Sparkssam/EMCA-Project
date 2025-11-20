export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          author_id: string
          category: string
          tags: string[]
          featured_image: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt: string
          content: string
          author_id: string
          category: string
          tags?: string[]
          featured_image?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          author_id?: string
          category?: string
          tags?: string[]
          featured_image?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          location: string
          category: string
          status: string
          start_date: string
          end_date: string | null
          participants: number
          impact_metrics: Json
          featured_image: string | null
          gallery: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          location: string
          category: string
          status: string
          start_date: string
          end_date?: string | null
          participants?: number
          impact_metrics?: Json
          featured_image?: string | null
          gallery?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          location?: string
          category?: string
          status?: string
          start_date?: string
          end_date?: string | null
          participants?: number
          impact_metrics?: Json
          featured_image?: string | null
          gallery?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      donations: {
        Row: {
          id: string
          donor_name: string
          donor_email: string
          amount: number
          currency: string
          donation_type: string
          project_id: string | null
          payment_status: string
          payment_method: string
          transaction_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          donor_name: string
          donor_email: string
          amount: number
          currency?: string
          donation_type: string
          project_id?: string | null
          payment_status?: string
          payment_method: string
          transaction_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          donor_name?: string
          donor_email?: string
          amount?: number
          currency?: string
          donation_type?: string
          project_id?: string | null
          payment_status?: string
          payment_method?: string
          transaction_id?: string | null
          created_at?: string
        }
      }
      volunteers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          location: string
          interests: string[]
          skills: string[]
          availability: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          location: string
          interests?: string[]
          skills?: string[]
          availability: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          location?: string
          interests?: string[]
          skills?: string[]
          availability?: string
          status?: string
          created_at?: string
        }
      }
      partnerships: {
        Row: {
          id: string
          organization_name: string
          organization_type: string
          contact_name: string
          contact_email: string
          contact_phone: string | null
          partnership_type: string
          message: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          organization_name: string
          organization_type: string
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          partnership_type: string
          message: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          organization_name?: string
          organization_type?: string
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          partnership_type?: string
          message?: string
          status?: string
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          subscribed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          subscribed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscribed?: boolean
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
      [_ in never]: never
    }
  }
}
