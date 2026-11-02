import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export type AdminRole = 'SUPER_ADMIN' | 'SALES' | 'WAREHOUSE' | 'TECHNICIAN' | 'MARKETING';

export type PermissionKey =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'inventory'
  | 'services'
  | 'it_outsourcing'
  | 'news'
  | 'about'
  | 'cms'
  | 'users';

export interface RoleDefinition {
  code: AdminRole;
  label: string;
  badgeType: 'danger' | 'success' | 'warning' | 'primary' | 'info';
  description: string;
  defaultPermissions: PermissionKey[];
}

export interface StaffUser {
  id: string;
  username: string;
  password: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  role: AdminRole;
  permissions: PermissionKey[];
  status: 'active' | 'locked';
  lastLogin?: string;
  createdAt: string;
}

export const ROLE_DEFINITIONS: Record<AdminRole, RoleDefinition> = {
  SUPER_ADMIN: {
    code: 'SUPER_ADMIN',
    label: 'Quản trị cao cấp (Giám đốc)',
    badgeType: 'danger',
    description: 'Toàn quyền quản trị hệ thống, cấu hình phân quyền và quản lý nhân sự.',
    defaultPermissions: [
      'dashboard',
      'orders',
      'products',
      'categories',
      'inventory',
      'services',
      'it_outsourcing',
      'news',
      'about',
      'cms',
      'users',
    ],
  },
  SALES: {
    code: 'SALES',
    label: 'NV Kinh doanh & Bán hàng',
    badgeType: 'success',
    description: 'Xử lý đơn đặt hàng PC/Laptop, tư vấn báo giá IT Outsourcing và tra cứu sản phẩm.',
    defaultPermissions: ['dashboard', 'orders', 'products', 'services', 'it_outsourcing'],
  },
  WAREHOUSE: {
    code: 'WAREHOUSE',
    label: 'Quản lý Kho vận',
    badgeType: 'warning',
    description: 'Quản lý xuất/nhập/tồn kho linh kiện, cập nhật sản phẩm và danh mục hàng hóa.',
    defaultPermissions: ['dashboard', 'inventory', 'products', 'categories'],
  },
  TECHNICIAN: {
    code: 'TECHNICIAN',
    label: 'Kỹ thuật viên Sửa chữa & IT',
    badgeType: 'primary',
    description: 'Tiếp nhận & xử lý phiếu sửa chữa máy tính, bảo hành và dịch vụ IT Outsourcing.',
    defaultPermissions: ['dashboard', 'services', 'it_outsourcing', 'inventory'],
  },
  MARKETING: {
    code: 'MARKETING',
    label: 'Biên tập viên Nội dung (CMS)',
    badgeType: 'info',
    description: 'Cập nhật Tin tức & Cẩm nang, trang Về Nhân Phúc Tech, bảng giá IT Outsourcing & Chính sách.',
    defaultPermissions: ['dashboard', 'news', 'about', 'it_outsourcing', 'cms', 'products', 'categories'],
  },
};

