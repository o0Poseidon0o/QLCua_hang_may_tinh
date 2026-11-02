<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">
          Quản lý Trang Dịch vụ IT Outsourcing & Bảng Giá
        </h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Cập nhật giá các gói dịch vụ bảo trì IT doanh nghiệp, quyền lợi từng gói, nội dung giới thiệu và danh sách khách đăng ký khảo sát.
        </p>
      </div>
      <div class="flex items-center gap-2.5">
        <router-link
          to="/services/it-outsourcing"
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] hover:bg-emerald-50 text-xs font-bold transition"
        >
          Xem trang thực tế &nearr;
        </router-link>
        <el-button @click="handleReset">Khôi phục mặc định</el-button>
        <el-button type="success" color="#00733c" @click="handleSave">
          Lưu mọi thay đổi
        </el-button>
      </div>
    </div>

    <div class="text-xs text-slate-500 bg-emerald-50/70 border border-emerald-200 px-4 py-2.5 rounded-xl flex items-center justify-between">
      <span>
        💡 Mọi thay đổi về <strong>Giá gói dịch vụ (VNĐ/tháng)</strong> và nội dung tại đây sẽ hiển thị ngay lập tức trên trang <strong>/services/it-outsourcing</strong>.
      </span>
      <span v-if="itConfig.updatedAt" class="text-[11px] text-slate-400">
        Cập nhật cuối: <strong>{{ itConfig.updatedBy }}</strong> ({{ itConfig.updatedAt }})
      </span>
    </div>

    <el-tabs v-model="activeTab" type="border-card" class="rounded-2xl overflow-hidden">
      <!-- TAB 1: BẢNG GIÁ CÁC GÓI DỊCH VỤ IT OUTSOURCING -->
      <el-tab-pane label="💰 Bảng Giá Các Gói Dịch Vụ (Quan trọng)" name="pricing">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-extrabold text-slate-800">
                Danh sách Gói cước IT Outsourcing ({{ itConfig.packages.length }} gói)
              </h3>
              <p class="text-xs text-slate-500">
                Nhân sự được phân công có thể điều chỉnh giá tiền, mô tả quy mô máy và danh sách các hạng mục hỗ trợ trong từng gói.
              </p>
            </div>
            <el-button type="primary" plain size="small" @click="addNewPackage">
              + Thêm Gói Dịch Vụ Mới
            </el-button>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              v-for="(pkg, pIdx) in itConfig.packages"
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
                    v-if="itConfig.packages.length > 1"
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
                <el-form-item label="Tên gói dịch vụ">
                  <el-input v-model="pkg.name" placeholder="Ví dụ: Doanh Nghiệp Tiêu Chuẩn" />
                </el-form-item>

                <div class="grid grid-cols-2 gap-3">
                  <el-form-item label="Giá gói (VNĐ / tháng) *">
                    <el-input-number
                      v-model="pkg.price"
                      :min="0"
                      :step="100000"
                      class="!w-full"
                    />
                  </el-form-item>
                  <el-form-item label="Đơn vị / Quy mô máy">
                    <el-input v-model="pkg.unit" placeholder="/ tháng (10 - 25 máy)" />
                  </el-form-item>
                </div>

                <div class="mb-3 px-3 py-1.5 rounded-lg bg-emerald-50 text-xs text-[#00733c] font-bold">
                  Hiển thị trên web: {{ formatPrice(pkg.price) }} {{ pkg.unit }}
                </div>

                <el-form-item label="Mô tả đối tượng phù hợp">
                  <el-input v-model="pkg.description" type="textarea" :rows="2" />
                </el-form-item>

                <el-form-item label="Chữ trên nút Đăng ký (CTA)">
                  <el-input v-model="pkg.ctaText" />
                </el-form-item>

                <!-- Danh sách quyền lợi trong gói -->
                <div class="mt-2 pt-3 border-t border-slate-100">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-bold text-slate-700">Quyền lợi & Hạng mục trong gói:</span>
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
                      <el-checkbox v-model="feat.included" title="Tích chọn nếu có bao gồm trong gói" />
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

      <!-- TAB 2: NỘI DUNG BANNER, CHỈ SỐ & HẠNG MỤC CÔNG VIỆC -->
      <el-tab-pane label="📝 Nội dung Banner & Hạng mục IT" name="content">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5">
              1. Nội dung Banner Đầu Trang (Hero)
            </h3>
            <el-form label-position="top">
              <el-form-item label="Nhãn nhỏ phía trên (Badge)">
                <el-input v-model="itConfig.heroBadge" />
              </el-form-item>
              <el-form-item label="Tiêu đề chính (H1)">
                <el-input v-model="itConfig.heroTitle" type="textarea" :rows="2" />
              </el-form-item>
              <el-form-item label="Đoạn mô tả giới thiệu dịch vụ">
                <el-input v-model="itConfig.heroDescription" type="textarea" :rows="3" />
              </el-form-item>
              <el-form-item label="Số Hotline Tư vấn Doanh nghiệp">
                <el-input v-model="itConfig.hotline" />
              </el-form-item>
            </el-form>

            <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5 pt-2">
              2. Bốn Chỉ Số Cam Kết Nổi Bật (SLA)
            </h3>
            <div class="grid grid-cols-2 gap-3">
              <div
                v-for="(stat, sIdx) in itConfig.stats"
                :key="sIdx"
                class="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <el-input v-model="stat.value" size="small" placeholder="Ví dụ: 15 Phút" />
                <el-input v-model="stat.label" size="small" placeholder="Mô tả chỉ số" />
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="text-sm font-extrabold uppercase text-slate-700 border-l-4 border-[#00733c] pl-2.5">
              3. Hạng Mục Công Việc Phòng IT Đảm Nhận
            </h3>
            <el-form label-position="top">
              <el-form-item label="Tiêu đề khu vực hạng mục">
                <el-input v-model="itConfig.tasksTitle" />
              </el-form-item>
            </el-form>

            <div class="space-y-3">
              <div
                v-for="(task, tIdx) in itConfig.tasks"
                :key="tIdx"
                class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
              >
                <div class="flex items-center gap-2">
                  <el-input v-model="task.icon" style="width: 70px" placeholder="Icon" />
                  <el-input v-model="task.title" placeholder="Tên hạng mục công việc" class="flex-1" />
                </div>
                <el-input v-model="task.description" type="textarea" :rows="2" placeholder="Mô tả chi tiết..." />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- TAB 3: DANH SÁCH KHÁCH HÀNG ĐĂNG KÝ KHẢO SÁT IT -->
      <el-tab-pane :label="`📋 Yêu cầu Khảo sát (${siteContentStore.surveyLeads.length})`" name="leads">
        <el-table :data="siteContentStore.surveyLeads" border stripe style="width: 100%">
          <el-table-column prop="company" label="Doanh nghiệp" min-width="200">
            <template #default="{ row }">
              <div class="font-bold text-slate-800">{{ row.company }}</div>
              <div class="text-xs text-slate-400">{{ row.address }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="contactPerson" label="Người liên hệ" width="170" />
          <el-table-column prop="phone" label="Điện thoại" width="130" />
          <el-table-column prop="computerCount" label="Quy mô máy" width="150">
            <template #default="{ row }">
              <el-tag size="small" type="info">{{ row.computerCount }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="notes" label="Yêu cầu cụ thể" min-width="220" />
          <el-table-column prop="createdAt" label="Thời gian gửi" width="150" />
          <el-table-column label="Trạng thái" width="160" align="center">
            <template #default="{ row }">
              <el-select v-model="row.status" size="small" @change="siteContentStore.saveSurveyLeads()">
                <el-option label="Mới gửi yêu cầu" value="NEW" />
                <el-option label="Đã liên hệ tư vấn" value="CONTACTED" />
                <el-option label="Đã gửi báo giá" value="QUOTED" />
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useSiteContentStore, type ITPackageItem } from '../../stores/siteContent';
import { useAuthStore } from '../../stores/auth';

const siteContentStore = useSiteContentStore();
const authStore = useAuthStore();

const activeTab = ref('pricing');
const itConfig = computed(() => siteContentStore.itOutsourcing);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};

