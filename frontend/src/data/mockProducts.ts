export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  parentCategory: string;
  categoryName: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  gallery: string[];
  description: string;
  specs: ProductSpec[];
}

export const mockProducts: ProductItem[] = [
  // ================= LAPTOP =================
  {
    id: 'lap-1',
    name: 'Laptop Gaming ASUS TUF Gaming A15 FA506NC (Ryzen 5 7535HS / RTX 3050 4GB)',
    sku: 'LAP-ASUS-TUF-A15',
    category: 'laptop-gaming',
    parentCategory: 'laptop',
    categoryName: 'Laptop Gaming',
    brand: 'ASUS',
    price: 17490000,
    originalPrice: 20990000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80'
    ],
    description: 'ASUS TUF Gaming A15 là cỗ máy chiến game bền bỉ đạt chuẩn quân đội Mỹ MIL-STD-810H, trang bị chip AMD Ryzen 7000 series cùng card đồ họa NVIDIA GeForce RTX 3050.',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 5 7535HS (6 nhân 12 luồng, up to 4.55GHz)' },
      { label: 'RAM', value: '16GB DDR5 4800MHz (2 khe, nâng cấp tối đa 32GB)' },
      { label: 'Ổ cứng', value: '512GB PCIe 4.0 NVMe M.2 SSD' },
      { label: 'Card đồ họa', value: 'NVIDIA GeForce RTX 3050 4GB GDDR6' },
      { label: 'Màn hình', value: '15.6 inch FHD (1920x1080), 144Hz, IPS' },
      { label: 'Trọng lượng', value: '2.3 kg • Pin 48WHrs' }
    ]
  },
  {
    id: 'lap-2',
    name: 'Laptop Lenovo LOQ 15IAX9 83GS001RVN (i5-12450HX / RTX 3050 6GB)',
    sku: 'LAP-LENOVO-LOQ',
    category: 'laptop-gaming',
    parentCategory: 'laptop',
    categoryName: 'Laptop Gaming',
    brand: 'Lenovo',
    price: 18990000,
    originalPrice: 22490000,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80'
    ],
    description: 'Lenovo LOQ mang lại trải nghiệm chiến game đỉnh cao với màn hình chuẩn màu 100% sRGB và tản nhiệt buồng khí thế hệ mới.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-12450HX (8 nhân 12 luồng, up to 4.4GHz)' },
      { label: 'RAM', value: '12GB DDR5 4800MHz' },
      { label: 'Ổ cứng', value: '512GB SSD M.2 2242 PCIe 4.0x4 NVMe' },
      { label: 'Card đồ họa', value: 'NVIDIA GeForce RTX 3050 6GB GDDR6' },
      { label: 'Màn hình', value: '15.6 inch FHD 144Hz, 100% sRGB, G-SYNC' },
      { label: 'Trọng lượng', value: '2.38 kg' }
    ]
  },
  {
    id: 'lap-3',
    name: 'Laptop Dell Inspiron 15 3520 (Core i5-1235U / 16GB / 512GB SSD)',
    sku: 'LAP-DELL-3520',
    category: 'laptop-office',
    parentCategory: 'laptop',
    categoryName: 'Laptop Văn Phòng',
    brand: 'Dell',
    price: 13990000,
    originalPrice: 15490000,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80'
    ],
    description: 'Chiếc laptop văn phòng bền bỉ của Dell, màn hình 120Hz mượt mà, bàn phím fullsize gõ êm, pin dùng cả ngày làm việc.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5-1235U (10 nhân 12 luồng, up to 4.4GHz)' },
      { label: 'RAM', value: '16GB DDR4 3200MHz' },
      { label: 'Ổ cứng', value: '512GB M.2 PCIe NVMe SSD' },
      { label: 'Màn hình', value: '15.6 inch FHD (1920 x 1080), 120Hz WVA' },
      { label: 'Trọng lượng', value: '1.65 kg' }
    ]
  },
  {
    id: 'lap-4',
    name: 'Apple MacBook Air 13.6 inch M2 (8GB RAM / 256GB SSD - Midnight)',
    sku: 'LAP-MACBOOK-AIR-M2',
    category: 'macbook',
    parentCategory: 'laptop',
    categoryName: 'MacBook & Apple',
    brand: 'Apple',
    price: 24990000,
    originalPrice: 27990000,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80'
    ],
    description: 'Thiết kế nhôm nguyên khối siêu mỏng nhẹ chỉ 1.24kg, thời lượng pin ấn tượng lên đến 18 giờ cùng màn hình Liquid Retina tuyệt đẹp.',
    specs: [
      { label: 'CPU', value: 'Apple M2 chip 8-core CPU với 4 lõi hiệu năng' },
      { label: 'GPU', value: '8-core GPU • 16-core Neural Engine' },
      { label: 'RAM', value: '8GB Unified Memory' },
      { label: 'Ổ cứng', value: '256GB SSD' },
      { label: 'Màn hình', value: '13.6 inch Liquid Retina (2560x1664), True Tone' },
      { label: 'Trọng lượng', value: '1.24 kg' }
    ]
  },

  // ================= PC GAMING NETSOFT =================
  {
    id: 'pc-1',
    name: 'PC Gaming NetSoft Dragon Core i5 13400F | RTX 4060 8GB | 16GB RAM',
    sku: 'PC-NS-DRAGON',
    category: 'pc-gaming-mid',
    parentCategory: 'pc-gaming',
    categoryName: 'PC Gaming Trung Cấp',
    brand: 'NetSoft',
    price: 17990000,
    originalPrice: 20990000,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80'
    ],
    description: 'Cỗ máy PC Gaming bán chạy số 1 tại NetSoft, chiến mượt mọi tựa game Esport và AAA ở độ phân giải Full HD / 2K max settings.',
    specs: [
      { label: 'CPU', value: 'Intel Core i5 13400F (10 Nhân 16 Luồng)' },
      { label: 'Mainboard', value: 'ASUS B760M-Plus DDR4 Gaming' },
      { label: 'VGA', value: 'ASUS Dual GeForce RTX 4060 8GB GDDR6' },
      { label: 'RAM', value: 'Kingston Fury Beast RGB 16GB (2x8GB) 3200MHz' },
      { label: 'SSD', value: 'Kingston NV2 500GB PCIe 4.0 NVMe' },
      { label: 'Nguồn', value: 'Corsair CV650 650W 80 Plus Bronze' },
      { label: 'Vỏ Case', value: 'Xigmatek Aqua M 3 Fan RGB Kính Cường Lực' }
    ]
  },
  {
    id: 'pc-2',
    name: 'PC Gaming NetSoft Starter Core i3 12100F | GTX 1650 4GB | 16GB RAM',
    sku: 'PC-NS-STARTER',
    category: 'pc-gaming-entry',
    parentCategory: 'pc-gaming',
    categoryName: 'PC Gaming Phổ Thông',
    brand: 'NetSoft',
    price: 9890000,
    originalPrice: 11500000,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&q=80'
    ],
    description: 'Dàn PC Gaming giá học sinh sinh viên, cân tốt GTA V, FIFA Online 4, Liên Minh Huyền Thoại, Valorant mượt mà 150+ FPS.',
    specs: [
      { label: 'CPU', value: 'Intel Core i3 12100F (4 Nhân 8 Luồng)' },
      { label: 'Mainboard', value: 'Gigabyte H610M-H DDR4' },
      { label: 'VGA', value: 'Gigabyte GeForce GTX 1650 4GB GDDR6' },
      { label: 'RAM', value: '16GB DDR4 3200MHz' },
      { label: 'SSD', value: '256GB NVMe M.2 Tốc độ cao' },
      { label: 'Nguồn', value: '500W Chuẩn 80 Plus' }
    ]
  },
  {
    id: 'pc-3',
    name: 'PC Gaming NetSoft Cyberpunk Core i7 14700KF | RTX 4070 Super 12GB | 32GB RAM',
    sku: 'PC-NS-CYBER',
    category: 'pc-gaming-high',
    parentCategory: 'pc-gaming',
    categoryName: 'PC Gaming Cao Cấp',
    brand: 'NetSoft',
    price: 36990000,
    originalPrice: 41990000,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&q=80',
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'
    ],
    description: 'Cỗ máy Hi-End hiệu năng đỉnh cao, thiết kế LED RGB đồng bộ nước AIO Deepcool, chiến game 4K và dựng hình 3D Render mượt mà.',
    specs: [
      { label: 'CPU', value: 'Intel Core i7 14700KF (20 Nhân 28 Luồng, up to 5.6GHz)' },
      { label: 'Tản nhiệt', value: 'Tản nhiệt nước AIO Deepcool LT520 240mm RGB' },
      { label: 'Mainboard', value: 'MSI MAG Z790 TOMAHAWK WIFI DDR5' },
      { label: 'VGA', value: 'MSI GeForce RTX 4070 SUPER 12G Gaming X Slim' },
      { label: 'RAM', value: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz' },
      { label: 'SSD', value: 'Samsung 990 Pro 1TB Gen 4 (7450 MB/s)' },
      { label: 'Nguồn', value: 'Corsair RM750e 750W 80 Plus Gold' }
    ]
  },
  {
    id: 'pc-4',
    name: 'PC Workstation NetSoft Pro Render Ryzen 9 7900X | RTX 4080 Super 16GB',
    sku: 'PC-NS-WORKSTATION',
    category: 'pc-workstation',
    parentCategory: 'pc-gaming',
    categoryName: 'PC Thiết Kế Đồ Họa 3D',
    brand: 'NetSoft',
    price: 58990000,
    originalPrice: 64990000,
    discount: 9,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80'
    ],
    description: 'Cỗ máy chuyên dụng cho kỹ sư đồ họa 3D, kiến trúc sư render Lumion, Blender, Premier Pro, After Effects chuyên nghiệp.',
    specs: [
      { label: 'CPU', value: 'AMD Ryzen 9 7900X (12 nhân 24 luồng, up to 5.4GHz)' },
      { label: 'Mainboard', value: 'ASUS ProArt X670E-CREATOR WIFI' },
      { label: 'VGA', value: 'ASUS TUF Gaming GeForce RTX 4080 SUPER 16GB' },
      { label: 'RAM', value: '64GB (2x32GB) DDR5 6000MHz Kingston Fury' },
      { label: 'SSD', value: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe' },
      { label: 'Nguồn', value: 'Corsair RM1000e 1000W 80 Plus Gold' }
    ]
  },

  // ================= LINH KIỆN PC: CPU =================
  {
    id: 'cpu-1',
    name: 'CPU Intel Core i5-13400F (Up to 4.6GHz, 10 Cores 16 Threads, 20MB Cache)',
    sku: 'CPU-INTEL-13400F',
    category: 'cpu',
    parentCategory: 'linh-kien',
    categoryName: 'CPU - Bộ Vi Xử Lý',
    brand: 'Intel',
    price: 4390000,
    originalPrice: 5490000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&q=80'
    ],
    description: 'Bộ vi xử lý quốc dân phân khúc tầm trung từ Intel Raptor Lake, đáp ứng hoàn hảo từ chiến game AAA đến biên tập video.',
    specs: [
      { label: 'Số nhân / Số luồng', value: '10 Cores (6 P-Core + 4 E-Core) / 16 Threads' },
      { label: 'Xung nhịp', value: 'Cơ bản 2.5GHz • Turbo tối đa 4.6GHz' },
      { label: 'Bộ nhớ đệm', value: '20MB Intel Smart Cache' },
      { label: 'Socket', value: 'FCLGA1700' },
      { label: 'TDP', value: '65W (Tối đa 148W)' }
    ]
  },
  {
    id: 'cpu-2',
    name: 'CPU Intel Core i7-14700K (Up to 5.6GHz, 20 Cores 28 Threads, 33MB Cache)',
    sku: 'CPU-INTEL-14700K',
    category: 'cpu',
    parentCategory: 'linh-kien',
    categoryName: 'CPU - Bộ Vi Xử Lý',
    brand: 'Intel',
    price: 10490000,
    originalPrice: 11990000,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&q=80'
    ],
    description: 'Thế hệ CPU Raptor Lake Refresh mạnh mẽ hàng đầu với 20 nhân xử lý, tích hợp nhân đồ họa Intel UHD 770.',
    specs: [
      { label: 'Số nhân / Luồng', value: '20 Cores (12 P-Core + 8 E-Core) / 28 Threads' },
      { label: 'Xung nhịp', value: 'Tối đa 5.6GHz' },
      { label: 'Socket', value: 'LGA1700' }
    ]
  },
  {
    id: 'cpu-3',
    name: 'CPU AMD Ryzen 5 7600 (Up to 5.1GHz, 6 Cores 12 Threads, Socket AM5)',
    sku: 'CPU-AMD-7600',
    category: 'cpu',
    parentCategory: 'linh-kien',
    categoryName: 'CPU - Bộ Vi Xử Lý',
    brand: 'AMD',
    price: 4990000,
    originalPrice: 5790000,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=600&q=80'
    ],
    description: 'Kiến trúc Zen 4 tiến trình 5nm tiết kiệm điện năng, hỗ trợ chuẩn RAM DDR5 và PCIe 5.0 tối tân.',
    specs: [
      { label: 'Số nhân / Luồng', value: '6 Nhân / 12 Luồng' },
      { label: 'Xung nhịp Boost', value: '5.1GHz' },
      { label: 'Bộ nhớ đệm', value: '38MB Cache' },
      { label: 'Socket', value: 'AM5' }
    ]
  },

  // ================= LINH KIỆN PC: VGA =================
  {
    id: 'vga-1',
    name: 'Card Màn Hình ASUS Dual GeForce RTX 4060 EVO OC 8GB GDDR6',
    sku: 'VGA-ASUS-4060-EVO',
    category: 'vga',
    parentCategory: 'linh-kien',
    categoryName: 'Card Màn Hình (VGA)',
    brand: 'ASUS',
    price: 8490000,
    originalPrice: 10290000,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80'
    ],
    description: 'Tận hưởng công nghệ DLSS 3 và Frame Generation độc quyền của NVIDIA, tăng tốc khung hình gấp 3 lần.',
    specs: [
      { label: 'Chipset', value: 'NVIDIA GeForce RTX 4060' },
      { label: 'Bộ nhớ', value: '8GB GDDR6 128-bit' },
      { label: 'Cổng xuất hình', value: '1x HDMI 2.1a, 3x DisplayPort 1.4a' },
      { label: 'Nguồn đề nghị', value: '550W' }
    ]
  },
  {
    id: 'vga-2',
    name: 'Card Màn Hình MSI GeForce RTX 4070 SUPER 12G VENTUS 2X OC',
    sku: 'VGA-MSI-4070S',
    category: 'vga',
    parentCategory: 'linh-kien',
    categoryName: 'Card Màn Hình (VGA)',
    brand: 'MSI',
    price: 16990000,
    originalPrice: 18990000,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&q=80'
    ],
    description: 'Hiệu năng mạnh hơn RTX 3090 tiền nhiệm, chuyên trị game 2K/4K max đồ họa.',
    specs: [
      { label: 'Chipset', value: 'NVIDIA GeForce RTX 4070 Super' },
      { label: 'Bộ nhớ', value: '12GB GDDR6X 192-bit' },
      { label: 'Nguồn đề nghị', value: '650W' }
    ]
  },

  // ================= LINH KIỆN PC: MAINBOARD =================
  {
    id: 'mb-1',
    name: 'Mainboard ASUS TUF GAMING B760M-PLUS WIFI DDR5',
    sku: 'MB-ASUS-B760M',
    category: 'mainboard',
    parentCategory: 'linh-kien',
    categoryName: 'Mainboard - Bo Mạch Chủ',
    brand: 'ASUS',
    price: 3890000,
    originalPrice: 4390000,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'
    ],
    description: 'Bo mạch chủ độ bền chuẩn quân sự, cấp nguồn 12+1 DrMOS, tản nhiệt VRM dày dặn và tích hợp Wi-Fi 6.',
    specs: [
      { label: 'Socket', value: 'LGA1700 (Hỗ trợ Gen 12, 13, 14)' },
      { label: 'Loại RAM', value: '4x DDR5 (Up to 7200+ MHz OC)' },
      { label: 'Khe cắm mở rộng', value: '1x PCIe 5.0 x16' },
      { label: 'Kết nối mạng', value: 'Realtek 2.5Gb Ethernet & Wi-Fi 6' }
    ]
  },
  {
    id: 'mb-2',
    name: 'Mainboard Gigabyte H610M H V2 DDR4',
    sku: 'MB-GIGA-H610',
    category: 'mainboard',
    parentCategory: 'linh-kien',
    categoryName: 'Mainboard - Bo Mạch Chủ',
    brand: 'Gigabyte',
    price: 1790000,
    originalPrice: 2090000,
    discount: 14,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80'
    ],
    description: 'Lựa chọn tiết kiệm hàng đầu cho các cấu hình Intel Core i3 / Core i5 thế hệ 12 và 13.',
    specs: [
      { label: 'Socket', value: 'LGA1700' },
      { label: 'RAM', value: '2 khe DDR4 3200MHz' }
    ]
  },

  // ================= LINH KIỆN PC: RAM =================
  {
    id: 'ram-1',
    name: 'RAM Kingston FURY Beast RGB 16GB (2x8GB) DDR4 3200MHz',
    sku: 'RAM-KING-16-D4',
    category: 'ram',
    parentCategory: 'linh-kien',
    categoryName: 'RAM - Bộ Nhớ Trong',
    brand: 'Kingston',
    price: 1090000,
    originalPrice: 1590000,
    discount: 31,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&q=80'
    ],
    description: 'Dải LED RGB mượt mà hỗ trợ đồng bộ Aura Sync, Mystic Light. Tản nhiệt nhôm đen cứng cáp.',
    specs: [
      { label: 'Dung lượng', value: '16GB (Kit 2 thanh 8GB)' },
      { label: 'Chuẩn', value: 'DDR4 3200MHz' },
      { label: 'Độ trễ', value: 'CL16' }
    ]
  },
  {
    id: 'ram-2',
    name: 'RAM Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz',
    sku: 'RAM-COR-32-D5',
    category: 'ram',
    parentCategory: 'linh-kien',
    categoryName: 'RAM - Bộ Nhớ Trong',
    brand: 'Corsair',
    price: 2990000,
    originalPrice: 3590000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&q=80'
    ],
    description: 'Tốc độ bus 6000MHz siêu nhanh cho các hệ thống Intel Core Gen 13/14 và AMD Ryzen 7000.',
    specs: [
      { label: 'Dung lượng', value: '32GB (2x16GB)' },
      { label: 'Chuẩn', value: 'DDR5 6000MHz' }
    ]
  },

  // ================= LINH KIỆN PC: STORAGE =================
  {
    id: 'ssd-1',
    name: 'Ổ Cứng SSD Samsung 990 PRO 1TB PCIe 4.0 NVMe M.2 7450MB/s',
    sku: 'SSD-SAM-990-1T',
    category: 'storage',
    parentCategory: 'linh-kien',
    categoryName: 'SSD / Ổ Cứng Lưu Trữ',
    brand: 'Samsung',
    price: 2790000,
    originalPrice: 3200000,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80'
    ],
    description: 'Vua tốc độ SSD thế hệ PCIe 4.0, đọc tuần tự 7450 MB/s, ghi 6900 MB/s, bảo hành 5 năm chính hãng.',
    specs: [
      { label: 'Chuẩn giao tiếp', value: 'PCIe Gen 4.0 x4, NVMe 2.0' },
      { label: 'Tốc độ đọc / ghi', value: '7,450 MB/s / 6,900 MB/s' }
    ]
  },
  {
    id: 'ssd-2',
    name: 'Ổ Cứng SSD Kingston NV2 1TB PCIe 4.0 x4 NVMe M.2',
    sku: 'SSD-KING-1TB',
    category: 'storage',
    parentCategory: 'linh-kien',
    categoryName: 'SSD / Ổ Cứng Lưu Trữ',
    brand: 'Kingston',
    price: 1590000,
    originalPrice: 1890000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&q=80'
    ],
    description: 'Giải pháp nâng cấp lưu trữ dung lượng lớn 1TB với mức giá tốt nhất thị trường.',
    specs: [
      { label: 'Tốc độ đọc / ghi', value: '3,500 MB/s / 2,100 MB/s' }
    ]
  },

  // ================= LINH KIỆN PC: PSU =================
  {
    id: 'psu-1',
    name: 'Nguồn Máy Tính Corsair CV650 650W 80 Plus Bronze',
    sku: 'PSU-COR-CV650',
    category: 'psu',
    parentCategory: 'linh-kien',
    categoryName: 'Nguồn Máy Tính (PSU)',
    brand: 'Corsair',
    price: 1390000,
    originalPrice: 1690000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'
    ],
    description: 'Nguồn công suất thực 650W chuẩn 80 Plus Bronze, quạt 120mm êm ái, kéo mượt RTX 4060 / 4060 Ti.',
    specs: [
      { label: 'Công suất', value: '650W' },
      { label: 'Chứng nhận', value: '80 Plus Bronze' }
    ]
  },

  // ================= LINH KIỆN PC: CASE & COOLER =================
  {
    id: 'case-1',
    name: 'Vỏ Case Xigmatek Aqua M Lite 3FX (Kính Cường Lực - 3 Fan RGB)',
    sku: 'CASE-XIG-AQUA',
    category: 'case',
    parentCategory: 'linh-kien',
    categoryName: 'Vỏ Case Máy Tính',
    brand: 'Xigmatek',
    price: 890000,
    originalPrice: 1100000,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'
    ],
    description: 'Thiết kế bể cá trong suốt không cột cản tầm nhìn, khoe trọn linh kiện LED RGB bên trong.',
    specs: [
      { label: 'Loại Case', value: 'Micro-ATX Mini Tower' },
      { label: 'Fan đi kèm', value: '3x 120mm ARGB Fan' }
    ]
  },
  {
    id: 'cool-1',
    name: 'Tản Nhiệt Nước AIO Deepcool LT520 240mm RGB',
    sku: 'COOL-DEEP-LT520',
    category: 'cooler',
    parentCategory: 'linh-kien',
    categoryName: 'Tản Nhiệt Khí & Nước',
    brand: 'Deepcool',
    price: 1990000,
    originalPrice: 2490000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'
    ],
    description: 'Bơm nước đa buồng thế hệ thứ 4 với mặt gương vô cực RGB độc đáo, làm mát tối đa cho CPU Intel Core i7 / i9.',
    specs: [
      { label: 'Kích thước Radiator', value: '282 x 120 x 27 mm' },
      { label: 'Hỗ trợ Socket', value: 'Intel LGA1700, AMD AM5/AM4' }
    ]
  },

  // ================= MÀN HÌNH =================
  {
    id: 'mon-1',
    name: 'Màn Hình Gaming ASUS TUF VG249Q3A 24" Fast IPS 180Hz 1ms',
    sku: 'MON-ASUS-24-180',
    category: 'monitor-gaming',
    parentCategory: 'man-hinh',
    categoryName: 'Màn Hình Gaming',
    brand: 'ASUS',
    price: 3190000,
    originalPrice: 4290000,
    discount: 26,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80'
    ],
    description: 'Tần số quét 180Hz kết hợp tấm nền Fast IPS tốc độ phản hồi 1ms GTG, công nghệ FreeSync Premium chống xé hình.',
    specs: [
      { label: 'Kích thước', value: '23.8 inch' },
      { label: 'Độ phân giải', value: 'Full HD (1920x1080)' },
      { label: 'Tần số quét', value: '180Hz' },
      { label: 'Tấm nền', value: 'Fast IPS • 99% sRGB' }
    ]
  },
  {
    id: 'mon-2',
    name: 'Màn Hình Dell UltraSharp U2424H 24" IPS 120Hz Chuẩn Màu Đồ Họa',
    sku: 'MON-DELL-U2424H',
    category: 'monitor-creator',
    parentCategory: 'man-hinh',
    categoryName: 'Màn Hình Đồ Họa',
    brand: 'Dell',
    price: 5890000,
    originalPrice: 6590000,
    discount: 11,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80'
    ],
    description: 'Màn hình đồ họa huyền thoại UltraSharp của Dell với độ chuẩn màu 100% sRGB và 85% DCI-P3, chân đế công thái học xoay 90 độ.',
    specs: [
      { label: 'Kích thước', value: '23.8 inch' },
      { label: 'Độ bao phủ màu', value: '100% sRGB, 100% BT.709, 85% DCI-P3, Delta E < 2' },
      { label: 'Tần số quét', value: '120Hz' }
    ]
  },

  // ================= GAMING GEAR =================
  {
    id: 'gear-1',
    name: 'Bàn Phím Cơ Gaming DareU EK87 V2 RGB (Brown Switch)',
    sku: 'GEAR-DAREU-EK87',
    category: 'keyboard',
    parentCategory: 'gaming-gear',
    categoryName: 'Bàn Phím Cơ Gaming',
    brand: 'DareU',
    price: 590000,
    originalPrice: 790000,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'
    ],
    description: 'Bàn phím cơ thiết kế Tenkeyless 87 phím nhỏ gọn, switch D-Switch độc quyền tuổi thọ 50 triệu lần nhấn.',
    specs: [
      { label: 'Layout', value: 'TKL 87 phím' },
      { label: 'Switch', value: 'DareU D-Switch (Brown / Blue / Red)' }
    ]
  },
  {
    id: 'gear-2',
    name: 'Chuột Gaming Không Dây Logitech G304 LIGHTSPEED Wireless',
    sku: 'GEAR-LOGI-G304',
    category: 'mouse',
    parentCategory: 'gaming-gear',
    categoryName: 'Chuột Gaming',
    brand: 'Logitech',
    price: 790000,
    originalPrice: 990000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80'
    ],
    description: 'Cảm biến HERO 12.000 DPI siêu chính xác, kết nối LIGHTSPEED độ trễ 1ms, pin dùng liên tục 250 giờ.',
    specs: [
      { label: 'Cảm biến', value: 'HERO 12.000 DPI' },
      { label: 'Kết nối', value: 'Không dây LIGHTSPEED' }
    ]
  }
];
