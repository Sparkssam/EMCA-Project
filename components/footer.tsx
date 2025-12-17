"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-emca-darkest text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 font-serif">
          {/* Brand Section */}
          <div className="space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <Image 
                src="/logo.jpg" 
                alt="EMCA Logo" 
                width={140} 
                height={140} 
                className="transition-transform group-hover:scale-110"
              />
            </Link>
            <p className="text-base text-white/80 leading-relaxed">
              Youth-led environmental action for a sustainable future. Together, we protect our planet and empower
              communities across Tanzania.
            </p>
            <div className="flex gap-3 text-white">
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-emca-dark hover:text-emca-yellow transition-all rounded-full"
                asChild
              >
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-emca-dark hover:text-emca-yellow transition-all rounded-full"
                asChild
              >
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-emca-dark hover:text-emca-yellow transition-all rounded-full"
                asChild
              >
                <a href="https://www.instagram.com/emcaorganization?igsh=NTdodXBnYTdrdTF5&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-emca-dark hover:text-emca-yellow transition-all rounded-full"
                asChild
              >
                <a href="https://www.linkedin.com/company/emca.or.tz/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-pompiere text-xl font-normal mb-5 text-emca-yellow">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/philosophy", label: "Our Philosophy" },
                { href: "/projects", label: "Projects" },
                { href: "/impact", label: "Impact Stories" },
                { href: "/gallery", label: "Gallery" },
                { href: "/stories", label: "Blog" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-base text-white/80 hover:text-emca-yellow transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-emca-yellow group-hover:w-4 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-pompiere text-xl font-normal mb-5 text-emca-yellow">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base text-white/80 group hover:text-white transition-colors">
                <MapPin className="h-5 w-5 text-emca-yellow flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-white mb-1">Office Location</p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Usa+River,+Arusha,+Tanzania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emca-lime transition-colors text-white"
                  >
                    P.O. Box 23
                    USA River, Arusha, Tanzania
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-base text-white/80 group hover:text-white transition-colors">
                <Mail className="h-5 w-5 text-emca-yellow flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-white mb-1">Email</p>
                  <a href="mailto:emca.organization@gmail.com" className="hover:text-emca-lime transition-colors text-white">
                    emca.organization@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-base text-white/80 group hover:text-white transition-colors">
                <Phone className="h-5 w-5 text-emca-yellow flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium text-white mb-1">Phone</p>
                  <p className="text-white">{"+255 628 957 390\n,\n+255 692 880 644"}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-pompiere text-xl font-normal mb-5 text-emca-yellow">Stay Connected</h4>
            <p className="text-base text-white/80 mb-5 leading-relaxed">
              Download our newsletter to learn about environmental updates, impact stories, and ways to get involved.
            </p>
            <a
              href="/newsletter.pdf"
              download
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-emca-yellow to-emca-lime hover:from-emca-lime hover:to-emca-yellow text-emca-darkest font-bold h-12 text-base rounded-xl shadow-lg hover:shadow-xl transition-all px-6"
            >
              <Send className="mr-2 h-5 w-5" />
              Download Newsletter
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t-2 border-emca-dark">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-serif">
            <p className="text-base text-white/70">© {new Date().getFullYear()} EMCA Tanzania. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-base text-white/70 hover:text-emca-yellow transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-base text-white/70 hover:text-emca-yellow transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
