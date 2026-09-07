<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <router-link to="/" class="hover:text-[#00733c]">Trang chủ</router-link>
        <span>/</span>
        <span class="text-slate-800 font-semibold">Giỏ hàng của bạn</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-black text-slate-900">GIỎ HÀNG CỦA BẠN</h1>
      <p class="text-xs sm:text-sm text-slate-500 mt-1">
        Bạn đang có <strong class="text-[#00733c]">{{ cartStore.totalItems }}</strong> sản phẩm trong giỏ hàng.
      </p>
    </div>

    <!-- Empty Cart -->
    <div v-if="cartStore.items.length === 0" class="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-xl mx-auto my-8">
      <div class="w-20 h-20 rounded-full bg-emerald-50 text-[#00733c] flex items-center justify-center mx-auto mb-4 text-3xl">
        🛒
      </div>
      <h2 class="text-lg font-bold text-slate-800">Giỏ hàng của bạn đang trống</h2>
      <p class="text-xs text-slate-500 mt-1 mb-6">Hãy chọn các linh kiện, máy tính cấu hình tốt nhất tại NetSoft.</p>
      <router-link
        to="/shop"
        class="inline-block px-6 py-2.5 bg-[#00733c] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#014f2b] transition"
      >
        Khám Phá Cửa Hàng Ngay &rarr;
      </router-link>
    </div>

    <!-- Active Cart -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Item list (8 cols) -->
      <div class="lg:col-span-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div class="flex justify-between items-center pb-4 border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <span>Sản phẩm</span>
          <span>Số lượng & Thành tiền</span>
        </div>

        <div class="divide-y divide-slate-100">
          <div
            v-for="item in cartStore.items"
            :key="item.product.id"
            class="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4 min-w-0">
              <img
                :src="item.product.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80'"
                :alt="item.product.name"
                class="w-16 h-16 object-contain rounded-lg border border-slate-100 bg-slate-50 p-1 flex-shrink-0"
              />
              <div class="min-w-0">
                <h4 class="text-xs sm:text-sm font-bold text-slate-800 truncate" :title="item.product.name">
                  {{ item.product.name }}
                </h4>
                <div class="text-xs font-bold text-red-600 mt-0.5">
                  {{ formatPrice(item.product.price) }}
                </div>
                <div class="text-[11px] text-emerald-600 font-medium">Bảo hành 36 tháng tận nơi</div>
              </div>
            </div>

            <div class="flex items-center gap-4 self-end sm:self-center">
              <!-- Quantity Controls -->
              <div class="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  class="px-3 py-1 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  -
                </button>
                <span class="px-3 text-xs font-extrabold text-slate-800 min-w-[24px] text-center">
                  {{ item.quantity }}
                </span>
                <button
                  @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  class="px-3 py-1 text-slate-600 hover:bg-slate-100 font-bold"
                >
                  +
                </button>
              </div>

              <!-- Subtotal -->
              <div class="text-right min-w-[90px]">
                <div class="text-sm sm:text-base font-extrabold text-red-600">
                  {{ formatPrice(item.product.price * item.quantity) }}
                </div>
              </div>

              <!-- Delete -->
              <button
                @click="cartStore.removeItem(item.product.id)"
                class="text-slate-400 hover:text-red-500 transition p-1"
                title="Xóa"
              >
                <el-icon><Delete /></el-icon>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
          <router-link to="/shop" class="text-[#00733c] font-bold hover:underline">
            &larr; Tiếp tục chọn sản phẩm khác
          </router-link>
          <button @click="cartStore.clearCart" class="text-slate-400 hover:text-red-600 transition font-medium">
            Xóa toàn bộ giỏ hàng
          </button>
        </div>
      </div>

      <!-- Summary & Checkout (4 cols) -->
      <div class="lg:col-span-4 space-y-4">
        <!-- Coupon Code Box -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-3">
          <h4 class="text-xs font-black text-slate-900 uppercase tracking-wider">Mã Giảm Giá / Voucher</h4>
          <div class="flex gap-2">
            <input
              v-model="voucherCode"
              type="text"
              placeholder="Nhập mã (VD: NETSOFT2026)"
              class="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs uppercase font-bold focus:outline-none focus:border-[#00733c]"
            />
            <button
              @click="applyVoucher"
              class="px-4 py-2 bg-slate-800 text-white font-bold text-xs rounded-lg hover:bg-slate-900 transition"
            >
              Áp Dụng
            </button>
          </div>
          <div v-if="voucherDiscount > 0" class="text-xs text-emerald-600 font-bold">
            ✓ Đã áp dụng mã giảm giá {{ formatPrice(voucherDiscount) }}!
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Tóm Tắt Đơn Hàng
          </h3>
          <div class="space-y-2.5 text-xs text-slate-600">
            <div class="flex justify-between">
              <span>Tổng tiền hàng:</span>
              <span class="font-bold text-slate-900">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Phí vận chuyển:</span>
              <span class="font-bold text-emerald-600">Miễn phí giao hàng</span>
            </div>
            <div v-if="voucherDiscount > 0" class="flex justify-between text-red-600 font-bold">
              <span>Giảm giá voucher:</span>
              <span>-{{ formatPrice(voucherDiscount) }}</span>
            </div>
            <div class="pt-3 border-t border-slate-100 flex justify-between items-baseline text-slate-900">
              <span class="text-sm font-black">Tổng thanh toán:</span>
              <span class="text-xl font-black text-red-600">
                {{ formatPrice(Math.max(0, cartStore.totalPrice - voucherDiscount)) }}
              </span>
            </div>
            <p class="text-[11px] text-slate-400 text-right">(Đã bao gồm thuế VAT)</p>
          </div>

          <router-link
            to="/checkout"
            class="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-md transition text-center block"
          >
            TIẾN HÀNH ĐẶT HÀNG &rarr;
          </router-link>

          <div class="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1 pt-1">
            <span>🛡️</span> Cam kết bảo mật thanh toán 100%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import { useCartStore } from '../../stores/cart';
import { ElMessage } from 'element-plus';

const cartStore = useCartStore();

const voucherCode = ref('');
const voucherDiscount = ref(0);

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const applyVoucher = () => {
  const code = voucherCode.value.trim().toUpperCase();
  if (code === 'NETSOFT2026' || code === 'NETSOFT') {
    voucherDiscount.value = 200000;
    ElMessage.success('Áp dụng mã giảm giá 200.000 đ thành công!');
  } else if (code === 'FREESHIP') {
    voucherDiscount.value = 50000;
    ElMessage.success('Áp dụng mã Freeship thành công!');
  } else {
    ElMessage.error('Mã giảm giá không hợp lệ hoặc đã hết hạn!');
  }
};
</script>
