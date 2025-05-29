export async function savePhilosophyTags(tags: string[], userId: string) {
  try {
    await fetch('/api/philosophy/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, tags })
    })
  } catch (e) {
    console.error('Failed to save philosophy tags', e)
  }
}
