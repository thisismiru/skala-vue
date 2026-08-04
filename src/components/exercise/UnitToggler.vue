<script setup>
import { useConfigStore } from '@/stores/configStore.js'

const configStore = useConfigStore()
</script>

<template>
  <div class="unit-toggler">
    <span class="unit-label">
      날씨 단위:
      {{ configStore.unit === 'celsius' ? '섭씨' : '화씨' }}({{ configStore.unitSymbol }})
    </span>
    <button class="unit-btn" @click="configStore.toggleUnit">단위 변경</button>
  </div>
</template>

<style scoped>
.unit-toggler {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.unit-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
.unit-btn {
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
}
</style>
