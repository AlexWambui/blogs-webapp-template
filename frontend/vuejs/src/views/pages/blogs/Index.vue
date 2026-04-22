<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/solid';
import { useBlogStore } from '@/store/blog';
import Pagination from '@/components/custom/Pagination.vue';

const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const page = ref<number>(1);

const handleDelete = async (slug: string) => {
    // Store current state before delete
    const currentPageDataLength = blogStore.blogsCollection?.data.length || 0;
    const isLastItemOnPage = currentPageDataLength === 1;
    const isNotFirstPage = page.value > 1;
    
    // Perform delete
    await blogStore.deleteBlog(slug);
    
    // Determine which page to fetch
    let pageToFetch = page.value;
    if (isLastItemOnPage && isNotFirstPage) {
        pageToFetch = page.value - 1;
        page.value = pageToFetch;
        await router.push({ query: { page: pageToFetch } });
    }
    
    // Fetch the (potentially new) page
    await blogStore.getBlogs(pageToFetch);
};

const loadBlogs = async () => {
    await blogStore.getBlogs(page.value);
};

const changePage = async (newPage: number) => {
    if (newPage === page.value) return;
    if (newPage < 1 || (blogStore.blogsCollection && newPage > blogStore.blogsCollection.meta.last_page)) return;
    
    page.value = newPage;
    await loadBlogs();
    
    // Update URL without causing a reload
    await router.push({ query: { page: newPage } });
};

onMounted(async () => {
    // Get page from URL or default to 1
    const urlPage = Number(route.query.page);
    page.value = urlPage && urlPage > 0 ? urlPage : 1;
    
    await loadBlogs();
});
</script>

<template>
    <div class="header">
        <h1>Blogs</h1>
        <RouterLink to="/blogs/create">New Blog</RouterLink>
    </div>

    <!-- Loading State -->
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

    <!-- Data State -->
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
                <tr v-for="blog in blogStore.blogsCollection?.data" :key="blog.id">
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
            </tbody>
        </table>

        <Pagination 
            v-if="blogStore.blogsCollection"
            :current-page="page"
            :last-page="blogStore.blogsCollection.meta.last_page"
            @update:page="changePage"
        />
    </div>
</template>