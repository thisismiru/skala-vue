<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'
import { findCityById } from '@/constants/cities'
import { fetchWeatherByCity } from '@/api/weatherApi'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const cityDetail = ref(null)
const isLoading = ref(false)
const errorMessage = ref('')

const loadDetail = async () => {
  const cityMeta = findCityById(route.params.cityId)

  if (!cityMeta) {
    errorMessage.value = `'${route.params.cityId}'에 해당하는 관측 정보가 없습니다.`
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    cityDetail.value = await fetchWeatherByCity(cityMeta)
  } catch (error) {
    console.error('[WeatherDetailView] 상세 조회 실패:', error)
    errorMessage.value = '날씨 정보를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadDetail)

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push({ name: 'WeatherHome' })
}

const displayTemp = computed(() =>
  cityDetail.value ? configStore.toDisplayTemp(cityDetail.value.temp) : null,
)
</script>

<template>
  <section class="detail-view">
    <h2>📊 지역별 상세 기상 관측 정보</h2>

    <p v-if="isLoading" class="detail-state">⏳ 관측 정보를 불러오는 중...</p>

    <p v-else-if="errorMessage" class="detail-state is-error">⚠️ {{ errorMessage }}</p>

    <dl v-else-if="cityDetail" class="detail-list">
      <div>
        <dt>📍 지정 지역</dt>
        <dd>{{ cityDetail.region }}</dd>
      </div>
      <div>
        <dt>실시간 기온</dt>
        <dd>{{ displayTemp }}{{ configStore.unitSymbol }}</dd>
      </div>
      <div>
        <dt>기상 현황</dt>
        <dd>{{ cityDetail.status }}</dd>
      </div>
      <div>
        <dt>대기 습도</dt>
        <dd>{{ cityDetail.humidity }}%</dd>
      </div>
      <div>
        <dt>현재 풍속</dt>
        <dd>{{ cityDetail.windSpeed }}m/s</dd>
      </div>
    </dl>

    <div class="detail-actions">
      <button @click="goBack">← 이전 페이지로 돌아가기</button>
      <button @click="goHome">🏠 메인 대시보드로 돌아가기</button>
    </div>
  </section>
</template>

<style scoped>
.detail-view {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.detail-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
}
.detail-list > div {
  display: flex;
  gap: var(--space-3);
}
.detail-list dt {
  min-width: 96px;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}
.detail-state {
  padding: var(--space-5);
  text-align: center;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
.detail-state.is-error {
  color: var(--color-danger);
}
.detail-actions {
  display: flex;
  gap: var(--space-2);
}
</style>
