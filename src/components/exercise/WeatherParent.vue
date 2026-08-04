<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요')

const handleSelectedCard = (cityId) => {
  const city = weatherList.value.find((c) => c.id === cityId)
  selectedCityInfo.value = `${city.name}이 선택되었습니다.`
}

const showDetail = (cityId) => {
  const city = weatherList.value.find((c) => c.id === cityId)
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  return weatherList.value.filter((city) => city.name.includes(query))
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`👁️ [watch 감지] 상태 바 문구 변경: "${oldValue}" -> "${newValue}"`)
})

watchEffect(() => {
  console.log(`🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'로 필터링합니다.`)
})
</script>

<template>
  <div class="weather-dashboard">
    <h2 class="dashboard-title">🌤️ 과제 3: 날씨 (컴포넌트)</h2>

    <BaseDashboardCard>
      <h3>🔍 도시 검색</h3>
      <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🗺️ 지역별 날씨 현황</h3>
      <template v-if="filteredWeatherList.length > 0">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city-item="city"
          @select-card="handleSelectedCard"
          @click-detail="showDetail"
        />
      </template>
      <p v-else class="empty-message">'{{ searchQuery }}'와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>

<style scoped>
.weather-dashboard {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.dashboard-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
}

.status-bar {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-success-bg);
  color: var(--color-success);
  font-size: var(--font-size-sm);
  text-align: center;
}

.empty-message {
  padding: var(--space-5);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
