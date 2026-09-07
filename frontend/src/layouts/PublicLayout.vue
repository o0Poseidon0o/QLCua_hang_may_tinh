<template>
  <div class="min-h-screen flex flex-col bg-[#f6f8fb] font-sans text-slate-800">
    <!-- Top Bar -->
    <div class="bg-[#014f2b] text-white text-xs py-1.5 border-b border-emerald-900/30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-between items-center gap-2">
        <div class="flex items-center gap-4">
          <span class="flex items-center gap-1.5 text-emerald-100">
            <el-icon><Phone /></el-icon>
            Hotline: <strong class="text-amber-300 font-bold">0777908179</strong> (8h00 - 21h30)
          </span>
          <span class="hidden md:inline-block text-emerald-300/40">|</span>
          <span class="hidden md:flex items-center gap-1.5 text-emerald-100">
            <el-icon><Location /></el-icon>
            Cửa Hàng: 179 Nơ Trang Long P.Bình Thạnh TPHCM
          </span>
        </div>
        <div class="flex items-center gap-4 text-emerald-100">
          <router-link to="/services/repair" class="hover:text-amber-300 transition">Tra cứu bảo hành</router-link>
          <span>|</span>
          <router-link to="/services/it-outsourcing" class="hover:text-amber-300 transition">Giải pháp Doanh nghiệp</router-link>
          <span>|</span>
          <router-link to="/admin" class="hover:text-amber-300 text-amber-200 font-medium transition flex items-center gap-1">
            <el-icon><Setting /></el-icon> Quản trị (ERP)
          </router-link>
        </div>
      </div>
    </div>

    <!-- Main Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 flex-shrink-0 group">
          <img :src="logoImg" alt="NetSoft Logo" class="h-11 w-auto object-contain group-hover:scale-105 transition-transform" />
          <div>
            <div class="text-xl font-extrabold tracking-tight text-[#014f2b] flex items-center gap-1">
              Net<span class="text-emerald-600">Soft</span>
            </div>
            <p class="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">Computer & Technology</p>
          </div>
        </router-link>

        <!-- Search Bar with Hot Keywords -->
        <div class="flex-1 max-w-2xl mx-2 hidden sm:block">
          <div class="relative">
            <input
              v-model="searchKeyword"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Bạn cần tìm laptop, CPU, VGA, màn hình gaming hay linh kiện gì?..."
              class="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#00733c] focus:bg-white focus:ring-2 focus:ring-emerald-100 transition shadow-inner"
            />
            <button
              @click="handleSearch"
              class="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#00733c] hover:bg-[#014f2b] text-white rounded-full flex items-center justify-center transition shadow-sm"
              title="Tìm kiếm"
            >
              <el-icon :size="16"><Search /></el-icon>
            </button>
          </div>
          <!-- Hot Tags -->
          <div class="flex items-center gap-2 mt-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none">
            <span class="text-slate-400 text-[11px] font-medium">Gợi ý:</span>
            <button @click="searchTag('RTX 4060')" class="hover:text-[#00733c] hover:underline">RTX 4060</button>
            <span>•</span>
            <button @click="searchTag('Core i5 13400')" class="hover:text-[#00733c] hover:underline">Core i5 13400</button>
            <span>•</span>
            <button @click="searchTag('Laptop Gaming Asus')" class="hover:text-[#00733c] hover:underline">Laptop Asus TUF</button>
            <span>•</span>
            <button @click="searchTag('Màn hình 165Hz')" class="hover:text-[#00733c] hover:underline">Màn hình 165Hz</button>
            <span>•</span>
            <button @click="searchTag('PC Gaming')" class="hover:text-[#00733c] hover:underline">PC Gaming NetSoft</button>
          </div>
        </div>

        <!-- Right Actions: PC Builder, Khuyến mãi, Cart -->
        <div class="flex items-center gap-3">
          <!-- PC Builder CTA -->
          <router-link
            to="/pc-builder"
            class="hidden lg:flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-[#00733c] text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg hover:from-emerald-500 hover:to-emerald-700 transition transform hover:-translate-y-0.5"
          >
            <el-icon :size="18"><Cpu /></el-icon>
            <div class="text-left leading-tight">
              <span class="block text-[10px] font-medium text-emerald-200 uppercase">Công cụ</span>
              <span>Xây Dựng PC</span>
            </div>
          </router-link>

          <!-- Giỏ hàng -->
          <button
            @click="cartStore.isDrawerOpen = true"
            class="relative flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition group cursor-pointer"
            title="Xem giỏ hàng"
          >
            <div class="relative">
              <el-icon :size="24" class="text-slate-700 group-hover:text-[#00733c] transition"><ShoppingCart /></el-icon>
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center border-2 border-white shadow-sm"
              >
                {{ cartStore.totalItems > 99 ? '99+' : cartStore.totalItems }}
              </span>
            </div>
            <div class="hidden xl:block text-left text-xs">
              <div class="text-slate-400 font-medium">Giỏ hàng</div>
              <div class="font-bold text-red-600 leading-tight">
                {{ formatPrice(cartStore.totalPrice) }}
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Navigation & Mega Menu Bar -->
      <nav class="bg-white border-t border-slate-100 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <!-- Category Mega Button with Dropdown -->
          <div class="relative group">
            <button
              @click="isCategoryDropdownOpen = !isCategoryDropdownOpen"
              class="flex items-center gap-3 px-5 py-3 bg-[#00733c] hover:bg-[#014f2b] text-white font-bold text-sm tracking-wide transition rounded-t-lg"
            >
              <el-icon :size="18"><Menu /></el-icon>
              <span>DANH MỤC SẢN PHẨM</span>
              <el-icon :size="14"><ArrowDown /></el-icon>
            </button>

            <!-- Mega Menu Dropdown -->
            <div
              v-show="isCategoryDropdownOpen || isHoveringCat"
              @mouseenter="isHoveringCat = true"
              @mouseleave="isHoveringCat = false"
              class="absolute left-0 top-full w-72 bg-white rounded-b-xl shadow-2xl border border-slate-200 py-2 z-50 transition-all duration-150"
            >
              <div
                v-for="cat in megaCategories"
                :key="cat.slug"
                class="relative group/sub px-4 py-2.5 hover:bg-emerald-50/70 cursor-pointer flex items-center justify-between text-sm text-slate-700 hover:text-[#00733c] transition"
                @click="navigateToCategory(cat.slug)"
              >
                <div class="flex items-center gap-3">
                  <span class="text-base text-[#00733c]">{{ cat.icon }}</span>
                  <span class="font-medium">{{ cat.name }}</span>
                </div>
                <el-icon :size="12" class="text-slate-400"><ArrowRight /></el-icon>

                <!-- Submenu Flyout -->
                <div
                  v-if="cat.children && cat.children.length"
                  class="absolute left-full top-0 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-3 hidden group-hover/sub:block z-50"
                >
                  <div class="px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-2">
                    {{ cat.name }}
                  </div>
                  <router-link
                    v-for="sub in cat.children"
                    :key="sub.slug"
                    :to="getCategoryLink(sub)"
                    @click="isCategoryDropdownOpen = false; isHoveringCat = false"
                    class="block px-4 py-2 text-sm text-slate-600 hover:text-[#00733c] hover:bg-emerald-50/50 transition font-normal"
                  >
                    {{ sub.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Horizontal Nav Links -->
          <div class="hidden md:flex items-center gap-6 text-sm font-semibold">
            <router-link to="/" class="text-slate-700 hover:text-[#00733c] transition py-3" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              Trang chủ
            </router-link>
            <router-link to="/shop" class="text-slate-700 hover:text-[#00733c] transition py-3" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              Cửa hàng
            </router-link>
            <router-link to="/pc-builder" class="text-slate-700 hover:text-[#00733c] transition py-3 flex items-center gap-1 text-emerald-700" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Xây dựng PC
            </router-link>
            <router-link to="/services/repair" class="text-slate-700 hover:text-[#00733c] transition py-3" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              Dịch vụ Sửa chữa
            </router-link>
            <router-link to="/services/it-outsourcing" class="text-slate-700 hover:text-[#00733c] transition py-3" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              IT Outsourcing
            </router-link>
            <router-link to="/tin-tuc" class="text-slate-700 hover:text-[#00733c] transition py-3" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              Tin tức & Cẩm nang
            </router-link>
            <router-link to="/about" class="text-slate-700 hover:text-[#00733c] transition py-3" active-class="text-[#00733c] border-b-2 border-[#00733c]">
              Về NetSoft
            </router-link>

            <!-- Dynamic Menu Pages -->
            <router-link
              v-for="item in dynamicMenuItems"
              :key="item.id"
              :to="'/p/' + item.slug"
              class="text-slate-700 hover:text-[#00733c] transition py-3"
              active-class="text-[#00733c] border-b-2 border-[#00733c]"
            >
              {{ item.title }}
            </router-link>
          </div>

          <!-- Flash sale tag / Promo highlight -->
          <div class="hidden xl:flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200/60">
            <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <!-- Ưu đãi tháng: Trả góp 0% - Tặng quà đến 2 Triệu -->
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Quick Cart Slide-out Drawer -->
    <CartDrawer />

    <!-- Footer NetSoft Style -->
    <footer class="bg-[#0b1712] text-slate-300 pt-14 pb-8 mt-16 border-t-4 border-[#00733c]">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
        <!-- Col 1: Brand Info -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-3 mb-4">
            <img :src="logoImg" alt="NetSoft Logo" class="h-10 w-auto object-contain brightness-110" />
            <span class="text-xl font-extrabold text-white tracking-tight">Net<span class="text-emerald-400">Soft</span></span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mb-4 pr-6">
            Hệ thống phân phối Laptop, Máy tính để bàn PC Gaming, Máy trạm Workstation, Linh kiện vi tính và Dịch vụ bảo trì IT doanh nghiệp uy tín hàng đầu.
          </p>
          <div class="space-y-2 text-xs text-slate-400">
            <p><strong class="text-white">Trụ sở chính:</strong> 179 Nơ Trang Long P.Bình Thạnh TPHCM</p>
            <p><strong class="text-white">Điện thoại:</strong> 0777908179</p>
            <p><strong class="text-white">Email:</strong> sales@netsoft.vn - support@netsoft.vn</p>
          </div>
        </div>

        <!-- Col 2: Về NetSoft -->
        <div>
          <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#00733c] pl-2">
            Về NetSoft
          </h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li><router-link to="/about" class="hover:text-emerald-400 transition">Giới thiệu công ty</router-link></li>
            <li><router-link to="/shop" class="hover:text-emerald-400 transition">Hệ thống sản phẩm</router-link></li>
            <li><router-link to="/pc-builder" class="hover:text-emerald-400 transition">Công cụ Build PC</router-link></li>
            <li><router-link to="/services/repair" class="hover:text-emerald-400 transition">Dịch vụ sửa chữa</router-link></li>
            <li><router-link to="/tin-tuc" class="hover:text-emerald-400 transition">Tin tức & Khuyến mãi</router-link></li>
          </ul>
        </div>

        <!-- Col 3: Chính sách -->
        <div>
          <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#00733c] pl-2">
            Chính Sách & Hỗ Trợ
          </h4>
          <ul class="space-y-2 text-sm text-slate-400">
            <li><a href="#" class="hover:text-emerald-400 transition">Chính sách bảo hành</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition">Chính sách đổi trả 7 ngày</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition">Chính sách giao hàng siêu tốc</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition">Hướng dẫn mua trả góp 0%</a></li>
            <li><a href="#" class="hover:text-emerald-400 transition">Quy định thanh toán</a></li>
          </ul>
        </div>

        <!-- Col 4: Dịch vụ & Liên hệ -->
        <div>
          <h4 class="text-white font-bold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#00733c] pl-2">
            Dịch Vụ Kỹ Thuật
          </h4>
          <ul class="space-y-2 text-sm text-slate-400 mb-4">
            <li><router-link to="/services/repair" class="hover:text-emerald-400 transition">Sửa chữa PC, Laptop</router-link></li>
            <li><router-link to="/services/repair" class="hover:text-emerald-400 transition">Nâng cấp & Vệ sinh máy</router-link></li>
            <li><router-link to="/services/it-outsourcing" class="hover:text-emerald-400 transition">Bảo trì hệ thống IT</router-link></li>
            <li><router-link to="/services/it-outsourcing" class="hover:text-emerald-400 transition">Thi công mạng văn phòng</router-link></li>
          </ul>
          <div class="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs">
            <div class="text-amber-400 font-bold mb-1">Tư vấn miễn phí:</div>
            <div class="text-lg font-black text-white">0777908179</div>
          </div>
        </div>
      </div>

      <!-- Copyright & Partners -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div>
          &copy; 2026 NetSoft - Giải Pháp Công Nghệ Toàn Diện. Giữ toàn quyền bản quyền.
        </div>
        <div class="flex items-center gap-4 text-slate-400">
          <span>Chấp nhận thanh toán:</span>
          <span class="font-bold text-white">Tiền mặt • Chuyển khoản QR • Thẻ Visa / Master • Trả góp</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
  Phone, Location, Setting, Search, ShoppingCart, Cpu, Menu, ArrowDown, ArrowRight
} from '@element-plus/icons-vue';
import { useCartStore } from '../stores/cart';
import CartDrawer from '../components/CartDrawer.vue';
import logoImg from '../assets/logo/logo.gif';
import api from '../services/api';

const router = useRouter();
const cartStore = useCartStore();

const searchKeyword = ref('');
const isCategoryDropdownOpen = ref(false);
const isHoveringCat = ref(false);
const dynamicMenuItems = ref<any[]>([]);

const megaCategories = [
  {
    name: 'Laptop & Máy tính xách tay',
    slug: 'laptop',
    icon: '💻',
    children: [
      { name: 'Laptop Gaming', slug: 'laptop-gaming' },
      { name: 'Laptop Văn Phòng & Học Tập', slug: 'laptop-office' },
      { name: 'Laptop Đồ Họa - Kỹ Thuật', slug: 'laptop-creator' },
      { name: 'MacBook & Apple', slug: 'macbook' },
    ]
  },
  {
    name: 'PC Gaming & Đồ họa NetSoft',
    slug: 'pc-gaming',
    icon: '🖥️',
    children: [
      { name: 'PC Gaming Phổ Thông', slug: 'pc-gaming-entry' },
      { name: 'PC Gaming Trung Cấp', slug: 'pc-gaming-mid' },
      { name: 'PC Gaming Cao Cấp / Hi-End', slug: 'pc-gaming-high' },
      { name: 'PC Thiết Kế Đồ Họa 3D', slug: 'pc-workstation' },
      { name: 'Máy Bộ Văn Phòng', slug: 'pc-office' },
    ]
  },
  {
    name: 'Linh kiện máy tính (PC Parts)',
    slug: 'linh-kien',
    icon: '⚡',
    children: [
      { name: 'CPU - Bộ vi xử lý', slug: 'cpu' },
      { name: 'VGA - Card màn hình', slug: 'vga' },
      { name: 'Mainboard - Bo mạch chủ', slug: 'mainboard' },
      { name: 'RAM - Bộ nhớ trong', slug: 'ram' },
      { name: 'SSD / HDD - Ổ cứng lưu trữ', slug: 'storage' },
      { name: 'Nguồn máy tính (PSU)', slug: 'psu' },
      { name: 'Vỏ Case máy tính', slug: 'case' },
      { name: 'Tản nhiệt nước & khí', slug: 'cooler' },
    ]
  },
  {
    name: 'Màn hình máy tính',
    slug: 'man-hinh',
    icon: '📺',
    children: [
      { name: 'Màn hình Gaming 144Hz - 240Hz', slug: 'monitor-gaming' },
      { name: 'Màn hình Đồ họa chuẩn màu IPS', slug: 'monitor-creator' },
      { name: 'Màn hình Văn phòng 24" - 27"', slug: 'monitor-office' },
    ]
  },
  {
    name: 'Bàn phím, Chuột & Tai nghe',
    slug: 'gaming-gear',
    icon: '🎧',
    children: [
      { name: 'Bàn phím cơ Gaming', slug: 'keyboard' },
      { name: 'Chuột Gaming không dây', slug: 'mouse' },
      { name: 'Tai nghe chụp tai Gaming', slug: 'headphone' },
      { name: 'Ghế Gaming công thái học', slug: 'chair' },
    ]
  },
  {
    name: 'Dịch vụ Kỹ thuật & Sửa chữa',
    slug: 'dich-vu',
    icon: '🛠️',
    children: [
      { name: 'Sửa chữa Laptop, PC lấy liền', slug: 'sua-chua' },
      { name: 'Vệ sinh máy & Tra keo tản nhiệt', slug: 've-sinh-may' },
      { name: 'Cài đặt hệ điều hành & Phần mềm', slug: 'cai-dat' },
      { name: 'Bảo trì hệ thống mạng công ty', slug: 'it-outsourcing' },
    ]
  }
];

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const handleSearch = () => {
  if (!searchKeyword.value.trim()) return;
  router.push({ path: '/shop', query: { q: searchKeyword.value.trim() } });
};

const searchTag = (tag: string) => {
  searchKeyword.value = tag;
  router.push({ path: '/shop', query: { q: tag } });
};

const navigateToCategory = (slug: string) => {
  isCategoryDropdownOpen.value = false;
  isHoveringCat.value = false;
  if (slug === 'dich-vu') {
    router.push('/services/repair');
  } else {
    router.push({ path: '/shop', query: { category: slug } });
  }
};

const getCategoryLink = (sub: any) => {
  if (sub.slug === 'sua-chua' || sub.slug === 've-sinh-may' || sub.slug === 'cai-dat') {
    return '/services/repair';
  }
  if (sub.slug === 'it-outsourcing') {
    return '/services/it-outsourcing';
  }
  return '/shop?category=' + sub.slug;
};

const fetchMenuPages = async () => {
  try {
    const res = await api.get('/content');
    dynamicMenuItems.value = res.data.filter((page: any) => page.isMenuItem === true);
  } catch (error) {
    console.error('Lỗi khi tải menu động:', error);
  }
};

onMounted(() => {
  fetchMenuPages();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
