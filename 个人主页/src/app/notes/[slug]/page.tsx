import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getNoteBySlug, getAllNotes } from '@/lib/notes'
import MDXContent from '@/components/MDXContent'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'

interface NotePageProps {
  params: {
    slug: string
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const notes = getAllNotes()
  return notes.map((note) => ({
    slug: note.slug,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: NotePageProps) {
  const note = getNoteBySlug(params.slug)
  if (!note) {
    return { title: 'Note Not Found' }
  }
  return {
    title: `${note.title} | Technical Notes`,
    description: note.description,
  }
}

export default function NotePage({ params }: NotePageProps) {
  const note = getNoteBySlug(params.slug)

  if (!note) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 返回链接 */}
      <Link
        href="/notes"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Notes
      </Link>

      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {note.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {note.date}
          </span>
          <span className="px-2 py-0.5 bg-gray-100 rounded">
            {note.category}
          </span>
        </div>

        {note.tags.length > 0 && (
          <div className="flex items-center gap-2 mt-4">
            <Tag className="w-4 h-4 text-gray-400" />
            <div className="flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-blue-50 text-blue-600 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 文章内容 */}
      <article className="prose max-w-none">
        <MDXContent source={note.content} />
      </article>
    </div>
  )
}
