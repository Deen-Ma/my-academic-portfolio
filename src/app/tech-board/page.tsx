import { getNotes } from '@/app/actions'
import NoteCard from '@/components/tech-board/NoteCard'
import AddNoteForm from '@/components/tech-board/AddNoteForm'
import { Lightbulb } from 'lucide-react'

export const metadata = {
  title: 'Tech Board | 技术公告板',
  description: '记录日常技术心得、工具推荐和编程技巧',
}

export default async function TechBoardPage() {
  const notes = await getNotes()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* 页面标题 */}
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Tech Board
          </h1>
        </div>
        <p className="text-gray-600 max-w-2xl">
          记录零碎的技术心得、工具推荐和编程技巧。灵感来临时，随手记下。
        </p>
      </header>

      {/* 添加笔记表单 */}
      <AddNoteForm />

      {/* 笔记列表 */}
      {notes.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg">还没有笔记，添加第一条吧！</p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}
