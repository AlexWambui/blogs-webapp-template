<script setup lang="ts">
interface Column {
    key: string;
    label: string;
}

defineProps<{
    columns: Column[];
    rows?: number;
    hasActions?: boolean;
}>();
</script>

<template>
    <div class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key">
                        {{ column.label }}
                    </th>
                    <th v-if="hasActions" class="thead-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in rows" :key="n">
                    <td v-for="column in columns" :key="column.key">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </td>
                    <td v-if="hasActions" class="tbody-actions">
                        <div class="actions">
                            <div class="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
