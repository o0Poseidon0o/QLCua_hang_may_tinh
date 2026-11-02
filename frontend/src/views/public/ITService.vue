<template>
  <div class="space-y-16 pb-16">
    <!-- 1. Hero Banner -->
    <section class="relative bg-gradient-to-br from-slate-950 via-[#014f2b] to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7 space-y-4">
          <span class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <span>💼</span> Giải Pháp Doanh Nghiệp Toàn Diện
          </span>
          <h1 class="text-3xl sm:text-5xl font-black leading-tight">
            DỊCH VỤ IT OUTSOURCING • BẢO TRÌ HỆ THỐNG MẠNG DOANH NGHIỆP
          </h1>
          <p class="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            Tiết kiệm tới 60% chi phí so với việc thuê nhân sự IT toàn thời gian. Nhân Phúc Tech đóng vai trò như một phòng IT chuyên nghiệp: bảo trì máy tính, quản trị mạng, máy chủ server và bảo mật dữ liệu 24/7.
          </p>
          <div class="flex flex-wrap items-center gap-4 pt-2 text-xs">
            <a
              href="#survey-form"
              class="px-6 py-3 bg-[#00733c] hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-lg transition transform hover:-translate-y-0.5"
            >
              Yêu Cầu Khảo Sát Tận Nơi (Miễn Phí) &rarr;
            </a>
            <a
              href="tel:0777908179"
              class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition flex items-center gap-2"
            >
              Hotline Tư Vấn Doanh Nghiệp: <strong class="text-amber-300 text-sm">0777908179</strong>
            </a>
          </div>
        </div>

        <div class="lg:col-span-5 grid grid-cols-2 gap-4">
          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 text-center space-y-1">
            <div class="text-3xl font-black text-emerald-400">15 Phút</div>
            <div class="text-xs text-slate-300">Thời gian phản hồi sự cố khẩn cấp</div>
          </div>
          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 text-center space-y-1">
            <div class="text-3xl font-black text-amber-300">99.9%</div>
            <div class="text-xs text-slate-300">Hệ thống mạng & máy chủ Uptime</div>
          </div>
          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 text-center space-y-1">
            <div class="text-3xl font-black text-blue-400">100+</div>
            <div class="text-xs text-slate-300">Doanh nghiệp vừa & nhỏ tin dùng</div>
          </div>
          <div class="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10 text-center space-y-1">
            <div class="text-3xl font-black text-purple-400">Tiết kiệm 60%</div>
            <div class="text-xs text-slate-300">Chi phí vận hành nhân sự IT</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Pricing Packages (3 Gói Dịch Vụ) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span class="text-xs font-bold text-[#00733c] uppercase tracking-wider">Linh Hoạt Theo Quy Mô</span>
        <h2 class="text-2xl sm:text-3xl font-black text-slate-900">CÁC GÓI DỊCH VỤ IT OUTSOURCING NHÂN PHÚC TECH</h2>
        <p class="text-xs text-slate-500">Lựa chọn gói dịch vụ phù hợp với số lượng máy tính và mô hình công ty của bạn.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        <!-- Plan 1: Khởi Nghiệp -->
        <div class="bg-white rounded-3xl p-7 shadow-sm border border-slate-200 hover:shadow-xl transition flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <span class="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-black uppercase rounded-full">
              Khởi Nghiệp (Startup)
            </span>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-black text-slate-900">1.500.000 đ</div>
              <div class="text-xs text-slate-400">/ tháng (Thanh toán định kỳ)</div>
            </div>
            <p class="text-xs text-slate-500">Thích hợp cho văn phòng từ <strong>5 - 10 máy tính</strong>, nhu cầu bảo trì cơ bản.</p>
            <div class="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-700">
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Hỗ trợ Remote từ xa <strong>không giới hạn</strong></div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Kỹ thuật viên Onsite tận nơi <strong>2 lần/tháng</strong></div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Xử lý sự cố máy tính, máy in, mạng wifi</div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Cài đặt hệ điều hành và diệt virus</div>
              <div class="flex items-center gap-2 text-slate-400"><span>✕</span> Quản trị Server & Tường lửa</div>
            </div>
          </div>

          <a
            href="#survey-form"
            class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition text-center block"
          >
            Đăng Ký Gói Này
          </a>
        </div>

        <!-- Plan 2: Tiêu Chuẩn (Best Seller) -->
        <div class="bg-gradient-to-b from-[#014f2b] to-[#00733c] text-white rounded-3xl p-7 shadow-2xl transition flex flex-col justify-between space-y-6 relative transform md:-translate-y-2 border-2 border-emerald-400">
          <div class="absolute -top-3 right-6 bg-red-600 text-white font-black text-[10px] uppercase px-3 py-1 rounded-full shadow">
            Phổ Biến Nhất
          </div>

          <div class="space-y-4">
            <span class="px-3 py-1 bg-white/20 text-emerald-200 text-xs font-black uppercase rounded-full">
              Doanh Nghiệp Tiêu Chuẩn
            </span>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-black text-amber-300">3.500.000 đ</div>
              <div class="text-xs text-emerald-200">/ tháng (Quy mô 10 - 25 máy tính)</div>
            </div>
            <p class="text-xs text-emerald-100">Dành cho công ty có máy chủ dữ liệu kế toán, yêu cầu bảo mật cao.</p>
            <div class="border-t border-white/20 pt-4 space-y-2.5 text-xs text-emerald-50">
              <div class="flex items-center gap-2"><span class="text-amber-300 font-bold">✓</span> Hỗ trợ Remote 24/7 phản hồi <strong>dưới 15 phút</strong></div>
              <div class="flex items-center gap-2"><span class="text-amber-300 font-bold">✓</span> Kỹ thuật viên Onsite định kỳ <strong>4 lần/tháng</strong></div>
              <div class="flex items-center gap-2"><span class="text-amber-300 font-bold">✓</span> <strong>Xử lý khẩn cấp tận nơi</strong> trong 30-45 phút</div>
              <div class="flex items-center gap-2"><span class="text-amber-300 font-bold">✓</span> Quản trị Máy Chủ File Server, NAS Synology</div>
              <div class="flex items-center gap-2"><span class="text-amber-300 font-bold">✓</span> Sao lưu (Backup) tự động dữ liệu hàng tuần</div>
              <div class="flex items-center gap-2"><span class="text-amber-300 font-bold">✓</span> Tối ưu hóa băng thông mạng Lan / Wifi doanh nghiệp</div>
            </div>
          </div>

          <a
            href="#survey-form"
            class="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-lg transition text-center block"
          >
            Đăng Ký Gói Tiêu Chuẩn &rarr;
          </a>
        </div>

        <!-- Plan 3: Doanh Nghiệp Lớn -->
        <div class="bg-white rounded-3xl p-7 shadow-sm border border-slate-200 hover:shadow-xl transition flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <span class="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-black uppercase rounded-full">
              Doanh Nghiệp Lớn (Enterprise)
            </span>
            <div class="space-y-1">
              <div class="text-2xl sm:text-3xl font-black text-slate-900">7.000.000 đ</div>
              <div class="text-xs text-slate-400">/ tháng (Từ 25 - 60+ máy trạm)</div>
            </div>
            <p class="text-xs text-slate-500">Dành cho tập đoàn, chuỗi văn phòng, xí nghiệp sản xuất có hạ tầng mạng phức tạp.</p>
            <div class="border-t border-slate-100 pt-4 space-y-2.5 text-xs text-slate-700">
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Kỹ thuật viên Onsite định kỳ <strong>hàng tuần</strong></div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Có thể bố trí nhân sự túc trực tại văn phòng</div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Cấu hình tường lửa chuyên dụng (Fortinet, Sophos)</div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Thiết lập VPN kết nối chi nhánh bảo mật</div>
              <div class="flex items-center gap-2"><span class="text-emerald-600 font-bold">✓</span> Quản lý tài khoản Mail Server Google / Microsoft 365</div>
            </div>
          </div>

          <a
            href="#survey-form"
            class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition text-center block"
          >
            Liên Hệ Báo Giá Riêng
          </a>
        </div>
      </div>
    </section>

    <!-- 3. What We Do (Hạng Mục Công Việc) -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 space-y-8">
        <h3 class="text-xl sm:text-2xl font-black text-slate-900 text-center">
          HẠNG MỤC CÔNG VIỆC PHÒNG IT NHÂN PHÚC TECH ĐẢM NHẬN
        </h3>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div class="text-2xl">🖥️</div>
            <h4 class="font-bold text-sm text-slate-900">Bảo Trì Máy Tính Trạm & Laptop</h4>
            <p class="text-slate-500 leading-relaxed">
              Vệ sinh phần cứng, xử lý sự cố Windows, cài đặt phần mềm chuyên ngành, dọn dẹp file rác và tăng tốc máy tính cho nhân viên.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div class="text-2xl">🌐</div>
            <h4 class="font-bold text-sm text-slate-900">Quản Trị Mạng Lan & Wifi Diện Rộng</h4>
            <p class="text-slate-500 leading-relaxed">
              Thiết lập Router cân bằng tải, phân tách VLAN cho nhân viên và khách, giải quyết dứt điểm tình trạng nghẽn mạng và rớt sóng.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div class="text-2xl">🗄️</div>
            <h4 class="font-bold text-sm text-slate-900">Quản Trị Máy Chủ & Sao Lưu Dữ Liệu</h4>
            <p class="text-slate-500 leading-relaxed">
              Vận hành Domain Controller, máy chủ chia sẻ tài liệu nội bộ, tự động backup dữ liệu kế toán hàng ngày chống virus tống tiền.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Survey Request Form -->
    <section id="survey-form" class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-100 space-y-6">
        <div class="text-center space-y-2">
          <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider">Khảo Sát Tận Nơi Miễn Phí</span>
          <h2 class="text-2xl sm:text-3xl font-black text-slate-900">ĐĂNG KÝ TƯ VẤN & BÁO GIÁ IT DOANH NGHIỆP</h2>
          <p class="text-xs text-slate-500">Chuyên gia IT của Nhân Phúc Tech sẽ đến tận văn phòng khảo sát và lập phương án tối ưu nhất.</p>
        </div>

        <form @submit.prevent="submitSurvey" class="space-y-4 text-xs">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tên công ty / Doanh nghiệp *</label>
              <input
                v-model="surveyForm.company"
                type="text"
                required
                placeholder="Công ty TNHH ABC"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Người liên hệ *</label>
              <input
                v-model="surveyForm.contactPerson"
                type="text"
                required
                placeholder="Anh / Chị Nguyễn Văn A"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Số điện thoại liên hệ *</label>
              <input
                v-model="surveyForm.phone"
                type="tel"
                required
                placeholder="0912 345 678"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Quy mô số lượng máy tính *</label>
              <select
                v-model="surveyForm.computerCount"
                class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c] font-semibold"
              >
                <option value="under-10">Dưới 10 máy tính</option>
                <option value="10-25">Từ 10 đến 25 máy tính</option>
                <option value="25-50">Từ 25 đến 50 máy tính</option>
                <option value="above-50">Trên 50 máy tính + Máy chủ Server</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Địa chỉ văn phòng công ty</label>
            <input
              v-model="surveyForm.address"
              type="text"
              placeholder="Tòa nhà, số đường, quận..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            />
          </div>

          <div>
            <label class="block font-bold text-slate-700 mb-1">Yêu cầu cụ thể</label>
            <textarea
              v-model="surveyForm.notes"
              rows="3"
              placeholder="Ví dụ: Cần bảo trì định kỳ máy in và máy tính văn phòng, hệ thống wifi hay bị ngắt kết nối..."
              class="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#00733c]"
            ></textarea>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-[#00733c] hover:bg-[#014f2b] text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
          >
            GỬI YÊU CẦU KHẢO SÁT MIỄN PHÍ &rarr;
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const surveyForm = ref({
  company: '',
  contactPerson: '',
  phone: '',
  computerCount: '10-25',
  address: '',
  notes: ''
});

const submitSurvey = () => {
  ElMessage.success({
    message: `Cảm ơn ${surveyForm.value.contactPerson}! Chuyên gia IT Nhân Phúc Tech sẽ liên hệ khảo sát trong ngày.`,
    duration: 3500
  });
  surveyForm.value = {
    company: '',
    contactPerson: '',
    phone: '',
    computerCount: '10-25',
    address: '',
    notes: ''
  };
};
</script>
