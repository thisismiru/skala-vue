<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import UnitToggler from '@/components/exercise/UnitToggler.vue'
import { useSky, SKY_PHASES } from '@/composables/useSky'

const route = useRoute()

const isPlain = computed(() => route.path.startsWith('/practices'))

const { phase } = useSky()

const themeOverrides = {
  Skeleton: {
    color: 'rgba(255, 255, 255, 0.12)',
    colorEnd: 'rgba(255, 255, 255, 0.24)',
  },
}
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div :class="isPlain ? 'plain-shell' : 'sky-shell'">
      <div v-if="!isPlain" class="sky-backdrop">
        <div
          v-for="skyPhase in SKY_PHASES"
          :key="skyPhase"
          class="sky-layer"
          :class="[`is-${skyPhase}`, { 'is-active': skyPhase === phase }]"
        ></div>
      </div>

      <header class="app-header">
        <h1 class="app-title">날씨 대시보드</h1>
        <nav class="app-nav">
          <RouterLink to="/">대시보드</RouterLink>
          <RouterLink to="/about">소개</RouterLink>
        </nav>
        <UnitToggler class="nav-unit" />
      </header>
      <main class="app-main">
        <RouterView />
      </main>
    </div>
  </n-config-provider>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4) 0;
  margin-bottom: var(--space-4);
}

.plain-shell .app-header {
  border-bottom: 1px solid var(--color-border-soft);
}

.app-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  letter-spacing: -0.01em;
  color: var(--color-heading);
}

.sky-shell .app-title {
  color: var(--text-primary);
  text-shadow: var(--text-shadow);
}

.app-nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  margin-left: auto;
}

.app-nav a {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-soft);
  transition:
    color var(--duration) var(--ease),
    background-color var(--duration) var(--ease);
}

.app-nav a:hover {
  color: var(--color-primary);
  text-decoration: none;
}

.app-nav a.router-link-exact-active {
  color: var(--color-primary);
  background: var(--color-background-mute, rgba(0, 0, 0, 0.06));
}

.sky-shell .app-nav a {
  color: var(--text-secondary);
  text-shadow: var(--text-shadow);
}

.sky-shell .app-nav a:hover {
  color: var(--text-primary);
  background: var(--glass-bg);
}

.sky-shell .app-nav a.router-link-exact-active {
  color: var(--text-primary);
  background: var(--glass-bg);
}

.nav-unit {
  flex-shrink: 0;
}
</style>
