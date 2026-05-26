# Final Test — Quản lý thông tin giáo viên

**Học viên:** Đặng Nguyễn Minh Hoàng  
**Stack:** MongoDB + Express + React (Vite) + Node.js  
**UI:** Ant Design  
**Upload ảnh:** Cloudinary



## 1. Cài đặt MongoDB & import mock data

1. Khởi động MongoDB.
2. Tạo database `school` và import 3 file trong thư mục `mock-data/`:


## 2. Backend

1. Tạo file `backend/.env`:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/school
CLOUDINARY_CLOUD_NAME=de5hbbmqa
CLOUDINARY_API_KEY=554553652615785
CLOUDINARY_API_SECRET=VVquXDYBfffIolDvBSLFEvJAbm8
```

2. Chạy:

```bash
cd backend
npm install
npm run dev
```

Server: `http://localhost:5000`

### API

| Method | Endpoint | Mô tả |
|--------|----------|--------|
| GET | `/teachers?page=1&limit=10` | Danh sách GV + phân trang |
| POST | `/teachers` | Tạo GV (multipart, field `avatar`) |
| GET | `/teacher-positions` | Danh sách vị trí công tác |
| POST | `/teacher-positions` | Tạo vị trí công tác |

## 3. Frontend

```bash
cd frontend
npm install
npm run dev
```







