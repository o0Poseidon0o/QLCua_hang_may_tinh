<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-800">🖼️ Banner Trang chủ</h1>
        <p class="text-xs text-slate-500 mt-1">
          Chỉnh sửa các slide quảng cáo chạy ở đầu trang chủ. Thay đổi được áp dụng ngay lập tức trên website.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <el-button @click="handleReset">Khôi phục mặc định</el-button>
        <el-button type="success" color="#00733c" :icon="Plus" @click="openCreate">Thêm slide mới</el-button>
      </div>
    </div>

    <!-- Live preview carousel -->
    <div class="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-bold text-slate-700">Xem trước trên trang chủ</h3>
        <span class="text-[11px] text-slate-400">{{ activeCount }} / {{ store.heroBanners.length }} slide đang hiển thị</span>
      </div>
      <div v-if="activeCount" class="rounded-xl overflow-hidden max-w-3xl">
        <el-carousel height="220px" indicator-position="inside" :interval="4000">
          <el-carousel-item v-for="slide in activeSlides" :key="slide.id">
            <BannerPreview :slide="slide" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-empty v-else description="Chưa có slide nào đang bật hiển thị" :image-size="70" />
    </div>

    <!-- Danh sách slide -->
    <div class="space-y-3">
      <div
        v-for="(slide, idx) in store.heroBanners"
        :key="slide.id"
        class="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 flex flex-col md:flex-row gap-3 sm:gap-4"
        :class="{ 'opacity-60': !slide.active }"
      >
        <div
          class="w-full md:w-60 h-32 md:h-auto md:min-h-[120px] rounded-xl bg-cover bg-center flex-shrink-0 relative"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <span class="absolute top-2 left-2 bg-black/60 text-white text-[11px] font-bold px-2 py-0.5 rounded">#{{ idx + 1 }}</span>
        </div>

        <div class="flex-1 min-w-0 space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <span v-if="slide.tag" class="text-[10px] font-extrabold uppercase bg-red-600 text-white px-2 py-0.5 rounded-full">{{ slide.tag }}</span>
            <el-tag :type="slide.active ? 'success' : 'info'" size="small">{{ slide.active ? 'Đang hiển thị' : 'Đang ẩn' }}</el-tag>
          </div>
          <h3 class="font-bold text-slate-800 text-sm sm:text-base line-clamp-2">{{ slide.title }}</h3>
          <p class="text-xs text-slate-500 line-clamp-2">{{ slide.desc }}</p>
          <div class="text-[11px] text-slate-400 flex flex-wrap gap-x-3 gap-y-0.5">
            <span>Nút: <strong class="text-slate-600">{{ slide.btnText || '—' }}</strong></span>
            <span>Liên kết: <code class="text-[#00733c]">{{ slide.link || '—' }}</code></span>
            <span v-if="slide.highlight">Điểm nhấn: <strong class="text-amber-600">{{ slide.highlight }}</strong></span>
          </div>
        </div>

        <div class="flex md:flex-col items-center md:items-end justify-between gap-2 flex-shrink-0">
          <el-switch
            :model-value="slide.active"
            inline-prompt
            active-text="Hiện"
            inactive-text="Ẩn"
            style="--el-switch-on-color: #00733c"
            @change="(v: any) => store.updateBanner(slide.id, { active: !!v })"
          />
          <div class="flex flex-wrap gap-1.5 justify-end">
            <el-button size="small" :icon="ArrowUp" :disabled="idx === 0" @click="store.moveBanner(slide.id, -1)" title="Lên trên" />
            <el-button size="small" :icon="ArrowDown" :disabled="idx === store.heroBanners.length - 1" @click="store.moveBanner(slide.id, 1)" title="Xuống dưới" />
            <el-button size="small" type="primary" :icon="Edit" @click="openEdit(slide)">Sửa</el-button>
            <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(slide)" />
          </div>
        </div>
      </div>

      <el-empty v-if="!store.heroBanners.length" description="Chưa có slide nào. Bấm “Thêm slide mới” để bắt đầu." />
    </div>

    <!-- Dialog thêm/sửa -->
    <el-dialog v-model="dialogVisible" :title="editingId ? 'Chỉnh sửa slide banner' : 'Thêm slide banner mới'" width="860px" top="5vh">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <el-form label-position="top" :model="form">
          <el-form-item label="Nhãn nổi bật (Tag)">
            <el-input v-model="form.tag" maxlength="30" show-word-limit placeholder="VD: Siêu Ưu Đãi Tháng" />
          </el-form-item>
          <el-form-item label="Tiêu đề chính" required>
            <el-input v-model="form.title" type="textarea" :rows="2" maxlength="90" show-word-limit />
          </el-form-item>
          <el-form-item label="Mô tả ngắn">
            <el-input v-model="form.desc" type="textarea" :rows="3" maxlength="180" show-word-limit />
          </el-form-item>
          <el-form-item label="Hình nền">
            <div class="w-full space-y-2">
              <el-input v-model="form.image" placeholder="Dán URL hình ảnh (https://...)" clearable />
              <div class="flex items-center gap-2">
                <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-[#00733c] hover:text-[#00733c] cursor-pointer">
                  <el-icon><Upload /></el-icon> Tải ảnh từ máy
                  <input type="file" accept="image/*" class="hidden" @change="handleFile" />
                </label>
                <span class="text-[11px] text-slate-400">Khuyên dùng ảnh ngang 1200×500, &lt; 800KB</span>
              </div>
            </div>
          </el-form-item>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-3">
            <el-form-item label="Chữ trên nút">
              <el-input v-model="form.btnText" maxlength="24" placeholder="VD: Khám Phá Ngay" />
            </el-form-item>
            <el-form-item label="Liên kết khi bấm nút">
              <el-select v-model="form.link" filterable allow-create default-first-option placeholder="/shop?category=..." class="w-full">
                <el-option v-for="opt in linkOptions" :key="opt.value" :label="opt.label" :value="opt.value" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="Dòng điểm nhấn (màu vàng)">
            <el-input v-model="form.highlight" maxlength="50" placeholder="VD: Hỗ Trợ Trả Góp 0% Lãi Suất" />
          </el-form-item>
          <el-form-item label="Trạng thái">
            <el-switch v-model="form.active" active-text="Hiển thị trên trang chủ" style="--el-switch-on-color: #00733c" />
          </el-form-item>
        </el-form>

        <div class="space-y-3">
          <div class="text-xs font-bold text-slate-500 uppercase">Xem trước – Máy tính</div>
          <div class="rounded-xl overflow-hidden h-[220px] border border-slate-200">
            <BannerPreview :slide="form" />
          </div>
          <div class="text-xs font-bold text-slate-500 uppercase">Xem trước – Điện thoại</div>
          <div class="rounded-xl overflow-hidden h-[200px] w-[300px] max-w-full border border-slate-200">
            <BannerPreview :slide="form" compact />
          </div>
        </div>
      </div>

      <template #footer>
        <el-button @click="dialogVisible = false">Hủy</el-button>
        <el-button type="success" color="#00733c" @click="handleSave">Lưu slide</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, defineComponent, h, type PropType } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, ArrowUp, ArrowDown, Upload } from '@element-plus/icons-vue';
