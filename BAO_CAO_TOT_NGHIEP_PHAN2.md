## CHƯƠNG 2. CÁC CÔNG CỤ HỖ TRỢ XÂY DỰNG WEBSITE

### 2.1 Kiến Trúc MERN Stack

MERN Stack là mô hình phát triển ứng dụng web full-stack sử dụng hoàn toàn ngôn ngữ **JavaScript** ở cả tầng giao diện (Frontend) lẫn tầng xử lý dữ liệu (Backend). MERN là viết tắt của 4 công nghệ nền tảng:

| Ký tự | Công Nghệ | Vai Trò |
|-------|-----------|---------|
| **M** | MongoDB | Cơ sở dữ liệu NoSQL dạng tài liệu (Document-Oriented) |
| **E** | Express.js | Framework server-side xây dựng trên Node.js |
| **R** | React.js | Thư viện JavaScript xây dựng giao diện người dùng |
| **N** | Node.js | Môi trường chạy JavaScript phía máy chủ |

**Ưu điểm của MERN Stack:**
- **Tính nhất quán ngôn ngữ**: Toàn bộ codebase dùng JavaScript/JSON, giảm chi phí chuyển đổi ngữ pháp giữa frontend và backend.
- **Hiệu năng cao**: Node.js với mô hình non-blocking I/O và Event Loop cho phép xử lý hàng nghìn request đồng thời mà không tốn nhiều tài nguyên CPU.
- **Hệ sinh thái npm phong phú**: Hơn 2 triệu thư viện mã nguồn mở sẵn sàng tích hợp qua npm.
- **Phổ biến trong ngành**: Theo Stack Overflow Developer Survey 2024, Node.js và React nằm trong top 5 công nghệ được sử dụng rộng rãi nhất toàn cầu.
- **Phù hợp với dữ liệu JSON**: Dữ liệu thông số kỹ thuật thiết bị (specs) có cấu trúc không đồng đều giữa điện thoại và laptop – MongoDB lưu trữ dạng JSON linh hoạt, không cần schema cứng nhắc như SQL.

#### 2.1.1 MongoDB và Mongoose ODM

**MongoDB** là hệ quản trị cơ sở dữ liệu NoSQL (Not Only SQL) thuộc dạng lưu trữ tài liệu (Document-Oriented). Khác với cơ sở dữ liệu quan hệ truyền thống (MySQL, PostgreSQL), MongoDB lưu trữ dữ liệu theo định dạng **BSON** (Binary JSON), không yêu cầu cấu trúc bảng cố định (schema-less).

**Đặc điểm nổi bật của MongoDB:**
- Lưu trữ dữ liệu dạng Document (tương đương một hàng trong SQL), mỗi document là một JSON object.
- Hỗ trợ dữ liệu lồng nhau (nested documents) – phù hợp để lưu thông số kỹ thuật phức tạp của thiết bị.
- Khả năng mở rộng ngang (horizontal scaling) thông qua Sharding.
- **MongoDB Atlas** cung cấp dịch vụ đám mây với Free Tier 512MB – đủ cho mục đích demo đồ án.

**Tại sao chọn MongoDB cho Better:**
Thông số kỹ thuật của điện thoại thông minh và laptop có cấu trúc rất khác nhau:
- Điện thoại: camera, pin, màn hình OLED, hỗ trợ 5G...
- Laptop: GPU rời, ổ cứng NVMe, cổng kết nối, thời lượng pin (giờ)...

Mô hình document linh hoạt của MongoDB cho phép mỗi sản phẩm lưu đúng các trường cần thiết mà không cần tạo hàng chục cột NULL trong bảng quan hệ như SQL.

**Mongoose** là thư viện ODM (Object Document Mapper) giúp định nghĩa schema và tương tác với MongoDB thông qua mô hình đối tượng JavaScript. Dự án Better sử dụng Mongoose để định nghĩa 4 Schema chính:

```javascript
// models.js - Định nghĩa Mongoose Schema
const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String },
  priceValue: { type: Number },
  image: { type: String },
  category: { type: String },          // "phone" hoặc "laptop"
  specs: { type: mongoose.Schema.Types.Mixed }, // JSON linh hoạt
  youtubeUrl: { type: String },
  isFeatured: { type: Boolean, default: false }
}, { strict: false, timestamps: true });
```

Tùy chọn `strict: false` cho phép lưu trữ các trường không được định nghĩa trong schema (ví dụ: links.shopee, links.tiktok), tăng tính linh hoạt khi mở rộng dữ liệu.

#### 2.1.2 Node.js và Express.js

