<template>
  <button
      class="button"
      :class="[
      `button--size-${size}`,
      `button--appearance-${appearance}`,
      {
        'button--icon-only': !text,
        'button--with-left-icon': hasLeftIcon,
        'button--with-right-icon': hasRightIcon
      }
    ]"
      :disabled="disabled"
  >
    <span v-if="hasLeftIcon" class="button__icon button__icon--left">
      <slot name="left-icon"></slot>
    </span>

    <span v-if="text" class="button__text">{{ text }}</span>

    <span v-if="hasRightIcon" class="button__icon button__icon--right">
      <slot name="right-icon"></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

withDefaults(defineProps<{
  size?: 's' | 'm' | 'l';
  appearance?: 'primary' | 'secondary';
  text?: string;
  disabled?: boolean;
  leftIcon?: boolean;
  rightIcon?: boolean;
}>(), {
  size: 'm',
  appearance: 'primary',
  text: '',
  disabled: false,
  leftIcon: false,
  rightIcon: false
});

const hasLeftIcon = !!useSlots()['left-icon'];
const hasRightIcon = !!useSlots()['right-icon'];
</script>

<style scoped>
.button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

/* Размеры */
.button--size-s {
  height: 36px;
  min-width: 36px;
  padding: 10px 16px;
}

.button--size-m {
  height: 44px;
  min-width: 44px;
  padding: 10px 16px;
}

.button--size-l {
  height: 52px;
  min-width: 52px;
  padding: 10px 20px;
}

/* Внешний вид */
.button--appearance-primary {
  background-color: var(--sc-base-7);
  color: var(--sc-base-6);
}

.button--appearance-secondary {
  background-color: var(--sc-base-12);
  color: var(--sc-base-2);
}

.button--appearance-primary:hover {
  background-color: var(--sc-base-11);
}

.button--appearance-secondary:hover {
  background-color: rgba(var(--sc-base-12),0.9);
}

/* Иконки */
.button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.button__icon--left {
  margin-right: 8px;
}

.button__icon--right {
  margin-left: 8px;
}

/* Кнопка только с иконкой */
.button--icon-only {
  padding: 0;

  .button__icon {
    margin: 0;
  }
}

/* Отключенное состояние */
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
