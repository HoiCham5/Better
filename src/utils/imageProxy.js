const API_URL = import.meta.env.VITE_API_URL || 'https://better-grg6.onrender.com';

/**
 * Chuyển URL ảnh gốc sang URL qua image proxy công cộng (wsrv.nl)
 * để tránh bị lỗi CORS hoặc hotlinking block khi lấy ảnh từ các trang web khác.
 */
export function proxyImage(url) {
  if (!url) return '';
  if (
    url.startsWith('data:') ||
    url.startsWith('blob:') ||
    url.startsWith('/') ||
    url.includes('localhost') ||
    url.includes('placehold.co') ||
    url.includes('unsplash.com') ||
    url.includes('wsrv.nl')
  ) {
    return url;
  }
  
  // Dùng dịch vụ wsrv.nl để tự động fetch ảnh và bypass CORS
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&output=webp`;
}
