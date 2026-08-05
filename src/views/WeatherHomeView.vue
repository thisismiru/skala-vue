<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CITIES } from '@/constants/cities'
import { fetchWeatherList } from '@/api/weatherApi'
import { useLocalTime } from '@/composables/useLocalTime'
import { useSky } from '@/composables/useSky'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const route = useRoute()
const router = useRouter()

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const failedCities = ref([])

const searchQuery = ref(route.query.search ?? '')
watch(searchQuery, (newQuery) => {
  router.replace({
    query: newQuery ? { search: newQuery } : {},
  })
})

const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요')
const selectedCityId = ref(null)

const viewerTimezone = -new Date().getTimezoneOffset() * 60

const selectedCity = computed(
  () => weatherList.value.find((city) => city.id === selectedCityId.value) ?? null,
)

const { phase: skyPhase } = useLocalTime(() => selectedCity.value ?? { timezone: viewerTimezone })

const { setPhase } = useSky()
watchEffect(() => setPhase(skyPhase.value))

const handleSelectedCard = (cityId) => {
  const city = weatherList.value.find((city) => city.id === cityId)
  if (!city) return

  selectedCityId.value = cityId
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
    const results = await fetchWeatherList(CITIES)
    weatherList.value = results.filter((r) => r.ok).map((r) => r.data)
    failedCities.value = results.filter((r) => !r.ok)
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

      <div v-else-if="filteredWeatherList.length > 0" class="city-grid">
        <WeatherCard
          v-for="city in filteredWeatherList"
          :key="city.id"
          :city-item="city"
          @select-card="handleSelectedCard"
          @click-detail="goDetail"
        />
      </div>

      <p v-else class="state-message">'{{ searchQuery }}'와 일치하는 도시가 없습니다.</p>
    </BaseDashboardCard>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>

<style scoped>
.weather-dashboard {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.status-bar {
  padding: var(--space-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  text-align: center;
}

.state-message {
  position: relative;
  padding: var(--space-5);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.state-message.is-error {
  color: var(--temp-hot);
}
</style>
