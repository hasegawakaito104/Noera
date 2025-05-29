// components/ProductSuggestions.tsx

'use client'

import Image from "next/image";

export function ProductSuggestions({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return <div className="p-4 text-sm text-gray-400">No matching products found.</div>;
  }

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Recommended for You</h2>
      {products.map((product: any) => (
        <div key={product.id} className="flex items-center space-x-4 border rounded-xl p-3 shadow">
          <div className="w-20 h-20 relative">
            <Image
              src={`/products/${product.image}`}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
            <span className="text-sm text-gray-500">${product.price}</span>
            <span className="text-xs text-gray-400">Score: {(product.matchScore * 100).toFixed(0)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
}