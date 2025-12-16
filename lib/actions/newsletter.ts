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
      from: "EMCA Tanzania <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to EMCA Tanzania! 🌿 Your Environmental Journey Begins",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #1A724F 0%, #06231D 100%); padding: 40px 30px; text-align: center;">
            <h1 style="color: #F0E68C; margin: 0; font-size: 28px; font-weight: normal;">Welcome to EMCA 🌿</h1>
            <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">Environmental Management & Community Awareness</p>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 18px; color: #1A724F; margin: 0 0 20px 0;"><strong>Dear Friend of the Environment,</strong></p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.7; margin: 0 0 25px 0;">
              Thank you for subscribing to EMCA. We're honored to welcome you into a community that believes in a cleaner, safer, and more sustainable world for everyone.
            </p>
            
            <p style="font-size: 16px; color: #333; line-height: 1.7; margin: 0 0 30px 0;">
              This guidebook is designed to give you a clear understanding of who we are, what we stand for, and how you can be part of meaningful environmental change.
            </p>

            <!-- Who We Are -->
            <div style="background: #f0f9f5; border-radius: 12px; padding: 25px; margin: 0 0 25px 0;">
              <h2 style="color: #1A724F; margin: 0 0 15px 0; font-size: 20px;">🌱 Who We Are</h2>
              <p style="font-size: 15px; color: #444; line-height: 1.7; margin: 0;">
                EMCA is a youth-led Non-Governmental Organisation committed to environmental protection, community empowerment, and sustainable development. We work to ensure that every individual—especially women, youth, and vulnerable groups—has access to the knowledge and tools to protect the environment.
              </p>
            </div>

            <!-- Our Mission -->
            <div style="background: #fff9e6; border-radius: 12px; padding: 25px; margin: 0 0 25px 0;">
              <h2 style="color: #1A724F; margin: 0 0 15px 0; font-size: 20px;">🎯 Our Mission</h2>
              <p style="font-size: 15px; color: #444; line-height: 1.7; margin: 0;">
                To empower communities as champions of environmental stewardship by promoting sustainable practices, innovation, and action-driven solutions that protect both people and the planet.
              </p>
            </div>

            <!-- What You'll Gain -->
            <h2 style="color: #1A724F; margin: 30px 0 20px 0; font-size: 20px;">📬 What You'll Gain as a Subscriber</h2>
            <p style="font-size: 15px; color: #444; line-height: 1.6; margin: 0 0 15px 0;">By joining EMCA, you will receive:</p>
            <ul style="color: #444; line-height: 2; font-size: 15px; margin: 0 0 30px 0; padding-left: 20px;">
              <li>Updates on our ongoing and upcoming environmental projects</li>
              <li>Educational content on sustainability, climate action, and waste management</li>
              <li>Invitations to participate in clean-ups, tree-planting, workshops, and community initiatives</li>
              <li>Stories from the field showcasing real impact and inspiring change</li>
            </ul>

            <!-- Core Values -->
            <div style="background: linear-gradient(135deg, #1A724F 0%, #2d8a65 100%); border-radius: 12px; padding: 25px; margin: 0 0 30px 0; text-align: center;">
              <h2 style="color: #F0E68C; margin: 0 0 15px 0; font-size: 20px;">💚 Our Core Values</h2>
              <p style="color: #ffffff; font-size: 15px; line-height: 1.8; margin: 0;">
                <strong>Sustainability</strong> • <strong>Empowerment</strong> • <strong>Equity</strong> • <strong>Innovation</strong> • <strong>Collaboration</strong> • <strong>Intergenerational Responsibility</strong>
              </p>
              <p style="color: #ffffff; font-size: 14px; line-height: 1.6; margin: 15px 0 0 0; opacity: 0.9;">
                These values shape everything we do—from educating young girls about menstrual hygiene to empowering youth climate champions and conducting large-scale cleanup drives.
              </p>
            </div>

            <!-- Guidebook Section -->
            <div style="background: #e8f5e9; border-left: 5px solid #1A724F; padding: 20px 25px; margin: 0 0 30px 0; border-radius: 0 12px 12px 0;">
              <h3 style="color: #1A724F; margin: 0 0 10px 0; font-size: 18px;">📘 What's Inside Your Guidebook</h3>
              <ul style="color: #444; line-height: 1.8; font-size: 15px; margin: 0; padding-left: 20px;">
                <li>A brief introduction to EMCA's mission and vision</li>
                <li>An overview of our key projects such as Binti Mazingira, Tuelimishe Mazingira, and Cleanup Drives</li>
                <li>Simple ways you can take part and contribute from wherever you are</li>
              </ul>
            </div>

            <!-- Welcome Again -->
            <div style="text-align: center; padding: 20px 0 30px 0; border-top: 2px solid #e0e0e0;">
              <h2 style="color: #1A724F; margin: 0 0 15px 0; font-size: 22px;">🌍 Welcome Again!</h2>
              <p style="font-size: 15px; color: #444; line-height: 1.7; margin: 0 0 20px 0;">
                Thank you for choosing to stand with us. Your subscription is more than just an email sign-up—it is a step toward creating a future where communities live in harmony with the environment.
              </p>
              <p style="font-size: 15px; color: #444; line-height: 1.7; margin: 0 0 25px 0;">
                If you have any questions or would like to get involved, feel free to reach out anytime.
              </p>
              <p style="font-size: 18px; color: #1A724F; font-weight: bold; margin: 0;">
                Together, let's build a greener tomorrow. 🌱
              </p>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 20px 0;">
              <a href="https://emca.or.tz" 
                 style="background: linear-gradient(135deg, #F0E68C 0%, #B8D96E 100%); 
                        color: #06231D; 
                        padding: 16px 40px; 
                        text-decoration: none; 
                        border-radius: 30px; 
                        font-weight: bold;
                        font-size: 16px;
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(26, 114, 79, 0.3);">
                Visit Our Website
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #06231D; padding: 30px; text-align: center;">
            <p style="color: #F0E68C; font-size: 16px; font-weight: bold; margin: 0 0 5px 0;">EMCA Team</p>
            <p style="color: #ffffff; font-size: 14px; margin: 0 0 15px 0; opacity: 0.8;">
              Environmental Management & Community Awareness
            </p>
            <p style="color: #ffffff; font-size: 13px; margin: 0 0 10px 0; opacity: 0.7;">
              P.O. Box 23, USA River, Arusha, Tanzania
            </p>
            <p style="margin: 0;">
              <a href="mailto:info@emca.or.tz" style="color: #B8D96E; text-decoration: none; font-size: 14px;">
                info@emca.or.tz
              </a>
              <span style="color: #ffffff; opacity: 0.5; margin: 0 10px;">|</span>
              <a href="https://emca.or.tz" style="color: #B8D96E; text-decoration: none; font-size: 14px;">
                emca.or.tz
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
