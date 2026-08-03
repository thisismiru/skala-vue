<script setup>
import { ref } from 'vue'
import ComponentLifeCycleHook from './ComponentLifeCycleHook.vue'

const isAlive = ref(true)
</script>

<template>
  <div class="practice-section">
    <h2>Lifecycle Hook</h2>

    <button @click="isAlive = !isAlive">
      {{ isAlive ? '🔴 실습 컴포넌트 파괴하기 (v-if=false)' : '🟢 다시 생성하기' }}
    </button>

    <ComponentLifeCycleHook v-if="isAlive" />
  </div>
</template>