const addFeature = (pkg: ITPackageItem) => {
  pkg.features.push({ text: 'Hạng mục hỗ trợ mới...', included: true });
};

const addNewPackage = () => {
  itConfig.value.packages.push({
    id: 'pkg-' + Date.now(),
    name: 'Gói Tùy Chỉnh Mới',
    price: 5000000,
    unit: '/ tháng',
    description: 'Mô tả quy mô doanh nghiệp phù hợp với gói dịch vụ này.',
    isPopular: false,
    ctaText: 'Đăng Ký Gói Này',
    features: [
      { text: 'Hỗ trợ kỹ thuật từ xa 24/7', included: true },
      { text: 'Bảo trì định kỳ tận nơi', included: true },
    ],
  });
};

const removePackage = (index: number) => {
  itConfig.value.packages.splice(index, 1);
};

const handleSave = () => {
  const staffName = authStore.currentUser?.fullName || 'Quản trị viên';
  siteContentStore.saveITOutsourcing(staffName);
  ElMessage.success('Đã lưu bảng giá và nội dung trang IT Outsourcing thành công!');
};

const handleReset = () => {
  ElMessageBox.confirm(
    'Bạn có muốn khôi phục bảng giá và nội dung IT Outsourcing về mặc định ban đầu không?',
    'Xác nhận khôi phục',
    { type: 'warning', confirmButtonText: 'Khôi phục', cancelButtonText: 'Hủy' }
  )
    .then(() => {
      siteContentStore.resetITOutsourcing();
      ElMessage.info('Đã khôi phục nội dung IT Outsourcing mặc định');
    })
    .catch(() => {});
};
</script>

