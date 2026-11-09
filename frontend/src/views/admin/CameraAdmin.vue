<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-800">
          Quản lý Dịch vụ Lắp đặt Camera &amp; Bảng giá Thi công
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
          Chỉnh sửa các gói trọn bộ Camera, bảng giá Camera Wifi / Đầu ghi / Nhân công, nội dung giải pháp và quản lý khách đăng ký khảo sát.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <router-link
          to="/services/camera"
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] hover:bg-emerald-50 text-xs font-bold transition"
        >
          Xem trang Dịch vụ Camera &nearr;
        </router-link>
        <el-button @click="handleReset">Khôi phục mặc định</el-button>
        <el-button type="success" color="#00733c" @click="handleSave">
          💾 Lưu mọi thay đổi
        </el-button>
      </div>
    </div>

    <div class="text-xs text-slate-600 bg-emerald-50/80 border border-emerald-200 px-4 py-2.5 rounded-xl flex flex-wrap items-center justify-between gap-2">
      <span>
        📹 Mọi thay đổi về <strong>Gói trọn bộ, Bảng giá Camera lẻ, Nhân công lắp đặt</strong> và nội dung tại đây sẽ hiển thị tức thì trên trang <strong>/services/camera</strong>.
      </span>
      <span v-if="cameraConfig.updatedAt" class="text-[11px] text-slate-400">
        Cập nhật cuối: <strong>{{ cameraConfig.updatedBy }}</strong> ({{ cameraConfig.updatedAt }})
      </span>
    </div>

    <el-tabs v-model="activeTab" type="border-card" class="rounded-2xl overflow-hidden">
      <!-- TAB 1: CÁC GÓI LẮP ĐẶT CAMERA TRỌN BỘ -->
      <el-tab-pane label="📦 Các Gói Lắp Đặt Trọn Bộ" name="packages">
        <div class="space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 class="text-base font-extrabold text-slate-800">
                Danh sách Gói Lắp Đặt Camera Trọn Bộ ({{ cameraConfig.packages.length }} gói)
              </h3>
              <p class="text-xs text-slate-500">
                Chỉnh sửa tên gói, giá tiền trọn bộ, đơn vị tính và các hạng mục thiết bị/khuyến mãi đi kèm trong từng gói.
              </p>
            </div>
            <el-button type="primary" plain size="small" @click="addNewPackage">
              + Thêm Gói Lắp Đặt Mới
            </el-button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              v-for="(pkg, pIdx) in cameraConfig.packages"
              :key="pkg.id"
              class="rounded-2xl p-5 border-2 space-y-4 bg-white relative"
              :class="pkg.isPopular ? 'border-[#00733c] shadow-md' : 'border-slate-200'"
            >
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <span class="text-xs font-extrabold uppercase text-[#00733c]">
                  Gói #{{ pIdx + 1 }}: {{ pkg.name }}
                </span>
                <div class="flex items-center gap-2">
                  <el-checkbox v-model="pkg.isPopular" size="small">Nổi bật</el-checkbox>
                  <el-button
                    v-if="cameraConfig.packages.length > 1"
                    size="small"
                    type="danger"
                    text
                    @click="removePackage(pIdx)"
                  >
                    Xóa gói
                  </el-button>
                </div>
              </div>

              <el-form label-position="top" size="small">
                <el-form-item label="Tên gói lắp đặt">
                  <el-input v-model="pkg.name" placeholder="VD: Trọn Bộ 4 Camera Có Dây + Đầu Ghi" />
                </el-form-item>

                <div class="grid grid-cols-2 gap-3">
                  <el-form-item label="Giá trọn gói (VNĐ) *">
                    <el-input-number
                      v-model="pkg.price"
                      :min="0"
                      :step="100000"
                      class="!w-full"
                    />
                  </el-form-item>
                  <el-form-item label="Đơn vị / Quy cách">
                    <el-input v-model="pkg.unit" placeholder="/ bộ 4 mắt" />
                  </el-form-item>
                </div>

                <div class="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 text-xs text-[#00733c] font-bold">
                  Hiển thị trên web: {{ formatPrice(pkg.price) }} {{ pkg.unit }}
                </div>

                <el-form-item v-if="pkg.isPopular" label="Nhãn băng rôn nổi bật">
                  <el-input v-model="pkg.popularLabel" placeholder="Được Chọn Nhiều Nhất" />
                </el-form-item>

                <el-form-item label="Mô tả đối tượng công trình phù hợp">
                  <el-input v-model="pkg.description" type="textarea" :rows="2" />
                </el-form-item>

                <el-form-item label="Chữ trên nút Đăng ký (CTA)">
                  <el-input v-model="pkg.ctaText" />
                </el-form-item>

                <div class="mt-2 pt-3 border-t border-slate-100">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-slate-700">Thiết bị &amp; Quyền lợi bao gồm:</span>
                    <button
                      type="button"
                      @click="addFeature(pkg)"
                      class="text-xs font-bold text-[#00733c] hover:underline cursor-pointer"
                    >
                      + Thêm dòng
                    </button>
                  </div>

                  <div class="space-y-2 max-h-60 overflow-y-auto pr-1">
                    <div
                      v-for="(feat, fIdx) in pkg.features"
                      :key="fIdx"
                      class="flex items-center gap-2"
                    >
                      <el-checkbox v-model="feat.included" title="Tích chọn nếu có bao gồm" />
                      <el-input v-model="feat.text" size="small" class="flex-1" />
                      <button
                        type="button"
                        @click="pkg.features.splice(fIdx, 1)"
                        class="text-slate-400 hover:text-red-500 text-xs px-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- TAB 2: BẢNG GIÁ CHI TIẾT CAMERA WIFI / ĐẦU GHI / NHÂN CÔNG -->
      <el-tab-pane label="💰 Bảng Giá Chi Tiết (Camera Wifi / Đầu Ghi / Nhân Công)" name="pricelist">
        <div class="space-y-5">
          <!-- Chọn nhóm bảng giá -->
          <div class="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
            <div class="flex flex-wrap items-center gap-2">
              <span class="text-xs font-bold text-slate-500 mr-1">Nhóm bảng giá:</span>
              <button
                v-for="(cat, cIdx) in cameraConfig.categories"
                :key="cat.value"
                type="button"
                @click="selectedCatIndex = cIdx"
                :class="[
                  'px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer',
                  selectedCatIndex === cIdx
                    ? 'bg-[#00733c] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-[#00733c]',
                ]"
              >
                <span>{{ cat.icon }}</span>
                <span>{{ cat.label }}</span>
                <span class="text-[10px] opacity-80">({{ cat.items.length }})</span>
              </button>
              <el-button size="small" type="primary" plain @click="addCategoryTab">
                + Thêm nhóm bảng giá
              </el-button>
            </div>

            <div v-if="currentCategory" class="flex items-center gap-2">
              <el-input v-model="currentCategory.icon" size="small" style="width: 55px" placeholder="Icon" />
              <el-input v-model="currentCategory.label" size="small" style="width: 220px" placeholder="Tên nhóm" />
              <el-button
                v-if="cameraConfig.categories.length > 1"
                size="small"
                type="danger"
                plain
                @click="removeCategoryTab(selectedCatIndex)"
              >
                Xóa nhóm
              </el-button>
            </div>
          </div>

          <!-- Bảng hạng mục của nhóm đang chọn -->
          <div v-if="currentCategory" class="space-y-3">
            <div class="flex flex-wrap justify-between items-center gap-2">
              <div class="text-sm font-extrabold text-slate-700">
                Danh sách hạng mục thuộc "{{ currentCategory.label }}" ({{ currentCategory.items.length }} dòng)
              </div>
              <el-button type="success" color="#00733c" size="small" @click="addPriceRow">
                + Thêm dòng báo giá mới
              </el-button>
            </div>

            <el-table :data="currentCategory.items" border stripe style="width: 100%">
              <el-table-column label="#" width="50" align="center">
                <template #default="{ $index }">
                  <span class="text-xs font-bold text-slate-400">{{ $index + 1 }}</span>
                </template>
              </el-table-column>

              <el-table-column label="Tên Camera / Bộ thiết bị & Mô tả" min-width="280">
                <template #default="{ row }">
                  <div class="space-y-1.5">
                    <el-input v-model="row.name" size="small" placeholder="Tên mẫu camera hoặc gói dịch vụ..." />
                    <el-input v-model="row.desc" size="small" placeholder="Mô tả chi tiết tính năng, phụ kiện tặng kèm..." />
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="Độ phân giải / Quy cách" width="180">
                <template #default="{ row }">
                  <el-input v-model="row.resolution" size="small" placeholder="VD: 2K 4MP ColorVu" />
                </template>
              </el-table-column>

              <el-table-column label="Bảo hành" width="150">
                <template #default="{ row }">
                  <el-input v-model="row.warranty" size="small" placeholder="VD: 24 tháng tận nơi" />
                </template>
              </el-table-column>

              <el-table-column label="Đơn giá hiển thị" width="180">
                <template #default="{ row }">
                  <el-input v-model="row.price" size="small" placeholder="VD: 890.000 đ" />
                </template>
              </el-table-column>

              <el-table-column label="Thao tác" width="140" align="center" fixed="right">
                <template #default="{ $index }">
                  <div class="flex items-center justify-center gap-1">
                    <el-button
                      size="small"
                      circle
                      :disabled="$index === 0"
                      @click="movePriceRow($index, -1)"
                      title="Lên"
                    >
                      ↑
                    </el-button>
                    <el-button
                      size="small"
                      circle
                      :disabled="$index === currentCategory.items.length - 1"
                      @click="movePriceRow($index, 1)"
                      title="Xuống"
                    >
                      ↓
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      plain
                      @click="removePriceRow($index)"
                    >
                      Xóa
                    </el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>

      <!-- TAB 3: NỘI DUNG BANNER, GIẢI PHÁP & QUY TRÌNH 5 BƯỚC -->
      <el-tab-pane label="📝 Nội Dung Banner, Giải Pháp & Quy Trình" name="content">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Cột trái: Hero Banner + 4 Chỉ số + Tiêu đề các mục -->
          <div class="space-y-4">
            <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5">
              1. Nội dung Banner Đầu Trang (Hero)
            </h3>
            <el-form label-position="top" size="small">
              <el-form-item label="Nhãn nhỏ phía trên (Badge)">
                <el-input v-model="cameraConfig.heroBadge" />
              </el-form-item>
              <el-form-item label="Tiêu đề chính (H1)">
                <el-input v-model="cameraConfig.heroTitle" type="textarea" :rows="2" />
              </el-form-item>
              <el-form-item label="Đoạn mô tả giới thiệu dịch vụ Camera">
                <el-input v-model="cameraConfig.heroDescription" type="textarea" :rows="3" />
              </el-form-item>
              <el-form-item label="Số Hotline Tư vấn & Khảo sát Camera">
                <el-input v-model="cameraConfig.hotline" />
              </el-form-item>
            </el-form>

            <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5 pt-2">
              2. Bốn Chỉ Số Cam Kết Nổi Bật
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(stat, sIdx) in cameraConfig.stats"
                :key="sIdx"
                class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <el-input v-model="stat.value" size="small" placeholder="VD: 24 Tháng" />
                <el-input v-model="stat.label" size="small" placeholder="Mô tả chỉ số" />
              </div>
            </div>

            <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5 pt-2">
              3. Quy Trình 5 Bước Khảo Sát &amp; Thi Công
            </h3>
            <div class="space-y-2.5">
              <div
                v-for="(step, wIdx) in cameraConfig.workflowSteps"
                :key="wIdx"
                class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5"
              >
                <span class="w-6 h-6 rounded-full bg-[#00733c] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-1">
                  {{ wIdx + 1 }}
                </span>
                <div class="flex-1 space-y-1.5">
                  <el-input v-model="step.title" size="small" placeholder="Tên bước" />
                  <el-input v-model="step.desc" size="small" placeholder="Mô tả bước" />
                </div>
              </div>
            </div>
          </div>

          <!-- Cột phải: Giải pháp lắp đặt theo không gian -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5">
                4. Giải Pháp Lắp Đặt Theo Không Gian ({{ cameraConfig.solutions.length }} khối)
              </h3>
              <el-button size="small" type="primary" plain @click="addSolutionCard">
                + Thêm giải pháp
              </el-button>
            </div>

            <div class="space-y-4">
              <div
                v-for="(sol, sIdx) in cameraConfig.solutions"
                :key="sIdx"
                class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2 flex-1">
                    <el-input v-model="sol.icon" size="small" style="width: 60px" placeholder="Icon" />
                    <el-input v-model="sol.title" size="small" placeholder="Tên không gian (VD: Gia đình & Căn hộ)" class="flex-1" />
                  </div>
                  <el-button
                    v-if="cameraConfig.solutions.length > 1"
                    size="small"
                    type="danger"
                    text
                    @click="cameraConfig.solutions.splice(sIdx, 1)"
                  >
                    Xóa
                  </el-button>
                </div>

                <el-input v-model="sol.target" size="small" placeholder="Mục tiêu giám sát chính..." />
                <el-input v-model="sol.description" type="textarea" :rows="2" size="small" placeholder="Mô tả giải pháp..." />

                <div class="space-y-1.5 pt-1">
                  <div class="flex items-center justify-between text-xs font-bold text-slate-600">
                    <span>Điểm nổi bật:</span>
                    <button
                      type="button"
                      @click="sol.highlights.push('Ưu điểm giải pháp mới...')"
                      class="text-[#00733c] hover:underline cursor-pointer"
                    >
                      + Thêm ý
                    </button>
                  </div>
                  <div
                    v-for="(_, hIdx) in sol.highlights"
                    :key="hIdx"
                    class="flex items-center gap-1.5"
                  >
                    <el-input v-model="sol.highlights[hIdx]" size="small" class="flex-1" />
                    <button
                      type="button"
                      @click="sol.highlights.splice(hIdx, 1)"
                      class="text-slate-400 hover:text-red-500 text-xs px-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- TAB 4: DANH SÁCH KHÁCH ĐĂNG KÝ KHẢO SÁT & LẮP ĐẶT CAMERA -->
      <el-tab-pane :label="`📋 Khách Đăng Ký Lắp Đặt (${siteContentStore.cameraLeads.length})`" name="leads">
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-2">
            <p class="text-xs text-slate-500">
              Danh sách khách hàng gửi biểu mẫu đăng ký khảo sát &amp; lắp đặt từ trang <strong>/services/camera</strong>.
            </p>
          </div>

          <el-table :data="siteContentStore.cameraLeads" border stripe style="width: 100%">
            <el-table-column prop="customerName" label="Khách hàng & Địa chỉ" min-width="220">
              <template #default="{ row }">
                <div class="font-bold text-slate-800">{{ row.customerName }}</div>
                <div class="text-xs text-slate-500">📍 {{ row.address }}</div>
              </template>
            </el-table-column>

            <el-table-column prop="phone" label="Số điện thoại" width="135">
              <template #default="{ row }">
                <span class="font-mono font-bold text-[#00733c]">{{ row.phone }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="projectType" label="Loại công trình" width="160">
              <template #default="{ row }">
                <el-tag size="small" type="success">{{ row.projectType }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="cameraCount" label="Số lượng / Gói" width="180">
              <template #default="{ row }">
                <span class="text-xs font-semibold text-slate-700">{{ row.cameraCount }}</span>
              </template>
            </el-table-column>

            <el-table-column prop="notes" label="Yêu cầu chi tiết" min-width="220" />
            <el-table-column prop="createdAt" label="Thời gian" width="145" />

            <el-table-column label="Trạng thái xử lý" width="175" align="center">
              <template #default="{ row }">
                <el-select v-model="row.status" size="small" @change="siteContentStore.saveCameraLeads()">
                  <el-option label="Mới đăng ký" value="NEW" />
                  <el-option label="Đang khảo sát / Báo giá" value="SURVEYING" />
                  <el-option label="Đã lắp đặt hoàn tất" value="INSTALLED" />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="Xóa" width="80" align="center">
              <template #default="{ $index }">
                <el-button
                  size="small"
                  type="danger"
                  text
                  @click="removeLead($index)"
                >
                  Xóa
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useSiteContentStore, type CameraPackageItem } from '../../stores/siteContent';
import { useAuthStore } from '../../stores/auth';

const siteContentStore = useSiteContentStore();
const authStore = useAuthStore();

const activeTab = ref('packages');
const selectedCatIndex = ref(0);

const cameraConfig = computed(() => siteContentStore.cameraService);
const currentCategory = computed(() => cameraConfig.value.categories[selectedCatIndex.value]);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};

