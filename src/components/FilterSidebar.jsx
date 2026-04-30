import React from 'react';

const FilterSidebar = ({ userPreference, setUserPreference }) => {
  return (
    <div className="glass-panel" style={{ padding: '20px', borderRadius: '15px', position: 'sticky', top: '20px' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--accent-primary)' }}>Bộ Lọc Thông Minh</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '10px', fontSize: '1rem', color: 'var(--text-secondary)' }}>Bạn cần tìm máy để làm gì?</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['Không thiết lập', 'Chơi Game Nặng (Gaming)', 'Văn phòng cơ bản', 'Lập trình viên (Code)', 'Theo hệ sinh thái Apple'].map(pref => (
            <label key={pref} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="preference" 
                checked={userPreference === pref}
                onChange={() => setUserPreference(pref)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
              />
              {pref}
            </label>
          ))}
        </div>
      </div>

      <div style={{ padding: '15px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px', borderLeft: '3px solid var(--accent-primary)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        <b>💡 Mẹo:</b> Khi bạn chọn nhu cầu, hệ thống AI của chúng tôi sẽ tính toán và trích xuất mức độ phù hợp (Match Score) trên từng cấu hình thiết bị.
      </div>
    </div>
  );
};

export default FilterSidebar;
