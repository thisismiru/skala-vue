<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts'

const items = ref([])
const textInput = ref('')
const isLoading = ref(false)

const handleRead = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(BASE_URL, { params: { _limit: 3 } })
    items.value = response.data
    console.log('GET 성공:', response.data)
  } catch (error) {
    console.error('GET 실패:', error)
  } finally {
    isLoading.value = false
  }
}

const handleCreate = async () => {
  if (!textInput.value.trim()) return

  try {
    // 두 번째 인자가 요청 본문(body)이다.
    const response = await axios.post(BASE_URL, {
      title: textInput.value,
      body: '실습용 본문',
      userId: 1,
    })
    console.log('POST 성공:', response.data)

    // 가짜 서버라 실제 저장은 안 되므로 화면 목록에 직접 추가한다.
    items.value.unshift(response.data)
    textInput.value = ''
  } catch (error) {
    console.error('POST 실패:', error)
  }
}

const handleUpdate = async (item) => {
  try {
    const response = await axios.put(`${BASE_URL}/${item.id}`, {
      title: `${item.title} (수정됨)`,
      body: item.body,
    })
    console.log('PUT 성공:', response.data)

    const index = items.value.findIndex((i) => i.id === item.id)
    items.value[index] = { ...item, title: response.data.title }
  } catch (error) {
    console.error('PUT 실패:', error)
  }
}

const handleDelete = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    console.log('DELETE 성공: id', id)

    items.value = items.value.filter((item) => item.id !== id)
  } catch (error) {
    console.error('DELETE 실패:', error)
  }
}

onMounted(handleRead)
</script>

<template>
  <div class="practice-section">
    <h2>⚡ Axios CRUD 프로토타입 훈련</h2>

    <div class="crud-form">
      <input
        v-model="textInput"
        class="crud-input"
        placeholder="저장할 텍스트를 입력하세요"
        @keyup.enter="handleCreate"
      />
      <button @click="handleCreate">POST (추가)</button>
    </div>

    <p v-if="isLoading">불러오는 중...</p>

    <ul v-else class="crud-list">
      <li v-for="item in items" :key="item.id" class="crud-item">
        <div class="crud-text">
          <small>ID: {{ item.id }}</small>
          <p>{{ item.title }}</p>
        </div>
        <div class="crud-actions">
          <button @click="handleUpdate(item)">PUT (수정)</button>
          <button @click="handleDelete(item.id)">DEL (삭제)</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.crud-form {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
.crud-input {
  flex: 1;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-sm);
}
.crud-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-left: 0;
  list-style: none;
}
.crud-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-3);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
}
.crud-text small {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
}
.crud-actions {
  display: flex;
  flex-shrink: 0;
  gap: var(--space-1);
}
</style>
