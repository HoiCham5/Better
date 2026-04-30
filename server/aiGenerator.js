async function generateProductData(keyword) {
  try {
    console.log(`Bắt đầu sinh dữ liệu AI (Miễn phí) cho: ${keyword}...`);
    
    const prompt = `Bạn là một chuyên gia về thiết bị công nghệ. 
Nhiệm vụ: Trả về một file JSON duy nhất chứa cấu hình thực tế của sản phẩm: "${keyword}".
Yêu cầu định dạng JSON CHÍNH XÁC như sau (KHÔNG CÓ MARKDOWN):
{
  "name": "Tên sản phẩm",
  "brand": "Thương hiệu",
  "price": "Giá bán dự kiến tại Việt Nam (VD: 5.990.000 ₫)",
  "image": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop",
  "specs": {
    "screen": "Kích thước, Tấm nền, Tần số quét (VD: 6.7 inch, AMOLED, 120Hz)",
    "brightness": "Độ sáng",
    "chip": "Tên vi xử lý",
    "gpu": "Tên đồ hoạ",
    "ram": "RAM",
    "storage": "Bộ nhớ",
    "camera": "Camera sau",
    "cameraSelfie": "Camera trước",
    "battery": "Pin và sạc",
    "os": "Hệ điều hành",
    "network": "Hỗ trợ mạng",
    "weight": "Trọng lượng",
    "materials": "Chất liệu",
    "releaseDate": "Năm ra mắt",
    "aiFeatures": "Tính năng AI"
  }
}`;

    const res = await fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a tech specs API that returns pure JSON.' },
          { role: 'user', content: prompt }
        ],
        jsonMode: true
      })
    });

    if (!res.ok) throw new Error("Pollinations API Error");

    const responseText = await res.text();
    
    // Parse JSON
    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const productData = JSON.parse(cleanJson);
    console.log("AI Sinh thành công:", productData.name);
    
    return productData;
  } catch (error) {
    console.error('Lỗi khi gọi AI Miễn Phí:', error.message);
    throw new Error('Lỗi AI: Không thể kết nối hoặc API phản hồi sai.');
  }
}

module.exports = { generateProductData };
