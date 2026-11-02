import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export interface CartProduct {
  id: string | number;
  name: string;
  sku?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  category?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([]);
  const isDrawerOpen = ref(false);

  // Load from localStorage
  const savedCart = localStorage.getItem('nhanphuc_cart');
  if (savedCart) {
    try {
      items.value = JSON.parse(savedCart);
    } catch (e) {
      console.error('Failed to parse cart storage', e);
    }
  }

  const saveCart = () => {
    localStorage.setItem('nhanphuc_cart', JSON.stringify(items.value));
  };

  const addItem = (product: CartProduct, quantity = 1) => {
    const existing = items.value.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      items.value.push({ product, quantity });
    }
    saveCart();
    isDrawerOpen.value = true;
  };

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    const item = items.value.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      saveCart();
    }
  };

  const removeItem = (productId: string | number) => {
    items.value = items.value.filter((item) => item.product.id !== productId);
    saveCart();
  };

  const clearCart = () => {
    items.value = [];
    saveCart();
  };

  const totalItems = computed(() =>
    items.value.reduce((total, item) => total + item.quantity, 0)
  );

  const totalPrice = computed(() =>
    items.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
  );

  return {
    items,
    isDrawerOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  };
});
