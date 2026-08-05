import { ref } from 'vue'

const now = ref(Date.now())

const tick = () => {
  now.value = Date.now()
}

setInterval(tick, 60000)

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) tick()
})

export const useNow = () => now
