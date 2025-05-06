# Hướng Dẫn Chạy Backend

Chào mừng bạn đến với dự án! Dưới đây là các bước để thiết lập và chạy backend.

## Bước 1: Thêm file `.env`

Trước tiên, hãy tạo một file `.env` trong thư mục gốc của dự án với nội dung được gửi kèm qua gmail:

## Bước 2: Cài đặt các gói cần thiết

Mở terminal và chạy lệnh:

```bash
npm install
```

## Bước 3: Chạy Docker

Sau khi cài đặt xong, bạn có thể khởi động các dịch vụ Docker bằng lệnh sau:

```bash
docker-compose up --build -d
```

## Tài Khoản Mặc Định

Sau khi khởi động thành công, ta khởi chạy các project admin-frontend và client-frontend với các tài khoản sau:

- **Tài khoản Admin**:

  - Email: `admin@example.com`
  - Mật khẩu: `admin`

- **Tài khoản Editor**:

  - Email: `editor@example.com`
  - Mật khẩu: `editor`

- **Tài khoản Client**:
  - Email: `client@example.com`
  - Mật khẩu: `client`
