<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
    <!-- Breadcrumbs -->
    <div class="flex items-center gap-2 text-xs text-slate-500">
      <router-link to="/" class="hover:text-[#00733c]">Trang chủ</router-link>
      <span>/</span>
      <router-link :to="'/shop?category=' + currentProduct.category" class="hover:text-[#00733c]">
        {{ currentProduct.categoryName }}
      </router-link>
      <span>/</span>
      <span class="text-slate-800 font-semibold line-clamp-1">{{ currentProduct.name }}</span>
    </div>

    <!-- Main Detail Section: Gallery + Buying Panel -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
      <!-- Image Gallery (5 cols) -->
      <div class="lg:col-span-5 space-y-4">
        <div class="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-4">
          <img
            :src="activeImage || currentProduct.image"
            :alt="currentProduct.name"
            class="object-contain w-full h-full max-h-[380px] hover:scale-105 transition-transform duration-300"
          />
          <span v-if="currentProduct.discount" class="absolute top-3 left-3 bg-red-600 text-white font-black text-xs px-2.5 py-1 rounded-md shadow">
            -{{ currentProduct.discount }}%
          </span>
        </div>

        <!-- Thumbnail Row -->
        <div v-if="currentProduct.gallery && currentProduct.gallery.length > 1" class="grid grid-cols-4 gap-3">
          <button
            v-for="(img, idx) in currentProduct.gallery"
            :key="idx"
            @click="activeImage = img"
            :class="[
              'aspect-square rounded-xl p-1 bg-slate-50 border transition overflow-hidden cursor-pointer',
              (activeImage || currentProduct.gallery[0]) === img ? 'border-[#00733c] ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'
            ]"
          >
            <img :src="img" class="w-full h-full object-contain" />
          </button>
        </div>
      </div>

      <!-- Buying Info & Offers (7 cols) -->
      <div class="lg:col-span-7 space-y-5">
        <!-- Title & Badges -->
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-2">
            <span class="px-2.5 py-0.5 bg-emerald-50 text-[#00733c] text-xs font-bold rounded-md">
              {{ currentProduct.brand }}
            </span>
            <span class="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-md">
              Chính Hãng 100%
            </span>
            <span class="px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md">
              Mã: {{ currentProduct.sku }}
            </span>
            <span class="text-xs text-emerald-600 font-bold ml-auto">
              ✓ Sẵn hàng tại Showroom
            </span>
          </div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {{ currentProduct.name }}
          </h1>
        </div>

        <!-- Price Box -->
        <div class="bg-red-50/70 border border-red-100 p-4 rounded-xl flex flex-wrap items-baseline gap-3">
          <span class="text-2xl sm:text-3xl font-black text-red-600">
            {{ formatPrice(currentProduct.price) }}
          </span>
          <span v-if="currentProduct.originalPrice" class="text-sm text-slate-400 line-through font-semibold">
            {{ formatPrice(currentProduct.originalPrice) }}
          </span>
          <span v-if="currentProduct.originalPrice" class="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
            Tiết kiệm: {{ formatPrice(currentProduct.originalPrice - currentProduct.price) }}
          </span>
        </div>

        <!-- Promotions / Gifts Box (Đặc trưng NetSoft) -->
        <div class="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 space-y-2.5">
          <div class="flex items-center gap-2 text-xs font-extrabold text-amber-800 uppercase tracking-wider">
            <span>🎁</span> Ưu Đãi Độc Quyền Khi Mua Tại NetSoft:
          </div>
          <ul class="text-xs text-slate-700 space-y-1.5 pl-1">
            <li class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span>Tặng gói vệ sinh máy tính định kỳ <strong>2 năm miễn phí</strong>.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span>Giảm thêm <strong>300.000 đ</strong> khi mua kèm màn hình gaming từ 144Hz.</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-emerald-600 font-bold">✓</span>
              <span>Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng và CCCD duyệt 15 phút.</span>
            </li>
          </ul>
        </div>

        <!-- Quantity & Buy Buttons -->
        <div class="space-y-3 pt-2">
          <div class="flex items-center gap-4">
            <span class="text-xs font-bold text-slate-700">Số lượng:</span>
            <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
              <button
                @click="qty > 1 ? qty-- : null"
                class="px-3 py-1 text-slate-600 hover:bg-slate-100 font-bold"
              >
                -
              </button>
              <span class="px-4 text-xs font-extrabold text-slate-800 min-w-[30px] text-center">
                {{ qty }}
              </span>
              <button
                @click="qty++"
                class="px-3 py-1 text-slate-600 hover:bg-slate-100 font-bold"
              >
                +
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              @click="buyNow"
              class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex flex-col items-center justify-center leading-tight"
            >
              <span>MUA NGAY</span>
              <span class="text-[10px] font-normal opacity-90">Giao siêu tốc 2h hoặc nhận tại cửa hàng</span>
            </button>
            <button
              @click="addToCart"
              class="w-full py-3.5 bg-[#00733c] hover:bg-[#014f2b] text-white font-extrabold text-sm rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
            >
              <el-icon><ShoppingCart /></el-icon> Thêm Vào Giỏ Hàng
            </button>
          </div>
        </div>

        <!-- Assurance Badges -->
        <div class="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-slate-600 border-t border-slate-100">
          <div class="p-2 bg-slate-50 rounded-lg">
            <div class="font-bold text-slate-800">Bảo hành 36T</div>
            <div class="text-[10px] text-slate-400">Chính hãng tận nơi</div>
          </div>
          <div class="p-2 bg-slate-50 rounded-lg">
            <div class="font-bold text-slate-800">Đổi mới 30 ngày</div>
            <div class="text-[10px] text-slate-400">Nếu lỗi nhà sản xuất</div>
          </div>
          <div class="p-2 bg-slate-50 rounded-lg">
            <div class="font-bold text-slate-800">Giao siêu tốc 2H</div>
            <div class="text-[10px] text-slate-400">Nội thành TP.HCM</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Specifications Table & Description -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Specs Sheet (8 cols) -->
      <div class="lg:col-span-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-base font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
          <span>📋</span> Thông Số Kỹ Thuật Chi Tiết
        </h3>
        <div class="divide-y divide-slate-100 text-xs">
          <div
            v-for="(spec, idx) in currentProduct.specs"
            :key="idx"
            class="py-2.5 grid grid-cols-12 gap-4"
            :class="idx % 2 === 0 ? 'bg-slate-50/50 px-3 rounded' : 'px-3'"
          >
            <span class="col-span-4 font-bold text-slate-500">{{ spec.label }}</span>
            <span class="col-span-8 font-semibold text-slate-800">{{ spec.value }}</span>
          </div>
        </div>

        <!-- Description -->
        <div class="pt-6 border-t border-slate-100 space-y-3">
          <h4 class="text-sm font-black text-slate-900">Đặc Điểm Nổi Bật</h4>
          <p class="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {{ currentProduct.description }}
          </p>
        </div>
      </div>

      <!-- Right Policies Panel (4 cols) -->
      <div class="lg:col-span-4 space-y-4">
        <div class="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 space-y-4">
          <h4 class="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
            Yên Tâm Mua Sắm Tại NetSoft
          </h4>
          <div class="space-y-3 text-xs text-slate-600">
            <div class="flex items-start gap-2.5">
              <span class="text-base text-[#00733c]">🚚</span>
              <div>
                <strong class="text-slate-800 block">Miễn phí vận chuyển</strong>
                Cho đơn hàng từ 1.000.000 đ trong bán kính 10km.
              </div>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="text-base text-[#00733c]">🛡️</span>
              <div>
                <strong class="text-slate-800 block">Bảo hành chính hãng</strong>
                Cam kết linh kiện mới 100% nguyên seal từ nhà phân phối.
              </div>
            </div>
            <div class="flex items-start gap-2.5">
              <span class="text-base text-[#00733c]">💳</span>
              <div>
                <strong class="text-slate-800 block">Thanh toán linh hoạt</strong>
                Chuyển khoản, thẻ tín dụng, ví MoMo, COD hoặc trả góp.
              </div>
            </div>
          </div>
        </div>

        <!-- Hotline Card -->
        <div class="bg-gradient-to-br from-[#014f2b] to-[#00733c] text-white p-5 rounded-2xl shadow-md">
          <div class="text-xs text-emerald-200 font-bold uppercase">Hỗ trợ tư vấn trực tiếp</div>
          <div class="text-2xl font-black text-amber-300 mt-1">0777908179</div>
          <p class="text-xs text-emerald-100 mt-1">Địa chỉ: 179 Nơ Trang Long P.Bình Thạnh TPHCM</p>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div v-if="relatedProducts.length > 0" class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-4">
      <div class="flex justify-between items-center pb-2 border-b border-slate-100">
        <h3 class="text-base font-black text-slate-900 uppercase tracking-wider">
          Sản Phẩm Cùng Phân Khúc
        </h3>
        <router-link :to="'/shop?category=' + currentProduct.category" class="text-xs font-bold text-[#00733c] hover:underline">
          Xem thêm &rarr;
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div
          v-for="rel in relatedProducts"
          :key="rel.id"
          class="border border-slate-100 hover:border-emerald-500 rounded-xl p-3.5 hover:shadow-md transition flex flex-col justify-between group bg-white"
        >
          <div>
            <div class="relative aspect-square rounded-lg overflow-hidden bg-slate-50 mb-2.5 flex items-center justify-center p-2">
              <img :src="rel.image" :alt="rel.name" class="object-contain w-full h-full group-hover:scale-105 transition-transform" />
            </div>
            <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
              {{ rel.brand }}
            </span>
            <router-link
              :to="'/product/' + rel.id"
              class="block text-xs font-bold text-slate-800 line-clamp-2 mt-1 hover:text-[#00733c] transition min-h-[34px]"
            >
              {{ rel.name }}
            </router-link>
          </div>
          <div class="pt-2 mt-2 border-t border-slate-100">
            <div class="text-sm font-extrabold text-red-600">{{ formatPrice(rel.price) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ShoppingCart } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { mockProducts } from '../../data/mockProducts';
import { ElMessage } from 'element-plus';

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();

const qty = ref(1);
const activeImage = ref('');

// Find product by route parameter ID
const currentProduct = computed(() => {
  const paramId = String(route.params.id || '');
  const found = mockProducts.find((p) => p.id === paramId || p.sku.toLowerCase() === paramId.toLowerCase());
  return found || mockProducts[0];
});

// Related products in the same category
const relatedProducts = computed(() => {
  return mockProducts
    .filter((p) => (p.category === currentProduct.value.category || p.parentCategory === currentProduct.value.parentCategory) && p.id !== currentProduct.value.id)
    .slice(0, 4);
});

// Watch current product to sync gallery image
watch(
  () => currentProduct.value,
  (newP) => {
    qty.value = 1;
    activeImage.value = (newP.gallery && newP.gallery[0]) || newP.image;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },
  { immediate: true }
);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const addToCart = () => {
  cartStore.addItem(
    {
      id: currentProduct.value.id,
      name: currentProduct.value.name,
      price: currentProduct.value.price,
      originalPrice: currentProduct.value.originalPrice,
      image: currentProduct.value.image
    },
    qty.value
  );
  ElMessage.success(`Đã thêm ${qty.value} "${currentProduct.value.name}" vào giỏ!`);
};

const buyNow = () => {
  addToCart();
  router.push('/checkout');
};
</script>
