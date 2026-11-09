<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-800">
          🛠️ Quản lý Dịch vụ Sửa chữa, Bảng giá &amp; Phiếu Kỹ thuật
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
          Chỉnh sửa bảng giá sửa chữa Laptop / PC / Điện thoại theo thời điểm, nội dung trang dịch vụ và quản lý phiếu tiếp nhận kỹ thuật.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <router-link
          to="/services/repair"
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] text-xs font-bold hover:bg-emerald-50 transition inline-flex items-center gap-1"
        >
          Xem Trang Dịch Vụ Sửa Chữa &nearr;
        </router-link>
      </div>
    </div>

    <el-tabs v-model="activeMainTab" type="border-card" class="rounded-2xl overflow-hidden border-slate-200">
      <!-- ==================== TAB 1: BẢNG GIÁ DỊCH VỤ SỬA CHỮA ==================== -->
      <el-tab-pane name="pricing" label="💰 Bảng giá Dịch vụ Sửa chữa (Laptop / PC / Điện thoại)">
        <div class="space-y-5">
          <!-- Thanh công cụ lưu & chọn nhóm thiết bị -->
          <div class="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="text-sm font-extrabold text-[#014f2b]">
                Cập nhật Bảng giá Sửa chữa &amp; Nâng cấp theo thời điểm
              </div>
              <p class="text-xs text-slate-600">
                Cập nhật lần cuối: <strong>{{ repairConfig.updatedAt || 'Mới' }}</strong> bởi
                <strong>{{ repairConfig.updatedBy || 'Quản trị viên' }}</strong>
              </p>
            </div>
            <div class="flex flex-wrap gap-2">
              <el-button size="small" @click="handleResetRepair">Khôi phục bảng giá mặc định</el-button>
              <el-button size="small" type="primary" plain :icon="Plus" @click="openAddCategoryDialog">
                + Thêm nhóm thiết bị
              </el-button>
              <el-button size="small" type="success" color="#00733c" @click="saveRepairAll">
                💾 Lưu toàn bộ thay đổi
              </el-button>
            </div>
          </div>

          <!-- Chọn Tab nhóm thiết bị (Laptop / PC / Điện thoại...) -->
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex flex-wrap gap-2">
              <button
                v-for="(cat, cIdx) in repairConfig.categories"
                :key="cat.value"
                type="button"
                @click="selectedCatIndex = cIdx"
                :class="[
                  'px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer',
                  selectedCatIndex === cIdx
                    ? 'bg-[#00733c] text-white border-[#00733c] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#00733c]'
                ]"
              >
                <span>{{ cat.icon }}</span>
                <span>{{ cat.label }}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-black/15">
                  {{ cat.items.length }}
                </span>
              </button>
            </div>

            <div v-if="currentCategory" class="flex flex-wrap gap-2">
              <el-button size="small" :icon="Edit" @click="openEditCategoryDialog">
                Đổi tên nhóm "{{ currentCategory.label }}"
              </el-button>
              <el-button
                v-if="repairConfig.categories.length > 1"
                size="small"
                type="danger"
                plain
                :icon="Delete"
                @click="deleteCurrentCategory"
              >
                Xóa nhóm
              </el-button>
              <el-button size="small" type="success" color="#00733c" :icon="Plus" @click="openAddPriceItem">
                + Thêm hạng mục sửa chữa
              </el-button>
            </div>
          </div>

          <!-- Bảng các hạng mục sửa chữa của nhóm đang chọn -->
          <div v-if="currentCategory">
            <el-table :data="currentCategory.items" border stripe style="width: 100%">
              <el-table-column type="index" label="#" width="50" align="center" />

              <el-table-column label="Hạng mục sửa chữa / Nâng cấp" min-width="280">
                <template #default="{ row }">
                  <div class="font-bold text-slate-800 text-sm">{{ row.name }}</div>
                  <div class="text-xs text-slate-500 mt-0.5">{{ row.desc }}</div>
                </template>
              </el-table-column>

              <el-table-column prop="time" label="Thời gian xử lý" width="145" />

              <el-table-column prop="warranty" label="Bảo hành" width="150">
                <template #default="{ row }">
                  <el-tag size="small" type="success" effect="plain">{{ row.warranty }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column prop="price" label="Chi phí niêm yết" width="165">
                <template #default="{ row }">
                  <span class="font-extrabold text-red-600 text-sm">{{ row.price }}</span>
                </template>
              </el-table-column>

              <el-table-column label="Thao tác" width="210" align="right">
                <template #default="{ row, $index }">
                  <div class="flex items-center justify-end gap-1">
                    <el-button
                      size="small"
                      :icon="ArrowUp"
                      circle
                      :disabled="$index === 0"
                      @click="movePriceItem($index, -1)"
                      title="Lên trên"
                    />
                    <el-button
                      size="small"
                      :icon="ArrowDown"
                      circle
                      :disabled="$index === currentCategory.items.length - 1"
                      @click="movePriceItem($index, 1)"
                      title="Xuống dưới"
                    />
                    <el-button size="small" type="primary" :icon="Edit" @click="openEditPriceItem(row, $index)">
                      Sửa giá
                    </el-button>
                    <el-button
                      size="small"
                      type="danger"
                      plain
                      :icon="Delete"
                      @click="removePriceItem($index)"
                    />
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>

      <!-- ==================== TAB 2: PHIẾU SỬA CHỮA & ĐẶT LỊCH ==================== -->
      <el-tab-pane name="tickets" :label="`🛠️ Phiếu Kỹ thuật & Đặt lịch (${tickets.length})`">
        <div class="space-y-4">
          <div class="flex flex-wrap justify-between items-center gap-3">
            <p class="text-xs text-slate-500">
              Danh sách phiếu sửa chữa, bảo hành và lịch hẹn khách đặt trực tiếp từ trang Dịch vụ Sửa chữa. Khách hàng có thể tra cứu tiến độ bằng SĐT hoặc Mã phiếu.
            </p>
            <el-button type="success" color="#00733c" size="small" :icon="Plus" @click="openNewTicket">
              + Tiếp nhận Phiếu Kỹ Thuật mới
            </el-button>
          </div>

          <el-table :data="tickets" border stripe style="width: 100%">
            <el-table-column prop="ticketCode" label="Mã Phiếu" width="135">
              <template #default="{ row }">
                <span class="font-mono font-bold text-[#00733c] text-xs">{{ row.ticketCode }}</span>
              </template>
            </el-table-column>

            <el-table-column label="Khách hàng / SĐT" min-width="180">
              <template #default="{ row }">
                <div class="font-bold text-slate-800 text-xs sm:text-sm">{{ row.customer }}</div>
                <div class="text-xs text-slate-500">{{ row.phone }}</div>
              </template>
            </el-table-column>

            <el-table-column prop="serviceType" label="Loại dịch vụ" width="175">
              <template #default="{ row }">
                <el-tag :type="row.serviceType === 'IT Outsourcing' ? 'warning' : 'primary'" size="small">
                  {{ row.serviceType }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column prop="deviceInfo" label="Thiết bị & Tình trạng kỹ thuật" min-width="240" />

            <el-table-column prop="technician" label="Kỹ thuật phụ trách" width="145" />

            <el-table-column label="Chi phí dự kiến" width="145">
              <template #default="{ row }">
                <span class="font-bold text-red-600 text-xs sm:text-sm">
                  {{ row.fee === 0 ? 'Miễn phí / BH (0đ)' : formatPrice(row.fee) }}
                </span>
              </template>
            </el-table-column>

            <el-table-column label="Trạng thái xử lý" width="180" align="center">
              <template #default="{ row }">
                <el-select v-model="row.status" size="small" @change="saveTickets">
                  <el-option label="Mới tiếp nhận" value="RECEIVED" />
                  <el-option label="Đang kiểm tra / sửa" value="REPAIRING" />
                  <el-option label="Chờ linh kiện hãng" value="WAITING_PARTS" />
                  <el-option label="Đã xong - Chờ trả máy" value="READY" />
                  <el-option label="Đã bàn giao" value="DONE" />
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="Thao tác" width="130" align="right">
              <template #default="{ row, $index }">
                <el-button size="small" :icon="Edit" @click="openEditTicket(row, $index)" />
                <el-button size="small" type="danger" plain :icon="Delete" @click="deleteTicket($index)" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <!-- ==================== TAB 3: NỘI DUNG TRANG SỬA CHỮA ==================== -->
      <el-tab-pane name="content" label="📝 Nội dung Banner, Cam kết &amp; Quy trình 5 bước">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-extrabold text-slate-800">
              Chỉnh sửa Nội dung Trang Dịch Vụ Sửa Chữa
            </h3>
            <el-button type="success" color="#00733c" size="small" @click="saveRepairAll">
              💾 Lưu nội dung trang Sửa chữa
            </el-button>
          </div>

          <!-- Khối Hero Banner -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="text-xs font-extrabold text-[#00733c] uppercase">1. Banner Đầu Trang (Hero)</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nhãn phụ (Badge)</label>
                <el-input v-model="repairConfig.heroBadge" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề chính</label>
                <el-input v-model="repairConfig.heroTitle" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Hotline Kỹ thuật</label>
                <el-input v-model="repairConfig.hotline" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Mô tả chi tiết dưới tiêu đề</label>
              <el-input v-model="repairConfig.heroDescription" type="textarea" :rows="2" />
            </div>
          </div>

          <!-- Tiêu đề khu vực bảng giá -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="text-xs font-extrabold text-[#00733c] uppercase">2. Tiêu đề Khu vực Bảng Giá</div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nhãn nhỏ phía trên</label>
                <el-input v-model="repairConfig.priceSectionSubtitle" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề bảng giá</label>
                <el-input v-model="repairConfig.priceSectionTitle" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Ghi chú dưới tiêu đề</label>
                <el-input v-model="repairConfig.priceSectionDesc" />
              </div>
            </div>
          </div>

          <!-- 4 Cam kết dịch vụ -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="text-xs font-extrabold text-[#00733c] uppercase">3. Bốn Cam Kết Dịch Vụ</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div
                v-for="(c, idx) in repairConfig.commitments"
                :key="idx"
                class="bg-white p-3 rounded-xl border border-slate-200 space-y-2"
              >
                <div class="grid grid-cols-4 gap-2">
                  <div>
                    <label class="block text-[11px] text-slate-500">Icon</label>
                    <el-input v-model="c.icon" size="small" />
                  </div>
                  <div class="col-span-3">
                    <label class="block text-[11px] text-slate-500">Tiêu đề cam kết</label>
                    <el-input v-model="c.title" size="small" />
                  </div>
                </div>
                <div>
                  <label class="block text-[11px] text-slate-500">Mô tả</label>
                  <el-input v-model="c.desc" size="small" />
                </div>
              </div>
            </div>
          </div>

          <!-- Quy trình 5 bước -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div class="text-xs font-extrabold text-[#00733c] uppercase">4. Quy Trình 5 Bước Sửa Chữa Minh Bạch</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nhãn phụ</label>
                <el-input v-model="repairConfig.workflowSubtitle" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề quy trình</label>
                <el-input v-model="repairConfig.workflowTitle" />
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div
                v-for="(step, sIdx) in repairConfig.workflowSteps"
                :key="sIdx"
                class="bg-white p-3 rounded-xl border border-slate-200 space-y-2"
              >
                <div class="text-xs font-bold text-[#00733c]">Bước {{ sIdx + 1 }}</div>
                <el-input v-model="step.title" size="small" placeholder="Tên bước" />
                <el-input v-model="step.desc" type="textarea" :rows="2" size="small" placeholder="Mô tả bước" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- Dialog Thêm / Sửa Hạng mục Bảng giá Sửa chữa -->
    <el-dialog
      v-model="priceItemDialogVisible"
      :title="editingPriceItemIdx !== null ? 'Chỉnh sửa Hạng mục & Giá Sửa chữa' : 'Thêm Hạng mục Sửa chữa mới'"
      width="560px"
    >
      <el-form label-position="top">
        <el-form-item label="Tên hạng mục sửa chữa / nâng cấp *">
          <el-input
            v-model="priceItemForm.name"
            placeholder="VD: Vệ sinh Laptop & Tra keo tản nhiệt gốm cao cấp"
          />
        </el-form-item>
        <el-form-item label="Mô tả chi tiết công việc">
          <el-input
            v-model="priceItemForm.desc"
            type="textarea"
            :rows="2"
            placeholder="VD: Thổi sạch bụi bẩn, tra keo tản nhiệt giảm 10-15 độ C"
          />
        </el-form-item>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <el-form-item label="Chi phí niêm yết *">
            <el-input
              v-model="priceItemForm.price"
              placeholder="VD: 150.000 đ hoặc Từ 350.000 đ"
            />
          </el-form-item>
          <el-form-item label="Thời gian xử lý">
            <el-input v-model="priceItemForm.time" placeholder="VD: 30 - 45 phút" />
          </el-form-item>
          <el-form-item label="Thời gian bảo hành">
            <el-input v-model="priceItemForm.warranty" placeholder="VD: 12 tháng" />
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="priceItemDialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="savePriceItem">Lưu hạng mục</el-button>
      </template>
    </el-dialog>

    <!-- Dialog Thêm / Sửa Nhóm thiết bị (Tab) -->
    <el-dialog
      v-model="catDialogVisible"
      :title="isEditingCat ? 'Đổi tên Nhóm thiết bị sửa chữa' : 'Thêm Nhóm thiết bị sửa chữa mới'"
      width="440px"
    >
      <el-form label-position="top">
        <el-form-item label="Tên nhóm thiết bị *">
          <el-input v-model="catForm.label" placeholder="VD: Sửa Chữa MacBook / Máy In" />
        </el-form-item>
        <el-form-item label="Biểu tượng (Emoji)">
          <el-input v-model="catForm.icon" placeholder="💻, 🖥️, 📱, 🖨️..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="catDialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="saveCategoryTab">Lưu nhóm</el-button>
      </template>
    </el-dialog>

    <!-- Dialog Tạo / Sửa Phiếu kỹ thuật -->
    <el-dialog
      v-model="ticketDialogVisible"
      :title="editingTicketIdx !== null ? 'Cập nhật Phiếu Kỹ Thuật' : 'Tiếp nhận Phiếu Sửa chữa / Bảo hành / IT'"
      width="540px"
    >
      <el-form label-position="top">
        <el-form-item label="Tên khách hàng / Công ty *">
          <el-input v-model="ticketForm.customer" placeholder="Nhập họ tên khách hoặc tên doanh nghiệp..." />
        </el-form-item>
        <el-form-item label="Số điện thoại *">
          <el-input v-model="ticketForm.phone" placeholder="Ví dụ: 0908123456" />
        </el-form-item>
        <el-form-item label="Loại dịch vụ">
          <el-select v-model="ticketForm.serviceType" class="w-full" allow-create filterable default-first-option>
            <el-option label="Sửa chữa Laptop / PC" value="Sửa chữa Laptop / PC" />
            <el-option label="Bảo hành chính hãng" value="Bảo hành chính hãng" />
            <el-option label="Vệ sinh & Nâng cấp phần cứng" value="Vệ sinh & Nâng cấp" />
            <el-option label="IT Outsourcing Doanh nghiệp" value="IT Outsourcing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Thiết bị & Mô tả lỗi *">
          <el-input
            v-model="ticketForm.deviceInfo"
            type="textarea"
            :rows="3"
            placeholder="Ví dụ: Laptop Dell Gaming G15 - Quá nhiệt, vệ sinh tra keo MX-6 & nâng cấp SSD 1TB"
          />
        </el-form-item>
        <div class="grid grid-cols-2 gap-4">
          <el-form-item label="Kỹ thuật viên phụ trách">
            <el-input v-model="ticketForm.technician" placeholder="Phạm Quốc Cường" />
          </el-form-item>
          <el-form-item label="Chi phí dự kiến (VNĐ)">
            <el-input-number v-model="ticketForm.fee" :min="0" :step="50000" class="w-full" />
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="ticketDialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="saveTicketForm">Lưu phiếu</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import { useSiteContentStore, type RepairPriceRow } from '../../stores/siteContent';
import { useAuthStore } from '../../stores/auth';

const siteContentStore = useSiteContentStore();
const authStore = useAuthStore();

const activeMainTab = ref<'pricing' | 'tickets' | 'content'>('pricing');
const selectedCatIndex = ref(0);

const repairConfig = computed(() => siteContentStore.repairService);
const currentCategory = computed(() => repairConfig.value.categories[selectedCatIndex.value]);

// ==================== BẢNG GIÁ SỬA CHỮA ====================
const priceItemDialogVisible = ref(false);
const editingPriceItemIdx = ref<number | null>(null);
const priceItemForm = reactive<RepairPriceRow>({
  id: '',
  name: '',
  desc: '',
  time: '30 - 45 phút',
  warranty: '6 - 12 tháng',
  price: '150.000 đ',
});

const openAddPriceItem = () => {
  editingPriceItemIdx.value = null;
  Object.assign(priceItemForm, {
    id: 'rp-' + Date.now(),
    name: '',
    desc: '',
    time: '30 - 45 phút',
    warranty: '6 - 12 tháng',
    price: 'Từ 200.000 đ',
  });
  priceItemDialogVisible.value = true;
};

const openEditPriceItem = (row: RepairPriceRow, idx: number) => {
  editingPriceItemIdx.value = idx;
  Object.assign(priceItemForm, { ...row });
  priceItemDialogVisible.value = true;
};

const savePriceItem = () => {
  if (!priceItemForm.name.trim() || !priceItemForm.price.trim()) {
    ElMessage.warning('Vui lòng nhập tên hạng mục sửa chữa và chi phí!');
    return;
  }
  const cat = currentCategory.value;
  if (!cat) return;

  const payload: RepairPriceRow = {
    id: priceItemForm.id || 'rp-' + Date.now(),
    name: priceItemForm.name.trim(),
    desc: priceItemForm.desc.trim(),
    time: priceItemForm.time.trim() || '30 phút',
    warranty: priceItemForm.warranty.trim() || '6 tháng',
    price: priceItemForm.price.trim(),
  };

  if (editingPriceItemIdx.value !== null) {
    cat.items[editingPriceItemIdx.value] = payload;
  } else {
    cat.items.push(payload);
  }
  siteContentStore.saveRepairService(authStore.currentUser?.fullName || 'Quản trị viên');
  priceItemDialogVisible.value = false;
  ElMessage.success('Đã lưu hạng mục bảng giá sửa chữa!');
};

const removePriceItem = (idx: number) => {
  const cat = currentCategory.value;
  if (!cat) return;
  cat.items.splice(idx, 1);
  siteContentStore.saveRepairService(authStore.currentUser?.fullName || 'Quản trị viên');
  ElMessage.success('Đã xóa hạng mục khỏi bảng giá!');
};

const movePriceItem = (idx: number, dir: -1 | 1) => {
  const cat = currentCategory.value;
  if (!cat) return;
  const target = idx + dir;
  if (target < 0 || target >= cat.items.length) return;
  const list = [...cat.items];
  [list[idx], list[target]] = [list[target]!, list[idx]!];
  cat.items = list;
  siteContentStore.saveRepairService(authStore.currentUser?.fullName || 'Quản trị viên');
};

// Nhóm thiết bị (Category Tabs)
const catDialogVisible = ref(false);
const isEditingCat = ref(false);
const catForm = reactive({
  label: '',
  icon: '🛠️',
});

const openAddCategoryDialog = () => {
  isEditingCat.value = false;
  catForm.label = '';
  catForm.icon = '🛠️';
  catDialogVisible.value = true;
};

const openEditCategoryDialog = () => {
  if (!currentCategory.value) return;
  isEditingCat.value = true;
  catForm.label = currentCategory.value.label;
  catForm.icon = currentCategory.value.icon;
  catDialogVisible.value = true;
};

const saveCategoryTab = () => {
  if (!catForm.label.trim()) {
    ElMessage.warning('Vui lòng nhập tên nhóm thiết bị!');
    return;
  }
  if (isEditingCat.value && currentCategory.value) {
    currentCategory.value.label = catForm.label.trim();
    currentCategory.value.icon = catForm.icon.trim() || '🛠️';
  } else {
    repairConfig.value.categories.push({
      value: 'cat-' + Date.now(),
      label: catForm.label.trim(),
      icon: catForm.icon.trim() || '🛠️',
      items: [],
    });
    selectedCatIndex.value = repairConfig.value.categories.length - 1;
  }
  siteContentStore.saveRepairService(authStore.currentUser?.fullName || 'Quản trị viên');
  catDialogVisible.value = false;
  ElMessage.success('Đã lưu nhóm thiết bị sửa chữa!');
};

const deleteCurrentCategory = async () => {
  if (!currentCategory.value || repairConfig.value.categories.length <= 1) return;
  try {
    await ElMessageBox.confirm(
      `Xóa nhóm "${currentCategory.value.label}" và toàn bộ các hạng mục bên trong?`,
      'Xác nhận xóa',
      { type: 'warning' }
    );
    repairConfig.value.categories.splice(selectedCatIndex.value, 1);
    selectedCatIndex.value = 0;
    siteContentStore.saveRepairService(authStore.currentUser?.fullName || 'Quản trị viên');
    ElMessage.success('Đã xóa nhóm thiết bị!');
  } catch {
    /* hủy */
  }
};

const saveRepairAll = () => {
  siteContentStore.saveRepairService(authStore.currentUser?.fullName || 'Quản trị viên');
  ElMessage.success('Đã lưu toàn bộ bảng giá & nội dung Dịch vụ Sửa chữa!');
};

const handleResetRepair = async () => {
  try {
    await ElMessageBox.confirm(
      'Khôi phục bảng giá và nội dung trang Dịch vụ Sửa chữa về mặc định ban đầu?',
      'Khôi phục mặc định',
      { type: 'warning' }
    );
    siteContentStore.resetRepairService();
    selectedCatIndex.value = 0;
    ElMessage.success('Đã khôi phục bảng giá sửa chữa mặc định!');
  } catch {
    /* hủy */
  }
};

// ==================== PHIẾU KỸ THUẬT (TICKETS) ====================
interface ServiceTicket {
  ticketCode: string;
  customer: string;
  phone: string;
  serviceType: string;
  deviceInfo: string;
  technician: string;
  fee: number;
  status: string;
}

const STORAGE_KEY = 'nhanphuc_admin_tickets';

const defaultTickets: ServiceTicket[] = [
  {
    ticketCode: 'NP-2026-019',
    customer: 'Phạm Văn Kiên',
    phone: '0903112244',
    serviceType: 'Sửa chữa Laptop / PC',
    deviceInfo: 'Laptop ASUS ROG Strix G15 - Thay quạt tản nhiệt CPU + Vệ sinh keo tản nhiệt',
    technician: 'Phạm Quốc Cường',
    fee: 650000,
    status: 'REPAIRING',
  },
  {
    ticketCode: 'NP-2026-018',
    customer: 'Công ty Cổ phần Logistics Á Châu (25 máy)',
    phone: '02838991122',
    serviceType: 'IT Outsourcing',
    deviceInfo: 'Bảo trì định kỳ tháng 11/2026: Kiểm tra hệ thống Firewall, NAS Synology & 25 PC văn phòng',
    technician: 'Phạm Quốc Cường',
    fee: 4500000,
    status: 'RECEIVED',
  },
  {
    ticketCode: 'NP-2026-015',
    customer: 'Hoàng Minh Tuấn',
    phone: '0978990011',
    serviceType: 'Bảo hành chính hãng',
    deviceInfo: 'VGA MSI RTX 4060 Ventus 2X (SN: 602-V516) - Kiểm tra cổng DisplayPort',
    technician: 'Phạm Quốc Cường',
    fee: 0,
    status: 'READY',
  },
];

const loadTickets = (): ServiceTicket[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTickets));
  return defaultTickets;
};