const addFeature = (pkg: CameraPackageItem) => {
  pkg.features.push({ text: 'Hạng mục thiết bị / khuyến mãi mới...', included: true });
};

const addNewPackage = () => {
  cameraConfig.value.packages.push({
    id: 'cam-pkg-' + Date.now(),
    name: 'Gói Lắp Đặt Camera Tùy Chỉnh',
    price: 3500000,
    unit: '/ trọn bộ',
    description: 'Mô tả đối tượng gia đình, cửa hàng hoặc văn phòng phù hợp với gói này.',
    isPopular: false,
    ctaText: 'Đăng Ký Gói Này',
    features: [
      { text: 'Camera chính hãng độ phân giải 2K sắc nét', included: true },
      { text: 'Miễn phí nhân công lắp đặt & cài đặt điện thoại', included: true },
      { text: 'Bảo hành tận nơi 24 tháng', included: true },
    ],
  });
};

const removePackage = (index: number) => {
  cameraConfig.value.packages.splice(index, 1);
};

const addCategoryTab = () => {
  const idx = cameraConfig.value.categories.length + 1;
  cameraConfig.value.categories.push({
    value: 'cam-cat-' + Date.now(),
    label: `Nhóm Camera Mới #${idx}`,
    icon: '📷',
    items: [
      {
        id: 'cam-item-' + Date.now(),
        name: 'Hạng mục lắp đặt camera mới',
        desc: 'Mô tả chi tiết thiết bị và phụ kiện đi kèm',
        resolution: '2K 4MP',
        warranty: '24 tháng',
        price: '1.200.000 đ',
      },
    ],
  });
  selectedCatIndex.value = cameraConfig.value.categories.length - 1;
};

