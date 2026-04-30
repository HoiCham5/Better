const mongoose = require('mongoose');
const { Product, Post } = require('./models');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/techcompare';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Generating product reviews...');

    try {
      // Get all existing products
      const products = await Product.find({});
      if (!products || products.length === 0) {
        console.log("No products found to map!");
        process.exit(0);
      }
      
      const newPosts = [];
      
      products.forEach((product, idx) => {
        // Generate a review post for each product
        const specSummary = product.specs ? `Máy được trang bị con chip ${product.specs.chip}, RAM ${product.specs.ram} và màn hình khủng ${product.specs.screen}.` : `Cấu hình cực kỳ ấn tượng trong phân khúc giá.`;
        
        const reviewPost = {
          id: `review-${product.id}`,
          title: `Đánh giá chi tiết ${product.name}: Liệu có xứng đáng mức giá ${product.price}?`,
          summary: `Bạn đang lăn tăn về ${product.name}? Hãy cùng Better mổ xẻ cụ thể từng ưu nhược điểm, từ camera tới thời lượng pin của mẫu ${product.category === 'phone' ? 'smartphone' : 'laptop'} đình đám này.`,
          content: `## 1. Thiết Kế Sang Trọng, Thời Thượng
${product.name} của nhà ${product.brand} ngay từ khi ra mắt đã hút mọi ánh nhìn với độ hoàn thiện cao ráo và các đường vát cực kỳ chi tiết. Người dùng sẽ cảm thấy sự đầm tay, chắc chắn và đẳng cấp ngay ở lần đầu cầm nắm.

## 2. Thông số ấn tượng
${specSummary} Những con số này minh chứng cho việc ${product.name} sinh ra là để xử lý mọi tựa game AAA hạng nặng hoặc thiết kế render cường độ cao mà không làm bạn phải đổ mồ hôi.

## 3. Lời kết
Mức giá ${product.price} có thể là một con số khiến nhiều người phải cân nhắc. Nhưng nếu nhìn vào tổng thể tính năng trải nghiệm, hệ thống độc quyền và độ bền bỉ mà ${product.brand} làm ra cho thiết bị này, tôi tin chắc sự đầu tư này là cực kỳ đáng "đồng tiền bát gạo".

**Theo dõi Better để nhận các bản so sánh đa chiều chi tiết hơn về thiết bị này.**
`,
          image: product.image, // Use the product's image for the article!
          date: new Date(Date.now() - (idx * 2) * 86400000).toLocaleDateString() // offset time
        };
        
        newPosts.push(reviewPost);
      });

      // Clear existing old generated reviews maybe? Or just merge.
      // Upsert to handle multiple runs safely
      let inserted = 0;
      for (const post of newPosts) {
         await Post.findOneAndUpdate({ id: post.id }, post, { upsert: true, new: true });
         inserted++;
      }
      
      console.log(`✅ ${inserted} Product Review Posts injected!`);
    } catch(err) {
      console.log("Error inserting reviews: ", err.message);
    }
    
    mongoose.connection.close();
  });
