# STAGE 1: Xây dựng (Build) React Vite 
FROM node:18-alpine AS builder
WORKDIR /app

# Khai báo dọn dẹp các thư viện React
COPY package*.json ./
RUN npm install

# Copy source Frontend
COPY . .

# Tiến hành dịch mã React ra HTML/JS/CSS nhẹ nhàng nhất (Thư mục dist)
RUN npm run build

# STAGE 2: Hosting bằng máy chủ Web NGINX chuyên nghiệp
FROM nginx:alpine

# Cấu hình lại chuẩn luồng SPA (Single Page Application)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Bưng mảng web đã đóng gói đắp sang NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Kích hoạt NGINX liên tục ngầm
CMD ["nginx", "-g", "daemon off;"]
