/* Страница для создания и редактирования поста */
<template>
  <div class="create-view">
    <div class="content-card">
      <h1 class="page-title">{{ isEditMode ? 'Редактировать пост' : 'Создать пост' }}</h1>
      
      <PostForm 
        v-if="initialValues"
        :initial-values="initialValues" 
        :is-edit="isEditMode" 
        @submit="handleSubmit" 
        @cancel="router.push({ name: 'home' })"
      />
      
      <div class="back-button-container">
        <button 
          class="btn btn-secondary"
          @click="router.push({ name: 'home' })" 
        >
          <span class="icon">←</span>
          Назад
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '../stores/post'
import PostForm from '../components/PostForm.vue'
import type { PostFormValues } from '../types'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

const isEditMode = computed(() => route.name === 'edit')

const initialValues = ref<PostFormValues | null>(null)

onMounted(() => {
  if (isEditMode.value) {
    const id = Number(route.params.id)
    const post = postStore.posts.find(p => p.id === id)
    if (post) {
      initialValues.value = {
        title: post.title,
        body: post.body
      }
    } else {
      router.push({ name: 'home' })
    }
  } else {
    initialValues.value = {
      title: '',
      body: ''
    }
  }
})

const handleSubmit = (values: PostFormValues) => {
  if (isEditMode.value) {
    const id = Number(route.params.id)
    postStore.updatePost({ id, ...values })
  } else {
    postStore.addPost(values)
  }
  router.push({ name: 'home' })
}
</script>

<style scoped>
.create-view {
  max-width: 800px;
  margin: 0 auto;
}

.content-card {
  background: var(--surface-card);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
}

.page-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 2rem 0;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.back-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--surface-border);
}

.icon {
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .content-card {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
}
</style>