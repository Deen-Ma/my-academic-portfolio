import Link from 'next/link'
import { getAllNotes, getAllCategories } from '@/lib/notes'
import { FileText, Calendar, Tag } from 'lucide-react'

export default function NotesPage() {
  const notes = getAllNotes()
  const categories = getAllCategories()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 侧边栏 - 分类目录 */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
            <nav className="space-y-2">
              <Link
                href="/notes"
                className="block px-3 py-2 text-sm text-gray-600 hover:text-accent hover:bg-gray-50 rounded-lg transition-colors"
              >
                All Notes ({notes.length})
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/notes?category=${encodeURIComponent(category)}`}
                  className="block px-3 py-2 text-sm text-gray-600 hover:text-accent hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 主内容区 - 笔记列表 */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Technical Notes</h1>
          <p className="text-gray-600 mb-8">
            Research notes, tutorials, and code walkthroughs.
          </p>

          {notes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No notes yet. Start writing!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <article
                  key={note.slug}
                  className="group p-6 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <Link href={`/notes/${note.slug}`}>
                    <h2 className="text-xl font-semibold text-gray-900 group-hover:text-accent transition-colors">
                      {note.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {note.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {note.date}
                    </span>
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                      {note.category}
                    </span>
                    {note.tags.length > 0 && (
                      <div className="flex items-center gap-1">
                        <Tag className="w-4 h-4" />
                        {note.tags.slice(0, 3).join(', ')}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
