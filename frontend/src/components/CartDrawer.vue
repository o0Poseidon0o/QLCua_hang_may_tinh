<template>
  <el-drawer
    v-model="cartStore.isDrawerOpen"
    title="Giỏ Hàng Của Bạn"
    direction="rtl"
    size="420px"
    :with-header="true"
    custom-class="nhanphuc-cart-drawer"
  >
    <div v-if="cartStore.items.length === 0" class="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
      <div class="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
        <el-icon :size="40"><ShoppingCart /></el-icon>
      </div>
      <p class="text-lg font-semibold text-gray-800 mb-1">Giỏ hàng đang trống</p>
      <p class="text-sm text-gray-400 mb-6">Chưa có sản phẩm nào được thêm vào giỏ.</p>
      <el-button type="success" color="#00733c" round @click="goToShop">
        Khám phá sản phẩm ngay
      </el-button>
    </div>

    <div v-else class="flex flex-col h-full">
      <!-- Item list -->
      <div class="flex-1 overflow-y-auto pr-1 divide-y divide-gray-100">
        <div
          v-for="item in cartStore.items"
          :key="item.product.id"
          class="py-4 flex gap-3 items-center group"
        >
          <img
            :src="item.product.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=150&q=80'"
            :alt="item.product.name"
            class="w-16 h-16 object-cover rounded-lg border border-gray-100 bg-gray-50 flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-gray-800 truncate mb-1" :title="item.product.name">
              {{ item.product.name }}
            </h4>
            <div class="text-sm font-bold text-red-600">
              {{ formatPrice(item.product.price) }}
            </div>
            <!-- Quantity controls -->
            <div class="flex items-center gap-2 mt-2">
              <div class="flex items-center border border-gray-200 rounded-md overflow-hidden bg-white">
                <button
                  @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                  class="px-2 py-0.5 text-gray-500 hover:bg-gray-100 text-xs transition"
                >
                  -
                </button>
                <span class="px-2 text-xs font-semibold text-gray-700 min-w-[20px] text-center">
                  {{ item.quantity }}
                </span>
                <button
                  @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                  class="px-2 py-0.5 text-gray-500 hover:bg-gray-100 text-xs transition"
                >
                  +
                </button>
              </div>
              <button
                @click="cartStore.removeItem(item.product.id)"
                class="text-xs text-gray-400 hover:text-red-500 transition ml-auto"
                title="Xóa sản phẩm"
              >
                <el-icon><Delete /></el-icon>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Summary -->
      <div class="border-t border-gray-100 pt-4 mt-auto">
        <div class="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>Tổng số lượng:</span>
          <span class="font-bold text-gray-900">{{ cartStore.totalItems }} sản phẩm</span>
        </div>
        <div class="flex justify-between items-center mb-4 text-base">
          <span class="font-bold text-gray-900">Tổng tiền tạm tính:</span>
          <span class="text-xl font-extrabold text-red-600">{{ formatPrice(cartStore.totalPrice) }}</span>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <router-link
            to="/cart"
            @click="cartStore.isDrawerOpen = false"
            class="w-full text-center py-2.5 px-4 rounded-lg border border-[#00733c] text-[#00733c] font-semibold text-sm hover:bg-emerald-50 transition"
          >
            Xem giỏ hàng
          </router-link>
          <router-link
            to="/checkout"
            @click="cartStore.isDrawerOpen = false"
            class="w-full text-center py-2.5 px-4 rounded-lg bg-[#00733c] text-white font-semibold text-sm hover:bg-[#01582e] shadow-md hover:shadow transition"
          >
            Thanh toán ngay
          </router-link>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart';
import { useRouter } from 'vue-router';
import { ShoppingCart, Delete } from '@element-plus/icons-vue';

const cartStore = useCartStore();
const router = useRouter();

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const goToShop = () => {
  cartStore.isDrawerOpen = false;
  router.push('/shop');
};
</script>
