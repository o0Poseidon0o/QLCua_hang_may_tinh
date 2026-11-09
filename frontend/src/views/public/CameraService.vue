<template>
  <div class="space-y-12 sm:space-y-16 pb-16">
    <!-- 1. Hero Banner -->
    <section class="relative bg-gradient-to-br from-slate-950 via-[#014f2b] to-emerald-950 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <div class="flex flex-wrap items-center gap-2">
            <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <span>📹</span> {{ config.heroBadge }}
            </span>
            <router-link
              v-if="authStore.hasPermission('camera')"
              to="/admin/camera"
              class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[11px] font-extrabold hover:bg-amber-300 transition shadow"
            >
              ✏️ Chỉnh sửa trang Camera trong Admin
            </router-link>
          </div>

          <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            {{ config.heroTitle }}
          </h1>
          <p class="text-xs sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {{ config.heroDescription }}
          </p>
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs">
            <a
              href="#camera-booking-form"
              class="px-5 sm:px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Đăng Ký Khảo Sát Tận Nơi (0đ) &rarr;
            </a>
            <a
              :href="'tel:' + config.hotline"
              class="px-5 sm:px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              Hotline Tư Vấn Camera: <strong class="text-amber-300 text-sm">{{ config.hotline }}</strong>
            </a>
          </div>
        </div>

        <!-- 4 Chỉ số nổi bật -->
        <div class="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          <div
            v-for="(stat, idx) in config.stats"
            :key="idx"
            class="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/15 text-center space-y-1"
          >
            <div
              class="text-xl sm:text-2xl font-black"
              :class="
                idx === 0
                  ? 'text-emerald-400'
                  : idx === 1
                  ? 'text-amber-300'
                  : idx === 2
                  ? 'text-sky-300'
                  : 'text-rose-300'
              "
            >
              {{ stat.value }}
            </div>
            <div class="text-[11px] sm:text-xs text-slate-200">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Các Gói Lắp Đặt Camera Trọn Bộ (Động từ Admin) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
        <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">{{ config.packageSubtitle }}</span>
        <h2 class="text-xl sm:text-3xl font-black text-slate-900">{{ config.packageTitle }}</h2>
        <p class="text-xs text-slate-500">{{ config.packageDesc }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        <div
          v-for="pkg in config.packages"
          :key="pkg.id"
          :class="[
            'rounded-3xl p-6 sm:p-7 transition flex flex-col justify-between space-y-6 relative',
            pkg.isPopular
              ? 'bg-gradient-to-b from-[#014f2b] to-[#00733c] text-white shadow-2xl transform md:-translate-y-2 border-2 border-emerald-400'
              : 'bg-white shadow-sm border border-slate-200 hover:shadow-xl text-slate-800',
          ]"
        >
          <div
            v-if="pkg.isPopular"
            class="absolute -top-3 right-6 bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow"
          >
            {{ pkg.popularLabel || 'Được Chọn Nhiều Nhất' }}
          </div>

          <div class="space-y-4">
            <span
              class="px-3 py-1 text-xs font-black uppercase rounded-full inline-block"
              :class="pkg.isPopular ? 'bg-white/20 text-emerald-200' : 'bg-emerald-50 text-[#00733c]'"
            >
              {{ pkg.name }}
            </span>

            <div class="space-y-1">
              <div
                class="text-2xl sm:text-3xl font-black"
                :class="pkg.isPopular ? 'text-amber-300' : 'text-red-600'"
              >
                {{ formatPrice(pkg.price) }}
              </div>
              <div
                class="text-xs font-semibold"
                :class="pkg.isPopular ? 'text-emerald-200' : 'text-slate-500'"
              >
                {{ pkg.unit }}
              </div>
            </div>

            <p
              class="text-xs leading-relaxed"
              :class="pkg.isPopular ? 'text-emerald-100' : 'text-slate-500'"
            >
              {{ pkg.description }}
            </p>

            <div
              class="border-t pt-4 space-y-2.5 text-xs"
              :class="pkg.isPopular ? 'border-white/20 text-emerald-50' : 'border-slate-100 text-slate-700'"
            >
              <div
                v-for="(feat, fIdx) in pkg.features"
                :key="fIdx"
                class="flex items-start gap-2"
                :class="!feat.included ? 'opacity-50' : ''"
              >
                <span
                  class="font-bold"
                  :class="
                    !feat.included
                      ? 'text-slate-400'
                      : pkg.isPopular
                      ? 'text-amber-300'
                      : 'text-emerald-600'
                  "
                >
                  {{ feat.included ? '✓' : '✕' }}
                </span>
                <span>{{ feat.text }}</span>
              </div>
            </div>
          </div>

          <a
            href="#camera-booking-form"
            @click="selectPackageForBooking(pkg.name)"
            :class="[
              'w-full py-3.5 font-extrabold text-xs rounded-xl transition text-center block',
              pkg.isPopular
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-lg'
                : 'bg-[#00733c] hover:bg-[#014f2b] text-white shadow-sm',
            ]"
          >
            {{ pkg.ctaText }}
          </a>
        </div>
      </div>
    </section>

    <!-- 3. Bảng Giá Chi Tiết Theo Hạng Mục (Camera Wifi / Camera Đầu Ghi / Nhân Công) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">
              {{ config.priceSectionSubtitle }}
            </span>
            <router-link
              v-if="authStore.hasPermission('camera')"
              to="/admin/camera"
              class="text-[11px] font-bold text-[#00733c] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 hover:bg-emerald-100 transition"
            >
              ✏️ Sửa bảng giá Camera
            </router-link>
          </div>
          <h2 class="text-xl sm:text-3xl font-black text-slate-900">
            {{ config.priceSectionTitle }}
          </h2>
          <p class="text-xs text-slate-500">
            {{ config.priceSectionDesc }}
          </p>
        </div>

        <!-- Category Tabs -->
        <div class="flex justify-center border-b border-slate-100 pb-2 overflow-x-auto">
          <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              v-for="tab in config.categories"
              :key="tab.value"
              @click="activePriceTab = tab.value"
              :class="[
                'px-3.5 sm:px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap',
                activePriceTab === tab.value
                  ? 'bg-white text-[#00733c] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900',
              ]"
            >
              <span>{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </div>

        <!-- Price Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs min-w-[560px]">
            <thead>
              <tr class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider border-b border-slate-200">
                <th class="py-3.5 px-4">Hạng mục thiết bị / Dịch vụ thi công</th>
                <th class="py-3.5 px-4">Độ phân giải / Quy cách</th>
                <th class="py-3.5 px-4">Chế độ bảo hành</th>
                <th class="py-3.5 px-4 text-right">Đơn giá trọn gói</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              <tr
                v-for="item in activePriceItems"
                :key="item.id"
                class="hover:bg-slate-50/70 transition"
              >
                <td class="py-3 px-4 font-bold text-slate-800">
                  <div class="text-xs sm:text-sm">{{ item.name }}</div>
                  <div class="text-[11px] text-slate-400 font-normal mt-0.5">{{ item.desc }}</div>
                </td>
                <td class="py-3 px-4 text-slate-600 whitespace-nowrap">{{ item.resolution }}</td>
                <td class="py-3 px-4 whitespace-nowrap">
                  <span class="px-2 py-0.5 bg-emerald-50 text-[#00733c] font-bold rounded">
                    {{ item.warranty }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right font-black text-red-600 text-sm whitespace-nowrap">
                  {{ item.price }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- 4. Giải Pháp Lắp Đặt Theo Từng Không Gian -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-8 space-y-2">
        <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">{{ config.solutionsSubtitle }}</span>
        <h2 class="text-xl sm:text-3xl font-black text-slate-900">{{ config.solutionsTitle }}</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="(sol, sIdx) in config.solutions"
          :key="sIdx"
          class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition space-y-4 flex flex-col justify-between"
        >
          <div class="space-y-3">
            <div class="w-12 h-12 rounded-2xl bg-emerald-50 text-[#00733c] flex items-center justify-center text-2xl">
              {{ sol.icon }}
            </div>
            <div>
              <h3 class="text-base font-black text-slate-900">{{ sol.title }}</h3>
              <p class="text-[11px] font-bold text-[#00733c] mt-0.5">{{ sol.target }}</p>
            </div>
            <p class="text-xs text-slate-500 leading-relaxed">{{ sol.description }}</p>
          </div>

          <ul class="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
            <li v-for="(hl, hIdx) in sol.highlights" :key="hIdx" class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span>{{ hl }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 5. Quy Trình 5 Bước Thi Công & Bàn Giao -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-slate-900 to-[#014f2b] rounded-3xl p-6 sm:p-12 text-white shadow-xl">
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span class="text-xs font-bold text-emerald-300 uppercase tracking-widest">
            {{ config.workflowSubtitle }}
          </span>
          <h2 class="text-xl sm:text-3xl font-black">{{ config.workflowTitle }}</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
          <div
            v-for="(step, idx) in config.workflowSteps"
            :key="idx"
            class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 space-y-2.5"
          >
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow">
              {{ idx + 1 }}
            </div>
            <h4 class="font-bold text-sm text-white">{{ step.title }}</h4>
            <p class="text-xs text-slate-300">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Biểu Mẫu Đăng Ký Khảo Sát & Lắp Đặt Camera Tận Nơi -->
    <section id="camera-booking-form" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-5 sm:p-10 shadow-lg border border-slate-100 space-y-6">
        <div class="text-center space-y-2">
          <span class="text-xs font-bold text-red-600 uppercase tracking-wider">Khảo Sát Tận Nơi Miễn Phí 100%</span>
          <h2 class="text-xl sm:text-3xl font-black text-slate-900">ĐĂNG KÝ TƯ VẤN &amp; LẮP ĐẶT CAMERA AN NINH</h2>
          <p class="text-xs text-slate-500">
            Kỹ thuật viên Camera của Nhân Phúc Tech sẽ liên hệ trong 15 phút để tư vấn và hẹn lịch khảo sát tại công trình.
          </p>
        </div>

        <form @submit.prevent="submitCameraBooking" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Họ và tên khách hàng *</label>
            <input
              v-model="leadForm.customerName"
              type="text"
              required
              placeholder="Anh / Chị Nguyễn Văn A"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ *</label>
            <input
              v-model="leadForm.phone"
              type="tel"
              required
              placeholder="0912 345 678"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Loại công trình lắp đặt *</label>
            <select
              v-model="leadForm.projectType"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
            >
              <option value="Gia đình / Căn hộ">Nhà phố / Căn hộ chung cư / Biệt thự</option>
              <option value="Cửa hàng / Showroom">Cửa hàng / Quán Cafe / Nhà hàng / Spa</option>
              <option value="Văn phòng công ty">Văn phòng công ty / Tòa nhà</option>
              <option value="Kho bãi / Nhà xưởng">Kho hàng / Nhà xưởng sản xuất</option>
              <option value="Sửa chữa / Bảo trì Camera">Sửa chữa / Bảo trì hệ thống Camera sẵn có</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Gói / Số lượng Camera dự kiến *</label>
            <select
              v-model="leadForm.cameraCount"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
            >
              <option value="1 - 2 Camera Wifi không dây">1 - 2 Camera Wifi Không Dây 360°</option>
              <option value="Trọn bộ 2 - 4 Camera có dây">Trọn bộ 2 - 4 Camera Có Dây + Đầu Ghi</option>
              <option value="Trọn bộ 6 - 8 Camera IP">Trọn bộ 6 - 8 Camera IP Chuyên Nghiệp</option>
              <option value="Hệ thống trên 8 Camera">Hệ thống lớn trên 8 Camera (Cần khảo sát)</option>
              <option value="Kiểm tra / Sửa chữa Camera">Kiểm tra &amp; Sửa chữa Camera đang lỗi</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block font-bold text-slate-700 mb-1">Địa chỉ khảo sát / lắp đặt *</label>
            <input
              v-model="leadForm.address"
              type="text"
              required
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div class="sm:col-span-2">
            <label class="block font-bold text-slate-700 mb-1">Ghi chú nhu cầu chi tiết</label>
            <textarea
              v-model="leadForm.notes"
              rows="3"
              placeholder="Ví dụ: Cần lắp 2 cam ngoài trời chống nước có màu ban đêm, 2 cam trong nhà có thu âm..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            ></textarea>
          </div>

          <div class="sm:col-span-2">
            <button
              type="submit"
              class="w-full py-3.5 sm:py-4 bg-[#00733c] hover:bg-[#014f2b] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
            >
              GỬI YÊU CẦU KHẢO SÁT &amp; BÁO GIÁ MIỄN PHÍ &rarr;
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useSiteContentStore } from '../../stores/siteContent';
import { useAuthStore } from '../../stores/auth';

const siteContentStore = useSiteContentStore();
const authStore = useAuthStore();

const config = computed(() => siteContentStore.cameraService);

const activePriceTab = ref(config.value.categories[0]?.value || 'wifi');

watch(
  () => config.value.categories,
  (cats) => {
    if (cats.length && !cats.some((c) => c.value === activePriceTab.value)) {
      activePriceTab.value = cats[0]!.value;
    }
  },
  { deep: true }
);

const activePriceItems = computed(() => {
  const found = config.value.categories.find((c) => c.value === activePriceTab.value);
  return found ? found.items : config.value.categories[0]?.items || [];
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
};

const leadForm = ref({
  customerName: '',
  phone: '',
  projectType: 'Gia đình / Căn hộ',
  cameraCount: 'Trọn bộ 2 - 4 Camera có dây',
  address: '',
  notes: '',
});

const selectPackageForBooking = (pkgName: string) => {
  leadForm.value.notes = `Đăng ký tư vấn gói: ${pkgName}`;
};

const submitCameraBooking = () => {
  siteContentStore.addCameraLead({
    customerName: leadForm.value.customerName.trim(),
    phone: leadForm.value.phone.trim(),
    projectType: leadForm.value.projectType,
    cameraCount: leadForm.value.cameraCount,
    address: leadForm.value.address.trim(),
    notes: leadForm.value.notes.trim(),
  });

  ElMessage.success({
    message: `Cảm ơn ${leadForm.value.customerName}! Yêu cầu khảo sát lắp đặt Camera đã được gửi tới bộ phận Kỹ thuật Nhân Phúc Tech.`,
    duration: 4000,
  });

  leadForm.value = {
    customerName: '',
    phone: '',
    projectType: 'Gia đình / Căn hộ',
    cameraCount: 'Trọn bộ 2 - 4 Camera có dây',
    address: '',
    notes: '',
  };
};
</script>

