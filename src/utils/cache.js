const PREFIX = 'weather'

export const readCache = (key, ttlMs) => {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${key}`)
    if (!raw) return null

    const { savedAt, payload } = JSON.parse(raw)
    if (Date.now() - savedAt > ttlMs) {
      localStorage.removeItem(`${PREFIX}:${key}`)
      return null
    }
    return payload
  } catch {
    return null
  }
}

export const writeCache = (key, payload) => {
  try {
    localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify({ savedAt: Date.now(), payload }))
  } catch {
    return
  }
}

export const clearCache = () => {
  try {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(`${PREFIX}:`))
      .forEach((key) => localStorage.removeItem(key))
  } catch {
    return
  }
}
