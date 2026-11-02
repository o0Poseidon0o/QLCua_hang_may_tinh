import axios from 'axios';

const defaultCmsPages = [
  {
    id: 'cms-1',
    title: 'Chính Sách Bảo Hành Nhân Phúc Tech',
    slug: 'chinh-sach-bao-hanh',
    isMenuItem: false,
    updatedAt: '02/11/2026',
    excerpt: 'Cam kết bảo hành chính hãng nhanh chóng, minh bạch 1 đổi 1 trong 30 ngày đầu tại Nhân Phúc Tech.',
    coverImage: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=1200&q=80',
    content: `
      <h3>1. Điều kiện bảo hành miễn phí</h3>
      <p>Tất cả sản phẩm Laptop, PC Gaming, Linh kiện vi tính mua tại <strong>Nhân Phúc Tech</strong> đều được bảo hành chính hãng theo tiêu chuẩn của nhà sản xuất (từ 12 đến 36 tháng):</p>
      <ul>
        <li>Sản phẩm còn trong thời hạn bảo hành (tính từ ngày xuất hóa đơn hoặc kích hoạt serial điện tử).</li>
        <li>Tem bảo hành của Nhân Phúc Tech và nhà phân phối còn nguyên vẹn, không rách rời hay tẩy xóa.</li>
        <li>Hư hỏng được xác định do lỗi kỹ thuật của nhà sản xuất.</li>
      </ul>
      <h3>2. Chính sách 1 đổi 1 trong 30 ngày đầu</h3>
      <p>Nếu sản phẩm phát sinh lỗi phần cứng từ nhà sản xuất trong 30 ngày đầu sử dụng, quý khách được đổi ngay sản phẩm mới 100% tương đương mà không mất thời gian chờ đợi.</p>
      <h3>3. Địa điểm tiếp nhận bảo hành</h3>
      <p>Showroom & Trung tâm bảo hành Nhân Phúc Tech: <strong>179 Nơ Trang Long, P.Bình Thạnh, TP.HCM</strong> — Hotline: <strong>0777908179</strong>.</p>
    `
  },
  {
    id: 'cms-2',
    title: 'Chính Sách Đổi Trả Trong 7 Ngày',
    slug: 'chinh-sach-doi-tra',
    isMenuItem: false,
    updatedAt: '02/11/2026',
    excerpt: 'Hỗ trợ đổi sang sản phẩm khác hoặc nâng cấp cấu hình linh hoạt trong vòng 7 ngày đầu tiên.',
    coverImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=1200&q=80',
    content: `
      <h3>1. Phạm vi áp dụng</h3>
      <p>Khách hàng mua sắm trực tiếp tại cửa hàng hoặc đặt hàng online tại <strong>Nhân Phúc Tech</strong> có nhu cầu nâng cấp cấu hình cao hơn hoặc đổi sang dòng máy phù hợp hơn trong vòng 7 ngày kể từ ngày nhận hàng.</p>
      <h3>2. Điều kiện sản phẩm đổi trả</h3>
      <ul>
        <li>Sản phẩm không bị trầy xước, móp méo, rơi vỡ hay vào nước.</li>
        <li>Đầy đủ vỏ hộp, sách hướng dẫn, cáp sạc và quà tặng đi kèm ban đầu.</li>
      </ul>
    `
  },
  {
    id: 'cms-3',
    title: 'Chính Sách Giao Hàng Siêu Tốc 2H',
    slug: 'chinh-sach-giao-hang',
    isMenuItem: false,
    updatedAt: '02/11/2026',
    excerpt: 'Giao hàng miễn phí tận nơi siêu tốc trong 2 giờ tại nội thành TP.HCM và vận chuyển toàn quốc.',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
    content: `
      <h3>1. Giao hàng nội thành TP.HCM</h3>
      <p><strong>Nhân Phúc Tech</strong> hỗ trợ giao hàng hỏa tốc trong vòng 2 giờ đối với các đơn hàng Laptop, PC Gaming và Linh kiện tại khu vực nội thành TP.HCM. Kỹ thuật viên hỗ trợ lắp đặt tận nơi theo yêu cầu.</p>
      <h3>2. Giao hàng toàn quốc (COD)</h3>
      <p>Đơn hàng tỉnh được đóng gói chống sốc 3 lớp kèm bảo hiểm hàng hóa 100%. Quý khách được đồng kiểm cùng bưu tá trước khi thanh toán.</p>
    `
  },
  {
    id: 'cms-4',
    title: 'Hướng Dẫn Mua Trả Góp 0% Lãi Suất',
    slug: 'huong-dan-tra-gop',
    isMenuItem: false,
    updatedAt: '02/11/2026',
    excerpt: 'Sở hữu ngay PC Gaming & Laptop mơ ước với thủ tục trả góp 0% qua thẻ tín dụng hoặc CCCD.',
    coverImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&q=80',
    content: `
      <h3>1. Trả góp 0% qua Thẻ Tín Dụng (Credit Card)</h3>
      <p>Hỗ trợ hơn 25 ngân hàng tại Việt Nam (Vietcombank, Techcombank, VPBank, ACB, Sacombank, VIB, HSBC...). Kỳ hạn linh hoạt 3, 6, 9, 12 tháng, không cần trả trước, duyệt ngay trong 3 phút.</p>
      <h3>2. Trả góp qua CCCD gắn chip</h3>
      <p>Chỉ cần Căn cước công dân (từ 18 tuổi), duyệt hồ sơ nhanh chóng trong 15 phút tại cửa hàng Nhân Phúc Tech (179 Nơ Trang Long, Bình Thạnh).</p>
    `
  },
  {
    id: 'cms-5',
    title: 'Quy Định & Hình Thức Thanh Toán',
    slug: 'quy-dinh-thanh-toan',
    isMenuItem: false,
    updatedAt: '02/11/2026',
    excerpt: 'Đa dạng phương thức thanh toán: Tiền mặt, Chuyển khoản VietQR, Quẹt thẻ Visa/MasterCard và COD.',
    coverImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=1200&q=80',
    content: `
      <h3>Các hình thức thanh toán tại Nhân Phúc Tech</h3>
      <ul>
        <li><strong>Thanh toán tiền mặt:</strong> Trực tiếp tại Showroom 179 Nơ Trang Long hoặc khi nhận hàng (COD).</li>
        <li><strong>Chuyển khoản ngân hàng 24/7:</strong> Quét mã VietQR chính xác, tự động xác nhận đơn hàng.</li>
        <li><strong>Thanh toán qua thẻ:</strong> Hỗ trợ quẹt thẻ ATM nội địa, Visa, MasterCard, JCB miễn phí cà thẻ tại cửa hàng.</li>
      </ul>
    `
  }
];

