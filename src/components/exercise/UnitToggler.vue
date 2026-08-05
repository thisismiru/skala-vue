<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()

const isCelsius = computed(() => configStore.unit === 'celsius')

const setCelsius = (wantCelsius) => {
  if (isCelsius.value !== wantCelsius) configStore.toggleUnit()
}
</script>

<template>
  <div class="unit-toggler" role="group" aria-label="온도 단위">
    <button
      type="button"
      class="unit-seg"
      :class="{ 'is-active': isCelsius }"
      :aria-pressed="isCelsius"
      @click="setCelsius(true)"
    >
      °C
    </button>
    <button
      type="button"
      class="unit-seg"
      :class="{ 'is-active': !isCelsius }"
      :aria-pressed="!isCelsius"
      @click="setCelsius(false)"
    >
      °F
    </button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  padding: 3px;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background: var(--glass-bg);
}

.unit-seg {
  width: 44px;
  padding: var(--space-1) 0;
  text-align: center;
  border: none;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition:
    background-color var(--duration) var(--ease),
    color var(--duration) var(--ease);
}

.unit-seg.is-active {
  background: rgba(255, 255, 255, 0.88);
  color: #14233c;
}

.plain-shell .unit-toggler {
  border-color: var(--color-border);
  background: var(--color-background-mute, #f1f1f1);
}

.plain-shell .unit-seg {
  color: var(--color-text-soft);
}

.plain-shell .unit-seg.is-active {
  background: #fff;
  color: var(--color-heading);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}
</style>
