/* Карточка поста */
<template>
  <div class="card post-card">
    <div class="card-header">
      <div class="card-header-content">
        <router-link :to="{ name: 'post', params: { id: post.id } }" class="post-title-link">
          <h3 class="card-title post-title">{{ post.title }}</h3>
        </router-link>
        <div class="post-id">#{{ post.id }}</div>
      </div>
    </div>
    <div class="card-body">
      <p class="card-content post-preview">{{ post.body }}</p>
    </div>
    <div class="card-footer">
      <button 
        class="btn btn-secondary btn-small"
        @click="$emit('edit', post.id)"
      >
        Редактировать
      </button>
      <button 
        class="btn btn-danger btn-small"
        @click="$emit('delete', post.id)"
      >
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostCardProps } from '../types'

defineProps<PostCardProps>()
defineEmits(['delete', 'edit'])
</script>

<style scoped>
.post-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.post-title-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
}

.post-title {
  color: var(--primary-color);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  transition: color 0.2s;
}

.post-title:hover {
  color: var(--primary-hover);
}

.post-id {
  font-size: 0.875rem;
  color: var(--text-color);
  opacity: 0.6;
  font-weight: 500;
  background: var(--surface-hover);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.post-preview {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
}

@media (max-width: 768px) {
  .post-title {
    font-size: 1.125rem;
  }
  
  .card-footer {
    flex-direction: column;
  }
}
</style>