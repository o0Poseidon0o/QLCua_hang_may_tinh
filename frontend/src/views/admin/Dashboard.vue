<template>
  <div class="space-y-6">
    <!-- Banner Chào mừng nhân sự -->
    <div class="bg-gradient-to-r from-[#014f2b] to-[#00733c] text-white rounded-3xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="text-xs font-bold uppercase tracking-wider text-emerald-200 mb-1">
          HỆ THỐNG QUẢN TRỊ ERP - NHÂN PHÚC TECH
        </div>
        <h1 class="text-2xl font-extrabold">
          Xin chào, {{ authStore.currentUser?.fullName || 'Quản trị viên' }}!
        </h1>
        <p class="text-xs text-emerald-100 mt-1">
          Bộ phận: <strong>{{ authStore.currentUser?.department }}</strong> • Vai trò:
          <strong class="text-amber-300">{{ roleLabel }}</strong>
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <router-link
          v-if="authStore.hasPermission('orders')"
          to="/admin/orders"
          class="px-4 py-2 rounded-xl bg-white text-[#014f2b] font-bold text-xs hover:bg-emerald-50 transition shadow-sm"
        >
          Xem Đơn hàng mới
        </router-link>
        <router-link
          v-if="authStore.hasPermission('users')"
          to="/admin/users"
          class="px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-400/40 text-white font-bold text-xs hover:bg-emerald-900 transition"
        >
          Phân quyền Nhân sự
        </router-link>
      </div>
    </div>

    <!-- 4 Thẻ chỉ số chính -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs border-t-4 border-t-[#00733c]">
        <div class="text-xs font-bold text-slate-400 uppercase">Doanh thu tạm tính</div>
        <div class="text-2xl font-extrabold text-[#00733c] mt-2">142.830.000 ₫</div>
        <div class="text-xs text-emerald-600 font-semibold mt-1">+18.4% so với tuần trước</div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs border-t-4 border-t-blue-600">
        <div class="text-xs font-bold text-slate-400 uppercase">Đơn hàng PC / Laptop</div>
        <div class="text-2xl font-extrabold text-blue-600 mt-2">24 đơn hàng</div>
        <div class="text-xs text-slate-500 mt-1">3 đơn đang chờ xác nhận & lắp ráp</div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs border-t-4 border-t-amber-500">
        <div class="text-xs font-bold text-slate-400 uppercase">Phiếu Kỹ thuật & Bảo hành</div>
        <div class="text-2xl font-extrabold text-amber-600 mt-2">15 phiếu</div>
        <div class="text-xs text-slate-500 mt-1">Sửa chữa Laptop/PC & IT Outsourcing</div>
      </div>

      <div class="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs border-t-4 border-t-purple-600">
        <div class="text-xs font-bold text-slate-400 uppercase">Nhân sự Hệ thống</div>
        <div class="text-2xl font-extrabold text-purple-600 mt-2">
          {{ authStore.staffList.length }} tài khoản
        </div>
        <div class="text-xs text-slate-500 mt-1">Phân quyền theo 5 bộ phận chuyên trách</div>
      </div>
    </div>

    <!-- Danh mục các phân hệ được cấp quyền cho tài khoản hiện tại -->
    <div>
      <h2 class="text-lg font-extrabold text-slate-800 mb-3">
        Danh mục Chức năng được Phân quyền của bạn
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <router-link
          v-for="mod in accessibleModules"
          :key="mod.path"
          :to="mod.path"
          class="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#00733c] hover:shadow-md transition group flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-2xl">{{ mod.icon }}</span>
              <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Đã cấp quyền
              </span>
            </div>
            <div class="font-bold text-slate-800 group-hover:text-[#00733c] transition">
              {{ mod.title }}
            </div>
            <p class="text-xs text-slate-500 mt-1 leading-relaxed">
              {{ mod.desc }}
            </p>
          </div>
          <div class="mt-4 text-xs font-bold text-[#00733c] flex items-center gap-1">
            <span>Truy cập quản lý</span>
            <span>&rarr;</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore, ROLE_DEFINITIONS, type PermissionKey } from '../../stores/auth';

