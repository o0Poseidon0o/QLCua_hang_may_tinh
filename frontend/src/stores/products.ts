import { defineStore } from 'pinia';
import { ref } from 'vue';
import { mockProducts, type ProductItem, type ProductSpec } from '../data/mockProducts';

const PRODUCTS_STORAGE_KEY = 'nhanphuc_products_v2';
const LEGACY_STORAGE_KEY = 'nhanphuc_admin_products';

export interface CategoryOption {
  slug: string;
  name: string;
  parentSlug: string;
  parentName: string;
  specTemplateKey: string;
}

export const PRODUCT_CATEGORIES: CategoryOption[] = [
  // Laptop
  { slug: 'laptop-gaming', name: 'Laptop Gaming', parentSlug: 'laptop', parentName: 'Laptop & Máy Tính Xách Tay', specTemplateKey: 'laptop' },
  { slug: 'laptop-office', name: 'Laptop Văn Phòng', parentSlug: 'laptop', parentName: 'Laptop & Máy Tính Xách Tay', specTemplateKey: 'laptop' },
  { slug: 'laptop-creator', name: 'Laptop Đồ Họa - Kỹ Thuật', parentSlug: 'laptop', parentName: 'Laptop & Máy Tính Xách Tay', specTemplateKey: 'laptop' },
  { slug: 'macbook', name: 'MacBook & Apple', parentSlug: 'laptop', parentName: 'Laptop & Máy Tính Xách Tay', specTemplateKey: 'laptop' },
  // PC Gaming
  { slug: 'pc-gaming-entry', name: 'PC Gaming Phổ Thông', parentSlug: 'pc-gaming', parentName: 'PC Gaming & Đồ Họa Nhân Phúc', specTemplateKey: 'pc' },
  { slug: 'pc-gaming-mid', name: 'PC Gaming Trung Cấp', parentSlug: 'pc-gaming', parentName: 'PC Gaming & Đồ Họa Nhân Phúc', specTemplateKey: 'pc' },
  { slug: 'pc-gaming-high', name: 'PC Gaming Cao Cấp', parentSlug: 'pc-gaming', parentName: 'PC Gaming & Đồ Họa Nhân Phúc', specTemplateKey: 'pc' },
  { slug: 'pc-workstation', name: 'PC Thiết Kế Đồ Họa 3D', parentSlug: 'pc-gaming', parentName: 'PC Gaming & Đồ Họa Nhân Phúc', specTemplateKey: 'pc' },
  { slug: 'pc-office', name: 'Máy Bộ Văn Phòng', parentSlug: 'pc-gaming', parentName: 'PC Gaming & Đồ Họa Nhân Phúc', specTemplateKey: 'pc' },
  // Linh kiện
  { slug: 'cpu', name: 'CPU - Bộ Vi Xử Lý', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'cpu' },
  { slug: 'vga', name: 'Card Màn Hình (VGA)', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'vga' },
  { slug: 'mainboard', name: 'Mainboard - Bo Mạch Chủ', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'mainboard' },
  { slug: 'ram', name: 'RAM - Bộ Nhớ Trong', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'ram' },
  { slug: 'storage', name: 'SSD / Ổ Cứng Lưu Trữ', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'storage' },
  { slug: 'psu', name: 'Nguồn Máy Tính (PSU)', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'psu' },
  { slug: 'case', name: 'Vỏ Case Máy Tính', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'case' },
  { slug: 'cooler', name: 'Tản Nhiệt Khí & Nước', parentSlug: 'linh-kien', parentName: 'Linh Kiện Máy Tính (PC Parts)', specTemplateKey: 'cooler' },
  // Màn hình
  { slug: 'monitor-gaming', name: 'Màn Hình Gaming', parentSlug: 'man-hinh', parentName: 'Màn Hình Máy Tính', specTemplateKey: 'monitor' },
  { slug: 'monitor-creator', name: 'Màn Hình Đồ Họa', parentSlug: 'man-hinh', parentName: 'Màn Hình Máy Tính', specTemplateKey: 'monitor' },
  { slug: 'monitor-office', name: 'Màn Hình Văn Phòng', parentSlug: 'man-hinh', parentName: 'Màn Hình Máy Tính', specTemplateKey: 'monitor' },
  // Gaming Gear
  { slug: 'keyboard', name: 'Bàn Phím Cơ Gaming', parentSlug: 'gaming-gear', parentName: 'Bàn Phím & Chuột Gaming', specTemplateKey: 'gear' },
  { slug: 'mouse', name: 'Chuột Gaming', parentSlug: 'gaming-gear', parentName: 'Bàn Phím & Chuột Gaming', specTemplateKey: 'gear' },
  { slug: 'headphone', name: 'Tai Nghe Gaming', parentSlug: 'gaming-gear', parentName: 'Bàn Phím & Chuột Gaming', specTemplateKey: 'gear' },
];

