import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // state: 온도 단위 ('celsius' | 'fahrenheit')
  const unit = ref('celsius')

  const unitSymbol = computed(() => (unit.value === 'celsius' ? '°C' : '°F'))

  function toggleUnit() {
    unit.value = unit.value === 'celsius' ? 'fahrenheit' : 'celsius'
  }

  /*
   * 섭씨 원본을 현재 단위 설정에 맞는 표시용 값으로 변환한다.
   * WeatherCard와 weatherDetailView에 흩어져 있던 로직을 통합했다.
   * Composable로 분리할 수 있지만, 변환에 필요한 Unit이 이 곳에 있으므로 응집도를 높이기 위해 store에 포함시켰다.
   */
  function toDisplayTemp(celsius) {
    if (unit.value === 'fahrenheit') {
      return Math.round((celsius * 9) / 5 + 32)
    }
    return celsius
  }

  return { unit, unitSymbol, toggleUnit, toDisplayTemp }
})
