/* Страница поста */
<template>
  <div class="post-view" v-if="post">
    <div class="post-header">
      <h1>{{ post.title }}</h1>
      <div class="actions">
        <Button 
          icon="pi pi-pencil" 
          label="Edit" 
          @click="handleEdit" 
        />
        <Button 
          icon="pi pi-trash" 
          label="Delete" 
          severity="danger" 
          @click="handleDelete" 
        />
      </div>
    </div>
    <div class="post-body">
      <p>{{ post.body }}</p>
    </div>
    <Button 
      icon="pi pi-arrow-left" 
      label="Back to Posts" 
      @click="router.push({ name: 'home' })" 
    />
  </div>
  <div v-else>
    <p>Post not found</p>
    <Button 
      icon="pi pi-arrow-left" 
      label="Back to Posts" 
      @click="router.push({ name: 'home' })" 
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePostStore } from '../stores/post'

const route = useRoute()
const router = useRouter()
const postStore = usePostStore()

const post = computed(() => {
  const id = Number(route.params.id)
  return postStore.posts.find(p => p.id === id)
})

const handleEdit = () => {
  if (post.value) {
    router.push({ name: 'edit', params: { id: post.value.id } })
  }
}

const handleDelete = () => {
  if (post.value) {
    postStore.deletePost(post.value.id)
    router.push({ name: 'home' })
  }
}
</script>

<style scoped>
.post-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.actions {
  display: flex;
  gap: 10px;
}

.post-body {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .post-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>