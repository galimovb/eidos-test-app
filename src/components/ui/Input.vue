<template>
  <div
      class="input"
      :class="[
      `input--size-${size}`,
      {
        'input--with-left-icon': hasLeftIcon,
        'input--with-right-icon': hasRightIcon
      }
    ]"
  >
    <span
        v-if="hasLeftIcon"
        class="input__icon input__icon--left"
    >
      <slot name="left-icon"/>
    </span>

    <input
        class="input__field"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />

    <span
        v-if="hasRightIcon"
        class="input__icon input__icon--right"
    >
      <slot name="right-icon"/>
    </span>
  </div>
</template>

<script setup lang="ts">
import { useSlots } from "vue";

withDefaults(defineProps<{
  modelValue?: string;
  size?: 's' | 'm' | 'l';
  placeholder?: string;
  leftIcon?: boolean;
  rightIcon?: boolean;
}>(), {
  modelValue: '',
  size: 'm',
  placeholder: '',
  leftIcon: false,
  rightIcon: false
});

defineEmits(['update:modelValue']);

const hasLeftIcon = !!useSlots()['left-icon'];
const hasRightIcon = !!useSlots()['right-icon'];
</script>

<style scoped>
.input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
}

.input__field {
  width: 100%;
  border: 1px solid var(--sc-base-9);
  border-radius: 8px;
  background-color: var(--sc-base-6);
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  box-sizing: border-box;
}

.input__field::placeholder {
  color: var(--sc-base-1);
}

.input__field:focus {
  border-color: var(--sc-base-7);
}

.input__field::placeholder {
  color: var(--sc-base-9);
}

/* Размеры */
.input--size-s {
  height: 44px;
}

.input--size-m {
  height: 48px;
}

.input--size-l {
  height: 56px;
}

.input--size-s .input__field {
  height: 100%;
  padding: 0 12px;
  font-size: 0.875rem;
}

.input--size-m .input__field {
  height: 100%;
  padding: 0 16px;
  font-size: 1rem;
}

.input--size-l .input__field {
  height: 100%;
  padding: 0 20px;
  font-size: 1.125rem;
}

/* Иконки */
.input__icon {
  position: absolute;
  height: 100%;
  color: var(--sc-base-9);
  display: flex;
  align-items: center;
  pointer-events: none;
}

.input__icon--left {
  left: 16px;
}

.input__icon--right {
  right: 16px;
}

/* Состояния с иконками */
.input--with-left-icon .input__field {
  padding-left: 44px;
}

.input--with-right-icon .input__field {
  padding-right: 44px;
}
</style>
