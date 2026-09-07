<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý Danh mục</h1>
      <el-button type="success" @click="dialogVisible = true">Thêm Danh mục</el-button>
    </div>
    
    <el-card shadow="never">
      <el-table :data="tableData" style="width: 100%" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
        <el-table-column prop="name" label="Tên Danh mục" />
        <el-table-column prop="slug" label="Đường dẫn (Slug)" width="250" />
        <el-table-column label="Thao tác" width="200" align="right">
          <template #default>
            <el-button size="small">Sửa</el-button>
            <el-button size="small" type="danger">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog v-model="dialogVisible" title="Thêm Danh mục" width="30%">
      <el-form label-position="top">
        <el-form-item label="Tên Danh mục">
          <el-input placeholder="Ví dụ: CPU" />
        </el-form-item>
        <el-form-item label="Đường dẫn (Slug)">
          <el-input placeholder="Ví dụ: cpu" />
        </el-form-item>
        <el-form-item label="Danh mục Cha">
          <el-select placeholder="Chọn danh mục cha" class="w-full">
            <el-option label="Không có (Danh mục gốc)" value="" />
            <el-option label="Linh kiện máy tính" value="linh-kien" />
            <el-option label="Laptop" value="laptop" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Hủy</el-button>
          <el-button type="success" @click="dialogVisible = false">Lưu</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dialogVisible = ref(false)

const tableData = ref([
  { 
    id: 1, 
    name: 'Linh kiện máy tính', 
    slug: 'linh-kien-may-tinh',
    children: [
      { id: 11, name: 'CPU', slug: 'cpu' },
      { id: 12, name: 'RAM', slug: 'ram' },
      { id: 13, name: 'Nguồn', slug: 'nguon' },
      { id: 14, name: 'Mainboard', slug: 'mainboard' }
    ]
  },
  { 
    id: 2, 
    name: 'Laptop', 
    slug: 'laptop',
    children: [
      { id: 21, name: 'Laptop Gaming', slug: 'laptop-gaming' },
      { id: 22, name: 'Laptop Văn phòng', slug: 'laptop-van-phong' }
    ]
  },
])
</script>
