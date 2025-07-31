/* Список постов */
<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="empty-state">
      <p>Постов не найдено</p>
    </div>
    
    <div v-else class="grid grid-cols-auto">
      <PostCard 
        v-for="post in posts" 
        :key="post.id" 
        :post="post" 
        @delete="$emit('delete', post.id)" 
        @edit="$emit('edit', post.id)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PostListProps } from '../types'
import PostCard from '../components/PostCard.vue'

defineProps<PostListProps>()
defineEmits(['delete', 'edit'])
</script>

<style scoped>
.post-list {
  margin-top: 20px;
}

.empty-state {
  padding: 40px;
  text-align: center;
  background: var(--surface-hover);
  border-radius: var(--border-radius);
  color: var(--text-muted);
}
</style>