require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Product, Post, Review, User } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'techcompare_super_secret';

// Lấy Token từ Header
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Truy cập bị từ chối!' });
  try {
    const verified = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token không hợp lệ!' });
  }
};

// =======================
// XÁC THỰC (AUTH)
// =======================
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email đã tồn tại' });
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ email, password: hashedPassword, displayName });
    await newUser.save();
    res.json({ message: 'Tạo tài khoản thành công', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Tài khoản không tồn tại' });
    
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).json({ error: 'Mật khẩu sai' });
    
    const token = jwt.sign({ _id: user._id, role: user.role }, JWT_SECRET);
    res.header('Authorization', token).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Sync data hồ sơ
app.get('/api/users/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
});

// Update Wishlist/Points
app.put('/api/users/me', authMiddleware, async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');
  res.json(updatedUser);
});

// =======================
// SẢN PHẨM (PRODUCTS)
// =======================
app.get('/api/scrape', async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Missing query parameter' });
  
  try {
    const { scrapeProductData } = require('./scraper');
    const data = await scrapeProductData(query);
    if (!data) return res.status(404).json({ error: 'Không tìm thấy dữ liệu' });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post('/api/products/seed', async (req, res) => {
  try {
     const count = await Product.countDocuments();
     if(count === 0 && req.body.length > 0) {
        await Product.insertMany(req.body);
        return res.json({ message: 'Seeded thành công' });
     }
     res.json({ message: 'Đã có data' });
  } catch(e) { res.status(500).json({error: e.message}); }
});

app.post('/api/products', async (req, res) => {
  // Thêm mới hoặc Cập nhật
  const { id } = req.body;
  const updated = await Product.findOneAndUpdate({ id }, req.body, { upsert: true, new: true });
  res.json(updated);
});

app.delete('/api/products/:id', async (req, res) => {
  await Product.findOneAndDelete({ id: req.params.id });
  res.json({ message: 'Xoá thành công' });
});

// =======================
// BÀI VIẾT (POSTS)
// =======================
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const { id } = req.body;
  const updated = await Post.findOneAndUpdate({ id }, req.body, { upsert: true, new: true });
  res.json(updated);
});

app.delete('/api/posts/:id', async (req, res) => {
  await Post.findOneAndDelete({ id: req.params.id });
  res.json({ message: 'Xoá thành công' });
});

// =======================
// BÌNH LUẬN (REVIEWS)
// =======================
app.get('/api/reviews/:productId', async (req, res) => {
  const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
  res.json(reviews);
});

app.post('/api/reviews', authMiddleware, async (req, res) => {
  try {
    const review = new Review({ ...req.body, userId: req.user._id });
    await review.save();
    
    // Cộng điểm
    if (req.body.pointsToAdd) {
       await User.findByIdAndUpdate(req.user._id, { $inc: { points: req.body.pointsToAdd } });
    }
    
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/better';
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
  })
  .catch(err => console.log('❌ DB Connection Error:', err));