export const PERMISSION_LABELS: { key: PermissionKey; label: string; desc: string }[] = [
  { key: 'dashboard', label: 'Tổng quan (Dashboard)', desc: 'Xem báo cáo doanh thu, đơn hàng, tồn kho tổng hợp' },
  { key: 'orders', label: 'Đơn hàng & Bán hàng', desc: 'Tạo đơn, duyệt đơn hàng, cập nhật giao hàng & thanh toán' },
  { key: 'products', label: 'Quản lý Sản phẩm', desc: 'Thêm, sửa, xóa Laptop, PC Gaming, Linh kiện & giá bán' },
  { key: 'categories', label: 'Quản lý Danh mục', desc: 'Cấu hình danh mục sản phẩm & menu phân loại' },
  { key: 'inventory', label: 'Quản lý Kho hàng', desc: 'Nhập kho, xuất kho, kiểm kê số lượng tồn & cảnh báo hết hàng' },
  { key: 'services', label: 'Phiếu Sửa chữa & Bảo hành', desc: 'Tiếp nhận & cập nhật tiến độ phiếu sửa chữa, bảo hành' },
  { key: 'it_outsourcing', label: 'IT Outsourcing & Bảng giá', desc: 'Chỉnh sửa giá các gói IT Outsourcing, hạng mục & yêu cầu khảo sát' },
  { key: 'news', label: 'Tin tức & Cẩm nang', desc: 'Đăng bài mới, sửa bài viết đánh giá linh kiện & thủ thuật máy tính' },
  { key: 'about', label: 'Về Nhân Phúc Tech', desc: 'Chỉnh sửa trang giới thiệu công ty, sứ mệnh & địa chỉ liên hệ' },
  { key: 'cms', label: 'Trang Chính sách (CMS)', desc: 'Soạn thảo các trang chính sách bảo hành, đổi trả, trả góp' },
  { key: 'users', label: 'Nhân sự & Phân quyền', desc: 'Tạo tài khoản nhân viên, đổi mật khẩu, cấp quyền truy cập' },
];

const USERS_STORAGE_KEY = 'nhanphuc_admin_users_v2';
const SESSION_STORAGE_KEY = 'nhanphuc_admin_session_v2';

const DEFAULT_STAFF_USERS: StaffUser[] = [
  {
    id: 'nv-001',
    username: 'admin',
    password: '123',
    fullName: 'Nguyễn Nhân Phúc',
    email: 'admin@nhanphuctech.vn',
    phone: '0777908179',
    department: 'Ban Giám Đốc',
    role: 'SUPER_ADMIN',
    permissions: [...ROLE_DEFINITIONS.SUPER_ADMIN.defaultPermissions],
    status: 'active',
    lastLogin: 'Hôm nay, 08:30',
    createdAt: '01/01/2026',
  },
  {
    id: 'nv-002',
    username: 'kinhdoanh',
    password: '123',
    fullName: 'Trần Minh Tâm',
    email: 'sales@nhanphuctech.vn',
    phone: '0908112233',
    department: 'Phòng Kinh Doanh & Tư Vấn',
    role: 'SALES',
    permissions: [...ROLE_DEFINITIONS.SALES.defaultPermissions],
    status: 'active',
    lastLogin: 'Hôm nay, 09:15',
    createdAt: '10/01/2026',
  },
  {
    id: 'nv-003',
    username: 'khovan',
    password: '123',
    fullName: 'Lê Hoàng Nam',
    email: 'kho@nhanphuctech.vn',
    phone: '0919334455',
    department: 'Bộ phận Kho Linh Kiện',
    role: 'WAREHOUSE',
    permissions: [...ROLE_DEFINITIONS.WAREHOUSE.defaultPermissions],
    status: 'active',
    lastLogin: 'Hôm qua, 17:40',
    createdAt: '15/01/2026',
  },
  {
    id: 'nv-004',
    username: 'kythuat',
    password: '123',
    fullName: 'Phạm Quốc Cường',
    email: 'support@nhanphuctech.vn',
    phone: '0938556677',
    department: 'Trung tâm Kỹ thuật & Bảo hành',
    role: 'TECHNICIAN',
    permissions: [...ROLE_DEFINITIONS.TECHNICIAN.defaultPermissions],
    status: 'active',
    lastLogin: 'Hôm nay, 10:05',
    createdAt: '20/01/2026',
  },
  {
    id: 'nv-005',
    username: 'marketing',
    password: '123',
    fullName: 'Võ Thanh Thảo',
    email: 'marketing@nhanphuctech.vn',
    phone: '0977889900',
    department: 'Phòng Marketing & Nội dung',
    role: 'MARKETING',
    permissions: [...ROLE_DEFINITIONS.MARKETING.defaultPermissions],
    status: 'active',
    lastLogin: 'Hôm qua, 16:20',
    createdAt: '05/02/2026',
  },
];

