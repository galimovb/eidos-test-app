<script setup lang="ts">
import Sidebar from "@/components/layout/Sidebar.vue";
import SessionsPage from "@/pages/SessionsPage.vue";
</script>

<template>
  <div class="app-layout">
    <aside
        aria-label="Основное меню"
        class="app-layout__sidebar"
    >
      <Sidebar />
    </aside>

    <main
        id="main-content"
        tabindex="-1"
        class="app-layout__content"
    >
      <SessionsPage/>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  min-height: 100%;
}

.app-layout__sidebar {
  flex: 0 0 auto;
}

.app-layout__content {
  flex: 1;
  padding: 8px 8px  0 8px;
}
</style>
