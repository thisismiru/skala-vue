<script setup>
import { ref, computed, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Droplets,
  Gauge,
  LoaderCircle,
  Sunrise,
  Sunset,
  Thermometer,
  TriangleAlert,
  Wind,
} from 'lucide-vue-next'
import { useConfigStore } from '@/stores/configStore'
import { findCityById } from '@/constants/cities'
import { fetchWeatherByCity, fetchForecast, toErrorMessage } from '@/api/weatherApi'
import { useLocalTime } from '@/composables/useLocalTime'
import { useSky } from '@/composables/useSky'
import { getWeatherIcon } from '@/utils/weatherIcon'
import ForecastChart from '@/components/exercise/ForecastChart.vue'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const cityDetail = ref(null)
const forecast = ref(null)
const isLoading = ref(false)
const isForecastLoading = ref(false)
const errorMessage = ref('')

const viewerTimezone = -new Date().getTimezoneOffset() * 60

const { timeLabel, phase } = useLocalTime(() => cityDetail.value ?? { timezone: viewerTimezone })

const { setPhase } = useSky()
watchEffect(() => setPhase(phase.value))

const loadDetail = async () => {
  const cityMeta = findCityById(route.params.cityId)

  if (!cityMeta) {
    errorMessage.value = `'${route.params.cityId}'에 해당하는 관측 정보가 없습니다.`
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  const forecastPromise = fetchForecast(cityMeta).catch(() => null)

  try {
    cityDetail.value = await fetchWeatherByCity(cityMeta)
  } catch (error) {
    console.error('[WeatherDetailView] 상세 조회 실패:', error)
    errorMessage.value = toErrorMessage(error)
  } finally {
    isLoading.value = false
  }

  isForecastLoading.value = true
  forecast.value = await forecastPromise
  isForecastLoading.value = false
}

onMounted(loadDetail)

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push({ name: 'WeatherHome' })
}

const iconUrl = computed(() => (cityDetail.value ? getWeatherIcon(cityDetail.value.icon) : null))

const displayTemp = computed(() =>
  cityDetail.value ? configStore.toDisplayTemp(cityDetail.value.temp) : null,
)
const displayFeelsLike = computed(() =>
  cityDetail.value ? configStore.toDisplayTemp(cityDetail.value.feelsLike) : null,
)
const forecastRange = computed(() => {
  if (!forecast.value) return null

  const temps = forecast.value.points.map((point) => point.temp)
  return {
    max: configStore.toDisplayTemp(Math.max(...temps)),
    min: configStore.toDisplayTemp(Math.min(...temps)),
  }
})

const tempLevel = computed(() => {
  if (!cityDetail.value) return 'mild'
  const celsius = cityDetail.value.temp

  if (celsius >= 30) return 'hot'
  if (celsius >= 22) return 'warm'
  if (celsius >= 14) return 'mild'
  if (celsius >= 6) return 'cool'
  return 'cold'
})

const pad = (n) => String(n).padStart(2, '0')

const toLocalClock = (utcSeconds) => {
  if (!cityDetail.value) return ''
  const date = new Date((utcSeconds + cityDetail.value.timezone) * 1000)
  return `${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`
}
</script>

