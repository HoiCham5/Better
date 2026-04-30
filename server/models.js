const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: String },
  priceValue: { type: Number },
  image: { type: String },
  category: { type: String },
  specs: { type: mongoose.Schema.Types.Mixed },
  youtubeUrl: { type: String },
  isFeatured: { type: Boolean, default: false }
}, { strict: false, timestamps: true });

const postSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  summary: { type: String },
  content: { type: String },
  image: { type: String },
  date: { type: String }
}, { strict: false, timestamps: true });

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String },
  userPhoto: { type: String },
  text: { type: String, required: true },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  photoURL: { type: String },
  points: { type: Number, default: 0 },
  wishlist: [{ type: String }],
  role: { type: String, default: 'User' }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
const Post = mongoose.model('Post', postSchema);
const Review = mongoose.model('Review', reviewSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Product, Post, Review, User };
