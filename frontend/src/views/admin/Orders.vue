<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Quản lý Đơn hàng & Bán hàng</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Theo dõi đơn đặt mua PC Gaming, Laptop, Linh kiện và xử lý giao hàng / thanh toán.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <el-select v-model="statusFilter" placeholder="Trạng thái đơn" clearable class="w-48">
          <el-option label="Tất cả trạng thái" value="" />
          <el-option label="Chờ xác nhận" value="PENDING" />
          <el-option label="Đang lắp ráp / đóng gói" value="PROCESSING" />
          <el-option label="Đang giao hàng" value="SHIPPING" />
          <el-option label="Hoàn thành" value="COMPLETED" />
          <el-option label="Đã hủy" value="CANCELLED" />
        </el-select>
      </div>
    </div>

    <!-- Thống kê nhanh -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Đơn chờ xác nhận</div>
        <div class="text-2xl font-extrabold text-amber-600 mt-1">
          {{ orders.filter(o => o.status === 'PENDING').length }}
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Đang lắp ráp / giao hàng</div>
        <div class="text-2xl font-extrabold text-blue-600 mt-1">
          {{ orders.filter(o => o.status === 'PROCESSING' || o.status === 'SHIPPING').length }}
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Đơn hoàn thành</div>
        <div class="text-2xl font-extrabold text-[#00733c] mt-1">
          {{ orders.filter(o => o.status === 'COMPLETED').length }}
        </div>
      </div>
      <div class="bg-white p-4 rounded-2xl border border-slate-200/80">
        <div class="text-xs font-bold text-slate-400 uppercase">Tổng doanh thu đơn</div>
        <div class="text-xl font-extrabold text-red-600 mt-1">
          {{ formatPrice(totalRevenue) }}
        </div>
      </div>
    </div>

    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <el-table :data="filteredOrders" border stripe style="width: 100%">
        <el-table-column prop="code" label="Mã Đơn" width="130">
          <template #default="{ row }">
            <span class="font-mono font-bold text-[#00733c]">{{ row.code }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Khách hàng" min-width="190">
          <template #default="{ row }">
            <div class="font-bold text-slate-800 text-sm">{{ row.customerName }}</div>
            <div class="text-xs text-slate-500">{{ row.phone }} • {{ row.address }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Sản phẩm đặt mua" min-width="250">
          <template #default="{ row }">
            <div class="text-xs text-slate-700 font-medium space-y-1">
              <div v-for="(item, i) in row.items" :key="i">
                • {{ item.name }} <span class="text-slate-400">(x{{ item.qty }})</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Tổng tiền" width="155">
          <template #default="{ row }">
            <div class="font-extrabold text-red-600 text-sm">{{ formatPrice(row.total) }}</div>
            <div class="text-[11px] text-slate-400">{{ row.paymentMethod }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Trạng thái" width="180" align="center">
          <template #default="{ row }">
            <el-select
              v-model="row.status"
              size="small"
              @change="saveOrders"
            >
              <el-option label="Chờ xác nhận" value="PENDING" />
              <el-option label="Đang lắp ráp PC" value="PROCESSING" />
              <el-option label="Đang giao hàng" value="SHIPPING" />
              <el-option label="Hoàn thành" value="COMPLETED" />
              <el-option label="Đã hủy" value="CANCELLED" />
            </el-select>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="Thời gian" width="140" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

interface OrderRecord {
  code: string;
  customerName: string;
  phone: string;
  address: string;
  items: { name: string; qty: number }[];
  total: number;
  paymentMethod: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

const STORAGE_KEY = 'nhanphuc_admin_orders';

const defaultOrders: OrderRecord[] = [
  {
    code: 'NP-884120',
    customerName: 'Lê Minh Hoàng',
    phone: '0909887766',
    address: 'Quận Bình Thạnh, TP.HCM',
    items: [
      { name: 'PC Gaming Nhân Phúc Dragon I5-13400F / RTX 4060 8GB', qty: 1 },
      { name: 'Màn hình ASUS TUF Gaming VG279Q3A 27" 180Hz', qty: 1 },
    ],
    total: 23480000,
    paymentMethod: 'Chuyển khoản QR',
    status: 'PENDING',
    createdAt: 'Hôm nay, 10:25',
  },
  {
    code: 'NP-884095',
    customerName: 'Công ty TNHH Thiết Kế Kiến Trúc Sao Việt',
    phone: '0918223344',
    address: 'Quận 1, TP.HCM',
    items: [
      { name: 'PC Đồ Họa Nhân Phúc Creator Z790 / i7-14700K / 64GB DDR5', qty: 2 },
    ],
    total: 85980000,
    paymentMethod: 'Chuyển khoản Công ty (VAT)',
    status: 'PROCESSING',
    createdAt: 'Hôm nay, 09:10',
  },
  {
    code: 'NP-883990',
    customerName: 'Nguyễn Thị Thu Hà',
    phone: '0987654321',
    address: 'TP. Thủ Đức, TP.HCM',
    items: [
      { name: 'Laptop Gaming ASUS TUF A15 FA507NU R7-7735HS / RTX 4050', qty: 1 },
    ],
    total: 22490000,
    paymentMethod: 'Trả góp 0% qua thẻ tín dụng',
    status: 'SHIPPING',
    createdAt: 'Hôm qua, 16:45',
  },
  {
    code: 'NP-883812',
    customerName: 'Trần Quốc Bảo',
    phone: '0933445566',
    address: 'Quận Gò Vấp, TP.HCM',
    items: [
      { name: 'Card màn hình ASUS Dual GeForce RTX 4060 OC 8GB', qty: 1 },
      { name: 'RAM Kingston Fury Beast RGB 32GB (2x16GB) DDR5', qty: 1 },
    ],
    total: 11280000,
    paymentMethod: 'Tiền mặt (COD)',
    status: 'COMPLETED',
    createdAt: 'Hôm qua, 11:20',
  },
];

const loadOrders = (): OrderRecord[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultOrders));
  return defaultOrders;
};

const orders = ref<OrderRecord[]>(loadOrders());
const statusFilter = ref('');

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value;
  return orders.value.filter((o) => o.status === statusFilter.value);
});

const totalRevenue = computed(() => {
  return orders.value
    .filter((o) => o.status !== 'CANCELLED')
    .reduce((sum, o) => sum + o.total, 0);
});

const saveOrders = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders.value));
  ElMessage.success('Đã cập nhật trạng thái đơn hàng!');
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>

