
import { products as mockProducts } from '../data/products'

export default function ProductPanel() {
  return (
    <div className="h-full w-80 bg-gray-50 dark:bg-gray-800 border-l p-4 space-y-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">Suggested Products</h2>

      {mockProducts.map((p) => (
        <div
          key={p.id}
          className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-gray-700"
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
