import { Github, ExternalLink } from 'lucide-react'

interface Project {
  title: string
  description: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
}

const projects: Project[] = [
  {
    title: 'Neural Architecture Search Toolkit',
    description: 'An open-source toolkit for automated neural architecture search with support for various search spaces and optimization algorithms.',
    tags: ['Python', 'PyTorch', 'AutoML'],
    github: 'https://github.com/yourusername/nas-toolkit',
    demo: 'https://nas-toolkit-demo.vercel.app',
  },
  {
    title: 'Scientific Document Parser',
    description: 'A deep learning-based parser for extracting structured information from scientific papers, including citations, figures, and tables.',
    tags: ['Python', 'Transformers', 'NLP'],
    github: 'https://github.com/yourusername/sci-parser',
  },
  {
    title: 'Graph Neural Network Library',
    description: 'Efficient implementations of state-of-the-art graph neural network architectures for node classification and link prediction.',
    tags: ['Python', 'PyTorch Geometric', 'GNN'],
    github: 'https://github.com/yourusername/gnn-lib',
  },
]

export default function Projects() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <div
          key={index}
          className="group p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
        >
          {/* 项目标题 */}
          <h3 className="font-semibold text-gray-900 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          
          {/* 项目描述 */}
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {project.description}
          </p>
          
          {/* 技术标签 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-0.5 text-xs font-medium text-gray-500 bg-gray-100 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* 链接 */}
          <div className="flex items-center gap-3 mt-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
