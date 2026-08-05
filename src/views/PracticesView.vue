<script setup>
import AxiosJson from '@/components/practices/library/AxiosJson.vue'
import AxiosWeather from '@/components/practices/library/AxiosWeather.vue'
import StoreCounter from '@/components/practices/library/StoreCounter.vue'
import ElementPlusForm from '@/components/practices/library/ElementPlusForm.vue'
import ElementPlusCommerce from '@/components/practices/library/ElementPlusCommerce.vue'
import ElementPlusFeedback from '@/components/practices/library/ElementPlusFeedback.vue'

// 교재 Code Challenge 실습 컴포넌트를 이곳에 등록한다.
</script>

<template>
  <section class="practice-view">
    <h2>🧪 실습 컴포넌트</h2>
    <p class="practice-desc">교재 Code Challenge 결과물을 모아둔 페이지입니다.</p>

    <!-- 실습 컴포넌트가 여기에 추가됩니다 -->
    <StoreCounter />
    <AxiosWeather />
    <AxiosJson />
    <ElementPlusForm />
    <ElementPlusCommerce />
    <ElementPlusFeedback />
  </section>
</template>

<style scoped>
.practice-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.practice-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
}
</style>
