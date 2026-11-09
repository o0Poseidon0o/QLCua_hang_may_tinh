<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <h1 class="text-xl sm:text-2xl font-extrabold text-slate-800">
          🖼️ Quản lý Banner Trang chủ &amp; Giờ Vàng Giá Sốc
        </h1>
        <p class="text-xs text-slate-500 mt-1">
          Chỉnh sửa Slide Banner chính, khu vực Giờ Vàng Giá Sốc (Flash Sale), 2 Banner phụ và khối CTA. Mọi thay đổi được áp dụng tức thì ngoài trang chủ.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <router-link
          to="/"
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-[#00733c] text-[#00733c] text-xs font-bold hover:bg-emerald-50 transition inline-flex items-center gap-1"
        >
          Xem Trang Chủ &nearr;
        </router-link>
      </div>
    </div>

    <!-- Tabs -->
    <el-tabs v-model="activeTab" type="border-card" class="rounded-2xl overflow-hidden border-slate-200">
      <!-- ==================== TAB 1: SLIDE BANNER CHÍNH ==================== -->
      <el-tab-pane name="hero" label="🖼️ Slide Banner Chính (Carousel)">
        <div class="space-y-5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="text-xs text-slate-500">
              Đang hiển thị <strong class="text-[#00733c]">{{ activeCount }}</strong> / {{ store.heroBanners.length }} slide trên trang chủ
            </div>
            <div class="flex flex-wrap gap-2">
              <el-button size="small" @click="handleResetBanners">Khôi phục mặc định</el-button>
              <el-button size="small" type="success" color="#00733c" :icon="Plus" @click="openCreate">
                + Thêm slide mới
              </el-button>
            </div>
          </div>

          <!-- Live preview carousel -->
          <div class="bg-slate-50 rounded-2xl border border-slate-200 p-3 sm:p-4">
            <div class="text-xs font-bold text-slate-600 mb-2">Xem trước trực tiếp</div>
            <div v-if="activeCount" class="rounded-xl overflow-hidden max-w-3xl">
              <el-carousel height="210px" indicator-position="inside" :interval="4000">
                <el-carousel-item v-for="slide in activeSlides" :key="slide.id">
                  <BannerPreview :slide="slide" />
                </el-carousel-item>
              </el-carousel>
            </div>
            <el-empty v-else description="Chưa có slide nào đang bật hiển thị" :image-size="60" />
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
          </div>
        </div>
      </el-tab-pane>

      <!-- ==================== TAB 2: GIỜ VÀNG GIÁ SỐC (FLASH SALE) ==================== -->
      <el-tab-pane name="flash" label="⚡ Giờ Vàng Giá Sốc (Flash Sale)">
        <div class="space-y-6">
          <!-- Cấu hình tiêu đề & đồng hồ đếm ngược -->
          <div class="bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 p-4 sm:p-5 rounded-2xl border border-red-200/80 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 class="text-base font-extrabold text-red-700 flex items-center gap-2">
                  <span>⚡</span> Cấu hình Khung Giờ Vàng Giá Sốc (Flash Deals)
                </h3>
                <p class="text-xs text-slate-600">
                  Chỉnh sửa tiêu đề, nhãn phụ, bộ đếm ngược thời gian và danh sách sản phẩm giảm giá sốc trên trang chủ.
                </p>
              </div>
              <div class="flex items-center gap-3">
                <el-switch
                  v-model="store.flashSale.enabled"
                  active-text="Hiển thị trên Trang chủ"
                  inactive-text="Tạm ẩn"
                  style="--el-switch-on-color: #dc2626"
                  @change="saveFlashSaleConfig"
                />
                <el-button size="small" @click="handleResetFlashSale">Khôi phục mặc định</el-button>
                <el-button size="small" type="danger" @click="saveFlashSaleConfig">
                  💾 Lưu cấu hình Flash Sale
                </el-button>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Tiêu đề chính *</label>
                <el-input v-model="store.flashSale.title" placeholder="GIỜ VÀNG GIÁ SỐC" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Nhãn nổi bật (Badge)</label>
                <el-input v-model="store.flashSale.badge" placeholder="Nhân Phúc Flash Deals" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Dòng mô tả phụ</label>
                <el-input v-model="store.flashSale.subtitle" placeholder="Số lượng có hạn, ưu đãi kết thúc sau:" />
              </div>
            </div>

            <div class="grid grid-cols-3 sm:grid-cols-6 gap-3 items-end pt-1">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Số Giờ đếm ngược</label>
                <el-input-number v-model="store.flashSale.hours" :min="0" :max="99" class="w-full" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Số Phút</label>
                <el-input-number v-model="store.flashSale.minutes" :min="0" :max="59" class="w-full" />
              </div>
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Số Giây</label>
                <el-input-number v-model="store.flashSale.seconds" :min="0" :max="59" class="w-full" />
              </div>
              <div class="col-span-3 text-xs text-slate-500">
                Cập nhật lần cuối: <strong>{{ store.flashSale.updatedAt || 'Mới' }}</strong> bởi
                <strong>{{ store.flashSale.updatedBy || 'Quản trị viên' }}</strong>
              </div>
            </div>
          </div>

          <!-- Danh sách sản phẩm trong Giờ vàng giá sốc -->
          <div class="space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h4 class="text-sm font-extrabold text-slate-800">
                  Danh sách Sản phẩm trong Giờ Vàng Giá Sốc ({{ store.flashSale.items.length }} sản phẩm)
                </h4>
                <p class="text-xs text-slate-500">
                  Bạn có thể chọn nhanh từ kho sản phẩm hoặc tự thêm sản phẩm khuyến mãi tùy chỉnh.
                </p>
              </div>
              <el-button type="danger" size="small" :icon="Plus" @click="openAddFlashItem">
                + Thêm sản phẩm Flash Sale
              </el-button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                v-for="(item, idx) in store.flashSale.items"
                :key="item.id + '-' + idx"
                class="bg-white rounded-2xl border border-slate-200 p-3.5 flex flex-col justify-between shadow-xs relative"
              >
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <span class="bg-red-600 text-white text-xs font-black px-2 py-0.5 rounded">
                      -{{ item.discount }}%
                    </span>
                    <span class="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {{ item.brand }}
                    </span>
                  </div>
                  <div class="aspect-square rounded-xl bg-slate-50 p-2 mb-2.5 flex items-center justify-center overflow-hidden">
                    <img :src="item.image" :alt="item.name" class="object-contain w-full h-full" />
                  </div>
                  <div class="font-bold text-xs text-slate-800 line-clamp-2 min-h-[34px]">
                    {{ item.name }}
                  </div>
                  <div class="mt-1.5 flex items-baseline gap-2">
                    <span class="font-black text-red-600 text-sm">{{ formatPrice(item.price) }}</span>
                    <span class="text-xs text-slate-400 line-through">{{ formatPrice(item.originalPrice) }}</span>
                  </div>
                  <div class="mt-2 text-[11px] text-slate-500 flex justify-between">
                    <span>Đã bán: <strong>{{ item.sold }}/{{ item.stock }}</strong></span>
                    <span class="text-red-600 font-bold">Hot</span>
                  </div>
                </div>

                <div class="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                  <div class="flex gap-1">
                    <el-button size="small" :icon="ArrowUp" :disabled="idx === 0" @click="moveFlashItem(idx, -1)" />
                    <el-button size="small" :icon="ArrowDown" :disabled="idx === store.flashSale.items.length - 1" @click="moveFlashItem(idx, 1)" />
                  </div>
                  <div class="flex gap-1">
                    <el-button size="small" type="primary" :icon="Edit" @click="openEditFlashItem(item, idx)">Sửa</el-button>
                    <el-button size="small" type="danger" plain :icon="Delete" @click="removeFlashItem(idx)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>

      <!-- ==================== TAB 3: BANNER PHỤ & CTA ==================== -->
      <el-tab-pane name="promos" label="🎯 2 Banner Phụ &amp; Khối CTA">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-extrabold text-slate-800">2 Banner Phụ cạnh Slide Chính</h3>
            <div class="flex gap-2">
              <el-button size="small" @click="handleResetHomePromos">Khôi phục mặc định</el-button>
              <el-button size="small" type="success" color="#00733c" @click="savePromosConfig">
                💾 Lưu Banner Phụ &amp; CTA
              </el-button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(b, idx) in store.homePromos.sideBanners"
              :key="b.id"
              class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
            >
              <div class="font-bold text-xs text-[#00733c] uppercase">Banner phụ #{{ idx + 1 }}</div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Nhãn nhỏ phía trên</label>
                  <el-input v-model="b.subtitle" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Biểu tượng (Emoji)</label>
                  <el-input v-model="b.icon" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề chính</label>
                <el-input v-model="b.title" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Mô tả ngắn</label>
                <el-input v-model="b.desc" type="textarea" :rows="2" />
              </div>
              <div class="grid grid-cols-3 gap-3">
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Chữ trên nút</label>
                  <el-input v-model="b.btnText" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Đường dẫn</label>
                  <el-input v-model="b.link" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-slate-600 mb-1">Tông màu</label>
                  <el-select v-model="b.theme" class="w-full">
                    <el-option label="Xanh Nhân Phúc" value="emerald" />
                    <el-option label="Cam / Đỏ" value="amber" />
                    <el-option label="Xanh Dương" value="blue" />
                    <el-option label="Tím" value="purple" />
                  </el-select>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <div class="font-bold text-xs text-[#00733c] uppercase">Banner Lớn Cuối Trang (CTA Build PC)</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nhãn nổi bật</label>
                <el-input v-model="store.homePromos.ctaBadge" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Tiêu đề lớn</label>
                <el-input v-model="store.homePromos.ctaTitle" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-semibold text-slate-600 mb-1">Mô tả</label>
              <el-input v-model="store.homePromos.ctaDesc" type="textarea" :rows="2" />
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nút chính (Text)</label>
                <el-input v-model="store.homePromos.ctaPrimaryText" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nút chính (Link)</label>
                <el-input v-model="store.homePromos.ctaPrimaryLink" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nút phụ (Text)</label>
                <el-input v-model="store.homePromos.ctaSecondaryText" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-slate-600 mb-1">Nút phụ (Link)</label>
                <el-input v-model="store.homePromos.ctaSecondaryLink" />
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- Dialog thêm/sửa Slide Banner Chính -->
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

    <!-- Dialog Thêm/Sửa Sản phẩm Giờ Vàng Giá Sốc -->
    <el-dialog
      v-model="flashDialogVisible"
      :title="editingFlashIdx !== null ? 'Chỉnh sửa Sản phẩm Giờ Vàng Giá Sốc' : 'Thêm Sản phẩm Giờ Vàng Giá Sốc'"
      width="620px"
    >
      <el-form label-position="top">
        <el-form-item label="Chọn nhanh từ Kho Sản Phẩm (Tự động điền thông tin)">
          <el-select
            v-model="selectedProductIdToImport"
            filterable
            clearable
            placeholder="Gõ tên hoặc mã sản phẩm để lấy thông tin tự động..."
            class="w-full"
            @change="onPickProductForFlashSale"
          >
            <el-option
              v-for="p in productStore.products"
              :key="p.id"
              :label="`${p.sku} - ${p.name} (${formatPrice(p.price)})`"
              :value="p.id"
            />
          </el-select>
        </el-form-item>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          <el-form-item label="Tên sản phẩm hiển thị *" class="sm:col-span-2">
            <el-input v-model="flashForm.name" placeholder="Nhập tên sản phẩm..." />
          </el-form-item>
          <el-form-item label="Thương hiệu *">
            <el-input v-model="flashForm.brand" placeholder="ASUS, Intel, Kingston..." />
          </el-form-item>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
          <el-form-item label="Giá Flash Sale (VNĐ) *">
            <el-input-number
              v-model="flashForm.price"
              :min="0"
              :step="50000"
              class="w-full"
              @change="recalcFlashDiscount"
            />
          </el-form-item>
          <el-form-item label="Giá gốc niêm yết (VNĐ)">
            <el-input-number
              v-model="flashForm.originalPrice"
              :min="0"
              :step="50000"
              class="w-full"
              @change="recalcFlashDiscount"
            />
          </el-form-item>
          <el-form-item label="% Giảm giá">
            <el-input-number v-model="flashForm.discount" :min="1" :max="95" class="w-full" />
          </el-form-item>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
          <el-form-item label="Số lượng đã bán (Hiển thị thanh tiến độ)">
            <el-input-number v-model="flashForm.sold" :min="0" :max="999" class="w-full" />
          </el-form-item>
          <el-form-item label="Tổng suất Flash Sale">
            <el-input-number v-model="flashForm.stock" :min="1" :max="999" class="w-full" />
          </el-form-item>
        </div>

        <el-form-item label="Hình ảnh sản phẩm (URL hoặc Tải ảnh)">
          <div class="w-full space-y-2">
            <el-input v-model="flashForm.image" placeholder="https://..." clearable />
            <div class="flex items-center gap-3">
              <label class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-xs font-semibold text-slate-600 hover:border-[#00733c] cursor-pointer">
                <el-icon><Upload /></el-icon> Tải ảnh từ máy
                <input type="file" accept="image/*" class="hidden" @change="handleFlashImageUpload" />
              </label>
              <img v-if="flashForm.image" :src="flashForm.image" class="w-12 h-12 rounded-lg object-contain border border-slate-200 bg-slate-50 p-1" />
            </div>
          </div>
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="flashDialogVisible = false">Hủy</el-button>
        <el-button type="danger" @click="saveFlashItem">Lưu sản phẩm Flash Sale</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, defineComponent, h, type PropType } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Plus, Edit, Delete, ArrowUp, ArrowDown, Upload } from '@element-plus/icons-vue';
