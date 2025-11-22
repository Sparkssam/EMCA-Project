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

    // Get role from user_metadata
    const userRole = data.user.user_metadata?.role || "user"

    return {
      success: true,
      message: "Login successful",
      user: {
        id: data.user.id,
        email: data.user.email,
        role: userRole, // Include role for login redirect logic
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

    // Get role from user_metadata (set during account creation)
    const userRole = user.user_metadata?.role || "user"

    // Debug logging
    console.log("[Auth] User email:", user.email)
    console.log("[Auth] User metadata:", user.user_metadata)
    console.log("[Auth] User role:", userRole)

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: userRole, // This will be "admin" or "volunteer"
        name: user.user_metadata?.name,
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
