# Sử dụng môi trường Node.js chuẩn nhẹ
FROM node:18-alpine

# Thư mục gốc chứa Web Backend bên trong Container
WORKDIR /app

# Copy các file thiết lập thư viện vào trước để Cache
COPY package*.json ./

# Chạy cài đặt các thư viện Nodejs (Express, Mongoose...)
RUN npm install

# Bưng toàn bộ mã nguồn đẩy vào trong Container
COPY . .

# Mở cổng Backend
EXPOSE 5000

# Lệnh khởi chạy chính tự động mỗi khi Docker Mở
CMD ["node", "server.js"]