**Node.js** là môi trường chạy JavaScript phía máy chủ, được xây dựng trên V8 JavaScript Engine của Google Chrome. Điểm đặc biệt của Node.js là mô hình **non-blocking I/O** và **Event Loop** – cho phép xử lý nhiều request đồng thời mà không tạo thread riêng cho mỗi request, tiết kiệm tài nguyên hệ thống đáng kể so với mô hình truyền thống.

**Express.js** là framework web nhẹ và nhanh (minimalist) cho Node.js. Express cung cấp:
- **Routing**: Định tuyến HTTP request đến handler tương ứng.
- **Middleware**: Chuỗi xử lý request trước khi đến route handler (authentication, logging, parsing...).
- **Error Handling**: Xử lý lỗi tập trung.

Trong Better, Express.js được dùng để xây dựng toàn bộ REST API với 14 endpoint:

```javascript
// server.js - Cấu trúc Express App
const app = express();
app.use(cors());          // Cho phép CORS từ frontend Vercel
app.use(express.json());  // Parse body JSON

// Routes
app.post('/api/auth/register', ...);
app.post('/api/auth/login', ...);
app.get('/api/products', ...);
app.post('/api/products', authMiddleware, ...);
// ... 10 endpoint khác
```

**Nguyên tắc REST được áp dụng:**
- Sử dụng đúng HTTP verbs: GET (đọc), POST (tạo/cập nhật), DELETE (xóa).
- URI tài nguyên rõ ràng: `/api/products`, `/api/posts`, `/api/reviews/:productId`.
- HTTP Status Code chuẩn: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 500 (Server Error).

#### 2.1.3 React.js và Vite

**React.js** là thư viện JavaScript do Meta (Facebook) phát triển năm 2013, sử dụng mô hình lập trình dựa trên **Component** (Component-based). Mỗi phần của giao diện (Header, ProductCard, CompareSection...) là một Component độc lập, có thể tái sử dụng và quản lý trạng thái (state) riêng.

Cơ chế **Virtual DOM** của React cho phép cập nhật giao diện hiệu quả: thay vì cập nhật toàn bộ DOM thật, React tính toán phần thay đổi tối thiểu và chỉ cập nhật đúng phần đó, giúp UI phản hồi nhanh.

**React Hooks** được sử dụng trong Better:
- `useState`: Quản lý trạng thái nội bộ component (sản phẩm đang chọn, tab đang active...).
- `useEffect`: Thực thi logic có tác dụng phụ (fetch API khi component mount, lắng nghe sự kiện...).
- `useContext`: Chia sẻ trạng thái toàn cục thông qua AuthContext (thông tin người dùng đăng nhập).

**Vite** là công cụ build thế hệ mới (Next Generation Frontend Tooling), thay thế Create React App (CRA) truyền thống. Vite sử dụng kiến trúc module ES (ESM) gốc của trình duyệt trong quá trình phát triển, cho phép:
- Khởi động máy chủ phát triển **nhanh hơn 10-100 lần** so với CRA.
- Hot Module Replacement (HMR) gần như tức thì khi thay đổi code.
- Build production tối ưu bằng Rollup bundler.

**Cấu hình Vite trong Better:**
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
```

---

### 2.2 Bảo Mật Ứng Dụng Web

#### 2.2.1 JSON Web Token (JWT)

**JWT** là tiêu chuẩn mở (RFC 7519) để truyền tải thông tin giữa các bên dưới dạng JSON object được ký kỹ thuật số. JWT cho phép xác thực **stateless** (không lưu session phía server), phù hợp với kiến trúc REST API.

Cấu trúc JWT gồm 3 phần ngăn cách bởi dấu chấm (.):

```
HEADER.PAYLOAD.SIGNATURE

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJfaWQiOiI2NjFhYmNkZWYwMTIzNDU2NzgiLCJyb2xlIjoiVXNlciJ9
.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- **Header**: Chứa loại token và thuật toán ký (HS256 – HMAC SHA-256).
- **Payload**: Chứa dữ liệu người dùng (`_id`, `role`). **Không lưu mật khẩu!**
- **Signature**: Chữ ký số để xác minh tính toàn vẹn của token.

**Luồng xác thực JWT trong Better:**
1. Người dùng đăng nhập với email/password → Backend xác thực → Tạo JWT Token và trả về.
2. Frontend lưu token trong `localStorage`.
3. Mọi request cần xác thực đều gửi kèm header `Authorization: Bearer <token>`.
4. Backend middleware (`authMiddleware`) giải mã token, xác minh chữ ký và tiếp tục xử lý.

```javascript
// authMiddleware trong server.js
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Truy cập bị từ chối!' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = verified; // Gán thông tin user vào request
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token không hợp lệ!' });
  }
};
```