const STORAGE_KEY = 'nhanphuc_cms_pages';

function getLocalPages(): any[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    // ignore storage errors
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCmsPages));
  return [...defaultCmsPages];
}

function saveLocalPages(pages: any[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
  } catch (e) {
    // ignore storage errors
  }
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 2500,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fallback interceptor when running Frontend standalone (e.g. Vercel Demo without Backend/DB)
api.interceptors.request.use((config) => {
  const baseUrl = config.baseURL || '';
  const isLocalhostOnRemote =
    typeof window !== 'undefined' &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1' &&
    (!baseUrl || baseUrl.includes('localhost') || baseUrl.includes('127.0.0.1'));

  if (isLocalhostOnRemote) {
    // Force immediate fallback to local mock adapter without making failing network calls on Vercel
    config.adapter = async (cfg) => handleMockRequest(cfg);
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && (error.config.url || '').startsWith('/content')) {
      return handleMockRequest(error.config);
    }
    return Promise.reject(error);
  }
);

function handleMockRequest(config: any) {
  const url = String(config.url || '');
  const method = String(config.method || 'get').toLowerCase();
  const pages = getLocalPages();

  if (url === '/content' && method === 'get') {
    return Promise.resolve({ data: pages, status: 200, statusText: 'OK', headers: {}, config });
  }

  if (url.startsWith('/content/') && method === 'get') {
    const slug = url.replace('/content/', '');
    const found = pages.find((p) => p.slug === slug) || null;
    return Promise.resolve({ data: found, status: 200, statusText: 'OK', headers: {}, config });
  }

  if (url === '/content' && method === 'post') {
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    const newPage = {
      ...body,
      id: 'cms-' + Date.now(),
      updatedAt: new Date().toLocaleDateString('vi-VN'),
    };
    pages.unshift(newPage);
    saveLocalPages(pages);
    return Promise.resolve({ data: newPage, status: 201, statusText: 'Created', headers: {}, config });
  }

  if (url.startsWith('/content/') && method === 'patch') {
    const slug = url.replace('/content/', '');
    const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
    const idx = pages.findIndex((p) => p.slug === slug);
    if (idx !== -1) {
      pages[idx] = { ...pages[idx], ...body, updatedAt: new Date().toLocaleDateString('vi-VN') };
      saveLocalPages(pages);
      return Promise.resolve({ data: pages[idx], status: 200, statusText: 'OK', headers: {}, config });
    }
  }

  if (url.startsWith('/content/') && method === 'delete') {
    const slug = url.replace('/content/', '');
    const filtered = pages.filter((p) => p.slug !== slug);
    saveLocalPages(filtered);
    return Promise.resolve({ data: { deleted: true }, status: 200, statusText: 'OK', headers: {}, config });
  }

  return Promise.resolve({ data: [], status: 200, statusText: 'OK', headers: {}, config });
}

export default api;
