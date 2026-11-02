<template>
  <div class="space-y-6">
    <div class="flex flex-wrap justify-between items-center gap-4">
      <div>
        <h1 class="text-2xl font-extrabold text-slate-800">Quản lý Tin tức & Cẩm nang Công nghệ</h1>
        <p class="text-sm text-slate-500 mt-0.5">
          Đăng bài viết mới, chỉnh sửa cẩm nang máy tính, đánh giá linh kiện và bài viết tư vấn cấu hình trên trang <strong>/tin-tuc</strong>.
        </p>
      </div>
      <div class="flex items-center gap-2.5">
        <router-link
          to="/tin-tuc"
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] hover:bg-emerald-50 text-xs font-bold transition"
        >
          Xem trang Tin tức &nearr;
        </router-link>
        <el-button type="success" color="#00733c" @click="openCreateDialog">
          + Viết Bài Mới
        </el-button>
      </div>
    </div>

    <el-card shadow="never" class="rounded-2xl border-slate-200/80">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div class="flex items-center gap-3">
          <el-input
            v-model="searchQuery"
            placeholder="Tìm theo tiêu đề bài viết, tác giả..."
            clearable
            class="w-72"
          />
          <el-select v-model="categoryFilter" placeholder="Chuyên mục" clearable class="w-52">
            <el-option label="Tất cả chuyên mục" value="" />
            <el-option label="Đánh Giá Linh Kiện" value="Đánh Giá Linh Kiện" />
            <el-option label="Tư Vấn Cấu Hình" value="Tư Vấn Cấu Hình" />
            <el-option label="Thủ Thuật Máy Tính" value="Thủ Thuật Máy Tính" />
            <el-option label="IT Outsourcing" value="IT Outsourcing" />
          </el-select>
        </div>
        <div class="text-xs text-slate-500">
          Tổng số: <strong class="text-slate-800">{{ filteredNews.length }}</strong> bài viết
        </div>
      </div>

      <el-table :data="filteredNews" border stripe style="width: 100%">
        <el-table-column label="Bài viết" min-width="320">
          <template #default="{ row }">
            <div class="flex items-center gap-3">
              <img
                :src="row.image"
                :alt="row.title"
                class="w-16 h-11 rounded-lg object-cover border border-slate-200 flex-shrink-0"
              />
              <div class="min-w-0">
                <div class="font-bold text-slate-800 text-sm line-clamp-1">{{ row.title }}</div>
                <div class="text-xs text-slate-400 font-mono truncate">/tin-tuc/{{ row.slug }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="category" label="Chuyên mục" width="170">
          <template #default="{ row }">
            <el-tag size="small" type="success">{{ row.category }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="author" label="Tác giả / Người đăng" width="180" />

        <el-table-column prop="date" label="Ngày đăng" width="120" align="center" />

        <el-table-column label="Thao tác" width="170" align="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" plain @click="openEditDialog(row)">
              Sửa bài
            </el-button>
            <el-button size="small" type="danger" plain @click="handleDelete(row)">
              Xóa
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Dialog Soạn thảo Bài viết -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? 'Chỉnh sửa Bài viết Tin tức & Cẩm nang' : 'Đăng Bài viết mới'"
      width="780px"
    >
      <el-form label-position="top" class="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        <el-form-item label="Tiêu đề bài viết *" class="sm:col-span-2">
          <el-input
            v-model="form.title"
            placeholder="Nhập tiêu đề bài viết..."
            @input="autoGenerateSlug"
          />
        </el-form-item>

        <el-form-item label="Đường dẫn tĩnh (Slug) *">
          <el-input v-model="form.slug" placeholder="vi-du-bai-viet-moi" />
        </el-form-item>

        <el-form-item label="Chuyên mục *">
          <el-select v-model="form.category" class="w-full">
            <el-option label="Đánh Giá Linh Kiện" value="Đánh Giá Linh Kiện" />
            <el-option label="Tư Vấn Cấu Hình" value="Tư Vấn Cấu Hình" />
            <el-option label="Thủ Thuật Máy Tính" value="Thủ Thuật Máy Tính" />
            <el-option label="IT Outsourcing" value="IT Outsourcing" />
          </el-select>
        </el-form-item>

        <el-form-item label="Tác giả hiển thị">
          <el-input v-model="form.author" placeholder="Kỹ Thuật Nhân Phúc Tech" />
        </el-form-item>

        <el-form-item label="Thời lượng đọc">
          <el-input v-model="form.readTime" placeholder="5 phút đọc" />
        </el-form-item>

        <el-form-item label="Link Ảnh bìa (Thumbnail URL)" class="sm:col-span-2">
          <el-input v-model="form.image" placeholder="https://images.unsplash.com/..." />
        </el-form-item>

        <el-form-item label="Đoạn tóm tắt ngắn (Excerpt) *" class="sm:col-span-2">
          <el-input
            v-model="form.excerpt"
            type="textarea"
            :rows="2"
            placeholder="Tóm tắt nội dung chính hiển thị ngoài danh sách bài viết..."
          />
        </el-form-item>

        <el-form-item label="Nội dung chi tiết bài viết" class="sm:col-span-2">
          <div class="w-full bg-white border border-slate-300 rounded-xl overflow-hidden">
            <QuillEditor
              v-model:content="form.content"
              contentType="html"
              theme="snow"
              style="min-height: 280px"
            />
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="saveArticle">
          {{ isEdit ? 'Lưu cập nhật' : 'Đăng bài viết' }}
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useSiteContentStore } from '../../stores/siteContent';
import { useAuthStore } from '../../stores/auth';
import type { NewsArticle } from '../../data/mockNews';

const siteContentStore = useSiteContentStore();
const authStore = useAuthStore();

const searchQuery = ref('');
const categoryFilter = ref('');

const filteredNews = computed(() => {
  return siteContentStore.newsList.filter((item) => {
    const q = searchQuery.value.trim().toLowerCase();
    const matchQ =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.author.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q);
    const matchCat = !categoryFilter.value || item.category === categoryFilter.value;
    return matchQ && matchCat;
  });
});

