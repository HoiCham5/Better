import React, { useState } from 'react';

const dictionary = {
  OLED: 'Công nghệ màn hình hiển thị sử dụng các điốt phát xạ ánh sáng hữu cơ, cho màu đen sâu tuyệt đối, tiết kiệm pin khi xem nền đen và độ tương phản rất cao.',
  '120Hz': 'Tần số quét 120Hz có nghĩa màn hình làm mới 120 lần mỗi giây, giúp mọi thao tác cuộn vuốt và chơi game cực kỳ mượt mà, không bị khựng.',
  Snapdragon: 'Dòng vi xử lý nổi tiếng dành cho điện thoại của Qualcomm, được đánh giá cao về hiệu năng Gaming và độ ổn định.',
  Bionic: 'Dòng chip mạnh mẽ độc quyền của Apple (trên iPhone), nổi tiếng với khả năng tối ưu hoá phần mềm, tuổi thọ sử dụng dài.',
  Titanium: 'Hợp kim titan siêu bền vững và siêu nhẹ, vốn được dùng trong hàng không vũ trụ, nay áp dụng làm viền bảo vệ điện thoại cao cấp.',
  'Wi-Fi 6E': 'Phiên bản Wi-Fi tiên tiến nhất cung cấp tốc độ mạng siêu nhanh, độ trễ thấp ngay cả khi có nhiều thiết bị truy cập.',
  GPU: 'Bộ vi xử lý đồ hoạ chuyên biệt để xử lý hình ảnh, video độ phân giải cao và dựng hình game 3D.',
  RAM: 'Bộ nhớ tạm để đa nhiệm. RAM lớn (8GB, 12GB) giúp mở nhiều ứng dụng cùng lúc mà không phải tải lại.'
};

const Tooltip = ({ term }) => {
  const [show, setShow] = useState(false);
  const explanation = dictionary[term] || dictionary[Object.keys(dictionary).find(k => term.includes(k))] || 'Một thông số kỹ thuật hữu ích.';

  return (
    <span 
      className="tooltip-container"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', cursor: 'help', textDecoration: 'underline dotted var(--text-secondary)', fontWeight: 'bold' }}
    >
      {term}
      {show && (
        <div 
          className="glass-panel animate-fade-in"
          style={{ 
            position: 'absolute', 
            bottom: '120%', 
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-primary)',
            padding: '10px 15px',
            borderRadius: '8px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            width: '250px',
            zIndex: 100,
            fontSize: '0.85rem',
            textAlign: 'left',
            color: 'var(--text-primary)',
            pointerEvents: 'none',
            border: '1px solid var(--accent-primary)'
          }}
        >
          {explanation}
        </div>
      )}
    </span>
  );
};

export default Tooltip;
