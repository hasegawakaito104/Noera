export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') {
    return 'anonymous'
  }
  let id = localStorage.getItem('userId')
  if (!id) {
    id = Math.random().toString(36).substring(2, 10)
    localStorage.setItem('userId', id)
  }
  return id
}
