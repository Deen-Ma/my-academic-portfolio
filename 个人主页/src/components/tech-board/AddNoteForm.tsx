'use client'

import { useState } from 'react'
import { Plus, X, Loader2 } from 'lucide-react'
import { addNote } from '@/app/actions'

const categories = [
  { value: 'AI', label: 'AI', color: 'bg-purple-100 text-purple-700' },
  { value: 'Coding', label: 'Coding', color: 'bg-blue-100 text-blue-700' },
  { value: 'Tools', label: 'Tools', color: 'bg-green-100 text-green-700' },
  { value: 'Research', label: 'Research', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'Tips', label: 'Tips', color: 'bg-pink-100 text-pink-700' },
  { value: 'General', label: 'General', color: 'bg-gray-100 text-gray-700' },
]

export default function AddNoteForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('General')

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setMessage('')

    formData.set('category', selectedCategory)
    const result = await addNote(formData)

    setMessage(result.message)
    setIsLoading(false)

    if (result.success) {
      setIsOpen(false)
      setSelectedCategory('General')
      // 清除表单
      const form = document.getElementById('add-note-form') as HTMLFormElement
      form?.reset()
    }
  }

  return (
    <div className="mb-8">
      {/* 添加按钮 */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          添加笔记
        </button>
      )}

      {/* 添加表单 */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">新建笔记</h3>
            <button
              onClick={() => {
                setIsOpen(false)
                setMessage('')
              }}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form id="add-note-form" action={handleSubmit} className="space-y-4">
            {/* 标题 */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                标题
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                placeholder="例如：使用 Cursor + Claude 编程"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* 内容 */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                内容
              </label>
              <textarea
                id="content"
                name="content"
                required
                rows={3}
                placeholder="详细描述..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* 分类 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                分类
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1 text-sm rounded-full transition-all ${
                      selectedCategory === cat.value
                        ? cat.color + ' ring-2 ring-offset-1 ring-gray-400'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 管理员密钥 */}
            <div>
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
                管理员密钥 🔐
              </label>
              <input
                type="password"
                id="adminKey"
                name="adminKey"
                required
                placeholder="请输入管理员密钥"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* 消息提示 */}
            {message && (
              <p className={`text-sm ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            {/* 提交按钮 */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  setMessage('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    发布中...
                  </>
                ) : (
                  '发布'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
