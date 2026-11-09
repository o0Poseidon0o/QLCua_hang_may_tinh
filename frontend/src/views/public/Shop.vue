<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Breadcrumb & Header Title -->
    <div class="mb-6">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <router-link to="/" class="hover:text-[#00733c]">Trang chủ</router-link>
        <span>/</span>
        <span class="text-slate-800 font-semibold">Cửa hàng & Sản phẩm</span>
        <span v-if="activeCategoryTitle">/</span>
        <span v-if="activeCategoryTitle" class="text-[#00733c] font-bold">{{ activeCategoryTitle }}</span>
      </div>
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-black text-slate-900">
            {{ activeCategoryTitle ? activeCategoryTitle.toUpperCase() : 'HỆ THỐNG SẢN PHẨM CÔNG NGHỆ CHÍNH HÃNG' }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-1">Tìm kiếm linh kiện, laptop, PC gaming chính hãng với giá tốt nhất tại Nhân Phúc Tech.</p>
        </div>
        <div class="text-xs text-slate-500 font-semibold bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-xs">
          Tìm thấy <span class="text-[#00733c] font-bold text-sm">{{ filteredProducts.length }}</span> sản phẩm
        </div>
      </div>
    </div>

    <!-- Layout: Sidebar Filters + Products Grid -->
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- 1. Sidebar Filters -->
      <aside class="w-full lg:w-72 flex-shrink-0 space-y-6">
        <!-- Filter Card: Danh mục phân cấp -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center justify-between">
            <span class="flex items-center gap-2"><span>📁</span> Danh Mục</span>
            <button
              v-if="selectedCategory !== 'all'"
              @click="selectCategory('all')"
              class="text-[11px] text-[#00733c] font-bold hover:underline"
            >
              Xem tất cả
            </button>
          </h3>
          <div class="space-y-1 text-xs max-h-[420px] overflow-y-auto pr-1">
            <div v-for="cat in hierarchicalCategories" :key="cat.slug" class="space-y-1">
              <button
                @click="selectCategory(cat.slug)"
                :class="[
                  'w-full text-left px-3 py-2 rounded-lg font-bold transition flex justify-between items-center',
                  selectedCategory === cat.slug
                    ? 'bg-emerald-50 text-[#00733c] border-l-4 border-[#00733c]'
                    : 'text-slate-700 hover:bg-slate-50'
                ]"
              >
                <span class="flex items-center gap-2">
                  <span>{{ cat.icon }}</span>
                  <span>{{ cat.name }}</span>
                </span>
                <span class="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full font-normal">
                  {{ getCategoryCount(cat.slug) }}
                </span>
              </button>

              <!-- Subcategories -->
              <div v-if="cat.children && cat.children.length" class="pl-6 space-y-1">
                <button
                  v-for="sub in cat.children"
                  :key="sub.slug"
                  @click="selectCategory(sub.slug)"
                  :class="[
                    'w-full text-left px-2.5 py-1.5 rounded-md font-medium transition flex justify-between items-center text-[11px]',
                    selectedCategory === sub.slug
                      ? 'bg-emerald-100/70 text-[#00733c] font-bold'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  ]"
                >
                  <span>• {{ sub.name }}</span>
                  <span class="text-[10px] text-slate-400">{{ getCategoryCount(sub.slug) }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Filter Card: Khoảng giá -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>💰</span> Khoảng Giá
          </h3>
          <div class="space-y-2 text-xs">
            <label
              v-for="range in priceRanges"
              :key="range.value"
              class="flex items-center gap-2.5 text-slate-700 cursor-pointer hover:text-[#00733c] transition"
            >
              <input
                type="radio"
                name="priceRange"
                :value="range.value"
                v-model="selectedPriceRange"
                class="accent-[#00733c]"
              />
              <span class="font-medium">{{ range.label }}</span>
            </label>
          </div>
        </div>

        <!-- Filter Card: Thương hiệu (Brand) -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>🏷️</span> Thương Hiệu
          </h3>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="b in brandsList"
              :key="b"
              @click="toggleBrand(b)"
              :class="[
                'px-2.5 py-1 rounded-md text-xs font-bold transition border',
                selectedBrand === b
                  ? 'bg-[#00733c] text-white border-[#00733c]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#00733c]'
              ]"
            >
              {{ b === 'all' ? 'Tất cả' : b }}
            </button>
          </div>
        </div>

        <!-- Clear Filter Button -->
        <button
          v-if="hasActiveFilter"
          @click="resetFilters"
          class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer"
        >
          Xóa Tất Cả Bộ Lọc
        </button>
      </aside>

      <!-- 2. Main Products Area -->
      <main class="flex-1 min-w-0 space-y-6">
        <!-- Top Toolbar: Search + Sort -->
        <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="relative w-full sm:w-80">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Lọc theo tên, mã SKU, thông số..."
              class="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#00733c]"
            />
            <el-icon class="absolute right-2.5 top-2.5 text-slate-400"><Search /></el-icon>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span class="text-xs text-slate-400 whitespace-nowrap">Sắp xếp:</span>
            <select
              v-model="sortBy"
              class="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-[#00733c]"
            >
              <option value="popular">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredProducts.length === 0" class="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm">
          <div class="text-4xl mb-3">🔍</div>
          <h3 class="text-base font-bold text-slate-800">Không tìm thấy sản phẩm trong danh mục này</h3>
          <p class="text-xs text-slate-500 mt-1">Hiện tại danh mục hoặc từ khóa lọc chưa có sản phẩm phù hợp.</p>
          <button
            @click="resetFilters"
            class="mt-4 px-5 py-2 bg-[#00733c] text-white text-xs font-bold rounded-lg hover:bg-[#014f2b] transition cursor-pointer"
          >
            Xem lại tất cả sản phẩm
          </button>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl border border-slate-100 hover:border-emerald-500/50 transition-all duration-200 flex flex-col justify-between group"
          >
            <!-- Badge & Image -->
            <div>
              <router-link :to="'/product/' + product.id" class="block relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 p-3">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <span v-if="product.discount" class="absolute top-2 left-2 text-[10px] font-black bg-red-600 text-white px-2 py-0.5 rounded shadow">
                  -{{ product.discount }}%
                </span>
                <span class="absolute top-2 right-2 text-[10px] font-bold bg-slate-900/70 text-white px-1.5 py-0.5 rounded backdrop-blur-xs">
                  {{ product.brand }}
                </span>
              </router-link>

              <!-- Product Info -->
              <span class="text-[11px] font-bold text-[#00733c] bg-emerald-50 px-2 py-0.5 rounded">
                {{ product.categoryName }}
              </span>
              <router-link
                :to="'/product/' + product.id"
                class="block text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 mt-1.5 hover:text-[#00733c] transition min-h-[40px]"
                :title="product.name"
              >
                {{ product.name }}
              </router-link>
              <div class="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                <span>Mã: {{ product.sku }}</span>
                <span>•</span>
                <span class="text-emerald-600 font-semibold">{{ product.warranty || 'Bảo hành 36T' }}</span>
              </div>
            </div>

            <!-- Price & Buy Actions -->
            <div class="pt-3 border-t border-slate-100 mt-3">
              <div class="flex items-baseline gap-2">
                <span class="text-base sm:text-lg font-extrabold text-red-600">
                  {{ formatPrice(product.price) }}
                </span>
                <span v-if="product.originalPrice" class="text-xs text-slate-400 line-through">
                  {{ formatPrice(product.originalPrice) }}
                </span>
              </div>

              <div class="mt-3 grid grid-cols-5 gap-2">
                <router-link
                  :to="'/product/' + product.id"
                  class="col-span-2 py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                >
                  Chi Tiết
                </router-link>
                <button
                  @click="addToCart(product)"
                  class="col-span-3 py-2 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-extrabold rounded-lg transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <el-icon><ShoppingCart /></el-icon> Thêm Giỏ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { Search, ShoppingCart } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { useProductStore } from '../../stores/products';
