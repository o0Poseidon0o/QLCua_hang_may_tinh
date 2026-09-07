<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Breadcrumb -->
    <div class="flex items-center gap-2 text-xs text-slate-500">
      <router-link to="/" class="hover:text-[#00733c]">Trang chủ</router-link>
      <span>/</span>
      <router-link to="/tin-tuc" class="hover:text-[#00733c]">Tin tức công nghệ</router-link>
      <span>/</span>
      <span class="text-slate-800 font-semibold line-clamp-1">{{ article.title }}</span>
    </div>

    <!-- Article Header -->
    <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-6">
      <div class="space-y-3">
        <span class="inline-block px-3 py-1 bg-emerald-50 text-[#00733c] font-bold text-xs rounded-full">
          {{ article.category }}
        </span>
        <h1 class="text-2xl sm:text-4xl font-black text-slate-900 leading-snug">
          {{ article.title }}
        </h1>
        <div class="flex items-center gap-4 text-xs text-slate-400 border-b border-slate-100 pb-4">
          <span class="font-bold text-slate-700">Tác giả: {{ article.author }}</span>
          <span>•</span>
          <span>Ngày đăng: {{ article.date }}</span>
          <span>•</span>
          <span>{{ article.readTime }}</span>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="aspect-video rounded-2xl overflow-hidden shadow-inner bg-slate-100">
        <img :src="article.image" :alt="article.title" class="w-full h-full object-cover" />
      </div>

      <!-- Excerpt Highlight -->
      <div class="p-4 bg-emerald-50/70 border-l-4 border-[#00733c] rounded-r-xl text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed italic">
        "{{ article.excerpt }}"
      </div>

      <!-- Main Body HTML Content -->
      <div
        class="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4"
        v-html="article.content"
      ></div>

      <!-- Share & Author Box -->
      <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
        <div class="flex items-center gap-2">
          <span class="font-bold text-slate-700">Chia sẻ bài viết:</span>
          <button class="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition">Facebook</button>
          <button class="px-3 py-1 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition">Zalo</button>
        </div>
        <router-link to="/tin-tuc" class="text-[#00733c] font-bold hover:underline">
          &larr; Xem tất cả bài viết khác
        </router-link>
      </div>
    </div>

    <!-- Related Articles -->
    <div v-if="relatedPosts.length > 0" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-4">
      <h3 class="text-base font-black text-slate-900 uppercase tracking-wider">Bài Viết Cùng Chuyên Mục</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="rel in relatedPosts"
          :key="rel.id"
          class="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:border-emerald-500 hover:shadow-sm transition group"
        >
          <img :src="rel.image" :alt="rel.title" class="w-20 h-16 object-cover rounded-lg flex-shrink-0" />
          <div class="min-w-0">
            <router-link
              :to="'/tin-tuc/' + rel.slug"
              class="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-[#00733c] transition"
            >
              {{ rel.title }}
            </router-link>
            <div class="text-[10px] text-slate-400 mt-1">{{ rel.date }} • {{ rel.readTime }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { mockNews } from '../../data/mockNews';

const route = useRoute();

const article = computed(() => {
  const currentSlug = String(route.params.slug || '');
  const found = mockNews.find((item) => item.slug === currentSlug);
  return found || mockNews[0];
});

const relatedPosts = computed(() => {
  return mockNews.filter((item) => item.slug !== article.value.slug).slice(0, 2);
});

watch(
  () => route.params.slug,
  () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
);
</script>
