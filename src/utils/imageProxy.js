const API_URL = import.meta.env.VITE_API_URL || 'https://better-grg6.onrender.com';

/**
 * Chuyển URL ảnh gốc sang URL qua image proxy của server.
 * - Nếu URL đã là ảnh local (data:, blob:, /...) thì dùng thẳng.
 * - Nếu là URL bên ngoài → route qua /api/image-proxy để bypass hotlink.
 */
export function proxyImage(url) {
  if (!url) return '';
  if (
    url.startsWith('data:') ||
    url.startsWith('blob:') ||
    url.startsWith('/') ||
    url.includes('localhost') ||
    url.includes('placehold.co') ||
    url.includes('unsplash.com')
  ) {
    return url;
  }
  return `${API_URL}/api/image-proxy?url=${encodeURIComponent(url)}`;
}