import { useSiteContentStore, type HeroBannerSlide, type FlashSaleItem } from '../../stores/siteContent';
import { useProductStore } from '../../stores/products';
import { useAuthStore } from '../../stores/auth';

const store = useSiteContentStore();
const productStore = useProductStore();
const authStore = useAuthStore();

const activeTab = ref<'hero' | 'flash' | 'promos'>('flash');

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
  } catch {
    ElMessage.error('Không thể lưu – dung lượng lưu trữ trình duyệt đã đầy.');
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
    /* hủy */
  }
};

const handleResetBanners = async () => {
  try {
    await ElMessageBox.confirm('Khôi phục 3 slide banner mặc định?', 'Khôi phục mặc định', {
      type: 'warning',
      confirmButtonText: 'Khôi phục',
      cancelButtonText: 'Hủy',
    });
    store.resetBanners();
    ElMessage.success('Đã khôi phục banner mặc định');
  } catch {
    /* hủy */
  }
};

// ==================== FLASH SALE LOGIC ====================
const flashDialogVisible = ref(false);
const editingFlashIdx = ref<number | null>(null);
const selectedProductIdToImport = ref('');

const flashForm = reactive<FlashSaleItem>({
  id: '',
  name: '',
  brand: 'ASUS',
  price: 4990000,
  originalPrice: 5990000,
  discount: 17,
  image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
  sold: 10,
  stock: 20,
});