const removeCategoryTab = (index: number) => {
  cameraConfig.value.categories.splice(index, 1);
  selectedCatIndex.value = 0;
};

const addPriceRow = () => {
  if (!currentCategory.value) return;
  currentCategory.value.items.push({
    id: 'cam-row-' + Date.now(),
    name: 'Tên mẫu Camera / Gói lắp đặt mới',
    desc: 'Mô tả tính năng, hồng ngoại/có màu ban đêm, phụ kiện kèm theo...',
    resolution: '2K (3MP - 4MP)',
    warranty: '24 tháng',
    price: '990.000 đ',
  });
};

const removePriceRow = (idx: number) => {
  if (!currentCategory.value) return;
  currentCategory.value.items.splice(idx, 1);
};

const movePriceRow = (idx: number, dir: -1 | 1) => {
  if (!currentCategory.value) return;
  const list = currentCategory.value.items;
  const target = idx + dir;
  if (target < 0 || target >= list.length) return;
  [list[idx], list[target]] = [list[target]!, list[idx]!];
};

const addSolutionCard = () => {
  cameraConfig.value.solutions.push({
    icon: '🏢',
    title: 'Giải Pháp Không Gian Mới',
    target: 'Giám sát an ninh 24/7 chất lượng cao',
    description: 'Mô tả chi tiết giải pháp lắp đặt camera cho khu vực này.',
    highlights: [
      'Góc nhìn siêu rộng không điểm mù',
      'Xem trực tiếp từ xa qua Điện thoại & Máy tính',
    ],
  });
};

const removeLead = (idx: number) => {
  siteContentStore.cameraLeads.splice(idx, 1);
  siteContentStore.saveCameraLeads();
  ElMessage.info('Đã xóa yêu cầu khảo sát');
};

const handleSave = () => {
  const staffName = authStore.currentUser?.fullName || 'Quản trị viên';
  siteContentStore.saveCameraService(staffName);
  ElMessage.success('Đã lưu toàn bộ bảng giá và nội dung Dịch vụ Lắp đặt Camera thành công!');
};

const handleReset = () => {
  ElMessageBox.confirm(
    'Bạn có muốn khôi phục bảng giá và nội dung trang Lắp đặt Camera về mặc định ban đầu không?',
    'Xác nhận khôi phục',
    { type: 'warning', confirmButtonText: 'Khôi phục', cancelButtonText: 'Hủy' }
  )
    .then(() => {
      siteContentStore.resetCameraService();
      ElMessage.info('Đã khôi phục nội dung Dịch vụ Camera mặc định');
    })
    .catch(() => {});
};
</script>