<template>
  <section class="detail-view">
    <div class="detail-topbar">
      <button class="icon-btn" aria-label="이전 페이지로" @click="goBack">
        <ArrowLeft :size="24" aria-hidden="true" />
      </button>
      <button class="home-link" @click="goHome">메인 대시보드</button>
    </div>

    <p v-if="isLoading" class="detail-state">
      <LoaderCircle class="state-icon is-spinning" :size="20" aria-hidden="true" />
      관측 정보를 불러오는 중...
    </p>

    <p v-else-if="errorMessage" class="detail-state is-error">
      <TriangleAlert :size="20" aria-hidden="true" />
      {{ errorMessage }}
    </p>

    <template v-else-if="cityDetail">
      <header class="detail-hero">
        <h2 class="hero-name">{{ cityDetail.name }}</h2>
        <p class="hero-time">현지 시각 {{ timeLabel }}</p>

        <div class="hero-main">
          <img class="hero-glyph" :src="iconUrl" :alt="cityDetail.status" />
          <p class="hero-temp" :class="`is-${tempLevel}`">
            {{ displayTemp }}<span class="hero-unit">{{ configStore.unitSymbol }}</span>
          </p>
        </div>

        <p class="hero-status">
          {{ cityDetail.status }}
          <template v-if="forecastRange">
            · 최고 {{ forecastRange.max }}° 최저 {{ forecastRange.min }}°
          </template>
        </p>
      </header>

      <div class="detail-grid">
        <article v-if="forecast || isForecastLoading" class="detail-tile glass is-wide">
          <h3 class="tile-label">24시간 예보</h3>
          <ForecastChart v-if="forecast" :points="forecast.points" :timezone="forecast.timezone" />
          <n-skeleton v-else text width="100%" :height="200" :sharp="false" />
        </article>

        <article class="detail-tile glass">
          <h3 class="tile-label"><Thermometer :size="14" aria-hidden="true" /> 체감 온도</h3>
          <p class="tile-value">{{ displayFeelsLike }}{{ configStore.unitSymbol }}</p>
          <p class="tile-note">실제 {{ displayTemp }}{{ configStore.unitSymbol }}</p>
        </article>

        <article class="detail-tile glass">
          <h3 class="tile-label"><Droplets :size="14" aria-hidden="true" /> 습도</h3>
          <p class="tile-value">{{ cityDetail.humidity }}%</p>
        </article>

        <article class="detail-tile glass">
          <h3 class="tile-label"><Wind :size="14" aria-hidden="true" /> 풍속</h3>
          <p class="tile-value">{{ cityDetail.windSpeed }}<span class="tile-unit">m/s</span></p>
        </article>

        <article class="detail-tile glass">
          <h3 class="tile-label"><Gauge :size="14" aria-hidden="true" /> 기압</h3>
          <p class="tile-value">{{ cityDetail.pressure }}<span class="tile-unit">hPa</span></p>
        </article>

        <article class="detail-tile glass">
          <h3 class="tile-label"><Sunrise :size="14" aria-hidden="true" /> 일출</h3>
          <p class="tile-value">{{ toLocalClock(cityDetail.sunrise) }}</p>
        </article>

        <article class="detail-tile glass">
          <h3 class="tile-label"><Sunset :size="14" aria-hidden="true" /> 일몰</h3>
          <p class="tile-value">{{ toLocalClock(cityDetail.sunset) }}</p>
        </article>
      </div>
    </template>
  </section>
</template>

<style scoped>
.detail-view {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.detail-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background: var(--glass-bg);
  color: var(--text-primary);
  cursor: pointer;
  transition: background-color var(--duration) var(--ease);
}

.icon-btn:hover {
  background: var(--glass-bg-hover);
}

.home-link {
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

.home-link:hover {
  color: var(--text-primary);
  background: var(--glass-bg);
}

.detail-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  text-align: center;
}

.hero-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
}

.hero-time {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
}

.hero-main {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.hero-glyph {
  width: 96px;
  height: 96px;
  margin: -12px;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.2));
}

.hero-temp {
  font-size: clamp(64px, 12vw, 96px);
  font-weight: 200;
  letter-spacing: -0.04em;
  line-height: 1.05;
  font-variant-numeric: tabular-nums;
}

.hero-temp.is-hot {
  color: var(--temp-hot);
}

.hero-temp.is-warm {
  color: var(--temp-warm);
}

.hero-temp.is-mild {
  color: var(--temp-mild);
}

.hero-temp.is-cool {
  color: var(--temp-cool);
}

.hero-temp.is-cold {
  color: var(--temp-cold);
}

.hero-unit {
  margin-left: 2px;
  font-size: 0.35em;
  vertical-align: super;
}

.hero-status {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--space-3);
}

.detail-tile {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
}

.detail-tile.is-wide {
  grid-column: 1 / -1;
}

.tile-label {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
  color: var(--text-secondary);
}

.tile-value {
  position: relative;
  font-size: 28px;
  font-weight: 300;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.tile-unit {
  margin-left: 2px;
  font-size: 0.5em;
  color: var(--text-secondary);
}

.tile-note {
  position: relative;
  margin-top: auto;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.detail-state {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: var(--space-5);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}

.detail-state.is-error {
  color: var(--temp-hot);
}

.state-icon.is-spinning {
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
