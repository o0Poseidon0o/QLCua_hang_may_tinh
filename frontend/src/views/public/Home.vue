<template>
  <div class="space-y-6 sm:space-y-10 lg:space-y-12 pb-12">
    <!-- 1. Hero Section: Carousel & Side Banners -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <!-- Main Carousel (2 Cols on desktop) -->
        <div class="lg:col-span-2 rounded-2xl overflow-hidden shadow-md">
          <el-carousel :height="carouselHeight" indicator-position="inside" :interval="4500" :arrow="isMobile ? 'never' : 'hover'">
            <el-carousel-item v-for="slide in heroSlides" :key="slide.id">
              <div
                class="relative w-full h-full bg-cover bg-center flex items-center px-5 py-6 sm:p-10 lg:p-12 text-white"
                :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(1, 79, 43, 0.75)), url(${slide.image})` }"
              >
                <div class="max-w-xl space-y-2 sm:space-y-4">
                  <span
                    v-if="slide.tag"
                    class="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 bg-red-600 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-wider rounded-full shadow"
                  >
                    {{ slide.tag }}
                  </span>
                  <h2 class="text-lg sm:text-3xl lg:text-4xl font-black leading-snug sm:leading-tight drop-shadow-md line-clamp-2">
                    {{ slide.title }}
                  </h2>
                  <p class="text-xs sm:text-base text-slate-100 line-clamp-2 drop-shadow">
                    {{ slide.desc }}
                  </p>
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 sm:pt-2">
                    <router-link
                      v-if="slide.btnText"
                      :to="slide.link || '/shop'"
                      class="px-4 py-2 sm:px-6 sm:py-3 bg-[#00733c] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm rounded-lg sm:rounded-xl shadow-lg transition transform hover:-translate-y-0.5 whitespace-nowrap"
                    >
                      {{ slide.btnText }}
                    </router-link>
                    <span v-if="slide.highlight" class="text-[11px] sm:text-xs text-amber-300 font-semibold drop-shadow">
                      {{ slide.highlight }}
                    </span>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>

        <!-- 2 Side Promos -->
        <div class="grid grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
          <div
            v-for="promo in siteContentStore.homePromos.sideBanners"
            :key="promo.id"
            class="relative rounded-2xl overflow-hidden p-3.5 sm:p-6 text-white shadow-md flex flex-col justify-between group"
            :class="sideBannerClass(promo.theme)"
          >
            <div class="space-y-1 sm:space-y-2">
              <span class="hidden sm:inline text-[11px] font-bold uppercase tracking-widest opacity-90">
                {{ promo.subtitle }}
              </span>
              <h3 class="text-sm sm:text-xl font-black leading-tight">{{ promo.title }}</h3>
              <p class="hidden sm:block text-xs opacity-90">{{ promo.desc }}</p>
            </div>
            <div class="pt-2.5 sm:pt-4 flex items-center justify-between">
              <router-link
                :to="promo.link || '/shop'"
                class="px-2.5 py-1.5 sm:px-4 sm:py-2 bg-white text-slate-900 font-bold text-[11px] sm:text-xs rounded-lg hover:bg-emerald-50 transition shadow"
              >
                {{ promo.btnText }}
              </router-link>
              <div class="text-xl sm:text-3xl group-hover:scale-110 transition-transform">
                {{ promo.icon }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Brand Value Propositions (Cam kết vàng Nhân Phúc Tech) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 text-[#00733c] flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">100% Chính Hãng</h4>
            <p class="text-xs text-slate-500">Cam kết hoàn tiền 200% nếu giả</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
            🚀
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Giao Nhanh 2 Giờ</h4>
            <p class="text-xs text-slate-500">Nội thành TP.HCM & Hà Nội</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
            🔄
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">1 Đổi 1 Trong 30 Ngày</h4>
            <p class="text-xs text-slate-500">Lỗi phần cứng do nhà sản xuất</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
            👨‍🔧
          </div>
          <div>
            <h4 class="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Hỗ Trợ Kỹ Thuật 24/7</h4>
            <p class="text-xs text-slate-500">Chuyên viên hỗ trợ tận nơi</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Flash Sale (Giờ vàng giá sốc) with Countdown -->
    <section v-if="siteContentStore.flashSale.enabled" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 rounded-2xl p-3.5 sm:p-6 text-white shadow-xl">
        <!-- Flash Sale Header -->
        <div class="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4 sm:mb-6 border-b border-white/20 pb-3 sm:pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl sm:text-3xl animate-bounce">⚡</span>
            <div>
              <h2 class="text-lg sm:text-3xl font-black uppercase tracking-wide flex flex-wrap items-center gap-x-2 gap-y-1">
                {{ siteContentStore.flashSale.title }}
                <span
                  v-if="siteContentStore.flashSale.badge"
                  class="text-[10px] sm:text-xs bg-white text-red-600 px-2 sm:px-2.5 py-0.5 rounded-full font-extrabold uppercase"
                >
                  {{ siteContentStore.flashSale.badge }}
                </span>
              </h2>
              <p class="text-xs text-red-100">{{ siteContentStore.flashSale.subtitle }}</p>
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
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div
            v-for="item in flashSaleProducts"
            :key="item.id"
            class="bg-white text-slate-800 rounded-xl p-2.5 sm:p-3.5 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between group relative"
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
                <div class="flex flex-wrap items-baseline gap-x-2">
                  <span class="text-sm sm:text-lg font-black text-red-600">
                    {{ formatPrice(item.price) }}
                  </span>
                  <span class="text-[11px] sm:text-xs text-slate-400 line-through">
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
                  class="mt-2.5 sm:mt-3 w-full py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
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
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl text-[#00733c]">🖥️</span>
            <div>
              <h2 class="text-base sm:text-2xl font-black text-slate-900">PC GAMING & ĐỒ HỌA NHÂN PHÚC</h2>
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
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div
            v-for="pc in filteredPcs"
            :key="pc.id"
            class="border border-slate-100 hover:border-emerald-500 rounded-xl p-2.5 sm:p-3.5 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group bg-white"
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
                <div class="flex flex-wrap items-baseline gap-x-2">
                  <span class="text-sm sm:text-base font-extrabold text-red-600">{{ formatPrice(pc.price) }}</span>
                  <span v-if="pc.originalPrice" class="text-[11px] sm:text-xs text-slate-400 line-through">
                    {{ formatPrice(pc.originalPrice) }}
                  </span>
                </div>
                <div class="mt-2.5 flex gap-2">
                  <button
                    @click="addToCart(pc)"
                    class="flex-1 py-1.5 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-bold rounded-lg transition shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <el-icon><ShoppingCart /></el-icon> <span class="hidden sm:inline">Thêm Vào</span> Giỏ
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
      <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6 border-b border-slate-100 pb-3 sm:pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl text-[#00733c]">💻</span>
            <div>
              <h2 class="text-base sm:text-2xl font-black text-slate-900">LAPTOP CHÍNH HÃNG BÁN CHẠY</h2>
              <p class="text-xs text-slate-500">Laptop Gaming, Văn Phòng, Đồ Họa - Trả góp 0% lãi suất</p>
            </div>
          </div>
          <router-link to="/shop?category=laptop" class="text-xs font-bold text-[#00733c] hover:underline">
            Xem tất cả laptop &rarr;
          </router-link>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          <div
            v-for="laptop in laptops"
            :key="laptop.id"
            class="border border-slate-100 hover:border-emerald-500 rounded-xl p-2.5 sm:p-3.5 hover:shadow-lg transition-all duration-200 flex flex-col justify-between group bg-white"
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
                <div class="flex flex-wrap items-baseline gap-x-2">
                  <span class="text-sm sm:text-base font-extrabold text-red-600">{{ formatPrice(laptop.price) }}</span>
                  <span v-if="laptop.originalPrice" class="text-[11px] sm:text-xs text-slate-400 line-through">
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
      <div class="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-950 via-[#014f2b] to-emerald-950 p-6 sm:p-12 text-white shadow-2xl">
        <div class="relative z-10 max-w-2xl space-y-4">
          <span
            v-if="siteContentStore.homePromos.ctaBadge"
            class="inline-block px-3.5 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs uppercase tracking-wider rounded-full border border-emerald-500/30"
          >
            {{ siteContentStore.homePromos.ctaBadge }}
          </span>
          <h2 class="text-2xl sm:text-4xl font-black leading-tight">
            {{ siteContentStore.homePromos.ctaTitle }}
          </h2>
          <p class="text-sm sm:text-base text-slate-300">
            {{ siteContentStore.homePromos.ctaDesc }}
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <router-link
              v-if="siteContentStore.homePromos.ctaPrimaryText"
              :to="siteContentStore.homePromos.ctaPrimaryLink || '/pc-builder'"
              class="px-5 py-3 sm:px-8 sm:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <el-icon :size="18"><Cpu /></el-icon> {{ siteContentStore.homePromos.ctaPrimaryText }}
            </router-link>
            <router-link
              v-if="siteContentStore.homePromos.ctaSecondaryText"
              :to="siteContentStore.homePromos.ctaSecondaryLink || '/services/it-outsourcing'"
              class="px-5 py-3 sm:px-6 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition"
            >
              {{ siteContentStore.homePromos.ctaSecondaryText }}
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. Tech Articles & Tips -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end gap-3 mb-4 sm:mb-6">
        <div>
          <h2 class="text-base sm:text-2xl font-black text-slate-900">TIN TỨC & CẨM NANG CÔNG NGHỆ</h2>
          <p class="text-xs text-slate-500">Cập nhật xu hướng linh kiện và thủ thuật tối ưu máy tính mới nhất</p>
        </div>
        <router-link to="/tin-tuc" class="text-xs font-bold text-[#00733c] hover:underline">
          Xem tất cả bài viết &rarr;
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <div class="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
          <span class="font-black text-base sm:text-xl tracking-tighter text-blue-700">intel.</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-red-600">AMD</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-green-600">NVIDIA</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-slate-900">ASUS</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-red-700">msi</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-blue-900">GIGABYTE</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-yellow-600">CORSAIR</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-blue-600">SAMSUNG</span>
          <span class="font-black text-base sm:text-xl tracking-tighter text-red-800">Kingston</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { ShoppingCart, Cpu } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { ElMessage } from 'element-plus';
import { useSiteContentStore } from '../../stores/siteContent';
import { useProductStore } from '../../stores/products';

const cartStore = useCartStore();
const siteContentStore = useSiteContentStore();
const productStore = useProductStore();

// Hero Slides – lấy từ Admin (Quản lý Banner trang chủ), chỉ hiển thị slide đang bật
const heroSlides = computed(() => siteContentStore.heroBanners.filter((b) => b.active));

const sideBannerClass = (theme: string) => {
  if (theme === 'amber') return 'bg-gradient-to-br from-amber-600 to-red-700';
  if (theme === 'blue') return 'bg-gradient-to-br from-blue-800 to-indigo-950';
  if (theme === 'purple') return 'bg-gradient-to-br from-purple-800 to-slate-950';
  return 'bg-gradient-to-br from-slate-900 to-[#014f2b]';
};

// Chiều cao carousel co giãn theo kích thước màn hình
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280);
const onResize = () => {
  windowWidth.value = window.innerWidth;
};
const isMobile = computed(() => windowWidth.value < 640);
const carouselHeight = computed(() => {
  if (windowWidth.value < 400) return '210px';
  if (windowWidth.value < 640) return '230px';
  if (windowWidth.value < 1024) return '320px';
  return '380px';
});

// Countdown Logic – đồng bộ với cấu hình Giờ Vàng Giá Sốc trong Admin
const countdown = ref({
  hours: siteContentStore.flashSale.hours ?? 4,
  minutes: siteContentStore.flashSale.minutes ?? 32,
  seconds: siteContentStore.flashSale.seconds ?? 18,
});

watch(
  () => [
    siteContentStore.flashSale.hours,
    siteContentStore.flashSale.minutes,
    siteContentStore.flashSale.seconds,
  ],
  ([h, m, s]) => {
    countdown.value = {
      hours: Number(h) || 0,
      minutes: Number(m) || 0,
      seconds: Number(s) || 0,
    };
  }
);

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
          countdown.value = {
            hours: siteContentStore.flashSale.hours || 6,
            minutes: siteContentStore.flashSale.minutes || 0,
            seconds: siteContentStore.flashSale.seconds || 0,
          };
        }
      }
    }
  }, 1000);
};

const padZero = (val: number) => String(val).padStart(2, '0');

// Flash Sale Products – lấy trực tiếp từ Admin (Giờ vàng giá sốc)
const flashSaleProducts = computed(() => siteContentStore.flashSale.items);

// PC Gaming Tabs
const pcTabs = [
  { label: 'Tất Cả Cấu Hình', value: 'all' },
  { label: 'Phổ Thông (< 15Tr)', value: 'entry' },
  { label: 'Trung Cấp (15-25Tr)', value: 'mid' },
  { label: 'Hi-End (> 25Tr)', value: 'high' },
];
const activePcTab = ref('all');

const extractSpecValue = (specs: { label: string; value: string }[] | undefined, keyword: string, fallback = '') => {
  if (!specs || !specs.length) return fallback;
  const found = specs.find((s) => s.label.toLowerCase().includes(keyword.toLowerCase()));
  if (!found) return fallback;
  return found.value.split('(')[0]!.trim().slice(0, 22);
};

const pcs = computed(() => {
  return productStore.products
    .filter((p) => p.parentCategory === 'pc-gaming' || p.category.startsWith('pc-'))
    .map((p) => {
      const inferredTier =
        p.tier || (p.price < 15000000 ? 'entry' : p.price <= 26000000 ? 'mid' : 'high');
      return {
        id: p.id,
        name: p.name,
        tier: inferredTier,
        price: p.price,
        originalPrice: p.originalPrice,
        cpu: extractSpecValue(p.specs, 'cpu', p.specs?.[0]?.value?.slice(0, 18) || 'Core i5'),
        vga: extractSpecValue(p.specs, 'vga', extractSpecValue(p.specs, 'card', p.specs?.[1]?.value?.slice(0, 18) || 'RTX Series')),
        ram: extractSpecValue(p.specs, 'ram', p.specs?.[2]?.value?.slice(0, 18) || '16GB RAM'),
        image: p.image,
        badge: p.badge || (inferredTier === 'high' ? 'Hi-End' : 'Bán Chạy'),
      };
    });
});

const filteredPcs = computed(() => {
  if (activePcTab.value === 'all') return pcs.value.slice(0, 8);
  return pcs.value.filter((p) => p.tier === activePcTab.value).slice(0, 8);
});

// Laptop List – lấy trực tiếp từ kho sản phẩm
const laptops = computed(() => {
  return productStore.products
    .filter((p) => p.parentCategory === 'laptop' || p.category.startsWith('laptop') || p.category === 'macbook')
    .slice(0, 8)
    .map((p) => {
      const shortSpecs =
        p.specs && p.specs.length
          ? p.specs
              .slice(0, 4)
              .map((s) => s.value.split('(')[0]!.trim().slice(0, 22))
              .join(' • ')
          : p.description?.slice(0, 65) || '';
      return {
        id: p.id,
        name: p.name,
        brand: p.brand,
        specs: shortSpecs,
        price: p.price,
        originalPrice: p.originalPrice,
        image: p.image,
      };
    });
});

// Tech News
const newsPosts = computed(() => siteContentStore.newsList.slice(0, 3));

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
  window.addEventListener('resize', onResize);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('resize', onResize);
});
</script>
