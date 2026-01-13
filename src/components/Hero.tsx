import Image from 'next/image'
import { Mail, Github, Linkedin, Twitter, GraduationCap } from 'lucide-react'

const socialLinks = [
  {
    name: 'Email',
    href: 'mailto:your.email@university.edu',
    icon: Mail,
  },
  {
    name: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=YOUR_ID',
    icon: GraduationCap,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername',
    icon: Github,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/yourusername',
    icon: Linkedin,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    icon: Twitter,
  },
]

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* 左侧：个人信息 */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Your Name
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            PhD Candidate
          </p>
          <p className="text-lg text-gray-500 mb-6">
            <a 
              href="https://university.edu" 
              className="hover:text-accent transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Department of Computer Science, University Name
            </a>
          </p>
          
          {/* 研究兴趣 */}
          <p className="text-gray-700 mb-8 leading-relaxed max-w-xl">
            My research focuses on <span className="font-medium text-gray-900">Machine Learning</span>, 
            <span className="font-medium text-gray-900"> Natural Language Processing</span>, and 
            <span className="font-medium text-gray-900"> AI for Science</span>. 
            I am particularly interested in developing efficient and interpretable deep learning methods.
          </p>
          
          {/* 社交链接 */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-500 hover:text-accent hover:bg-gray-100 rounded-lg transition-all"
                  title={link.name}
                >
                  <Icon className="w-5 h-5" />
                </a>
              )
            })}
          </div>
        </div>
        
        {/* 右侧：头像 */}
        <div className="flex-shrink-0">
          <div className="relative w-48 h-48 md:w-56 md:h-56">
            <Image
              src="/avatar.jpg"
              alt="Your Name"
              fill
              className="rounded-2xl object-cover shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
