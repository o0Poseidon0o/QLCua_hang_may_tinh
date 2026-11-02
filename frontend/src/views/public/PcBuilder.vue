<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <!-- Header Title & Description -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs font-bold text-[#00733c] uppercase tracking-wider mb-1">
          <span>🖥️ Công Cụ Độc Quyền</span>
          <span>•</span>
          <span>Nhân Phúc Tech</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">XÂY DỰNG CẤU HÌNH PC THEO Ý MUỐN</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Tự do chọn linh kiện 100% chính hãng, tương thích tuyệt đối, miễn phí công lắp ráp và bảo hành tận nơi.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          @click="resetConfiguration"
          class="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1.5"
        >
          <el-icon><Refresh /></el-icon> Làm Mới
        </button>
        <button
          @click="printQuote"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1.5"
        >
          <el-icon><Printer /></el-icon> In Báo Giá
        </button>
        <button
          @click="addAllToCart"
          class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
        >
          <el-icon><ShoppingCart /></el-icon> Thêm Cả Dàn Vào Giỏ
        </button>
      </div>
    </div>

    <!-- Sticky Summary Bar -->
    <div class="sticky top-20 z-30 bg-[#014f2b] text-white rounded-2xl p-4 shadow-xl flex flex-wrap justify-between items-center gap-4 border border-emerald-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-lg">
          {{ selectedCount }}/{{ parts.length }}
        </div>
        <div>
          <div class="text-[11px] text-emerald-200 uppercase font-semibold">Chi phí ước tính</div>
          <div class="text-xl sm:text-2xl font-black text-amber-300">
            {{ formatPrice(totalBuildPrice) }}
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 text-xs">
        <span class="hidden sm:inline-block text-emerald-200 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-700/50">
          🎁 Tặng kèm gói cài Win & Vệ sinh PC 2 năm
        </span>
        <button
          @click="addAllToCart"
          class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer"
        >
          Mua Ngay Cấu Hình Này
        </button>
      </div>
    </div>

    <!-- PC Parts List -->
    <div class="space-y-3">
      <div
        v-for="(part, index) in parts"
        :key="part.category"
        class="bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:border-emerald-500/50 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <!-- Part Category Info -->
        <div class="flex items-center gap-3 w-full md:w-56 flex-shrink-0">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 text-[#00733c] flex items-center justify-center text-xl font-bold flex-shrink-0">
            {{ part.icon }}
          </div>
          <div>
            <div class="text-[11px] text-slate-400 font-bold uppercase">Mục {{ index + 1 }}</div>
            <div class="text-sm font-bold text-slate-800">{{ part.title }}</div>
          </div>
        </div>

        <!-- Part Content: Empty or Selected Item -->
        <div class="flex-1 w-full min-w-0">
          <div v-if="part.selected" class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/60">
            <div class="flex items-center gap-3 min-w-0">
              <img :src="part.selected.image" :alt="part.selected.name" class="w-12 h-12 object-contain bg-white rounded border p-1 flex-shrink-0" />
              <div class="min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-slate-800 truncate" :title="part.selected.name">
                  {{ part.selected.name }}
                </h4>
                <div class="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                  <span class="text-emerald-600 font-semibold">Bảo hành 36 tháng</span>
                  <span>•</span>
                  <span>Mã: {{ part.selected.sku }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4 self-end sm:self-center">
              <div class="text-right">
                <div class="text-sm sm:text-base font-extrabold text-red-600">
                  {{ formatPrice(part.selected.price) }}
                </div>
              </div>
              <!-- Change / Remove Actions -->
              <div class="flex items-center gap-1.5">
                <button
                  @click="openSelectModal(part)"
                  class="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition"
                >
                  Đổi
                </button>
                <button
                  @click="removePart(part)"
                  class="p-1 text-slate-400 hover:text-red-500 rounded transition"
                  title="Xóa linh kiện này"
                >
                  <el-icon><Delete /></el-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty Slot -->
          <div v-else class="flex items-center justify-between bg-slate-50/50 border border-dashed border-slate-200 p-3 rounded-lg text-slate-400 text-xs">
            <span>Chưa chọn linh kiện {{ part.title.toLowerCase() }}</span>
            <button
              @click="openSelectModal(part)"
              class="px-4 py-1.5 bg-[#00733c] hover:bg-[#014f2b] text-white font-bold rounded-lg transition shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <el-icon><Plus /></el-icon> Chọn Linh Kiện
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component Picker -->
    <el-dialog
      v-model="isModalOpen"
      :title="`Chọn ${activePart?.title || 'Linh Kiện'}`"
      width="750px"
      destroy-on-close
    >
      <div class="space-y-4">
        <!-- Search within modal -->
        <el-input
          v-model="modalSearch"
          placeholder="Tìm theo tên sản phẩm, mã SKU..."
          clearable
          prefix-icon="Search"
        />

        <!-- Product List in Modal -->
        <div class="max-h-[420px] overflow-y-auto space-y-2.5 pr-1 divide-y divide-slate-100">
          <div
            v-for="item in filteredModalProducts"
            :key="item.id"
            class="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-lg transition"
          >
            <div class="flex items-center gap-3">
              <img :src="item.image" :alt="item.name" class="w-14 h-14 object-contain bg-white rounded border p-1" />
              <div>
                <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {{ item.brand }}
                </span>
                <h4 class="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1 mt-0.5">
                  {{ item.name }}
                </h4>
                <div class="text-xs text-slate-500 mt-0.5">Bảo hành 36 tháng • Còn hàng</div>
              </div>
            </div>

            <div class="flex items-center gap-3 self-end sm:self-center">
              <div class="text-right">
                <div class="text-sm font-extrabold text-red-600">{{ formatPrice(item.price) }}</div>
                <div v-if="item.originalPrice" class="text-[11px] text-slate-400 line-through">
                  {{ formatPrice(item.originalPrice) }}
                </div>
              </div>
              <button
                @click="confirmSelectPart(item)"
                class="px-4 py-1.5 bg-[#00733c] hover:bg-[#014f2b] text-white font-bold text-xs rounded-lg transition shadow-xs cursor-pointer"
              >
                Chọn
              </button>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Refresh, Printer, ShoppingCart, Delete, Plus } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { ElMessage } from 'element-plus';

const cartStore = useCartStore();

// PC Parts Definition
const parts = ref<any[]>([
  { category: 'cpu', title: 'Bộ Vi Xử Lý (CPU)', icon: '⚡', selected: null },
  { category: 'mainboard', title: 'Bo Mạch Chủ (Mainboard)', icon: '🎛️', selected: null },
  { category: 'ram', title: 'Bộ Nhớ Trong (RAM)', icon: '💾', selected: null },
  { category: 'vga', title: 'Card Màn Hình (VGA)', icon: '🎮', selected: null },
  { category: 'ssd', title: 'Ổ Cứng SSD / HDD', icon: '💽', selected: null },
  { category: 'psu', title: 'Nguồn Máy Tính (PSU)', icon: '🔌', selected: null },
  { category: 'case', title: 'Vỏ Máy Tính (Case)', icon: '🏢', selected: null },
  { category: 'cooler', title: 'Tản Nhiệt CPU (Cooler)', icon: '❄️', selected: null },
  { category: 'monitor', title: 'Màn Hình Máy Tính', icon: '📺', selected: null },
  { category: 'gear', title: 'Phím Chuột Gaming', icon: '⌨️', selected: null }
]);

// Mock Database of Available Components
const mockComponentsDatabase: Record<string, any[]> = {
  cpu: [
    { id: 'c-1', name: 'Intel Core i5-13400F (Up to 4.6GHz, 10 Cores 16 Threads, 20MB)', sku: 'CPU-INTEL-13400F', brand: 'Intel', price: 4390000, originalPrice: 5200000, image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80' },
    { id: 'c-2', name: 'Intel Core i7-14700K (Up to 5.6GHz, 20 Cores 28 Threads, 33MB)', sku: 'CPU-INTEL-14700K', brand: 'Intel', price: 10490000, originalPrice: 11990000, image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80' },
    { id: 'c-3', name: 'AMD Ryzen 5 7600 (Up to 5.1GHz, 6 Cores 12 Threads, 38MB)', sku: 'CPU-AMD-7600', brand: 'AMD', price: 4990000, originalPrice: 5790000, image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80' },
    { id: 'c-4', name: 'Intel Core i3-12100F (Up to 4.3GHz, 4 Cores 8 Threads, 12MB)', sku: 'CPU-INTEL-12100F', brand: 'Intel', price: 2190000, originalPrice: 2690000, image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80' }
  ],
  mainboard: [
    { id: 'm-1', name: 'Mainboard ASUS TUF GAMING B760M-PLUS WIFI DDR5', sku: 'MB-ASUS-B760M', brand: 'ASUS', price: 3890000, originalPrice: 4390000, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80' },
    { id: 'm-2', name: 'Mainboard MSI MAG B650 TOMAHAWK WIFI (AMD AM5)', sku: 'MB-MSI-B650', brand: 'MSI', price: 5490000, originalPrice: 5990000, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80' },
    { id: 'm-3', name: 'Mainboard Gigabyte H610M H V2 DDR4', sku: 'MB-GIGA-H610', brand: 'Gigabyte', price: 1790000, originalPrice: 2090000, image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80' }
  ],
  ram: [
    { id: 'r-1', name: 'RAM Kingston FURY Beast RGB 16GB (2x8GB) DDR4 3200MHz', sku: 'RAM-KING-16-D4', brand: 'Kingston', price: 1090000, originalPrice: 1490000, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80' },
    { id: 'r-2', name: 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', sku: 'RAM-COR-32-D5', brand: 'Corsair', price: 2990000, originalPrice: 3590000, image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80' }
  ],
  vga: [
    { id: 'v-1', name: 'Card Màn Hình ASUS Dual GeForce RTX 4060 EVO OC 8GB GDDR6', sku: 'VGA-ASUS-4060', brand: 'ASUS', price: 8490000, originalPrice: 9990000, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80' },
    { id: 'v-2', name: 'Card Màn Hình MSI GeForce RTX 4070 SUPER 12G VENTUS 2X OC', sku: 'VGA-MSI-4070S', brand: 'MSI', price: 16990000, originalPrice: 18990000, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80' },
    { id: 'v-3', name: 'Card Màn Hình Gigabyte GeForce GTX 1650 D6 OC 4G', sku: 'VGA-GIGA-1650', brand: 'Gigabyte', price: 3490000, originalPrice: 3990000, image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80' }
  ],
  ssd: [
    { id: 's-1', name: 'Ổ Cứng SSD Kingston NV2 1TB PCIe 4.0 x4 NVMe M.2', sku: 'SSD-KING-1TB', brand: 'Kingston', price: 1590000, originalPrice: 1890000, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=150&q=80' },
    { id: 's-2', name: 'Ổ Cứng SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe M.2 7450MB/s', sku: 'SSD-SAM-990-1T', brand: 'Samsung', price: 2790000, originalPrice: 3200000, image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=150&q=80' }
  ],
  psu: [
    { id: 'p-1', name: 'Nguồn Máy Tính Corsair CV650 650W 80 Plus Bronze', sku: 'PSU-COR-CV650', brand: 'Corsair', price: 1390000, originalPrice: 1690000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' },
    { id: 'p-2', name: 'Nguồn Máy Tính ASUS TUF Gaming 750W 80 Plus Bronze', sku: 'PSU-ASUS-750W', brand: 'ASUS', price: 1890000, originalPrice: 2290000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' }
  ],
  case: [
    { id: 'cs-1', name: 'Vỏ Case Xigmatek Aqua M Lite 3FX (Kèm 3 Fan RGB)', sku: 'CASE-XIG-AQUA', brand: 'Xigmatek', price: 890000, originalPrice: 1100000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' },
    { id: 'cs-2', name: 'Vỏ Case NZXT H5 Flow Black (Kính Cường Lực)', sku: 'CASE-NZXT-H5', brand: 'NZXT', price: 2190000, originalPrice: 2590000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' }
  ],
  cooler: [
    { id: 'cl-1', name: 'Tản Nhiệt Khí Thermalright Peerless Assassin 120 SE ARGB', sku: 'COOL-TR-PA120', brand: 'Thermalright', price: 850000, originalPrice: 1050000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' },
    { id: 'cl-2', name: 'Tản Nhiệt Nước AIO Deepcool LT520 240mm RGB', sku: 'COOL-DEEP-LT520', brand: 'Deepcool', price: 1990000, originalPrice: 2490000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' }
  ],
  monitor: [
    { id: 'mo-1', name: 'Màn Hình Gaming ASUS TUF VG249Q3A 24" Fast IPS 180Hz 1ms', sku: 'MON-ASUS-24-180', brand: 'ASUS', price: 3190000, originalPrice: 4290000, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&q=80' }
  ],
  gear: [
    { id: 'g-1', name: 'Bộ Bàn Phím Cơ + Chuột Gaming DareU RGB', sku: 'GEAR-DAREU-COMBO', brand: 'DareU', price: 790000, originalPrice: 1100000, image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80' }
  ]
};

// Modal State
const isModalOpen = ref(false);
const activePart = ref<any>(null);
const modalSearch = ref('');

const openSelectModal = (part: any) => {
  activePart.value = part;
  modalSearch.value = '';
  isModalOpen.value = true;
};

const filteredModalProducts = computed(() => {
  if (!activePart.value) return [];
  const list = mockComponentsDatabase[activePart.value.category] || [];
  if (!modalSearch.value.trim()) return list;
  const kw = modalSearch.value.toLowerCase();
  return list.filter(
    (item) => item.name.toLowerCase().includes(kw) || item.sku.toLowerCase().includes(kw)
  );
});

const confirmSelectPart = (item: any) => {
  if (activePart.value) {
    activePart.value.selected = item;
  }
  isModalOpen.value = false;
  ElMessage.success(`Đã chọn: ${item.name}`);
};

const removePart = (part: any) => {
  part.selected = null;
};

const resetConfiguration = () => {
  parts.value.forEach((p) => (p.selected = null));
  ElMessage.info('Đã làm mới cấu hình PC');
};

const selectedCount = computed(() => parts.value.filter((p) => p.selected !== null).length);

const totalBuildPrice = computed(() => {
  return parts.value.reduce((total, p) => total + (p.selected ? p.selected.price : 0), 0);
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const printQuote = () => {
  window.print();
};

const addAllToCart = () => {
  const chosenParts = parts.value.filter((p) => p.selected !== null);
  if (chosenParts.length === 0) {
    ElMessage.warning('Vui lòng chọn ít nhất một linh kiện để thêm vào giỏ!');
    return;
  }
  chosenParts.forEach((p) => {
    cartStore.addItem({
      id: p.selected.id,
      name: `[Build PC] ${p.selected.name}`,
      price: p.selected.price,
      image: p.selected.image
    });
  });
  ElMessage.success(`Đã thêm ${chosenParts.length} linh kiện vào giỏ hàng!`);
  cartStore.isDrawerOpen = true;
};
</script>
