<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Quản lý Nội dung (CMS)</h1>
      <el-button type="success" @click="openDialog()">Tạo Trang mới</el-button>
    </div>
    
    <el-card shadow="never">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="Tiêu đề Trang" />
        <el-table-column prop="slug" label="Đường dẫn (Slug)" width="200" />
        <el-table-column label="Trên Menu" width="120" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.isMenuItem ? 'success' : 'info'">
              {{ scope.row.isMenuItem ? 'Có' : 'Không' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="Cập nhật lần cuối" width="200" />
        <el-table-column label="Thao tác" width="200" align="right">
          <template #default="scope">
            <el-button size="small" @click="openDialog(scope.row)">Sửa</el-button>
            <el-button size="small" type="danger" @click="deletePage(scope.row.slug)">Xóa</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Modal Tạo / Sửa Trang -->
    <el-dialog v-model="dialogVisible" :title="isEdit ? 'Sửa Trang' : 'Tạo Trang mới'" width="50%">
      <el-form label-position="top">
        <el-form-item label="Tiêu đề Trang">
          <el-input v-model="formData.title" placeholder="Nhập tiêu đề trang..." />
        </el-form-item>
        <el-form-item label="Đường dẫn (Slug)">
          <el-input v-model="formData.slug" placeholder="Ví dụ: about-us, chih-sach-bao-hanh..." />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="formData.isMenuItem">Hiển thị trên Menu chính</el-checkbox>
        </el-form-item>
        <el-form-item label="Mô tả ngắn (Excerpt)">
          <el-input v-model="formData.excerpt" type="textarea" :rows="2" placeholder="Một đoạn giới thiệu ngắn gọn..." />
        </el-form-item>
        <el-form-item label="Ảnh bìa (Cover Image)">
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/upload"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
            :before-upload="beforeUpload"
          >
            <el-button type="primary">Chọn ảnh để Tải lên</el-button>
          </el-upload>
          <div v-if="formData.coverImage" class="mt-2 relative">
            <img :src="formData.coverImage" alt="Cover" class="w-48 h-32 object-cover rounded shadow" />
            <el-button size="small" type="danger" class="absolute top-1 right-1" @click="formData.coverImage = ''">Xóa</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Nội dung trang">
          <div class="quill-container w-full bg-white border border-gray-300 rounded overflow-hidden">
            <QuillEditor 
              v-model:content="formData.content" 
              contentType="html" 
              theme="snow"
              style="min-height: 400px"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Hủy</el-button>
          <el-button type="success" @click="savePage">Lưu lại</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '../../services/api'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const dialogVisible = ref(false)
const isEdit = ref(false)
const originalSlug = ref('')

const formData = ref({
  title: '',
  slug: '',
  excerpt: '',
  coverImage: '',
  content: '',
  isMenuItem: false
})

const tableData = ref<any[]>([])

const fetchPages = async () => {
  try {
    const res = await api.get('/content')
    tableData.value = res.data
  } catch (error) {
    ElMessage.error('Không thể tải dữ liệu CMS')
  }
}

onMounted(() => {
  fetchPages()
})

const openDialog = (row?: any) => {
  if (row) {
    isEdit.value = true
    originalSlug.value = row.slug
    formData.value = { 
      title: row.title, 
      slug: row.slug,
      excerpt: row.excerpt || '',
      coverImage: row.coverImage || '',
      content: row.content,
      isMenuItem: row.isMenuItem ?? false
    }
  } else {
    isEdit.value = false
    originalSlug.value = ''
    formData.value = { title: '', slug: '', excerpt: '', coverImage: '', content: '', isMenuItem: false }
  }
  dialogVisible.value = true
}

const savePage = async () => {
  try {
    if (isEdit.value) {
      await api.patch(`/content/${originalSlug.value}`, formData.value)
      ElMessage.success('Cập nhật thành công')
    } else {
      await api.post('/content', formData.value)
      ElMessage.success('Tạo trang thành công')
    }
    dialogVisible.value = false
    fetchPages()
  } catch (error) {
    ElMessage.error('Có lỗi xảy ra khi lưu')
  }
}

const deletePage = async (slug: string) => {
  try {
    await api.delete(`/content/${slug}`)
    ElMessage.success('Xóa thành công')
    fetchPages()
  } catch (error) {
    ElMessage.error('Có lỗi xảy ra khi xóa')
  }
}

// Upload Handling
const handleUploadSuccess = (response: any) => {
  formData.value.coverImage = 'http://localhost:3000' + response.url
  ElMessage.success('Tải ảnh lên thành công!')
}

const beforeUpload = (file: any) => {
  const isImage = file.type.startsWith('image/')
  if (!isImage) {
    ElMessage.error('Chỉ được phép tải lên file hình ảnh!')
  }
  return isImage
}
</script>
