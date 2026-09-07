<template>
  <div class="space-y-12 pb-16">
    <!-- 1. Hero Header Banner -->
    <section class="relative bg-gradient-to-br from-slate-900 via-[#014f2b] to-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <span>🛠️</span> Dịch Vụ Kỹ Thuật Uy Tín NetSoft
          </span>
          <h1 class="text-3xl sm:text-5xl font-black leading-tight">
            SỬA CHỮA PC • LAPTOP • ĐIỆN THOẠI LẤY LIỀN
          </h1>
          <p class="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Khám bệnh và tư vấn giải pháp miễn phí 100%. Đội ngũ kỹ thuật viên giàu kinh nghiệm, linh kiện thay thế chính hãng, xem trực tiếp quá trình sửa chữa, bảo hành từ 6 đến 24 tháng.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <a
              href="#booking-form"
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Đặt Lịch Khám Máy Ngay &rarr;
            </a>
            <a
              href="tel:0777908179"
              class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              Hotline Kỹ Thuật: <strong class="text-amber-300 text-sm">0777908179</strong>
            </a>
          </div>
        </div>

        <!-- Lookup Ticket Box (Tra cứu tiến độ sửa chữa) -->
        <div class="lg:col-span-5 bg-white text-slate-800 p-6 rounded-3xl shadow-2xl border border-slate-100 space-y-4">
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
                  type="text"
                  placeholder="VD: 0777908179 hoặc NS-2026"
                  class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#00733c]"
                />
                <button
                  @click="handleTracking"
                  class="px-4 py-2 bg-[#00733c] hover:bg-[#014f2b] text-white text-xs font-bold rounded-lg transition"
                >
                  Tra Cứu
                </button>
              </div>
            </div>

            <!-- Result Box -->
            <div v-if="trackingResult" class="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
              <div class="flex justify-between items-center">
                <span class="font-bold text-slate-800">Khách hàng: {{ trackingResult.name }}</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-black uppercase" :class="trackingResult.statusClass">
                  {{ trackingResult.status }}
                </span>
              </div>
              <div class="text-slate-600">Thiết bị: <strong>{{ trackingResult.device }}</strong></div>
              <div class="text-slate-600">Lỗi: {{ trackingResult.issue }}</div>
              <div class="text-emerald-700 font-semibold border-t border-emerald-200/60 pt-1.5 flex justify-between">
                <span>Ước tính chi phí:</span>
                <span class="font-bold">{{ formatPrice(trackingResult.fee) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Core Service Commitments (4 Cam Kết) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-emerald-50 text-[#00733c] flex items-center justify-center text-2xl flex-shrink-0">
            🔍
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Khám Lỗi Miễn Phí</h4>
            <p class="text-xs text-slate-500 mt-1">Kiểm tra tổng thể phần cứng & phần mềm không thu bất kỳ khoản phí nào.</p>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl flex-shrink-0">
            ⚡
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Sửa Nhanh Lấy Liền</h4>
            <p class="text-xs text-slate-500 mt-1">Các sự cố nhẹ, thay màn hình, ép kính, thay pin chỉ từ 30 - 60 phút.</p>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl flex-shrink-0">
            🛡️
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Bảo Mật Dữ Liệu</h4>
            <p class="text-xs text-slate-500 mt-1">Cam kết không can thiệp, không xem trộm hay làm mất dữ liệu cá nhân của khách.</p>
          </div>
        </div>

        <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4">
          <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl flex-shrink-0">
            ⭐
          </div>
          <div>
            <h4 class="text-sm font-bold text-slate-900">Bảo Hành Dài Hạn</h4>
            <p class="text-xs text-slate-500 mt-1">Linh kiện thay thế được bảo hành từ 6 đến 24 tháng 1 đổi 1 nhanh chóng.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Price Sheet by Tabs (Bảng giá chi tiết) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">Minh Bạch & Rõ Ràng</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">BẢNG GIÁ DỊCH VỤ NIÊM YẾT THAM KHẢO</h2>
          <p class="text-xs text-slate-500">Giá đã bao gồm công thợ lắp đặt và chế độ bảo hành. Không phát sinh chi phí ẩn.</p>
        </div>

        <!-- Service Category Tabs -->
        <div class="flex justify-center border-b border-slate-100 pb-2">
          <div class="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
            <button
              v-for="tab in priceTabs"
              :key="tab.value"
              @click="activeTab = tab.value"
              :class="[
                'px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-2',
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
          <table class="w-full text-left text-xs">
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
                v-for="(item, idx) in activePriceList"
                :key="idx"
                class="hover:bg-slate-50/70 transition"
              >
                <td class="py-3 px-4 font-bold text-slate-800">
                  <div class="text-sm">{{ item.name }}</div>
                  <div class="text-[11px] text-slate-400 font-normal mt-0.5">{{ item.desc }}</div>
                </td>
                <td class="py-3 px-4 text-slate-500">{{ item.time }}</td>
                <td class="py-3 px-4">
                  <span class="px-2 py-0.5 bg-emerald-50 text-[#00733c] font-bold rounded">
                    {{ item.warranty }}
                  </span>
                </td>
                <td class="py-3 px-4 text-right font-black text-red-600 text-sm">
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
      <div class="bg-gradient-to-r from-slate-900 to-[#014f2b] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span class="text-xs font-bold text-emerald-300 uppercase tracking-widest">Quy Trình Chuẩn Quốc Tế</span>
          <h2 class="text-2xl sm:text-3xl font-black">5 BƯỚC SỬA CHỮA MINH BẠCH TẠI NETSOFT</h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-center">
          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow">
              1
            </div>
            <h4 class="font-bold text-sm text-white">Tiếp Nhận Máy</h4>
            <p class="text-xs text-slate-300">Ghi nhận tình trạng lỗi, số serial và thông tin liên hệ của khách hàng.</p>
          </div>

          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow">
              2
            </div>
            <h4 class="font-bold text-sm text-white">Kiểm Tra & Báo Giá</h4>
            <p class="text-xs text-slate-300">Kỹ thuật viên xác định nguyên nhân và thông báo giá trước khi sửa.</p>
          </div>

          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow">
              3
            </div>
            <h4 class="font-bold text-sm text-white">Ký Tên Linh Kiện</h4>
            <p class="text-xs text-slate-300">Khách hàng trực tiếp ký tên lên pin, màn hình, ổ cứng, ram trước khi sửa.</p>
          </div>

          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow">
              4
            </div>
            <h4 class="font-bold text-sm text-white">Tiến Hành Sửa Chữa</h4>
            <p class="text-xs text-slate-300">Thay thế linh kiện chính hãng dưới camera giám sát chất lượng cao.</p>
          </div>

          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 space-y-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500 text-white font-black text-base flex items-center justify-center mx-auto shadow">
              5
            </div>
            <h4 class="font-bold text-sm text-white">Kiểm Tra & Bàn Giao</h4>
            <p class="text-xs text-slate-300">Khách hàng kiểm tra hoạt động, dán tem bảo hành và nhận phiếu giao máy.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. Booking Appointment Form (Đặt lịch sửa chữa) -->
    <section id="booking-form" class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 space-y-6">
        <div class="text-center space-y-2">
          <span class="text-xs font-bold text-red-600 uppercase tracking-wider">Đặt Lịch Nhanh Chóng</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">ĐĂNG KÝ SỬA CHỮA / BẢO DƯỠNG MÁY</h2>
          <p class="text-xs text-slate-500">Kỹ thuật viên NetSoft sẽ liên hệ xác nhận trong vòng 15 phút sau khi gửi thông tin.</p>
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
              <option value="laptop">Laptop (Gaming / Văn phòng / MacBook)</option>
              <option value="pc">Máy tính để bàn (PC Gaming / Máy bộ)</option>
              <option value="phone">Điện thoại di động (iPhone / Android)</option>
              <option value="other">Thiết bị khác (Màn hình, Máy in, Mạng)</option>
            </select>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Hình thức sửa chữa *</label>
            <select
              v-model="bookingForm.serviceType"
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
            >
              <option value="store">Mang máy đến cửa hàng (179 Nơ Trang Long)</option>
              <option value="onsite">Kỹ thuật viên đến tận nhà / công ty</option>
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
              class="w-full py-4 bg-[#00733c] hover:bg-[#014f2b] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
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
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

const activeTab = ref('laptop');

const priceTabs = [
  { label: 'Sửa Chữa Laptop', value: 'laptop', icon: '💻' },
  { label: 'Sửa Chữa PC Máy Bàn', value: 'pc', icon: '🖥️' },
  { label: 'Sửa Chữa Điện Thoại', value: 'phone', icon: '📱' }
];

// Price Lists Mock Data
const laptopPrices = [
  { name: 'Vệ sinh Laptop & Tra keo tản nhiệt gốm cao cấp', desc: 'Thổi sạch bụi bẩn, tra keo tản nhiệt giảm 10-15 độ C', time: '30 - 45 phút', warranty: '1 tháng', price: '150.000 đ' },
  { name: 'Cài đặt Windows 10/11 Bản Quyền + Bộ Office', desc: 'Tối ưu hóa hệ thống, cài đủ driver và tiện ích diệt virus', time: '45 phút', warranty: 'Trọn đời máy', price: '150.000 đ' },
  { name: 'Thay Bàn Phím Laptop (ASUS, Dell, HP, Lenovo, Acer)', desc: 'Phím gõ êm, phím cơ bản hoặc có đèn LED nền', time: '45 - 60 phút', warranty: '12 tháng', price: 'Từ 350.000 đ' },
  { name: 'Thay Màn Hình Laptop FHD / IPS 144Hz', desc: 'Màn hình mới 100% không điểm chết, màu sắc sắc nét', time: '45 phút', warranty: '12 tháng (1 đổi 1)', price: 'Từ 1.250.000 đ' },
  { name: 'Nâng cấp Ổ Cứng SSD M.2 NVMe 512GB', desc: 'Chuyển dữ liệu miễn phí, tốc độ khởi động máy chỉ 5 giây', time: '30 phút', warranty: '36 tháng', price: '790.000 đ' },
  { name: 'Sửa Nguồn Mainboard / Cháy Chập / Không Lên Điện', desc: 'Sửa chữa vi mạch điện tử bằng kính hiển vi chuyên dụng', time: '1 - 2 ngày', warranty: '6 tháng', price: 'Từ 550.000 đ' }
];

const pcPrices = [
  { name: 'Kiểm tra chuẩn đoán lỗi PC không lên hình / treo màn', desc: 'Khám toàn diện nguồn, ram, main, vga hoàn toàn miễn phí', time: '30 phút', warranty: 'Miễn phí', price: '0 đ (Free)' },
  { name: 'Vệ sinh máy tính bàn PC Gaming, đi lại dây nguồn', desc: 'Vệ sinh bụi, tra keo tản nhiệt CPU và VGA', time: '45 phút', warranty: '1 tháng', price: '120.000 đ' },
  { name: 'Sửa / Thay Nguồn Máy Tính (PSU 500W - 650W)', desc: 'Nguồn công suất thực 80 Plus chính hãng', time: '30 phút', warranty: '36 tháng', price: 'Từ 450.000 đ' },
  { name: 'Sửa Card Màn Hình (VGA) rác hình, mất nguồn, quạt kêu', desc: 'Đóng lại chip VRAM, sửa mạch cấp nguồn VRM', time: '1 - 3 ngày', warranty: '3 - 6 tháng', price: 'Từ 600.000 đ' },
  { name: 'Cứu Dữ Liệu Ổ Cứng HDD / SSD Hỏng, Mất Phân Vùng', desc: 'Khôi phục hình ảnh, tài liệu kế toán quan trọng an toàn', time: '1 - 2 ngày', warranty: 'Bảo mật 100%', price: 'Từ 800.000 đ' }
];

const phonePrices = [
  { name: 'Thay Pin Điện Thoại iPhone / Android Dung Lượng Chuẩn', desc: 'Pin dung lượng cao, pin Pisen chính hãng, báo chuẩn % pin', time: '20 - 30 phút', warranty: '12 tháng', price: 'Từ 250.000 đ' },
  { name: 'Ép Kính / Thay Màn Hình iPhone / Samsung AMOLED', desc: 'Mặt kính cường lực trong suốt, cảm ứng mượt mà', time: '60 phút', warranty: '6 - 12 tháng', price: 'Từ 350.000 đ' },
  { name: 'Thay Chân Sạc / Sửa Loa Trong / Loa Ngoài rè', desc: 'Linh kiện zin bóc máy, sạc nhanh chuẩn dòng điện', time: '30 phút', warranty: '6 tháng', price: 'Từ 180.000 đ' },
  { name: 'Sửa Chữa Mất Sóng, Mất Wifi, Chạm Nguồn IC', desc: 'Khắc phục các sự cố rơi nước, va đập mạnh chuyên sâu', time: '1 - 2 ngày', warranty: '3 tháng', price: 'Từ 350.000 đ' }
];

const activePriceList = computed(() => {
  if (activeTab.value === 'pc') return pcPrices;
  if (activeTab.value === 'phone') return phonePrices;
  return laptopPrices;
});

// Tracking Ticket Logic
const trackingQuery = ref('');
const trackingResult = ref<any>(null);

const handleTracking = () => {
  const q = trackingQuery.value.trim().toLowerCase();
  if (!q) {
    ElMessage.warning('Vui lòng nhập số điện thoại hoặc mã phiếu!');
    return;
  }
  // Simulated tracking result
  trackingResult.value = {
    name: 'Anh Hoàng (0777908179)',
    device: 'Laptop ASUS Gaming FX506',
    issue: 'Thay quạt tản nhiệt & Vệ sinh tra keo',
    status: 'Đã hoàn thành - Sẵn sàng giao máy',
    statusClass: 'bg-emerald-600 text-white',
    fee: 350000
  };
  ElMessage.success('Tìm thấy thông tin biên nhận sửa chữa!');
};

// Booking Form
const bookingForm = ref({
  name: '',
  phone: '',
  deviceType: 'laptop',
  serviceType: 'store',
  issue: ''
});

const submitBooking = () => {
  ElMessage.success({
    message: `Cảm ơn ${bookingForm.value.name}! NetSoft đã nhận được lịch hẹn. Nhân viên kỹ thuật sẽ gọi lại ngay.`,
    duration: 3000
  });
  bookingForm.value = {
    name: '',
    phone: '',
    deviceType: 'laptop',
    serviceType: 'store',
    issue: ''
  };
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>
