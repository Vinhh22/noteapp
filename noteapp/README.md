# 📝 NoteApp — Hướng dẫn chạy

## Cấu trúc thư mục

```
noteapp/
├── backend/
│   ├── models/
│   │   └── Note.js          ← Mongoose Schema
│   ├── routes/
│   │   └── notes.js         ← API Routes (GET & POST /api/notes)
│   ├── .env                 ← Cấu hình PORT và MONGO_URI
│   ├── server.js            ← Entry point Express
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── index.js         ← React entry point
    │   └── NoteApp.jsx      ← Component chính
    └── package.json
```

---

## Yêu cầu cài đặt

- [Node.js v18+](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/try/download/community) đang chạy ở local (hoặc dùng MongoDB Atlas)

---

## Cách chạy

### 1. Chạy Backend

```bash
cd backend
npm install
npm run dev       # hoặc: npm start
```

> Server chạy tại: http://localhost:5000

### 2. Chạy Frontend

```bash
cd frontend
npm install
npm start
```

> Giao diện chạy tại: http://localhost:3000

---

## API Endpoints

| Method | URL           | Mô tả                                      |
|--------|---------------|--------------------------------------------|
| GET    | /api/notes    | Lấy tất cả ghi chú (mới nhất lên đầu)    |
| POST   | /api/notes    | Tạo ghi chú mới (body: title, content)   |

### Ví dụ POST body:
```json
{
  "title": "Tiêu đề ghi chú",
  "content": "Nội dung ghi chú..."
}
```