#### 2.2.2 Bcrypt và Hashing Mật Khẩu

Mật khẩu người dùng **tuyệt đối không được lưu dạng plaintext** vì nếu cơ sở dữ liệu bị xâm phạm, toàn bộ mật khẩu sẽ bị lộ. Dự án sử dụng thư viện `bcryptjs` để:

- **Hash mật khẩu** với salt factor 10 trước khi lưu vào MongoDB.
- **So sánh mật khẩu** khi đăng nhập bằng hàm `bcrypt.compare()` (thuật toán một chiều, không thể giải mã ngược).

```javascript
// Đăng ký - Hash mật khẩu trước khi lưu
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const newUser = new User({ email, password: hashedPassword, displayName });

// Đăng nhập - So sánh mật khẩu
const validPass = await bcrypt.compare(password, user.password);
if (!validPass) return res.status(400).json({ error: 'Mật khẩu sai' });
```

Salt factor 10 có nghĩa là bcrypt thực hiện 2^10 = 1024 vòng lặp hash, làm cho các cuộc tấn công brute-force cực kỳ tốn kém về thời gian.

#### 2.2.3 Google OAuth và Firebase Authentication

Ngoài đăng nhập Email/Password, hệ thống Better tích hợp **Google OAuth** thông qua Firebase Authentication, cho phép người dùng đăng nhập bằng tài khoản Google của họ mà không cần tạo mật khẩu mới.

Luồng xác thực Google OAuth:
1. Người dùng nhấn "Tiếp tục với Google".
2. Firebase SDK mở popup xác thực Google.
3. Google trả về `idToken` cho Firebase.
4. Frontend nhận thông tin user (email, displayName, photoURL) từ Firebase.
5. Thông tin được đồng bộ với MongoDB backend thông qua API.

---

### 2.3 Thư Viện Giao Diện và Biểu Đồ

#### 2.3.1 Recharts – Thư Viện Biểu Đồ

**Recharts** là thư viện vẽ biểu đồ được xây dựng hoàn toàn trên React và D3.js. Better sử dụng **Radar Chart** (biểu đồ mạng nhện) từ Recharts để trực quan hóa điểm số kỹ thuật của thiết bị theo 5 chiều:

| Chiều Đánh Giá | Căn Cứ Tính Điểm |
|----------------|------------------|
| Hiệu Năng | Tên chip (Apple A18 = 98, Snapdragon 8 Gen 3 = 95...) |
| Màn Hình | Loại tấm nền, tần số quét (OLED+120Hz = cao điểm) |
| Camera | Số megapixel, tính năng (48MP = 90, 200MP = 95...) |
| Pin & Sạc | Dung lượng mAh và tốc độ sạc (5000mAh+90W = cao điểm) |
| Thiết Kế | Vật liệu (Titan = 95, Nhôm = 80, Nhựa = 65...) |

Ưu điểm của Radar Chart trong ngữ cảnh so sánh thiết bị:
- Người dùng nhìn thấy **tổng thể 5 chiều cùng lúc** – điều mà bảng thống số không làm được.
- Hỗ trợ **đặt chồng nhiều lớp** (overlay) của các sản phẩm khác nhau, so sánh tối đa 4 thiết bị trong 1 biểu đồ.
- Màu sắc phân biệt rõ ràng: Xanh dương, Đỏ, Vàng, Xanh lá – tương ứng 4 thiết bị.

#### 2.3.2 Lucide React – Thư Viện Icon

**Lucide React** cung cấp hơn 1000 icon SVG được tối ưu hóa cho React. Better sử dụng các icon từ Lucide như `Smartphone`, `Laptop`, `BarChart2`, `Cpu`, `Newspaper`, `ShoppingBag`, `Heart`, `Star`, `X`, `LogIn`... để tạo giao diện trực quan và nhất quán.

**Lý do chọn Lucide React thay vì Font Awesome:**
- Tree-shakeable – chỉ bundle những icon thực sự dùng, giảm kích thước file.
- Thiết kế hiện đại, đường nét mảnh và tinh tế phù hợp với phong cách Glassmorphism.
- Hỗ trợ TypeScript và dễ tùy chỉnh kích thước/màu sắc qua props.

---

### 2.4 DevOps và Containerization

#### 2.4.1 Docker

**Docker** là nền tảng containerization mã nguồn mở, cho phép đóng gói ứng dụng và toàn bộ môi trường chạy (runtime, dependencies, cấu hình) vào một "container" hoàn chỉnh. Container này có thể chạy nhất quán trên bất kỳ hệ điều hành nào có Docker Engine.

