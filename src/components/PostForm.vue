/* Форма для создания и редактирования поста */
<template>
  <Form @submit="onSubmit" :validation-schema="schema" :initial-values="props.initialValues">
    <div class="form-container">
      <Field name="title" v-slot="{ field, errors }">
        <div class="form-group">
          <label for="title" class="form-label">Заголовок</label>
          <input 
            type="text"
            id="title" 
            v-bind="field" 
            :class="{ 'input': true, 'invalid': errors.length }" 
            placeholder="Введите заголовок..."
            maxlength="12"
          />
          <small class="form-error" v-if="errors.length">{{ errors[0] }}</small>
          <small class="form-help">{{ field.value?.length || 0 }}/12</small>
        </div>
      </Field>

      <Field name="body" v-slot="{ field, errors }">
        <div class="form-group">
          <label for="body" class="form-label">Содержание</label>
          <textarea 
            id="body" 
            v-bind="field" 
            :class="{ 'textarea': true, 'invalid': errors.length }" 
            placeholder="Введите содержание..."
            rows="6"
            maxlength="50"
          ></textarea>
          <small class="form-error" v-if="errors.length">{{ errors[0] }}</small>
          <small class="form-help">{{ field.value?.length || 0 }}/50</small>
        </div>
      </Field>

      <div class="form-actions">
        <button 
          type="submit" 
          class="btn btn-large"
        >
          <span class="icon">{{ props.isEdit ? '✓' : '+' }}</span>
          {{ props.isEdit ? 'Обновить пост' : 'Создать пост' }}
        </button>
        <button 
          type="button" 
          class="btn btn-secondary btn-large"
          @click="$emit('cancel')" 
        >
          <span class="icon">✕</span>
          Отмена
        </button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import * as yup from 'yup'
import type { PostFormValues, PostFormProps } from '../types'

const props = defineProps<PostFormProps>()
const emit = defineEmits(['submit', 'cancel'])

const schema = yup.object({
  title: yup.string().required('Некоректный заголовок').max(12, 'Заголовок не может быть больше 12 символов'),
  body: yup.string().required('Некоректное содержание').max(50, 'Содержание не может быть больше 50 символов')
})

const onSubmit = (values: any) => {
  emit('submit', values as PostFormValues)
}
</script>

<style scoped>
.form-container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 600px;
  background: var(--surface-card);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-lg);
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--surface-border);
}

.icon {
  font-size: 1rem;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1.5rem;
    margin: 0 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}
</style>