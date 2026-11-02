<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Dịch vụ Kỹ thuật, Sửa chữa & Bảo hành</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Quản lý phiếu sửa chữa Laptop/PC, bảo hành chính hãng và hợp đồng bảo trì IT Outsourcing doanh nghiệp.
        </p>
      </div>
      <el-button type="success" color="#00733c" @click="openNewTicket">
        + Tiếp nhận Phiếu Kỹ Thuật mới
      </el-button>
    </div>

    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <el-table :data="tickets" border stripe style="width: 100%">
        <el-table-column prop="ticketCode" label="Mã Phiếu" width="140">
          <template #default="{ row }">
            <span class="font-mono font-bold text-[#00733c]">{{ row.ticketCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Khách hàng / Doanh nghiệp" min-width="190">
          <template #default="{ row }">
            <div class="font-bold text-slate-800 text-sm">{{ row.customer }}</div>
            <div class="text-xs text-slate-400">{{ row.phone }}</div>
          </template>
        </el-table-column>

        <el-table-column prop="serviceType" label="Loại dịch vụ" width="180">
          <template #default="{ row }">
            <el-tag :type="row.serviceType === 'IT Outsourcing' ? 'warning' : 'primary'" size="small">
              {{ row.serviceType }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="deviceInfo" label="Thiết bị & Tình trạng kỹ thuật" min-width="260" />

        <el-table-column prop="technician" label="Kỹ thuật phụ trách" width="160" />

        <el-table-column label="Chi phí dự kiến" width="150">
          <template #default="{ row }">
            <span class="font-bold text-red-600">{{ row.fee === 0 ? 'Bảo hành (0đ)' : formatPrice(row.fee) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="Trạng thái xử lý" width="185" align="center">
          <template #default="{ row }">
            <el-select v-model="row.status" size="small" @change="saveTickets">
              <el-option label="Mới tiếp nhận" value="RECEIVED" />
              <el-option label="Đang kiểm tra / sửa" value="REPAIRING" />
              <el-option label="Chờ linh kiện hãng" value="WAITING_PARTS" />
              <el-option label="Đã xong - Chờ trả máy" value="READY" />
              <el-option label="Đã bàn giao" value="DONE" />
            </el-select>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Dialog Tạo phiếu kỹ thuật -->
    <el-dialog v-model="dialogVisible" title="Tiếp nhận Phiếu Sửa chữa / Bảo hành / IT" width="540px">
      <el-form label-position="top">
        <el-form-item label="Tên khách hàng / Công ty *">
          <el-input v-model="form.customer" placeholder="Nhập họ tên khách hoặc tên doanh nghiệp..." />
        </el-form-item>
        <el-form-item label="Số điện thoại *">
          <el-input v-model="form.phone" placeholder="Ví dụ: 0908123456" />
        </el-form-item>
        <el-form-item label="Loại dịch vụ">
          <el-select v-model="form.serviceType" class="w-full">
            <el-option label="Sửa chữa Laptop / PC" value="Sửa chữa Laptop / PC" />
            <el-option label="Bảo hành chính hãng" value="Bảo hành chính hãng" />
            <el-option label="Vệ sinh & Nâng cấp phần cứng" value="Vệ sinh & Nâng cấp" />
            <el-option label="IT Outsourcing Doanh nghiệp" value="IT Outsourcing" />
          </el-select>
        </el-form-item>
        <el-form-item label="Thiết bị & Mô tả lỗi *">
          <el-input
            v-model="form.deviceInfo"
            type="textarea"
            :rows="3"
            placeholder="Ví dụ: Laptop Dell Gaming G15 - Quá nhiệt, vệ sinh tra keo MX-6 & nâng cấp SSD 1TB"
          />
        </el-form-item>
        <div class="grid grid-cols-2 gap-4">
          <el-form-item label="Kỹ thuật viên phụ trách">
            <el-input v-model="form.technician" placeholder="Phạm Quốc Cường" />
          </el-form-item>
          <el-form-item label="Chi phí dự kiến (VNĐ)">
            <el-input-number v-model="form.fee" :min="0" :step="50000" class="w-full" />
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="createTicket">Tạo phiếu</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

interface ServiceTicket {
  ticketCode: string;
  customer: string;
  phone: string;
  serviceType: string;
  deviceInfo: string;
  technician: string;
  fee: number;
  status: string;
}

const STORAGE_KEY = 'nhanphuc_admin_tickets';

const defaultTickets: ServiceTicket[] = [
  {
    ticketCode: 'NP-2026-019',
    customer: 'Phạm Văn Kiên',
    phone: '0903112244',
    serviceType: 'Sửa chữa Laptop / PC',
    deviceInfo: 'Laptop ASUS ROG Strix G15 - Thay quạt tản nhiệt CPU + Vệ sinh keo tản nhiệt',
    technician: 'Phạm Quốc Cường',
    fee: 650000,
    status: 'REPAIRING',
  },
  {
    ticketCode: 'NP-2026-018',
    customer: 'Công ty Cổ phần Logistics Á Châu (25 máy)',
    phone: '02838991122',
    serviceType: 'IT Outsourcing',
    deviceInfo: 'Bảo trì định kỳ tháng 11/2026: Kiểm tra hệ thống Firewall, NAS Synology & 25 PC văn phòng',
    technician: 'Phạm Quốc Cường',
    fee: 4500000,
    status: 'RECEIVED',
  },
  {
    ticketCode: 'NP-2026-015',
    customer: 'Hoàng Minh Tuấn',
    phone: '0978990011',
    serviceType: 'Bảo hành chính hãng',
    deviceInfo: 'VGA MSI RTX 4060 Ventus 2X (SN: 602-V516) - Kiểm tra cổng DisplayPort',
    technician: 'Phạm Quốc Cường',
    fee: 0,
    status: 'READY',
  },
];

const loadTickets = (): ServiceTicket[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTickets));
  return defaultTickets;
};

const tickets = ref<ServiceTicket[]>(loadTickets());
const dialogVisible = ref(false);

const form = ref({
  customer: '',
  phone: '',
  serviceType: 'Sửa chữa Laptop / PC',
  deviceInfo: '',
  technician: 'Phạm Quốc Cường',
  fee: 250000,
});

const saveTickets = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets.value));
  ElMessage.success('Đã cập nhật trạng thái phiếu dịch vụ!');
};

const openNewTicket = () => {
  form.value = {
    customer: '',
    phone: '',
    serviceType: 'Sửa chữa Laptop / PC',
    deviceInfo: '',
    technician: 'Phạm Quốc Cường',
    fee: 250000,
  };
  dialogVisible.value = true;
};

const createTicket = () => {
  if (!form.value.customer.trim() || !form.value.phone.trim() || !form.value.deviceInfo.trim()) {
    ElMessage.warning('Vui lòng nhập đầy đủ khách hàng, số điện thoại và thông tin thiết bị!');
    return;
  }
  const code = 'NP-2026-' + String(Math.floor(100 + Math.random() * 900));
  tickets.value.unshift({
    ticketCode: code,
    ...form.value,
    status: 'RECEIVED',
  });
  saveTickets();
  dialogVisible.value = false;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>

