import { defineStore } from 'pinia';
import { ref } from 'vue';
import { mockNews, type NewsArticle } from '../data/mockNews';

export interface ITPackageFeature {
  text: string;
  included: boolean;
}

export interface ITPackageItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  isPopular: boolean;
  popularLabel?: string;
  ctaText: string;
  features: ITPackageFeature[];
}

export interface ITTaskCard {
  icon: string;
  title: string;
  description: string;
}

export interface ITSurveyLead {
  id: string;
  company: string;
  contactPerson: string;
  phone: string;
  computerCount: string;
  address: string;
  notes: string;
  createdAt: string;
  status: 'NEW' | 'CONTACTED' | 'QUOTED';
}

export interface ITOutsourcingConfig {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  hotline: string;
  stats: { value: string; label: string }[];
  sectionSubtitle: string;
  sectionTitle: string;
  sectionDesc: string;
  packages: ITPackageItem[];
  tasksTitle: string;
  tasks: ITTaskCard[];
  updatedBy?: string;
  updatedAt?: string;
}

export interface AboutPageConfig {
  heroBadge: string;
  companyTitle: string;
  heroIntro: string;
  storyTitle: string;
  storyContent: string;
  missionTitle: string;
  missionContent: string;
  whyChooseTitle: string;
  coreValues: { icon: string; title: string; desc: string }[];
  address: string;
  hotline: string;
  workingHours: string;
  emailSales: string;
  emailSupport: string;
  updatedBy?: string;
  updatedAt?: string;
}

const IT_STORAGE_KEY = 'nhanphuc_site_it_outsourcing';
const NEWS_STORAGE_KEY = 'nhanphuc_site_news';
const ABOUT_STORAGE_KEY = 'nhanphuc_site_about';
const SURVEY_STORAGE_KEY = 'nhanphuc_site_it_surveys';
const BANNER_STORAGE_KEY = 'nhanphuc_site_banners';
const FLASH_SALE_STORAGE_KEY = 'nhanphuc_site_flash_sale';
const HOME_PROMOS_STORAGE_KEY = 'nhanphuc_site_home_promos';
const REPAIR_SERVICE_STORAGE_KEY = 'nhanphuc_site_repair_service';

export interface FlashSaleItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  sold: number;
  stock: number;
}

export interface FlashSaleConfig {
  enabled: boolean;
  title: string;
  badge: string;
  subtitle: string;
  hours: number;
  minutes: number;
  seconds: number;
  items: FlashSaleItem[];
  updatedBy?: string;
  updatedAt?: string;
}

export interface SidePromoBanner {
  id: string;
  subtitle: string;
  title: string;
  desc: string;
  btnText: string;
  link: string;
  icon: string;
  theme: 'emerald' | 'amber' | 'blue' | 'purple';
}

export interface HomePromosConfig {
  sideBanners: SidePromoBanner[];
  ctaBadge: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
}

export interface RepairPriceRow {
  id: string;
  name: string;
  desc: string;
  time: string;
  warranty: string;
  price: string;
}

export interface RepairCategoryTab {
  value: string;
  label: string;
  icon: string;
  items: RepairPriceRow[];
}

export interface RepairServiceConfig {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  hotline: string;
  commitments: { icon: string; title: string; desc: string }[];
  priceSectionSubtitle: string;
  priceSectionTitle: string;
  priceSectionDesc: string;
  categories: RepairCategoryTab[];
  workflowSubtitle: string;
  workflowTitle: string;
  workflowSteps: { title: string; desc: string }[];
  updatedBy?: string;
  updatedAt?: string;
}

