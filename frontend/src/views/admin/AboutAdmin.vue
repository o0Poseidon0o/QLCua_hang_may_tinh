<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">
          Quản lý Trang "Về Nhân Phúc Tech" (Giới thiệu Công ty)
        </h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Cập nhật câu chuyện thương hiệu, tầm nhìn sứ mệnh, giá trị cốt lõi và thông tin liên hệ trên trang <strong>/about</strong>.
        </p>
      </div>
      <div class="flex items-center gap-2.5">
        <router-link
          to="/about"
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] hover:bg-emerald-50 text-xs font-bold transition"
        >
          Xem trang Giới thiệu &nearr;
        </router-link>
        <el-button @click="handleReset">Khôi phục mặc định</el-button>
        <el-button type="success" color="#00733c" @click="handleSave">
          Lưu nội dung
        </el-button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <!-- Cột trái: Câu chuyện thương hiệu & Sứ mệnh -->
      <div class="lg:col-span-8 space-y-6">
        <el-card shadow="never" class="rounded-2xl border-slate-200/80">
          <template #header>
            <div class="font-extrabold text-slate-800">1. Thông điệp Mở đầu & Câu chuyện Thương hiệu</div>
          </template>
          <el-form label-position="top">
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <el-form-item label="Nhãn mở đầu (Badge)">
                <el-input v-model="about.heroBadge" />
              </el-form-item>
              <el-form-item label="Tên công ty / Tiêu đề lớn" class="sm:col-span-2">
                <el-input v-model="about.companyTitle" />
              </el-form-item>
            </div>

            <el-form-item label="Đoạn giới thiệu tổng quan (Hero Intro)">
              <el-input v-model="about.heroIntro" type="textarea" :rows="3" />
            </el-form-item>

            <el-form-item label="Tiêu đề mục Câu chuyện thương hiệu">
              <el-input v-model="about.storyTitle" />
            </el-form-item>

            <el-form-item label="Nội dung Câu chuyện thương hiệu">
              <el-input v-model="about.storyContent" type="textarea" :rows="4" />
            </el-form-item>

            <el-form-item label="Tiêu đề mục Tầm nhìn & Sứ mệnh">
              <el-input v-model="about.missionTitle" />
            </el-form-item>

            <el-form-item label="Nội dung Tầm nhìn & Sứ mệnh">
              <el-input v-model="about.missionContent" type="textarea" :rows="3" />
            </el-form-item>
          </el-form>
        </el-card>

        <el-card shadow="never" class="rounded-2xl border-slate-200/80">
          <template #header>
            <div class="font-extrabold text-slate-800">2. Ba Giá trị Cốt lõi ("Tại sao chọn Nhân Phúc Tech?")</div>
          </template>
          <el-form label-position="top">
            <el-form-item label="Tiêu đề khu vực">
              <el-input v-model="about.whyChooseTitle" />
            </el-form-item>
          </el-form>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              v-for="(val, idx) in about.coreValues"
              :key="idx"
              class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
            >
              <div class="flex items-center gap-2">
                <el-input v-model="val.icon" style="width: 64px" placeholder="Icon" />
                <el-input v-model="val.title" placeholder="Tiêu đề" class="flex-1" />
              </div>
              <el-input v-model="val.desc" type="textarea" :rows="3" placeholder="Mô tả..." />
            </div>
          </div>
        </el-card>
      </div>

      <!-- Cột phải: Thông tin liên hệ Showroom -->
      <div class="lg:col-span-4 space-y-6">
        <el-card shadow="never" class="rounded-2xl border-slate-200/80">
          <template #header>
            <div class="font-extrabold text-slate-800">3. Thông tin Liên hệ Showroom</div>
          </template>
          <el-form label-position="top">
            <el-form-item label="Địa chỉ Showroom & Trung tâm kỹ thuật">
              <el-input v-model="about.address" type="textarea" :rows="2" />
            </el-form-item>
            <el-form-item label="Số Hotline chính">
              <el-input v-model="about.hotline" />
            </el-form-item>
            <el-form-item label="Khung giờ làm việc">
              <el-input v-model="about.workingHours" />
            </el-form-item>
            <el-form-item label="Email Kinh doanh (Sales)">
              <el-input v-model="about.emailSales" />
            </el-form-item>
            <el-form-item label="Email Hỗ trợ Kỹ thuật (Support)">
              <el-input v-model="about.emailSupport" />
            </el-form-item>
          </el-form>
          <div v-if="about.updatedAt" class="text-xs text-slate-400 pt-2 border-t border-slate-100">
            Cập nhật lần cuối bởi <strong>{{ about.updatedBy }}</strong> lúc {{ about.updatedAt }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ElMessage } from 'element-plus';
import { useSiteContentStore } from '../../stores/siteContent';
import { useAuthStore } from '../../stores/auth';

const siteContentStore = useSiteContentStore();
const authStore = useAuthStore();

const about = computed(() => siteContentStore.aboutPage);

const handleSave = () => {
  const staffName = authStore.currentUser?.fullName || 'Quản trị viên';
  siteContentStore.saveAboutPage(staffName);
  ElMessage.success('Đã lưu nội dung trang Về Nhân Phúc Tech!');
};

const handleReset = () => {
  siteContentStore.resetAboutPage();
  ElMessage.info('Đã khôi phục nội dung mặc định');
};
</script>