export const SPEC_TEMPLATES: Record<string, { label: string; specs: ProductSpec[] }> = {
  pc: {
    label: 'Mẫu thông số PC Gaming / Máy bộ',
    specs: [
      { label: 'CPU', value: 'Intel Core i5 13400F (10 Nhân 16 Luồng)' },
      { label: 'Mainboard', value: 'ASUS B760M-Plus DDR4 Gaming' },
      { label: 'VGA', value: 'ASUS Dual GeForce RTX 4060 8GB GDDR6' },
      { label: 'RAM', value: '16GB (2x8GB) DDR4 3200MHz' },
      { label: 'SSD', value: '500GB PCIe 4.0 NVMe M.2 Tốc độ cao' },
      { label: 'Nguồn', value: '650W Chuẩn 80 Plus Bronze' },
      { label: 'Vỏ Case', value: 'Kính Cường Lực 3 Fan RGB' },
    ],
  },
  laptop: {
    label: 'Mẫu thông số Laptop',
    specs: [
      { label: 'CPU', value: 'Intel Core i5 / AMD Ryzen 5' },
      { label: 'RAM', value: '16GB DDR5 4800MHz (Nâng cấp tối đa 32GB)' },
      { label: 'Ổ cứng', value: '512GB PCIe 4.0 NVMe M.2 SSD' },
      { label: 'Card đồ họa', value: 'NVIDIA GeForce RTX 3050 / 4050' },
      { label: 'Màn hình', value: '15.6 inch FHD (1920x1080), 144Hz, IPS' },
      { label: 'Trọng lượng', value: '2.2 kg • Pin 48WHrs' },
    ],
  },
  cpu: {
    label: 'Mẫu thông số CPU',
    specs: [
      { label: 'Số nhân / Số luồng', value: '10 Cores / 16 Threads' },
      { label: 'Xung nhịp', value: 'Cơ bản 2.5GHz • Turbo tối đa 4.6GHz' },
      { label: 'Bộ nhớ đệm', value: '20MB Smart Cache' },
      { label: 'Socket', value: 'LGA1700 / AM5' },
      { label: 'TDP', value: '65W' },
    ],
  },
  vga: {
    label: 'Mẫu thông số Card màn hình (VGA)',
    specs: [
      { label: 'Chipset', value: 'NVIDIA GeForce RTX 4060' },
      { label: 'Bộ nhớ', value: '8GB GDDR6 128-bit' },
      { label: 'Cổng xuất hình', value: '1x HDMI 2.1a, 3x DisplayPort 1.4a' },
      { label: 'Nguồn đề nghị', value: '550W' },
    ],
  },
  mainboard: {
    label: 'Mẫu thông số Mainboard',
    specs: [
      { label: 'Socket', value: 'LGA1700 / AM5' },
      { label: 'Loại RAM', value: '4 khe DDR5 / DDR4' },
      { label: 'Khe cắm mở rộng', value: 'PCIe 4.0 / 5.0 x16, 2x M.2 NVMe' },
      { label: 'Kết nối mạng', value: 'LAN 2.5Gb & Wi-Fi 6' },
    ],
  },
  ram: {
    label: 'Mẫu thông số RAM',
    specs: [
      { label: 'Dung lượng', value: '16GB (2x8GB)' },
      { label: 'Chuẩn RAM', value: 'DDR4 3200MHz / DDR5 6000MHz' },
      { label: 'Độ trễ', value: 'CL16' },
      { label: 'Tản nhiệt', value: 'Nhôm + LED RGB' },
    ],
  },
  storage: {
    label: 'Mẫu thông số Ổ cứng SSD/HDD',
    specs: [
      { label: 'Dung lượng', value: '1TB' },
      { label: 'Chuẩn giao tiếp', value: 'PCIe Gen 4.0 x4, NVMe M.2' },
      { label: 'Tốc độ đọc / ghi', value: '7,450 MB/s / 6,900 MB/s' },
    ],
  },
  psu: {
    label: 'Mẫu thông số Nguồn (PSU)',
    specs: [
      { label: 'Công suất thực', value: '650W' },
      { label: 'Chứng nhận', value: '80 Plus Bronze / Gold' },
      { label: 'Quạt làm mát', value: '120mm chống ồn' },
    ],
  },
  case: {
    label: 'Mẫu thông số Vỏ Case',
    specs: [
      { label: 'Loại Case', value: 'Mid Tower / Micro-ATX' },
      { label: 'Hỗ trợ Mainboard', value: 'ATX, Micro-ATX, Mini-ITX' },
      { label: 'Fan đi kèm', value: '3x 120mm ARGB Fan' },
    ],
  },
  cooler: {
    label: 'Mẫu thông số Tản nhiệt',
    specs: [
      { label: 'Loại tản nhiệt', value: 'Tản nhiệt nước AIO 240mm / Tản khí' },
      { label: 'Kích thước', value: '240mm RGB' },
      { label: 'Hỗ trợ Socket', value: 'Intel LGA1700/1200, AMD AM5/AM4' },
    ],
  },
  monitor: {
    label: 'Mẫu thông số Màn hình',
    specs: [
      { label: 'Kích thước', value: '24 inch / 27 inch' },
      { label: 'Độ phân giải', value: 'Full HD (1920x1080) / 2K QHD' },
      { label: 'Tần số quét', value: '180Hz • 1ms' },
      { label: 'Tấm nền', value: 'Fast IPS • 99% sRGB' },
    ],
  },
  gear: {
    label: 'Mẫu thông số Gaming Gear',
    specs: [
      { label: 'Kiểu kết nối', value: 'Có dây USB / Không dây 2.4GHz + Bluetooth' },
      { label: 'Switch / Cảm biến', value: 'Mechanical Switch / Optical Sensor' },
      { label: 'Đèn LED', value: 'RGB 16.8 triệu màu' },
    ],
  },
};

