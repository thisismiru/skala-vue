<script setup>
import { computed } from 'vue'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const HOT_THRESHOLD = 25
const isHot = computed(() => props.cityItem.temp >= HOT_THRESHOLD)
</script>

<template>
  <div class="weather-card" @click="emit('select-card', cityItem.id)">
    <div class="card-info">
      <p class="city-name">{{ cityItem.name }} ({{ cityItem.status }})</p>
      <p class="city-temp">현재 기온: {{ cityItem.temp }}°C</p>

      <span v-if="isHot" class="badge badge-hot">🔥 더움 ({{ HOT_THRESHOLD }}도 이상)</span>
      <span v-else class="badge badge-cool">❄️ 선선함 ({{ HOT_THRESHOLD }}도 미만)</span>
    </div>

    <button class="detail-btn" @click.stop="emit('click-detail', cityItem.id)">상세보기</button>
  </div>
</template>

<style scoped>
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
</style>
