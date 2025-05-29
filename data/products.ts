export type Product = {
  id: string
  title: string
  type: string
  description: string
  tags: string[]
  matchScore: number
  image?: string
}

export const products: Product[] = [
  { id: 'a1', title: 'Optimal Choice A1', type: 'A', description: 'Perfect for enthusiasts', tags: ['optimal', 'future'], matchScore: 90 },
  { id: 'b1', title: 'Budget Pick B1', type: 'B', description: 'Affordable and reliable', tags: ['budget', 'simple'], matchScore: 75 },
  { id: 'c1', title: 'Design Focus C1', type: 'C', description: 'Beautifully crafted', tags: ['design'], matchScore: 80 }
]
