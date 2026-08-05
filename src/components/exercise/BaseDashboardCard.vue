<template>
  <section class="card-box glass">
    <slot></slot>
  </section>
</template>

<style scoped>
.card-box {
  padding: var(--space-4);
}

/*
 * slot으로 주입된 콘텐츠는 부모 컴포넌트 스코프에 속하므로 일반 scoped 셀렉터로는 선택되지 않는다.
 * 마크업은 부모가 정하되 제목 스타일은 카드가 일관되게 책임지도록 :slotted()를 사용했다.
 */
.card-box :slotted(h3) {
  position: relative;
  margin-bottom: var(--space-3);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
}
</style>
