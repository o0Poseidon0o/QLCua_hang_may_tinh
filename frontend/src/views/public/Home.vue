<template>
  <div class="space-y-12 pb-12">
    <!-- 1. Hero Section: Carousel & Side Banners -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Main Carousel (2 Cols on desktop) -->
        <div class="lg:col-span-2 rounded-2xl overflow-hidden shadow-md">
          <el-carousel height="380px" indicator-position="inside" :interval="4500" arrow="always">
            <el-carousel-item v-for="(slide, idx) in heroSlides" :key="idx">
              <div
                class="relative w-full h-full bg-cover bg-center flex items-center p-8 sm:p-12 text-white"
                :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(1, 79, 43, 0.75)), url(${slide.image})` }"
              >
                <div class="max-w-xl space-y-4">
                  <span
                    v-if="slide.tag"
                    class="inline-block px-3 py-1 bg-red-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-full shadow"
                  >
                    {{ slide.tag }}
                  </span>
                  <h2 class="text-2xl sm:text-4xl font-black leading-tight drop-shadow-md">
                    {{ slide.title }}
                  </h2>
                  <p class="text-sm sm:text-base text-slate-100 line-clamp-2 drop-shadow">
                    {{ slide.desc }}
                  </p>
                  <div class="flex items-center gap-3 pt-2">
                    <router-link
                      :to="slide.link"
                      class="px-6 py-3 bg-[#00733c] hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
                    >
                      {{ slide.btnText }}
                    </router-link>
                    <span v-if="slide.highlight" class="text-xs text-amber-300 font-semibold drop-shadow">
                      {{ slide.highlight }}
                    </span>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 2 Side Promos -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <!-- Side Banner 1: PC Builder -->
          <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-[#014f2b] p-6 text-white shadow-md flex flex-col justify-between group">
            <div class="space-y-2">
              <span class="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">Tiện ích thông minh</span>
              <h3 class="text-xl font-black">Xây Dựng Cấu Hình PC</h3>
              <p class="text-xs text-slate-300">Tự do chọn linh kiện tương thích 100%, nhận ưu đãi giảm đến 1.500.000 đ</p>
            </div>
            <div class="pt-4 flex items-center justify-between">
              <router-link
                to="/pc-builder"
                class="px-4 py-2 bg-white text-[#00733c] font-bold text-xs rounded-lg hover:bg-emerald-50 transition shadow"
              >
                Build PC Ngay &rarr;
              </router-link>
              <div class="text-3xl text-emerald-400 group-hover:scale-110 transition-transform">
                🖥️
              </div>
            </div>
          </div>

          <!-- Side Banner 2: Repair Service -->
          <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-amber-600 to-red-700 p-6 text-white shadow-md flex flex-col justify-between group">
            <div class="space-y-2">
              <span class="text-[11px] font-bold text-amber-200 uppercase tracking-widest">Dịch vụ chuyên nghiệp</span>
              <h3 class="text-xl font-black">Sửa Chữa & Vệ Sinh PC</h3>
              <p class="text-xs text-amber-100">Khám bệnh máy tính miễn phí, vệ sinh tra keo tản nhiệt lấy ngay trong 45 phút</p>
            </div>
            <div class="pt-4 flex items-center justify-between">
              <router-link
                to="/services/repair"
                class="px-4 py-2 bg-white text-red-700 font-bold text-xs rounded-lg hover:bg-amber-50 transition shadow"
              >
                Đặt Lịch Ngay &rarr;
              </router-link>
              <div class="text-3xl text-amber-300 group-hover:scale-110 transition-transform">
                🛠️
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Brand Value Propositions (Cam kết vàng Nhân Phúc Tech) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-[#00733c] flex items-center justify-center text-2xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">100% Chính Hãng</h4>
            <p class="text-xs text-slate-500">Cam kết hoàn tiền 200% nếu giả</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
            🚀
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Giao Nhanh 2 Giờ</h4>
            <p class="text-xs text-slate-500">Nội thành TP.HCM & Hà Nội</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl flex-shrink-0">
            🔄
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">1 Đổi 1 Trong 30 Ngày</h4>
            <p class="text-xs text-slate-500">Lỗi phần cứng do nhà sản xuất</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
            👨‍🔧
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Hỗ Trợ Kỹ Thuật 24/7</h4>
            <p class="text-xs text-slate-500">Chuyên viên hỗ trợ tận nơi</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Flash Sale (Giờ vàng giá sốc) with Countdown -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl">
        <!-- Flash Sale Header -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 border-b border-white/20 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-3xl animate-bounce">⚡</span>
            <div>
              <h2 class="text-2xl sm:text-3xl font-black uppercase tracking-wide flex items-center gap-2">
                GIỜ VÀNG GIÁ SỐC
                <span class="text-xs bg-white text-red-600 px-2.5 py-0.5 rounded-full font-extrabold uppercase">Nhân Phúc Flash Deals</span>
              </h2>
              <p class="text-xs text-red-100">Số lượng có hạn, ưu đãi kết thúc sau:</p>
            </div>
          </div>

          <!-- Countdown Boxes -->
          <div class="flex items-center gap-2 text-slate-900 font-black">
            <div class="bg-white rounded-lg px-3 py-1.5 text-center min-w-[45px] shadow">
              <span class="text-lg leading-tight">{{ padZero(countdown.hours) }}</span>
              <span class="block text-[9px] uppercase text-slate-400 -mt-0.5">Giờ</span>
            </div>
            <span class="text-white font-bold text-lg">:</span>
            <div class="bg-white rounded-lg px-3 py-1.5 text-center min-w-[45px] shadow">
              <span class="text-lg leading-tight">{{ padZero(countdown.minutes) }}</span>
              <span class="block text-[9px] uppercase text-slate-400 -mt-0.5">Phút</span>
            </div>
            <span class="text-white font-bold text-lg">:</span>
            <div class="bg-white rounded-lg px-3 py-1.5 text-center min-w-[45px] shadow">
              <span class="text-lg leading-tight text-red-600">{{ padZero(countdown.seconds) }}</span>
              <span class="block text-[9px] uppercase text-slate-400 -mt-0.5">Giây</span>
            </div>
          </div>
        </div>

        <!-- Flash Sale Products Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="item in flashSaleProducts"
            :key="item.id"
            class="bg-white text-slate-800 rounded-xl p-3.5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative"
          >
            <!-- Discount Badge -->
            <div class="absolute top-2 left-2 z-10 bg-red-600 text-white font-black text-xs px-2 py-0.5 rounded-md shadow">
              -{{ item.discount }}%
            </div>

            <!-- Image -->
            <router-link :to="'/product/' + item.id" class="relative aspect-square rounded-lg overflow-hidden bg-slate-50 mb-3 flex items-center justify-center p-2">
              <img
                :src="item.image"
                :alt="item.name"
                class="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            </router-link>

            <!-- Info -->
            <div class="space-y-1.5 flex-1 flex flex-col justify-between">
              <div>
                <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {{ item.brand }}
                </span>
                <router-link :to="'/product/' + item.id" class="block text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 mt-1 min-h-[38px] group-hover:text-[#00733c] transition">
                  {{ item.name }}
                </router-link>
              </div>

              <div>
                <!-- Price -->
                <div class="flex items-baseline gap-2">
                  <span class="text-base sm:text-lg font-black text-red-600">
                    {{ formatPrice(item.price) }}
                  </span>
                  <span class="text-xs text-slate-400 line-through">
                    {{ formatPrice(item.originalPrice) }}
                  </span>
                </div>

                <!-- Progress Bar -->
                <div class="mt-2 space-y-1">
                  <div class="flex justify-between text-[10px] text-slate-500 font-semibold">
                    <span>Đã bán {{ item.sold }}/{{ item.stock }}</span>
                    <span class="text-red-600 font-bold">Hot</span>
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      class="bg-gradient-to-r from-amber-500 to-red-500 h-2 rounded-full"
                      :style="{ width: `${(item.sold / item.stock) * 100}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Action Button -->
                <button
                  @click="addToCart(item)"
                  class="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <el-icon><ShoppingCart /></el-icon> Mua Ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Featured Category: PC Gaming Nhân Phúc Tech -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl text-[#00733c]">🖥️</span>
            <div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900">PC GAMING & ĐỒ HỌA NHÂN PHÚC</h2>
              <p class="text-xs text-slate-500">Cấu hình tối ưu hiệu năng, linh kiện tuyển chọn, bảo hành 36 tháng</p>
            </div>
          </div>
          <!-- Filter Tabs -->
          <div class="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
            <button
              v-for="tab in pcTabs"
              :key="tab.value"
              @click="activePcTab = tab.value"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition whitespace-nowrap',
                activePcTab === tab.value
                  ? 'bg-[#00733c] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- PC Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="pc in filteredPcs"
            :key="pc.id"
            class="border border-slate-100 hover:border-emerald-500 rounded-xl p-3.5 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group bg-white"
          >
            <router-link :to="'/product/' + pc.id" class="relative aspect-square rounded-lg overflow-hidden bg-slate-50 mb-3 flex items-center justify-center p-2">
              <img :src="pc.image" :alt="pc.name" class="object-contain w-full h-full group-hover:scale-105 transition-transform" />
              <span v-if="pc.badge" class="absolute top-2 left-2 text-[10px] font-black bg-emerald-600 text-white px-2 py-0.5 rounded shadow">
                {{ pc.badge }}
              </span>
            </router-link>

            <div class="space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <router-link :to="'/product/' + pc.id" class="block text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[38px] group-hover:text-[#00733c] transition">
                  {{ pc.name }}
                </router-link>
                <!-- Specs Badges -->
                <div class="flex flex-wrap gap-1 mt-2 text-[10px] text-slate-600">
                  <span class="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{{ pc.cpu }}</span>
                  <span class="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{{ pc.vga }}</span>
                  <span class="bg-slate-100 px-1.5 py-0.5 rounded font-medium">{{ pc.ram }}</span>
                </div>
              </div>

              <div class="pt-2 border-t border-slate-100">
                <div class="flex items-baseline gap-2">
                  <span class="text-base font-extrabold text-red-600">{{ formatPrice(pc.price) }}</span>
                  <span v-if="pc.originalPrice" class="text-xs text-slate-400 line-through">
                    {{ formatPrice(pc.originalPrice) }}
                  </span>
                </div>
                <div class="mt-2.5 flex gap-2">
                  <button
                    @click="addToCart(pc)"
                    class="flex-1 py-1.5 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <el-icon><ShoppingCart /></el-icon> Thêm Vào Giỏ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 text-center">
          <router-link
            to="/shop?category=pc-gaming"
            class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00733c] text-[#00733c] font-bold text-xs hover:bg-emerald-50 transition"
          >
            Xem Thêm Các Cấu Hình PC Khác &rarr;
          </router-link>
        </div>
      </div>
    </section>

    <!-- 5. Featured Category: Laptop Chính Hãng -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl text-[#00733c]">💻</span>
            <div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900">LAPTOP CHÍNH HÃNG BÁN CHẠY</h2>
              <p class="text-xs text-slate-500">Laptop Gaming, Văn Phòng, Đồ Họa - Trả góp 0% lãi suất</p>
            </div>
          </div>
          <router-link to="/shop?category=laptop" class="text-xs font-bold text-[#00733c] hover:underline">
            Xem tất cả laptop &rarr;
          </router-link>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="laptop in laptops"
            :key="laptop.id"
            class="border border-slate-100 hover:border-emerald-500 rounded-xl p-3.5 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group bg-white"
          >
            <router-link :to="'/product/' + laptop.id" class="relative aspect-square rounded-lg overflow-hidden bg-slate-50 mb-3 flex items-center justify-center p-2">
              <img :src="laptop.image" :alt="laptop.name" class="object-contain w-full h-full group-hover:scale-105 transition-transform" />
              <span class="absolute top-2 right-2 text-[10px] font-bold bg-amber-500 text-white px-2 py-0.5 rounded shadow">
                {{ laptop.brand }}
              </span>
            </router-link>

            <div class="space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <router-link :to="'/product/' + laptop.id" class="block text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 min-h-[38px] group-hover:text-[#00733c] transition">
                  {{ laptop.name }}
                </router-link>
                <p class="text-[11px] text-slate-500 mt-1">{{ laptop.specs }}</p>
              </div>

              <div class="pt-2 border-t border-slate-100">
                <div class="flex items-baseline gap-2">
                  <span class="text-base font-extrabold text-red-600">{{ formatPrice(laptop.price) }}</span>
                  <span v-if="laptop.originalPrice" class="text-xs text-slate-400 line-through">
                    {{ formatPrice(laptop.originalPrice) }}
                  </span>
                </div>
                <div class="mt-2.5">
                  <button
                    @click="addToCart(laptop)"
                    class="w-full py-1.5 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <el-icon><ShoppingCart /></el-icon> Mua Ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Big CTA Banner: PC Builder Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#014f2b] to-emerald-950 p-8 sm:p-12 text-white shadow-2xl">
        <div class="relative z-10 max-w-2xl space-y-4">
          <span class="inline-block px-3.5 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider rounded-full border border-emerald-500/30">
            Tính Năng Độc Quyền Nhân Phúc Tech
          </span>
          <h2 class="text-2xl sm:text-4xl font-black leading-tight">
            Tự Tay Xây Dựng Cỗ Máy PC Mơ Ước
          </h2>
          <p class="text-sm sm:text-base text-slate-300">
            Hệ thống tự động lọc linh kiện tương thích 100%, cộng tiền tức thì, miễn phí công lắp đặt và tặng kèm gói vệ sinh máy 2 năm tại Nhân Phúc Tech.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <router-link
              to="/pc-builder"
              class="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <el-icon :size="18"><Cpu /></el-icon> Bắt Đầu Build Cấu Hình Ngay
            </router-link>
            <router-link
              to="/services/it-outsourcing"
              class="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition"
            >
              Yêu Cầu Báo Giá Doanh Nghiệp
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Tech Articles & Tips -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-black text-slate-900">TIN TỨC & CẨM NANG CÔNG NGHỆ</h2>
          <p class="text-xs text-slate-500">Cập nhật xu hướng linh kiện và thủ thuật tối ưu máy tính mới nhất</p>
        </div>
        <router-link to="/tin-tuc" class="text-xs font-bold text-[#00733c] hover:underline">
          Xem tất cả bài viết &rarr;
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <router-link
          v-for="post in newsPosts"
          :key="post.id"
          :to="'/tin-tuc/' + post.slug"
          class="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition group block"
        >
          <div class="aspect-video overflow-hidden bg-slate-100">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
          </div>
          <div class="p-5 space-y-2">
            <div class="flex items-center gap-2 text-[11px] text-slate-400">
              <span class="text-[#00733c] font-bold">{{ post.category }}</span>
              <span>•</span>
              <span>{{ post.date }}</span>
            </div>
            <h3 class="text-sm font-bold text-slate-800 line-clamp-2 group-hover:text-[#00733c] transition">
              {{ post.title }}
            </h3>
            <p class="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {{ post.excerpt }}
            </p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 8. Brand Logos Showcase -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
        <h3 class="text-xs uppercase font-extrabold tracking-widest text-slate-400 mb-6">
          ĐỐI TÁC CÔNG NGHỆ CHÍNH HÃNG HÀNG ĐẦU
        </h3>
        <div class="flex flex-wrap justify-center items-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <span class="font-black text-xl tracking-tighter text-blue-700">intel.</span>
          <span class="font-black text-xl tracking-tighter text-red-600">AMD</span>
          <span class="font-black text-xl tracking-tighter text-green-600">NVIDIA</span>
          <span class="font-black text-xl tracking-tighter text-slate-900">ASUS</span>
          <span class="font-black text-xl tracking-tighter text-red-700">msi</span>
          <span class="font-black text-xl tracking-tighter text-blue-900">GIGABYTE</span>
          <span class="font-black text-xl tracking-tighter text-yellow-600">CORSAIR</span>
          <span class="font-black text-xl tracking-tighter text-blue-600">SAMSUNG</span>
          <span class="font-black text-xl tracking-tighter text-red-800">Kingston</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { ShoppingCart, Cpu } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { ElMessage } from 'element-plus';
import { mockNews } from '../../data/mockNews';

const cartStore = useCartStore();

// Hero Slides
const heroSlides = [
  {
    title: 'Đại Tiệc PC Gaming Nhân Phúc Tech - Sức Mạnh RTX 40-Series',
    desc: 'Trải nghiệm đỉnh cao công nghệ Ray Tracing và DLSS 3. Giảm trực tiếp đến 25% khi mua kèm màn hình gaming.',
    tag: 'Siêu Ưu Đãi Tháng',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&q=80',
    link: '/shop?category=pc-gaming',
    btnText: 'Khám Phá Ngay',
    highlight: 'Tặng Bàn Phím Cơ Gaming 1.200.000 đ'
  },
  {
    title: 'Laptop Gaming & Đồ Họa Thế Hệ Mới 2026',
    desc: 'Chip Intel Gen 14 & AMD Ryzen 8000 Series. Màn hình chuẩn màu 100% sRGB, bảo hành chính hãng 2 năm tận nơi.',
    tag: 'Chính Hãng 100%',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80',
    link: '/shop?category=laptop',
    btnText: 'Xem Sản Phẩm',
    highlight: 'Hỗ Trợ Trả Góp 0% Lãi Suất'
  },
  {
    title: 'Linh Kiện PC Giá Rẻ Nhất - Bảo Hành Đổi Mới',
    desc: 'Đầy đủ CPU Intel/AMD, Card đồ họa RTX 4060, Mainboard, RAM DDR5, Nguồn 80 Plus Gold sẵn kho giao ngay.',
    tag: 'Giá Cực Sốc',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&q=80',
    link: '/shop?category=linh-kien',
    btnText: 'Mua Linh Kiện',
    highlight: 'Miễn Phí Giao Hàng Toàn Quốc'
  }
];

// Countdown Logic
const countdown = ref({
  hours: 4,
  minutes: 32,
  seconds: 18
});

let timer: any = null;

const startCountdown = () => {
  timer = setInterval(() => {
    if (countdown.value.seconds > 0) {
      countdown.value.seconds--;
    } else {
      countdown.value.seconds = 59;
      if (countdown.value.minutes > 0) {
        countdown.value.minutes--;
      } else {
        countdown.value.minutes = 59;
        if (countdown.value.hours > 0) {
          countdown.value.hours--;
        } else {
          countdown.value = { hours: 6, minutes: 0, seconds: 0 };
        }
      }
    }
  }, 1000);
};

const padZero = (val: number) => String(val).padStart(2, '0');

// Flash Sale Products
const flashSaleProducts = ref([
  {
    id: 'vga-1',
    name: 'Card Màn Hình ASUS Dual GeForce RTX 4060 EVO OC 8GB',
    brand: 'ASUS',
    price: 8490000,
    originalPrice: 10290000,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    sold: 19,
    stock: 25
  },
  {
    id: 'cpu-1',
    name: 'CPU Intel Core i5-13400F (Up to 4.6GHz, 10 Cores 16 Threads)',
    brand: 'Intel',
    price: 4390000,
    originalPrice: 5490000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80',
    sold: 28,
    stock: 30
  },
  {
    id: 'mon-1',
    name: 'Màn Hình Gaming ASUS TUF VG249Q3A 24" Fast IPS 180Hz 1ms',
    brand: 'ASUS',
    price: 3190000,
    originalPrice: 4290000,
    discount: 26,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
    sold: 14,
    stock: 20
  },
  {
    id: 'ram-1',
    name: 'RAM Kingston FURY Beast RGB 16GB (2x8GB) DDR4 3200MHz',
    brand: 'Kingston',
    price: 1090000,
    originalPrice: 1590000,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
    sold: 42,
    stock: 50
  }
]);

// PC Gaming Tabs
const pcTabs = [
  { label: 'Tất Cả Cấu Hình', value: 'all' },
  { label: 'Phổ Thông (< 15Tr)', value: 'entry' },
  { label: 'Trung Cấp (15-25Tr)', value: 'mid' },
  { label: 'Hi-End (> 25Tr)', value: 'high' }
];
const activePcTab = ref('all');

const pcs = ref([
  {
    id: 'pc-1',
    name: 'PC Gaming Nhân Phúc Dragon Core i5 13400F | RTX 4060 8GB | 16GB RAM',
    tier: 'mid',
    price: 17990000,
    originalPrice: 20990000,
    cpu: 'i5-13400F',
    vga: 'RTX 4060 8G',
    ram: '16GB DDR4',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&q=80',
    badge: 'Bán Chạy Nhất'
  },
  {
    id: 'pc-2',
    name: 'PC Gaming Nhân Phúc Starter Core i3 12100F | GTX 1650 4GB | 16GB RAM',
    tier: 'entry',
    price: 9890000,
    originalPrice: 11500000,
    cpu: 'i3-12100F',
    vga: 'GTX 1650 4G',
    ram: '16GB DDR4',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&q=80',
    badge: 'Tiết Kiệm'
  },
  {
    id: 'pc-3',
    name: 'PC Gaming Nhân Phúc Cyberpunk Core i7 14700KF | RTX 4070 Super 12GB',
    tier: 'high',
    price: 36990000,
    originalPrice: 41990000,
    cpu: 'i7-14700KF',
    vga: 'RTX 4070 Super',
    ram: '32GB DDR5',
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&q=80',
    badge: 'Hi-End Gaming'
  },
  {
    id: 'pc-4',
    name: 'PC Gaming Nhân Phúc Phantom Ryzen 5 7600 | RTX 4060 Ti 8GB | 16GB DDR5',
    tier: 'mid',
    price: 22490000,
    originalPrice: 25900000,
    cpu: 'R5 7600',
    vga: 'RTX 4060 Ti',
    ram: '16GB DDR5',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
    badge: 'Khuyên Dùng'
  }
]);

const filteredPcs = computed(() => {
  if (activePcTab.value === 'all') return pcs.value;
  return pcs.value.filter((p) => p.tier === activePcTab.value);
});

// Laptop List
const laptops = ref([
  {
    id: 'lap-1',
    name: 'Laptop Gaming ASUS TUF Gaming A15 FA506NC-HN011W (Ryzen 5 / RTX 3050)',
    brand: 'ASUS',
    specs: 'R5-7535HS • 16GB • 512GB • RTX 3050 4G • 15.6" 144Hz',
    price: 17490000,
    originalPrice: 20990000,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80'
  },
  {
    id: 'lap-2',
    name: 'Laptop Lenovo LOQ 15IAX9 83GS001RVN (i5-12450HX / RTX 3050)',
    brand: 'Lenovo',
    specs: 'i5-12450HX • 12GB • 512GB • RTX 3050 6G • 15.6" 144Hz 100% sRGB',
    price: 18990000,
    originalPrice: 22490000,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80'
  },
  {
    id: 'lap-3',
    name: 'Laptop Acer Nitro 5 Tiger AN515-58-52SP (i5-12500H / RTX 4050)',
    brand: 'Acer',
    specs: 'i5-12500H • 16GB • 512GB • RTX 4050 6G • 15.6" FHD 144Hz',
    price: 21990000,
    originalPrice: 24990000,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80'
  },
  {
    id: 'lap-4',
    name: 'Laptop Dell Inspiron 15 3520 (Core i5-1235U / 16GB / 512GB SSD)',
    brand: 'Dell',
    specs: 'i5-1235U • 16GB RAM • 512GB SSD • 15.6" FHD 120Hz',
    price: 13990000,
    originalPrice: 15490000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80'
  }
]);

// Tech News
const newsPosts = computed(() => mockNews.slice(0, 3));

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const addToCart = (product: any) => {
  cartStore.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    originalPrice: product.originalPrice,
    image: product.image
  });
  ElMessage.success({
    message: `Đã thêm "${product.name}" vào giỏ hàng!`,
    duration: 2000
  });
};

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
