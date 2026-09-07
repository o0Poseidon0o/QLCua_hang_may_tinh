<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Breadcrumb & Header -->
    <div>
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <router-link to="/" class="hover:text-[#00733c]">Trang chủ</router-link>
        <span>/</span>
        <span class="text-slate-800 font-semibold">Tin Tức & Cẩm Nang Công Nghệ</span>
      </div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900">TIN TỨC & CẨM NANG CÔNG NGHỆ</h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Cập nhật tin tức phần cứng mới nhất, đánh giá linh kiện và cẩm nang sử dụng máy tính hiệu quả.</p>
        </div>
      </div>
    </div>

    <!-- Category Filter Tabs -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        v-for="cat in categories"
        :key="cat"
        @click="selectedCategory = cat"
        :class="[
          'px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer',
          selectedCategory === cat
            ? 'bg-[#00733c] text-white shadow-md'
            : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
        ]"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Articles Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article
        v-for="post in filteredArticles"
        :key="post.id"
        class="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-200 flex flex-col justify-between group"
      >
        <div>
          <router-link :to="'/tin-tuc/' + post.slug" class="block aspect-video overflow-hidden bg-slate-100 relative">
            <img
              :src="post.image"
              :alt="post.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span class="absolute top-3 left-3 bg-[#00733c] text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded shadow">
              {{ post.category }}
            </span>
          </router-link>

          <div class="p-5 space-y-2">
            <div class="flex items-center gap-2 text-[11px] text-slate-400">
              <span class="font-semibold text-slate-600">{{ post.author }}</span>
              <span>•</span>
              <span>{{ post.date }}</span>
              <span>•</span>
              <span>{{ post.readTime }}</span>
            </div>

            <router-link
              :to="'/tin-tuc/' + post.slug"
              class="block text-sm sm:text-base font-bold text-slate-800 line-clamp-2 hover:text-[#00733c] transition min-h-[44px]"
            >
              {{ post.title }}
            </router-link>

            <p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">
              {{ post.excerpt }}
            </p>
          </div>
        </div>

        <div class="p-5 pt-0 border-t border-slate-50">
          <router-link
            :to="'/tin-tuc/' + post.slug"
            class="text-xs font-bold text-[#00733c] hover:underline flex items-center gap-1 mt-3"
          >
            Đọc bài viết &rarr;
          </router-link>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { mockNews } from '../../data/mockNews';

const categories = ['Tất Cả', 'Đánh Giá Linh Kiện', 'Tư Vấn Cấu Hình', 'Thủ Thuật Máy Tính', 'IT Outsourcing'];
const selectedCategory = ref('Tất Cả');

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Tất Cả') return mockNews;
  return mockNews.filter((item) => item.category === selectedCategory.value);
});
</script>