const dialogVisible = ref(false);
const isEdit = ref(false);
const editingId = ref('');

const form = ref({
  title: '',
  slug: '',
  category: 'Tư Vấn Cấu Hình',
  author: '',
  date: '',
  readTime: '5 phút đọc',
  image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
  excerpt: '',
  content: '',
});

const toSlug = (str: string) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const autoGenerateSlug = () => {
  if (!isEdit.value) {
    form.value.slug = toSlug(form.value.title);
  }
};

const openCreateDialog = () => {
  isEdit.value = false;
  editingId.value = '';
  form.value = {
    title: '',
    slug: '',
    category: 'Tư Vấn Cấu Hình',
    author: authStore.currentUser?.fullName || 'Ban Biên Tập Nhân Phúc Tech',
    date: new Date().toLocaleDateString('vi-VN'),
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
    excerpt: '',
    content: '<p>Nội dung chi tiết bài viết...</p>',
  };
  dialogVisible.value = true;
};

const openEditDialog = (row: NewsArticle) => {
  isEdit.value = true;
  editingId.value = row.id;
  form.value = {
    title: row.title,
    slug: row.slug,
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.readTime,
    image: row.image,
    excerpt: row.excerpt,
    content: row.content,
  };
  dialogVisible.value = true;
};

const saveArticle = () => {
  if (!form.value.title.trim() || !form.value.slug.trim()) {
    ElMessage.warning('Vui lòng nhập tiêu đề và đường dẫn (slug) cho bài viết!');
    return;
  }

  if (isEdit.value) {
    siteContentStore.updateNewsArticle(editingId.value, { ...form.value });
    ElMessage.success('Đã cập nhật bài viết thành công!');
  } else {
    siteContentStore.addNewsArticle({ ...form.value });
    ElMessage.success('Đã đăng bài viết mới thành công!');
  }
  dialogVisible.value = false;
};

const handleDelete = (row: NewsArticle) => {
  ElMessageBox.confirm(`Bạn có chắc muốn xóa bài viết "${row.title}" không?`, 'Xác nhận xóa', {
    type: 'warning',
    confirmButtonText: 'Xóa bài',
    cancelButtonText: 'Hủy',
  })
    .then(() => {
      siteContentStore.deleteNewsArticle(row.id);
      ElMessage.success('Đã xóa bài viết!');
    })
    .catch(() => {});
};
</script>

