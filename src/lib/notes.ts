import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const notesDirectory = path.join(process.cwd(), 'content/notes')

export interface NoteMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  category: string
}

export interface Note extends NoteMeta {
  content: string
}

// 获取所有笔记的元数据
export function getAllNotes(): NoteMeta[] {
  // 确保目录存在
  if (!fs.existsSync(notesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(notesDirectory)
  const allNotes = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(notesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        category: data.category || 'Uncategorized',
      }
    })

  // 按日期排序
  return allNotes.sort((a, b) => (a.date > b.date ? -1 : 1))
}

// 获取单篇笔记
export function getNoteBySlug(slug: string): Note | null {
  const fullPath = path.join(notesDirectory, `${slug}.mdx`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    content,
  }
}

// 获取所有分类
export function getAllCategories(): string[] {
  const notes = getAllNotes()
  const categories = new Set(notes.map((note) => note.category))
  return Array.from(categories)
}

// 按分类获取笔记
export function getNotesByCategory(category: string): NoteMeta[] {
  const notes = getAllNotes()
  return notes.filter((note) => note.category === category)
}
