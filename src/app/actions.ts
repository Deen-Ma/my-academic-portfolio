'use server'

import { supabase, TechNote } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

// 验证管理员密钥
function verifyAdminKey(key: string): boolean {
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret) {
    console.error('ADMIN_SECRET is not configured')
    return false
  }
  return key === adminSecret
}

// 获取所有笔记
export async function getNotes(): Promise<TechNote[]> {
  const { data, error } = await supabase
    .from('tech_notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching notes:', error)
    return []
  }

  return data || []
}

// 添加笔记
export async function addNote(formData: FormData): Promise<{
  success: boolean
  message: string
}> {
  const adminKey = formData.get('adminKey') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string

  // 验证管理员密钥
  if (!verifyAdminKey(adminKey)) {
    return {
      success: false,
      message: '❌ 管理员密钥无效',
    }
  }

  // 验证必填字段
  if (!title?.trim() || !content?.trim()) {
    return {
      success: false,
      message: '❌ 标题和内容不能为空',
    }
  }

  // 插入数据
  const { error } = await supabase.from('tech_notes').insert({
    title: title.trim(),
    content: content.trim(),
    category: category || 'General',
  })

  if (error) {
    console.error('Error adding note:', error)
    return {
      success: false,
      message: '❌ 添加失败：' + error.message,
    }
  }

  // 重新验证页面缓存
  revalidatePath('/tech-board')

  return {
    success: true,
    message: '✅ 笔记添加成功！',
  }
}

// 删除笔记
export async function deleteNote(
  id: string,
  adminKey: string
): Promise<{
  success: boolean
  message: string
}> {
  // 验证管理员密钥
  if (!verifyAdminKey(adminKey)) {
    return {
      success: false,
      message: '❌ 管理员密钥无效',
    }
  }

  // 删除数据
  const { error } = await supabase.from('tech_notes').delete().eq('id', id)

  if (error) {
    console.error('Error deleting note:', error)
    return {
      success: false,
      message: '❌ 删除失败：' + error.message,
    }
  }

  // 重新验证页面缓存
  revalidatePath('/tech-board')

  return {
    success: true,
    message: '✅ 笔记已删除',
  }
}

// 更新笔记
export async function updateNote(formData: FormData): Promise<{
  success: boolean
  message: string
}> {
  const adminKey = formData.get('adminKey') as string
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const category = formData.get('category') as string

  // 验证管理员密钥
  if (!verifyAdminKey(adminKey)) {
    return {
      success: false,
      message: '❌ 管理员密钥无效',
    }
  }

  // 验证必填字段
  if (!title?.trim() || !content?.trim()) {
    return {
      success: false,
      message: '❌ 标题和内容不能为空',
    }
  }

  // 更新数据
  const { error } = await supabase
    .from('tech_notes')
    .update({
      title: title.trim(),
      content: content.trim(),
      category: category || 'General',
    })
    .eq('id', id)

  if (error) {
    console.error('Error updating note:', error)
    return {
      success: false,
      message: '❌ 更新失败：' + error.message,
    }
  }

  // 重新验证页面缓存
  revalidatePath('/tech-board')

  return {
    success: true,
    message: '✅ 笔记更新成功！',
  }
}
