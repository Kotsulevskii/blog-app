import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Post } from '../types'

const STORAGE_KEY = 'admin123'

export const usePostStore = defineStore('post', () => {

  const defaultPosts: Post[] = [
    { 
      id: 1, 
      title: 'Добро пожаловать в блог!', 
      body: 'Это первый пост в нашем блоге. Здесь вы можете делиться своими мыслями и идеями.' 
    },
    { 
      id: 2, 
      title: 'Как создать красивый интерфейс', 
      body: 'Советы по созданию современного и удобного пользовательского интерфейса с использованием Vue.js и CSS.' 
    },
    { 
      id: 3, 
      title: 'Основы веб-разработки', 
      body: 'Изучаем основные принципы веб-разработки, включая HTML, CSS и JavaScript.' 
    },
    { 
      id: 4, 
      title: 'Vue.js для начинающих', 
      body: 'Полное руководство по Vue.js: компоненты, реактивность, маршрутизация и управление состоянием.' 
    },
    { 
      id: 5, 
      title: 'Современные CSS техники', 
      body: 'Изучаем современные возможности CSS: Grid, Flexbox, CSS переменные и анимации.' 
    }
  ]

  const getInitialPosts = (): Post[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed
        }
      }
    } catch (error) {
      console.warn('Ошибка при загрузке данных из localStorage:', error)
    }
    return defaultPosts
  }

  const posts = ref<Post[]>(getInitialPosts())
  const searchQuery = ref('')
  const debouncedSearchQuery = ref('')
  const isSearching = ref(false)
  const sortDirection = ref<'asc' | 'desc'>('asc')

  // Debounce для поиска
  let searchTimeout: number | null = null

  watch(searchQuery, (newQuery) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    isSearching.value = true
    
    searchTimeout = setTimeout(() => {
      debouncedSearchQuery.value = newQuery
      isSearching.value = false
    }, 300) 
  })

  watch(
    posts,
    (newPosts) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts))
    },
    { deep: true }
  )

  const filteredPosts = computed(() => {
    let result = posts.value.filter(post =>
      post.title.toLowerCase().startsWith(debouncedSearchQuery.value.toLowerCase()) ||
      post.body.toLowerCase().startsWith(debouncedSearchQuery.value.toLowerCase())
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
    isSearching,
    addPost,
    updatePost,
    deletePost
  }
})