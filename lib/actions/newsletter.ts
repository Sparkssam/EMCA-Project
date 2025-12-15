"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Resend } from "resend"
import fs from "fs"
import path from "path"
import { handleActionError } from "@/lib/utils/error-handling"

// Initialize Resend with API key from environment
const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string) {
  try {
    const supabase = await getSupabaseServerClient()

    // Try to insert the email
    const { error } = await supabase.from("newsletter_subscribers").insert({ email })

    // If email already exists (23505 is duplicate key error), still send the welcome email
    if (error && error.code === "23505") {
      console.log(`[Newsletter] Email already subscribed, sending welcome email anyway: ${email}`)
      await sendWelcomeEmailWithPDF(email)
      return { success: true, message: "Thank you! Check your email for the welcome guide." }
    }

    // If different error, throw it
    if (error) {
      throw error
    }

    // New subscription - send welcome email with PDF attachment
    await sendWelcomeEmailWithPDF(email)

    return { success: true, message: "Successfully subscribed! Check your email for a welcome gift." }
  } catch (error) {
    return handleActionError(error)
  }
}

// Email sending function (requires Resend setup)
async function sendWelcomeEmailWithPDF(email: string) {
  try {
    // Read PDF file from public/documents folder
    const pdfPath = path.join(process.cwd(), "public/documents/welcome-guide.pdf")
    const pdfBuffer = fs.readFileSync(pdfPath)
    const pdfBase64 = pdfBuffer.toString("base64")

    // Send email with PDF attachment using Resend
    await resend.emails.send({
      from: "EMCA Tanzania <onboarding@resend.dev>", // Change to your domain after verification
      to: email,
      subject: "Welcome to EMCA Tanzania! 🌿",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #1A724F 0%, #06231D 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: #F0E68C; margin: 0; font-size: 32px;">Welcome to EMCA Tanzania! 🌿</h1>
          </div>
          
          <div style="padding: 40px 20px; background: #ffffff;">
            <p style="font-size: 18px; color: #333;">Thank you for subscribing!</p>
            
            <p style="font-size: 16px; color: #666; line-height: 1.6;">
              We're thrilled to have you join our community of environmental champions. 
              Together, we're working towards a greener, more sustainable Tanzania.
            </p>
            
            <div style="background: #f0f9f5; border-left: 4px solid #1A724F; padding: 20px; margin: 30px 0;">
              <p style="margin: 0; color: #1A724F; font-weight: bold;">📄 Your Welcome Gift</p>
              <p style="margin: 10px 0 0 0; color: #666;">
                We've attached a special guide to help you get started with environmental conservation!
              </p>
            </div>
            
            <h3 style="color: #1A724F; margin-top: 30px;">What's Next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Receive monthly updates on our projects</li>
              <li>Get tips on sustainable living</li>
              <li>Learn about volunteer opportunities</li>
              <li>Stay informed about environmental events</li>
            </ul>
            
            <div style="text-align: center; margin-top: 40px;">
              <a href="https://emca-tanzania.org" 
                 style="background: linear-gradient(135deg, #F0E68C 0%, #B8D96E 100%); 
                        color: #06231D; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold;
                        display: inline-block;">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #999; font-size: 14px;">
            <p style="margin: 0;">
              Environmental Management & Community Awareness (EMCA)<br>
              Dar es Salaam, Tanzania
            </p>
            <p style="margin: 10px 0 0 0;">
              <a href="mailto:info@emca-tanzania.org" style="color: #1A724F; text-decoration: none;">
                info@emca-tanzania.org
              </a>
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: "EMCA-Welcome-Guide.pdf",
          content: pdfBase64,
        },
      ],
    })

    console.log(`[Newsletter] Welcome email with PDF sent to: ${email}`)
    return { success: true }
  } catch (error) {
    console.error("[Newsletter] Email send error:", error)
    // Don't fail the subscription if email fails - user is still subscribed
    return { success: false }
  }
}
