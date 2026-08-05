<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CITIES } from '@/constants/cities'
import { fetchWeatherList } from '@/api/weatherApi'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const route = useRoute()
const router = useRouter()

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')

const searchQuery = ref(route.query.search ?? '')
watch(searchQuery, (newQuery) => {
  router.replace({
    query: newQuery ? { search: newQuery } : {},
  })
})

const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요')

const handleSelectedCard = (cityId) => {
  const city = weatherList.value.find((city) => city.id === cityId)
  if (!city) return

  selectedCityInfo.value = `${city.name}이 선택되었습니다.`
}

const goDetail = (cityId) => {
  router.push({ name: 'WeatherDetail', params: { cityId } })
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

const loadWeather = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    weatherList.value = await fetchWeatherList(CITIES)
  } catch (error) {
    console.error('[WeatherHomeView] 날씨 조회 실패: ', error)
    errorMessage.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadWeather)
</script>

<template>
  <div class="weather-dashboard">
    <BaseDashboardCard>
      <h3>🔍 도시 검색</h3>
      <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>🗺️ 지역별 날씨 현황</h3>

      <p v-if="isLoading" class="state-message">⏳ 날씨정보를 불러오는 중...</p>

      <p v-else-if="errorMessage" class="state-message is-error">
        ⚠️ {{ errorMessage }}
        <button @click="loadWeather">다시 시도</button>
      </p>

      <template v-else-if="filteredWeatherList.length > 0">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city-item="city"
          @select-card="handleSelectedCard"
          @click-detail="goDetail"
        />
      </template>
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

.status-bar {
  padding: var(--space-3);
  border-radius: var(--radius-md);
  background: var(--color-success-bg);
  color: var(--color-success);
  font-size: var(--font-size-sm);
  text-align: center;
}

.state-message {
  padding: var(--space-5);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
.state-message.is-error {
  color: var(--color-danger);
}
</style>
