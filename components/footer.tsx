export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="py-6 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>&copy; {currentYear} KRISHNAB. All rights reserved.</p>
        <p>Crafted with care</p>
      </div>
    </footer>
  )
}
