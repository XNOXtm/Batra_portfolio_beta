"use client"

import { useInView } from "@/hooks/use-in-view"
import { ArrowUpRight } from "lucide-react"

const services = [
  {
    number: "01",
    title: "Branding",
    description: "From strategy to visual identity, we create brands that resonate and endure.",
    items: ["Brand Strategy", "Visual Identity", "Brand Guidelines", "Naming"],
  },
  {
    number: "02",
    title: "Digital Design",
    description: "Crafting digital experiences that engage users and drive results.",
    items: ["Web Design", "UI/UX Design", "Mobile Apps", "Design Systems"],
  },
  {
    number: "03",
    title: "Development",
    description: "Building performant, accessible websites and applications.",
    items: ["Frontend Dev", "CMS Integration", "E-commerce", "Animation"],
  },
  {
    number: "04",
    title: "Creative Direction",
    description: "Guiding the creative vision across all touchpoints.",
    items: ["Art Direction", "Photography", "Video", "Content Strategy"],
  },
]

export function ServicesSection() {
  const { ref, isInView } = useInView({ threshold: 0.1 })

  return (
    <section id="services" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-secondary/30">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 md:mb-24 ${isInView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            <span className="italic font-serif">services</span>
          </h2>
          
          <div className="max-w-2xl">
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              We offer end-to-end creative services, from initial concept to final delivery
            </p>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {services.map((service, index) => (
            <article 
              key={service.title}
              className={`group bg-background p-8 md:p-12 hover:bg-secondary/50 transition-colors ${isInView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="text-xs text-muted-foreground tracking-widest">
                  {service.number}
                </span>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-light mb-4 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <li 
                    key={item}
                    className="px-3 py-1 text-xs border border-border rounded-full text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
