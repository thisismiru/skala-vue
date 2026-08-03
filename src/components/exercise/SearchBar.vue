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
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-base);
  transition: border-color var(--duration) var(--ease);
}
.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-focus);
}
.search-echo {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
