import { FileText, Code, Globe, Quote } from 'lucide-react'
import type { Publication } from './Publications'

interface PublicationItemProps {
  publication: Publication
}

// 你的名字，用于高亮显示
const YOUR_NAME = 'Your Name'

export default function PublicationItem({ publication }: PublicationItemProps) {
  const { title, authors, venue, links, highlight } = publication

  // 格式化作者列表，高亮自己的名字
  const formatAuthors = (authorList: string[]) => {
    return authorList.map((author, index) => {
      const isYou = author === YOUR_NAME
      const separator = index < authorList.length - 1 ? ', ' : ''
      
      return (
        <span key={index}>
          {isYou ? (
            <span className="font-medium text-accent underline underline-offset-2">
              {author}
            </span>
          ) : (
            <span>{author}</span>
          )}
          {separator}
        </span>
      )
    })
  }

  return (
    <div className={`group ${highlight ? 'relative' : ''}`}>
      {/* 高亮标记 */}
      {highlight && (
        <span className="absolute -left-4 top-0 w-1 h-full bg-accent rounded-full" />
      )}
      
      {/* 论文标题 */}
      <h4 className="font-semibold text-gray-900 group-hover:text-accent transition-colors leading-snug">
        {title}
      </h4>
      
      {/* 作者列表 */}
      <p className="text-sm text-gray-600 mt-1">
        {formatAuthors(authors)}
      </p>
      
      {/* 会议/期刊名称 */}
      <p className="text-sm text-gray-500 italic mt-1">
        {venue}
      </p>
      
      {/* 链接按钮 */}
      {links && (
        <div className="flex flex-wrap gap-2 mt-3">
          {links.pdf && (
            <a
              href={links.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <FileText className="w-3 h-3" />
              PDF
            </a>
          )}
          {links.code && (
            <a
              href={links.code}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Code className="w-3 h-3" />
              Code
            </a>
          )}
          {links.project && (
            <a
              href={links.project}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Globe className="w-3 h-3" />
              Project
            </a>
          )}
          {links.bibtex && (
            <a
              href={links.bibtex}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <Quote className="w-3 h-3" />
              BibTeX
            </a>
          )}
        </div>
      )}
    </div>
  )
}