export const useAuthStore = defineStore('auth', () => {
  const staffList = ref<StaffUser[]>([]);
  const currentUser = ref<StaffUser | null>(null);

  const loadUsers = () => {
    try {
      const raw = localStorage.getItem(USERS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          staffList.value = parsed;
          return;
        }
      }
    } catch (e) {
      console.error('Lỗi đọc danh sách nhân sự:', e);
    }
    staffList.value = DEFAULT_STAFF_USERS;
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_STAFF_USERS));
  };

  const saveUsers = () => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(staffList.value));
    if (currentUser.value) {
      const updated = staffList.value.find((u) => u.id === currentUser.value?.id);
      if (updated) {
        currentUser.value = updated;
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
      }
    }
  };

  const loadSession = () => {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StaffUser;
        const found = staffList.value.find((u) => u.id === parsed.id && u.status === 'active');
        if (found) {
          currentUser.value = found;
          return;
        }
      }
    } catch (e) {
      console.error('Lỗi đọc phiên đăng nhập:', e);
    }
    currentUser.value = null;
  };

  loadUsers();
  loadSession();

  const isAuthenticated = computed(() => !!currentUser.value);

  const hasPermission = (permission: PermissionKey): boolean => {
    if (!currentUser.value) return false;
    if (currentUser.value.role === 'SUPER_ADMIN') return true;
    return currentUser.value.permissions.includes(permission);
  };

  const login = (usernameInput: string, passwordInput: string): { ok: boolean; message: string } => {
    const cleanUser = usernameInput.trim().toLowerCase();
    const user = staffList.value.find((u) => u.username.toLowerCase() === cleanUser);
    if (!user) {
      return { ok: false, message: 'Tên đăng nhập không tồn tại trong hệ thống!' };
    }
    if (user.password !== passwordInput) {
      return { ok: false, message: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại!' };
    }
    if (user.status === 'locked') {
      return { ok: false, message: 'Tài khoản này đã bị khóa. Vui lòng liên hệ Quản trị viên cao cấp!' };
    }

    const now = new Date();
    const timeStr = `${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })} ${now.toLocaleDateString('vi-VN')}`;
    user.lastLogin = timeStr;
    currentUser.value = { ...user };
    saveUsers();
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(currentUser.value));

    return { ok: true, message: `Xin chào ${user.fullName} (${ROLE_DEFINITIONS[user.role].label})!` };
  };

  const logout = () => {
    currentUser.value = null;
    localStorage.removeItem(SESSION_STORAGE_KEY);
  };

  const addStaff = (newStaff: Omit<StaffUser, 'id' | 'createdAt'>) => {
    const id = 'nv-' + String(Date.now()).slice(-4);
    const createdAt = new Date().toLocaleDateString('vi-VN');
    staffList.value.unshift({
      ...newStaff,
      id,
      createdAt,
    });
    saveUsers();
  };

  const updateStaff = (id: string, payload: Partial<StaffUser>) => {
    const idx = staffList.value.findIndex((u) => u.id === id);
    if (idx !== -1) {
      staffList.value[idx] = { ...staffList.value[idx], ...payload } as StaffUser;
      saveUsers();
    }
  };

  const deleteStaff = (id: string): { ok: boolean; message: string } => {
    const target = staffList.value.find((u) => u.id === id);
    if (!target) return { ok: false, message: 'Không tìm thấy nhân sự' };
    if (target.username === 'admin') {
      return { ok: false, message: 'Không thể xóa tài khoản Quản trị cao cấp mặc định!' };
    }
    if (currentUser.value?.id === id) {
      return { ok: false, message: 'Không thể tự xóa tài khoản đang đăng nhập!' };
    }
    staffList.value = staffList.value.filter((u) => u.id !== id);
    saveUsers();
    return { ok: true, message: 'Đã xóa tài khoản nhân sự thành công' };
  };

  return {
    staffList,
    currentUser,
    isAuthenticated,
    hasPermission,
    login,
    logout,
    addStaff,
    updateStaff,
    deleteStaff,
    saveUsers,
  };
});
