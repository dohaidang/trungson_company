# website e-commerce Vật Liệu Xây Dựng - Trung Sơn Company 🏗️

Đây là mã nguồn hệ thống thương mại điện tử chuyên dụng cho **Vật Liệu Xây Dựng** của Trung Sơn Company. Được xây dựng trên nền tảng **Next.js 15**, hệ thống mang đến hiệu suất tối đa, trải nghiệm người dùng hiện đại cùng một công cụ quản trị (Admin Dashboard) mạnh mẽ và bảo mật.

## 🚀 Công Nghệ Sử Dụng

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Ngôn ngữ**: TypeScript 
- **Giao diện & UI**: Tailwind CSS v4, Lucide React (Icons)
- **Database ORM**: Prisma ORM
- **Database Engine**: Mặc định SQLite (Có thể cấu hình sang PostgreSQL/MySQL qua Prisma)
- **Xác thực**: NextAuth.js (Provider: Credentials)
- **Bảo mật**: `bcryptjs` (Hash mật khẩu)

## 🌟 Các Tính Năng Nổi Bật

### 1. Giao Diện Người Dùng (Client / Customer)
- **Khám phá sản phẩm**: Danh sách sản phẩm tối ưu hình ảnh, hiển thị giá theo chiết khấu số lượng tự động.
- **Biểu mẫu Liên hệ (Contact Form)**: Cho phép khách hàng điền các thông tin tư vấn theo loại dự án, khối lượng ước tính và gửi thông báo theo thời gian thực về Admin.
- **Thanh tìm kiếm và danh mục**: Tìm kiếm sản phẩm tiện dụng được tích hợp thẳng vào Header.
- **User Dashboard**: Trang quản lý tài khoản và theo dõi đơn hàng dành riêng cho người dùng.

### 2. Quản Trị Hệ Thống (Admin Dashboard)
Chỉ các tài khoản được cấp quyền Role `ADMIN` mới được phép truy cập `/admin`.
- **Tổng quan Thống kê**: Báo cáo tổng đơn hàng, doanh thu, thành viên, và thông báo thời gian thực về liên hệ mới hay vận đơn.
- **Quản lý Đơn hàng**: Thay đổi trạng thái (`PENDING`, `DELIVERING`, `COMPLETED`...) cũng như duyệt từng đơn.
- **Quản lý Sản phẩm Advanced**: 
  - Hỗ trợ thêm/sửa/xóa sản phẩm.
  - Bảng giá bán sỉ cấu hình theo nhiều Tiers (Mức Giá).
  - Lọc động (Dynamic Filters) sản phẩm theo: Loại, Tồn kho (Chưa bán/Hết hàng), Khẩu độ giá, Ứng dụng thi công v.v.
- **Quản lý Người dùng**: Thay đổi thông tin, thiết lập vai trò (Customer/Contractor/Admin), Hạn mức chi tiêu và Xem lịch sử mua.
- **Theo dõi Liên hệ Khách hàng**: 
  - Đọc và xử lý các tin nhắn từ người dùng thông qua form Contact.
  - Tính năng "Tự động đánh dấu là đã đọc", và bộ lọc theo Ngày Tháng Năm cực tiện dụng.
  - Thông báo Red Badge Alert ngay trên góc Màn hình.

## 🛠️ Cài Đặt Khởi Chạy Môi Trường Local

Clone dự án về máy, sau đó tiến hành chạy các lệnh sau trong thư mục Terminal:

```sh
# 1. Cài đặt các modules phụ thuộc
npm install   # hoặc pnpm install

# 2. Khởi tạo Database (Trường hợp chưa có file SQLite SQLite DB)
npx prisma generate
npx prisma db push

# 3. Tạo dữ liệu mẫu (Sản phẩm demo, Tài khoản Admin demo)
npm run seed  # Admin: admin@trungson.vn / Mật khẩu: password123

# 4. Chạy môi trường Development
npm run dev
```

Tiếp theo, hãy mở trình duyệt truy cập địa chỉ [http://localhost:3000](http://localhost:3000).

---

> Trung Sơn Company - Uy Tín Tạo Dựng Công Trình 🏗️ 
