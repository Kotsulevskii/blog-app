import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Post } from '../types'

const STORAGE_KEY = 'admin123'

export const usePostStore = defineStore('post', () => {
  const initialPosts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as Post[]

  const posts = ref<Post[]>(initialPosts)
  const searchQuery = ref('')
  const sortDirection = ref<'asc' | 'desc'>('asc')

  watch(
    posts,
    (newPosts) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts))
    },
    { deep: true }
  )

  const filteredPosts = computed(() => {
    let result = posts.value.filter(post =>
      post.title.toLowerCase().startsWith(searchQuery.value.toLowerCase()) ||
      post.body.toLowerCase().startsWith(searchQuery.value.toLowerCase())
    )

    if (sortDirection.value === 'asc') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      result.sort((a, b) => b.title.localeCompare(a.title))
    }

    return result
  })

  function addPost(newPost: Omit<Post, 'id'>) {
    const id = Math.max(...posts.value.map(p => p.id), 0) + 1
    posts.value.push({ id, ...newPost })
  }

  function updatePost(updatedPost: Post) {
    const index = posts.value.findIndex(p => p.id === updatedPost.id)
    if (index !== -1) {
      posts.value[index] = updatedPost
    }
  }

  function deletePost(id: number) {
    posts.value = posts.value.filter(post => post.id !== id)
  }

  return {
    posts,
    searchQuery,
    sortDirection,
    filteredPosts,
    addPost,
    updatePost,
    deletePost
  }
})