const authStore = useAuthStore();

const roleLabel = computed(() => {
  const role = authStore.currentUser?.role;
  return role ? ROLE_DEFINITIONS[role]?.label : 'Quản trị viên';
});

const allModules: { perm: PermissionKey; title: string; desc: string; path: string; icon: string }[] = [
  {
    perm: 'orders',
    title: 'Đơn hàng & Bán hàng',
    desc: 'Duyệt đơn đặt mua Laptop, PC Gaming, Linh kiện và theo dõi vận chuyển.',
    path: '/admin/orders',
    icon: '🛒',
  },
  {
    perm: 'products',
    title: 'Sản phẩm & Thông số kỹ thuật',
    desc: 'Thêm/sửa/xóa sản phẩm, bảng thông số kỹ thuật chi tiết, đặc điểm nổi bật, thư viện ảnh & ưu đãi.',
    path: '/admin/products',
    icon: '💻',
  },
  {
    perm: 'categories',
    title: 'Danh mục Hàng hóa',
    desc: 'Cấu hình cây danh mục Laptop, PC Gaming, Linh kiện, Màn hình & Gear.',
    path: '/admin/categories',
    icon: '🗂️',
  },
  {
    perm: 'inventory',
    title: 'Kho hàng & Tồn kho',
    desc: 'Nhập kho, điều chỉnh số lượng tồn và cảnh báo mã linh kiện sắp hết hàng.',
    path: '/admin/inventory',
    icon: '📦',
  },
  {
    perm: 'services',
    title: 'Sửa chữa & Bảng giá Dịch vụ',
    desc: 'Cập nhật bảng giá sửa chữa Laptop/PC/Điện thoại theo thời điểm, nội dung dịch vụ & phiếu kỹ thuật.',
    path: '/admin/services',
    icon: '🛠️',
  },
  {
    perm: 'banners',
    title: 'Banner & Giờ Vàng Giá Sốc',
    desc: 'Chỉnh sửa Slide Banner chính, khối Giờ Vàng Giá Sốc (Flash Sale), 2 Banner phụ & khối CTA.',
    path: '/admin/banners',
    icon: '⚡',
  },
  {
    perm: 'it_outsourcing',
    title: 'IT Outsourcing & Bảng giá',
    desc: 'Cập nhật giá các gói IT Outsourcing doanh nghiệp, hạng mục công việc & yêu cầu khảo sát.',
    path: '/admin/it-outsourcing',
    icon: '💼',
  },
  {
    perm: 'news',
    title: 'Tin tức & Cẩm nang',
    desc: 'Đăng bài viết mới, chỉnh sửa cẩm nang máy tính, đánh giá linh kiện & tư vấn cấu hình.',
    path: '/admin/news',
    icon: '📰',
  },
  {
    perm: 'about',
    title: 'Về Nhân Phúc Tech',
    desc: 'Chỉnh sửa câu chuyện thương hiệu, sứ mệnh, giá trị cốt lõi & thông tin liên hệ Showroom.',
    path: '/admin/about',
    icon: '🏢',
  },
  {
    perm: 'cms',
    title: 'Trang Chính sách (CMS)',
    desc: 'Quản trị các trang chính sách bảo hành, đổi trả, giao hàng và trả góp 0%.',
    path: '/admin/cms',
    icon: '📝',
  },
  {
    perm: 'users',
    title: 'Nhân sự & Phân quyền',
    desc: 'Cấp tài khoản (User/Password) và phân quyền chi tiết cho nhân sự các phòng ban.',
    path: '/admin/users',
    icon: '👥',
  },
];

const accessibleModules = computed(() => {
  return allModules.filter((m) => authStore.hasPermission(m.perm));
});
</script>
