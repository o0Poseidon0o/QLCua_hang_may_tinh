<template>
  <el-container class="min-h-screen">
    <!-- Sidebar (desktop / laptop) -->
    <el-aside width="250px" class="!hidden lg:!flex bg-[#0b1f16] text-white flex-col border-r border-emerald-900/40 sticky top-0 h-screen">
      <router-link
        to="/"
        class="p-4 flex items-center gap-3 border-b border-emerald-900/40 bg-white hover:bg-emerald-50 transition"
      >
        <img :src="logoImg" alt="Nhân Phúc Tech Logo" class="h-10 w-auto object-contain" />
        <div class="leading-tight">
          <div class="text-base font-extrabold text-[#014f2b]">
            Nhân Phúc <span class="text-emerald-600">Tech</span>
          </div>
          <div class="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            ERP &amp; Quản Trị Nội Bộ
          </div>
        </div>
      </router-link>

      <!-- Thông tin nhân sự đang đăng nhập ở Sidebar -->
      <div v-if="authStore.currentUser" class="px-4 py-3.5 bg-[#07160f] border-b border-emerald-900/40">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-full bg-[#00733c] text-white font-extrabold flex items-center justify-center text-xs flex-shrink-0">
            {{ userInitials }}
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold text-white truncate">
              {{ authStore.currentUser.fullName }}
            </div>
            <div class="text-[11px] text-emerald-400 truncate">
              @{{ authStore.currentUser.username }} • {{ authStore.currentUser.department }}
            </div>
          </div>
        </div>
        <div class="mt-2">
          <span class="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {{ roleLabel }}
          </span>
        </div>
      </div>

      <!-- Menu điều hướng theo phân quyền -->
      <el-menu
        active-text-color="#34d399"
        background-color="#0b1f16"
        text-color="#cbd5e1"
        class="border-none flex-1 py-2 overflow-y-auto"
        :default-active="$route.path"
        router
      >
        <el-menu-item v-for="item in visibleMenu" :key="item.path" :index="item.path">
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>

      <!-- Nút đăng xuất dưới đáy Sidebar -->
      <div class="p-3 border-t border-emerald-900/40 bg-[#07160f]">
        <button
          type="button"
          @click="handleLogout"
          class="w-full py-2 px-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 text-red-300 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
        >
          <el-icon><SwitchButton /></el-icon>
          <span>Đăng xuất tài khoản</span>
        </button>
      </div>
    </el-aside>

    <!-- Sidebar dạng Drawer cho iPad / Mobile -->
    <el-drawer
      v-model="mobileNavOpen"
      direction="ltr"
      size="280px"
      :with-header="false"
      class="admin-mobile-drawer"
    >
      <div class="flex flex-col h-full bg-[#0b1f16] text-white">
        <div class="p-4 flex items-center gap-3 bg-white">
          <img :src="logoImg" alt="Logo" class="h-9 w-auto" />
          <div class="leading-tight flex-1 min-w-0">
            <div class="text-sm font-extrabold text-[#014f2b]">Nhân Phúc <span class="text-emerald-600">Tech</span></div>
            <div class="text-[10px] font-semibold uppercase text-slate-400 truncate">{{ authStore.currentUser?.fullName }}</div>
          </div>
        </div>
        <el-menu
          active-text-color="#34d399"
          background-color="#0b1f16"
          text-color="#cbd5e1"
          class="border-none flex-1 py-2 overflow-y-auto"
          :default-active="$route.path"
          router
          @select="mobileNavOpen = false"
        >
          <el-menu-item v-for="item in visibleMenu" :key="item.path" :index="item.path">
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </el-menu>
        <div class="p-3 border-t border-emerald-900/40 bg-[#07160f]">
          <button
            type="button"
            @click="handleLogout"
            class="w-full py-2 px-3 rounded-xl bg-red-500/15 text-red-300 text-xs font-bold flex items-center justify-center gap-2"
          >
            <el-icon><SwitchButton /></el-icon> Đăng xuất
          </button>
        </div>
      </div>
    </el-drawer>

    <!-- Main Content -->
    <el-container class="min-w-0">
      <el-header class="bg-white border-b border-gray-200 flex items-center justify-between !px-3 sm:!px-6 shadow-xs sticky top-0 z-30 gap-2">
        <div class="flex items-center gap-2 min-w-0">
          <button
            type="button"
            class="lg:hidden p-2 -ml-1 rounded-lg text-slate-700 hover:bg-slate-100"
            @click="mobileNavOpen = true"
            aria-label="Mở menu quản trị"
          >
            <el-icon :size="20"><Menu /></el-icon>
          </button>
          <h2 class="text-sm sm:text-lg font-extrabold text-slate-800 truncate">
            <span class="hidden md:inline">Quản trị Hệ thống (ERP) - </span>Nhân Phúc Tech
          </h2>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <router-link
            to="/"
            class="text-xs font-bold text-[#00733c] border border-[#00733c] px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition whitespace-nowrap"
          >
            &larr; <span class="hidden sm:inline">Xem </span>Website
          </router-link>

          <el-dropdown @command="handleDropdownCommand">
            <span class="flex items-center cursor-pointer text-slate-700 hover:text-[#00733c] transition bg-slate-50 px-2 sm:px-3 py-1.5 rounded-xl border border-slate-200">
              <el-avatar size="small" class="sm:mr-2 !bg-[#00733c] font-bold">
                {{ userInitials }}
              </el-avatar>
              <span class="hidden sm:inline text-xs font-bold max-w-[140px] truncate">
                {{ authStore.currentUser?.fullName || 'Quản trị viên' }}
              </span>
              <el-icon class="ml-1.5 hidden sm:inline-flex"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  Hồ sơ &amp; Đổi mật khẩu
                </el-dropdown-item>
                <el-dropdown-item v-if="authStore.hasPermission('users')" command="users">
                  Quản lý Nhân sự &amp; Phân quyền
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <span class="text-red-600 font-semibold">Đăng xuất</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="bg-[#f6f8fb] !p-3 sm:!p-5 lg:!p-6 overflow-x-hidden">
        <router-view />
      </el-main>
    </el-container>

    <!-- Dialog Hồ sơ cá nhân & Đổi mật khẩu -->
    <el-dialog v-model="profileDialogVisible" title="Hồ sơ cá nhân & Đổi mật khẩu" width="440px">
      <div v-if="authStore.currentUser" class="space-y-4">
        <div class="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
          <div>Họ và tên: <strong class="text-slate-800">{{ authStore.currentUser.fullName }}</strong></div>
          <div>Tài khoản: <strong class="font-mono text-[#00733c]">{{ authStore.currentUser.username }}</strong></div>
          <div>Bộ phận: <strong>{{ authStore.currentUser.department }}</strong></div>
          <div>Vai trò: <strong>{{ roleLabel }}</strong></div>
        </div>

        <el-form label-position="top">
          <el-form-item label="Mật khẩu mới">
            <el-input
              v-model="newPassword"
              type="password"
              show-password
              placeholder="Nhập mật khẩu mới..."
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="profileDialogVisible = false">Đóng</el-button>
        <el-button type="success" color="#00733c" @click="saveNewPassword">
          Cập nhật mật khẩu
        </el-button>
      </template>
    </el-dialog>
  </el-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
  DataBoard,
  Goods,
  Box,
  Document,
  ArrowDown,
  Collection,
  ShoppingCartFull,
  SetUp,
  UserFilled,
  SwitchButton,
  OfficeBuilding,
  Reading,
  InfoFilled,
  Menu,
  PictureFilled,
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useAuthStore, ROLE_DEFINITIONS, type PermissionKey } from '../stores/auth';
import logoImg from '../assets/logo/logo.png';

