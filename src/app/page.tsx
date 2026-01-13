import Hero from '@/components/Hero'
import News from '@/components/News'
import Publications from '@/components/Publications'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <Hero />
      
      {/* News Section */}
      <section id="news" className="py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">News</h2>
        <News />
      </section>
      
      {/* Publications Section */}
      <section id="publications" className="py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Publications</h2>
        <Publications />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-12 border-t border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Projects</h2>
        <Projects />
      </section>
    </div>
  )
}
