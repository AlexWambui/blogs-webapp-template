<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    data: {
        current_page: number;
        last_page: number;
    };
    maxVisible?: number;
}>();

const emit = defineEmits<{
    (e: 'pagination-change-page', page: number): void;
}>();

const currentPage = computed(() => props.data.current_page);
const lastPage = computed(() => props.data.last_page);
const maxVisible = computed(() => props.maxVisible || 5);

const visiblePages = computed(() => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage.value - Math.floor(maxVisible.value / 2));
    let end = Math.min(lastPage.value, start + maxVisible.value - 1);
    
    if (end - start + 1 < maxVisible.value) {
        start = Math.max(1, end - maxVisible.value + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});
</script>

<template>
    <div v-if="lastPage > 1" class="pagination">
        <button 
            @click="$emit('pagination-change-page', 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border"
        >
            &lt;&lt;
        </button>

        <button 
            @click="$emit('pagination-change-page', currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border"
        >
            &lt;
        </button>

        <button 
            v-for="pageNum in visiblePages" 
            :key="pageNum"
            @click="$emit('pagination-change-page', pageNum)"
            :class="['px-3 py-1 rounded border', currentPage === pageNum ? 'active-page' : 'inactive-page']"
        >
            {{ pageNum }}
        </button>

        <button 
            @click="$emit('pagination-change-page', currentPage + 1)"
            :disabled="currentPage === lastPage"
            class="px-3 py-1 rounded border"
        >
            &gt;
        </button>

        <button 
            @click="$emit('pagination-change-page', lastPage)"
            :disabled="currentPage === lastPage"
            class="px-3 py-1 rounded border"
        >
            &gt;&gt;
        </button>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin-top: 2rem;
    flex-wrap: wrap;
}

.pagination button {
    cursor: pointer;
    transition: all 0.2s;
    background: white;
    border-color: #e5e7eb;
    color: #374151;
}

.pagination button:hover:not(:disabled) {
    background: #f3f4f6;
}

.pagination button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.active-page {
    background-color: #22c55e !important;
    border-color: #22c55e !important;
    color: white !important;
}

.inactive-page {
    background-color: #e5e7eb;
    border-color: #e5e7eb;
    color: #374151;
}

@media (prefers-color-scheme: dark) {
    .pagination button {
        background: #1f2937;
        border-color: #374151;
        color: #e5e7eb;
    }
    
    .pagination button:hover:not(:disabled) {
        background: #374151;
    }
    
    .inactive-page {
        background-color: #374151;
        border-color: #374151;
        color: #e5e7eb;
    }
}
</style>