const tickets = ref<ServiceTicket[]>(loadTickets());
const ticketDialogVisible = ref(false);
const editingTicketIdx = ref<number | null>(null);

const ticketForm = ref({
  customer: '',
  phone: '',
  serviceType: 'Sửa chữa Laptop / PC',
  deviceInfo: '',
  technician: 'Phạm Quốc Cường',
  fee: 250000,
});

const saveTickets = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value));
  ElMessage.success('Đã cập nhật phiếu dịch vụ!');
};

const openNewTicket = () => {
  editingTicketIdx.value = null;
  ticketForm.value = {
    customer: '',
    phone: '',
    serviceType: 'Sửa chữa Laptop / PC',
    deviceInfo: '',
    technician: 'Phạm Quốc Cường',
    fee: 250000,
  };
  ticketDialogVisible.value = true;
};

const openEditTicket = (row: ServiceTicket, idx: number) => {
  editingTicketIdx.value = idx;
  ticketForm.value = {
    customer: row.customer,
    phone: row.phone,
    serviceType: row.serviceType,
    deviceInfo: row.deviceInfo,
    technician: row.technician,
    fee: row.fee,
  };
  ticketDialogVisible.value = true;
};

const saveTicketForm = () => {
  if (!ticketForm.value.customer.trim() || !ticketForm.value.phone.trim() || !ticketForm.value.deviceInfo.trim()) {
    ElMessage.warning('Vui lòng nhập đầy đủ khách hàng, số điện thoại và thông tin thiết bị!');
    return;
  }
  if (editingTicketIdx.value !== null && tickets.value[editingTicketIdx.value]) {
    tickets.value[editingTicketIdx.value] = {
      ...tickets.value[editingTicketIdx.value]!,
      ...ticketForm.value,
    };
  } else {
    const code = 'NP-2026-' + String(Math.floor(100 + Math.random() * 900));
    tickets.value.unshift({
      ticketCode: code,
      ...ticketForm.value,
      status: 'RECEIVED',
    });
  }
  saveTickets();
  ticketDialogVisible.value = false;
};

const deleteTicket = (idx: number) => {
  tickets.value.splice(idx, 1);
  saveTickets();
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>