const defaultFlashSale: FlashSaleConfig = {
  enabled: true,
  title: 'GIỜ VÀNG GIÁ SỐC',
  badge: 'Nhân Phúc Flash Deals',
  subtitle: 'Số lượng có hạn, ưu đãi kết thúc sau:',
  hours: 4,
  minutes: 32,
  seconds: 18,
  items: [
    {
      id: 'vga-1',
      name: 'Card Màn Hình ASUS Dual GeForce RTX 4060 EVO OC 8GB',
      brand: 'ASUS',
      price: 8490000,
      originalPrice: 10290000,
      discount: 18,
      image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80',
      sold: 19,
      stock: 25,
    },
    {
      id: 'cpu-1',
      name: 'CPU Intel Core i5-13400F (Up to 4.6GHz, 10 Cores 16 Threads)',
      brand: 'Intel',
      price: 4390000,
      originalPrice: 5490000,
      discount: 20,
      image: 'https://images.unsplash.com/photo-1555617778-02518510b9fa?w=400&q=80',
      sold: 28,
      stock: 30,
    },
    {
      id: 'mon-1',
      name: 'Màn Hình Gaming ASUS TUF VG249Q3A 24" Fast IPS 180Hz 1ms',
      brand: 'ASUS',
      price: 3190000,
      originalPrice: 4290000,
      discount: 26,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80',
      sold: 14,
      stock: 20,
    },
    {
      id: 'ram-1',
      name: 'RAM Kingston FURY Beast RGB 16GB (2x8GB) DDR4 3200MHz',
      brand: 'Kingston',
      price: 1090000,
      originalPrice: 1590000,
      discount: 31,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=400&q=80',
      sold: 42,
      stock: 50,
    },
  ],
  updatedBy: 'Hệ thống',
  updatedAt: '09/11/2026',
};

const defaultHomePromos: HomePromosConfig = {
  sideBanners: [
    {
      id: 'side-1',
      subtitle: 'Tiện ích thông minh',
      title: 'Xây Dựng Cấu Hình PC',
      desc: 'Tự do chọn linh kiện tương thích 100%, nhận ưu đãi giảm đến 1.500.000 đ',
      btnText: 'Build PC Ngay →',
      link: '/pc-builder',
      icon: '🖥️',
      theme: 'emerald',
    },
    {
      id: 'side-2',
      subtitle: 'Dịch vụ chuyên nghiệp',
      title: 'Sửa Chữa & Vệ Sinh PC',
      desc: 'Khám bệnh máy tính miễn phí, vệ sinh tra keo tản nhiệt lấy ngay trong 45 phút',
      btnText: 'Đặt Lịch Ngay →',
      link: '/services/repair',
      icon: '🛠️',
      theme: 'amber',
    },
  ],
  ctaBadge: 'Tính Năng Độc Quyền Nhân Phúc Tech',
  ctaTitle: 'Tự Tay Xây Dựng Cỗ Máy PC Mơ Ước',
  ctaDesc:
    'Hệ thống tự động lọc linh kiện tương thích 100%, cộng tiền tức thì, miễn phí công lắp đặt và tặng kèm gói vệ sinh máy 2 năm tại Nhân Phúc Tech.',
  ctaPrimaryText: 'Bắt Đầu Build Cấu Hình Ngay',
  ctaPrimaryLink: '/pc-builder',
  ctaSecondaryText: 'Yêu Cầu Báo Giá Doanh Nghiệp',
  ctaSecondaryLink: '/services/it-outsourcing',
};

