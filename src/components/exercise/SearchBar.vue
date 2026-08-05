<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
  query: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update-query'])

const handleInput = (e) => {
  emit('update-query', e.target.value)
}
</script>

<template>
  <div>
    <div class="search-field">
      <Search class="search-icon" :size="18" aria-hidden="true" />
      <input
        type="text"
        class="search-input"
        placeholder="검색할 도시 이름 입력"
        :value="query"
        @input="handleInput"
      />
    </div>

    <p class="search-echo">검색 중인 도시: {{ query }}</p>
  </div>
</template>

<style scoped>
.search-field {
  position: relative;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: var(--space-3);
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--space-3);
  padding-left: calc(var(--space-3) + 18px + var(--space-2));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  background: rgba(10, 16, 32, 0.22);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  transition:
    border-color var(--duration) var(--ease),
    background-color var(--duration) var(--ease);
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.search-input:focus {
  outline: none;
  border-color: var(--text-primary);
  background: rgba(10, 16, 32, 0.32);
}

.search-echo {
  position: relative;
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
