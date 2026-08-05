<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { CloudOff } from 'lucide-vue-next'

const route = useRoute()
</script>

<template>
  <section class="notfound-view">
    <CloudOff class="notfound-icon" :size="64" aria-hidden="true" />

    <h2 class="notfound-title">페이지를 찾을 수 없습니다</h2>
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
  color: var(--text-secondary);
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
}

.notfound-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
}

.notfound-desc {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  line-height: 1.6;
}

.notfound-path {
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background: var(--glass-bg);
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
}

.notfound-path code {
  color: var(--text-primary);
}

.home-link {
  margin-top: var(--space-3);
  padding: var(--space-2) var(--space-5);
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
