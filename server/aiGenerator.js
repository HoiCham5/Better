require('dotenv').config();

async function generateProductData(keyword) {
  try {
    console.log(`Bắt đầu sinh dữ liệu bằng Groq AI cho: ${keyword}...`);
    
    // Kiểm tra API Key
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new Error('Chưa cấu hình GROQ_API_KEY trong file .env');
    }

    const prompt = `Bạn là một chuyên gia về thiết bị công nghệ. 
Nhiệm vụ: Trả về một file JSON duy nhất chứa cấu hình thực tế của sản phẩm: "${keyword}".
Yêu cầu định dạng JSON CHÍNH XÁC như sau (KHÔNG CÓ MARKDOWN, CHỈ CÓ JSON):
{
  "name": "Tên sản phẩm đầy đủ",
  "brand": "Thương hiệu",
  "price": "Giá bán dự kiến tại Việt Nam (VD: 29.990.000 ₫)",
  "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
  "specs": {
    "screen": "Kích thước, Tấm nền, Tần số quét (VD: 6.7 inch, AMOLED, 120Hz)",
    "brightness": "Độ sáng tối đa",
    "chip": "Tên vi xử lý chi tiết",
    "gpu": "Tên đồ hoạ",
    "ram": "Dung lượng RAM",
    "storage": "Dung lượng bộ nhớ",
    "camera": "Thông số Camera sau",
    "cameraSelfie": "Thông số Camera trước",
    "battery": "Dung lượng Pin và công suất sạc",
    "os": "Hệ điều hành khi ra mắt",
    "network": "Hỗ trợ mạng (VD: 5G, Wi-Fi 6E)",
    "weight": "Trọng lượng",
    "materials": "Chất liệu thiết kế",
    "releaseDate": "Năm ra mắt",
    "aiFeatures": "Các tính năng AI nổi bật"
  }
}`;

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'You are a tech specs API that strictly returns pure JSON.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (!res.ok) {
        const err = await res.text();
        throw new Error(`Groq API Error: ${err}`);
    }

    const data = await res.json();
    const responseText = data.choices[0].message.content;
    
    // Parse JSON
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const productData = JSON.parse(cleanJson);
    console.log("Groq AI sinh thành công:", productData.name);
    
    return productData;
  } catch (error) {
    console.error('Lỗi khi gọi Groq AI:', error.message);
    throw new Error('Lỗi AI: Không thể kết nối hoặc API phản hồi sai.');
  }
}

module.exports = { generateProductData };
