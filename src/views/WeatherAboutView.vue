<script setup>
import { RouterLink } from 'vue-router'
import { CloudSun, Clock, Database, Layers } from 'lucide-vue-next'
</script>

<template>
  <section class="about-view">
    <header class="about-hero">
      <h2 class="about-title">세계의 하늘을 한 화면에</h2>
      <p class="about-lead">
        세계 10개 도시의 실시간 날씨와 현지 시각, 24시간 예보를 보여주는 대시보드입니다. 카드에
        마우스를 올리면 배경이 그 도시의 하늘로 바뀝니다.
      </p>
    </header>

    <div class="about-grid">
      <article class="about-tile glass">
        <h3 class="tile-label"><CloudSun :size="14" aria-hidden="true" /> 실시간 관측</h3>
        <p class="tile-text">
          OpenWeather API로 10개 도시를 병렬 조회합니다. 일부 도시가 실패해도 나머지는 정상
          표시되고, 실패한 도시만 개별 안내합니다.
        </p>
      </article>

      <article class="about-tile glass">
        <h3 class="tile-label"><Clock :size="14" aria-hidden="true" /> 시간대 연동</h3>
        <p class="tile-text">
          도시별 현지 시각을 1분 단위로 갱신하고, 일출·일몰 시각 기준으로 새벽·아침·낮·노을·밤 5단계
          하늘을 판정해 카드와 배경에 반영합니다.
        </p>
      </article>

      <article class="about-tile glass">
        <h3 class="tile-label"><Database :size="14" aria-hidden="true" /> 캐시 정책</h3>
        <p class="tile-text">
          현재 날씨 10분, 예보 30분 동안 브라우저에 캐시합니다. 무료 호출 한도(분당 60회)를 보호하고
          재방문 시 즉시 표시됩니다.
        </p>
      </article>

      <article class="about-tile glass">
        <h3 class="tile-label"><Layers :size="14" aria-hidden="true" /> 기술 스택</h3>
        <p class="tile-text">
          Vue 3 · Vite · Pinia · Vue Router · Axios · ApexCharts · Naive UI · Lucide · Meteocons ·
          Element Plus(실습)
        </p>
      </article>
    </div>

    <footer class="about-foot">
      <p class="about-credit">데이터 출처: OpenWeather · SKALA Vue.js 실습 프로젝트</p>
      <RouterLink to="/" class="home-link">대시보드 홈으로</RouterLink>
    </footer>
  </section>
</template>

<style scoped>
.about-view {
  max-width: 760px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.about-hero {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  text-align: center;
}

.about-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
}

.about-lead {
  max-width: 520px;
  margin: 0 auto;
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  line-height: 1.6;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-3);
}

.about-tile {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
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

.tile-text {
  position: relative;
  font-size: var(--font-size-sm);
  color: var(--text-primary);
  line-height: 1.6;
}

.about-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.about-credit {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.home-link {
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background: var(--glass-bg);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
  transition: background-color var(--duration) var(--ease);
}

.home-link:hover {
  text-decoration: none;
  background: var(--glass-bg-hover);
}
</style>
