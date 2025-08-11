<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
    validator: (value: string) =>
        ['planned', 'in_progress', 'completed'].includes(value)
  }
})

const configs = {
  planned: { label: 'Запланировано' },
  in_progress: { label: 'Идет' },
  completed: { label: 'Завершено' },
  canceled: { label: 'Отменено' }
}

const statusConfig = computed(() => {
  return configs[props.status] || configs.planned
})
</script>

<template>
  <span
      class="status-badge"
      :class="`status-badge--${props.status}`"
  >
    {{ statusConfig.label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 43px;
  font-size: 13px;
  font-weight: 500;
}

/* Модификаторы для цветов */
.status-badge--planned {
  background-color: var(--sc-base-15);
}

.status-badge--in_progress {
  background-color: var(--sc-base-16);
}

.status-badge--completed {
  background-color: var(--sc-base-17);
}
.status-badge--canceled {
  background-color: var(--sc-base-9);
}
</style>