const defaultRepairService: RepairServiceConfig = {
  heroBadge: 'Dịch Vụ Kỹ Thuật Uy Tín Nhân Phúc Tech',
  heroTitle: 'SỬA CHỮA PC • LAPTOP • ĐIỆN THOẠI LẤY LIỀN',
  heroDescription:
    'Khám bệnh và tư vấn giải pháp miễn phí 100%. Đội ngũ kỹ thuật viên giàu kinh nghiệm, linh kiện thay thế chính hãng, xem trực tiếp quá trình sửa chữa, bảo hành từ 6 đến 24 tháng.',
  hotline: '0777908179',
  commitments: [
    {
      icon: '🔍',
      title: 'Khám Lỗi Miễn Phí',
      desc: 'Kiểm tra tổng thể phần cứng & phần mềm không thu bất kỳ khoản phí nào.',
    },
    {
      icon: '⚡',
      title: 'Sửa Nhanh Lấy Liền',
      desc: 'Các sự cố nhẹ, thay màn hình, ép kính, thay pin chỉ từ 30 - 60 phút.',
    },
    {
      icon: '🛡️',
      title: 'Bảo Mật Dữ Liệu',
      desc: 'Cam kết không can thiệp, không xem trộm hay làm mất dữ liệu cá nhân của khách.',
    },
    {
      icon: '⭐',
      title: 'Bảo Hành Dài Hạn',
      desc: 'Linh kiện thay thế được bảo hành từ 6 đến 24 tháng 1 đổi 1 nhanh chóng.',
    },
  ],
  priceSectionSubtitle: 'Minh Bạch & Rõ Ràng',
  priceSectionTitle: 'BẢNG GIÁ DỊCH VỤ NIÊM YẾT THAM KHẢO',
  priceSectionDesc: 'Giá đã bao gồm công thợ lắp đặt và chế độ bảo hành. Không phát sinh chi phí ẩn.',
  categories: [
    {
      value: 'laptop',
      label: 'Sửa Chữa Laptop',
      icon: '💻',
      items: [
        {
          id: 'rp-lap-1',
          name: 'Vệ sinh Laptop & Tra keo tản nhiệt gốm cao cấp',
          desc: 'Thổi sạch bụi bẩn, tra keo tản nhiệt giảm 10-15 độ C',
          time: '30 - 45 phút',
          warranty: '1 tháng',
          price: '150.000 đ',
        },
        {
          id: 'rp-lap-2',
          name: 'Cài đặt Windows 10/11 Bản Quyền + Bộ Office',
          desc: 'Tối ưu hóa hệ thống, cài đủ driver và tiện ích diệt virus',
          time: '45 phút',
          warranty: 'Trọn đời máy',
          price: '150.000 đ',
        },
        {
          id: 'rp-lap-3',
          name: 'Thay Bàn Phím Laptop (ASUS, Dell, HP, Lenovo, Acer)',
          desc: 'Phím gõ êm, phím cơ bản hoặc có đèn LED nền',
          time: '45 - 60 phút',
          warranty: '12 tháng',
          price: 'Từ 350.000 đ',
        },
        {
          id: 'rp-lap-4',
          name: 'Thay Màn Hình Laptop FHD / IPS 144Hz',
          desc: 'Màn hình mới 100% không điểm chết, màu sắc sắc nét',
          time: '45 phút',
          warranty: '12 tháng (1 đổi 1)',
          price: 'Từ 1.250.000 đ',
        },
        {
          id: 'rp-lap-5',
          name: 'Nâng cấp Ổ Cứng SSD M.2 NVMe 512GB',
          desc: 'Chuyển dữ liệu miễn phí, tốc độ khởi động máy chỉ 5 giây',
          time: '30 phút',
          warranty: '36 tháng',
          price: '790.000 đ',
        },
        {
          id: 'rp-lap-6',
          name: 'Sửa Nguồn Mainboard / Cháy Chập / Không Lên Điện',
          desc: 'Sửa chữa vi mạch điện tử bằng kính hiển vi chuyên dụng',
          time: '1 - 2 ngày',
          warranty: '6 tháng',
          price: 'Từ 550.000 đ',
        },
      ],
    },
    {
      value: 'pc',
      label: 'Sửa Chữa PC Máy Bàn',
      icon: '🖥️',
      items: [
        {
          id: 'rp-pc-1',
          name: 'Kiểm tra chuẩn đoán lỗi PC không lên hình / treo màn',
          desc: 'Khám toàn diện nguồn, ram, main, vga hoàn toàn miễn phí',
          time: '30 phút',
          warranty: 'Miễn phí',
          price: '0 đ (Free)',
        },
        {
          id: 'rp-pc-2',
          name: 'Vệ sinh máy tính bàn PC Gaming, đi lại dây nguồn',
          desc: 'Vệ sinh bụi, tra keo tản nhiệt CPU và VGA',
          time: '45 phút',
          warranty: '1 tháng',
          price: '120.000 đ',
        },
        {
          id: 'rp-pc-3',
          name: 'Sửa / Thay Nguồn Máy Tính (PSU 500W - 650W)',
          desc: 'Nguồn công suất thực 80 Plus chính hãng',
          time: '30 phút',
          warranty: '36 tháng',
          price: 'Từ 450.000 đ',
        },
        {
          id: 'rp-pc-4',
          name: 'Sửa Card Màn Hình (VGA) rác hình, mất nguồn, quạt kêu',
          desc: 'Đóng lại chip VRAM, sửa mạch cấp nguồn VRM',
          time: '1 - 3 ngày',
          warranty: '3 - 6 tháng',
          price: 'Từ 600.000 đ',
        },
        {
          id: 'rp-pc-5',
          name: 'Cứu Dữ Liệu Ổ Cứng HDD / SSD Hỏng, Mất Phân Vùng',
          desc: 'Khôi phục hình ảnh, tài liệu kế toán quan trọng an toàn',
          time: '1 - 2 ngày',
          warranty: 'Bảo mật 100%',
          price: 'Từ 800.000 đ',
        },
      ],
    },
    {
      value: 'phone',
      label: 'Sửa Chữa Điện Thoại',
      icon: '📱',
      items: [
        {
          id: 'rp-ph-1',
          name: 'Thay Pin Điện Thoại iPhone / Android Dung Lượng Chuẩn',
          desc: 'Pin dung lượng cao, pin Pisen chính hãng, báo chuẩn % pin',
          time: '20 - 30 phút',
          warranty: '12 tháng',
          price: 'Từ 250.000 đ',
        },
        {
          id: 'rp-ph-2',
          name: 'Ép Kính / Thay Màn Hình iPhone / Samsung AMOLED',
          desc: 'Mặt kính cường lực trong suốt, cảm ứng mượt mà',
          time: '60 phút',
          warranty: '6 - 12 tháng',
          price: 'Từ 350.000 đ',
        },
        {
          id: 'rp-ph-3',
          name: 'Thay Chân Sạc / Sửa Loa Trong / Loa Ngoài rè',
          desc: 'Linh kiện zin bóc máy, sạc nhanh chuẩn dòng điện',
          time: '30 phút',
          warranty: '6 tháng',
          price: 'Từ 180.000 đ',
        },
        {
          id: 'rp-ph-4',
          name: 'Sửa Chữa Mất Sóng, Mất Wifi, Chạm Nguồn IC',
          desc: 'Khắc phục các sự cố rơi nước, va đập mạnh chuyên sâu',
          time: '1 - 2 ngày',
          warranty: '3 tháng',
          price: 'Từ 350.000 đ',
        },
      ],
    },
  ],
  workflowSubtitle: 'Quy Trình Chuẩn Quốc Tế',
  workflowTitle: '5 BƯỚC SỬA CHỮA MINH BẠCH TẠI NHÂN PHÚC TECH',
  workflowSteps: [
    {
      title: 'Tiếp Nhận Máy',
      desc: 'Ghi nhận tình trạng lỗi, số serial và thông tin liên hệ của khách hàng.',
    },
    {
      title: 'Kiểm Tra & Báo Giá',
      desc: 'Kỹ thuật viên xác định nguyên nhân và thông báo giá trước khi sửa.',
    },
    {
      title: 'Ký Tên Linh Kiện',
      desc: 'Khách hàng trực tiếp ký tên lên pin, màn hình, ổ cứng, ram trước khi sửa.',
    },
    {
      title: 'Tiến Hành Sửa Chữa',
      desc: 'Thay thế linh kiện chính hãng dưới camera giám sát chất lượng cao.',
    },
    {
      title: 'Kiểm Tra & Bàn Giao',
      desc: 'Khách hàng kiểm tra hoạt động, dán tem bảo hành và nhận phiếu giao máy.',
    },
  ],
  updatedBy: 'Hệ thống',
  updatedAt: '09/11/2026',
};