const recalcFlashDiscount = () => {
  if (flashForm.originalPrice > flashForm.price && flashForm.originalPrice > 0) {
    flashForm.discount = Math.round(((flashForm.originalPrice - flashForm.price) / flashForm.originalPrice) * 100);
  }
};

const onPickProductForFlashSale = (productId: string) => {
  if (!productId) return;
  const found = productStore.products.find((p) => p.id === productId);
  if (!found) return;
  flashForm.id = found.id;
  flashForm.name = found.name;
  flashForm.brand = found.brand;
  flashForm.price = found.price;
  flashForm.originalPrice = found.originalPrice || Math.round(found.price * 1.2);
  flashForm.discount =
    found.discount ||
    Math.max(5, Math.round(((flashForm.originalPrice - flashForm.price) / flashForm.originalPrice) * 100));
  flashForm.image = found.image;
};

const openAddFlashItem = () => {
  editingFlashIdx.value = null;
  selectedProductIdToImport.value = '';
  Object.assign(flashForm, {
    id: 'fs-' + Date.now(),
    name: '',
    brand: 'ASUS',
    price: 3990000,
    originalPrice: 4990000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
    sold: 12,
    stock: 25,
  });
  flashDialogVisible.value = true;
};

const openEditFlashItem = (item: FlashSaleItem, idx: number) => {
  editingFlashIdx.value = idx;
  selectedProductIdToImport.value = '';
  Object.assign(flashForm, JSON.parse(JSON.stringify(item)));
  flashDialogVisible.value = true;
};

