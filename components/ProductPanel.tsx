
type Product = {
  id: string
  title: string
  type: 'A' | 'B' | 'C'
  description: string
  tags: string[]
  matchScore: number
}

const mockProducts: Product[] = [
  {
    id: 'a1',
    title: 'Optimal Choice A1',
    type: 'A',
    description: 'Perfectly matched to your philosophy.',
    tags: ['minimal', 'future', 'black'],
    matchScore: 95
  },
  {
    id: 'b1',
    title: 'Budget Pick B1',
    type: 'B',
    description: 'A good choice with a lower price point.',
    tags: ['cost-effective', 'simple'],
    matchScore: 78
  },
  {
    id: 'c1',
    title: 'Design Focus C1',
    type: 'C',
    description: 'Highly aesthetic and well-crafted.',
    tags: ['design', 'elegant'],
    matchScore: 82
  }
]

export default function ProductPanel() {
  return (
    <div className="h-full w-full md:w-80 bg-gray-50 dark:bg-gray-800 border-l p-4 space-y-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Suggested Products</h2>

      {mockProducts.map((p) => (
        <div
          key={p.id}
          className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-700"
        >
          <div className="text-sm text-gray-500 dark:text-gray-300 mb-1">
            Type {p.type}
          </div>
          <div className="font-bold mb-1">{p.title}</div>
          <div className="text-sm text-gray-700 dark:text-gray-200 mb-2">{p.description}</div>
          <div className="text-xs text-gray-400 dark:text-gray-300 mb-1">
            Tags: {p.tags.join(', ')}
          </div>
          <div className="text-xs text-blue-700 font-semibold">
            Match Score: {p.matchScore}%
          </div>
        </div>
      ))}
    </div>
  )
}
