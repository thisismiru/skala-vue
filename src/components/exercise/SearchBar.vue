<script setup>
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
    <input
      type="text"
      class="search-input"
      placeholder="검색할 도시 이름 입력"
      :value="query"
      @input="handleInput"
    />

    <p class="search-echo">검색 중인 도시: {{ query }}</p>
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
  padding: var(--space-3);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  color: var(--text-primary);
  font-size: var(--font-size-base);
  transition:
    border-color var(--duration) var(--ease),
    background-color var(--duration) var(--ease);
}

.search-input::placeholder {
  color: var(--text-tertiary);
}

.search-input:focus {
  outline: none;
  border-color: var(--text-primary);
  background: var(--glass-bg-hover);
}

.search-echo {
  position: relative;
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
}
</style>
