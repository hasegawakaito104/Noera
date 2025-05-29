export type Product = {
  id: string
  title: string
  description: string
  type: 'A' | 'B' | 'C'
  tags: string[]
  matchScore: number
}

export function matchProducts(
  messages: { text: string }[],
  products: Product[]
): Product[] {
  const keywords = messages.flatMap(m => m.text.toLowerCase().split(/\W+/))
  return products
    .map(p => {
      const matched = p.tags.some(tag => keywords.includes(tag))
      return { ...p, matchScore: matched ? 100 : 0 }
    })
    .filter(p => p.matchScore > 0)
}
