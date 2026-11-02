export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export const mockNews: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'danh-gia-card-man-hinh-rtx-4070-super',
    title: 'Đánh Giá Chi Tiết Card Màn Hình RTX 4070 Super: Hiệu Năng Vượt Trội Cho Game 2K',
    category: 'Đánh Giá Linh Kiện',
    author: 'Kỹ Thuật Nhân Phúc Tech',
    date: '05/09/2026',
    readTime: '6 phút đọc',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
    excerpt: 'RTX 4070 Super mang đến bước nhảy vọt về số nhân CUDA và băng thông bộ nhớ, sẵn sàng làm chủ mọi tựa game AAA ở độ phân giải 2K max settings.',
    content: `
      <p>NVIDIA GeForce RTX 4070 Super là một trong những chiếc card đồ họa đáng mua nhất trong dòng sản phẩm Ada Lovelace. Với mức giá hợp lý nhưng hiệu năng tiệm cận RTX 4070 Ti, đây là sự lựa chọn hoàn hảo cho game thủ mong muốn trải nghiệm độ phân giải 1440p (2K) với tốc độ khung hình cao.</p>
      
      <h3>1. Thông số kỹ thuật ấn tượng</h3>
      <p>RTX 4070 Super được trang bị 7.168 nhân CUDA, tăng gần 22% so với phiên bản RTX 4070 tiêu chuẩn (5.888 nhân). Dung lượng bộ nhớ 12GB GDDR6X trên bus 192-bit kết hợp với bộ nhớ đệm L2 Cache lên đến 48MB giúp giảm tải áp lực băng thông khi render cảnh phức tạp.</p>

      <h3>2. Hiệu năng chiến game thực tế</h3>
      <p>Thử nghiệm tại phòng lab của Nhân Phúc Tech trên cấu hình Intel Core i5 13400F và 32GB RAM DDR5:</p>
      <ul>
        <li><strong>Cyberpunk 2077 (2K Ray Tracing Ultra, DLSS 3 Quality):</strong> Đạt mức trung bình 95 FPS cực kỳ mượt mà.</li>
        <li><strong>Black Myth: Wukong (2K Cinematic Settings):</strong> Đạt ổn định 85-90 FPS.</li>
        <li><strong>Valorant / CS2:</strong> 400+ FPS không giật lag.</li>
      </ul>

      <h3>3. Khả năng tản nhiệt và tiêu thụ điện</h3>
      <p>Với TDP chỉ 220W, card hoạt động rất mát mẻ, nhiệt độ phòng máy lạnh chỉ dao động từ 62 - 68 độ C trong bài test FurMark tải nặng liên tục 30 phút. Khách hàng tại Nhân Phúc Tech khi mua kèm cấu hình PC Gaming sẽ được tặng kèm giá đỡ VGA chống xệ cao cấp.</p>
    `
  },
  {
    id: 'news-2',
    slug: 'top-5-cau-hinh-pc-gaming-duoi-15-trieu',
    title: 'Top 5 Cấu Hình PC Gaming Dưới 15 Triệu Bán Chạy Nhất Quý 3/2026 Tại Nhân Phúc Tech',
    category: 'Tư Vấn Cấu Hình',
    author: 'Admin Nhân Phúc Tech',
    date: '02/09/2026',
    readTime: '5 phút đọc',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&q=80',
    excerpt: 'Tổng hợp các dàn PC cân mượt Liên Minh, FIFA, CS2, Valorant và GTA V với mức giá học sinh - sinh viên cực kỳ hợp lý.',
    content: `
      <p>Với ngân sách từ 9 đến 15 triệu đồng, game thủ và học sinh sinh viên hoàn toàn có thể sở hữu một bộ PC Gaming thế hệ mới linh kiện chính hãng 100%, bảo hành 36 tháng tận nơi.</p>
      
      <h3>1. PC Gaming Nhân Phúc Starter (Giá ~9.890.000 đ)</h3>
      <p>Cấu hình: Intel Core i3 12100F, Main H610M, RAM 16GB DDR4, Card màn hình GTX 1650 4GB, SSD 256GB NVMe, Nguồn 500W. Phù hợp chơi mượt mọi game Esport, học tập và làm việc văn phòng mượt mà.</p>

      <h3>2. PC Gaming Nhân Phúc Dragon Valorant (Giá ~14.500.000 đ)</h3>
      <p>Cấu hình: AMD Ryzen 5 5600, Main B550M, RAM 16GB RGB, Card màn hình RTX 3050 6GB / RX 6600 8GB, SSD 500GB NVMe. Cân mượt các game nhập vai thế giới mở như Genshin Impact, GTA V và bắn súng FPS 200+ FPS.</p>

      <p>Tất cả dàn máy lắp ráp tại Nhân Phúc Tech đều được miễn phí công lắp đặt, cài đặt Windows và phần mềm cơ bản, cùng gói bảo dưỡng vệ sinh máy tính 2 năm miễn phí tại cửa hàng 179 Nơ Trang Long, Bình Thạnh.</p>
    `
  },
  {
    id: 'news-3',
    slug: 'huong-dan-ve-sinh-may-tinh-tai-nha',
    title: 'Hướng Dẫn Vệ Sinh Máy Tính & Tra Keo Tản Nhiệt Đúng Cách Tại Nhà',
    category: 'Thủ Thuật Máy Tính',
    author: 'Kỹ Thuật Nhân Phúc Tech',
    date: '28/08/2026',
    readTime: '4 phút đọc',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
    excerpt: 'Hạ nhiệt độ CPU và VGA từ 10 - 15 độ C chỉ với các bước vệ sinh đơn giản, giúp tăng tuổi thọ và độ bền cho máy tính.',
    content: `
      <p>Sau từ 6 đến 12 tháng sử dụng, bụi bẩn sẽ tích tụ dày đặc trên quạt tản nhiệt và keo tản nhiệt CPU bị khô cứng, khiến máy tính chạy chậm, quạt kêu to hoặc tự sập nguồn do quá nhiệt.</p>

      <h3>Các bước thực hiện chuẩn kỹ thuật:</h3>
      <ol>
        <li><strong>Ngắt nguồn điện hoàn toàn:</strong> Rút dây nguồn, nhấn nút nguồn 2-3 lần để xả sạch điện tích dư trong tụ điện bo mạch.</li>
        <li><strong>Tháo quạt tản nhiệt CPU:</strong> Nhẹ nhàng tháo chốt hoặc ốc vít chéo cánh bướm, xoay nhẹ tản nhiệt để tách lớp keo khô mà không làm cong chân CPU.</li>
        <li><strong>Lau sạch lớp keo tản nhiệt cũ:</strong> Dùng khăn mềm tẩm cồn Isopropyl 90 độ lau sạch bề mặt nắp CPU và đáy tản nhiệt.</li>
        <li><strong>Thoa keo tản nhiệt mới:</strong> Chấm một lượng keo bằng hạt đậu nhỏ (chọn loại keo xịn như Arctic MX-4, Noctua NT-H1 hoặc Thermal Grizzly) ngay giữa tâm CPU.</li>
        <li><strong>Vệ sinh quạt và khe gió:</strong> Dùng bóng thổi bụi hoặc bình xịt khí nén làm sạch cánh quạt và khe tản nhiệt của VGA, case.</li>
      </ol>

      <p>Nếu bạn không tự tin thao tác tại nhà, hãy mang máy qua Nhân Phúc Tech tại 179 Nơ Trang Long để được vệ sinh chuyên sâu lấy ngay chỉ 99k!</p>
    `
  },
  {
    id: 'news-4',
    slug: 'giai-phap-bao-mat-mang-cho-doanh-nghiep-nho',
    title: 'Giải Pháp Bảo Mật Mạng & Phòng Chống Ransomware Cho Doanh Nghiệp Vừa Và Nhỏ',
    category: 'IT Outsourcing',
    author: 'Chuyên Gia IT Nhân Phúc Tech',
    date: '20/08/2026',
    readTime: '7 phút đọc',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    excerpt: 'Ngăn chặn nguy cơ mã hóa toàn bộ máy chủ dữ liệu kế toán với quy tắc sao lưu 3-2-1 và tường lửa chuyên dụng.',
    content: `
      <p>Mã độc tống tiền (Ransomware) đang là cơn ác mộng lớn nhất của các doanh nghiệp vừa và nhỏ tại Việt Nam. Khi bị tấn công, toàn bộ file Excel kế toán, hóa đơn và hợp đồng sẽ bị mã hóa đòi tiền chuộc hàng trăm triệu đồng.</p>

      <h3>1. Áp dụng quy tắc sao lưu dữ liệu 3-2-1</h3>
      <ul>
        <li>Lưu giữ ít nhất <strong>3 bản sao</strong> của dữ liệu.</li>
        <li>Lưu trên <strong>2 loại phương tiện</strong> lưu trữ khác nhau (ví dụ: ổ cứng mạng NAS và đám mây Cloud).</li>
        <li>Có ít nhất <strong>1 bản sao lưu ngoại vi</strong> (Off-site backup) ngắt kết nối hoàn toàn với mạng nội bộ.</li>
      </ul>

      <h3>2. Triển khai tường lửa (Firewall) và phân quyền chặt chẽ</h3>
      <p>Không dùng router wifi gia đình cho môi trường công ty. Hãy trang bị thiết bị Gateway quản lý băng thông và chặn các đường link lừa đảo phishing. Nhân Phúc Tech hiện cung cấp dịch vụ IT Outsourcing trọn gói kiểm tra an ninh mạng và bảo dưỡng định kỳ hàng tháng cho doanh nghiệp.</p>
    `
  }
];
