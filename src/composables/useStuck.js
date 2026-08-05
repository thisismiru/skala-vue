import { ref, watchEffect, onBeforeUnmount } from 'vue'

export const useStuck = (targetRef) => {
  const isStuck = ref(false)
  let observer = null

  watchEffect(
    () => {
      observer?.disconnect()
      observer = null

      const el = targetRef.value
      if (!el) return

      observer = new IntersectionObserver(([entry]) => {
        isStuck.value = !entry.isIntersecting
      })
      observer.observe(el)
    },
    { flush: 'post' },
  )

  onBeforeUnmount(() => observer?.disconnect())

  return isStuck
}
