const mongoose = require('mongoose');

const OLD_URI = "mongodb+srv://admin:admin123@cluster0.hdtkaig.mongodb.net/techcompare?retryWrites=true&w=majority&appName=Cluster0";
const NEW_URI = "mongodb+srv://admin:admin123@cluster0.nu5vvyp.mongodb.net/better?retryWrites=true&w=majority&appName=Cluster0";

async function migrate() {
  try {
    const oldConn = await mongoose.createConnection(OLD_URI).asPromise();
    const newConn = await mongoose.createConnection(NEW_URI).asPromise();

    console.log("Connected to both databases.");

    const collections = ['products', 'posts', 'reviews', 'users'];

    for (const col of collections) {
      const oldCol = oldConn.collection(col);
      const newCol = newConn.collection(col);
      
      const data = await oldCol.find({}).toArray();
      if (data.length > 0) {
        await newCol.deleteMany({}); // Xóa dữ liệu mẫu vừa tạo
        await newCol.insertMany(data);
        console.log(`✅ Đã chuyển ${data.length} bản ghi vào bảng ${col}`);
      }
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (err) {
    console.error("Lỗi:", err);
    process.exit(1);
  }
}

migrate();
