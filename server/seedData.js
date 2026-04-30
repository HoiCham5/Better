const mongoose = require('mongoose');
const { Product, Post } = require('./models');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techcompare';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Starting seed...');

    const newsData = [];
    for (let i = 1; i <= 20; i++) {
      newsData.push({
        id: `news-${100 + i}`,
        title: `Bản tin công nghệ: Hé lộ thông tin rò rỉ siêu phẩm thứ ${i}`,
        summary: `Những đánh giá, so sánh và cái nhìn sâu sắc nhất về các thiết bị chuẩn bị trình làng. Cùng đi sâu phân tích hiệu năng và thiết kế của thiết bị thứ ${i} trong năm 2026.`,
        content: `Mới đây, cộng đồng mạng lại được phen dậy sóng khi thông tin rò rỉ về cấu hình và giá bán của một loạt sản phẩm được tiết lộ. \n\n### Thiết kế\nSản phẩm dự kiến sẽ giữ lại nét mỏng nhẹ tinh tế và sử dụng viền Titanium nguyên khối. Đây hứa hẹn sẽ mang đến cảm giác cầm nắm chắc chắn hơn.\n\n### Hiệu năng\nĐược trang bị chip AI mới nhất, việc xử lý 100 tác vụ nền và edit Video 8K không còn là chuyện viễn tưởng.\n\nĐừng quên đón đọc bài so sánh chi tiết trên nền tảng Better vào tháng tới!`,
        image: `https://images.unsplash.com/photo-${1500000000000 + i * 1000000}?q=80&w=800&auto=format&fit=crop`,
        date: new Date(Date.now() - i * 86400000).toLocaleDateString()
      });
    }

    // Assign generic tech images
    const genericImages = [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800',
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800',
      'https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=800',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbc0?q=80&w=800'
    ];
    newsData.forEach((n, i) => n.image = genericImages[i % genericImages.length]);

    const productsData = [
      {
        id: 'p-xiaomi-14',
        category: 'phone',
        brand: 'Xiaomi',
        name: 'Xiaomi 14 Ultra',
        price: '32,990,000 đ',
        image: 'https://cdn.tgdd.vn/Products/Images/42/323385/xiaomi-14-ultra-den-1-1-750x500.jpg',
        isFeatured: true,
        specs: {
          releaseDate: 'Tháng 2, 2024',
          weight: '219g',
          materials: 'Mặt lưng Da thuần chay / Kính ốp viền Titan',
          screen: '6.73" AMOLED 120Hz, 3000 nits',
          chip: 'Snapdragon 8 Gen 3',
          ram: '16GB',
          storage: '512GB',
          camera: 'Bộ 4 Cam Leica 50MP, Siêu tele 120x',
          battery: '5000mAh, Sạc 90W HyperCharge',
          os: 'HyperOS (Android 14)'
        },
        links: { shopee: 'https://shopee.vn/search?keyword=xiaomi%2014%20ultra' }
      },
      {
        id: 'p-pixel-8-pro',
        category: 'phone',
        brand: 'Google',
        name: 'Pixel 8 Pro',
        price: '24,500,000 đ',
        image: 'https://cdn.tgdd.vn/Products/Images/42/317316/khong-ten-2-2-750x500.jpg',
        isFeatured: true,
        specs: {
          releaseDate: 'Tháng 10, 2023',
          weight: '213g',
          materials: 'Viền Nhôm bóng, Mặt lưng kính nhám',
          screen: '6.7" Super Actua OLED 120Hz',
          chip: 'Google Tensor G3',
          ram: '12GB',
          storage: '256GB',
          camera: '50MP chính, Siêu thực tế AI',
          battery: '5050mAh, Sạc 30W',
          os: 'Android 14 (Hỗ trợ 7 năm cập nhật)'
        },
        links: { shopee: 'https://shopee.vn/search?keyword=pixel%208%20pro' }
      },
      {
        id: 'p-macbook-air-m3',
        category: 'laptop',
        brand: 'Apple',
        name: 'MacBook Air M3 2024',
        price: '27,990,000 đ',
        image: 'https://cdn.tgdd.vn/Products/Images/44/322616/apple-macbook-air-m3-13-inch-8-core-cpu-10-core-gpu-256gb-den-1-1-750x500.jpg',
        isFeatured: true,
        specs: {
          releaseDate: 'Tháng 3, 2024',
          weight: '1.24kg',
          materials: 'Nhôm nguyên khối',
          screen: '13.6" Liquid Retina',
          chip: 'Apple M3 (8-core CPU, 10-core GPU)',
          ram: '8GB / 16GB',
          storage: '256GB / 512GB SSD',
          camera: '1080p FaceTime HD',
          battery: 'Sạc thả ga 18 giờ liên tục',
          os: 'macOS Sonoma'
        },
        links: { shopee: 'https://shopee.vn/search?keyword=macbook%20air%20m3' }
      },
      {
        id: 'p-rog-strix-18',
        category: 'laptop',
        brand: 'ASUS',
        name: 'ROG Strix SCAR 18',
        price: '119,990,000 đ',
        image: 'https://cdn.tgdd.vn/Products/Images/44/302830/asus-gaming-rog-strix-scar-18-g834jd-i9-n6039w-thumb-1-600x600.jpg',
        isFeatured: true,
        specs: {
          releaseDate: 'Tháng 1, 2024',
          weight: '3.10kg',
          materials: 'Kim loại Aluminum',
          screen: '18" QHD+ Nebula HDR 240Hz',
          chip: 'Intel Core i9-14900HX',
          ram: '64GB DDR5',
          storage: '2TB PCIe Gen4',
          camera: '720p HD',
          battery: '90Wh, Siêu Cấp',
          os: 'Windows 11 Pro'
        },
        links: { shopee: 'https://shopee.vn/search?keyword=rog%20strix%20scar%2018' }
      },
      {
        id: 'p-oppo-find-x7',
        category: 'phone',
        brand: 'OPPO',
        name: 'Find X7 Ultra',
        price: '28,990,000 đ',
        image: 'https://cdn.tgdd.vn/Products/Images/42/317531/oppo-find-x7-ultra-den-1-600x600.jpg',
        isFeatured: false,
        specs: {
          releaseDate: 'Tháng 1, 2024',
          weight: '221g',
          materials: 'Mặt lưng Da sinh thái',
          screen: '6.82" AMOLED 120Hz LTPO',
          chip: 'Snapdragon 8 Gen 3',
          ram: '12GB / 16GB',
          storage: '256GB / 512GB',
          camera: 'Bộ 4 Quad Camera Hasselblad 50MP',
          battery: '5000mAh, Sạc SuperVOOC 100W',
          os: 'ColorOS 14 (Android 14)'
        },
        links: { shopee: 'https://shopee.vn/' }
      },
      {
        id: 'p-lenovo-yoga-9i',
        category: 'laptop',
        brand: 'Lenovo',
        name: 'Yoga 9i 14"',
        price: '46,500,000 đ',
        image: 'https://cdn.tgdd.vn/Products/Images/44/302196/lenovo-yoga-9-14irp8-i7-83b1000bvn-thumb-1-600x600.jpg',
        isFeatured: false,
        specs: {
          releaseDate: 'Tháng 12, 2023',
          weight: '1.4kg',
          materials: 'Hợp kim Nhôm viền siêu bóng',
          screen: '14" 4K OLED Cảm ứng 360 độ',
          chip: 'Intel Core i7-1360P',
          ram: '16GB LPDDR5',
          storage: '1TB SSD M.2',
          camera: '1080p Nhận diện khuôn mặt',
          battery: 'Bản siêu dài 15 giờ',
          os: 'Windows 11 Home'
        },
        links: { shopee: 'https://shopee.vn/' }
      }
    ];

    try {
      await Post.insertMany(newsData);
      console.log('✅ 20 News Articles injected!');
      await Product.insertMany(productsData);
      console.log('✅ Additional Products injected!');
    } catch(err) {
      console.log("Error inserting docs: ", err.message);
    }
    
    mongoose.connection.close();
  });
