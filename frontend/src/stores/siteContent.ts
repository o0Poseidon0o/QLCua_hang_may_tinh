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
  };
});

