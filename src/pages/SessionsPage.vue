<script setup lang="ts">
import {
  PhFunnel,
  PhFunnelSimple,
  PhMagnifyingGlass,
  PhCaretDown,
  PhCaretUp,
} from "@phosphor-icons/vue";
import Input from "@/components/ui/Input.vue";
import Button from "@/components/ui/Button.vue";
import { sessions } from "/data.json";
import Status from "@/components/ui/Status.vue";
import { formatDate } from "@/js/helpers.js";
import Pagination from "@/components/ui/Pagination.vue";
import { ref, computed } from "vue";

const currentPage = ref(1);
const itemsPerPage = 20;
const searchQuery = ref("");
const sortKey = ref<string | null>("date");
const sortOrder = ref<"asc" | "desc">("asc");

interface Session {
  date: string;
  status: string;
  moduleName: string;
  type: string;
  rooms: string;
  group: string;
}

const sessionTypes = {
  lesson: "Урок",
  examination: "Экзамен",
  accreditation: "Аккредитация",
};

const transformSessionData = (session: any): Session => {
  const startDate = new Date(session.start);
  const endDate = new Date(session.end);
  const dateStr = `${formatDate(startDate)} - ${formatDate(endDate).split(", ")[1]}`;

  const rooms = session.rooms.map((r: any) => r.name).join(", ");
  const groups = session.groups?.length
      ? session.groups.map((g: any) => g.name).join(", ")
      : "Нет группы";

  return {
    date: dateStr,
    status: session.status.name,
    moduleName: session.module,
    type: sessionTypes[session.type.name] || "",
    rooms,
    group: groups,
  };
};

const allSessions = sessions.map(transformSessionData);

const headers = [
  { key: "date", label: "Дата и время" },
  { key: "status", label: "Статус" },
  { key: "moduleName", label: "Название учебного модуля" },
  { key: "type", label: "Тип сессии" },
  { key: "rooms", label: "Комната" },
  { key: "group", label: "Группа" },
];

const filteredSessions = computed(() => {
  if (!searchQuery.value) return allSessions;
  return allSessions.filter(session =>
      session.moduleName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const sortedSessions = computed(() => {
  if (!sortKey.value) return filteredSessions.value;

  return [...filteredSessions.value].sort((a, b) => {
    const aVal = a[sortKey.value as keyof Session];
    const bVal = b[sortKey.value as keyof Session];

    if (typeof aVal === "string" && typeof bVal === "string") {
      if (sortOrder.value === "asc") {
        return aVal.localeCompare(bVal);
      } else {
        return bVal.localeCompare(aVal);
      }
    }

    return 0;
  });
});

const paginatedSessions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedSessions.value.slice(start, end);
});

const totalPages = computed(() =>
    Math.ceil(sortedSessions.value.length / itemsPerPage)
);

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = "asc";
  }
}
</script>


<template>
  <section class="sessions-page">
    <div class="sessions-page__header">
      <h1 class="sessions__title">
        Учебные сессии
      </h1>
      <div class="sessions__actions">
        <Input
            v-model="searchQuery"
            size="s"
            placeholder="Поиск"
            :left-icon="true"
        >
          <template #left-icon>
            <PhMagnifyingGlass size="24" />
          </template>
        </Input>

        <Button
            appearance="secondary"
            size="m"
            :left-icon="true"
            aria-label="Фильтры"
        >
          <template #left-icon>
            <PhFunnel size="24" />
          </template>
        </Button>

        <Button
            appearance="secondary"
            size="m"
            :left-icon="true"
            aria-label="Дополнительные фильтры"
        >
          <template #left-icon>
            <PhFunnelSimple size="24" />
          </template>
        </Button>

        <Button
            appearance="primary"
            size="m"
            text="Создать"
            :left-icon="true"
        />
      </div>
    </div>

    <div class="sessions-page__content">
      <div class="sessions-table__wrapper">
        <table class="sessions-table">
          <thead class="sessions-table__header">
          <tr>
            <th
                v-for="header in headers"
                :key="header.key"
                class="sessions-table__col"
                @click="toggleSort(header.key)"
                style="cursor: pointer; user-select: none;"
                :aria-sort="sortKey === header.key ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'"
            >
              {{ header.label }}

              <PhCaretDown
                  v-if="sortKey === header.key && sortOrder === 'asc'"
                  size="16"
              />
              <PhCaretUp
                  v-else-if="sortKey === header.key && sortOrder === 'desc'"
              />
            </th>
          </tr>
          </thead>


          <tbody class="sessions-table__body">
          <tr
              v-for="(session, index) in paginatedSessions"
              :key="index"
              class="sessions-table__row"
              :class="{
                'sessions-table__row--odd': index % 2 === 0,
                'sessions-table__row--even': index % 2 !== 0
              }"
          >
            <td class="sessions-table__cell">
              {{ session.date }}
            </td>
            <td class="sessions-table__cell">
              <Status :status="session.status" />
            </td>
            <td class="sessions-table__cell">
              {{ session.moduleName }}
            </td>
            <td class="sessions-table__cell">
              {{ session.type }}
            </td>
            <td class="sessions-table__cell">
              {{ session.rooms }}
            </td>
            <td class="sessions-table__cell">
              {{ session.group }}
            </td>
          </tr>
          </tbody>
        </table>
        <div class="pagination-block">
          <Pagination
              v-model="currentPage"
              :total-pages="totalPages"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sessions-page {
  background-color: var(--sc-base-6);
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sessions-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sessions__title {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0;
  color: var(--sc-base-1);
}

.sessions__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sessions-page__content {
  background-color: var(--sc-base-6);
}

.sessions-table__wrapper {
  max-height: 833px;
  overflow-y: auto;
  border: 1px solid var(--sc-base-13);
  border-radius: 8px;
}

.sessions-table {
  width: 100%;
  min-width: 1000px;
  border-collapse: collapse;
}

.sessions-table__header {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--sc-base-14);
  border-bottom: 1px solid var(--sc-base-13);
}

.sessions-table__header th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 800;
}

.sessions-table__row{
  border-bottom: 1px solid var(--sc-base-13);
}

.sessions-table__row--odd {
  background-color: var(--sc-base-6);
}

.sessions-table__row--even {
  background-color: var(--sc-base-12);
}

.sessions-table__cell {
  padding: 12px 16px;
}

.sessions-table__body tr:last-child .sessions-table__cell {
  border-bottom: none;
}

.pagination-block {
  position: sticky;
  bottom: 0;
  background-color: #F5F7F9;
  padding: 11px 16px;
}
</style>
