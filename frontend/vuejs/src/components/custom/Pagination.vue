<template>
    <div v-if="lastPage > 1" class="pagination">
        <button 
            @click="goToPage(1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border"
        >
            &lt;&lt;
        </button>

        <button 
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border"
        >
            &lt;
        </button>

        <button 
            v-for="pageNum in visiblePages" 
            :key="pageNum"
            @click="goToPage(pageNum)"
            :class="['px-3 py-1 rounded border', currentPage === pageNum ? 'active-page' : 'inactive-page']"
        >
            {{ pageNum }}
        </button>

        <button 
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === lastPage"
            class="px-3 py-1 rounded border"
        >
            &gt;
        </button>

        <button 
            @click="goToPage(lastPage)"
            :disabled="currentPage === lastPage"
            class="px-3 py-1 rounded border"
        >
            &gt;&gt;
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    currentPage: number;
    lastPage: number;
    maxVisible?: number;
}>();

const emit = defineEmits<{
    (e: 'update:page', page: number): void;
}>();

const maxVisible = computed(() => props.maxVisible || 5);

const visiblePages = computed(() => {
    const pages: number[] = [];
    let start = Math.max(1, props.currentPage - Math.floor(maxVisible.value / 2));
    let end = Math.min(props.lastPage, start + maxVisible.value - 1);
    
    if (end - start + 1 < maxVisible.value) {
        start = Math.max(1, end - maxVisible.value + 1);
    }
    
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    
    return pages;
});

const goToPage = (page: number) => {
    if (page !== props.currentPage && page >= 1 && page <= props.lastPage) {
        emit('update:page', page);
    }
};
</script>

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

/* Active page - light green */
.active-page {
    background-color: #00ff5e !important;
    border-color: #22c55e !important;
    color: #025c23 !important;
}

/* Inactive page */
.inactive-page {
    background-color: #e5e7eb;
    border-color: #e5e7eb;
    color: #374151;
}

/* Dark mode */
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