import { useSiteContentStore, type HeroBannerSlide } from '../../stores/siteContent';

const store = useSiteContentStore();

/** Khối xem trước 1 slide (dùng chung cho carousel & dialog) */
const BannerPreview = defineComponent({
  props: {
    slide: { type: Object as PropType<Partial<HeroBannerSlide>>, required: true },
    compact: { type: Boolean, default: false },
  },
  setup(props) {
    return () => {
      const s = props.slide;
      const c = props.compact;
      return h(
        'div',
        {
          class: `w-full h-full bg-cover bg-center flex items-center text-white ${c ? 'p-4' : 'p-6'}`,
          style: {
            backgroundColor: '#014f2b',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(1,79,43,0.75))${s.image ? `, url(${s.image})` : ''}`,
          },
        },
        [
          h('div', { class: 'max-w-md space-y-2' }, [
            s.tag
              ? h('span', { class: 'inline-block px-2.5 py-0.5 bg-red-600 font-extrabold text-[10px] uppercase tracking-wider rounded-full' }, s.tag)
              : null,
            h('h2', { class: `${c ? 'text-base' : 'text-xl'} font-black leading-snug line-clamp-2` }, s.title || 'Tiêu đề banner'),
            s.desc ? h('p', { class: `${c ? 'text-[11px]' : 'text-xs'} text-slate-100 line-clamp-2` }, s.desc) : null,
            h('div', { class: 'flex flex-wrap items-center gap-2 pt-1' }, [
              s.btnText
                ? h('span', { class: `${c ? 'px-3 py-1.5 text-[11px]' : 'px-4 py-2 text-xs'} bg-[#00733c] font-bold rounded-lg` }, s.btnText)
                : null,
              s.highlight ? h('span', { class: 'text-[11px] text-amber-300 font-semibold' }, s.highlight) : null,
            ]),
          ]),
        ]
      );
    };
  },
});