import { ElMessage } from 'element-plus';

const route = useRoute();
const cartStore = useCartStore();
const productStore = useProductStore();

const searchQuery = ref('');
const selectedCategory = ref('all');
const selectedPriceRange = ref('all');
const selectedBrand = ref('all');
const sortBy = ref('popular');

// Hierarchical Category Structure matching Mega Menu
const hierarchicalCategories = [
  {
    name: 'Laptop & Máy Tính Xách Tay',
    slug: 'laptop',
    icon: '💻',
    children: [
      { name: 'Laptop Gaming', slug: 'laptop-gaming' },
      { name: 'Laptop Văn Phòng', slug: 'laptop-office' },
      { name: 'MacBook & Apple', slug: 'macbook' }
    ]
  },
  {
    name: 'PC Gaming & Đồ Họa Nhân Phúc',
    slug: 'pc-gaming',
    icon: '🖥️',
    children: [
      { name: 'PC Gaming Phổ Thông', slug: 'pc-gaming-entry' },
      { name: 'PC Gaming Trung Cấp', slug: 'pc-gaming-mid' },
      { name: 'PC Gaming Cao Cấp', slug: 'pc-gaming-high' },
      { name: 'PC Đồ Họa Workstation', slug: 'pc-workstation' }
    ]
  },
  {
    name: 'Linh Kiện Máy Tính (PC Parts)',
    slug: 'linh-kien',
    icon: '⚡',
    children: [
      { name: 'CPU - Bộ Vi Xử Lý', slug: 'cpu' },
      { name: 'VGA - Card Màn Hình', slug: 'vga' },
      { name: 'Mainboard - Bo Mạch Chủ', slug: 'mainboard' },
      { name: 'RAM - Bộ Nhớ Trong', slug: 'ram' },
      { name: 'SSD / Ổ Cứng Lưu Trữ', slug: 'storage' },
      { name: 'Nguồn Máy Tính (PSU)', slug: 'psu' },
      { name: 'Vỏ Case Máy Tính', slug: 'case' },
      { name: 'Tản Nhiệt Khí & Nước', slug: 'cooler' }
    ]
  },
  {
    name: 'Màn Hình Máy Tính',
    slug: 'man-hinh',
    icon: '📺',
    children: [
      { name: 'Màn Hình Gaming 180Hz', slug: 'monitor-gaming' },
      { name: 'Màn Hình Đồ Họa Chuẩn Màu', slug: 'monitor-creator' }
    ]
  },
  {
    name: 'Bàn Phím & Chuột Gaming',
    slug: 'gaming-gear',
    icon: '🎧',
    children: [
      { name: 'Bàn Phím Cơ Gaming', slug: 'keyboard' },
      { name: 'Chuột Gaming Không Dây', slug: 'mouse' }
    ]
  }
];

