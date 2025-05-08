# Backend Service README

**Demo URL**: [http://minhnguyen28.workspace.opstech.org:8082](http://minhnguyen28.workspace.opstech.org:8080)

## Giới thiệu

Đây là dịch vụ backend của dự án Intern. Nó cung cấp API cho frontend, kết nối tới MongoDB và Redis để lưu trữ và cache dữ liệu.

## Mục lục

- [Yêu cầu](#yêu-cầu)
- [Các biến môi trường](#các-biến-môi-trường)
- [Cài đặt và chạy trên máy local](#cài-đặt-và-chạy-trên-máy-local)

  - [1. Clone repository](#1-clone-repository)
  - [2. Tạo file `.env`](#2-tạo-file-env)
  - [3. Khởi động MongoDB và Redis](#3-khởi-động-mongodb-và-redis)
  - [4. Cài đặt dependencies và seed dữ liệu](#4-cài-đặt-dependencies-và-seed-dữ-liệu)
  - [5. Chạy ứng dụng](#5-chạy-ứng-dụng)

- [Chạy bằng Docker Compose](#chạy-bằng-docker-compose)
- [Các lệnh thường dùng](#các-lệnh-thường-dùng)
- [Tài khoản mặc định](#tài-khoản-mặc-định)
- [License](#license)

## Yêu cầu

- Node.js v20+
- npm
- Docker (nếu sử dụng Docker Compose)

## Các biến môi trường

Tất cả các biến môi trường nằm trong file `.env` ở thư mục gốc. Ví dụ:

```dotenv
# Database
MONGODB_URI=mongodb://localhost:27017/intern-db
SEED=true

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=superSecretKey
JWT_EXPIRES_IN=3600s

# AWS S3 (nếu cần)
AWS_REGION=us-east-1
AWS_S3_BUCKET=intern-app-media-storage
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...

# App
PORT=8080
```

## Chạy ứng dụng bằng Docker Compose

Chỉ với Docker Compose, bạn có thể khởi động toàn bộ stack (backend, MongoDB, Redis) bằng các bước sau:

1. Đảm bảo có file `.env` trong thư mục gốc chứa các biến môi trường.
2. Tạo file `docker-compose.yml` với nội dung:

   ```yaml
   version: '3.8'

   services:
     backend:
       build:
         context: .
         dockerfile: Dockerfile
       ports:
         - '8080:8080'
       env_file:
         - ./.env
       depends_on:
         - mongo
         - redis

     mongo:
       image: mongo:6
       restart: always
       ports:
         - '27017:27017'
       volumes:
         - mongo-data:/data/db

     redis:
       image: redis:7-alpine
       restart: always
       ports:
         - '6379:6379'

   volumes:
     mongo-data:
   ```

3. Chạy lệnh:

   ```bash
   docker-compose up --build -d
   ```

Backend sẽ tự động tải biến môi trường và khởi động dịch vụ.

## Các lệnh thường dùng

- `npm run start` - Chạy server
- `npm run start:dev` - Chạy server trong chế độ phát triển với Nest CLI
- `npm run test` - Chạy test
- `npm run seed` - Seed dữ liệu mẫu
- `docker-compose up -d` - Khởi động các container trong nền
- `docker-compose down` - Dừng và xóa các container

## Tài khoản mặc định

- **Admin**

  - Email: `admin@example.com`
  - Mật khẩu: `admin`

- **Editor**

  - Email: `editor@example.com`
  - Mật khẩu: `editor`

- **Client**

  - Email: `client@example.com`
  - Mật khẩu: `client`