export interface HeroBannerSlide {
  id: string;
  title: string;
  desc: string;
  tag: string;
  image: string;
  link: string;
  btnText: string;
  highlight: string;
  active: boolean;
}

const defaultBanners: HeroBannerSlide[] = [
  {
    id: 'bn-1',
    title: 'Đại Tiệc PC Gaming Nhân Phúc Tech - Sức Mạnh RTX 40-Series',
    desc: 'Trải nghiệm đỉnh cao công nghệ Ray Tracing và DLSS 3. Giảm trực tiếp đến 25% khi mua kèm màn hình gaming.',
    tag: 'Siêu Ưu Đãi Tháng',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&q=80',
    link: '/shop?category=pc-gaming',
    btnText: 'Khám Phá Ngay',
    highlight: 'Tặng Bàn Phím Cơ Gaming 1.200.000 đ',
    active: true,
  },
  {
    id: 'bn-2',
    title: 'Laptop Gaming & Đồ Họa Thế Hệ Mới 2026',
    desc: 'Chip Intel Gen 14 & AMD Ryzen 8000 Series. Màn hình chuẩn màu 100% sRGB, bảo hành chính hãng 2 năm tận nơi.',
    tag: 'Chính Hãng 100%',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80',
    link: '/shop?category=laptop',
    btnText: 'Xem Sản Phẩm',
    highlight: 'Hỗ Trợ Trả Góp 0% Lãi Suất',
    active: true,
  },
  {
    id: 'bn-3',
    title: 'Linh Kiện PC Giá Rẻ Nhất - Bảo Hành Đổi Mới',
    desc: 'Đầy đủ CPU Intel/AMD, Card đồ họa RTX 4060, Mainboard, RAM DDR5, Nguồn 80 Plus Gold sẵn kho giao ngay.',
    tag: 'Giá Cực Sốc',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&q=80',
    link: '/shop?category=linh-kien',
    btnText: 'Mua Linh Kiện',
    highlight: 'Miễn Phí Giao Hàng Toàn Quốc',
    active: true,
  },
];

