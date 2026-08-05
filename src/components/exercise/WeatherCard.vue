<script setup>
import { computed } from 'vue'
import { useConfigStore } from '@/stores/configStore'
import { useLocalTime } from '@/composables/useLocalTime'

const props = defineProps({
  cityItem: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['select-card', 'click-detail'])

const configStore = useConfigStore()

const { timeLabel, phase } = useLocalTime(() => props.cityItem)

const displayTemp = computed(() => configStore.toDisplayTemp(props.cityItem.temp))

const tempLevel = computed(() => {
  const celsius = props.cityItem.temp

  if (celsius >= 30) return 'hot'
  if (celsius >= 22) return 'warm'
  if (celsius >= 14) return 'mild'
  if (celsius >= 6) return 'cool'
  return 'cold'
})
</script>

<template>
  <article
    class="weather-card glass"
    :class="`is-${phase}`"
    @click="emit('select-card', cityItem.id)"
  >
    <header class="card-head">
      <h4 class="city-name">{{ cityItem.name }}</h4>
      <p class="city-time text-secondary">{{ timeLabel }}</p>
    </header>

    <p class="city-temp" :class="`is-${tempLevel}`">
      {{ displayTemp }}<span class="temp-unit">{{ configStore.unitSymbol }}</span>
    </p>

    <footer class="card-foot">
      <span class="city-status text-secondary">{{ cityItem.status }}</span>
      <button class="detail-btn" @click.stop="emit('click-detail', cityItem.id)">상세보기</button>
    </footer>
  </article>
</template>

<style scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  cursor: pointer;
  background: var(--card-tint, var(--glass-bg));
  border-color: var(--card-edge, var(--glass-border));
  transition:
    background-color var(--duration-slow) var(--ease),
    border-color var(--duration-slow) var(--ease),
    transform var(--duration) var(--ease),
    box-shadow var(--duration) var(--ease);
}

.weather-card.is-dawn {
  --card-tint: rgba(150, 110, 140, 0.24);
  --card-tint-hover: rgba(150, 110, 140, 0.34);
  --card-edge: rgba(255, 210, 200, 0.3);
}

.weather-card.is-morning {
  --card-tint: rgba(255, 235, 200, 0.2);
  --card-tint-hover: rgba(255, 235, 200, 0.3);
  --card-edge: rgba(255, 245, 220, 0.34);
}

.weather-card.is-day {
  --card-tint: rgba(255, 255, 255, 0.16);
  --card-tint-hover: rgba(255, 255, 255, 0.26);
  --card-edge: rgba(255, 255, 255, 0.3);
}

.weather-card.is-sunset {
  --card-tint: rgba(180, 85, 70, 0.26);
  --card-tint-hover: rgba(180, 85, 70, 0.36);
  --card-edge: rgba(255, 180, 140, 0.32);
}

.weather-card.is-night {
  --card-tint: rgba(16, 24, 52, 0.34);
  --card-tint-hover: rgba(16, 24, 52, 0.44);
  --card-edge: rgba(160, 180, 230, 0.24);
}

.weather-card:hover {
  background: var(--card-tint-hover, var(--glass-bg-hover));
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
}

.weather-card:active {
  transform: scale(0.98);
}

.card-head {
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-2);
}

.city-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
}

.city-time {
  font-size: var(--font-size-sm);
  font-variant-numeric: tabular-nums;
}

.city-temp {
  position: relative;
  font-size: clamp(40px, 7vw, 56px);
  font-weight: 200;
  letter-spacing: -0.04em;
  line-height: 1.1;
}

.city-temp.is-hot {
  color: var(--temp-hot);
}

.city-temp.is-warm {
  color: var(--temp-warm);
}

.city-temp.is-mild {
  color: var(--temp-mild);
}

.city-temp.is-cool {
  color: var(--temp-cool);
}

.city-temp.is-cold {
  color: var(--temp-cold);
}

.temp-unit {
  margin-left: 2px;
  font-size: 0.4em;
  color: inherit;
  vertical-align: super;
}

.card-foot {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-top: auto;
}

.city-status {
  font-size: var(--font-size-sm);
}

.detail-btn {
  flex-shrink: 0;
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-full);
  background: transparent;
  font-size: var(--font-size-xs);
  color: var(--text-secondary);
  cursor: pointer;
  transition:
    color var(--duration) var(--ease),
    background-color var(--duration) var(--ease);
}

.detail-btn:hover {
  color: var(--text-primary);
  background: var(--glass-bg-hover);
}
</style>
