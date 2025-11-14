"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"

export async function loginWithEmail(email: string, password: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("[Auth] Login error:", error)
      return {
        success: false,
        message: error.message || "Invalid email or password",
      }
    }

    if (!data.user) {
      return {
        success: false,
        message: "Authentication failed",
      }
    }

    return {
      success: true,
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    }
  } catch (error) {
    console.error("[Auth] Login error:", error)
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}

export async function logout() {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { error } = await supabase.auth.signOut()

    if (error) {
      return {
        success: false,
        message: error.message,
      }
    }

    return {
      success: true,
      message: "Logged out successfully",
    }
  } catch (error) {
    console.error("[Auth] Logout error:", error)
    return {
      success: false,
      message: "An unexpected error occurred",
    }
  }
}

export async function getCurrentUser() {
  try {
    const supabase = await getSupabaseServerClient()
    
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
      return {
        success: false,
        user: null,
      }
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    }
  } catch (error) {
    console.error("[Auth] Get user error:", error)
    return {
      success: false,
      user: null,
    }
  }
}
