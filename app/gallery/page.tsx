import { GalleryHero } from "@/components/gallery/gallery-hero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"

export const metadata = {
  title: "Gallery - EMCA",
  description:
    "Visual stories of our environmental work across Tanzania. Explore photos from our projects and community initiatives.",
}

export default function GalleryPage() {
  return (
    <div className="flex flex-col">
      <GalleryHero />
      <GalleryGrid />
    </div>
  )
}
