import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ScrollGallery } from "@/components/scroll-gallery"
import { WorkSection } from "@/components/work-section"
import { ServicesSection } from "@/components/services-section"
import { StudioSection } from "@/components/studio-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ViewCursorLayer } from "@/components/view-cursor-layer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <ViewCursorLayer />
      <Navigation />
      <HeroSection />
      <div id="scroll-gallery">
        <ScrollGallery />
      </div>
      <WorkSection />
      <ServicesSection />
      <StudioSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
