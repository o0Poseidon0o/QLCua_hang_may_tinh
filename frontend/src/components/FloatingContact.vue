<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 select-none">
    <!-- Danh sách các nút liên hệ -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div v-if="isOpen" class="flex flex-col items-end gap-2.5">
        <!-- 1. Hotline: 0777 908 179 -->
        <a
          href="tel:0777908179"
          class="group bg-white rounded-full border-2 border-[#00733c] p-1.5 pr-5 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <div class="w-11 h-11 rounded-full bg-[#00733c] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z" />
            </svg>
          </div>
          <div class="text-left leading-tight">
            <div class="text-[#00733c] font-extrabold text-[15px] tracking-tight">
              Hotline: 0777 908 179
            </div>
            <div class="text-slate-500 text-xs font-medium mt-0.5">
              (8h - 22h hàng ngày)
            </div>
          </div>
        </a>

        <!-- 2. Chat Telegram -->
        <a
          href="https://t.me/nhanphuctech"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-white rounded-full border-2 border-[#2AABEE] p-1.5 pr-5 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <div class="w-11 h-11 rounded-full bg-[#2AABEE] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 -ml-0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />
            </svg>
          </div>
          <div class="text-left leading-tight">
            <div class="text-[#2AABEE] font-extrabold text-[15px] tracking-tight">
              Chat Telegram
            </div>
            <div class="text-slate-500 text-xs font-medium mt-0.5">
              (Chat Telegram 24/7)
            </div>
          </div>
        </a>

        <!-- 3. Tư vấn Zalo -->
        <a
          href="https://zalo.me/0777908179"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-white rounded-full border-2 border-[#0068FF] p-1.5 pr-5 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <div class="w-11 h-11 rounded-full bg-[#0068FF] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <!-- Biểu tượng khung chat Zalo -->
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 36 36" fill="none">
              <path
                d="M18 6C10.82 6 5 10.92 5 17C5 20.19 6.61 23.06 9.18 25.07C8.96 26.25 8.18 28.08 8.05 28.38C7.89 28.74 8.21 29.08 8.58 28.97C10.17 28.5 12.43 27.56 13.56 27.02C14.96 27.65 16.45 28 18 28C25.18 28 31 23.08 31 17C31 10.92 25.18 6 18 6Z"
                fill="white"
              />
              <text
                x="18"
                y="19.5"
                text-anchor="middle"
                fill="#0068FF"
                font-size="8.2"
                font-weight="900"
                font-family="Arial, sans-serif"
              >
                Zalo
              </text>
            </svg>
          </div>
          <div class="text-left leading-tight">
            <div class="text-[#0068FF] font-extrabold text-[15px] tracking-tight">
              Tư vấn Zalo
            </div>
            <div class="text-slate-500 text-xs font-medium mt-0.5">
              (Phản hồi sau 1 phút)
            </div>
          </div>
        </a>

        <!-- 4. Chat Messenger -->
        <a
          href="https://m.me/nhanphuctech"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-white rounded-full border-2 border-[#0084FF] p-1.5 pr-5 flex items-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
        >
          <div class="w-11 h-11 rounded-full bg-gradient-to-tr from-[#006AFF] via-[#0099FF] to-[#9B37FF] text-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.36 2 2 6.13 2 11.7c0 2.91 1.19 5.44 3.14 7.17.16.13.26.35.27.57l.05 1.78c.02.63.67 1.04 1.24.78l1.99-.88c.17-.08.36-.1.55-.05.88.24 1.82.37 2.76.37 5.64 0 10-4.13 10-9.7C22 6.13 17.64 2 12 2zm5.95 7.56l-2.93 4.65a1.5 1.5 0 01-2.17.4l-2.33-1.75a.6.6 0 00-.72 0l-3.15 2.39c-.42.32-.97-.18-.69-.63l2.93-4.65a1.5 1.5 0 012.17-.4l2.33 1.75a.6.6 0 00.72 0l3.15-2.39c.42-.32.97.18.69.63z" />
            </svg>
          </div>
          <div class="text-left leading-tight">
            <div class="text-[#0078FF] font-extrabold text-[15px] tracking-tight">
              Chat Messenger
            </div>
            <div class="text-slate-500 text-xs font-medium mt-0.5">
              (Hỗ trợ 24/7)
            </div>
          </div>
        </a>
      </div>
    </transition>

    <!-- Thanh điều khiển dưới cùng: Nút Tư vấn hỗ trợ + Nút Đóng -->
    <div class="flex items-center gap-2.5">
      <button
        type="button"
        @click="isOpen = !isOpen"
        class="bg-[#055b34] hover:bg-[#00733c] border border-[#1c9c61] text-white rounded-full px-4 py-2.5 flex items-center gap-3 shadow-xl cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      >
        <span class="relative flex h-5 w-5 items-center justify-center">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
          <span class="relative inline-flex rounded-full h-4 w-4 bg-[#1c9c61]"></span>
        </span>
        <div class="text-left leading-tight">
          <div class="font-bold text-sm flex items-center gap-1">
            <span>Tư vấn hỗ trợ</span>
            <span class="text-amber-300">✨</span>
          </div>
          <div class="text-[11px] text-emerald-300 font-medium mt-0.5">
            Trả lời tức thì • 24/7
          </div>
        </div>
      </button>

      <button
        v-if="isOpen"
        type="button"
        @click="isOpen = false"
        title="Thu gọn"
        class="w-12 h-12 rounded-full bg-[#0b1712] hover:bg-[#162a21] border border-[#1c9c61]/60 text-white flex items-center justify-center shadow-xl cursor-pointer transition-all duration-200 hover:rotate-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(true);
</script>

