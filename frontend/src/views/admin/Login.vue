<template>
  <div class="min-h-screen bg-gradient-to-br from-[#071f13] via-[#014f2b] to-[#0b291b] flex items-center justify-center p-4">
    <div class="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-emerald-500/20">
      <!-- Cột trái: Thông tin hệ thống ERP & Tài khoản Demo -->
      <div class="lg:col-span-6 bg-[#0b1f16] text-white p-8 flex flex-col justify-between relative overflow-hidden">
        <div class="relative z-10">
          <router-link to="/" class="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 px-4 py-2.5 rounded-2xl transition mb-6">
            <img :src="logoImg" alt="Nhân Phúc Tech" class="h-10 w-auto bg-white rounded-lg p-1" />
            <div>
              <div class="font-extrabold text-lg leading-tight text-white">
                Nhân Phúc <span class="text-emerald-400">Tech</span>
              </div>
              <div class="text-[10px] uppercase tracking-widest text-emerald-300 font-semibold">
                ERP & Quản Trị Nội Bộ
              </div>
            </div>
          </router-link>

          <h1 class="text-2xl font-extrabold mb-2 text-white">
            Hệ Thống Quản Trị Phân Quyền Đa Nhân Sự
          </h1>
          <p class="text-xs text-slate-300 leading-relaxed mb-6">
            Quản lý đồng bộ Sản phẩm, Danh mục, Kho linh kiện, Đơn hàng, Phiếu sửa chữa bảo hành, Nội dung CMS và Phân quyền nhân viên theo từng phòng ban.
          </p>

          <!-- Danh sách tài khoản mẫu để chọn nhanh -->
          <div class="bg-white/5 border border-emerald-500/20 rounded-2xl p-4">
            <div class="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center justify-between">
              <span>Chọn nhanh tài khoản theo bộ phận</span>
              <span class="text-[11px] text-slate-400 font-normal">Mật khẩu chung: <strong class="text-amber-300">123</strong></span>
            </div>

            <div class="space-y-2">
              <button
                v-for="acc in demoAccounts"
                :key="acc.username"
                type="button"
                @click="fillAccount(acc.username, '123')"
                class="w-full text-left px-3 py-2 rounded-xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-400/50 transition flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div class="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center gap-2">
                    <span>{{ acc.roleLabel }}</span>
                    <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono">
                      {{ acc.username }}
                    </span>
                  </div>
                  <div class="text-[11px] text-slate-400 mt-0.5">{{ acc.desc }}</div>
                </div>
                <span class="text-xs text-emerald-400 font-semibold opacity-80 group-hover:opacity-100">
                  Chọn &rarr;
                </span>
              </button>
            </div>
          </div>
        </div>

        <div class="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <span>Hotline kỹ thuật: <strong class="text-emerald-400">0777 908 179</strong></span>
          <router-link to="/" class="text-emerald-300 hover:underline font-semibold">
            &larr; Quay về Trang chủ
          </router-link>
        </div>
      </div>

      <!-- Cột phải: Form đăng nhập -->
      <div class="lg:col-span-6 p-8 sm:p-10 flex flex-col justify-center bg-white">
        <div class="mb-7">
          <span class="inline-block px-3 py-1 rounded-full bg-emerald-50 text-[#00733c] text-xs font-bold mb-2">
            ĐĂNG NHẬP HỆ THỐNG
          </span>
          <h2 class="text-2xl font-extrabold text-slate-800">Chào mừng trở lại!</h2>
          <p class="text-sm text-slate-500 mt-1">
            Vui lòng nhập tài khoản nhân sự để truy cập trang quản trị.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Tên đăng nhập (Username)
            </label>
            <el-input
              v-model="username"
              size="large"
              placeholder="Ví dụ: admin, kinhdoanh, khovan, kythuat..."
              clearable
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Mật khẩu (Password)
            </label>
            <el-input
              v-model="password"
              type="password"
              size="large"
              show-password
              placeholder="Nhập mật khẩu..."
              @keyup.enter="handleLogin"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </div>

          <div v-if="errorMsg" class="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
            {{ errorMsg }}
          </div>

          <button
            type="submit"
            class="w-full py-3.5 px-6 rounded-xl bg-[#00733c] hover:bg-[#014f2b] text-white font-bold text-sm shadow-lg hover:shadow-xl transition cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Đăng Nhập Quản Trị</span>
            <span>&rarr;</span>
          </button>
        </form>

        <div class="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-500 space-y-1">
          <div class="font-bold text-slate-700">Lưu ý phân quyền bảo mật:</div>
          <p>
            Mỗi bộ phận sẽ chỉ nhìn thấy và thao tác được trên các danh mục chức năng đã được Giám đốc / Quản trị cao cấp phân quyền.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { User, Lock } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { useAuthStore } from '../../stores/auth';
import logoImg from '../../assets/logo/logo.png';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const username = ref('admin');
const password = ref('123');
const errorMsg = ref('');

const demoAccounts = [
  {
    username: 'admin',
    roleLabel: '👑 Giám đốc / Super Admin',
    desc: 'Toàn quyền hệ thống, Quản lý Nhân sự & Phân quyền',
  },
  {
    username: 'kinhdoanh',
    roleLabel: '💼 NV Kinh doanh & Bán hàng',
    desc: 'Quản lý Đơn hàng, Sản phẩm, Tra cứu bảo hành',
  },
  {
    username: 'khovan',
    roleLabel: '📦 Quản lý Kho vận',
    desc: 'Nhập/Xuất Kho hàng, Sản phẩm, Danh mục',
  },
  {
    username: 'kythuat',
    roleLabel: '🛠️ Kỹ thuật viên Sửa chữa & IT',
    desc: 'Phiếu sửa chữa, Bảo hành & Linh kiện kho',
  },
  {
    username: 'marketing',
    roleLabel: '✍️ Biên tập viên Nội dung (CMS)',
    desc: 'Quản trị bài viết, Chính sách CMS, Sản phẩm',
  },
];

const fillAccount = (user: string, pass: string) => {
  username.value = user;
  password.value = pass;
  errorMsg.value = '';
  handleLogin();
};

const handleLogin = () => {
  errorMsg.value = '';
  if (!username.value.trim() || !password.value) {
    errorMsg.value = 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!';
    return;
  }

  const res = authStore.login(username.value, password.value);
  if (!res.ok) {
    errorMsg.value = res.message;
    return;
  }

  ElMessage.success(res.message);
  const redirectPath = (route.query.redirect as string) || '/admin';
  router.push(redirectPath);
};
</script>

