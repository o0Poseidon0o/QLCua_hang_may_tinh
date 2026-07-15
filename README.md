# Hệ thống Quản lý và Website Thương mại Điện tử Cửa hàng Máy tính

Hệ thống quản lý toàn diện (ERP) và website cung cấp dịch vụ, bán hàng cho cửa hàng máy tính. Dự án được thiết kế để dễ dàng mở rộng và di dời máy chủ bằng Docker.

## 🛠 Công nghệ sử dụng (Tech Stack)

- **Frontend:** Vue.js (TypeScript)
- **Backend:** Node.js (Express / NestJS)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Infrastructure:** Docker & Docker Compose

## 📑 Các phân hệ chính (Modules)

1. **Hệ thống Quản trị (Admin / ERP):**
   - **Quản lý hệ thống:** Phân quyền và quản lý người dùng.
   - **CRM:** Quản lý danh sách khách hàng.
   - **Inventory:** Quản lý kho hàng (Nhập, xuất, tồn).
   - **CMS (Content Management System):** Quản lý toàn bộ trang web (thêm/sửa trang, thay đổi nội dung, cập nhật hình ảnh, SEO).
   
2. **Cửa hàng trực tuyến (E-commerce):**
   - Danh mục, trang chi tiết linh kiện máy tính, PC, Laptop.
   - Giỏ hàng, Đặt hàng.

3. **Dịch vụ (Services):**
   - Trang dịch vụ sửa chữa PC, Laptop (Nhận thông tin, tra cứu tình trạng sửa chữa).
   - Trang dịch vụ IT Outsourcing cho doanh nghiệp.

4. **Mở rộng tương lai:** Hệ thống được thiết kế theo hướng dễ dàng scale để thêm các mảng mới sau này.

## 📂 Cấu trúc thư mục (Project Structure)

Dự án được tổ chức theo dạng Monorepo, tách biệt rõ ràng Frontend và Backend, gói gọn bằng Docker ở thư mục gốc.

```text
.
├── backend/                # Source code Node.js
│   ├── prisma/             # Prisma schema & migrations (Cấu trúc Database)
│   ├── src/                # Code logic backend
│   │   ├── controllers/    
│   │   ├── services/       
│   │   ├── routes/         
│   │   └── middlewares/    
│   ├── Dockerfile          # Cấu hình Docker cho Backend
│   └── package.json
├── frontend/               # Source code Vue.js Web App
│   ├── src/
│   │   ├── assets/         # Tài nguyên tĩnh (Hình ảnh, global CSS)
│   │   ├── components/     # Các thành phần giao diện dùng chung
│   │   ├── views/          # Các trang cụ thể (Admin, Home, Store...)
│   │   ├── router/         # Khai báo đường dẫn trang
│   │   ├── store/          # Quản lý trạng thái (Pinia/Vuex)
│   │   └── api/            # Hàm gọi API xuống Backend
│   ├── Dockerfile          # Cấu hình Docker cho Frontend
│   └── package.json
├── docker-compose.yml      # File cấu hình chạy toàn bộ hệ thống bằng Docker
├── .env.example            # Biến môi trường mẫu
└── README.md
```

## 🔄 Quy trình phát triển (Workflow)

Để đảm bảo hệ thống phát triển tốt và dễ quản lý, quy trình thực hiện theo các bước sau:

**Giai đoạn 1: Chuẩn bị Môi trường và Database**
1. Setup bộ khung source code (Frontend: Vue, Backend: Node).
2. Viết file `docker-compose.yml` định nghĩa các container: PostgreSQL, Backend, Frontend.
3. Thiết kế Schema Database cơ bản trong `prisma/schema.prisma` (User, Product, Inventory, PageContent).
4. Khởi tạo Database thông qua Prisma Migrations.

**Giai đoạn 2: Xây dựng Core & Phân hệ Admin (ERP)**
1. Backend: Dựng các API CRUD cơ bản, hệ thống xác thực (Authentication).
2. Frontend: Dựng layout Admin, các trang quản lý Content (CMS) để có công cụ tự cập nhật nội dung cho toàn bộ website sau này.
3. Hoàn thiện các module Quản lý kho, Khách hàng.

**Giai đoạn 3: Xây dựng Website Khách hàng (User-facing)**
1. Ghép nối API CMS để hiển thị nội dung động lên trang chủ, trang giới thiệu.
2. Dựng trang Cửa hàng linh kiện (Hiển thị sản phẩm từ Kho).
3. Dựng các trang Dịch vụ: Sửa chữa và IT Outsourcing.

## 🐳 Hướng dẫn triển khai với Docker (Deployment)

Vì hệ thống được cấu hình hoàn toàn bằng Docker, bạn có thể dễ dàng chuyển source code đi bất kỳ server nào và khởi chạy theo các bước:

**Bước 1: Chuẩn bị**
Clone mã nguồn về máy chủ và copy file biến môi trường:
```bash
cp .env.example .env
# Cập nhật thông tin DB, PORT trong file .env
```

**Bước 2: Khởi động hệ thống**
Chạy lệnh sau tại thư mục gốc của dự án:
```bash
docker-compose up -d --build
```
Hệ thống sẽ tự động pull Postgres, build Backend, Frontend và chạy ngầm.

**Bước 3: Khởi tạo dữ liệu (Chạy lần đầu)**
Sau khi DB đã chạy, tiến hành tạo bảng và đẩy dữ liệu mẫu:
```bash
docker-compose exec backend npx prisma migrate deploy
# Hoặc seed data nếu cần
```

**Bước 4: Sử dụng**
Truy cập vào các port đã config trong file `docker-compose.yml` (ví dụ: `http://localhost:3000`). Nếu đổi máy chủ, chỉ cần mang source code và file DB backup qua, cấu hình lại `.env` và chạy lại `docker-compose up -d`.

---

*Đây là tài liệu khởi tạo dự án. README sẽ được cập nhật liên tục trong quá trình phát triển.*
