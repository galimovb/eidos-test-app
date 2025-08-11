<script setup lang="ts">
import { ref } from "vue";
import {PhCaretLeft,PhCaretRight} from "@phosphor-icons/vue";

interface Props {
  totalPages: number;
  modelValue: number;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages) return;
  emit("update:modelValue", page);
};

const getPages = () => {
  const pages: (number | string)[] = [];
  const current = props.modelValue;
  const total = props.totalPages;

  if (total <= 6) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }

  return pages;
};
</script>

<template>
  <nav class="pagination">
    <button
        class="pagination__btn"
        :disabled="modelValue === 1"
        @click="goToPage(modelValue - 1)"
    >
      <PhCaretLeft :size="18"/>
    </button>

    <button
        v-for="(page, index) in getPages()"
        :key="index"
        class="pagination__btn"
        :class="{
        'pagination__btn--active': page === modelValue,
        'pagination__btn--dots': page === '...'
      }"
        :disabled="page === '...'"
        @click="typeof page === 'number' && goToPage(page)"
    >
      {{ page }}
    </button>

    <button
        class="pagination__btn"
        :disabled="modelValue === totalPages"
        @click="goToPage(modelValue + 1)"
    >
      <PhCaretRight :size="18" />
    </button>
  </nav>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pagination__btn {
  min-width: 32px;
  height: 32px;
  padding: 0 8px;
  border: none;
  border-radius: 8px;
  background-color: white;
  color: var(--sc-base-1);
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination__btn:hover:not(:disabled) {
  background-color: var(--sc-base-12);
}

.pagination__btn:disabled {
  opacity: 0.5;
  cursor: default;
}


.pagination__btn--active {
  border: 1px solid var(--sc-base-7);
  color: var(--sc-base-7);
  font-weight: bold;
}

.pagination__btn--dots {
  cursor: default;
  background-color: white;
}
</style>
