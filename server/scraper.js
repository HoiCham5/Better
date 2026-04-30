const puppeteer = require('puppeteer');

async function scrapeProductData(keyword) {
  let browser;
  try {
    console.log(`Bắt đầu cào dữ liệu cho: ${keyword}...`);
    // Cấu hình Puppeteer để chạy mượt trên Server Render
    browser = await puppeteer.launch({
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    
    // Giả lập người dùng thật
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Truy cập CellphoneS
    const url = `https://cellphones.com.vn/catalogsearch/result?q=${encodeURIComponent(keyword)}`;
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Chờ kết quả render
    await page.waitForSelector('.product-info, .product-item-info', { timeout: 15000 }).catch(() => {});
    
    // Trích xuất dữ liệu
    const product = await page.evaluate(() => {
      // Tìm phần tử sản phẩm đầu tiên
      const el = document.querySelector('.product-info, .product-item-info');
      if (!el) return null;
      
      const name = el.querySelector('.product-name, .product__name')?.innerText?.trim() || '';
      const price = el.querySelector('.price, .product__price--show')?.innerText?.trim() || '';
      const image = el.querySelector('img')?.getAttribute('data-src') || el.querySelector('img')?.getAttribute('src') || '';
      
      return { name, price, image };
    });
    
    console.log("Scrape Result:", product);
    return product;
    
  } catch (error) {
    console.error('Lỗi khi Scraping:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = { scrapeProductData };
