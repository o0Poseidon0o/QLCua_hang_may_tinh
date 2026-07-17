<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý Kho hàng</h1>
      <el-button type="primary">Nhập kho</el-button>
    </div>
    
    <el-card shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="productName" label="Sản phẩm" />
        <el-table-column prop="sku" label="Mã SP (SKU)" width="150" />
        <el-table-column prop="quantity" label="Số lượng tồn" width="150" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.quantity > 10 ? 'success' : 'danger'">
              {{ scope.row.quantity }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Thao tác" width="150" align="right">
          <template #default>
            <el-button size="small">Cập nhật</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = ref([
  { sku: 'CPU-INTEL-i9', productName: 'Intel Core i9-13900K', quantity: 45 },
  { sku: 'GPU-NV-4090', productName: 'NVIDIA GeForce RTX 4090', quantity: 2 },
  { sku: 'RAM-COR-32', productName: 'Corsair Vengeance 32GB DDR5', quantity: 120 },
])
</script>