export const DEFAULT_PROMOTIONS: string[] = [
  'Tặng gói vệ sinh máy tính định kỳ 2 năm miễn phí tại Nhân Phúc Tech.',
  'Giảm thêm 300.000 đ khi mua kèm màn hình gaming từ 144Hz.',
  'Hỗ trợ trả góp 0% lãi suất qua thẻ tín dụng và CCCD duyệt nhanh 15 phút.',
];

function enrichDefaultProduct(p: ProductItem, index: number): ProductItem {
  let tier: 'entry' | 'mid' | 'high' | '' = p.tier || '';
  let badge = p.badge || '';
  if (p.id === 'pc-1') {
    tier = 'mid';
    badge = 'Bán Chạy Nhất';
  } else if (p.id === 'pc-2') {
    tier = 'entry';
    badge = 'Tiết Kiệm';
  } else if (p.id === 'pc-3') {
    tier = 'high';
    badge = 'Hi-End Gaming';
  } else if (p.id === 'pc-4') {
    tier = 'high';
    badge = 'Workstation 3D';
  }

  return {
    ...p,
    warranty: p.warranty || '36 tháng chính hãng',
    stock: typeof p.stock === 'number' ? p.stock : 15 + (index % 10),
    badge,
    tier,
    featuredHome: p.featuredHome ?? true,
    promotions: p.promotions && p.promotions.length ? [...p.promotions] : [...DEFAULT_PROMOTIONS],
    gallery: p.gallery && p.gallery.length ? [...p.gallery] : [p.image],
    specs: p.specs && p.specs.length ? p.specs.map((s) => ({ ...s })) : [],
  };
}

