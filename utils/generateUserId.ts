export function getOrCreateUserId(): string {
  if (typeof window === 'undefined') {
    return 'anonymous';
  }
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = `user-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('userId', userId);
  }
  return userId;
}
