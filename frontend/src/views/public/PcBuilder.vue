<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
    <!-- Header Title & Description -->
    <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div class="flex items-center gap-2 text-xs font-bold text-[#00733c] uppercase tracking-wider mb-1">
          <span>🖥️ Công Cụ Kiểm Tra Tương Thích Thông Minh</span>
          <span>•</span>
          <span>Nhân Phúc Tech</span>
        </div>
        <h1 class="text-2xl sm:text-3xl font-black text-slate-900">XÂY DỰNG CẤU HÌNH PC THEO Ý MUỐN</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1">
          Tự động kiểm tra độ tương thích phần cứng (Socket CPU, chuẩn RAM DDR4/DDR5, kích thước Case ATX/mATX & Công suất Nguồn).
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center gap-2.5">
        <button
          @click="resetConfiguration"
          class="px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
        >
          <el-icon><Refresh /></el-icon> Làm Mới
        </button>
        <button
          @click="printQuote"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] hover:bg-emerald-50 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
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

    <!-- Bộ Cấu Hình Mẫu Gợi Ý Nhanh (1-Click Preset Builds) -->
    <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
      <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div class="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <span>⚡ Gợi ý cấu hình chuẩn tương thích 100% (Chọn nhanh 1 chạm):</span>
        </div>
        <span class="text-[11px] text-slate-400">Bạn có thể chọn mẫu rồi đổi từng linh kiện tùy ý</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          v-for="preset in presetBuilds"
          :key="preset.id"
          type="button"
          @click="applyPreset(preset)"
          class="text-left p-3 rounded-xl border border-slate-200 hover:border-[#00733c] hover:bg-emerald-50/40 transition group cursor-pointer"
        >
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#00733c]">
              {{ preset.badge }}
            </span>
            <span class="text-xs font-bold text-[#00733c] opacity-0 group-hover:opacity-100 transition">
              Áp dụng &rarr;
            </span>
          </div>
          <div class="font-bold text-xs text-slate-800 group-hover:text-[#00733c]">{{ preset.name }}</div>
          <div class="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{{ preset.summary }}</div>
        </button>
      </div>
    </div>

    <!-- Sticky Summary Bar & Real-time Compatibility Status -->
    <div class="sticky top-20 z-30 bg-[#014f2b] text-white rounded-2xl p-4 shadow-xl flex flex-wrap justify-between items-center gap-4 border border-emerald-800">
      <div class="flex items-center gap-4">
        <div class="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-base">
          {{ selectedCount }}/{{ parts.length }}
        </div>
        <div>
          <div class="text-[11px] text-emerald-200 uppercase font-semibold">Chi phí ước tính</div>
          <div class="text-xl sm:text-2xl font-black text-amber-300">
            {{ formatPrice(totalBuildPrice) }}
          </div>
        </div>

        <div class="hidden md:flex items-center gap-2 pl-4 border-l border-emerald-700/60">
          <div
            class="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
            :class="
              compatibilityIssues.some(i => i.severity === 'error')
                ? 'bg-red-500/20 text-red-200 border border-red-400/40'
                : compatibilityIssues.some(i => i.severity === 'warning')
                ? 'bg-amber-500/20 text-amber-200 border border-amber-400/40'
                : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'
            "
          >
            <span v-if="compatibilityIssues.some(i => i.severity === 'error')">
              ❌ Có {{ compatibilityIssues.filter(i => i.severity === 'error').length }} xung đột linh kiện
            </span>
            <span v-else-if="compatibilityIssues.some(i => i.severity === 'warning')">
              ⚠️ {{ compatibilityIssues.length }} lưu ý kỹ thuật
            </span>
            <span v-else>
              ✅ Tương thích phần cứng 100%
            </span>
          </div>

          <div class="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-700/50 text-xs">
            ⚡ Công suất ước tính: <strong class="text-amber-300">{{ estimatedWattage }}W</strong>
            <span v-if="selectedMap.psu" class="text-emerald-300"> / Nguồn {{ selectedMap.psu.wattage }}W</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 text-xs">
        <button
          @click="addAllToCart"
          class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md transition cursor-pointer"
        >
          Mua Ngay Cấu Hình Này
        </button>
      </div>
    </div>

    <!-- Bảng Phân Tích Tương Thích Chi Tiết (Compatibility Inspector) -->
    <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-200/80 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <span class="text-lg">🔍</span>
          <h2 class="text-sm sm:text-base font-extrabold text-slate-800 uppercase tracking-wide">
            Trạng Thái Kiểm Tra Tương Thích Phần Cứng
          </h2>
        </div>
        <div class="text-xs text-slate-500">
          Tự động đối chiếu Socket, RAM, Kích thước Case, Tản nhiệt & Nguồn
        </div>
      </div>

      <!-- 5 Ô kiểm tra trực quan -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <div
          v-for="check in compatibilityChecklist"
          :key="check.id"
          class="p-3 rounded-xl border text-xs transition"
          :class="
            check.status === 'ok'
              ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
              : check.status === 'error'
              ? 'bg-red-50 border-red-300 text-red-900'
              : check.status === 'warn'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-slate-50 border-slate-200 text-slate-500'
          "
        >
          <div class="flex items-center justify-between font-bold mb-1">
            <span>{{ check.title }}</span>
            <span>
              {{ check.status === 'ok' ? '✅' : check.status === 'error' ? '❌' : check.status === 'warn' ? '⚠️' : '⏳' }}
            </span>
          </div>
          <div class="text-[11px] leading-relaxed font-medium">
            {{ check.detail }}
          </div>
        </div>
      </div>

      <!-- Cảnh báo chi tiết nếu có lỗi hoặc lưu ý -->
      <div v-if="compatibilityIssues.length > 0" class="space-y-2 pt-1">
        <div
          v-for="(issue, idx) in compatibilityIssues"
          :key="idx"
          class="p-3 rounded-xl border text-xs flex items-start gap-2.5"
          :class="
            issue.severity === 'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-amber-50 border-amber-200 text-amber-800'
          "
        >
          <span class="text-sm leading-none mt-0.5">{{ issue.severity === 'error' ? '❌' : '⚠️' }}</span>
          <div class="flex-1">
            <span class="font-bold">{{ issue.title }}: </span>
            <span>{{ issue.message }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- PC Parts List -->
    <div class="space-y-3">
      <div
        v-for="(part, index) in parts"
        :key="part.category"
        class="bg-white rounded-xl p-4 shadow-sm border transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        :class="
          hasPartError(part.category)
            ? 'border-red-300 bg-red-50/10'
            : 'border-slate-100 hover:border-emerald-500/50'
        "
      >
        <!-- Part Category Info -->
        <div class="flex items-center gap-3 w-full md:w-60 flex-shrink-0">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 text-[#00733c] flex items-center justify-center text-xl font-bold flex-shrink-0">
            {{ part.icon }}
          </div>
          <div>
            <div class="text-[11px] text-slate-400 font-bold uppercase">Mục {{ index + 1 }}</div>
            <div class="text-sm font-bold text-slate-800">{{ part.title }}</div>
            <div v-if="getPartHint(part.category)" class="text-[11px] text-[#00733c] font-semibold mt-0.5">
              {{ getPartHint(part.category) }}
            </div>
          </div>
        </div>

        <!-- Part Content: Empty or Selected Item -->
        <div class="flex-1 w-full min-w-0">
          <div
            v-if="part.selected"
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-lg border border-slate-200/60"
          >
            <div class="flex items-center gap-3 min-w-0">
              <img
                :src="part.selected.image"
                :alt="part.selected.name"
                class="w-12 h-12 object-contain bg-white rounded border p-1 flex-shrink-0"
              />
              <div class="min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-slate-800 truncate" :title="part.selected.name">
                  {{ part.selected.name }}
                </h4>
                <!-- Thẻ thông số kỹ thuật của linh kiện đã chọn -->
                <div class="flex flex-wrap items-center gap-1.5 mt-1">
                  <span
                    v-for="(badge, bIdx) in getSpecBadges(part.category, part.selected)"
                    :key="bIdx"
                    class="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700"
                  >
                    {{ badge }}
                  </span>
                  <span class="text-[11px] text-emerald-600 font-semibold ml-1">• BH 36 tháng</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4 self-end sm:self-center">
              <div class="text-right">
                <div class="text-sm sm:text-base font-extrabold text-red-600">
                  {{ formatPrice(part.selected.price) }}
                </div>
              </div>
              <div class="flex items-center gap-1.5">
                <button
                  @click="openSelectModal(part)"
                  class="px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded border border-blue-200 transition cursor-pointer"
                >
                  Đổi
                </button>
                <button
                  @click="removePart(part)"
                  class="p-1 text-slate-400 hover:text-red-500 rounded transition cursor-pointer"
                  title="Xóa linh kiện này"
                >
                  <el-icon><Delete /></el-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Empty Slot -->
          <div
            v-else
            class="flex items-center justify-between bg-slate-50/50 border border-dashed border-slate-200 p-3 rounded-lg text-slate-400 text-xs"
          >
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

    <!-- Modal Component Picker with Smart Compatibility Filter -->
    <el-dialog
      v-model="isModalOpen"
      :title="`Chọn ${activePart?.title || 'Linh Kiện'}`"
      width="820px"
      destroy-on-close
    >
      <div class="space-y-4">
        <!-- Thanh tìm kiếm + Bộ lọc tương thích tự động -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
          <el-input
            v-model="modalSearch"
            placeholder="Tìm theo tên linh kiện, socket, DDR4/DDR5, mã SKU..."
            clearable
            class="flex-1"
          />
          <div class="flex items-center gap-2">
            <el-switch
              v-model="onlyShowCompatible"
              active-color="#00733c"
              active-text="Chỉ hiện linh kiện tương thích"
            />
          </div>
        </div>

        <!-- Thông báo ngữ cảnh đang lọc theo linh kiện nào -->
        <div
          v-if="activePart && getPartHint(activePart.category)"
          class="px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between"
        >
          <span>
            💡 <strong>Gợi ý kỹ thuật:</strong> {{ getPartHint(activePart.category) }}
          </span>
          <span v-if="onlyShowCompatible" class="text-[11px] text-emerald-600 font-semibold">
            Đang lọc tự động
          </span>
        </div>

        <!-- Danh sách linh kiện trong Modal -->
        <div class="max-h-[440px] overflow-y-auto space-y-2.5 pr-1">
          <div
            v-if="filteredModalProducts.length === 0"
            class="text-center py-10 text-slate-500 text-sm bg-slate-50 rounded-xl border border-dashed border-slate-200"
          >
            <p class="font-bold text-slate-700 mb-1">Không tìm thấy linh kiện phù hợp với bộ lọc hiện tại.</p>
            <p class="text-xs text-slate-400 mb-3">
              Bạn có thể tắt chế độ "Chỉ hiện linh kiện tương thích" để xem toàn bộ kho hàng.
            </p>
            <el-button size="small" @click="onlyShowCompatible = false">
              Xem tất cả linh kiện
            </el-button>
          </div>

          <div
            v-for="item in filteredModalProducts"
            :key="item.id"
            class="p-3 rounded-xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            :class="
              checkCandidateCompatibility(activePart?.category, item).compatible
                ? 'bg-white border-slate-200 hover:border-[#00733c]'
                : 'bg-red-50/40 border-red-200 opacity-85'
            "
          >
            <div class="flex items-center gap-3 min-w-0">
              <img :src="item.image" :alt="item.name" class="w-14 h-14 object-contain bg-white rounded border p-1 flex-shrink-0" />
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                    {{ item.brand }}
                  </span>
                  <span
                    v-if="checkCandidateCompatibility(activePart?.category, item).compatible"
                    class="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full"
                  >
                    ✅ Tương thích
                  </span>
                  <span
                    v-else
                    class="text-[10px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full"
                  >
                    ⚠️ {{ checkCandidateCompatibility(activePart?.category, item).reason }}
                  </span>
                </div>

                <h4 class="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                  {{ item.name }}
                </h4>

                <!-- Badges thông số kỹ thuật -->
                <div class="flex flex-wrap items-center gap-1.5 mt-1">
                  <span
                    v-for="(badge, bIdx) in getSpecBadges(activePart?.category, item)"
                    :key="bIdx"
                    class="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                  >
                    {{ badge }}
                  </span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
              <div class="text-right">
                <div class="text-sm font-extrabold text-red-600">{{ formatPrice(item.price) }}</div>
                <div v-if="item.originalPrice" class="text-[11px] text-slate-400 line-through">
                  {{ formatPrice(item.originalPrice) }}
                </div>
              </div>
              <button
                @click="confirmSelectPart(item)"
                class="px-4 py-2 font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
                :class="
                  checkCandidateCompatibility(activePart?.category, item).compatible
                    ? 'bg-[#00733c] hover:bg-[#014f2b] text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                "
              >
                {{ checkCandidateCompatibility(activePart?.category, item).compatible ? 'Chọn' : 'Vẫn chọn' }}
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

// Danh sách 10 hạng mục linh kiện PC
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
  { category: 'gear', title: 'Phím Chuột Gaming', icon: '⌨️', selected: null },
]);

