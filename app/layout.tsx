import type React from "react"
import type { Metadata, Viewport } from "next"

import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Toaster } from "sonner"
import { getCurrentUser } from "@/lib/actions/auth"

import { Poppins, Poppins as V0_Font_Poppins } from 'next/font/google'

// Force dynamic rendering for all pages since we use authentication
export const dynamic = "force-dynamic"

// Initialize fonts
const _poppins = V0_Font_Poppins({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "EMCA Tanzania | Environmental Management & Community Awareness",
    template: "%s | EMCA Tanzania",
  },
  description:
    "EMCA is a youth-led NGO in Tanzania dedicated to environmental protection, community empowerment, and sustainable development. Join us in creating a thriving future where communities actively manage and safeguard the environment.",
  keywords: [
    "EMCA Tanzania",
    "environmental protection Tanzania",
    "youth-led NGO",
    "sustainability Tanzania",
    "community empowerment",
    "Binti Mazingira",
    "Tuelimishe Mazingira",
    "cleanup drives Tanzania",
    "environmental education",
    "USA River, Arusha NGO",
  ],
  authors: [{ name: "EMCA Tanzania" }],
  creator: "EMCA Tanzania",
  publisher: "EMCA Tanzania",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://emca-tanzania.org"),
  openGraph: {
    title: "EMCA Tanzania | Environmental Management & Community Awareness",
    description: "Youth-led NGO promoting environmental sustainability and community empowerment in Tanzania.",
    url: "https://emca-tanzania.org",
    siteName: "EMCA Tanzania",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMCA Tanzania",
    description: "Youth-led environmental NGO in Tanzania",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A724F" },
    { media: "(prefers-color-scheme: dark)", color: "#06231D" },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { success, user } = await getCurrentUser()
  
  return (
    <html lang="en" className={`${poppins.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://emca-tanzania.org" />
      </head>
      <body className="font-poppins antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Toaster position="top-right" richColors />
        <ScrollToTop />
        <Navigation user={success ? user : null} />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
