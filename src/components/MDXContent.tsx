import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'

// 自定义 MDX 组件
const components = {
  // 自定义代码块样式
  pre: ({ children, ...props }: any) => (
    <pre className="rounded-lg overflow-x-auto" {...props}>
      {children}
    </pre>
  ),
  // 自定义链接
  a: ({ href, children, ...props }: any) => (
    <a
      href={href}
      className="text-accent hover:underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  // 自定义图片
  img: ({ src, alt, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg shadow-md my-6 max-w-full h-auto"
      {...props}
    />
  ),
  // 自定义 blockquote
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-accent pl-4 italic text-gray-600 my-4"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // Callout 组件
  Callout: ({ type = 'info', children }: { type?: 'info' | 'warning' | 'error'; children: React.ReactNode }) => {
    const styles = {
      info: 'bg-blue-50 border-blue-500 text-blue-800',
      warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
      error: 'bg-red-50 border-red-500 text-red-800',
    }
    return (
      <div className={`p-4 border-l-4 rounded-r-lg my-4 ${styles[type]}`}>
        {children}
      </div>
    )
  },
}

interface MDXContentProps {
  source: string
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkMath, remarkGfm] as any,
            rehypePlugins: [rehypeKatex, rehypeHighlight] as any,
          },
        }}
      />
    </div>
  )
}