const defaultITConfig: ITOutsourcingConfig = {
  heroBadge: 'Giải Pháp Doanh Nghiệp Toàn Diện',
  heroTitle: 'DỊCH VỤ IT OUTSOURCING • BẢO TRÌ HỆ THỐNG MẠNG DOANH NGHIỆP',
  heroDescription:
    'Tiết kiệm tới 60% chi phí so với việc thuê nhân sự IT toàn thời gian. Nhân Phúc Tech đóng vai trò như một phòng IT chuyên nghiệp: bảo trì máy tính, quản trị mạng, máy chủ server và bảo mật dữ liệu 24/7.',
  hotline: '0777908179',
  stats: [
    { value: '15 Phút', label: 'Thời gian phản hồi sự cố khẩn cấp' },
    { value: '99.9%', label: 'Hệ thống mạng & máy chủ Uptime' },
    { value: '100+', label: 'Doanh nghiệp vừa & nhỏ tin dùng' },
    { value: 'Tiết kiệm 60%', label: 'Chi phí vận hành nhân sự IT' },
  ],
  sectionSubtitle: 'Linh Hoạt Theo Quy Mô',
  sectionTitle: 'CÁC GÓI DỊCH VỤ IT OUTSOURCING NHÂN PHÚC TECH',
  sectionDesc: 'Lựa chọn gói dịch vụ phù hợp với số lượng máy tính và mô hình công ty của bạn.',
  packages: [
    {
      id: 'pkg-startup',
      name: 'Khởi Nghiệp (Startup)',
      price: 1500000,
      unit: '/ tháng (Thanh toán định kỳ)',
      description: 'Thích hợp cho văn phòng từ 5 - 10 máy tính, nhu cầu bảo trì cơ bản.',
      isPopular: false,
      ctaText: 'Đăng Ký Gói Này',
      features: [
        { text: 'Hỗ trợ Remote từ xa không giới hạn', included: true },
        { text: 'Kỹ thuật viên Onsite tận nơi 2 lần/tháng', included: true },
        { text: 'Xử lý sự cố máy tính, máy in, mạng wifi', included: true },
        { text: 'Cài đặt hệ điều hành và diệt virus', included: true },
        { text: 'Quản trị Server & Tường lửa', included: false },
      ],
    },
    {
      id: 'pkg-standard',
      name: 'Doanh Nghiệp Tiêu Chuẩn',
      price: 3500000,
      unit: '/ tháng (Quy mô 10 - 25 máy tính)',
      description: 'Dành cho công ty có máy chủ dữ liệu kế toán, yêu cầu bảo mật cao.',
      isPopular: true,
      popularLabel: 'Phổ Biến Nhất',
      ctaText: 'Đăng Ký Gói Tiêu Chuẩn →',
      features: [
        { text: 'Hỗ trợ Remote 24/7 phản hồi dưới 15 phút', included: true },
        { text: 'Kỹ thuật viên Onsite định kỳ 4 lần/tháng', included: true },
        { text: 'Xử lý khẩn cấp tận nơi trong 30-45 phút', included: true },
        { text: 'Quản trị Máy Chủ File Server, NAS Synology', included: true },
        { text: 'Sao lưu (Backup) tự động dữ liệu hàng tuần', included: true },
        { text: 'Tối ưu hóa băng thông mạng Lan / Wifi doanh nghiệp', included: true },
      ],
    },
    {
      id: 'pkg-enterprise',
      name: 'Doanh Nghiệp Lớn (Enterprise)',
      price: 7000000,
      unit: '/ tháng (Từ 25 - 60+ máy trạm)',
      description: 'Dành cho tập đoàn, chuỗi văn phòng, xí nghiệp sản xuất có hạ tầng mạng phức tạp.',
      isPopular: false,
      ctaText: 'Liên Hệ Báo Giá Riêng',
      features: [
        { text: 'Kỹ thuật viên Onsite định kỳ hàng tuần', included: true },
        { text: 'Có thể bố trí nhân sự túc trực tại văn phòng', included: true },
        { text: 'Cấu hình tường lửa chuyên dụng (Fortinet, Sophos)', included: true },
        { text: 'Thiết lập VPN kết nối chi nhánh bảo mật', included: true },
        { text: 'Quản lý tài khoản Mail Server Google / Microsoft 365', included: true },
      ],
    },
  ],
  tasksTitle: 'HẠNG MỤC CÔNG VIỆC PHÒNG IT NHÂN PHÚC TECH ĐẢM NHẬN',
  tasks: [
    {
      icon: '🖥️',
      title: 'Bảo Trì Máy Tính Trạm & Laptop',
      description:
        'Vệ sinh phần cứng, xử lý sự cố Windows, cài đặt phần mềm chuyên ngành, dọn dẹp file rác và tăng tốc máy tính cho nhân viên.',
    },
    {
      icon: '🌐',
      title: 'Quản Trị Mạng Lan & Wifi Diện Rộng',
      description:
        'Thiết lập Router cân bằng tải, phân tách VLAN cho nhân viên và khách, giải quyết dứt điểm tình trạng nghẽn mạng và rớt sóng.',
    },
    {
      icon: '🗄️',
      title: 'Quản Trị Máy Chủ & Sao Lưu Dữ Liệu',
      description:
        'Vận hành Domain Controller, máy chủ chia sẻ tài liệu nội bộ, tự động backup dữ liệu kế toán hàng ngày chống virus tống tiền.',
    },
  ],
  updatedBy: 'Hệ thống',
  updatedAt: '02/11/2026',
};

