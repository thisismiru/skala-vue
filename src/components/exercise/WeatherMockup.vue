<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchQuery = ref('')

const selectedCityInfo = ref('카드를 클릭하거나 검색해 보세요')
const handleCardClick = (cityName) => {
  selectedCityInfo.value = `${cityName}이 선택되었습니다.`
}

const showDetail = (cityName, status) => {
  window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const handleSearchInput = (e) => {
  searchQuery.value = e.target.value
}

const filteredWeatherList = computed(() => {
  return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

watch(selectedCityInfo, (newValue, oldValue) => {
  console.log(`👁️ [watch 감지] 상태 바 문구 변경: "${oldValue}" -> "${newValue}"`)
})

watchEffect(() => {
  console.log(`🤖 [watchEffect 자동 호출] 현재 검색어 '${searchQuery.value}'로 필터링합니다.`)
})
</script>

<template>
  <div class="weather-mockup">
    <h2>🌤️ 과제 2: 날씨 (컴포지션)</h2>

    <section class="card-box">
      <h3>🔍 도시 검색</h3>

      <input
        type="text"
        class="search-input"
        placeholder="검색할 도시 이름 입력"
        :value="searchQuery"
        @input="handleSearchInput"
      />

      <p class="search-echo">검색 중인 도시: {{ searchQuery }}</p>
    </section>

    <section class="card-box">
      <h3>🗺️ 지역별 날씨 현황</h3>

      <template v-if="filteredWeatherList.length > 0">
        <div
          v-for="city in filteredWeatherList"
          :key="city.id"
          class="weather-card"
          @click="handleCardClick(city.name)"
        >
          <div class="card-info">
            <p class="city-name">{{ city.name }} {{ city.status }}</p>
            <p class="city-temp">현재 기온: {{ city.temp }}°C</p>

            <span v-if="city.temp >= 25" class="badge badge-hot">🔥 더움 (25도 이상)</span>
            <span v-else class="badge badge-cool">❄️ 선선함 (25도 미만)</span>
          </div>

          <button class="detail-btn" @click.stop="showDetail(city.name, city.status)">
            상세보기
          </button>
        </div>
      </template>
      <p v-else class="empty-message">'{{ searchQuery }}'와 일치하는 도시가 없습니다.</p>
    </section>

    <p class="status-bar">{{ selectedCityInfo }}</p>
  </div>
</template>

<style scoped>
.weather-mockup {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.weather-mockup h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
}

.card-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  padding: var(--space-4);
}
.card-box h3 {
  margin-bottom: var(--space-3);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-soft);
}

.search-input {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  transition: border-color var(--duration) var(--ease);
}
.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}
.search-echo {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.weather-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition:
    background-color var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
}
.weather-card + .weather-card {
  margin-top: var(--space-3);
}
.weather-card:hover {
  background: var(--color-background-soft);
  border-color: var(--color-border-hover);
}
.city-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-heading);
}
.city-temp {
  margin-top: var(--space-1);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}

.badge {
  display: inline-block;
  margin-top: var(--space-2);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}
.badge-hot {
  color: var(--color-warm);
  background: var(--color-warm-bg);
}
.badge-cool {
  color: var(--color-cool);
  background: var(--color-cool-bg);
}

.detail-btn {
  flex-shrink: 0;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-size: var(--font-size-sm);
  color: var(--color-text-soft);
  cursor: pointer;
  transition:
    color var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
}
.detail-btn:hover {
  color: var(--color-primary);
  border-color: var(--color-primary-border);
  background: var(--color-primary-soft);
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
