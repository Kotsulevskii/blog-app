/* Главная страница */
<template>
  <div class="home">
    <div class="content-card">
      <div class="header">
        <h1 class="page-title">Тестовое задание</h1>
        <div class="search-sort">
          <div class="search-container">
            <input 
              type="text"
              v-model="postStore.searchQuery" 
              placeholder=" Поиск..." 
              class="input search-input"
              :class="{ 'searching': postStore.isSearching }"
            />
            <button
              v-if="postStore.searchQuery"
              class="btn btn-clear"
              @click="resetSearch" 
              title="Очистить поиск"
            >
              <span class="cross-line"></span>
              <span class="cross-line"></span>
            </button>
          </div>
          <button 
            class="btn btn-secondary btn-small"
            @click="toggleSort"
          >
            <span class="icon">{{ postStore.sortDirection === 'asc' ? '↑' : '↓' }}</span>
            Сортировка
          </button>
        </div>
      </div>

      <PostList 
        :posts="postStore.filteredPosts" 
        @delete="handleDelete"
        @edit="handleEdit"
      />
      
      <div class="create-button-container">
        <button 
          class="btn btn-large"
          @click="router.push({ name: 'create' })" 
        >
          <span class="icon">+</span>
          Создать пост
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { usePostStore } from '../stores/post'
import PostList from '../components/PostList.vue'

const router = useRouter()
const postStore = usePostStore()

const toggleSort = () => {
  postStore.sortDirection = postStore.sortDirection === 'asc' ? 'desc' : 'asc'
}

const handleDelete = (id: number) => {
  postStore.deletePost(id)
}

const handleEdit = (id: number) => {
  router.push({ name: 'edit', params: { id } })
}

const resetSearch = () => {
  postStore.searchQuery = ''
}
</script>

<style scoped>
.home {
  max-width: 1200px;
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
  margin: 0 0 1.5rem 0;
  text-align: center;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid var(--surface-border);
}

.search-sort {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.search-container {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 250px;
}

.search-input {
  min-width: 250px;
  padding-right: 2.5rem;
}

.btn-clear {
  position: absolute;
  right: 0.5rem;
  border: none;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
}
.cross-line {
  position: absolute;
  width: 12px;
  height: 2px;
  background-color: var(--text-color);
  border-radius: 1px;
}

.cross-line:first-child {
  transform: rotate(45deg);
}

.cross-line:last-child {
  transform: rotate(-45deg);
}

.btn-clear:hover {
  background-color: var(--surface-hover);
}

.search-input.searching {
  border-color: var(--primary-color);
}


.create-button-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--surface-border);
}

.icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .content-card {
    padding: 1.5rem;
  }
  
  .page-title {
    font-size: 2rem;
  }
  
  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  
  .search-sort {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-container {
    min-width: auto;
  }
  
  .search-input {
    min-width: auto;
  }
}
</style>