**Các khái niệm cốt lõi:**
- **Image**: Bản thiết kế chỉ đọc của container (như file ISO của hệ điều hành).
- **Container**: Instance đang chạy của một Image.
- **Dockerfile**: Script hướng dẫn Docker cách xây dựng Image từng bước.
- **Docker Compose**: Công cụ định nghĩa và chạy nhiều container cùng lúc qua file YAML.

**Dockerfile Backend (Node.js):**
```dockerfile
FROM node:18-alpine    # Image nhẹ ~165MB (Alpine Linux)
WORKDIR /app
COPY package*.json ./  # Cache layer: chỉ rebuild khi package.json thay đổi
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

**Dockerfile Frontend (Multi-stage Build):**
```dockerfile
# Stage 1: Build React app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build       # Output: /app/dist/

# Stage 2: Serve với Nginx (~23MB)
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Multi-stage Build giúp image production không chứa Node.js hay source code, giảm kích thước từ ~950MB xuống còn ~30MB và tăng bảo mật.

#### 2.4.2 GitHub Actions CI/CD

**CI/CD** (Continuous Integration/Continuous Deployment) là quy trình tự động hóa kiểm thử và triển khai phần mềm mỗi khi có thay đổi code.

**GitHub Actions** là nền tảng CI/CD tích hợp sẵn trong GitHub. Better sử dụng workflow tự động:

```yaml
# .github/workflows/ci.yml
name: MERN CI Pipeline
on:
  push:    { branches: ["main"] }
  pull_request: { branches: ["main"] }
jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: '18' }
      - run: npm ci           # Cài đặt Frontend dependencies
      - run: npm run build    # Test Vite build thành công
      - run: cd server && npm ci  # Cài đặt Backend dependencies
```

Mỗi khi developer push code lên nhánh `main`, GitHub Actions tự động chạy pipeline. Nếu tất cả bước PASS, Vercel và Render.com tự động triển khai phiên bản mới. Nếu có lỗi, hệ thống gửi thông báo và ngăn không cho cập nhật lên production.

#### 2.4.3 Nginx Web Server

**Nginx** là web server hiệu năng cao, được sử dụng trong Better làm **Static File Server** cho ứng dụng React đã build. Nginx xử lý đúng routing của Single Page Application bằng cấu hình `try_files`:

```nginx
# nginx.conf
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
        # Nếu không tìm thấy file → trả về index.html → React Router xử lý
    }
}
```

Cấu hình này đảm bảo khi người dùng truy cập trực tiếp URL bất kỳ (ví dụ: `/compare`, `/news`), Nginx vẫn trả về `index.html` và React Router sẽ xử lý điều hướng phía client.

---

### 2.5 Nền Tảng Triển Khai Đám Mây

#### 2.5.1 MongoDB Atlas

**MongoDB Atlas** là dịch vụ cơ sở dữ liệu MongoDB được quản lý hoàn toàn trên đám mây. Better sử dụng Free Tier (M0 Cluster) với:
- Dung lượng lưu trữ: 512MB.
- Replica Set gồm 3 node (tự động backup).
- Kết nối qua chuỗi `mongodb+srv://` với TLS encryption.
- Dashboard theo dõi hiệu suất và dung lượng.

#### 2.5.2 Vercel

**Vercel** là nền tảng triển khai frontend tối ưu cho React/Next.js. Đặc điểm:
- Tự động phát hiện Vite framework và cấu hình build.
- Global CDN (Edge Network) với hơn 100 data center toàn cầu.
- Latency < 50ms cho người dùng Việt Nam (thông qua các node tại Singapore, Hong Kong).
- Tự động deploy khi có push lên nhánh main của GitHub repository.

#### 2.5.3 Render.com

**Render.com** là nền tảng triển khai backend phổ biến cho các dự án Node.js. Đặc điểm:
- Hỗ trợ deploy từ GitHub repository trực tiếp.
- Tự động cài đặt dependencies và khởi động server.
- Cung cấp HTTPS miễn phí với Let's Encrypt certificate.
- Free tier có giới hạn: server "ngủ" sau 15 phút không có request (cold start ~2 giây).

#### 2.5.4 Công Cụ Phát Triển Khác

| Công Cụ | Mục Đích |
|---------|----------|
| Visual Studio Code | IDE chính để viết code |
| Git | Quản lý phiên bản mã nguồn |
| GitHub | Lưu trữ repository và CI/CD |
| Postman | Kiểm thử API endpoint |
| MongoDB Compass | GUI quản lý MongoDB |
| Chrome DevTools | Debug frontend và kiểm tra hiệu năng |
| Lighthouse | Đánh giá Performance, Accessibility, SEO |
| PlantUML | Vẽ các biểu đồ UML |

---
