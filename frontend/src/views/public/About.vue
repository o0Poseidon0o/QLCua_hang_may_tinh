<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
    <!-- Hero Intro -->
    <div class="bg-gradient-to-br from-slate-900 via-[#014f2b] to-emerald-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center gap-8">
      <div class="bg-white p-5 rounded-2xl shadow-lg flex-shrink-0">
        <img :src="logoImg" alt="Nhân Phúc Tech Logo" class="w-28 h-28 object-contain" />
      </div>
      <div class="space-y-3 text-center md:text-left">
        <span class="inline-block px-3.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider rounded-full border border-emerald-500/30">
          Về Chúng Tôi
        </span>
        <h1 class="text-2xl sm:text-4xl font-black leading-tight">
          CÔNG TY CÔNG NGHỆ NHÂN PHÚC TECH
        </h1>
        <p class="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
          Chào mừng đến với <strong>Nhân Phúc Tech</strong> — đơn vị chuyên cung cấp Laptop, PC Gaming, Máy trạm Đồ họa, Linh kiện vi tính chính hãng và Dịch vụ kỹ thuật &amp; IT Outsourcing toàn diện tại TP.HCM.
        </p>
      </div>
    </div>

    <!-- Story & Mission -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div class="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-6 text-sm text-slate-600 leading-relaxed">
        <div>
          <h2 class="text-xl font-black text-slate-900 mb-3 border-l-4 border-[#00733c] pl-3">
            Câu Chuyện Thương Hiệu
          </h2>
          <p>
            Thành lập từ năm 2018, <strong>Nhân Phúc Tech</strong> tự hào mang đến cho khách hàng cá nhân, game thủ và doanh nghiệp những sản phẩm công nghệ chính hãng 100%, đi kèm với dịch vụ hậu mãi chuẩn mực và chuyên nghiệp nhất. Đội ngũ của chúng tôi bao gồm các kỹ sư IT giàu kinh nghiệm, đam mê công nghệ và luôn đặt chữ "Tâm" lên hàng đầu.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-black text-slate-900 mb-3 border-l-4 border-[#00733c] pl-3">
            Tầm Nhìn &amp; Sứ Mệnh
          </h2>
          <p>
            Trở thành đối tác công nghệ đáng tin cậy hàng đầu của mọi khách hàng và doanh nghiệp, giúp quá trình trang bị phần cứng, chuyển đổi số và vận hành hệ thống IT trở nên trơn tru, bảo mật và tiết kiệm chi phí tối đa.
          </p>
        </div>

        <div>
          <h2 class="text-xl font-black text-slate-900 mb-4 border-l-4 border-[#00733c] pl-3">
            Tại Sao Chọn Nhân Phúc Tech?
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
              <div class="text-2xl">🛡️</div>
              <h4 class="font-bold text-slate-900 text-sm">Chất lượng đảm bảo</h4>
              <p class="text-xs text-slate-500">Tất cả sản phẩm linh kiện bán ra đều nguyên seal, chính hãng 100%, bảo hành uy tín.</p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
              <div class="text-2xl">👨‍🔧</div>
              <h4 class="font-bold text-slate-900 text-sm">Tận tâm &amp; Chuyên nghiệp</h4>
              <p class="text-xs text-slate-500">Hỗ trợ kỹ thuật 24/7 đối với khách hàng cá nhân và doanh nghiệp sử dụng dịch vụ IT Outsourcing.</p>
            </div>
            <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-1.5">
              <div class="text-2xl">💰</div>
              <h4 class="font-bold text-slate-900 text-sm">Giá cả cạnh tranh</h4>
              <p class="text-xs text-slate-500">Cam kết mức giá hợp lý nhất thị trường đi kèm quà tặng và gói vệ sinh máy 2 năm miễn phí.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Card -->
      <div class="lg:col-span-4 space-y-6">
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-base font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Thông Tin Liên Hệ
          </h3>
          <div class="space-y-3 text-xs text-slate-600">
            <div>
              <span class="font-bold text-slate-800 block">Địa chỉ Showroom &amp; Trung tâm Kỹ thuật:</span>
              179 Nơ Trang Long, Phường Bình Thạnh, TP.HCM
            </div>
            <div>
              <span class="font-bold text-slate-800 block">Hotline Tư vấn &amp; Kỹ thuật:</span>
              <a href="tel:0777908179" class="text-base font-black text-[#00733c]">0777908179</a> (8h00 - 21h30)
            </div>
            <div>
              <span class="font-bold text-slate-800 block">Email:</span>
              sales@nhanphuctech.vn • support@nhanphuctech.vn
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <router-link
              to="/shop"
              class="w-full py-2.5 bg-[#00733c] hover:bg-[#014f2b] text-white font-bold text-xs rounded-xl text-center transition"
            >
              Khám Phá Cửa Hàng &rarr;
            </router-link>
            <router-link
              to="/services/it-outsourcing"
              class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl text-center transition"
            >
              Dịch Vụ IT Doanh Nghiệp
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import logoImg from '../../assets/logo/logo.png';
</script>
