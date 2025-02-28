
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
      locations: {
        Row: {
          id: string
          name: string
          address: string
          suburb: string
          state: string
          time: string
          rakaat: number
          has_womens_area: boolean
          has_wudu_facilities: boolean
          has_parking: boolean
          parking_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          address: string
          suburb: string
          state: string
          time: string
          rakaat: number
          has_womens_area: boolean
          has_wudu_facilities: boolean
          has_parking: boolean
          parking_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          address?: string
          suburb?: string
          state?: string
          time?: string
          rakaat?: number
          has_womens_area?: boolean
          has_wudu_facilities?: boolean
          has_parking?: boolean
          parking_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      submissions: {
        Row: {
          id: string
          mosque_name: string
          address: string
          suburb: string
          state: string
          time: string
          rakaat: number
          has_womens_area: boolean
          has_wudu_facilities: boolean
          has_parking: boolean
          parking_type: string | null
          submitter_name: string
          submitter_email: string
          additional_info: string | null
          status: "pending" | "approved" | "rejected"
          created_at: string
        }
        Insert: {
          id?: string
          mosque_name: string
          address: string
          suburb: string
          state: string
          time: string
          rakaat: number
          has_womens_area: boolean
          has_wudu_facilities: boolean
          has_parking: boolean
          parking_type?: string | null
          submitter_name: string
          submitter_email: string
          additional_info?: string | null
          status?: "pending" | "approved" | "rejected"
          created_at?: string
        }
        Update: {
          id?: string
          mosque_name?: string
          address?: string
          suburb?: string
          state?: string
          time?: string
          rakaat?: number
          has_womens_area?: boolean
          has_wudu_facilities?: boolean
          has_parking?: boolean
          parking_type?: string | null
          submitter_name?: string
          submitter_email?: string
          additional_info?: string | null
          status?: "pending" | "approved" | "rejected"
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
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
