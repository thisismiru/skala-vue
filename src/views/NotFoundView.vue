<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <section class="notfound-view">
    <p class="notfound-icon">🌞❓</p>

    <h2>페이지를 찾을 수 없습니다.</h2>
    <p class="notfound-desc">
      요청하신 주소가 존재하지 않거나,<br />
      아직 개발되지 않았습니다.
    </p>

    <p class="notfound-path">
      요청 경로: <code>{{ route.path }}</code>
    </p>

    <RouterLink to="/" class="home-link" replace>날씨 메인으로 이동</RouterLink>
  </section>
</template>

<style scoped>
.notfound-view {
  max-width: 480px;
  margin: var(--space-7) auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  text-align: center;
}
.notfound-icon {
  font-size: var(--font-size-2xl);
}
.notfound-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
.notfound-path {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
.home-link {
  margin-top: var(--space-3);
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-text-inverse);
  font-size: var(--font-size-sm);
}
.home-link:hover {
  text-decoration: none;
  background: var(--color-primary-hover);
}
</style>
