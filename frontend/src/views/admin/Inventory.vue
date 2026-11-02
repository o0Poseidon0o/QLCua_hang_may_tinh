<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Quản lý Kho hàng & Tồn kho Linh kiện</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Kiểm soát số lượng tồn kho, cảnh báo sắp hết hàng và thực hiện phiếu Nhập / Xuất kho.
        </p>
      </div>
      <el-button type="success" color="#00733c" @click="openStockInDialog()">
        + Lập Phiếu Nhập Kho
      </el-button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Tổng mã hàng (SKU)</div>
        <div class="text-2xl font-extrabold text-slate-800 mt-1">{{ tableData.length }}</div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Tổng số lượng tồn kho</div>
        <div class="text-2xl font-extrabold text-[#00733c] mt-1">
          {{ tableData.reduce((s, i) => s + i.quantity, 0) }} sản phẩm
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Cảnh báo sắp hết hàng (&le; 5)</div>
        <div class="text-2xl font-extrabold text-red-600 mt-1">
          {{ tableData.filter(i => i.quantity <= 5).length }} mã hàng
        </div>
      </div>
    </div>

    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <el-table :data="tableData" border stripe style="width: 100%">
        <el-table-column prop="sku" label="Mã SP (SKU)" width="150">
          <template #default="{ row }">
            <span class="font-mono text-xs font-bold text-[#00733c]">{{ row.sku }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="Tên Sản phẩm / Linh kiện" min-width="260" />
        <el-table-column prop="warehouse" label="Vị trí kệ kho" width="160" />
        <el-table-column prop="quantity" label="Số lượng tồn" width="150" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.quantity > 10 ? 'success' : scope.row.quantity > 3 ? 'warning' : 'danger'">
              {{ scope.row.quantity }} chiếc
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template #default="{ row }">
            <span
              class="text-xs font-bold"
              :class="row.quantity > 5 ? 'text-emerald-600' : 'text-red-600'"
            >
              {{ row.quantity > 5 ? 'Sẵn hàng' : 'Cần nhập thêm' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="190" align="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" plain @click="openStockInDialog(row)">
              Nhập / Điều chỉnh
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="Nhập kho / Điều chỉnh số lượng tồn" width="460px">
      <el-form label-position="top">
        <el-form-item label="Chọn mã sản phẩm (SKU)">
          <el-select v-model="selectedSku" class="w-full" filterable>
            <el-option
              v-for="item in tableData"
              :key="item.sku"
              :label="`${item.sku} - ${item.productName}`"
              :value="item.sku"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Loại giao dịch kho">
          <el-radio-group v-model="adjustMode">
            <el-radio value="add">Nhập thêm vào kho (+)</el-radio>
            <el-radio value="set">Đặt lại số lượng kiểm kê (=)</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Số lượng">
          <el-input-number v-model="adjustAmount" :min="0" :max="9999" class="w-full" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="applyStockChange">Xác nhận cập nhật</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { mockProducts } from '../../data/mockProducts';

interface InventoryRow {
  sku: string;
  productName: string;
  warehouse: string;
  quantity: number;
}

const STORAGE_KEY = 'nhanphuc_admin_inventory';

const defaultInventory: InventoryRow[] = mockProducts.map((p, index) => ({
  sku: p.sku,
  productName: p.name,
  warehouse: index % 2 === 0 ? 'Kho Bình Thạnh - Kệ A' + (index + 1) : 'Showroom 179 Nơ Trang Long',
  quantity: index === 2 ? 3 : 12 + (index * 5) % 25,
}));

const loadInventory = (): InventoryRow[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInventory));
  return defaultInventory;
};

const tableData = ref<InventoryRow[]>(loadInventory());
const dialogVisible = ref(false);
const selectedSku = ref('');
const adjustMode = ref<'add' | 'set'>('add');
const adjustAmount = ref(10);

const openStockInDialog = (row?: InventoryRow) => {
  selectedSku.value = row ? row.sku : tableData.value[0]?.sku || '';
  adjustMode.value = 'add';
  adjustAmount.value = 10;
  dialogVisible.value = true;
};

const applyStockChange = () => {
  const item = tableData.value.find((i) => i.sku === selectedSku.value);
  if (!item) return;

  if (adjustMode.value === 'add') {
    item.quantity += adjustAmount.value;
  } else {
    item.quantity = adjustAmount.value;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tableData.value));
  ElMessage.success(`Đã cập nhật tồn kho cho mã ${item.sku} (${item.quantity} chiếc)!`);
  dialogVisible.value = false;
};
</script>
