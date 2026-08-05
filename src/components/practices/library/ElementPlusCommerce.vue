<script setup>
import { ref } from 'vue'

const productQuantity = ref(1)
const productRate = ref(4)
</script>

<template>
  <el-card shadow="hover" class="practice-card">
    <template #header>
      <span class="card-header">🛒 실습 2. 커머스 상품 수량 및 평점 시스템</span>
    </template>

    <div class="form-row">
      <label class="form-label">구매 수량 선택:</label>
      <el-input-number v-model="productQuantity" :min="1" :max="10" />
      <span class="hint">(최대 10개 구매 가능)</span>
    </div>

    <div class="form-row">
      <label class="form-label">상품 만족도 별점:</label>
      <el-rate v-model="productRate" show-score score-template="{value} 점" />
    </div>

    <div class="summary">
      🟢 실시간 장부 요약: 선택 수량 {{ productQuantity }}개 / 내가 준 점수 {{ productRate }}점
    </div>
  </el-card>
</template>

<style scoped>
.practice-card {
  max-width: 560px;
  margin: 0 auto;
}
.card-header {
  font-weight: var(--font-weight-medium);
}
.form-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
.form-label {
  flex-shrink: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-soft);
}
.hint {
  font-size: var(--font-size-xs);
  color: var(--color-text-muted);
}
.summary {
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  background: var(--color-background-soft);
  font-size: var(--font-size-sm);
  color: var(--color-text-soft);
}
</style>
