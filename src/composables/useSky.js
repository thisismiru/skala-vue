import { ref } from 'vue'

export const SKY_PHASES = ['dawn', 'morning', 'day', 'sunset', 'night']

const phase = ref('day')

export const useSky = () => ({
  phase,
  setPhase: (next) => {
    if (SKY_PHASES.includes(next)) phase.value = next
  },
})