const defaultAboutConfig: AboutPageConfig = {
  heroBadge: 'Về Chúng Tôi',
  companyTitle: 'CÔNG TY CÔNG NGHỆ NHÂN PHÚC TECH',
  heroIntro:
    'Chào mừng đến với Nhân Phúc Tech — đơn vị chuyên cung cấp Laptop, PC Gaming, Máy trạm Đồ họa, Linh kiện vi tính chính hãng và Dịch vụ kỹ thuật & IT Outsourcing toàn diện tại TP.HCM.',
  storyTitle: 'Câu Chuyện Thương Hiệu',
  storyContent:
    'Thành lập từ năm 2018, Nhân Phúc Tech tự hào mang đến cho khách hàng cá nhân, game thủ và doanh nghiệp những sản phẩm công nghệ chính hãng 100%, đi kèm với dịch vụ hậu mãi chuẩn mực và chuyên nghiệp nhất. Đội ngũ của chúng tôi bao gồm các kỹ sư IT giàu kinh nghiệm, đam mê công nghệ và luôn đặt chữ "Tâm" lên hàng đầu.',
  missionTitle: 'Tầm Nhìn & Sứ Mệnh',
  missionContent:
    'Trở thành đối tác công nghệ đáng tin cậy hàng đầu của mọi khách hàng và doanh nghiệp, giúp quá trình trang bị phần cứng, chuyển đổi số và vận hành hệ thống IT trở nên trơn tru, bảo mật và tiết kiệm chi phí tối đa.',
  whyChooseTitle: 'Tại Sao Chọn Nhân Phúc Tech?',
  coreValues: [
    {
      icon: '🛡️',
      title: 'Chất lượng đảm bảo',
      desc: 'Tất cả sản phẩm linh kiện bán ra đều nguyên seal, chính hãng 100%, bảo hành uy tín.',
    },
    {
      icon: '👨‍🔧',
      title: 'Tận tâm & Chuyên nghiệp',
      desc: 'Hỗ trợ kỹ thuật 24/7 đối với khách hàng cá nhân và doanh nghiệp sử dụng dịch vụ IT Outsourcing.',
    },
    {
      icon: '💰',
      title: 'Giá cả cạnh tranh',
      desc: 'Cam kết mức giá hợp lý nhất thị trường đi kèm quà tặng và gói vệ sinh máy 2 năm miễn phí.',
    },
  ],
  address: '179 Nơ Trang Long, Phường Bình Thạnh, TP.HCM',
  hotline: '0777908179',
  workingHours: '8h00 - 21h30',
  emailSales: 'sales@nhanphuctech.vn',
  emailSupport: 'support@nhanphuctech.vn',
  updatedBy: 'Hệ thống',
  updatedAt: '02/11/2026',
};