// Kho dữ liệu linh kiện kèm đầy đủ thông số kỹ thuật để kiểm tra tương thích
const mockComponentsDatabase: Record<string, any[]> = {
  cpu: [
    {
      id: 'c-1',
      name: 'Intel Core i5-13400F (Up to 4.6GHz, 10 Nhân 16 Luồng, 20MB Cache)',
      sku: 'CPU-INTEL-13400F',
      brand: 'Intel',
      socket: 'LGA1700',
      supportedRam: ['DDR4', 'DDR5'],
      tdp: 65,
      tier: 'mid',
      price: 4390000,
      originalPrice: 5200000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-2',
      name: 'Intel Core i7-14700K (Up to 5.6GHz, 20 Nhân 28 Luồng, 33MB Cache)',
      sku: 'CPU-INTEL-14700K',
      brand: 'Intel',
      socket: 'LGA1700',
      supportedRam: ['DDR4', 'DDR5'],
      tdp: 253,
      tier: 'high',
      price: 10490000,
      originalPrice: 11990000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-3',
      name: 'AMD Ryzen 5 7600 (Up to 5.1GHz, 6 Nhân 12 Luồng, 38MB Cache, AM5)',
      sku: 'CPU-AMD-7600',
      brand: 'AMD',
      socket: 'AM5',
      supportedRam: ['DDR5'],
      tdp: 65,
      tier: 'mid',
      price: 4990000,
      originalPrice: 5790000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-4',
      name: 'Intel Core i3-12100F (Up to 4.3GHz, 4 Nhân 8 Luồng, 12MB Cache)',
      sku: 'CPU-INTEL-12100F',
      brand: 'Intel',
      socket: 'LGA1700',
      supportedRam: ['DDR4', 'DDR5'],
      tdp: 58,
      tier: 'entry',
      price: 2190000,
      originalPrice: 2690000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-5',
      name: 'AMD Ryzen 5 5600X (Up to 4.6GHz, 6 Nhân 12 Luồng, 35MB Cache, AM4)',
      sku: 'CPU-AMD-5600X',
      brand: 'AMD',
      socket: 'AM4',
      supportedRam: ['DDR4'],
      tdp: 65,
      tier: 'entry',
      price: 3290000,
      originalPrice: 3890000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
    {
      id: 'c-6',
      name: 'AMD Ryzen 7 7800X3D (Up to 5.0GHz, 8 Nhân 16 Luồng, 96MB 3D V-Cache, AM5)',
      sku: 'CPU-AMD-7800X3D',
      brand: 'AMD',
      socket: 'AM5',
      supportedRam: ['DDR5'],
      tdp: 120,
      tier: 'high',
      price: 10990000,
      originalPrice: 12490000,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=150&q=80',
    },
  ],
  mainboard: [
    {
      id: 'm-1',
      name: 'Mainboard ASUS TUF GAMING B760M-PLUS WIFI DDR5 (LGA1700 / mATX)',
      sku: 'MB-ASUS-B760M-D5',
      brand: 'ASUS',
      socket: 'LGA1700',
      chipset: 'B760',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'mATX',
      vrmTier: 'mid',
      price: 3890000,
      originalPrice: 4390000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-2',
      name: 'Mainboard MSI MAG B650 TOMAHAWK WIFI DDR5 (AMD AM5 / ATX)',
      sku: 'MB-MSI-B650',
      brand: 'MSI',
      socket: 'AM5',
      chipset: 'B650',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'ATX',
      vrmTier: 'high',
      price: 5490000,
      originalPrice: 5990000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-3',
      name: 'Mainboard Gigabyte H610M H V2 DDR4 (LGA1700 / mATX)',
      sku: 'MB-GIGA-H610-D4',
      brand: 'Gigabyte',
      socket: 'LGA1700',
      chipset: 'H610',
      ramType: 'DDR4',
      ramSlots: 2,
      maxRamGb: 64,
      formFactor: 'mATX',
      vrmTier: 'entry',
      price: 1790000,
      originalPrice: 2090000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-4',
      name: 'Mainboard ASUS ROG STRIX Z790-F GAMING WIFI II DDR5 (LGA1700 / ATX)',
      sku: 'MB-ASUS-Z790-D5',
      brand: 'ASUS',
      socket: 'LGA1700',
      chipset: 'Z790',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'ATX',
      vrmTier: 'high',
      price: 9490000,
      originalPrice: 10990000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-5',
      name: 'Mainboard MSI B550M PRO-VDH WIFI DDR4 (AMD AM4 / mATX)',
      sku: 'MB-MSI-B550M-D4',
      brand: 'MSI',
      socket: 'AM4',
      chipset: 'B550',
      ramType: 'DDR4',
      ramSlots: 4,
      maxRamGb: 128,
      formFactor: 'mATX',
      vrmTier: 'mid',
      price: 2590000,
      originalPrice: 2990000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
    {
      id: 'm-6',
      name: 'Mainboard ASRock B650M Pro RS DDR5 (AMD AM5 / mATX)',
      sku: 'MB-ASR-B650M-D5',
      brand: 'ASRock',
      socket: 'AM5',
      chipset: 'B650',
      ramType: 'DDR5',
      ramSlots: 4,
      maxRamGb: 192,
      formFactor: 'mATX',
      vrmTier: 'mid',
      price: 3690000,
      originalPrice: 4190000,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&q=80',
    },
  ],
  ram: [
    {
      id: 'r-1',
      name: 'RAM Kingston FURY Beast RGB 16GB (2x8GB) DDR4 3200MHz',
      sku: 'RAM-KING-16-D4',
      brand: 'Kingston',
      ramType: 'DDR4',
      speed: '3200MHz',
      capacityGb: 16,
      modules: 2,
      price: 1090000,
      originalPrice: 1490000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
    {
      id: 'r-2',
      name: 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL36',
      sku: 'RAM-COR-32-D5',
      brand: 'Corsair',
      ramType: 'DDR5',
      speed: '6000MHz',
      capacityGb: 32,
      modules: 2,
      price: 2990000,
      originalPrice: 3590000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
    {
      id: 'r-3',
      name: 'RAM G.Skill Trident Z5 RGB 64GB (2x32GB) DDR5 6400MHz',
      sku: 'RAM-GSK-64-D5',
      brand: 'G.Skill',
      ramType: 'DDR5',
      speed: '6400MHz',
      capacityGb: 64,
      modules: 2,
      price: 5690000,
      originalPrice: 6290000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
    {
      id: 'r-4',
      name: 'RAM Corsair Vengeance LPX 32GB (2x16GB) DDR4 3600MHz',
      sku: 'RAM-COR-32-D4',
      brand: 'Corsair',
      ramType: 'DDR4',
      speed: '3600MHz',
      capacityGb: 32,
      modules: 2,
      price: 1890000,
      originalPrice: 2290000,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=150&q=80',
    },
  ],
  vga: [
    {
      id: 'v-1',
      name: 'Card Màn Hình ASUS Dual GeForce RTX 4060 EVO OC 8GB GDDR6',
      sku: 'VGA-ASUS-4060',
      brand: 'ASUS',
      tdp: 115,
      recommendedPsu: 550,
      lengthMm: 227,
      price: 8490000,
      originalPrice: 9990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
    {
      id: 'v-2',
      name: 'Card Màn Hình MSI GeForce RTX 4070 SUPER 12G VENTUS 2X OC',
      sku: 'VGA-MSI-4070S',
      brand: 'MSI',
      tdp: 220,
      recommendedPsu: 650,
      lengthMm: 242,
      price: 16990000,
      originalPrice: 18990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
    {
      id: 'v-3',
      name: 'Card Màn Hình Gigabyte GeForce GTX 1650 D6 OC 4G',
      sku: 'VGA-GIGA-1650',
      brand: 'Gigabyte',
      tdp: 75,
      recommendedPsu: 450,
      lengthMm: 172,
      price: 3490000,
      originalPrice: 3990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
    {
      id: 'v-4',
      name: 'Card Màn Hình ASUS ROG Strix GeForce RTX 4080 SUPER 16GB OC (3 Fan)',
      sku: 'VGA-ROG-4080S',
      brand: 'ASUS',
      tdp: 320,
      recommendedPsu: 850,
      lengthMm: 357,
      price: 31990000,
      originalPrice: 34990000,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=150&q=80',
    },
  ],
  ssd: [
    {
      id: 's-1',
      name: 'Ổ Cứng SSD Kingston NV2 1TB PCIe 4.0 x4 NVMe M.2',
      sku: 'SSD-KING-1TB',
      brand: 'Kingston',
      interface: 'M.2 NVMe PCIe 4.0',
      capacity: '1TB',
      price: 1590000,
      originalPrice: 1890000,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=150&q=80',
    },
    {
      id: 's-2',
      name: 'Ổ Cứng SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe M.2 (7450MB/s)',
      sku: 'SSD-SAM-990-1T',
      brand: 'Samsung',
      interface: 'M.2 NVMe PCIe 4.0',
      capacity: '1TB',
      price: 2790000,
      originalPrice: 3200000,
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=150&q=80',
    },
  ],
  psu: [
    {
      id: 'p-1',
      name: 'Nguồn Máy Tính Corsair CV650 650W 80 Plus Bronze',
      sku: 'PSU-COR-CV650',
      brand: 'Corsair',
      wattage: 650,
      efficiency: '80 Plus Bronze',
      price: 1390000,
      originalPrice: 1690000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'p-2',
      name: 'Nguồn Máy Tính ASUS TUF Gaming 750W 80 Plus Bronze PCIe 5.0',
      sku: 'PSU-ASUS-750W',
      brand: 'ASUS',
      wattage: 750,
      efficiency: '80 Plus Bronze',
      price: 1890000,
      originalPrice: 2290000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'p-3',
      name: 'Nguồn Máy Tính Corsair RM850e 850W 80 Plus Gold Full Modular ATX 3.0',
      sku: 'PSU-COR-RM850E',
      brand: 'Corsair',
      wattage: 850,
      efficiency: '80 Plus Gold',
      price: 3190000,
      originalPrice: 3590000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'p-4',
      name: 'Nguồn Máy Tính Deepcool PF550 550W 80 Plus Standard',
      sku: 'PSU-DEEP-550W',
      brand: 'Deepcool',
      wattage: 550,
      efficiency: '80 Plus',
      price: 890000,
      originalPrice: 1090000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
  case: [
    {
      id: 'cs-1',
      name: 'Vỏ Case Xigmatek Aqua M Lite 3FX (Mini Tower mATX - Kèm 3 Fan RGB)',
      sku: 'CASE-XIG-AQUA',
      brand: 'Xigmatek',
      supportedFormFactors: ['mATX', 'Mini-ITX'],
      maxGpuLengthMm: 320,
      price: 890000,
      originalPrice: 1100000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'cs-2',
      name: 'Vỏ Case NZXT H5 Flow Black (Mid Tower ATX / mATX - Kính Cường Lực)',
      sku: 'CASE-NZXT-H5',
      brand: 'NZXT',
      supportedFormFactors: ['ATX', 'mATX', 'Mini-ITX'],
      maxGpuLengthMm: 365,
      price: 2190000,
      originalPrice: 2590000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
  cooler: [
    {
      id: 'cl-1',
      name: 'Tản Nhiệt Khí Thermalright Peerless Assassin 120 SE ARGB (Hỗ trợ 220W)',
      sku: 'COOL-TR-PA120',
      brand: 'Thermalright',
      supportedSockets: ['LGA1700', 'AM5', 'AM4'],
      maxTdp: 220,
      type: 'Tản khí Tháp đôi',
      price: 850000,
      originalPrice: 1050000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'cl-2',
      name: 'Tản Nhiệt Nước AIO Deepcool LT520 240mm ARGB (Hỗ trợ 280W)',
      sku: 'COOL-DEEP-LT520',
      brand: 'Deepcool',
      supportedSockets: ['LGA1700', 'AM5', 'AM4'],
      maxTdp: 280,
      type: 'AIO 240mm',
      price: 1990000,
      originalPrice: 2490000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
    {
      id: 'cl-3',
      name: 'Tản Nhiệt Khí ID-COOLING SE-214-XT ARGB (Hỗ trợ 150W)',
      sku: 'COOL-IDC-214XT',
      brand: 'ID-Cooling',
      supportedSockets: ['LGA1700', 'AM5', 'AM4'],
      maxTdp: 150,
      type: 'Tản khí Đơn',
      price: 450000,
      originalPrice: 590000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
  monitor: [
    {
      id: 'mo-1',
      name: 'Màn Hình Gaming ASUS TUF VG249Q3A 24" Fast IPS 180Hz 1ms',
      sku: 'MON-ASUS-24-180',
      brand: 'ASUS',
      panel: '24" Fast IPS 180Hz',
      price: 3190000,
      originalPrice: 4290000,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=150&q=80',
    },
  ],
  gear: [
    {
      id: 'g-1',
      name: 'Bộ Bàn Phím Cơ + Chuột Gaming DareU RGB Chính Hãng',
      sku: 'GEAR-DAREU-COMBO',
      brand: 'DareU',
      price: 790000,
      originalPrice: 1100000,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80',
    },
  ],
};

// Map truy cập nhanh các linh kiện đang được chọn
const selectedMap = computed(() => {
  const map: Record<string, any> = {};
  for (const p of parts.value) {
    map[p.category] = p.selected;
  }
  return map;
});

// Tính tổng công suất tiêu thụ ước tính (Watt)
const estimatedWattage = computed(() => {
  const cpuW = selectedMap.value.cpu?.tdp || 0;
  const vgaW = selectedMap.value.vga?.tdp || 0;
  const baseW = selectedCount.value > 0 ? 75 : 0; // Mainboard + RAM + SSD + Fan
  return cpuW + vgaW + baseW;
});

const recommendedPsuWattage = computed(() => {
  const raw = Math.ceil((estimatedWattage.value * 1.25) / 50) * 50;
  const vgaMin = selectedMap.value.vga?.recommendedPsu || 0;
  return Math.max(raw, vgaMin, 450);
});

// Kiểm tra xung đột & cảnh báo kỹ thuật toàn hệ thống
interface CompatibilityIssue {
  severity: 'error' | 'warning';
  categories: string[];
  title: string;
  message: string;
}

const compatibilityIssues = computed<CompatibilityIssue[]>(() => {
  const issues: CompatibilityIssue[] = [];
  const { cpu, mainboard, ram, vga, psu, case: pcCase, cooler } = selectedMap.value;

  // 1. Kiểm tra CPU <-> Mainboard (Socket & VRM)
  if (cpu && mainboard) {
    if (cpu.socket !== mainboard.socket) {
      issues.push({
        severity: 'error',
        categories: ['cpu', 'mainboard'],
        title: 'Xung đột Socket CPU & Mainboard',
        message: `${cpu.name} dùng chân cắm ${cpu.socket}, không thể lắp vừa ${mainboard.name} (Socket ${mainboard.socket}).`,
      });
    } else if (cpu.tier === 'high' && mainboard.vrmTier === 'entry') {
      issues.push({
        severity: 'warning',
        categories: ['cpu', 'mainboard'],
        title: 'Cảnh báo tải mạch VRM Mainboard',
        message: `${cpu.name} có công suất tỏa nhiệt cao (${cpu.tdp}W), nên ghép với Mainboard dòng B760/Z790 hoặc B650 thay vì dòng phổ thông ${mainboard.chipset} để tránh bị tụt xung.`,
      });
    }
  }

  // 2. Kiểm tra Mainboard <-> RAM (DDR4 vs DDR5)
  if (mainboard && ram) {
    if (mainboard.ramType !== ram.ramType) {
      issues.push({
        severity: 'error',
        categories: ['mainboard', 'ram'],
        title: 'Xung đột chuẩn khe cắm RAM',
        message: `${mainboard.name} chỉ hỗ trợ chuẩn ${mainboard.ramType}, nhưng bạn đang chọn ${ram.name} (${ram.ramType}).`,
      });
    }
  }

  // 3. Kiểm tra CPU <-> RAM (Ví dụ AMD AM5 chỉ hỗ trợ DDR5)
  if (cpu && ram && cpu.supportedRam && !cpu.supportedRam.includes(ram.ramType)) {
    issues.push({
      severity: 'error',
      categories: ['cpu', 'ram'],
      title: 'CPU không hỗ trợ chuẩn RAM này',
      message: `${cpu.name} chỉ hỗ trợ bộ nhớ ${cpu.supportedRam.join('/')}, không tương thích với ${ram.ramType}.`,
    });
  }

  // 4. Kiểm tra Mainboard <-> Vỏ Case (Form Factor ATX vs mATX)
  if (mainboard && pcCase) {
    if (!pcCase.supportedFormFactors.includes(mainboard.formFactor)) {
      issues.push({
        severity: 'error',
        categories: ['mainboard', 'case'],
        title: 'Vỏ Case không vừa kích thước Mainboard',
        message: `${pcCase.name} chỉ hỗ trợ Mainboard cỡ ${pcCase.supportedFormFactors.join('/')}, không lắp vừa ${mainboard.name} (chuẩn ${mainboard.formFactor}).`,
      });
    }
  }

  // 5. Kiểm tra Chiều dài VGA <-> Vỏ Case
  if (vga && pcCase) {
    if (vga.lengthMm > pcCase.maxGpuLengthMm) {
      issues.push({
        severity: 'error',
        categories: ['vga', 'case'],
        title: 'Card màn hình quá dài so với Vỏ Case',
        message: `${vga.name} dài ${vga.lengthMm}mm, vượt quá giới hạn tối đa ${pcCase.maxGpuLengthMm}mm của ${pcCase.name}.`,
      });
    }
  }

  // 6. Kiểm tra Công suất Nguồn (PSU) <-> Toàn dàn máy
  if (psu && (cpu || vga)) {
    if (psu.wattage < recommendedPsuWattage.value) {
      issues.push({
        severity: 'error',
        categories: ['psu', 'vga', 'cpu'],
        title: 'Nguồn (PSU) không đủ công suất an toàn',
        message: `Cấu hình hiện tại cần nguồn tối thiểu ${recommendedPsuWattage.value}W, nhưng ${psu.name} chỉ có ${psu.wattage}W.`,
      });
    }
  }

  // 7. Kiểm tra Tản nhiệt CPU <-> TDP của CPU
  if (cpu && cooler) {
    if (cooler.maxTdp < cpu.tdp) {
      issues.push({
        severity: 'warning',
        categories: ['cpu', 'cooler'],
        title: 'Tản nhiệt CPU chưa đủ công suất giải nhiệt',
        message: `${cpu.name} tỏa nhiệt tới ${cpu.tdp}W nhưng ${cooler.name} chỉ khuyến nghị tối đa ${cooler.maxTdp}W. Nên chọn Tản nhiệt Khí Tháp Đôi hoặc AIO 240mm.`,
      });
    }
  }

  return issues;
});

// 5 Ô trạng thái kiểm tra hiển thị trên đầu trang
const compatibilityChecklist = computed(() => {
  const { cpu, mainboard, ram, vga, psu, case: pcCase } = selectedMap.value;

  // 1. Socket
  let socketItem = {
    id: 'socket',
    title: '1. Socket CPU & Main',
    status: 'pending',
    detail: 'Chọn CPU & Mainboard để kiểm tra chân cắm',
  };
  if (cpu && mainboard) {
    if (cpu.socket === mainboard.socket) {
      socketItem = {
        id: 'socket',
        title: '1. Socket CPU & Main',
        status: 'ok',
        detail: `Khớp chuẩn Socket ${cpu.socket} (${cpu.brand})`,
      };
    } else {
      socketItem = {
        id: 'socket',
        title: '1. Socket CPU & Main',
        status: 'error',
        detail: `Lệch Socket: CPU ${cpu.socket} ≠ Main ${mainboard.socket}`,
      };
    }
  } else if (cpu || mainboard) {
    socketItem.detail = `Đang chờ chọn ${cpu ? 'Mainboard' : 'CPU'} (${(cpu || mainboard).socket})`;
  }

  // 2. RAM
  let ramItem = {
    id: 'ram',
    title: '2. Chuẩn RAM & Main',
    status: 'pending',
    detail: 'Chọn Mainboard & RAM để đối chiếu DDR4/DDR5',
  };
  if (mainboard && ram) {
    if (mainboard.ramType === ram.ramType) {
      ramItem = {
        id: 'ram',
        title: '2. Chuẩn RAM & Main',
        status: 'ok',
        detail: `Khớp chuẩn ${ram.ramType} (${ram.speed})`,
      };
    } else {
      ramItem = {
        id: 'ram',
        title: '2. Chuẩn RAM & Main',
        status: 'error',
        detail: `Sai chuẩn: Main ${mainboard.ramType} ≠ RAM ${ram.ramType}`,
      };
    }
  } else if (mainboard || ram) {
    ramItem.detail = `Chuẩn yêu cầu: ${(mainboard || ram).ramType}`;
  }

  // 3. Case & Mainboard / VGA
  let caseItem = {
    id: 'case',
    title: '3. Kích thước Vỏ Case',
    status: 'pending',
    detail: 'Kiểm tra cỡ Main ATX/mATX & chiều dài VGA',
  };
  if (pcCase && (mainboard || vga)) {
    const formOk = !mainboard || pcCase.supportedFormFactors.includes(mainboard.formFactor);
    const vgaOk = !vga || vga.lengthMm <= pcCase.maxGpuLengthMm;
    if (formOk && vgaOk) {
      caseItem = {
        id: 'case',
        title: '3. Kích thước Vỏ Case',
        status: 'ok',
        detail: `Lắp vừa ${mainboard ? mainboard.formFactor : ''} ${vga ? `& VGA ${vga.lengthMm}mm` : ''}`,
      };
    } else {
      caseItem = {
        id: 'case',
        title: '3. Kích thước Vỏ Case',
        status: 'error',
        detail: !formOk
          ? `Case không vừa Main ${mainboard.formFactor}`
          : `VGA dài ${vga.lengthMm}mm vượt cỡ Case`,
      };
    }
  }

  // 4. PSU Wattage
  let psuItem = {
    id: 'psu',
    title: '4. Công suất Nguồn',
    status: 'pending',
    detail: `Ước tính tiêu thụ: ${estimatedWattage.value}W`,
  };
  if (psu && (cpu || vga)) {
    if (psu.wattage >= recommendedPsuWattage.value) {
      psuItem = {
        id: 'psu',
        title: '4. Công suất Nguồn',
        status: 'ok',
        detail: `Nguồn ${psu.wattage}W đáp ứng tốt (Khuyến nghị ≥ ${recommendedPsuWattage.value}W)`,
      };
    } else {
      psuItem = {
        id: 'psu',
        title: '4. Công suất Nguồn',
        status: 'error',
        detail: `Nguồn ${psu.wattage}W bị thiếu (Cần ≥ ${recommendedPsuWattage.value}W)`,
      };
    }
  }

  // 5. Cooler TDP
  const cooler = selectedMap.value.cooler;
  let coolerItem = {
    id: 'cooler',
    title: '5. Tản nhiệt CPU',
    status: 'pending',
    detail: 'Kiểm tra công suất giải nhiệt TDP',
  };
  if (cpu && cooler) {
    if (cooler.maxTdp >= cpu.tdp) {
      coolerItem = {
        id: 'cooler',
        title: '5. Tản nhiệt CPU',
        status: 'ok',
        detail: `${cooler.type} giải nhiệt tốt cho CPU ${cpu.tdp}W`,
      };
    } else {
      coolerItem = {
        id: 'cooler',
        title: '5. Tản nhiệt CPU',
        status: 'warn',
        detail: `Tản ${cooler.maxTdp}W hơi yếu so với CPU ${cpu.tdp}W`,
      };
    }
  }

  return [socketItem, ramItem, caseItem, psuItem, coolerItem];
});

const hasPartError = (category: string) => {
  return compatibilityIssues.value.some(
    (i) => i.severity === 'error' && i.categories.includes(category)
  );
};

// Gợi ý thông minh trên từng dòng linh kiện
const getPartHint = (category: string): string => {
  const { cpu, mainboard, ram, vga, case: pcCase } = selectedMap.value;
  if (category === 'cpu' && mainboard) {
    return `Cần chọn CPU có Socket ${mainboard.socket}`;
  }
  if (category === 'mainboard') {
    const hints: string[] = [];
    if (cpu) hints.push(`Socket ${cpu.socket}`);
    if (ram) hints.push(`Hỗ trợ ${ram.ramType}`);
    if (pcCase) hints.push(`Cỡ ${pcCase.supportedFormFactors.join('/')}`);
    return hints.length ? `Cần Mainboard: ${hints.join(' • ')}` : '';
  }
  if (category === 'ram') {
    if (mainboard) return `Cần chọn RAM chuẩn ${mainboard.ramType} theo Mainboard`;
    if (cpu?.supportedRam?.length === 1) return `CPU này chỉ nhận RAM ${cpu.supportedRam[0]}`;
  }
  if (category === 'psu' && (cpu || vga)) {
    return `Khuyến nghị chọn Nguồn từ ${recommendedPsuWattage.value}W trở lên`;
  }
  if (category === 'case' && mainboard) {
    return `Cần Vỏ Case hỗ trợ cỡ ${mainboard.formFactor}`;
  }
  return '';
};

// Hiển thị nhãn thông số kỹ thuật cho từng linh kiện
const getSpecBadges = (category: string, item: any): string[] => {
  if (!item) return [];
  switch (category) {
    case 'cpu':
      return [`Socket ${item.socket}`, `Hỗ trợ ${item.supportedRam.join('/')}`, `TDP ${item.tdp}W`];
    case 'mainboard':
      return [`Socket ${item.socket}`, `Chipset ${item.chipset}`, `Khe RAM ${item.ramType}`, `Cỡ ${item.formFactor}`];
    case 'ram':
      return [`Chuẩn ${item.ramType}`, `Bus ${item.speed}`, `Dung lượng ${item.capacityGb}GB`];
    case 'vga':
      return [`TDP ${item.tdp}W`, `Nguồn KN ≥ ${item.recommendedPsu}W`, `Dài ${item.lengthMm}mm`];
    case 'psu':
      return [`Công suất ${item.wattage}W`, item.efficiency];
    case 'case':
      return [`Hỗ trợ ${item.supportedFormFactors.join('/')}`, `VGA tối đa ${item.maxGpuLengthMm}mm`];
    case 'cooler':
      return [item.type, `TDP tối đa ${item.maxTdp}W`];
    default:
      return [item.sku];
  }
};

// Kiểm tra 1 ứng viên linh kiện trong Modal có tương thích với các linh kiện đã chọn không
const checkCandidateCompatibility = (
  category: string,
  candidate: any
): { compatible: boolean; reason: string } => {
  if (!category || !candidate) return { compatible: true, reason: '' };
  const { cpu, mainboard, ram, vga, case: pcCase } = selectedMap.value;

  if (category === 'cpu') {
    if (mainboard && candidate.socket !== mainboard.socket) {
      return { compatible: false, reason: `Khác Socket (Main đang chọn là ${mainboard.socket})` };
    }
    if (ram && candidate.supportedRam && !candidate.supportedRam.includes(ram.ramType)) {
      return { compatible: false, reason: `Không hỗ trợ RAM ${ram.ramType}` };
    }
  }

  if (category === 'mainboard') {
    if (cpu && candidate.socket !== cpu.socket) {
      return { compatible: false, reason: `Khác Socket (CPU đang chọn là ${cpu.socket})` };
    }
    if (ram && candidate.ramType !== ram.ramType) {
      return { compatible: false, reason: `Khác chuẩn RAM (RAM đang chọn là ${ram.ramType})` };
    }
    if (pcCase && !pcCase.supportedFormFactors.includes(candidate.formFactor)) {
      return { compatible: false, reason: `Cỡ ${candidate.formFactor} không vừa Vỏ Case đang chọn` };
    }
  }

  if (category === 'ram') {
    if (mainboard && candidate.ramType !== mainboard.ramType) {
      return { compatible: false, reason: `Mainboard đang chọn chỉ nhận ${mainboard.ramType}` };
    }
    if (cpu && cpu.supportedRam && !cpu.supportedRam.includes(candidate.ramType)) {
      return { compatible: false, reason: `CPU đang chọn chỉ nhận ${cpu.supportedRam.join('/')}` };
    }
  }

  if (category === 'case') {
    if (mainboard && !candidate.supportedFormFactors.includes(mainboard.formFactor)) {
      return { compatible: false, reason: `Không lắp vừa Mainboard ${mainboard.formFactor}` };
    }
    if (vga && vga.lengthMm > candidate.maxGpuLengthMm) {
      return { compatible: false, reason: `Chiều dài VGA (${vga.lengthMm}mm) vượt cỡ Case` };
    }
  }

  if (category === 'vga') {
    if (pcCase && candidate.lengthMm > pcCase.maxGpuLengthMm) {
      return { compatible: false, reason: `Dài ${candidate.lengthMm}mm, không vừa Vỏ Case đang chọn` };
    }
  }

  if (category === 'psu') {
    if ((cpu || vga) && candidate.wattage < recommendedPsuWattage.value) {
      return { compatible: false, reason: `Công suất ${candidate.wattage}W thấp hơn mức khuyến nghị ${recommendedPsuWattage.value}W` };
    }
  }

  return { compatible: true, reason: '' };
};

// Cấu hình mẫu 1 chạm (Preset Builds)
const presetBuilds = [
  {
    id: 'preset-entry',
    badge: 'Tiết kiệm • ~12 Triệu',
    name: 'PC Gaming Phổ Thông (Intel LGA1700 + DDR4)',
    summary: 'Core i3-12100F • H610M DDR4 • RAM 16GB DDR4 • GTX 1650 • Nguồn 550W',
    picks: { cpu: 'c-4', mainboard: 'm-3', ram: 'r-1', vga: 'v-3', ssd: 's-1', psu: 'p-4', case: 'cs-1', cooler: 'cl-3' },
  },
  {
    id: 'preset-mid-intel',
    badge: 'Bán chạy nhất • ~24 Triệu',
    name: 'PC Gaming Tầm Trung (Intel i5 + B760 DDR5)',
    summary: 'Core i5-13400F • B760M DDR5 • RAM 32GB DDR5 • RTX 4060 8GB • Nguồn 650W',
    picks: { cpu: 'c-1', mainboard: 'm-1', ram: 'r-2', vga: 'v-1', ssd: 's-1', psu: 'p-1', case: 'cs-1', cooler: 'cl-1' },
  },
  {
    id: 'preset-amd-am5',
    badge: 'Chuẩn Mới • ~26 Triệu',
    name: 'PC Gaming AMD AM5 (Ryzen 5 7600 + DDR5)',
    summary: 'Ryzen 5 7600 • B650M DDR5 • RAM 32GB DDR5 • RTX 4060 8GB • Nguồn 650W',
    picks: { cpu: 'c-3', mainboard: 'm-6', ram: 'r-2', vga: 'v-1', ssd: 's-1', psu: 'p-1', case: 'cs-1', cooler: 'cl-1' },
  },
  {
    id: 'preset-hiend',
    badge: 'Đồ Họa & 4K • ~48 Triệu',
    name: 'PC Hi-End / Workstation (i7-14700K + Z790)',
    summary: 'Core i7-14700K • Z790 ATX • RAM 64GB DDR5 • RTX 4070 Super • AIO 240mm',
    picks: { cpu: 'c-2', mainboard: 'm-4', ram: 'r-3', vga: 'v-2', ssd: 's-2', psu: 'p-3', case: 'cs-2', cooler: 'cl-2' },
  },
];

const applyPreset = (preset: any) => {
  for (const part of parts.value) {
    const targetId = preset.picks[part.category];
    if (targetId) {
      const list = mockComponentsDatabase[part.category] || [];
      part.selected = list.find((item) => item.id === targetId) || null;
    } else {
      part.selected = null;
    }
  }
  ElMessage.success(`Đã áp dụng cấu hình mẫu: ${preset.name}`);
};

// Modal State
const isModalOpen = ref(false);
const activePart = ref<any>(null);
const modalSearch = ref('');
const onlyShowCompatible = ref(true);

const openSelectModal = (part: any) => {
  activePart.value = part;
  modalSearch.value = '';
  onlyShowCompatible.value = true;
  isModalOpen.value = true;
};

const filteredModalProducts = computed(() => {
  if (!activePart.value) return [];
  const cat = activePart.value.category;
  const list = mockComponentsDatabase[cat] || [];
  const kw = modalSearch.value.trim().toLowerCase();

  return list.filter((item) => {
    const matchKw =
      !kw ||
      item.name.toLowerCase().includes(kw) ||
      item.sku.toLowerCase().includes(kw) ||
      (item.socket && item.socket.toLowerCase().includes(kw)) ||
      (item.ramType && item.ramType.toLowerCase().includes(kw));

    if (!matchKw) return false;
    if (onlyShowCompatible.value) {
      return checkCandidateCompatibility(cat, item).compatible;
    }
    return true;
  });
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
  const hasErrors = compatibilityIssues.value.some((i) => i.severity === 'error');
  if (hasErrors) {
    ElMessage.error('Cấu hình hiện tại đang có linh kiện xung đột phần cứng! Vui lòng kiểm tra lại trước khi đặt mua.');
    return;
  }
  chosenParts.forEach((p) => {
    cartStore.addItem({
      id: p.selected.id,
      name: `[Build PC] ${p.selected.name}`,
      price: p.selected.price,
      image: p.selected.image,
    });
  });
  ElMessage.success(`Đã thêm ${chosenParts.length} linh kiện tương thích vào giỏ hàng!`);
  cartStore.isDrawerOpen = true;
};
</script>
