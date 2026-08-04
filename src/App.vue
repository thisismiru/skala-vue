<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">🌤️ 과제 4: 라우터 적용</h1>
    <nav class="app-nav">
      <RouterLink to="/">🗺️ 날씨 대시보드</RouterLink>
      <span class="nav-divider">|</span>
      <RouterLink to="/about">ℹ️ 서비스 소개</RouterLink>
      <span class="nav-divider">|</span>
      <RouterLink to="/practices">🧪 실습</RouterLink>
    </nav>
  </header>
  <main class="app-main">
    <RouterView />
  </main>
</template>

<style scoped>
.app-header {
  padding-bottom: var(--space-4);
  margin-bottom: var(--space-5);
  border-bottom: 1px solid var(--color-border-soft);
}

.app-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-heading);
  text-align: center;
}

.app-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
}

.app-nav a {
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-soft);
  border-bottom: 2px solid transparent;
  transition:
    color var(--duration) var(--ease),
    border-color var(--duration) var(--ease);
}

.app-nav a:hover {
  color: var(--color-primary);
  text-decoration: none;
}

.app-nav a.router-link-exact-active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}

.nav-divider {
  color: var(--color-border);
}
</style>
