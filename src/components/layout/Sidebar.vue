<template>
  <nav
      class="sidebar"
      :class="{ 'sidebar--collapsed': isCollapsed }"
  >
    <button
        class="sidebar__trigger"
        @click="toggleSidebar">

      <PhCaretLeft
          v-if="!isCollapsed"
          size="16"
      />

      <PhCaretRight
          v-else
          size="16"
      />
    </button>

    <div class="sidebar__header">
      <div class="sidebar__header-menu">
        <img
            src="../../assets/img/logo.png"
            alt="Сим Центр"
            class="sidebar__logo"
        />
        <span
            v-if="!isCollapsed"
            class="sidebar__title"
        >
          Сим Центр
        </span>
      </div>
    </div>

    <ol
        v-if="!isCollapsed"
        class="sidebar__menu"
    >
      <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: item.active, disabled: item.disabled }"
      >
        <a
            :href="item.href"
            :tabindex="item.disabled ? -1 : 0"
            class="sidebar-link"
        >
          <component
              :is="item.icon"
              size="24"
              class="sidebar-link__icon"
          />
          <span>
            {{ item.text }}
          </span>
        </a>
      </li>
    </ol>

    <div
        v-if="!isCollapsed"
         class="sidebar__footer"
    >
      <div class="profile-card">
        <div class="profile-card__info">
          <div class="profile-card__name">
            Барнаби Мармадюк
          </div>
          <div class="profile-card__role">
            Преподаватель
          </div>
        </div>
        <div class="profile-card__avatar">
          БМ
        </div>
      </div>

      <a
          href="#"
          class="sidebar-link"
      >
        <PhSignOut
            size="24"
            class="sidebar-link__icon"
        />
        <span>
          Выйти
        </span>
      </a>

      <div class="multiselect">
        <div class="multiselect__current">
          <img
              src="../../assets/img/rus.png"
          />
          <span class="multiselect__lang">
            Русский
          </span>
        </div>
        <div class="multiselect__trigger">
          <PhCaretDown
              size="24"
              class="multiselect__trigger-icon"
          />
        </div>
      </div>

      <div class="sidebar__version">
        Версия 1.02
      </div>
    </div>

    <!-- Мини-версия меню для свернутого состояния -->
    <ol
        v-else
        class="sidebar__menu sidebar__menu--collapsed"
    >
      <li
          v-for="(item, index) in menuItems"
          :key="index"
          :class="{ active: item.active, disabled: item.disabled }"
      >
        <a
            :href="item.href"
            :tabindex="item.disabled ? -1 : 0"
            class="sidebar-link"
            :title="item.text"
        >
          <component
              :is="item.icon"
              size="24"
              class="sidebar-link__icon"
          />
        </a>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import {ref} from 'vue';
import {
  PhCalendar,
  PhGraduationCap,
  PhMonitor,
  PhUser,
  PhUsersThree,
  PhDevices,
  PhGear,
  PhDownloadSimple,
  PhSignOut,
  PhCaretDown,
  PhCaretLeft,
  PhCaretRight,
} from "@phosphor-icons/vue";

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const menuItems = [
  {text: "Расписание", icon: PhCalendar, href: "#", active: false},
  {text: "Учебные сессии", icon: PhGraduationCap, href: "#", active: true},
  {text: "Список комнат", icon: PhMonitor, href: "#", active: false},
  {text: "Пользователи", icon: PhUser, href: "#", disabled: false},
  {text: "Учебные группы", icon: PhUsersThree, href: "#", active: false},
  {text: "Список устройств", icon: PhDevices, href: "#", active: false},
  {text: "Настройки системы", icon: PhGear, href: "#", active: false},
  {text: "Архив", icon: PhDownloadSimple, href: "#", active: false},
];
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background: var(--sc-base-6);
  min-height: var(--sidebar-height);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: width 0.3s ease;
}

.sidebar--collapsed {
  --sidebar-width: 80px;
}

.sidebar__header {
  padding: 20px;
  margin-bottom: 24px;
}

.sidebar__header-menu {
  display: flex;
  align-items: center;
  gap: 14px;
}

.sidebar__logo {
  width: 46px;
  height: 46px;
}

.sidebar__title {
  font-weight: 800;
  font-size: 1.6rem;
}

.sidebar__menu {
  margin: 0 12px;
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar__menu--collapsed {
  align-items: center;
}

.sidebar__menu--collapsed .sidebar-link {
  justify-content: center;
  padding: 12px 0;
  width: 56px;
}

.sidebar__footer {
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: auto 12px 12px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  font-weight: 800;
  border-radius: 16px;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.sidebar-link:hover:not(.disabled) {
  background: rgba(0, 0, 0, 0.05);
}

.sidebar__menu li.active > .sidebar-link {
  background: var(--sc-base-7);
  color: var(--sc-base-6) !important;
}

.sidebar__menu li.active > .sidebar-link .sidebar-link__icon {
  color: var(--sc-base-6);
}

.sidebar__menu li.disabled > .sidebar-link {
  background: var(--sc-base-12);
  color: var(--sc-base-9);
  cursor: not-allowed;
  pointer-events: none;
}

.sidebar-link__icon {
  color: var(--sc-base-9)
}

.profile-card {
  display: flex;
  align-items: center;
  background: var(--sc-base-6);
  border-radius: 16px;
  padding: 12px;
  gap: 12px;
  box-shadow: 0px 4px 24px 0px #0000001F;
}

.profile-card__info {
  flex: 1;
}

.profile-card__name {
  font-weight: 600;
}

.profile-card__role {
  font-size: 13px;
  color: var(--sc-base-2);
  opacity: 0.65;
}

.profile-card__avatar {
  background: var(--sc-base-7);
  color: var(--sc-base-6);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar__version {
  font-size: 13px;
  color: var(--sc-base-2);
  opacity: 0.65;
}

.multiselect {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  font-weight: 800;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
  border: 1px solid var(--sc-base-4);
}

.multiselect__current {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.multiselect__trigger-icon {
  color: var(--sc-base-9)
}

.sidebar__trigger {
  border: none;
  border-radius: 50%;
  background-color: black;
  color: var(--sc-base-6);
  width: 24px;
  height: 24px;
  padding: 4px;
  position: absolute;
  top: 30px;
  right: -12px;
  cursor: pointer;
  z-index: 1;
}
</style>
