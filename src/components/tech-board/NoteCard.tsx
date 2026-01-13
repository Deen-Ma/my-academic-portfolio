'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deleteNote } from '@/app/actions'
import type { TechNote } from '@/lib/supabase'

interface NoteCardProps {
  note: TechNote
}

// 分类颜色映射
const categoryColors: Record<string, string> = {
  AI: 'bg-purple-50 border-purple-200',
  Coding: 'bg-blue-50 border-blue-200',
  Tools: 'bg-green-50 border-green-200',
  Research: 'bg-yellow-50 border-yellow-200',
  Tips: 'bg-pink-50 border-pink-200',
  General: 'bg-gray-50 border-gray-200',
}

const categoryBadgeColors: Record<string, string> = {
  AI: 'bg-purple-100 text-purple-700',
  Coding: 'bg-blue-100 text-blue-700',
  Tools: 'bg-green-100 text-green-700',
  Research: 'bg-yellow-100 text-yellow-700',
  Tips: 'bg-pink-100 text-pink-700',
  General: 'bg-gray-100 text-gray-700',
}

export default function NoteCard({ note }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [adminKey, setAdminKey] = useState('')
  const [message, setMessage] = useState('')

  const cardColor = categoryColors[note.category] || categoryColors.General
  const badgeColor = categoryBadgeColors[note.category] || categoryBadgeColors.General

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  async function handleDelete() {
    if (!adminKey.trim()) {
      setMessage('❌ 请输入管理员密钥')
      return
    }

    setIsDeleting(true)
    setMessage('')

    const result = await deleteNote(note.id, adminKey)

    setMessage(result.message)
    setIsDeleting(false)

    if (result.success) {
      setShowDeleteConfirm(false)
    }
  }

  return (
    <div
      className={`break-inside-avoid p-5 rounded-xl border ${cardColor} hover:shadow-md transition-shadow group relative`}
    >
      {/* 删除按钮 */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
        title="删除"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* 分类标签 */}
      <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${badgeColor}`}>
        {note.category}
      </span>

      {/* 标题 */}
      <h3 className="font-semibold text-gray-900 mt-3 mb-2 pr-6">
        {note.title}
      </h3>

      {/* 内容 */}
      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
        {note.content}
      </p>

      {/* 日期 */}
      <p className="text-xs text-gray-400 mt-4">
        {formatDate(note.created_at)}
      </p>

      {/* 删除确认弹窗 */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h4 className="font-semibold text-gray-900 mb-2">确认删除</h4>
            <p className="text-sm text-gray-600 mb-4">
              确定要删除「{note.title}」吗？此操作不可撤销。
            </p>

            <div className="mb-4">
              <label htmlFor="delete-key" className="block text-sm font-medium text-gray-700 mb-1">
                管理员密钥 🔐
              </label>
              <input
                type="password"
                id="delete-key"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="请输入管理员密钥"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>

            {message && (
              <p className={`text-sm mb-4 ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setAdminKey('')
                  setMessage('')
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    删除中...
                  </>
                ) : (
                  '确认删除'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