// Price Ranges
const priceRanges = [
  { label: 'Tất cả mức giá', value: 'all' },
  { label: 'Dưới 5 triệu', value: 'under-5' },
  { label: 'Từ 5 đến 15 triệu', value: '5-15' },
  { label: 'Từ 15 đến 25 triệu', value: '15-25' },
  { label: 'Trên 25 triệu', value: 'above-25' }
];

// Brands
const brandsList = computed(() => {
  const set = new Set<string>(['all', 'Nhân Phúc', 'ASUS', 'Intel', 'AMD', 'MSI', 'Gigabyte', 'Kingston', 'Corsair', 'Dell', 'Lenovo', 'Samsung', 'Apple', 'DareU', 'Logitech']);
  productStore.products.forEach((p) => {
    if (p.brand) set.add(p.brand);
  });
  return Array.from(set);
});

// Calculate item count in each category
const getCategoryCount = (slug: string) => {
  if (slug === 'all') return productStore.products.length;
  return productStore.products.filter((p) => p.category === slug || p.parentCategory === slug).length;
};

// Active category title for breadcrumb
const activeCategoryTitle = computed(() => {
  if (selectedCategory.value === 'all') return '';
  for (const cat of hierarchicalCategories) {
    if (cat.slug === selectedCategory.value) return cat.name;
    if (cat.children) {
      const found = cat.children.find((c) => c.slug === selectedCategory.value);
      if (found) return found.name;
    }
  }
  return selectedCategory.value;
});

const selectCategory = (slug: string) => {
  selectedCategory.value = slug;
};

const toggleBrand = (b: string) => {
  selectedBrand.value = b;
};

const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = 'all';
  selectedPriceRange.value = 'all';
  selectedBrand.value = 'all';
  sortBy.value = 'popular';
};

const hasActiveFilter = computed(() => {
  return (
    searchQuery.value !== '' ||
    selectedCategory.value !== 'all' ||
    selectedPriceRange.value !== 'all' ||
    selectedBrand.value !== 'all'
  );
});

// Products Filter
const filteredProducts = computed(() => {
  return productStore.products
    .filter((p) => {
      // Category filter (match subcategory or parent category)
      if (selectedCategory.value !== 'all') {
        const matchSub = p.category === selectedCategory.value;
        const matchParent = p.parentCategory === selectedCategory.value;
        // Aliases support
        const matchAlias =
          (selectedCategory.value === 'ssd' && p.category === 'storage') ||
          (selectedCategory.value === 'storage' && p.category === 'storage') ||
          (selectedCategory.value === 'man-hinh' && p.parentCategory === 'man-hinh') ||
          (selectedCategory.value === 'monitor' && p.parentCategory === 'man-hinh') ||
          (selectedCategory.value === 'gear' && p.parentCategory === 'gaming-gear') ||
          (selectedCategory.value === 'gaming-gear' && p.parentCategory === 'gaming-gear');

        if (!matchSub && !matchParent && !matchAlias) return false;
      }
      // Brand filter
      if (selectedBrand.value !== 'all' && p.brand !== selectedBrand.value) {
        return false;
      }
      // Search query
      if (searchQuery.value.trim()) {
        const q = searchQuery.value.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesBrand && !matchesCat) return false;
      }
      // Price range filter
      if (selectedPriceRange.value === 'under-5' && p.price >= 5000000) return false;
      if (selectedPriceRange.value === '5-15' && (p.price < 5000000 || p.price > 15000000)) return false;
      if (selectedPriceRange.value === '15-25' && (p.price < 15000000 || p.price > 25000000)) return false;
      if (selectedPriceRange.value === 'above-25' && p.price <= 25000000) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy.value === 'price-asc') return a.price - b.price;
      if (sortBy.value === 'price-desc') return b.price - a.price;
      return 0;
    });
});

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
  ElMessage.success(`Đã thêm "${product.name}" vào giỏ!`);
};

// Sync query params from URL
watch(
  () => route.query,
  (query) => {
    if (query.q) searchQuery.value = String(query.q);
    if (query.category) selectedCategory.value = String(query.category);
    else if (!query.category && !query.q) selectedCategory.value = 'all';
  },
  { immediate: true }
);

onMounted(() => {
  if (route.query.q) searchQuery.value = String(route.query.q);
  if (route.query.category) selectedCategory.value = String(route.query.category);
});
</script>
