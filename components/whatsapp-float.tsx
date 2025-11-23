"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppFloat() {
  const handleClick = () => {
    // Replace with EMCA's actual WhatsApp number
    window.open(
      "https://wa.me/255760309999?text=Hello%20EMCA!%20I%20would%20like%20to%20know%20more%20about%20your%20work.",
      "_blank",
    )
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us
      </span>
    </button>
  )
}
