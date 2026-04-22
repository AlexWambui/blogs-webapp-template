<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { useBlogStore } from '@/store/blog';
import { Pagination, Table, TableLoader } from '@/components/custom';

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const page = ref<number>(1);

// Table columns
const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Title' },
    { key: 'slug', label: 'Slug' },
    { key: 'is_published', label: 'Is Published' },
    { key: 'created_at', label: 'Created At' }
];

const handleDelete = async (slug: string) => {
    const currentPageDataLength = blogStore.blogsCollection?.data.length || 0;
    const isLastItemOnPage = currentPageDataLength === 1;
    const isNotFirstPage = page.value > 1;
    
    await blogStore.deleteBlog(slug);
    
    let pageToFetch = page.value;
    if (isLastItemOnPage && isNotFirstPage) {
        pageToFetch = page.value - 1;
        page.value = pageToFetch;
        await router.push({ query: { page: pageToFetch } });
    }
    
    await blogStore.getBlogs(pageToFetch);
};

const loadBlogs = async () => {
    await blogStore.getBlogs(page.value);
};

onMounted(async () => {
    const urlPage = Number(route.query.page);
    page.value = urlPage && urlPage > 0 ? urlPage : 1;
    await loadBlogs();
});
</script>

<template>
    <div class="table-header">
        <div class="stats">
            <h1>Blogs</h1>
        </div>
        <div class="action-btn">
            <RouterLink to="/blogs/create">New Blog</RouterLink>
        </div>
    </div>

    <!-- Loading State -->
    <TableLoader 
        v-if="blogStore.isLoading"
        :columns="columns"
        :rows="5"
        :has-actions="true"
    />

    <!-- Data State -->
    <div v-else>
        <Table 
            :columns="columns"
            :data="blogStore.blogsCollection?.data || []"
            :has-actions="true"
        >
            <!-- Custom rendering for is_published column -->
            <template #column-is_published="{ item }">
                {{ item.is_published ? 'Published' : 'Draft' }}
            </template>
            
            <!-- Actions column -->
            <template #actions="{ item }">
                <RouterLink :to="{ name: 'ViewBlog', params: {slug: item.slug} }">
                    <EyeIcon class="w-5 h-5" />
                </RouterLink>

                <RouterLink :to="{ name: 'EditBlog', params: {slug: item.slug} }">
                    <PencilIcon class="w-5 h-5" />
                </RouterLink>

                <TrashIcon 
                    @click="handleDelete(item.slug)" 
                    class="w-5 h-5 cursor-pointer text-red-500" 
                />
            </template>
        </Table>

        <Pagination 
            v-if="blogStore.blogsCollection"
            :data="blogStore.blogsCollection.meta"
            @pagination-change-page="blogStore.getBlogs"
        />
    </div>
</template>