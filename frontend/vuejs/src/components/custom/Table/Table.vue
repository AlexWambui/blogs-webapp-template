<script setup lang="ts">
interface Column {
    key: string;
    label: string;
}

defineProps<{
    columns: Column[];
    data: any[];
    hasActions?: boolean;
}>();
</script>

<template>
    <div class="table-wrapper">
        <table class="table">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key">
                        {{ column.label }}
                    </th>
                    <th v-if="hasActions" class="thead-actions">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id">
                    <td v-for="column in columns" :key="column.key">
                        <slot :name="`column-${column.key}`" :item="item">
                            {{ item[column.key] }}
                        </slot>
                    </td>
                    <td v-if="hasActions" class="tbody-actions">
                        <div class="actions">
                            <slot name="actions" :item="item" />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
