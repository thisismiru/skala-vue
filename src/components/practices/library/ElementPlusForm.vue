<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const userForm = ref({
  email: '',
  agree: false,
})

const handleRegister = () => {
  if (!userForm.value.email.includes('@')) {
    ElMessage.error('❌ 올바른 이메일 형식이 아닙니다.')
    return
  }
  if (!userForm.value.agree) {
    ElMessage.warning('⚠️ 이용약관에 동의하셔야 합니다.')
    return
  }
  ElMessage.success('🎉 가입 신청이 정상적으로 완료되었습니다!')
}
</script>

<template>
  <el-card shadow="hover" class="practice-card">
    <template #header>
      <span class="card-header">📝 실습 1. 회원가입 Form &amp; 인풋 제어</span>
    </template>

    <div class="form-row">
      <label class="form-label">이메일 주소:</label>
      <el-input v-model="userForm.email" placeholder="example@email.com" clearable />
    </div>

    <div class="form-row">
      <el-switch v-model="userForm.agree" />
      <span>개인정보 수집 및 필수 이용약관에 동의합니다.</span>
    </div>

    <el-button type="success" class="submit-btn" @click="handleRegister">
      🔗 회원가입하기
    </el-button>
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
.submit-btn {
  width: 100%;
}
</style>
