import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Send } from 'lucide-react';

const AIAnalyzer = ({ products }) => {
  const [query, setQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [response, setResponse] = useState('');

  const handleConsult = () => {
    if (!query.trim()) return;
    setIsThinking(true);
    setResponse('');

    // Simulate AI API Call
    setTimeout(() => {
      setIsThinking(false);

      const isLaptop = query.toLowerCase().includes('laptop');
      const isPhone = query.toLowerCase().includes('điện thoại');
      const filtered = products.filter(p => isLaptop ? p.category === 'laptop' : (isPhone ? p.category === 'phone' : true));
      // Trích xuất ngân sách nếu có số
      const hasBudget = query.match(/\d+/);

      const suggested = filtered[Math.floor(Math.random() * filtered.length)];
      const suggested2 = filtered[Math.floor(Math.random() * filtered.length)];

      const mockAnalysis = `
### 🤖 Giải Pháp Thiết Bị Dành Riêng Cho Bạn:
Theo tìm kiếm: *" ${query} "*

**1. Đề Xuất Ưu Tiên: ${suggested?.brand} ${suggested?.name}**
- **Điểm phù hợp:** 95%
- **Tại sao?** Chiếc máy này đáp ứng hoàn hảo yêu cầu của bạn nhờ trang bị phần cứng mạnh mẽ. Màn hình **${suggested?.specs?.screen}** kết hợp với vi xử lý **${suggested?.specs?.chip}** sẽ cung cấp sự linh hoạt cực cao.
- **Giá tham khảo:** ${suggested?.price}

**2. Phương Án Thay Thế: ${suggested2?.brand} ${suggested2?.name}**
- **Điểm phù hợp:** 85%
- **Tại sao?** Nếu bạn muốn tối ưu ngân sách hoặc cân nhắc thêm, đây là mẫu máy mang lại hiệu năng ổn định không kém. 
- **Giá tham khảo:** ${suggested2?.price}

🎯 *Lưu ý: Mọi tư vấn chỉ mang tính tham khảo dựa theo thông số nhà sản xuất. Hãy kiểm tra tận tay trước khi mua!*
      `;
      setResponse(mockAnalysis);
    }, 2000); // Tốc độ xử lý giả định 2s
  }

  return (
    <section className="compare-view glass-panel animate-fade-in" style={{ marginTop: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <Bot size={48} className="text-accent-primary" style={{ margin: '0 auto', marginBottom: '15px' }} />
        <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Trợ Lý AI Công Nghệ</h2>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Tối ưu hoá sự lựa chọn của bạn bằng dữ liệu máy học. Khai báo nhu cầu, ngân sách và sở thích, AI sẽ đề xuất cỗ máy tốt nhất!
        </p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', marginBottom: '30px' }}>
        <textarea
          className="select-input"
          rows="3"
          placeholder="Ví dụ: Tôi cần tìm mua laptop lập trình viên Front-End dưới 35 triệu, ưu tiên màn hình đẹp và nhẹ nhàng..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ width: '100%', padding: '20px', fontSize: '1.1rem', borderRadius: '15px', resize: 'vertical' }}
        ></textarea>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          className="btn"
          onClick={handleConsult}
          disabled={isThinking || !query.trim()}
          style={{ background: 'var(--gradient-accent)', color: 'white', padding: '12px 30px', fontSize: '1.1rem', borderRadius: '30px' }}
        >
          {isThinking ? (
            <><Sparkles size={20} className="animate-spin" /> Đang Phân Tích Dữ Liệu...</>
          ) : (
            <><Send size={20} /> Xin Phân Tích Thông Minh</>
          )}
        </button>
      </div>

      {response && (
        <div className="glass-panel" style={{ padding: '30px', borderLeft: '4px solid var(--accent-primary)', background: 'rgba(59, 130, 246, 0.05)', lineHeight: '1.8' }}>
          <div dangerouslySetInnerHTML={{
            __html: response
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/\n-/g, '<br/>•')
              .replace(/> (.*)/g, '<blockquote style="border-left: 3px solid var(--accent-secondary); padding-left: 15px; margin: 15px 0; font-style: italic; color: var(--text-secondary)">$1</blockquote>')
          }} />
        </div>
      )}
    </section>
  );
};

export default AIAnalyzer;
