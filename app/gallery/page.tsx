import { GalleryHero } from "@/components/gallery/gallery-hero"
import { GalleryGrid } from "@/components/gallery/gallery-grid"
import { getActiveGalleryItems } from "@/lib/actions/gallery"

export const metadata = {
  title: "Gallery - EMCA",
  description:
    "Visual stories of our environmental work across Tanzania. Explore photos from our projects and community initiatives.",
}

export default async function GalleryPage() {
  const { data: galleryItems } = await getActiveGalleryItems()
  
  // Extract unique categories from items
  const categories = galleryItems && galleryItems.length > 0
    ? Array.from(new Set(galleryItems.map(item => item.category))).sort()
    : []

  return (
    <div className="flex flex-col">
      <GalleryHero />
      <GalleryGrid items={galleryItems || []} categories={categories} />
    </div>
  )
}
