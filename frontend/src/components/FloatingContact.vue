<template>
  <!-- Widget liên hệ nhanh: gọn trên mobile (chỉ icon), có nhãn khi hover trên desktop -->
  <div class="fixed z-50 right-3 bottom-4 sm:right-5 sm:bottom-6 flex flex-col items-end gap-2.5 select-none">
    <transition-group name="fc-pop" tag="div" class="flex flex-col items-end gap-2.5">
      <template v-if="isOpen">
        <a
          v-for="(ch, idx) in channels"
          :key="ch.key"
          :href="ch.href"
          :target="ch.external ? '_blank' : undefined"
          rel="noopener"
          class="group flex items-center gap-2"
          :style="{ transitionDelay: `${idx * 35}ms` }"
          :aria-label="ch.label"
        >
          <!-- Nhãn: ẩn trên mobile, hiện khi hover trên màn hình lớn -->
          <span
            class="hidden md:block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-200 bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg border border-slate-100 whitespace-nowrap pointer-events-none"
          >
            {{ ch.label }}
            <span class="block text-[10px] font-medium text-slate-400">{{ ch.sub }}</span>
          </span>
          <span
            class="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md ring-2 ring-white hover:scale-110 transition-transform"
            :style="{ background: ch.color }"
          >
            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor" v-html="ch.icon"></svg>
          </span>
        </a>
      </template>
    </transition-group>

    <!-- Nút chính -->
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="relative w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200 cursor-pointer"
      :class="isOpen ? 'bg-slate-800 rotate-90' : 'bg-[#00733c] hover:bg-[#014f2b]'"
      :aria-label="isOpen ? 'Đóng liên hệ' : 'Liên hệ hỗ trợ'"
      :title="isOpen ? 'Đóng' : 'Liên hệ hỗ trợ'"
    >
      <span v-if="!isOpen" class="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping"></span>
      <svg v-if="!isOpen" viewBox="0 0 24 24" class="relative w-6 h-6" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.03 2 11c0 2.62 1.25 4.98 3.25 6.62L4.5 22l4.27-2.2c1 .27 2.08.42 3.23.42 5.52 0 10-4.03 10-9S17.52 2 12 2zm-4 10.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm4 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
      </svg>
      <svg v-else viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const channels = [
  {
    key: 'phone',
    label: 'Hotline: 0777 908 179',
    sub: '8h - 22h hằng ngày',
    href: 'tel:0777908179',
    external: false,
    color: '#00733c',
    icon: '<path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>',
  },
  {
    key: 'zalo',
    label: 'Tư vấn Zalo',
    sub: 'Phản hồi sau 1 phút',
    href: 'https://zalo.me/0777908179',
    external: true,
    color: '#0068ff',
    icon: '<text x="12" y="16" text-anchor="middle" font-size="9" font-weight="800" font-family="Arial, sans-serif">Zalo</text>',
  },
  {
    key: 'messenger',
    label: 'Chat Messenger',
    sub: 'Hỗ trợ 24/7',
    href: 'https://m.me/',
    external: true,
    color: 'linear-gradient(135deg,#00b2ff,#a033ff)',
    icon: '<path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.43 3.14 7.17V22l2.87-1.58c.81.22 1.67.34 2.56.34h.43c5.64 0 10-4.13 10-9.7S17.64 2 12 2zm1 13.06l-2.55-2.72-4.97 2.72 5.47-5.8 2.6 2.72 4.92-2.72-5.47 5.8z"/>',
  },
  {
    key: 'telegram',
    label: 'Chat Telegram',
    sub: 'Hỗ trợ 24/7',
    href: 'https://t.me/',
    external: true,
    color: '#229ed9',
    icon: '<path d="M9.78 15.6l-.4 4.06c.57 0 .82-.25 1.12-.54l2.69-2.57 5.57 4.08c1.02.56 1.75.27 2.02-.94l3.66-17.15c.33-1.5-.54-2.09-1.53-1.72L1.4 9.1c-1.47.57-1.45 1.4-.25 1.77l5.5 1.71L19.4 4.6c.6-.4 1.15-.18.7.22"/>',
  },
];
</script>

<style scoped>
.fc-pop-enter-active,
.fc-pop-leave-active {
  transition: all 0.2s ease;
}
.fc-pop-enter-from,
.fc-pop-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.85);
}
</style>
