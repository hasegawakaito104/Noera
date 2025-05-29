export async function savePhilosophyTags(tags: string[], userId: string) {
  try {
    await fetch('/api/philosophy/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, tags })
    });
  } catch (err) {
    console.error('Failed to save philosophy tags:', err);
  }
}
