# Pagination Component

A reusable pagination component that provides navigation controls for paginated data sets.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `data` | `{ current_page: number; last_page: number }` | Yes | - | Pagination metadata object containing current and last page numbers |
| `maxVisible` | `number` | No | `5` | Maximum number of page buttons to display |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `pagination-change-page` | `number` | Emitted when user clicks a different page. Returns the requested page number. |

## Examples
### Basic Example

```vue
<template>
    <Pagination 
        :data="{ current_page: 1, last_page: 10 }"
        @pagination-change-page="handlePageChange"
    />
</template>

<script setup>
const handlePageChange = (page) => {
    console.log('Go to page:', page);
    // Your logic here - fetch data, update URL, etc.
};
</script>
```

### Complete Example with Laravel API

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBlogStore } from '@/store/blog';
import Pagination from '@/components/custom/Pagination/Pagination.vue';

const router = useRouter();
const blogStore = useBlogStore();

const fetchBlogs = async (page: number) => {
    // Fetch data from API
    await blogStore.getBlogs(page);
    
    // Update URL without reloading
    await router.push({ query: { page } });
};

// Initial load
onMounted(async () => {
    await fetchBlogs(1);
});
</script>

<template>
    <div>
        <!-- Your table/content here -->
        
        <Pagination 
            v-if="blogStore.blogsCollection"
            :data="blogStore.blogsCollection.meta"
            @pagination-change-page="fetchBlogs"
        />
    </div>
</template>
```

## Customizing Styling

The component uses CSS classes that you can override in your global styles or component styles:

Available Classes
- Class	Description
- pagination	Container for all buttons
- pagination button	All pagination buttons
- active-page	Currently active page button
- inactive-page	Non-active page buttons

Override in Global CSS

```css
/* In your main.css or app.css */

/* Change button colors */
.pagination button {
    background-color: #f3f4f6;
    border-color: #d1d5db;
    color: #1f2937;
}

/* Change active page style */
.active-page {
    background-color: #3b82f6 !important;
    border-color: #3b82f6 !important;
    color: white !important;
}

/* Change hover effect */
.pagination button:hover:not(:disabled) {
    background-color: #e5e7eb;
}
```

Override with Scoped Styles

```vue
<style scoped>
/* Override just for this page */
:deep(.active-page) {
    background-color: #8b5cf6 !important;
    border-color: #8b5cf6 !important;
}
</style>
```

Tailwind CSS Customization

If using Tailwind, you can remove the built-in styles and add your own classes:

```vue
<!-- Custom styled version -->
<div class="flex gap-2 justify-center mt-8">
    <button 
        v-for="page in visiblePages" 
        :key="page"
        @click="goToPage(page)"
        :class="[
            'px-3 py-1 rounded border',
            currentPage === page 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white dark:bg-gray-800 border-gray-300'
        ]"
    >
        {{ page }}
    </button>
</div>
```