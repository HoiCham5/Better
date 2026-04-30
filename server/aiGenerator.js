const { GoogleGenerativeAI } = require('@google/generative-ai');

// Cấu hình Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateProductData(keyword) {
  try {
    console.log(`Bắt đầu sinh dữ liệu AI cho: ${keyword}...`);
    
    // Sử dụng model ổn định
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const prompt = `Bạn là một chuyên gia về các thiết bị công nghệ (Điện thoại, Laptop). 
Người dùng muốn thêm sản phẩm có tên: "${keyword}".
Nhiệm vụ của bạn là trả về một file JSON duy nhất chứa cấu hình thực tế hoặc sát thực tế nhất của sản phẩm này.

Yêu cầu định dạng JSON CHÍNH XÁC như sau (KHÔNG chứa bất kỳ markdown hay text nào khác ngoài JSON):
{
  "name": "Tên đầy đủ của sản phẩm",
  "brand": "Thương hiệu (Apple, Samsung, Xiaomi, HP, Dell...)",
  "price": "Giá bán dự kiến tại Việt Nam (VD: 5.990.000 ₫)",
  "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
  "specs": {
    "screen": "Kích thước, Tấm nền, Tần số quét (VD: 6.7 inch, AMOLED, 120Hz)",
    "brightness": "Độ sáng tối đa (VD: 1000 nits)",
    "chip": "Tên vi xử lý (VD: Snapdragon 8 Gen 2)",
    "gpu": "Tên chip đồ hoạ",
    "ram": "Dung lượng RAM (VD: 8 GB)",
    "storage": "Bộ nhớ trong (VD: 256 GB)",
    "camera": "Thông số Camera sau",
    "cameraSelfie": "Thông số Camera trước",
    "battery": "Dung lượng pin và sạc nhanh (VD: 5000 mAh, Sạc 67W)",
    "os": "Hệ điều hành",
    "network": "Hỗ trợ mạng (5G/4G)",
    "weight": "Trọng lượng (VD: 189g)",
    "materials": "Chất liệu (VD: Khung kim loại, mặt lưng kính)",
    "releaseDate": "Năm ra mắt",
    "aiFeatures": "Các tính năng AI nổi bật nếu có"
  }
}

Chú ý: Thuộc tính image hãy giữ nguyên link Unsplash hoặc tìm một link ảnh đại diện chung chung cho điện thoại/laptop.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Parse JSON
    const productData = JSON.parse(responseText);
    console.log("AI Sinh thành công:", productData.name);
    
    return productData;
  } catch (error) {
    console.error('Lỗi khi gọi AI Gemini:', error.message);
    throw new Error('AI không thể sinh dữ liệu. Vui lòng kiểm tra lại cấu hình hoặc thử tên khác.');
  }
}

module.exports = { generateProductData };