const defaultSurveys: ITSurveyLead[] = [
  {
    id: 'sv-101',
    company: 'Công ty TNHH Thương Mại Dịch Vụ Minh Long',
    contactPerson: 'Anh Tuấn (Trưởng phòng HCNS)',
    phone: '0909334455',
    computerCount: '10-25',
    address: 'Phan Đăng Lưu, Quận Phú Nhuận, TP.HCM',
    notes: 'Cần khảo sát gói Tiêu Chuẩn cho 18 máy tính văn phòng và 1 NAS lưu trữ kế toán.',
    createdAt: 'Hôm nay, 09:30',
    status: 'NEW',
  },
];

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Lỗi đọc dữ liệu storage:', key, e);
  }
  localStorage.setItem(key, JSON.stringify(fallback));
  return JSON.parse(JSON.stringify(fallback));
}

export const useSiteContentStore = defineStore('siteContent', () => {
  const itOutsourcing = ref<ITOutsourcingConfig>(loadFromStorage(IT_STORAGE_KEY, defaultITConfig));
  const newsList = ref<NewsArticle[]>(loadFromStorage(NEWS_STORAGE_KEY, mockNews));
  const aboutPage = ref<AboutPageConfig>(loadFromStorage(ABOUT_STORAGE_KEY, defaultAboutConfig));
  const surveyLeads = ref<ITSurveyLead[]>(loadFromStorage(SURVEY_STORAGE_KEY, defaultSurveys));
  const heroBanners = ref<HeroBannerSlide[]>(loadFromStorage(BANNER_STORAGE_KEY, defaultBanners));
  const flashSale = ref<FlashSaleConfig>(loadFromStorage(FLASH_SALE_STORAGE_KEY, defaultFlashSale));
  const homePromos = ref<HomePromosConfig>(loadFromStorage(HOME_PROMOS_STORAGE_KEY, defaultHomePromos));
  const repairService = ref<RepairServiceConfig>(loadFromStorage(REPAIR_SERVICE_STORAGE_KEY, defaultRepairService));

  const saveFlashSale = (staffName = 'Quản trị viên') => {
    flashSale.value.updatedBy = staffName;
    flashSale.value.updatedAt = new Date().toLocaleString('vi-VN');
    localStorage.setItem(FLASH_SALE_STORAGE_KEY, JSON.stringify(flashSale.value));
  };

  const resetFlashSale = () => {
    flashSale.value = JSON.parse(JSON.stringify(defaultFlashSale));
    localStorage.setItem(FLASH_SALE_STORAGE_KEY, JSON.stringify(flashSale.value));
  };

  const saveHomePromos = () => {
    localStorage.setItem(HOME_PROMOS_STORAGE_KEY, JSON.stringify(homePromos.value));
  };

  const resetHomePromos = () => {
    homePromos.value = JSON.parse(JSON.stringify(defaultHomePromos));
    localStorage.setItem(HOME_PROMOS_STORAGE_KEY, JSON.stringify(homePromos.value));
  };

  const saveRepairService = (staffName = 'Quản trị viên') => {
    repairService.value.updatedBy = staffName;
    repairService.value.updatedAt = new Date().toLocaleString('vi-VN');
    localStorage.setItem(REPAIR_SERVICE_STORAGE_KEY, JSON.stringify(repairService.value));
  };

  const resetRepairService = () => {
    repairService.value = JSON.parse(JSON.stringify(defaultRepairService));
    localStorage.setItem(REPAIR_SERVICE_STORAGE_KEY, JSON.stringify(repairService.value));
  };

  const saveBanners = () => {
    localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(heroBanners.value));
  };

  const addBanner = (slide: Omit<HeroBannerSlide, 'id'>) => {
    heroBanners.value.push({ ...slide, id: 'bn-' + Date.now() });
    saveBanners();
  };

  const updateBanner = (id: string, payload: Partial<HeroBannerSlide>) => {
    const idx = heroBanners.value.findIndex((b) => b.id === id);
    if (idx !== -1) {
      heroBanners.value[idx] = { ...heroBanners.value[idx], ...payload } as HeroBannerSlide;
      saveBanners();
    }
  };

  const deleteBanner = (id: string) => {
    heroBanners.value = heroBanners.value.filter((b) => b.id !== id);
    saveBanners();
  };

  const moveBanner = (id: string, direction: -1 | 1) => {
    const idx = heroBanners.value.findIndex((b) => b.id === id);
    const target = idx + direction;
    if (idx === -1 || target < 0 || target >= heroBanners.value.length) return;
    const list = [...heroBanners.value];
    [list[idx], list[target]] = [list[target]!, list[idx]!];
    heroBanners.value = list;
    saveBanners();
  };

  const resetBanners = () => {
    heroBanners.value = JSON.parse(JSON.stringify(defaultBanners));
    saveBanners();
  };

  const saveITOutsourcing = (staffName = 'Quản trị viên') => {
    itOutsourcing.value.updatedBy = staffName;
    itOutsourcing.value.updatedAt = new Date().toLocaleString('vi-VN');
    localStorage.setItem(IT_STORAGE_KEY, JSON.stringify(itOutsourcing.value));
  };

  const resetITOutsourcing = () => {
    itOutsourcing.value = JSON.parse(JSON.stringify(defaultITConfig));
    localStorage.setItem(IT_STORAGE_KEY, JSON.stringify(itOutsourcing.value));
  };

  const addSurveyLead = (lead: Omit<ITSurveyLead, 'id' | 'createdAt' | 'status'>) => {
    surveyLeads.value.unshift({
      ...lead,
      id: 'sv-' + String(Date.now()).slice(-4),
      createdAt: new Date().toLocaleString('vi-VN'),
      status: 'NEW',
    });
    localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(surveyLeads.value));
  };

  const saveSurveyLeads = () => {
    localStorage.setItem(SURVEY_STORAGE_KEY, JSON.stringify(surveyLeads.value));
  };

  const saveNewsList = () => {
    localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(newsList.value));
  };

  const addNewsArticle = (article: Omit<NewsArticle, 'id'>) => {
    newsList.value.unshift({
      ...article,
      id: 'news-' + Date.now(),
    });
    saveNewsList();
  };

  const updateNewsArticle = (id: string, payload: Partial<NewsArticle>) => {
    const idx = newsList.value.findIndex((n) => n.id === id);
    if (idx !== -1) {
      newsList.value[idx] = { ...newsList.value[idx], ...payload } as NewsArticle;
      saveNewsList();
    }
  };

  const deleteNewsArticle = (id: string) => {
    newsList.value = newsList.value.filter((n) => n.id !== id);
    saveNewsList();
  };

  const saveAboutPage = (staffName = 'Quản trị viên') => {
    aboutPage.value.updatedBy = staffName;
    aboutPage.value.updatedAt = new Date().toLocaleString('vi-VN');
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(aboutPage.value));
  };

  const resetAboutPage = () => {
    aboutPage.value = JSON.parse(JSON.stringify(defaultAboutConfig));
    localStorage.setItem(ABOUT_STORAGE_KEY, JSON.stringify(aboutPage.value));
  };

  return {
    itOutsourcing,
    newsList,
    aboutPage,
    surveyLeads,
    saveITOutsourcing,
    resetITOutsourcing,
    addSurveyLead,
    saveSurveyLeads,
    saveNewsList,
    addNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    saveAboutPage,
    resetAboutPage,
    heroBanners,
    saveBanners,
    addBanner,
    updateBanner,
    deleteBanner,
    moveBanner,
    resetBanners,
    flashSale,
    saveFlashSale,
    resetFlashSale,
    homePromos,
    saveHomePromos,
    resetHomePromos,
    repairService,
    saveRepairService,
    resetRepairService,
  };
});

