<script setup>
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CITIES, REGIONS } from '@/constants/cities'
import { fetchWeatherList, toErrorMessage } from '@/api/weatherApi'
import { useLocalTime } from '@/composables/useLocalTime'
import { useSky } from '@/composables/useSky'
import { useStuck } from '@/composables/useStuck'
import { TriangleAlert, RotateCw } from 'lucide-vue-next'
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
import SearchBar from '@/components/exercise/SearchBar.vue'
import WeatherCard from '@/components/exercise/WeatherCard.vue'

const route = useRoute()
const router = useRouter()

const weatherList = ref([])
const isLoading = ref(false)
const errorMessage = ref('')
const failedCities = ref([])
const searchSentinel = ref(null)
const isSearchStuck = useStuck(searchSentinel)
const selectedRegion = ref('전체')

const searchQuery = ref(route.query.search ?? '')
watch(searchQuery, (newQuery) => {
  router.replace({
    query: newQuery ? { search: newQuery } : {},
  })
})

const selectedCityInfo = ref('카드에 마우스를 올리면 그 도시의 하늘로 바뀝니다')
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
  selectedCityInfo.value = `${city.name}의 하늘을 보는 중 · 현지 날씨 ${city.status}`
}

const goDetail = (cityId) => {
  router.push({ name: 'WeatherDetail', params: { cityId } })
}

const failedCityNames = computed(() => failedCities.value.map((f) => f.city.name).join(', '))

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()

  return weatherList.value.filter((city) => {
    const matchesName = city.name.includes(query)
    const matchesRegion = selectedRegion.value === '전체' || city.region === selectedRegion.value

    return matchesName && matchesRegion
  })
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

    if (results.every((r) => !r.ok)) {
      errorMessage.value = toErrorMessage(results[0].error)
    }
  } catch (error) {
    console.error('[WeatherHomeView] 날씨 조회 실패: ', error)
    errorMessage.value = toErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(loadWeather)
</script>

<template>
  <div class="weather-dashboard">
    <div ref="searchSentinel" class="search-sentinel" aria-hidden="true"></div>

    <BaseDashboardCard class="search-card" :class="{ 'is-condensed': isSearchStuck }">
      <h3>도시 검색</h3>
      <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
    </BaseDashboardCard>

    <BaseDashboardCard>
      <h3>지역별 날씨 현황</h3>

      <nav class="region-tabs" aria-label="지역 필터">
        <button
          v-for="region in REGIONS"
          :key="region"
          type="button"
          class="region-tab"
          :class="{ 'is-active': selectedRegion === region }"
          @click="selectedRegion = region"
        >
          {{ region }}
        </button>
      </nav>

      <p
        v-if="!isLoading && !errorMessage && failedCities.length > 0"
        class="failed-banner"
        role="alert"
      >
        <TriangleAlert :size="16" aria-hidden="true" />
        {{ failedCityNames }} 정보를 불러오지 못했습니다.
        <button class="retry-btn" @click="loadWeather">
          <RotateCw :size="14" aria-hidden="true" />
          다시 시도
        </button>
      </p>

      <div v-if="isLoading" class="city-grid" aria-label="날씨 정보 로딩 중">
        <div v-for="n in 10" :key="n" class="skeleton-card glass">
          <n-skeleton text :width="72" :height="18" :sharp="false" />
          <n-skeleton text :width="130" :height="46" :sharp="false" />
          <n-skeleton text width="100%" :height="14" :sharp="false" />
        </div>
      </div>

      <p v-else-if="errorMessage" class="state-message is-error">
        <TriangleAlert class="state-icon" :size="20" aria-hidden="true" />
        {{ errorMessage }}
        <button class="retry-btn" @click="loadWeather">
          <RotateCw :size="14" aria-hidden="true" />
          다시 시도
        </button>
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

      <p v-else class="state-message">
        {{ searchQuery ? `'${searchQuery}'와 일치하는` : '조건에 맞는' }} 도시가 없습니다.
      </p>
    </BaseDashboardCard>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>

<style scoped>
.weather-dashboard {
  overflow-anchor: none;
}

.weather-dashboard {
  position: relative;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-5);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.state-message.is-error {
  color: var(--temp-hot);
}

.state-icon {
  flex-shrink: 0;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  margin-left: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background: var(--glass-bg);
  color: var(--text-primary);
  font-size: var(--font-size-xs);
  cursor: pointer;
  transition: background-color var(--duration) var(--ease);
}

.retry-btn:hover {
  background: var(--glass-bg-hover);
}

.search-sentinel {
  position: absolute;
  top: 0;
  width: 100%;
  height: 1px;
}

.search-card {
  position: sticky;
  top: var(--space-3);
  z-index: 10;
  transition:
    padding var(--duration) var(--ease),
    box-shadow var(--duration) var(--ease);
}

.search-card.is-condensed {
  padding: var(--space-2) var(--space-4);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
}

.search-card.is-condensed h3 {
  display: none;
}

.search-card.is-condensed :deep(.search-echo) {
  display: none;
}

.region-tabs {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.region-tab {
  padding: var(--space-1) var(--space-3);
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  cursor: pointer;
  transition:
    color var(--duration) var(--ease),
    background-color var(--duration) var(--ease);
}

.region-tab:hover {
  color: var(--text-primary);
  background: var(--glass-bg);
}

.region-tab.is-active {
  background: rgba(255, 255, 255, 0.88);
  color: #14233c;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-3);
  min-height: 180px;
  padding: var(--space-4);
}

.skeleton-card :deep(.n-skeleton) {
  position: relative;
}

.failed-banner {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border: 1px solid rgba(255, 170, 120, 0.35);
  border-radius: var(--radius-md);
  background: rgba(180, 85, 70, 0.18);
  font-size: var(--font-size-sm);
  color: var(--text-primary);
}

.failed-banner .retry-btn {
  margin-left: auto;
}
</style>
