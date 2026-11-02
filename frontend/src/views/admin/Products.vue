<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Quản lý Sản phẩm</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Quản lý danh mục Laptop, PC Gaming Nhân Phúc, Linh kiện máy tính, Màn hình & Gaming Gear.
        </p>
      </div>
      <el-button type="success" color="#00733c" @click="openAddDialog">
        + Thêm Sản phẩm mới
      </el-button>
    </div>

    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="flex flex-wrap items-center gap-3">
          <el-input
            v-model="searchQuery"
            placeholder="Tìm theo tên sản phẩm, mã SKU, thương hiệu..."
            clearable
            class="w-72"
          />
          <el-select v-model="categoryFilter" placeholder="Lọc theo danh mục" clearable class="w-52">
            <el-option label="Tất cả danh mục" value="" />
            <el-option label="Laptop & Máy tính xách tay" value="Laptop" />
            <el-option label="PC Gaming & Đồ Họa" value="PC Gaming" />
            <el-option label="Linh kiện máy tính" value="Linh kiện" />
            <el-option label="Màn hình máy tính" value="Màn hình" />
            <el-option label="Gaming Gear" value="Gaming Gear" />
          </el-select>
        </div>
        <div class="text-xs text-slate-500">
          Hiển thị <strong class="text-slate-800">{{ filteredProducts.length }}</strong> sản phẩm
        </div>
      </div>

      <el-table :data="filteredProducts" border stripe style="width: 100%">
        <el-table-column prop="sku" label="Mã SP (SKU)" width="150">
          <template #default="{ row }">
            <span class="font-mono text-xs font-bold text-[#00733c]">{{ row.sku }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Sản phẩm" min-width="280">
          <template #default="{ row }">
            <div class="flex items-center gap-3">
              <img
                v-if="row.image"
                :src="row.image"
                :alt="row.name"
                class="w-11 h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0"
              />
              <div>
                <div class="font-bold text-slate-800 text-sm line-clamp-1">{{ row.name }}</div>
                <div class="text-xs text-slate-400">Bảo hành: {{ row.warranty || '24 - 36 tháng' }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="categoryName" label="Danh mục" width="160" />

        <el-table-column prop="brand" label="Thương hiệu" width="125">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.brand }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="price" label="Giá bán niêm yết" width="160">
          <template #default="scope">
            <span class="font-extrabold text-red-600">{{ formatPrice(scope.row.price) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Thao tác" width="160" align="right">
          <template #default="{ row }">
            <el-button size="small" @click="openEditDialog(row)">Sửa</el-button>
            <el-button size="small" type="danger" plain @click="deleteProduct(row.id)">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Dialog Thêm / Sửa sản phẩm -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'" width="560px">
      <el-form label-position="top" class="grid grid-cols-2 gap-x-4">
        <el-form-item label="Tên sản phẩm *" class="col-span-2">
          <el-input v-model="form.name" placeholder="Nhập tên đầy đủ của sản phẩm..." />
        </el-form-item>
        <el-form-item label="Mã SKU *">
          <el-input v-model="form.sku" placeholder="Ví dụ: PC-NP-4060" />
        </el-form-item>
        <el-form-item label="Thương hiệu *">
          <el-input v-model="form.brand" placeholder="Ví dụ: Nhân Phúc, ASUS, MSI, Intel..." />
        </el-form-item>
        <el-form-item label="Danh mục">
          <el-select v-model="form.categoryName" class="w-full">
            <el-option label="Laptop Gaming & Văn phòng" value="Laptop Gaming" />
            <el-option label="PC Gaming Nhân Phúc" value="PC Gaming" />
            <el-option label="VGA - Card màn hình" value="VGA - Card màn hình" />
            <el-option label="CPU - Vi xử lý" value="CPU - Vi xử lý" />
            <el-option label="Mainboard - Bo mạch chủ" value="Mainboard" />
            <el-option label="RAM - Bộ nhớ trong" value="RAM" />
            <el-option label="Màn hình máy tính" value="Màn hình" />
            <el-option label="Gaming Gear" value="Gaming Gear" />
          </el-select>
        </el-form-item>
        <el-form-item label="Giá bán (VNĐ) *">
          <el-input-number v-model="form.price" :min="0" :step="100000" class="w-full" />
        </el-form-item>
        <el-form-item label="Thời hạn bảo hành" class="col-span-2">
          <el-input v-model="form.warranty" placeholder="Ví dụ: 36 tháng chính hãng" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="saveProduct">Lưu sản phẩm</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { mockProducts } from '../../data/mockProducts';

const STORAGE_KEY = 'nhanphuc_admin_products';

const loadProducts = (): any[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [...mockProducts];
};

const tableData = ref<any[]>(loadProducts());
const searchQuery = ref('');
const categoryFilter = ref('');

const filteredProducts = computed(() => {
  return tableData.value.filter((p) => {
    const q = searchQuery.value.trim().toLowerCase();
    const matchQ =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q);
    const matchCat =
      !categoryFilter.value ||
      (p.categoryName && p.categoryName.toLowerCase().includes(categoryFilter.value.toLowerCase()));
    return matchQ && matchCat;
  });
});

const dialogVisible = ref(false);
const isEdit = ref(false);
const editingId = ref<string>('');

const form = ref({
  name: '',
  sku: '',
  brand: 'Nhân Phúc',
  categoryName: 'PC Gaming',
  price: 15990000,
  warranty: '36 tháng chính hãng',
});

const persist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData.value));
};

const openAddDialog = () => {
  isEdit.value = false;
  editingId.value = '';
  form.value = {
    name: '',
    sku: 'NP-' + String(Math.floor(1000 + Math.random() * 9000)),
    brand: 'Nhân Phúc',
    categoryName: 'PC Gaming',
    price: 15990000,
    warranty: '36 tháng chính hãng',
  };
  dialogVisible.value = true;
};

const openEditDialog = (row: any) => {
  isEdit.value = true;
  editingId.value = row.id;
  form.value = {
    name: row.name,
    sku: row.sku,
    brand: row.brand,
    categoryName: row.categoryName,
    price: row.price,
    warranty: row.warranty || '36 tháng chính hãng',
  };
  dialogVisible.value = true;
};

const saveProduct = () => {
  if (!form.value.name.trim() || !form.value.sku.trim()) {
    ElMessage.warning('Vui lòng nhập tên sản phẩm và mã SKU!');
    return;
  }
  if (isEdit.value) {
    const idx = tableData.value.findIndex((p) => p.id === editingId.value);
    if (idx !== -1) {
      tableData.value[idx] = { ...tableData.value[idx], ...form.value };
    }
    ElMessage.success('Đã cập nhật thông tin sản phẩm!');
  } else {
    tableData.value.unshift({
      id: 'np-' + Date.now(),
      ...form.value,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=600&q=80',
    });
    ElMessage.success('Đã thêm sản phẩm mới thành công!');
  }
  persist();
  dialogVisible.value = false;
};

const deleteProduct = (id: string) => {
  tableData.value = tableData.value.filter((p) => p.id !== id);
  persist();
  ElMessage.success('Đã xóa sản phẩm!');
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>