function getInitialProducts(): ProductItem[] {
  const defaults = mockProducts.map(enrichDefaultProduct);
  try {
    const raw = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    // Migrate any custom products from legacy key if present
    const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (legacyRaw) {
      const legacyList = JSON.parse(legacyRaw);
      if (Array.isArray(legacyList) && legacyList.length > 0) {
        const merged: ProductItem[] = [];
        for (const item of legacyList) {
          const matchDefault = defaults.find((d) => d.id === item.id || d.sku === item.sku);
          if (matchDefault) {
            merged.push({
              ...matchDefault,
              ...item,
              specs: Array.isArray(item.specs) && item.specs.length ? item.specs : matchDefault.specs,
              gallery: Array.isArray(item.gallery) && item.gallery.length ? item.gallery : matchDefault.gallery,
              description: item.description || matchDefault.description,
              category: item.category || matchDefault.category,
              parentCategory: item.parentCategory || matchDefault.parentCategory,
              originalPrice: item.originalPrice || matchDefault.originalPrice || item.price,
              discount:
                typeof item.discount === 'number'
                  ? item.discount
                  : item.originalPrice && item.originalPrice > item.price
                    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
                    : matchDefault.discount || 0,
            });
          } else {
            const catOpt =
              PRODUCT_CATEGORIES.find(
                (c) =>
                  c.name.toLowerCase() === String(item.categoryName || '').toLowerCase() ||
                  c.slug === item.category
              ) || PRODUCT_CATEGORIES[5]!;
            const tpl = SPEC_TEMPLATES[catOpt.specTemplateKey]?.specs || [];
            merged.push({
              id: item.id || 'np-' + Date.now(),
              name: item.name || 'Sản phẩm mới',
              sku: item.sku || 'NP-001',
              category: item.category || catOpt.slug,
              parentCategory: item.parentCategory || catOpt.parentSlug,
              categoryName: item.categoryName || catOpt.name,
              brand: item.brand || 'Nhân Phúc',
              price: Number(item.price) || 0,
              originalPrice: Number(item.originalPrice) || Number(item.price) || 0,
              discount: Number(item.discount) || 0,
              image:
                item.image ||
                'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
              gallery: Array.isArray(item.gallery) && item.gallery.length ? item.gallery : [item.image || 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'],
              description:
                item.description ||
                'Sản phẩm công nghệ chính hãng phân phối tại Nhân Phúc Tech, bảo hành uy tín tận nơi.',
              specs: Array.isArray(item.specs) && item.specs.length ? item.specs : tpl.map((s) => ({ ...s })),
              warranty: item.warranty || '36 tháng chính hãng',
              stock: typeof item.stock === 'number' ? item.stock : 15,
              badge: item.badge || '',
              tier: item.tier || 'mid',
              promotions: Array.isArray(item.promotions) && item.promotions.length ? item.promotions : [...DEFAULT_PROMOTIONS],
              featuredHome: true,
            });
          }
        }
        localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    }
  } catch (e) {
    console.error('Lỗi đọc danh sách sản phẩm:', e);
  }
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaults));
  return defaults;
}

export const useProductStore = defineStore('products', () => {
  const products = ref<ProductItem[]>(getInitialProducts());

  const saveProducts = () => {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products.value));
  };

  const getProductById = (idOrSku: string): ProductItem | undefined => {
    const key = String(idOrSku || '').trim().toLowerCase();
    return products.value.find(
      (p) => p.id.toLowerCase() === key || p.sku.toLowerCase() === key
    );
  };

  const addProduct = (payload: Omit<ProductItem, 'id'> & { id?: string }): ProductItem => {
    const newItem: ProductItem = {
      ...payload,
      id: payload.id || 'np-' + Date.now(),
      gallery: payload.gallery && payload.gallery.length ? payload.gallery : [payload.image],
      specs: payload.specs ? payload.specs.filter((s) => s.label.trim() || s.value.trim()) : [],
      promotions:
        payload.promotions && payload.promotions.length
          ? payload.promotions.filter((p) => p.trim())
          : [...DEFAULT_PROMOTIONS],
    };
    products.value.unshift(newItem);
    saveProducts();
    return newItem;
  };

  const updateProduct = (id: string, payload: Partial<ProductItem>) => {
    const idx = products.value.findIndex((p) => p.id === id);
    if (idx !== -1) {
      const updated: ProductItem = {
        ...products.value[idx]!,
        ...payload,
      };
      if (updated.gallery && updated.gallery.length === 0 && updated.image) {
        updated.gallery = [updated.image];
      }
      if (updated.image && updated.gallery && updated.gallery[0] !== updated.image) {
        updated.gallery = [updated.image, ...updated.gallery.filter((g) => g !== updated.image)];
      }
      products.value[idx] = updated;
      saveProducts();
    }
  };

  const deleteProduct = (id: string) => {
    products.value = products.value.filter((p) => p.id !== id);
    saveProducts();
  };

  const resetProducts = () => {
    products.value = mockProducts.map(enrichDefaultProduct);
    saveProducts();
  };

  return {
    products,
    saveProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
  };
});

