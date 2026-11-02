<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Quản lý Danh mục Sản phẩm & Dịch vụ</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Cấu trúc cây danh mục đồng bộ với Mega Menu trên trang chủ Nhân Phúc Tech.
        </p>
      </div>
      <el-button type="success" color="#00733c" @click="openAddDialog">
        + Thêm Danh mục mới
      </el-button>
    </div>

    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <el-table
        :data="tableData"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="Tên Danh mục" min-width="260">
          <template #default="{ row }">
            <span class="font-bold text-slate-800">{{ row.icon ? row.icon + ' ' : '' }}{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="slug" label="Đường dẫn (Slug)" width="220">
          <template #default="{ row }">
            <span class="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">/{{ row.slug }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Loại danh mục" width="160" align="center">
          <template #default="{ row }">
            <el-tag :type="row.children ? 'success' : 'info'" size="small">
              {{ row.children ? 'Danh mục gốc' : 'Danh mục con' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="180" align="right">
          <template #default="{ row }">
            <el-button size="small" @click="openEditDialog(row)">Sửa</el-button>
            <el-button size="small" type="danger" plain @click="deleteCategory(row.id)">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="isEdit ? 'Cập nhật Danh mục' : 'Thêm Danh mục'" width="460px">
      <el-form label-position="top">
        <el-form-item label="Tên Danh mục *">
          <el-input v-model="form.name" placeholder="Ví dụ: VGA - Card màn hình" />
        </el-form-item>
        <el-form-item label="Đường dẫn (Slug) *">
          <el-input v-model="form.slug" placeholder="Ví dụ: vga" />
        </el-form-item>
        <el-form-item v-if="!isEdit" label="Danh mục Cha">
          <el-select v-model="form.parentId" placeholder="Chọn danh mục cha" class="w-full">
            <el-option label="Không có (Tạo Danh mục gốc mới)" :value="0" />
            <el-option
              v-for="parent in tableData"
              :key="parent.id"
              :label="parent.name"
              :value="parent.id"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Hủy</el-button>
          <el-button type="success" color="#00733c" @click="saveCategory">Lưu danh mục</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

interface CategoryNode {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  children?: CategoryNode[];
}

const STORAGE_KEY = 'nhanphuc_admin_categories';

const defaultCategories: CategoryNode[] = [
  {
    id: 1,
    name: 'Laptop & Máy tính xách tay',
    slug: 'laptop',
    icon: '💻',
    children: [
      { id: 11, name: 'Laptop Gaming', slug: 'laptop-gaming' },
      { id: 12, name: 'Laptop Văn Phòng & Học Tập', slug: 'laptop-office' },
      { id: 13, name: 'Laptop Đồ Họa - Kỹ Thuật', slug: 'laptop-creator' },
      { id: 14, name: 'MacBook & Apple', slug: 'macbook' },
    ],
  },
  {
    id: 2,
    name: 'PC Gaming & Đồ họa Nhân Phúc',
    slug: 'pc-gaming',
    icon: '🖥️',
    children: [
      { id: 21, name: 'PC Gaming Phổ Thông', slug: 'pc-gaming-entry' },
      { id: 22, name: 'PC Gaming Trung Cấp', slug: 'pc-gaming-mid' },
      { id: 23, name: 'PC Gaming Cao Cấp / Hi-End', slug: 'pc-gaming-high' },
      { id: 24, name: 'PC Thiết Kế Đồ Họa 3D', slug: 'pc-workstation' },
      { id: 25, name: 'Máy Bộ Văn Phòng', slug: 'pc-office' },
    ],
  },
  {
    id: 3,
    name: 'Linh kiện máy tính (PC Parts)',
    slug: 'linh-kien',
    icon: '⚡',
    children: [
      { id: 31, name: 'CPU - Bộ vi xử lý', slug: 'cpu' },
      { id: 32, name: 'VGA - Card màn hình', slug: 'vga' },
      { id: 33, name: 'Mainboard - Bo mạch chủ', slug: 'mainboard' },
      { id: 34, name: 'RAM - Bộ nhớ trong', slug: 'ram' },
      { id: 35, name: 'SSD / HDD - Ổ cứng lưu trữ', slug: 'storage' },
      { id: 36, name: 'Nguồn máy tính (PSU)', slug: 'psu' },
      { id: 37, name: 'Vỏ Case máy tính', slug: 'case' },
      { id: 38, name: 'Tản nhiệt nước & khí', slug: 'cooler' },
    ],
  },
  {
    id: 4,
    name: 'Màn hình máy tính',
    slug: 'man-hinh',
    icon: '📺',
    children: [
      { id: 41, name: 'Màn hình Gaming 144Hz - 240Hz', slug: 'monitor-gaming' },
      { id: 42, name: 'Màn hình Đồ họa chuẩn màu IPS', slug: 'monitor-creator' },
      { id: 43, name: 'Màn hình Văn phòng 24" - 27"', slug: 'monitor-office' },
    ],
  },
  {
    id: 5,
    name: 'Bàn phím, Chuột & Tai nghe',
    slug: 'gaming-gear',
    icon: '🎧',
    children: [
      { id: 51, name: 'Bàn phím cơ Gaming', slug: 'keyboard' },
      { id: 52, name: 'Chuột Gaming không dây', slug: 'mouse' },
      { id: 53, name: 'Tai nghe chụp tai Gaming', slug: 'headphone' },
    ],
  },
  {
    id: 6,
    name: 'Dịch vụ Kỹ thuật & Sửa chữa',
    slug: 'dich-vu',
    icon: '🛠️',
    children: [
      { id: 61, name: 'Sửa chữa Laptop, PC lấy liền', slug: 'sua-chua' },
      { id: 62, name: 'Vệ sinh máy & Tra keo tản nhiệt', slug: 've-sinh-may' },
      { id: 63, name: 'Bảo trì hệ thống mạng công ty (IT Outsourcing)', slug: 'it-outsourcing' },
    ],
  },
];

const loadCategories = (): CategoryNode[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCategories));
  return defaultCategories;
};

const tableData = ref<CategoryNode[]>(loadCategories());
const dialogVisible = ref(false);
const isEdit = ref(false);
const editingId = ref<number | null>(null);

const form = ref({
  name: '',
  slug: '',
  parentId: 0,
});

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData.value));
};

