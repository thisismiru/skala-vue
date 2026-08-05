import { computed } from 'vue'
import { useNow } from './useNow'

const pad = (n) => String(n).padStart(2, '0')

export const useLocalTime = (getCity) => {
  const now = useNow()

  const localDate = computed(() => {
    const { timezone } = getCity()
    return new Date(now.value + timezone * 1000)
  })

  const timeLabel = computed(() => {
    const date = localDate.value
    return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`
  })

  const phase = computed(() => {
    const { timezone, sunrise, sunset } = getCity()
    const date = localDate.value
    const hour = date.getUTCHours() + date.getUTCMinutes() / 60

    if (!sunrise || !sunset) {
      if (hour < 6) return 'night'
      if (hour < 9) return 'morning'
      if (hour < 17) return 'day'
      if (hour < 19) return 'sunset'
      return 'night'
    }

    const toLocalHour = (utcSeconds) => {
      const d = new Date((utcSeconds + timezone) * 1000)
      return d.getUTCHours() + d.getUTCMinutes() / 60
    }

    const sunriseHour = toLocalHour(sunrise)
    const sunsetHour = toLocalHour(sunset)

    if (hour < sunriseHour - 1) return 'night'
    if (hour < sunriseHour + 0.5) return 'dawn'
    if (hour < sunriseHour + 3) return 'morning'
    if (hour < sunsetHour - 1) return 'day'
    if (hour < sunsetHour + 0.75) return 'sunset'
    return 'night'
  })

  return { timeLabel, phase }
}