const handleFlashImageUpload = (e: Event) => {
  const input = e.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 800 * 1024) {
    ElMessage.warning('Ảnh quá lớn (> 800KB). Vui lòng chọn ảnh nhẹ hơn hoặc dùng URL.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    flashForm.image = String(reader.result || '');
  };
  reader.readAsDataURL(file);
  input.value = '';
};

const saveFlashItem = () => {
  if (!flashForm.name.trim()) {
    ElMessage.warning('Vui lòng nhập tên sản phẩm Flash Sale!');
    return;
  }
  const payload: FlashSaleItem = {
    ...flashForm,
    id: flashForm.id || 'fs-' + Date.now(),
  };
  if (editingFlashIdx.value !== null) {
    store.flashSale.items[editingFlashIdx.value] = payload;
  } else {
    store.flashSale.items.push(payload);
  }
  store.saveFlashSale(authStore.currentUser?.fullName || 'Quản trị viên');
  flashDialogVisible.value = false;
  ElMessage.success('Đã lưu sản phẩm Giờ Vàng Giá Sốc!');
};

const removeFlashItem = (idx: number) => {
  store.flashSale.items.splice(idx, 1);
  store.saveFlashSale(authStore.currentUser?.fullName || 'Quản trị viên');
  ElMessage.success('Đã xóa sản phẩm khỏi Giờ Vàng Giá Sốc!');
};

