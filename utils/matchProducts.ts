import { Product } from '../data/products'

// very naive matching based on message text and product tags
export function matchProducts(messages: {text: string}[], products: Product[]): Product[] {
  const allText = messages.map(m => m.text.toLowerCase()).join(' ')
  return products
    .map(p => ({
      product: p,
      score: p.tags.reduce((score, tag) => score + (allText.includes(tag.toLowerCase()) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .map(item => item.product)
}
