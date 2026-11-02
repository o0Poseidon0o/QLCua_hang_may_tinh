<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-6">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-2">
        <router-link to="/cart" class="hover:text-[#00733c]">&larr; Quay lại giỏ hàng</router-link>
        <span>/</span>
        <span class="text-slate-800 font-semibold">Thanh toán & Đặt hàng</span>
      </div>
      <h1 class="text-2xl sm:text-3xl font-black text-slate-900">THÔNG TIN ĐẶT HÀNG & THANH TOÁN</h1>
    </div>

    <!-- Success State -->
    <div v-if="orderPlaced" class="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto border border-slate-100 shadow-xl space-y-4">
      <div class="w-20 h-20 rounded-full bg-emerald-100 text-[#00733c] text-4xl flex items-center justify-center mx-auto shadow-inner">
        ✓
      </div>
      <span class="inline-block px-3 py-1 bg-emerald-50 text-[#00733c] text-xs font-black uppercase rounded-full">
        Đặt Hàng Thành Công
      </span>
      <h2 class="text-2xl font-black text-slate-900">CẢM ƠN BẠN ĐÃ MUA HÀNG TẠI NHÂN PHÚC TECH!</h2>
      <p class="text-xs text-slate-500 leading-relaxed">
        Mã đơn hàng của bạn là <strong class="text-slate-800 font-bold text-sm">#{{ orderId }}</strong>.
        Nhân viên tư vấn Nhân Phúc Tech sẽ gọi điện xác nhận trong vòng 15 phút tới số điện thoại <strong>{{ form.phone }}</strong>.
      </p>

      <div class="pt-4 flex justify-center gap-3">
        <router-link
          to="/"
          class="px-6 py-2.5 bg-[#00733c] text-white font-bold text-xs rounded-xl shadow hover:bg-[#014f2b] transition"
        >
          Về Trang Chủ
        </router-link>
        <router-link
          to="/shop"
          class="px-6 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
        >
          Tiếp Tục Mua Sắm
        </router-link>
      </div>
    </div>

    <!-- Checkout Form -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Shipping & Payment Details (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- 1. Customer Info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>👤</span> 1. Thông Tin Người Nhận
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Họ và tên *</label>
              <input
                v-model="form.fullName"
                type="text"
                placeholder="Nguyễn Văn A"
                class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div>
              <label class="block font-bold text-slate-700 mb-1">Số điện thoại *</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="0912 345 678"
                class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block font-bold text-slate-700 mb-1">Địa chỉ nhận hàng chi tiết *</label>
              <input
                v-model="form.address"
                type="text"
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                class="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00733c]"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block font-bold text-slate-700 mb-1">Ghi chú đơn hàng (Tùy chọn)</label>
              <textarea
                v-model="form.notes"
                rows="2"
                placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                class="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-[#00733c]"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- 2. Payment Method -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>💳</span> 2. Phương Thức Thanh Toán
          </h3>
          <div class="space-y-3 text-xs">
            <label
              class="flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition"
              :class="paymentMethod === 'cod' ? 'border-[#00733c] bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'"
            >
              <input type="radio" value="cod" v-model="paymentMethod" class="accent-[#00733c]" />
              <div class="flex-1">
                <div class="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>💵</span> Thanh toán khi nhận hàng (COD)
                </div>
                <div class="text-[11px] text-slate-500 mt-0.5">Kiểm tra linh kiện máy tính, ưng ý mới thanh toán tiền mặt.</div>
              </div>
            </label>

            <label
              class="flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition"
              :class="paymentMethod === 'bank' ? 'border-[#00733c] bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'"
            >
              <input type="radio" value="bank" v-model="paymentMethod" class="accent-[#00733c]" />
              <div class="flex-1">
                <div class="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>🏦</span> Chuyển khoản ngân hàng (VietQR 24/7)
                </div>
                <div class="text-[11px] text-slate-500 mt-0.5">Quét mã QR tự động xác nhận trong 1 phút, an toàn và chính xác.</div>
              </div>
            </label>

            <label
              class="flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition"
              :class="paymentMethod === 'installment' ? 'border-[#00733c] bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300'"
            >
              <input type="radio" value="installment" v-model="paymentMethod" class="accent-[#00733c]" />
              <div class="flex-1">
                <div class="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>💳</span> Mua trả góp 0% lãi suất
                </div>
                <div class="text-[11px] text-slate-500 mt-0.5">Dành cho thẻ tín dụng (Visa, Master) hoặc hồ sơ CCCD duyệt 15 phút.</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Order Review Sidebar (5 cols) -->
      <div class="lg:col-span-5 space-y-4">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-4 sticky top-24">
          <h3 class="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
            Đơn Hàng ({{ cartStore.totalItems }} sản phẩm)
          </h3>

          <!-- Items Mini List -->
          <div class="max-h-60 overflow-y-auto divide-y divide-slate-100 text-xs pr-1">
            <div
              v-for="item in cartStore.items"
              :key="item.product.id"
              class="py-2.5 flex items-center justify-between gap-3"
            >
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-[10px] flex-shrink-0">
                  {{ item.quantity }}
                </span>
                <span class="font-semibold text-slate-800 truncate" :title="item.product.name">
                  {{ item.product.name }}
                </span>
              </div>
              <span class="font-bold text-red-600 flex-shrink-0">
                {{ formatPrice(item.product.price * item.quantity) }}
              </span>
            </div>
          </div>

          <!-- Totals -->
          <div class="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
            <div class="flex justify-between">
              <span>Tạm tính:</span>
              <span class="font-bold text-slate-900">{{ formatPrice(cartStore.totalPrice) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Vận chuyển:</span>
              <span class="font-bold text-emerald-600">Miễn phí giao hàng</span>
            </div>
            <div class="pt-2 border-t border-slate-100 flex justify-between items-baseline">
              <span class="text-sm font-black text-slate-900">Tổng thanh toán:</span>
              <span class="text-xl font-black text-red-600">
                {{ formatPrice(cartStore.totalPrice) }}
              </span>
            </div>
          </div>

          <button
            @click="submitOrder"
            class="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
          >
            XÁC NHẬN ĐẶT HÀNG NGAY &rarr;
          </button>

          <p class="text-[11px] text-slate-400 text-center">
            Bằng việc đặt hàng, bạn đồng ý với Điều khoản dịch vụ và Chính sách bảo hành của Nhân Phúc Tech.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCartStore } from '../../stores/cart';
import { ElMessage } from 'element-plus';

const cartStore = useCartStore();

const paymentMethod = ref('cod');
const orderPlaced = ref(false);
const orderId = ref('');

const form = ref({
  fullName: '',
  phone: '',
  address: '',
  notes: ''
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const submitOrder = () => {
  if (!form.value.fullName.trim() || !form.value.phone.trim() || !form.value.address.trim()) {
    ElMessage.warning('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ giao hàng!');
    return;
  }
  if (cartStore.items.length === 0) {
    ElMessage.warning('Giỏ hàng đang trống!');
    return;
  }

  orderId.value = 'NP' + Math.floor(100000 + Math.random() * 900000);
  orderPlaced.value = true;
  cartStore.clearCart();
  ElMessage.success('Đơn hàng đã được tạo thành công!');
};
</script>
