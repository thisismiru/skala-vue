<script setup>
import { ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

const SEOUL = { lat: 37.5665, lon: 126.978 }

const weatherData = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const handleFetchWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        lat: SEOUL.lat,
        lon: SEOUL.lon,
        appid: API_KEY,
        units: 'metric',
        lang: 'kr',
      },
    })

    console.log('Axios 응답 전체 객체:', response)
    console.log('실제 데이터(response.data):', response.data)

    weatherData.value = response.data
  } catch (error) {
    console.error('통신 중 에러가 발생했습니다.', error)

    errorMessage.value = error.response
      ? `서버 응답 오류 (${error.response.status}) - API 키 활성화 여부를 확인하세요.`
      : '네트워크 오류가 발생했습니다.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios 통신 검증 (OpenWeather)</h2>

    <button @click="handleFetchWeather" :disabled="isLoading">
      {{ isLoading ? '데이터 로딩 중...' : '실시간 날씨 데이터 당겨오기' }}
    </button>

    <p v-if="errorMessage" class="axios-error">{{ errorMessage }}</p>

    <div v-else-if="weatherData" class="result-card">
      <p>
        📍 위치: <strong>{{ weatherData.name }}</strong>
      </p>
      <p>
        🌡️ 현재 기온: <strong>{{ weatherData.main.temp }}°C</strong>
      </p>
      <p>
        ☁️ 날씨 상태: <strong>{{ weatherData.weather[0].description }}</strong>
      </p>
      <p>
        💧 습도: <strong>{{ weatherData.main.humidity }}%</strong>
      </p>
      <p>
        🌬️ 풍속: <strong>{{ weatherData.wind.speed }}m/s</strong>
      </p>
    </div>

    <p v-else>아직 가져온 데이터가 없습니다. 버튼을 눌러 통신을 가동하세요.</p>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: var(--space-3);
  padding: var(--space-4);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  background: var(--color-background-soft);
}
.axios-error {
  margin-top: var(--space-3);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--color-danger-bg);
  color: var(--color-danger);
  font-size: var(--font-size-sm);
}
</style>
