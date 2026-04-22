<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { TailwindPagination } from 'laravel-vue-pagination';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { useBlogStore } from '@/store/blog';

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const page = ref<number>(Number(route.query.page) || 1);

const handleDelete = async (slug: string) => {
    await blogStore.deleteBlog(slug);
    
    // Refetch current page
    await blogStore.getBlogs(page.value);
    
    // If empty and not page 1, go to previous page
    if (blogStore.blogsCollection?.data.length === 0 && page.value > 1) {
        page.value--;
        await blogStore.getBlogs(page.value);
    }
};

onMounted(async () => {
    await blogStore.getBlogs(page.value);
});

watch(page, async () => {
    await blogStore.getBlogs(page.value);
    await router.push({query: {page: page.value}});
})
</script>

<template>
    <div class="header">
        <h1>Blogs</h1>
        <RouterLink to="/blogs/create">New Blog</RouterLink>
    </div>

    <div v-if="blogStore.isLoading" class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Is Published</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="n in 5" :key="n">
                    <td v-for="col in 6" :key="col">
                        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <div v-else class="table-wrapper">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Is Published</th>
                    <th>Created At</th>
                    <th class="thead-actions">Actions</th>                    
                </tr>
            </thead>

            <tbody>
                <template v-if="blogStore.blogsCollection">
                    <tr v-for="blog in blogStore.blogsCollection.data" :key="blog.id">
                        <td>{{ blog.id }}</td>
                        <td>{{ blog.title }}</td>
                        <td>{{ blog.slug }}</td>
                        <td>{{ blog.is_published ? 'Published' : 'Draft' }}</td>
                        <td>{{ blog.created_at }}</td>
                        <td class="tbody-actions">
                            <div class="actions">
                                <RouterLink :to="{ name: 'ViewBlog', params: {slug: blog.slug} }">
                                    <EyeIcon class="w-5 h-5" />
                                </RouterLink>

                                <RouterLink :to="{ name: 'EditBlog', params: {slug: blog.slug} }">
                                    <PencilIcon class="w-5 h-5" />
                                </RouterLink>

                                <TrashIcon @click="handleDelete(blog.slug)" class="w-5 h-5 cursor-pointer text-red-500" />
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <template v-if="blogStore.blogsCollection">
            <TailwindPagination
                :data="blogStore.blogsCollection"
                @pagination-change-page="page = $event"
            />
        </template>
    </div>
</template>

<style scoped>
.skeleton-wrapper {
    width: 100%;
    overflow: hidden;
}

.skeleton-table {
    width: 100%;
}

.skeleton-header {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    padding: 1rem;
    background: var(--bg-text-color);
    border-bottom: 1px solid var(--border-color);
}

.skeleton-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
}

.skeleton-line,
.skeleton-cell {
    height: 20px;
    background: linear-gradient(
        90deg,
        var(--skeleton-start) 0%,
        var(--skeleton-middle) 50%,
        var(--skeleton-start) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* CSS Variables for theming */
:root {
    --skeleton-start: #e0e0e0;
    --skeleton-middle: #f5f5f5;
}

@media (prefers-color-scheme: dark) {
    :root {
        --skeleton-start: #2a2a2a;
        --skeleton-middle: #3a3a3a;
    }
}
</style>