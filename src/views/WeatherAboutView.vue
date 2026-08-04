<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="about-view">
    <h2>ℹ️ 서비스 소개</h2>

    <p>본 앱은 Vue 3 및 Vue Router 기반으로 제작된 실습용 기상 관측 대시보드 시스템입니다.</p>

    <ul>
      <li><code>components/exercise/</code> 폴더 내부의 독립 부품 연동</li>
      <li>클라이언트 사이드 라우팅을 통한 새로고침 없는 화면 전환</li>
      <li>동적 경로 매칭(<code>/weather/:cityId</code>)을 활용한 지역별 상세 조회</li>
      <li>Catch-all Route를 통한 미정의 경로 예외 처리</li>
    </ul>

    <RouterLink to="/" class="home-link">대시보드 홈으로 이동</RouterLink>
  </section>
</template>

<style scoped>
.about-view {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.about-view ul {
  padding-left: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-soft);
}
.home-link {
  align-self: flex-start;
  padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
  font-size: var(--font-size-sm);
}
.home-link:hover {
  text-decoration: none;
  background: var(--color-primary);
  color: var(--color-text-inverse);
}
</style>
