<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const downloadProgress = ref(0)
const isDownloading = ref(false)
const isCompleted = computed(() => downloadProgress.value >= 100)
const progressStatus = computed(() => (isCompleted.value ? 'success' : ''))
let timerId = null

const confirmDelete = () => {
  ElMessageBox.confirm('서버에서 해당 파일을 영구히 삭제하시겠습니까?', '🔥 최종 경고', {
    confirmButtonText: '네, 삭제합니다',
    cancelButtonText: '취소',
    type: 'warning',
  })
    .then(() => {
      downloadProgress.value = 0
      ElMessage.success('🗑️ 파일이 안전하게 파쇄되었습니다.')
    })
    .catch(() => {
      ElMessage.info('❌ 삭제 작업이 취소되었습니다.')
    })
}

const startDownload = () => {
  if (isDownloading.value) return

  isDownloading.value = true
  downloadProgress.value = 0

  timerId = setInterval(() => {
    downloadProgress.value += 20

    if (downloadProgress.value >= 100) {
      clearInterval(timerId)
      timerId = null
      isDownloading.value = false
      ElMessage.success('💾 대용량 데이터 로드가 완료되었습니다!')
    }
  }, 400)
}

onUnmounted(() => {
  clearInterval(timerId)
})
</script>

<template>
  <el-card shadow="hover" class="practice-card">
    <template #header>
      <span class="card-header">⚙️ 실습 3. 시스템 피드백 &amp; 프로그레스 인터랙션</span>
    </template>

    <div class="button-row">
      <el-button type="danger" plain @click="confirmDelete">🗑 서버 파일 삭제 테스트</el-button>
      <el-button
        type="primary"
        :loading="isDownloading"
        :disabled="isCompleted"
        @click="startDownload"
      >
        💾 데이터 동기화 시작
      </el-button>
    </div>

    <el-progress :percentage="downloadProgress" :stroke-width="12" :status="progressStatus" />
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
.button-row {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}
</style>