const activeSlides = computed(() => store.heroBanners.filter((b) => b.active));
const activeCount = computed(() => activeSlides.value.length);

const linkOptions = [
  { label: 'Cửa hàng – Tất cả sản phẩm', value: '/shop' },
  { label: 'PC Gaming', value: '/shop?category=pc-gaming' },
  { label: 'Laptop', value: '/shop?category=laptop' },
  { label: 'Linh kiện máy tính', value: '/shop?category=linh-kien' },
  { label: 'Màn hình', value: '/shop?category=man-hinh' },
  { label: 'Gaming Gear', value: '/shop?category=gaming-gear' },
  { label: 'Xây dựng cấu hình PC', value: '/pc-builder' },
  { label: 'Dịch vụ sửa chữa', value: '/services/repair' },
  { label: 'IT Outsourcing', value: '/services/it-outsourcing' },
  { label: 'Tin tức & Cẩm nang', value: '/tin-tuc' },
];

const emptyForm = (): Omit<HeroBannerSlide, 'id'> => ({
  title: '',
  desc: '',
  tag: '',
  image: '',
  link: '/shop',
  btnText: 'Xem Ngay',
  highlight: '',
  active: true,
});

const dialogVisible = ref(false);
const editingId = ref<string | null>(null);
const form = reactive(emptyForm());

const openCreate = () => {
  editingId.value = null;
  Object.assign(form, emptyForm());
  dialogVisible.value = true;
};

const openEdit = (slide: HeroBannerSlide) => {
  editingId.value = slide.id;
  const { id: _id, ...rest } = slide;
  Object.assign(form, emptyForm(), rest);
  dialogVisible.value = true;
};

const handleFile = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 800 * 1024) {
    ElMessage.warning('Ảnh quá lớn (> 800KB). Vui lòng nén ảnh hoặc dùng URL ảnh.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    form.image = String(reader.result || '');
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const handleSave = () => {
  if (!form.title.trim()) {
    ElMessage.warning('Vui lòng nhập tiêu đề slide!');
    return;
  }
  if (!form.image.trim()) {
    ElMessage.warning('Vui lòng chọn hình nền cho slide!');
    return;
  }
  try {
    if (editingId.value) {
      store.updateBanner(editingId.value, { ...form });
      ElMessage.success('Đã cập nhật slide banner!');
    } else {
      store.addBanner({ ...form });
      ElMessage.success('Đã thêm slide banner mới!');
    }
    dialogVisible.value = false;
  } catch (err) {
    ElMessage.error('Không thể lưu – dung lượng lưu trữ trình duyệt đã đầy. Hãy dùng URL ảnh thay vì tải ảnh lên.');
  }
};

const handleDelete = async (slide: HeroBannerSlide) => {
  try {
    await ElMessageBox.confirm(`Xóa slide “${slide.title}”?`, 'Xác nhận xóa', {
      type: 'warning',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    });
    store.deleteBanner(slide.id);
    ElMessage.success('Đã xóa slide');
  } catch {
    /* người dùng hủy */
  }
};

const handleReset = async () => {
  try {
    await ElMessageBox.confirm('Khôi phục 3 slide banner mặc định? Các thay đổi hiện tại sẽ bị mất.', 'Khôi phục mặc định', {
      type: 'warning',
      confirmButtonText: 'Khôi phục',
      cancelButtonText: 'Hủy',
    });
    store.resetBanners();
    ElMessage.success('Đã khôi phục banner mặc định');
  } catch {
    /* người dùng hủy */
  }
};
</script>

