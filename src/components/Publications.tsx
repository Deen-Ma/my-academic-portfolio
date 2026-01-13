import PublicationItem from './PublicationItem'

// 论文数据类型
export interface Publication {
  title: string
  authors: string[]
  venue: string
  year: number
  links?: {
    pdf?: string
    code?: string
    project?: string
    bibtex?: string
  }
  highlight?: boolean // 是否高亮显示（如 Best Paper）
}

// 示例论文数据
const publications: Publication[] = [
  {
    title: 'A Novel Approach to Neural Architecture Search with Reinforcement Learning',
    authors: ['Your Name', 'Collaborator One', 'Advisor Name'],
    venue: 'International Conference on Machine Learning (ICML)',
    year: 2026,
    links: {
      pdf: '/papers/icml2026.pdf',
      code: 'https://github.com/yourusername/nas-rl',
      project: 'https://project-page.com',
      bibtex: '/bibtex/icml2026.bib',
    },
    highlight: true,
  },
  {
    title: 'Efficient Transformer Models for Long Document Understanding',
    authors: ['Your Name', 'Another Collaborator', 'Advisor Name'],
    venue: 'Conference on Neural Information Processing Systems (NeurIPS)',
    year: 2025,
    links: {
      pdf: '/papers/neurips2025.pdf',
      code: 'https://github.com/yourusername/efficient-transformer',
    },
  },
  {
    title: 'Self-Supervised Learning for Graph Neural Networks',
    authors: ['Collaborator One', 'Your Name', 'Another Author'],
    venue: 'International Conference on Learning Representations (ICLR)',
    year: 2025,
    links: {
      pdf: '/papers/iclr2025.pdf',
    },
  },
  {
    title: 'Pre-training Methods for Scientific Text Understanding',
    authors: ['Your Name', 'Advisor Name'],
    venue: 'Association for Computational Linguistics (ACL)',
    year: 2024,
    links: {
      pdf: '/papers/acl2024.pdf',
      code: 'https://github.com/yourusername/sci-pretrain',
    },
  },
]

// 按年份分组
function groupByYear(pubs: Publication[]): Map<number, Publication[]> {
  const grouped = new Map<number, Publication[]>()
  pubs.forEach((pub) => {
    const existing = grouped.get(pub.year) || []
    grouped.set(pub.year, [...existing, pub])
  })
  return new Map([...grouped.entries()].sort((a, b) => b[0] - a[0]))
}

export default function Publications() {
  const groupedPubs = groupByYear(publications)

  return (
    <div className="space-y-10">
      {Array.from(groupedPubs.entries()).map(([year, pubs]) => (
        <div key={year}>
          <h3 className="text-lg font-semibold text-gray-400 mb-4">{year}</h3>
          <div className="space-y-6">
            {pubs.map((pub, index) => (
              <PublicationItem key={index} publication={pub} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