const openAddDialog = () => {
  isEdit.value = false;
  editingId.value = null;
  form.value = { name: '', slug: '', parentId: 0 };
  dialogVisible.value = true;
};

const openEditDialog = (row: CategoryNode) => {
  isEdit.value = true;
  editingId.value = row.id;
  form.value = { name: row.name, slug: row.slug, parentId: 0 };
  dialogVisible.value = true;
};

const saveCategory = () => {
  if (!form.value.name.trim() || !form.value.slug.trim()) {
    ElMessage.warning('Vui lòng nhập tên và đường dẫn (slug) danh mục!');
    return;
  }

  if (isEdit.value && editingId.value !== null) {
    for (const parent of tableData.value) {
      if (parent.id === editingId.value) {
        parent.name = form.value.name;
        parent.slug = form.value.slug;
      } else if (parent.children) {
        const child = parent.children.find((c) => c.id === editingId.value);
        if (child) {
          child.name = form.value.name;
          child.slug = form.value.slug;
        }
      }
    }
    ElMessage.success('Đã cập nhật danh mục!');
  } else {
    const newNode: CategoryNode = {
      id: Date.now(),
      name: form.value.name.trim(),
      slug: form.value.slug.trim(),
    };
    if (form.value.parentId === 0) {
      newNode.icon = '📁';
      newNode.children = [];
      tableData.value.push(newNode);
    } else {
      const parent = tableData.value.find((p) => p.id === form.value.parentId);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(newNode);
      }
    }
    ElMessage.success('Đã thêm danh mục mới!');
  }

  persist();
  dialogVisible.value = false;
};

const deleteCategory = (id: number) => {
  tableData.value = tableData.value
    .filter((p) => p.id !== id)
    .map((p) => ({
      ...p,
      children: p.children ? p.children.filter((c) => c.id !== id) : undefined,
    }));
  persist();
  ElMessage.success('Đã xóa danh mục!');
};
</script>