const moveFlashItem = (idx: number, dir: -1 | 1) => {
  const target = idx + dir;
  if (target < 0 || target >= store.flashSale.items.length) return;
  const list = [...store.flashSale.items];
  [list[idx], list[target]] = [list[target]!, list[idx]!];
  store.flashSale.items = list;
  store.saveFlashSale(authStore.currentUser?.fullName || 'Quản trị viên');
};

const saveFlashSaleConfig = () => {
  store.saveFlashSale(authStore.currentUser?.fullName || 'Quản trị viên');
  ElMessage.success('Đã lưu cấu hình Giờ Vàng Giá Sốc!');
};

const handleResetFlashSale = async () => {
  try {
    await ElMessageBox.confirm('Khôi phục dữ liệu Giờ Vàng Giá Sốc về mặc định?', 'Xác nhận', {
      type: 'warning',
    });
    store.resetFlashSale();
    ElMessage.success('Đã khôi phục Giờ Vàng Giá Sốc mặc định!');
  } catch {
    /* hủy */
  }
};

// ==================== SIDE PROMOS & CTA ====================
const savePromosConfig = () => {
  store.saveHomePromos();
  ElMessage.success('Đã lưu 2 Banner phụ & khối CTA thành công!');
};

const handleResetHomePromos = async () => {
  try {
    await ElMessageBox.confirm('Khôi phục 2 Banner phụ & CTA về mặc định?', 'Xác nhận', {
      type: 'warning',
    });
    store.resetHomePromos();
    ElMessage.success('Đã khôi phục mặc định!');
  } catch {
    /* hủy */
  }
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};
</script>
