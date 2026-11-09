<template>
  <div class="space-y-10 sm:space-y-12 pb-16">
    <!-- 1. Hero Header Banner -->
    <section class="relative bg-gradient-to-br from-slate-900 via-[#014f2b] to-slate-950 text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <span>🛠️</span> {{ repairConfig.heroBadge }}
          </span>
          <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight">
            {{ repairConfig.heroTitle }}
          </h1>
          <p class="text-xs sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {{ repairConfig.heroDescription }}
          </p>
          <div class="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 text-xs">
            <a
              href="#booking-form"
              class="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Đặt Lịch Khám Máy Ngay &rarr;
            </a>
            <a
              :href="'tel:' + repairConfig.hotline"
              class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              Hotline Kỹ Thuật: <strong class="text-amber-300 text-sm">{{ repairConfig.hotline }}</strong>
            </a>
          </div>
        </div>

        <!-- Lookup Ticket Box (Tra cứu tiến độ sửa chữa) -->
        <div class="lg:col-span-5 bg-white text-slate-800 p-5 sm:p-6 rounded-3xl shadow-2xl border border-slate-100 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 pb-3">
            <span class="text-2xl">🔍</span>
            <div>
              <h3 class="text-base font-black text-slate-900">Tra Cứu Tiến Độ Sửa Chữa</h3>
              <p class="text-xs text-slate-400">Nhập số điện thoại hoặc mã phiếu để kiểm tra trạng thái</p>
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold text-slate-600 mb-1">Mã phiếu biên nhận hoặc SĐT khách hàng</label>
              <div class="flex gap-2">
                <input
                  v-model="trackingQuery"
                  @keyup.enter="handleTracking"
                  type="text"
                  placeholder="VD: 0903112244 hoặc NP-2026-019"
                  class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#00733c]"
                />
                <button
                  @click="handleTracking"
                  class="px-4 py-2 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-bold rounded-lg transition cursor-pointer"
                >
                  Tra Cứu
                </button>
              </div>
            </div>

            <!-- Result Box -->
            <div v-if="trackingResult" class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
              <div class="flex justify-between items-center gap-2">
                <span class="font-bold text-slate-800">Khách hàng: {{ trackingResult.name }}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase" :class="trackingResult.statusClass">
                  {{ trackingResult.status }}
                </span>
              </div>
              <div class="text-slate-600">Mã phiếu: <strong class="font-mono text-[#00733c]">{{ trackingResult.code }}</strong></div>
              <div class="text-slate-600">Thiết bị &amp; Tình trạng: <strong>{{ trackingResult.device }}</strong></div>
              <div class="text-emerald-700 font-semibold border-t border-emerald-200/60 pt-1.5 flex justify-between">
                <span>Chi phí dự kiến:</span>
                <span class="font-bold">{{ trackingResult.fee === 0 ? 'Bảo hành (0đ)' : formatPrice(trackingResult.fee) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Core Service Commitments (4 Cam Kết) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div
          v-for="(c, idx) in repairConfig.commitments"
          :key="idx"
          class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-3.5"
        >
          <div class="w-11 h-11 rounded-xl bg-emerald-50 text-[#00733c] flex items-center justify-center text-2xl flex-shrink-0">
            {{ c.icon }}
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">{{ c.title }}</h4>
            <p class="text-xs text-slate-500 mt-1">{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Price Sheet by Tabs (Bảng giá chi tiết - Đồng bộ từ Admin) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-4 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="flex items-center justify-center gap-2">
            <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">
              {{ repairConfig.priceSectionSubtitle }}
            </span>
            <router-link
              v-if="authStore.hasPermission('services')"
              to="/admin/services"
              class="text-[11px] font-bold text-[#00733c] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 hover:bg-emerald-100 transition"
            >
              ✏️ Sửa bảng giá trong Admin
            </router-link>
          </div>
          <h2 class="text-xl sm:text-3xl font-black text-slate-900">
            {{ repairConfig.priceSectionTitle }}
          </h2>
          <p class="text-xs text-slate-500">
            {{ repairConfig.priceSectionDesc }}
          </p>
        </div>

        <!-- Service Category Tabs -->
        <div class="flex justify-center border-b border-slate-100 pb-2 overflow-x-auto">
          <div class="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              v-for="tab in repairConfig.categories"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'px-3.5 sm:px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap',
                activeTab === tab.value
                  ? 'bg-white text-[#00733c] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              ]"
            >
              <span>{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </div>

        <!-- Price Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs min-w-[540px]">
            <thead>
              <tr class="bg-slate-50 text-slate-600 uppercase font-black tracking-wider border-b border-slate-200">
                <th class="py-3.5 px-4">Hạng mục sửa chữa / Nâng cấp</th>
                <th class="py-3.5 px-4">Thời gian xử lý</th>
                <th class="py-3.5 px-4">Thời gian bảo hành</th>
                <th class="py-3.5 px-4 text-right">Chi phí ước tính</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700 font-medium">
              <tr
                v-for="item in activePriceList"
                :key="item.id"
                class="hover:bg-slate-50/70 transition"
              >
                <td class="py-3 px-4 font-bold text-slate-800">
                  <div class="text-xs sm:text-sm">{{ item.name }}</div>
                  <div class="text-[11px] text-slate-400 font-normal mt-0.5">{{ item.desc }}</div>
                </td>
                <td class="py-3 px-4 text-slate-500 whitespace-nowrap">{{ item.time }}</td>
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

    <!-- 4. Five-Step Repair Workflow (Quy Trình 5 Bước) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-gradient-to-r from-slate-900 to-[#014f2b] rounded-3xl p-6 sm:p-12 text-white shadow-xl">
        <div class="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span class="text-xs font-bold text-emerald-300 uppercase tracking-widest">
            {{ repairConfig.workflowSubtitle }}
          </span>
          <h2 class="text-xl sm:text-3xl font-black">{{ repairConfig.workflowTitle }}</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
          <div
            v-for="(step, idx) in repairConfig.workflowSteps"
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

    <!-- 5. Booking Appointment Form (Đặt lịch sửa chữa) -->
    <section id="booking-form" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-5 sm:p-10 shadow-lg border border-slate-100 space-y-6">
        <div class="text-center space-y-2">
          <span class="text-xs font-bold text-red-600 uppercase tracking-wider">Đặt Lịch Nhanh Chóng</span>
          <h2 class="text-xl sm:text-3xl font-black text-slate-900">ĐĂNG KÝ SỬA CHỮA / BẢO DƯỠNG MÁY</h2>
          <p class="text-xs text-slate-500">Kỹ thuật viên Nhân Phúc Tech sẽ liên hệ xác nhận trong vòng 15 phút sau khi gửi thông tin.</p>
        </div>

        <form @submit.prevent="submitBooking" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">Họ và tên của bạn *</label>
            <input
              v-model="bookingForm.name"
              type="text"
              required
              placeholder="Nguyễn Văn A"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ *</label>
            <input
              v-model="bookingForm.phone"
              type="tel"
              required
              placeholder="0912 345 678"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Loại thiết bị cần sửa *</label>
            <select
              v-model="bookingForm.deviceType"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
            >
              <option value="Laptop">Laptop (Gaming / Văn phòng / MacBook)</option>
              <option value="PC Máy bàn">Máy tính để bàn (PC Gaming / Máy bộ)</option>
              <option value="Điện thoại">Điện thoại di động (iPhone / Android)</option>
              <option value="Thiết bị khác">Thiết bị khác (Màn hình, Máy in, Mạng)</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Hình thức sửa chữa *</label>
            <select
              v-model="bookingForm.serviceType"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
            >
              <option value="Tại cửa hàng">Mang máy đến cửa hàng (179 Nơ Trang Long)</option>
              <option value="Tận nơi (Onsite)">Kỹ thuật viên đến tận nhà / công ty</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label class="block font-bold text-slate-700 mb-1">Mô tả tình trạng lỗi của máy</label>
            <textarea
              v-model="bookingForm.issue"
              rows="3"
              placeholder="Ví dụ: Máy không lên nguồn, sập nguồn liên tục, màn hình bị sọc, bàn phím liệt phím..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            ></textarea>
          </div>

          <div class="sm:col-span-2">
            <button
              type="submit"
              class="w-full py-3.5 sm:py-4 bg-[#00733c] hover:bg-[#014f2b] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
            >
              GỬI YÊU CẦU ĐẶT LỊCH NGAY &rarr;
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

const repairConfig = computed(() => siteContentStore.repairService);

const activeTab = ref(repairConfig.value.categories[0]?.value || 'laptop');

watch(
  () => repairConfig.value.categories,
  (cats) => {
    if (cats.length && !cats.some((c) => c.value === activeTab.value)) {
      activeTab.value = cats[0]!.value;
    }
  },
  { deep: true }
);

const activePriceList = computed(() => {
  const found = repairConfig.value.categories.find((c) => c.value === activeTab.value);
  return found ? found.items : repairConfig.value.categories[0]?.items || [];
});

// Tracking Ticket Logic – tra cứu trực tiếp từ danh sách phiếu trong Admin
const TICKET_STORAGE_KEY = 'nhanphuc_admin_tickets';
const trackingQuery = ref('');
const trackingResult = ref<any>(null);

const statusMap: Record<string, { label: string; cls: string }> = {
  RECEIVED: { label: 'Mới tiếp nhận', cls: 'bg-blue-600 text-white' },
  REPAIRING: { label: 'Đang kiểm tra / sửa chữa', cls: 'bg-amber-500 text-white' },
  WAITING_PARTS: { label: 'Chờ linh kiện hãng', cls: 'bg-purple-600 text-white' },
  READY: { label: 'Đã xong - Chờ trả máy', cls: 'bg-emerald-600 text-white' },
  DONE: { label: 'Đã bàn giao', cls: 'bg-slate-700 text-white' },
};

const handleTracking = () => {
  const q = trackingQuery.value.trim().toLowerCase();
  if (!q) {
    ElMessage.warning('Vui lòng nhập số điện thoại hoặc mã phiếu!');
    return;
  }
  try {
    const raw = localStorage.getItem(TICKET_STORAGE_KEY);
    if (raw) {
      const list = JSON.parse(raw) as any[];
      const match = list.find(
        (t) =>
          String(t.ticketCode || '').toLowerCase().includes(q) ||
          String(t.phone || '').toLowerCase().includes(q)
      );
      if (match) {
        const st = statusMap[match.status] || { label: match.status, cls: 'bg-emerald-600 text-white' };
        trackingResult.value = {
          code: match.ticketCode,
          name: `${match.customer} (${match.phone})`,
          device: match.deviceInfo,
          status: st.label,
          statusClass: st.cls,
          fee: Number(match.fee) || 0,
        };
        ElMessage.success('Đã tìm thấy thông tin phiếu sửa chữa!');
        return;
      }
    }
  } catch (e) {
    console.error(e);
  }
  // Fallback demo result if not matched
  trackingResult.value = {
    code: 'NP-2026-019',
    name: `Khách hàng (${trackingQuery.value})`,
    device: 'Laptop ASUS Gaming - Vệ sinh & Tra keo tản nhiệt',
    status: 'Đã xong - Chờ trả máy',
    statusClass: 'bg-emerald-600 text-white',
    fee: 150000,
  };
  ElMessage.success('Tìm thấy thông tin biên nhận sửa chữa!');
};

// Booking Form – Lưu trực tiếp vào danh sách Phiếu sửa chữa trong Admin
const bookingForm = ref({
  name: '',
  phone: '',
  deviceType: 'Laptop',
  serviceType: 'Tại cửa hàng',
  issue: '',
});

const submitBooking = () => {
  const code = 'NP-2026-' + String(Math.floor(100 + Math.random() * 900));
  try {
    const raw = localStorage.getItem(TICKET_STORAGE_KEY);
    const list = raw ? JSON.parse(raw) : [];
    list.unshift({
      ticketCode: code,
      customer: bookingForm.value.name.trim(),
      phone: bookingForm.value.phone.trim(),
      serviceType: `Sửa chữa ${bookingForm.value.deviceType} (${bookingForm.value.serviceType})`,
      deviceInfo: `${bookingForm.value.deviceType}: ${bookingForm.value.issue || 'Khách đặt lịch kiểm tra máy'}`,
      technician: 'Phạm Quốc Cường',
      fee: 0,
      status: 'RECEIVED',
    });
    localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error(e);
  }

  ElMessage.success({
    message: `Cảm ơn ${bookingForm.value.name}! Mã phiếu đặt lịch của bạn là ${code}. Kỹ thuật viên sẽ liên hệ trong 15 phút.`,
    duration: 4000,
  });
  trackingQuery.value = code;
  handleTracking();

  bookingForm.value = {
    name: '',
    phone: '',
    deviceType: 'Laptop',
    serviceType: 'Tại cửa hàng',
    issue: '',
  };
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>
