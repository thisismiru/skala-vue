<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/configStore'

const route = useRoute()
const router = useRouter()
const configStore = useConfigStore()

const CITY_DETAIL_LIST = [
  {
    id: 'city_01',
    name: '서울',
    region: '대한민국 서울특별시',
    temp: 28,
    status: '맑음',
    humidity: 55,
    wind: 2.5,
  },
  {
    id: 'city_02',
    name: '수원',
    region: '대한민국 경기도 수원시',
    temp: 24,
    status: '비',
    humidity: 82,
    wind: 3.1,
  },
  {
    id: 'city_03',
    name: '부산',
    region: '대한민국 부산광역시',
    temp: 26,
    status: '구름',
    humidity: 68,
    wind: 4.2,
  },
]

const cityDetail = ref(null)

onMounted(() => {
  const cityId = route.params.cityId
  cityDetail.value = CITY_DETAIL_LIST.find((city) => city.id === cityId) ?? null
})

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

    <dl v-if="cityDetail" class="detail-list">
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
        <dd>{{ cityDetail.wind }}m/s</dd>
      </div>
    </dl>

    <p v-else class="detail-empty">'{{ route.params.cityId }}'에 해당하는 관측 정보가 없습니다.</p>

    <button @click="goBack">← 이전 페이지로 돌아가기</button>
    <button @click="goHome">← 메인 대시보드로 돌아가기</button>
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
.detail-empty {
  padding: var(--space-5);
  text-align: center;
  color: var(--color-danger);
}
.detail-actions {
  display: flex;
  gap: var(--space-2);
}
</style>
