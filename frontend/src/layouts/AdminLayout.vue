<template>
  <el-container class="min-h-screen">
    <!-- Sidebar -->
    <el-aside width="265px" class="bg-[#0b1f16] text-white flex flex-col border-r border-emerald-900/40">
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
            ERP & Quản Trị Nội Bộ
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
        class="border-none flex-1 py-2"
        :default-active="$route.path"
        router
      >
        <el-menu-item v-if="authStore.hasPermission('dashboard')" index="/admin">
          <el-icon><DataBoard /></el-icon>
          <span>Tổng quan (Dashboard)</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('orders')" index="/admin/orders">
          <el-icon><ShoppingCartFull /></el-icon>
          <span>Đơn hàng & Bán hàng</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('products')" index="/admin/products">
          <el-icon><Goods /></el-icon>
          <span>Sản phẩm & Giá bán</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('categories')" index="/admin/categories">
          <el-icon><Collection /></el-icon>
          <span>Danh mục Hàng hóa</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('inventory')" index="/admin/inventory">
          <el-icon><Box /></el-icon>
          <span>Kho hàng & Tồn kho</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('services')" index="/admin/services">
          <el-icon><SetUp /></el-icon>
          <span>Phiếu Sửa chữa & BH</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('it_outsourcing')" index="/admin/it-outsourcing">
          <el-icon><OfficeBuilding /></el-icon>
          <span>IT Outsourcing & Giá</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('news')" index="/admin/news">
          <el-icon><Reading /></el-icon>
          <span>Tin tức & Cẩm nang</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('about')" index="/admin/about">
          <el-icon><InfoFilled /></el-icon>
          <span>Về Nhân Phúc Tech</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('cms')" index="/admin/cms">
          <el-icon><Document /></el-icon>
          <span>Trang Chính sách (CMS)</span>
        </el-menu-item>

        <el-menu-item v-if="authStore.hasPermission('users')" index="/admin/users">
          <el-icon><UserFilled /></el-icon>
          <span>Nhân sự & Phân quyền</span>
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

    <!-- Main Content -->
    <el-container>
      <el-header class="bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-xs">
        <div class="flex items-center gap-3">
          <h2 class="text-lg font-extrabold text-slate-800">
            Quản trị Hệ thống (ERP) - Nhân Phúc Tech
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <router-link
            to="/"
            class="text-xs font-bold text-[#00733c] border border-[#00733c] px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition"
          >
            &larr; Xem Website
          </router-link>

          <el-dropdown @command="handleDropdownCommand">
            <span class="flex items-center cursor-pointer text-slate-700 hover:text-[#00733c] transition bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              <el-avatar size="small" class="mr-2 !bg-[#00733c] font-bold">
                {{ userInitials }}
              </el-avatar>
              <span class="text-xs font-bold">
                {{ authStore.currentUser?.fullName || 'Quản trị viên' }}
              </span>
              <el-icon class="ml-1.5"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  Hồ sơ & Đổi mật khẩu
                </el-dropdown-item>
                <el-dropdown-item v-if="authStore.hasPermission('users')" command="users">
                  Quản lý Nhân sự & Phân quyền
                </el-dropdown-item>
                <el-dropdown-item divided command="logout">
                  <span class="text-red-600 font-semibold">Đăng xuất</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="bg-[#f6f8fb] p-6">
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
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useAuthStore, ROLE_DEFINITIONS } from '../stores/auth';
import logoImg from '../assets/logo/logo.png';

const router = useRouter();
const authStore = useAuthStore();

const profileDialogVisible = ref(false);
const newPassword = ref('');

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
