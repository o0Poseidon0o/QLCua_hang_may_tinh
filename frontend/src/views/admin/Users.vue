<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Quản lý Nhân sự & Phân quyền</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Cấp phát tài khoản (Username / Password) và phân quyền chức năng theo từng vị trí nhân sự tại Nhân Phúc Tech.
        </p>
      </div>
      <el-button type="success" color="#00733c" size="large" @click="openCreateDialog">
        + Thêm Nhân sự mới
      </el-button>
    </div>

    <!-- Thẻ tổng quan các nhóm vai trò -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <div
        v-for="role in roleList"
        :key="role.code"
        class="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition"
      >
        <div class="flex items-center justify-between mb-2">
          <el-tag :type="role.badgeType" effect="dark" size="small" class="font-bold">
            {{ role.code }}
          </el-tag>
          <span class="text-xs font-bold text-slate-500">
            {{ countByRole(role.code) }} nhân sự
          </span>
        </div>
        <div class="font-bold text-sm text-slate-800 mb-1">{{ role.label }}</div>
        <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">{{ role.description }}</p>
      </div>
    </div>

    <!-- Thanh tìm kiếm & bộ lọc -->
    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="flex flex-wrap items-center gap-3">
          <el-input
            v-model="searchQuery"
            placeholder="Tìm theo họ tên, username, số điện thoại..."
            clearable
            class="w-72"
          />
          <el-select v-model="filterRole" placeholder="Lọc theo vai trò" clearable class="w-56">
            <el-option label="Tất cả vai trò" value="" />
            <el-option
              v-for="r in roleList"
              :key="r.code"
              :label="r.label"
              :value="r.code"
            />
          </el-select>
        </div>
        <div class="text-xs text-slate-500">
          Tổng số: <strong class="text-slate-800">{{ filteredStaff.length }}</strong> tài khoản nhân sự
        </div>
      </div>

      <!-- Bảng danh sách nhân sự -->
      <el-table :data="filteredStaff" border stripe style="width: 100%">
        <el-table-column label="Nhân sự" min-width="210">
          <template #default="{ row }">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-emerald-100 text-[#00733c] font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                {{ getInitials(row.fullName) }}
              </div>
              <div>
                <div class="font-bold text-slate-800 text-sm">{{ row.fullName }}</div>
                <div class="text-xs text-slate-400">{{ row.department }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Tài khoản / Mật khẩu" width="190">
          <template #default="{ row }">
            <div class="text-xs">
              <div>
                User: <span class="font-mono font-bold text-[#00733c] bg-emerald-50 px-1.5 py-0.5 rounded">{{ row.username }}</span>
              </div>
              <div class="mt-1 text-slate-500 flex items-center gap-1.5">
                <span>Pass:</span>
                <span class="font-mono font-semibold text-slate-700">
                  {{ visiblePasswords[row.id] ? row.password : '••••••' }}
                </span>
                <button
                  type="button"
                  @click="toggleShowPassword(row.id)"
                  class="text-[11px] text-emerald-600 hover:underline cursor-pointer ml-1"
                >
                  {{ visiblePasswords[row.id] ? 'Ẩn' : 'Hiện' }}
                </button>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Vai trò (Role)" width="200">
          <template #default="{ row }">
            <el-tag :type="ROLE_DEFINITIONS[row.role as AdminRole]?.badgeType || 'info'" effect="light" class="font-bold">
              {{ ROLE_DEFINITIONS[row.role as AdminRole]?.label || row.role }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Quyền truy cập chức năng" min-width="260">
          <template #default="{ row }">
            <div class="flex flex-wrap gap-1">
              <span
                v-for="perm in row.permissions"
                :key="perm"
                class="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium"
              >
                {{ getPermName(perm) }}
              </span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Liên hệ" width="180">
          <template #default="{ row }">
            <div class="text-xs text-slate-600">
              <div class="font-medium">{{ row.phone }}</div>
              <div class="text-slate-400 truncate">{{ row.email }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Trạng thái" width="130" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'" size="small">
              {{ row.status === 'active' ? 'Hoạt động' : 'Đã khóa' }}
            </el-tag>
            <div class="text-[10px] text-slate-400 mt-1">{{ row.lastLogin || 'Chưa đăng nhập' }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Thao tác" width="210" align="right" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" plain @click="openEditDialog(row)">
              Sửa / Quyền
            </el-button>
            <el-button
              v-if="row.username !== 'admin'"
              size="small"
              :type="row.status === 'active' ? 'warning' : 'success'"
              plain
              @click="toggleStatus(row)"
            >
              {{ row.status === 'active' ? 'Khóa' : 'Mở' }}
            </el-button>
            <el-button
              v-if="row.username !== 'admin'"
              size="small"
              type="danger"
              plain
              @click="handleDelete(row)"
            >
              Xóa
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Dialog Thêm / Sửa Nhân sự & Phân quyền -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? 'Cập nhật Nhân sự & Phân quyền' : 'Thêm Tài khoản Nhân sự mới'"
      width="680px"
    >
      <el-form label-position="top" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <el-form-item label="Họ và tên nhân viên *" class="sm:col-span-1">
          <el-input v-model="form.fullName" placeholder="Ví dụ: Nguyễn Văn A" />
        </el-form-item>

        <el-form-item label="Phòng ban / Bộ phận *" class="sm:col-span-1">
          <el-select v-model="form.department" class="w-full" placeholder="Chọn bộ phận">
            <el-option label="Ban Giám Đốc" value="Ban Giám Đốc" />
            <el-option label="Phòng Kinh Doanh & Tư Vấn" value="Phòng Kinh Doanh & Tư Vấn" />
            <el-option label="Bộ phận Kho Linh Kiện" value="Bộ phận Kho Linh Kiện" />
            <el-option label="Trung tâm Kỹ thuật & Bảo hành" value="Trung tâm Kỹ thuật & Bảo hành" />
            <el-option label="Phòng Marketing & Nội dung" value="Phòng Marketing & Nội dung" />
            <el-option label="Kế toán & Hành chính" value="Kế toán & Hành chính" />
          </el-select>
        </el-form-item>

        <el-form-item label="Tên đăng nhập (Username) *" class="sm:col-span-1">
          <el-input
            v-model="form.username"
            :disabled="isEdit && form.username === 'admin'"
            placeholder="Ví dụ: nv_kinhdoanh01"
          />
        </el-form-item>

        <el-form-item label="Mật khẩu (Password) *" class="sm:col-span-1">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="Nhập mật khẩu đăng nhập..."
          />
        </el-form-item>

        <el-form-item label="Số điện thoại" class="sm:col-span-1">
          <el-input v-model="form.phone" placeholder="Ví dụ: 0908123456" />
        </el-form-item>

        <el-form-item label="Email công việc" class="sm:col-span-1">
          <el-input v-model="form.email" placeholder="Ví dụ: ten@nhanphuctech.vn" />
        </el-form-item>

        <el-form-item label="Vai trò chính (Role) *" class="sm:col-span-1">
          <el-select
            v-model="form.role"
            class="w-full"
            :disabled="isEdit && form.username === 'admin'"
            @change="handleRoleChange"
          >
            <el-option
              v-for="r in roleList"
              :key="r.code"
              :label="r.label"
              :value="r.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Trạng thái tài khoản" class="sm:col-span-1">
          <el-select
            v-model="form.status"
            class="w-full"
            :disabled="isEdit && form.username === 'admin'"
          >
            <el-option label="Đang hoạt động" value="active" />
            <el-option label="Tạm khóa truy cập" value="locked" />
          </el-select>
        </el-form-item>

        <!-- Phân quyền chi tiết từng module -->
        <div class="sm:col-span-2 mt-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <div class="flex items-center justify-between mb-3">
            <div>
              <div class="font-bold text-sm text-slate-800">Phân quyền truy cập Danh mục Quản trị</div>
              <div class="text-xs text-slate-500">
                Chọn các phân hệ mà nhân viên này được phép xem và thao tác trên thanh menu Admin:
              </div>
            </div>
            <el-button size="small" text type="primary" @click="resetRoleDefaultPermissions">
              Đặt lại theo vai trò
            </el-button>
          </div>

          <el-checkbox-group
            v-model="form.permissions"
            :disabled="form.role === 'SUPER_ADMIN'"
            class="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          >
            <div
              v-for="perm in PERMISSION_LABELS"
              :key="perm.key"
              class="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-start"
            >
              <el-checkbox :value="perm.key" :label="perm.key">
                <span class="font-bold text-xs text-slate-800">{{ perm.label }}</span>
                <span class="block text-[11px] text-slate-400 font-normal whitespace-normal">
                  {{ perm.desc }}
                </span>
              </el-checkbox>
            </div>
          </el-checkbox-group>
        </div>
      </el-form>

      <template #footer>
        <div class="flex justify-end gap-2">
          <el-button @click="dialogVisible = false">Hủy bỏ</el-button>
          <el-button type="success" color="#00733c" @click="saveStaff">
            {{ isEdit ? 'Lưu cập nhật' : 'Tạo tài khoản' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import {
  useAuthStore,
  ROLE_DEFINITIONS,
  PERMISSION_LABELS,
  type AdminRole,
  type PermissionKey,
  type StaffUser,
} from '../../stores/auth';

const authStore = useAuthStore();

const searchQuery = ref('');
const filterRole = ref('');
const visiblePasswords = ref<Record<string, boolean>>({});

const roleList = Object.values(ROLE_DEFINITIONS);

const filteredStaff = computed(() => {
  return authStore.staffList.filter((u) => {
    const q = searchQuery.value.trim().toLowerCase();
    const matchQuery =
      !q ||
      u.fullName.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q);
    const matchRole = !filterRole.value || u.role === filterRole.value;
    return matchQuery && matchRole;
  });
});

const countByRole = (role: AdminRole) => {
  return authStore.staffList.filter((u) => u.role === role).length;
};

const getInitials = (name: string) => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getPermName = (key: PermissionKey) => {
  const found = PERMISSION_LABELS.find((p) => p.key === key);
  return found ? found.label : key;
};

const toggleShowPassword = (id: string) => {
  visiblePasswords.value[id] = !visiblePasswords.value[id];
};

// Dialog state
const dialogVisible = ref(false);
const isEdit = ref(false);
const editingId = ref('');

const form = ref<{
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: AdminRole;
  permissions: PermissionKey[];
  status: 'active' | 'locked';
}>({
  username: '',
  password: '',
  fullName: '',
  email: '',
  phone: '',
  department: 'Phòng Kinh Doanh & Tư Vấn',
  role: 'SALES',
  permissions: [...ROLE_DEFINITIONS.SALES.defaultPermissions],
  status: 'active',
});

const handleRoleChange = (newRole: AdminRole) => {
  form.value.permissions = [...ROLE_DEFINITIONS[newRole].defaultPermissions];
};

const resetRoleDefaultPermissions = () => {
  form.value.permissions = [...ROLE_DEFINITIONS[form.value.role].defaultPermissions];
};

const openCreateDialog = () => {
  isEdit.value = false;
  editingId.value = '';
  form.value = {
    username: '',
    password: '123',
    fullName: '',
    email: '',
    phone: '',
    department: 'Phòng Kinh Doanh & Tư Vấn',
    role: 'SALES',
    permissions: [...ROLE_DEFINITIONS.SALES.defaultPermissions],
    status: 'active',
  };
  dialogVisible.value = true;
};

const openEditDialog = (row: StaffUser) => {
  isEdit.value = true;
  editingId.value = row.id;
  form.value = {
    username: row.username,
    password: row.password,
    fullName: row.fullName,
    email: row.email,
    phone: row.phone,
    department: row.department,
    role: row.role,
    permissions: [...row.permissions],
    status: row.status,
  };
  dialogVisible.value = true;
};

const saveStaff = () => {
  if (!form.value.fullName.trim() || !form.value.username.trim() || !form.value.password.trim()) {
    ElMessage.warning('Vui lòng nhập đầy đủ Họ tên, Username và Mật khẩu!');
    return;
  }

  const duplicate = authStore.staffList.find(
    (u) => u.username.toLowerCase() === form.value.username.trim().toLowerCase() && u.id !== editingId.value
  );
  if (duplicate) {
    ElMessage.error('Tên đăng nhập (Username) này đã tồn tại!');
    return;
  }

  if (form.value.permissions.length === 0) {
    form.value.permissions = ['dashboard'];
  }

  if (isEdit.value) {
    authStore.updateStaff(editingId.value, {
      ...form.value,
      username: form.value.username.trim(),
    });
    ElMessage.success('Đã cập nhật thông tin và phân quyền nhân sự!');
  } else {
    authStore.addStaff({
      ...form.value,
      username: form.value.username.trim(),
    });
    ElMessage.success('Đã tạo tài khoản nhân sự mới thành công!');
  }
  dialogVisible.value = false;
};

const toggleStatus = (row: StaffUser) => {
  const nextStatus = row.status === 'active' ? 'locked' : 'active';
  authStore.updateStaff(row.id, { status: nextStatus });
  ElMessage.success(
    nextStatus === 'active'
      ? `Đã mở khóa tài khoản ${row.username}`
      : `Đã khóa tài khoản ${row.username}`
  );
};

const handleDelete = (row: StaffUser) => {
  ElMessageBox.confirm(
    `Bạn có chắc chắn muốn xóa tài khoản nhân viên "${row.fullName}" (${row.username}) không?`,
    'Xác nhận xóa nhân sự',
    {
      confirmButtonText: 'Xóa tài khoản',
      cancelButtonText: 'Hủy',
      type: 'warning',
    }
  )
    .then(() => {
      const res = authStore.deleteStaff(row.id);
      if (res.ok) {
        ElMessage.success(res.message);
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch(() => {});
};
</script>

