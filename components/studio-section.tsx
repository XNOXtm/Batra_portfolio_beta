"use client"

import { useInView } from "@/hooks/use-in-view"

const stats = [
  { value: "100+", label: "Projects Completed" },
  { value: "8+", label: "Years Experience" },
  { value: "50+", label: "Happy Clients" },
  { value: "15+", label: "Team Members" },
]

export function StudioSection() {
  const { ref, isInView } = useInView({ threshold: 0.2 })

  return (
    <section id="studio" className="py-24 md:py-32 px-6 md:px-12 lg:px-24">
      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <div className={`mb-16 md:mb-24 ${isInView ? 'animate-fade-up opacity-100' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1] mb-6">
            <span className="italic font-serif">studio</span>
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - About text */}
          <div className={`space-y-8 ${isInView ? 'animate-fade-up animation-delay-100 opacity-100' : 'opacity-0'}`}>
            <p className="text-xl md:text-2xl font-light leading-relaxed">
              We are a creative studio dedicated to building iconic brands and digital products that make an impact.
            </p>
            
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Founded with a passion for design and innovation, our studio brings together talented creatives, strategists, and developers to deliver exceptional work.
              </p>
              
              <p>
                We believe in the power of thoughtful design to transform businesses and create meaningful connections between brands and their audiences.
              </p>
              
              <p>
                Every project is an opportunity to push creative boundaries while delivering tangible results for our clients.
              </p>
            </div>
          </div>

          {/* Right - Stats */}
          <div className={`${isInView ? 'animate-fade-up animation-delay-200 opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="border-t border-border pt-6"
                  style={{ animationDelay: `${(index + 2) * 0.1}s` }}
                >
                  <span className="block text-4xl md:text-5xl lg:text-6xl font-light mb-2">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
