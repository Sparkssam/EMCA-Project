# 📧 How to Send PDF via Email on Newsletter Subscription

## 📁 Step 1: Add Your PDF File

1. **Save your PDF** with a descriptive name, like:
   - `emca-welcome-guide.pdf`
   - `environmental-tips.pdf`
   - `volunteer-handbook.pdf`

2. **Place the PDF** in this folder:

   ```
   public/documents/your-pdf-name.pdf
   ```

   Example:

   ```
   public/documents/emca-welcome-guide.pdf
   ```

---

## 🔧 Step 2: Set Up Email Service (Resend)

### Why Resend?

- ✅ **Free**: 3,000 emails/month free
- ✅ **Easy**: Simple API
- ✅ **Reliable**: Great deliverability
- ✅ **PDF attachments**: Built-in support

### Setup Instructions

1. **Create Resend Account**:
   - Go to: <https://resend.com/signup>
   - Sign up with your email
   - Verify your email

2. **Get API Key**:
   - Go to: <https://resend.com/api-keys>
   - Click "Create API Key"
   - Name it: "EMCA Newsletter"
   - Copy the API key (starts with `re_...`)

3. **Add Domain** (Optional but recommended):
   - Go to: <https://resend.com/domains>
   - Add your domain: `emca-tanzania.org`
   - Follow DNS setup instructions
   - Or use Resend's test domain: `onboarding@resend.dev`

4. **Add API Key to .env.local**:

   ```env
   # Add this to your .env.local file
   RESEND_API_KEY=re_your_api_key_here
   ```

---

## 📦 Step 3: Install Resend Package

Run this command in your terminal:

```powershell
npm install resend
```

---

## 💻 Step 4: Update Newsletter Code

I've already prepared the code! Once you:

1. Add your PDF to `public/documents/`
2. Install Resend (`npm install resend`)
3. Add `RESEND_API_KEY` to `.env.local`

Then use this updated code:

### File: `lib/actions/newsletter.ts`

```typescript
"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Resend } from "resend"
import fs from "fs"
import path from "path"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function subscribeToNewsletter(email: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email })

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "Email already subscribed" }
      }
      throw error
    }

    // Send welcome email with PDF
    await sendWelcomeEmailWithPDF(email)

    return { 
      success: true, 
      message: "Successfully subscribed! Check your email for a welcome gift." 
    }
  } catch (error) {
    console.error("[Newsletter] Subscription error:", error)
    return { 
      success: false, 
      message: "Failed to subscribe. Please try again." 
    }
  }
}

async function sendWelcomeEmailWithPDF(email: string) {
  try {
    // Read PDF file
    const pdfPath = path.join(process.cwd(), "public/documents/emca-welcome-guide.pdf")
    const pdfBuffer = fs.readFileSync(pdfPath)
    const pdfBase64 = pdfBuffer.toString("base64")

    // Send email with PDF attachment
    await resend.emails.send({
      from: "EMCA Tanzania <onboarding@resend.dev>", // Change to your domain
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
              
            USA River, Arusha, Tanzania
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

    console.log(`[Newsletter] Welcome email sent to: ${email}`)
    return { success: true }
  } catch (error) {
    console.error("[Newsletter] Email send error:", error)
    // Don't fail the subscription if email fails
    return { success: false }
  }
}
```

---

## ✅ Quick Checklist

- [ ] PDF file added to `public/documents/`
- [ ] Resend account created
- [ ] API key added to `.env.local`
- [ ] Run `npm install resend`
- [ ] Update `lib/actions/newsletter.ts` with code above
- [ ] Change PDF filename in code if needed (line 26)
- [ ] Change `from` email if using custom domain (line 34)
- [ ] Test by subscribing with your email

---

## 🧪 Testing

1. **Start your dev server**: `npm run dev`
2. **Go to homepage** and scroll to footer
3. **Enter your email** in newsletter subscription
4. **Click Subscribe**
5. **Check your email** - you should receive the PDF!

---

## 🎨 Customization Options

### Change PDF File

```typescript
const pdfPath = path.join(process.cwd(), "public/documents/YOUR-FILE.pdf")
```

### Change Email Subject

```typescript
subject: "Your Custom Subject Here 🌿",
```

### Change Sender Name

```typescript
from: "Your Name <onboarding@resend.dev>",
```

### Add Multiple PDFs

```typescript
attachments: [
  {
    filename: "Guide-1.pdf",
    content: pdfBuffer1.toString("base64"),
  },
  {
    filename: "Guide-2.pdf",
    content: pdfBuffer2.toString("base64"),
  },
],
```

---

## 💰 Pricing

**Resend Free Tier:**

- 3,000 emails per month
- Perfect for getting started
- No credit card required

**If you need more:**

- $20/month for 50,000 emails
- $80/month for 500,000 emails

---

## 🚨 Troubleshooting

### "PDF file not found"

- Make sure PDF is in `public/documents/` folder
- Check the filename matches exactly (case-sensitive)

### "API key invalid"

- Check your `.env.local` file
- Make sure key starts with `re_`
- Restart dev server after adding key

### "Email not received"

- Check spam folder
- Verify email address is correct
- Check Resend dashboard for delivery status

### "Domain not verified"

- Use `onboarding@resend.dev` for testing
- Or complete domain verification in Resend dashboard

---

## 📞 Need Help?

If you run into issues:

1. Check the terminal for error messages
2. Check Resend dashboard: <https://resend.com/emails>
3. Verify all environment variables are set
4. Make sure the PDF file exists in the correct location

---

## 🎉 You're All Set

Once configured, every new newsletter subscriber will automatically receive:

- A welcome email
- The PDF attachment
- A beautiful HTML email design
- Added to your subscriber list in Supabase

Perfect for sending:

- Welcome guides
- Environmental tips PDFs
- Volunteer handbooks
- Program information
- Event calendars
