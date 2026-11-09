<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-800">
          💻 Quản lý Sản phẩm &amp; Thông số Kỹ thuật Chi tiết
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
          Thêm, sửa, xóa đầy đủ thông tin sản phẩm, giá bán, bảng thông số kỹ thuật chi tiết, đặc điểm nổi bật, thư viện ảnh và quà tặng. Đồng bộ trực tiếp với Cửa hàng &amp; Trang chủ.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <el-button @click="handleResetProducts">Khôi phục dữ liệu mẫu</el-button>
        <el-button type="success" color="#00733c" :icon="Plus" @click="openAddDialog">
          + Thêm Sản phẩm mới
        </el-button>
      </div>
    </div>

    <!-- Bộ lọc & Bảng danh sách sản phẩm -->
    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div class="flex flex-wrap items-center gap-3 flex-1">
          <el-input
            v-model="searchQuery"
            placeholder="Tìm theo tên sản phẩm, mã SKU, thương hiệu..."
            clearable
            class="w-full sm:w-72"
          />
          <el-select v-model="categoryFilter" placeholder="Lọc theo nhóm danh mục" clearable class="w-full sm:w-56">
            <el-option label="Tất cả danh mục" value="" />
            <el-option label="💻 Laptop & Máy tính xách tay" value="laptop" />
            <el-option label="🖥️ PC Gaming & Đồ Họa" value="pc-gaming" />
            <el-option label="⚡ Linh kiện máy tính (PC Parts)" value="linh-kien" />
            <el-option label="📺 Màn hình máy tính" value="man-hinh" />
            <el-option label="🎧 Gaming Gear (Phím, Chuột, Tai nghe)" value="gaming-gear" />
          </el-select>
        </div>
        <div class="text-xs text-slate-500">
          Hiển thị <strong class="text-[#00733c]">{{ filteredProducts.length }}</strong> / {{ productStore.products.length }} sản phẩm
        </div>
      </div>

      <el-table :data="filteredProducts" border stripe style="width: 100%">
        <el-table-column prop="sku" label="Mã SKU" width="145">
          <template #default="{ row }">
            <span class="font-mono text-xs font-bold text-[#00733c]">{{ row.sku }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Sản phẩm & Mô tả" min-width="300">
          <template #default="{ row }">
            <div class="flex items-start gap-3">
              <img
                v-if="row.image"
                :src="row.image"
                :alt="row.name"
                class="w-12 h-12 rounded-lg object-contain bg-slate-50 border border-slate-200 flex-shrink-0 p-1"
              />
              <div class="min-w-0 flex-1">
                <div class="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1">{{ row.name }}</div>
                <div class="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  {{ row.description || 'Chưa có mô tả đặc điểm nổi bật' }}
                </div>
                <div class="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span>BH: <strong class="text-slate-600">{{ row.warranty || '36 tháng' }}</strong></span>
                  <span>•</span>
                  <span class="text-emerald-700 font-semibold">
                    📋 {{ row.specs?.length || 0 }} dòng thông số
                  </span>
                  <span v-if="row.badge" class="bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded font-bold text-[10px]">
                    {{ row.badge }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Danh mục" width="165">
          <template #default="{ row }">
            <div class="text-xs font-bold text-slate-700">{{ row.categoryName }}</div>
            <div class="text-[10px] text-slate-400 font-mono">/{{ row.category }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="brand" label="Thương hiệu" width="115" align="center">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.brand }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Giá bán & KM" width="165">
          <template #default="{ row }">
            <div class="font-extrabold text-red-600 text-sm">{{ formatPrice(row.price) }}</div>
            <div v-if="row.originalPrice && row.originalPrice > row.price" class="text-[11px] text-slate-400 flex items-center gap-1">
              <span class="line-through">{{ formatPrice(row.originalPrice) }}</span>
              <span v-if="row.discount" class="text-red-600 font-bold">(-{{ row.discount }}%)</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Thao tác" width="210" align="right">
          <template #default="{ row }">
            <div class="flex items-center justify-end gap-1.5">
              <router-link
                :to="'/product/' + row.id"
                target="_blank"
                class="px-2 py-1 text-xs font-semibold rounded border border-slate-200 text-slate-600 hover:border-[#00733c] hover:text-[#00733c] transition"
                title="Xem trang chi tiết sản phẩm"
              >
                Xem
              </router-link>
              <el-button size="small" type="primary" :icon="Edit" @click="openEditDialog(row)">
                Sửa chi tiết
              </el-button>
              <el-button size="small" type="danger" plain :icon="Delete" @click="handleDelete(row)" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- ==================== DIALOG THÊM / SỬA CHI TIẾT SẢN PHẨM ==================== -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? `Chỉnh sửa Chi tiết Sản phẩm: ${form.name}` : 'Thêm Sản phẩm mới (Đầy đủ Thông số & Nội dung)'"
      width="920px"
      top="3vh"
    >
      <el-tabs v-model="activeDialogTab" type="card">
        <!-- TAB 1: THÔNG TIN CHUNG & GIÁ BÁN -->
        <el-tab-pane name="general" label="1. Thông tin chung & Giá bán">
          <el-form label-position="top" class="grid grid-cols-1 sm:grid-cols-12 gap-x-4 pt-2">
            <el-form-item label="Tên đầy đủ của sản phẩm *" class="sm:col-span-8">
              <el-input
                v-model="form.name"
                placeholder="VD: PC Gaming Nhân Phúc Dragon Core i5 13400F | RTX 4060 8GB | 16GB RAM"
              />
            </el-form-item>

            <el-form-item label="Mã sản phẩm (SKU) *" class="sm:col-span-4">
              <el-input v-model="form.sku" placeholder="VD: PC-NP-DRAGON" />
            </el-form-item>

            <el-form-item label="Danh mục sản phẩm *" class="sm:col-span-5">
              <el-select v-model="form.category" class="w-full" filterable @change="onCategoryChange">
                <el-option
                  v-for="cat in PRODUCT_CATEGORIES"
                  :key="cat.slug"
                  :label="`${cat.parentName} → ${cat.name}`"
                  :value="cat.slug"
                />
              </el-select>
            </el-form-item>

            <el-form-item label="Thương hiệu (Hãng) *" class="sm:col-span-3">
              <el-select
                v-model="form.brand"
                filterable
                allow-create
                default-first-option
                class="w-full"
                placeholder="Chọn hoặc nhập hãng"
              >
                <el-option v-for="b in brandSuggestions" :key="b" :label="b" :value="b" />
              </el-select>
            </el-form-item>

            <el-form-item label="Thời hạn bảo hành" class="sm:col-span-4">
              <el-input v-model="form.warranty" placeholder="VD: 36 tháng chính hãng" />
            </el-form-item>

            <el-form-item label="Giá bán thực tế (VNĐ) *" class="sm:col-span-4">
              <el-input-number
                v-model="form.price"
                :min="0"
                :step="100000"
                class="w-full"
                @change="recalcDiscount"
              />
            </el-form-item>

            <el-form-item label="Giá gốc niêm yết (VNĐ)" class="sm:col-span-4">
              <el-input-number
                v-model="form.originalPrice"
                :min="0"
                :step="100000"
                class="w-full"
                @change="recalcDiscount"
              />
            </el-form-item>

            <el-form-item label="% Giảm giá (Tự tính hoặc nhập)" class="sm:col-span-4">
              <el-input-number v-model="form.discount" :min="0" :max="95" class="w-full" />
            </el-form-item>

            <el-form-item label="Số lượng tồn kho" class="sm:col-span-4">
              <el-input-number v-model="form.stock" :min="0" :max="9999" class="w-full" />
            </el-form-item>

            <el-form-item label="Nhãn nổi bật (Badge)" class="sm:col-span-4">
              <el-input v-model="form.badge" placeholder="VD: Bán Chạy Nhất, Tiết Kiệm, Hi-End..." />
            </el-form-item>

            <el-form-item label="Phân khúc cấu hình (Dành cho PC)" class="sm:col-span-4">
              <el-select v-model="form.tier" class="w-full" clearable placeholder="Tự động theo giá">
                <el-option label="Phổ thông (< 15 Triệu)" value="entry" />
                <el-option label="Trung cấp (15 - 25 Triệu)" value="mid" />
                <el-option label="Cao cấp / Hi-End (> 25 Triệu)" value="high" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- TAB 2: THÔNG SỐ KỸ THUẬT CHI TIẾT & ĐẶC ĐIỂM NỔI BẬT -->
        <el-tab-pane name="specs" label="2. 📋 Thông số Kỹ thuật & Đặc điểm nổi bật">
          <div class="space-y-5 pt-2">
            <!-- Thanh công cụ chèn mẫu thông số nhanh -->
            <div class="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div class="text-xs font-extrabold text-[#014f2b]">
                  📋 Bảng Thông Số Kỹ Thuật Chi Tiết ({{ form.specs.length }} dòng)
                </div>
                <p class="text-[11px] text-slate-600">
                  Thêm, sửa hoặc xóa từng dòng thông số (VD: CPU, Mainboard, VGA, RAM, SSD, Nguồn...). Có thể chọn mẫu nhanh bên phải.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <el-select
                  v-model="selectedTemplateKey"
                  placeholder="Chèn mẫu thông số..."
                  size="small"
                  class="w-52"
                  @change="applySpecTemplate"
                >
                  <el-option
                    v-for="(tpl, key) in SPEC_TEMPLATES"
                    :key="key"
                    :label="tpl.label"
                    :value="key"
                  />
                </el-select>
                <el-button size="small" type="success" color="#00733c" :icon="Plus" @click="addSpecRow">
                  + Thêm dòng thông số
                </el-button>
              </div>
            </div>

            <!-- Danh sách các dòng thông số -->
            <div class="space-y-2 max-h-[290px] overflow-y-auto pr-1">
              <div
                v-for="(spec, idx) in form.specs"
                :key="idx"
                class="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200/80"
              >
                <div class="col-span-12 sm:col-span-4">
                  <el-input
                    v-model="spec.label"
                    size="small"
                    placeholder="Tên thông số (VD: CPU, Mainboard, VGA...)"
                  />
                </div>
                <div class="col-span-10 sm:col-span-6">
                  <el-input
                    v-model="spec.value"
                    size="small"
                    placeholder="Giá trị chi tiết (VD: Intel Core i5 13400F 10 Nhân 16 Luồng)"
                  />
                </div>
                <div class="col-span-2 sm:col-span-2 flex items-center justify-end gap-1">
                  <el-button
                    size="small"
                    :icon="ArrowUp"
                    circle
                    :disabled="idx === 0"
                    @click="moveSpecRow(idx, -1)"
                    title="Chuyển lên"
                  />
                  <el-button
                    size="small"
                    :icon="ArrowDown"
                    circle
                    :disabled="idx === form.specs.length - 1"
                    @click="moveSpecRow(idx, 1)"
                    title="Chuyển xuống"
                  />
                  <el-button
                    size="small"
                    type="danger"
                    plain
                    :icon="Delete"
                    circle
                    @click="removeSpecRow(idx)"
                    title="Xóa dòng này"
                  />
                </div>
              </div>

              <div v-if="form.specs.length === 0" class="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
                Chưa có thông số kỹ thuật nào. Hãy bấm <strong>"+ Thêm dòng thông số"</strong> hoặc chọn <strong>"Chèn mẫu thông số"</strong> ở trên.
              </div>
            </div>

            <!-- Đặc điểm nổi bật / Mô tả chi tiết -->
            <div class="pt-2 border-t border-slate-100">
              <label class="block text-xs font-extrabold text-slate-800 mb-1.5">
                ✨ Đặc Điểm Nổi Bật / Mô tả chi tiết sản phẩm (Hiển thị dưới bảng thông số)
              </label>
              <el-input
                v-model="form.description"
                type="textarea"
                :rows="4"
                placeholder="Nhập mô tả chi tiết, ưu điểm nổi bật, khả năng chiến game hoặc làm việc đồ họa của sản phẩm..."
              />
            </div>
          </div>
        </el-tab-pane>

        <!-- TAB 3: HÌNH ẢNH & ƯU ĐÃI QUÀ TẶNG -->
        <el-tab-pane name="media" label="3. 🖼️ Hình ảnh & Ưu đãi Quà tặng">
          <div class="space-y-5 pt-2">
            <!-- Ảnh đại diện chính -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div class="md:col-span-8 space-y-2">
                <label class="block text-xs font-extrabold text-slate-800">Ảnh đại diện chính của sản phẩm *</label>
                <el-input v-model="form.image" placeholder="Dán đường dẫn URL ảnh (https://...)" clearable />
                <div class="flex items-center gap-3 pt-1">
                  <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:border-[#00733c] hover:text-[#00733c] cursor-pointer">
                    <el-icon><Upload /></el-icon> Tải ảnh từ máy tính
                    <input type="file" accept="image/*" class="hidden" @change="handleMainImageUpload" />
                  </label>
                  <span class="text-[11px] text-slate-400">Hỗ trợ JPG, PNG, WebP (&lt; 800KB)</span>
                </div>
              </div>
              <div class="md:col-span-4 flex justify-center">
                <div class="w-32 h-32 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center overflow-hidden">
                  <img v-if="form.image" :src="form.image" class="w-full h-full object-contain" />
                  <span v-else class="text-xs text-slate-400">Chưa có ảnh</span>
                </div>
              </div>
            </div>

            <!-- Thư viện ảnh chi tiết (Gallery) -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <label class="text-xs font-extrabold text-slate-800">
                  Thư viện ảnh góc chụp phụ ({{ form.gallery.length }} ảnh)
                </label>
                <el-button size="small" :icon="Plus" @click="form.gallery.push('')">
                  + Thêm ảnh phụ
                </el-button>
              </div>
              <div class="space-y-2">
                <div v-for="(_g, idx) in form.gallery" :key="idx" class="flex items-center gap-2">
                  <el-input v-model="form.gallery[idx]" size="small" placeholder="URL hình ảnh phụ..." />
                  <img
                    v-if="form.gallery[idx]"
                    :src="form.gallery[idx]"
                    class="w-8 h-8 rounded object-contain border border-slate-200 bg-white flex-shrink-0"
                  />
                  <el-button size="small" type="danger" plain :icon="Delete" @click="form.gallery.splice(idx, 1)" />
                </div>
              </div>
            </div>

            <!-- Quà tặng & Ưu đãi độc quyền -->
            <div class="space-y-2 pt-2 border-t border-slate-100">
              <div class="flex items-center justify-between">
                <label class="text-xs font-extrabold text-slate-800">
                  🎁 Quà tặng &amp; Ưu đãi độc quyền khi mua sản phẩm này
                </label>
                <el-button size="small" :icon="Plus" @click="form.promotions.push('')">
                  + Thêm dòng ưu đãi
                </el-button>
              </div>
              <div class="space-y-2">
                <div v-for="(_promo, idx) in form.promotions" :key="idx" class="flex items-center gap-2">
                  <el-input
                    v-model="form.promotions[idx]"
                    size="small"
                    placeholder="VD: Tặng gói vệ sinh máy tính định kỳ 2 năm miễn phí..."
                  />
                  <el-button size="small" type="danger" plain :icon="Delete" @click="form.promotions.splice(idx, 1)" />
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <div class="flex flex-wrap items-center justify-between gap-2">
          <div class="text-xs text-slate-400">
            Mẹo: Nhập đầy đủ Tab 1, Tab 2 (Thông số kỹ thuật) và Tab 3 trước khi bấm Lưu.
          </div>
          <div class="flex gap-2">
            <el-button @click="dialogVisible = false">Hủy</el-button>
            <el-button type="success" color="#00733c" @click="saveProduct">
              💾 Lưu thông tin sản phẩm
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, ArrowUp, ArrowDown, Upload } from '@element-plus/icons-vue';
import {
  useProductStore,
  PRODUCT_CATEGORIES,
  SPEC_TEMPLATES,
  DEFAULT_PROMOTIONS,
} from '../../stores/products';
import type { ProductItem, ProductSpec } from '../../data/mockProducts';

const productStore = useProductStore();

const searchQuery = ref('');
const categoryFilter = ref('');
const activeDialogTab = ref<'general' | 'specs' | 'media'>('general');
const selectedTemplateKey = ref('');

const brandSuggestions = [
  'Nhân Phúc',
  'ASUS',
  'MSI',
  'Gigabyte',
  'Intel',
  'AMD',
  'Kingston',
  'Corsair',
  'Samsung',
  'Dell',
  'Lenovo',
  'Acer',
  'Apple',
  'Deepcool',
  'Xigmatek',
  'DareU',
  'Logitech',
];

const filteredProducts = computed(() => {
  return productStore.products.filter((p) => {
    const q = searchQuery.value.trim().toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q));
    const matchCat =
      !categoryFilter.value ||
      p.parentCategory === categoryFilter.value ||
      p.category === categoryFilter.value;
    return matchQ && matchCat;
  });
});

const dialogVisible = ref(false);
const isEdit = ref(false);
const editingId = ref<string>('');

interface ProductFormState {
  name: string;
  sku: string;
  category: string;
  parentCategory: string;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  warranty: string;
  stock: number;
  badge: string;
  tier: 'entry' | 'mid' | 'high' | '';
  image: string;
  gallery: string[];
  description: string;
  specs: ProductSpec[];
  promotions: string[];
}

const createEmptyForm = (): ProductFormState => ({
  name: '',
  sku: 'NP-' + String(Math.floor(1000 + Math.random() * 9000)),
  category: 'pc-gaming-mid',
  parentCategory: 'pc-gaming',
  categoryName: 'PC Gaming Trung Cấp',
  brand: 'Nhân Phúc',
  price: 15990000,
  originalPrice: 18500000,
  discount: 14,
  warranty: '36 tháng chính hãng',
  stock: 15,
  badge: 'Bán Chạy',
  tier: 'mid',
  image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
  gallery: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'],
  description:
    'Sản phẩm chính hãng phân phối tại Nhân Phúc Tech, linh kiện tuyển chọn nguyên seal 100%, hỗ trợ trả góp 0% và bảo hành uy tín tận nơi.',
  specs: SPEC_TEMPLATES.pc!.specs.map((s) => ({ ...s })),
  promotions: [...DEFAULT_PROMOTIONS],
});

const form = ref<ProductFormState>(createEmptyForm());

const onCategoryChange = (slug: string) => {
  const found = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (found) {
    form.value.parentCategory = found.parentSlug;
    form.value.categoryName = found.name;
    // Nếu đang tạo mới sản phẩm thì tự động nạp mẫu thông số tương ứng với danh mục
    if (!isEdit.value && SPEC_TEMPLATES[found.specTemplateKey]) {
      form.value.specs = SPEC_TEMPLATES[found.specTemplateKey]!.specs.map((s) => ({ ...s }));
    }
  }
};

const recalcDiscount = () => {
  if (form.value.originalPrice > form.value.price && form.value.originalPrice > 0) {
    form.value.discount = Math.round(
      ((form.value.originalPrice - form.value.price) / form.value.originalPrice) * 100
    );
  } else {
    form.value.discount = 0;
  }
};

const applySpecTemplate = (key: string) => {
  const tpl = SPEC_TEMPLATES[key];
  if (!tpl) return;
  form.value.specs = tpl.specs.map((s) => ({ ...s }));
  selectedTemplateKey.value = '';
  ElMessage.success(`Đã nạp ${tpl.label}!`);
};

const addSpecRow = () => {
  form.value.specs.push({ label: '', value: '' });
};

const removeSpecRow = (idx: number) => {
  form.value.specs.splice(idx, 1);
};

const moveSpecRow = (idx: number, dir: -1 | 1) => {
  const target = idx + dir;
  if (target < 0 || target >= form.value.specs.length) return;
  const list = [...form.value.specs];
  [list[idx], list[target]] = [list[target]!, list[idx]!];
  form.value.specs = list;
};

const handleMainImageUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 800 * 1024) {
    ElMessage.warning('Ảnh quá lớn (> 800KB). Vui lòng chọn ảnh nhẹ hơn hoặc dùng URL ảnh.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const dataUrl = String(reader.result || '');
    form.value.image = dataUrl;
    if (!form.value.gallery.length) {
      form.value.gallery = [dataUrl];
    } else {
      form.value.gallery[0] = dataUrl;
    }
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const openAddDialog = () => {
  isEdit.value = false;
  editingId.value = '';
  activeDialogTab.value = 'general';
  form.value = createEmptyForm();
  dialogVisible.value = true;
};

const openEditDialog = (row: ProductItem) => {
  isEdit.value = true;
  editingId.value = row.id;
  activeDialogTab.value = 'general';
  const catOpt =
    PRODUCT_CATEGORIES.find((c) => c.slug === row.category) ||
    PRODUCT_CATEGORIES.find((c) => c.name.toLowerCase() === String(row.categoryName || '').toLowerCase());

  form.value = {
    name: row.name,
    sku: row.sku,
    category: row.category || catOpt?.slug || 'pc-gaming-mid',
    parentCategory: row.parentCategory || catOpt?.parentSlug || 'pc-gaming',
    categoryName: row.categoryName || catOpt?.name || 'PC Gaming Trung Cấp',
    brand: row.brand,
    price: row.price,
    originalPrice: row.originalPrice || row.price,
    discount: row.discount || 0,
    warranty: row.warranty || '36 tháng chính hãng',
    stock: typeof row.stock === 'number' ? row.stock : 15,
    badge: row.badge || '',
    tier: row.tier || '',
    image: row.image || '',
    gallery: row.gallery && row.gallery.length ? [...row.gallery] : [row.image],
    description: row.description || '',
    specs: row.specs && row.specs.length ? row.specs.map((s) => ({ ...s })) : [],
    promotions: row.promotions && row.promotions.length ? [...row.promotions] : [...DEFAULT_PROMOTIONS],
  };
  dialogVisible.value = true;
};

const saveProduct = () => {
  if (!form.value.name.trim() || !form.value.sku.trim()) {
    ElMessage.warning('Vui lòng nhập Tên sản phẩm và Mã SKU!');
    activeDialogTab.value = 'general';
    return;
  }

  const cleanSpecs = form.value.specs
    .map((s) => ({ label: s.label.trim(), value: s.value.trim() }))
    .filter((s) => s.label || s.value);

  const cleanGallery = form.value.gallery.map((g) => g.trim()).filter(Boolean);
  if (form.value.image.trim() && !cleanGallery.includes(form.value.image.trim())) {
    cleanGallery.unshift(form.value.image.trim());
  }

  const cleanPromos = form.value.promotions.map((p) => p.trim()).filter(Boolean);

  const payload = {
    ...form.value,
    name: form.value.name.trim(),
    sku: form.value.sku.trim(),
    image:
      form.value.image.trim() ||
      cleanGallery[0] ||
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: cleanGallery.length
      ? cleanGallery
      : ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'],
    specs: cleanSpecs,
    promotions: cleanPromos.length ? cleanPromos : [...DEFAULT_PROMOTIONS],
  };

  if (isEdit.value) {
    productStore.updateProduct(editingId.value, payload);
    ElMessage.success('Đã cập nhật đầy đủ thông tin và thông số sản phẩm!');
  } else {
    productStore.addProduct(payload);
    ElMessage.success('Đã thêm sản phẩm mới thành công!');
  }
  dialogVisible.value = false;
};

const handleDelete = async (row: ProductItem) => {
  try {
    await ElMessageBox.confirm(`Xóa sản phẩm “${row.name}” khỏi hệ thống?`, 'Xác nhận xóa', {
      type: 'warning',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });
    productStore.deleteProduct(row.id);
    ElMessage.success('Đã xóa sản phẩm!');
  } catch {
    /* hủy */
  }
};

const handleResetProducts = async () => {
  try {
    await ElMessageBox.confirm(
      'Khôi phục toàn bộ danh sách sản phẩm về dữ liệu mẫu ban đầu?',
      'Khôi phục dữ liệu mẫu',
      { type: 'warning' }
    );
    productStore.resetProducts();
    ElMessage.success('Đã khôi phục danh sách sản phẩm mẫu!');
  } catch {
    /* hủy */
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>
