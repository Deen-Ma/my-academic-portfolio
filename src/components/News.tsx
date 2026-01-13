const newsItems = [
  {
    date: '2026-01',
    content: 'Our paper "Title of Your Paper" has been accepted to ICML 2026!',
  },
  {
    date: '2025-12',
    content: 'Passed the PhD qualifying exam.',
  },
  {
    date: '2025-09',
    content: 'Started PhD program at University Name.',
  },
  {
    date: '2025-06',
    content: 'Released the open-source project "YourProject" on GitHub.',
  },
  {
    date: '2025-03',
    content: 'Presented our work at Workshop Name @ Conference.',
  },
]

export default function News() {
  return (
    <div className="space-y-4">
      {newsItems.map((item, index) => (
        <div key={index} className="flex gap-4">
          <span className="text-sm text-gray-400 font-mono w-20 flex-shrink-0">
            {item.date}
          </span>
          <p className="text-gray-700 text-sm leading-relaxed">
            {item.content}
          </p>
        </div>
      ))}
    </div>
  )
}