const router = useRouter();
const authStore = useAuthStore();

const profileDialogVisible = ref(false);
const newPassword = ref('');
const mobileNavOpen = ref(false);

// Danh sách menu quản trị (lọc theo phân quyền)
const menuItems: { perm: PermissionKey; path: string; label: string; icon: any }[] = [
  { perm: 'dashboard', path: '/admin', label: 'Tổng quan (Dashboard)', icon: DataBoard },
  { perm: 'orders', path: '/admin/orders', label: 'Đơn hàng & Bán hàng', icon: ShoppingCartFull },
  { perm: 'products', path: '/admin/products', label: 'Sản phẩm & Thông số', icon: Goods },
  { perm: 'categories', path: '/admin/categories', label: 'Danh mục Hàng hóa', icon: Collection },
  { perm: 'inventory', path: '/admin/inventory', label: 'Kho hàng & Tồn kho', icon: Box },
  { perm: 'services', path: '/admin/services', label: 'Sửa chữa & Bảng giá', icon: SetUp },
  { perm: 'banners', path: '/admin/banners', label: 'Banner & Flash Sale', icon: PictureFilled },
  { perm: 'it_outsourcing', path: '/admin/it-outsourcing', label: 'IT Outsourcing & Giá', icon: OfficeBuilding },
  { perm: 'news', path: '/admin/news', label: 'Tin tức & Cẩm nang', icon: Reading },
  { perm: 'about', path: '/admin/about', label: 'Về Nhân Phúc Tech', icon: InfoFilled },
  { perm: 'cms', path: '/admin/cms', label: 'Trang Chính sách (CMS)', icon: Document },
  { perm: 'users', path: '/admin/users', label: 'Nhân sự & Phân quyền', icon: UserFilled },
];

const visibleMenu = computed(() => menuItems.filter((m) => authStore.hasPermission(m.perm)));

const userInitials = computed(() => {
  const name = authStore.currentUser?.fullName || 'NP';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
});

const roleLabel = computed(() => {
  const role = authStore.currentUser?.role;
  return role ? ROLE_DEFINITIONS[role]?.label : 'Nhân viên';
});

const handleLogout = () => {
  authStore.logout();
  ElMessage.info('Đã đăng xuất khỏi hệ thống quản trị');
  router.push('/admin/login');
};

const handleDropdownCommand = (cmd: string) => {
  if (cmd === 'logout') {
    handleLogout();
  } else if (cmd === 'profile') {
    newPassword.value = authStore.currentUser?.password || '';
    profileDialogVisible.value = true;
  } else if (cmd === 'users') {
    router.push('/admin/users');
  }
};

const saveNewPassword = () => {
  if (!newPassword.value.trim()) {
    ElMessage.warning('Mật khẩu không được để trống!');
    return;
  }
  if (authStore.currentUser) {
    authStore.updateStaff(authStore.currentUser.id, { password: newPassword.value.trim() });
    ElMessage.success('Đã cập nhật mật khẩu thành công!');
    profileDialogVisible.value = false;
  }
};
</script>

<style scoped>
.el-menu-item {
  font-weight: 600;
  margin: 2px 10px;
  border-radius: 10px;
  height: 44px;
}
.el-menu-item.is-active {
  background-color: rgba(16, 185, 129, 0.15) !important;
}
</style>

<style>
.admin-mobile-drawer .el-drawer__body {
  padding: 0;
}
</style>
