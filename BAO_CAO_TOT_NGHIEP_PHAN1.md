# BÁO CÁO ĐỒ ÁN TỐT NGHIỆP
## THIẾT KẾ VÀ XÂY DỰNG WEBSITE TƯ VẤN VÀ SO SÁNH THIẾT BỊ CÔNG NGHỆ (BETTER)

---

**Ngành:** Công nghệ Thông tin

**Chuyên ngành:** Kỹ thuật phần mềm

**Giảng viên hướng dẫn:** ............................................

**Sinh viên thực hiện:** ............................................

**MSSV:** ............................................

**Học kỳ – Năm học:** Học kỳ II – 2025-2026

---

## DANH MỤC TỪ VIẾT TẮT

| Từ viết tắt | Giải thích đầy đủ |
|-------------|-------------------|
| API | Application Programming Interface – Giao diện lập trình ứng dụng |
| BSON | Binary JSON – Định dạng dữ liệu nhị phân của MongoDB |
| CDN | Content Delivery Network – Mạng phân phối nội dung |
| CI/CD | Continuous Integration / Continuous Deployment |
| CORS | Cross-Origin Resource Sharing – Chia sẻ tài nguyên giữa các nguồn gốc |
| CRUD | Create – Read – Update – Delete |
| CSS | Cascading Style Sheets |
| DB | Database – Cơ sở dữ liệu |
| ERD | Entity Relationship Diagram – Sơ đồ thực thể quan hệ |
| FCP | First Contentful Paint – Thời gian hiển thị nội dung đầu tiên |
| HTML | HyperText Markup Language |
| HTTP | HyperText Transfer Protocol |
| HTTPS | HyperText Transfer Protocol Secure |
| JS | JavaScript |
| JSX | JavaScript XML – Cú pháp mở rộng của JavaScript dùng trong React |
| JWT | JSON Web Token – Chuẩn xác thực dạng token |
| MERN | MongoDB – Express.js – React.js – Node.js |
| NLP | Natural Language Processing – Xử lý ngôn ngữ tự nhiên |
| NoSQL | Not Only SQL – Hệ quản trị CSDL phi quan hệ |
| npm | Node Package Manager – Trình quản lý gói của Node.js |
| ODM | Object Document Mapper |
| ORM | Object Relational Mapper |
| REST | Representational State Transfer |
| SPA | Single Page Application – Ứng dụng một trang |
| SQL | Structured Query Language |
| SSL | Secure Sockets Layer |
| TLS | Transport Layer Security |
| TTI | Time To Interactive – Thời gian tương tác |
| UC | Use Case – Ca sử dụng |
| UI | User Interface – Giao diện người dùng |
| URL | Uniform Resource Locator |
| UX | User Experience – Trải nghiệm người dùng |
| XP | Experience Points – Điểm kinh nghiệm (Gamification) |
| XSS | Cross-Site Scripting |

---

## CHƯƠNG 1. TỔNG QUAN VỀ ĐỀ TÀI VÀ HỆ THỐNG

### 1.1 Đặt Vấn Đề

Trong thời đại công nghệ số phát triển nhanh chóng, thị trường thiết bị điện tử tiêu dùng tại Việt Nam đang trở nên vô cùng sôi động và phong phú. Mỗi năm, hàng trăm mẫu điện thoại thông minh và laptop mới được tung ra thị trường từ các thương hiệu lớn như Apple, Samsung, Xiaomi, ASUS, Dell, Lenovo, HP... Người tiêu dùng đứng trước bài toán khó: **làm thế nào để chọn được thiết bị phù hợp nhất với nhu cầu và ngân sách của bản thân?**

Thực tế hiện nay cho thấy một số vấn đề nghiêm trọng:

**1. Thông tin phân tán và thiếu tin cậy:**
Người dùng phải lướt qua hàng chục trang web, diễn đàn, video YouTube để thu thập thông tin. Chất lượng thông tin không đồng đều, nhiều nguồn bị ảnh hưởng bởi quảng cáo hoặc lợi ích thương mại.

**2. Thiếu công cụ so sánh đa chiều:**
Các trang web thương mại điện tử hiện tại (Thegioididong, CellphoneS...) có tính năng so sánh nhưng chỉ dừng lại ở bảng thông số đơn giản, thiếu trực quan hóa đa chiều để người dùng dễ dàng nhận thấy ưu/nhược điểm từng thiết bị.

**3. Không có tư vấn cá nhân hóa:**
Người dùng không thể đặt câu hỏi theo nhu cầu thực tế ("Tôi cần điện thoại chụp ảnh đẹp, dùng bền, giá dưới 15 triệu") và nhận được câu trả lời phù hợp. Hiện chưa có nền tảng nào tại Việt Nam tích hợp tư vấn thông minh theo ngôn ngữ tự nhiên.

**4. Thiếu cộng đồng đánh giá thực tế:**
Người mua hàng cần ý kiến từ người dùng thực tế, không chỉ từ các chuyên gia kỹ thuật. Một nền tảng cộng đồng kết hợp đánh giá chuyên sâu và bình luận từ người dùng thực sẽ rất có giá trị.

Từ những bất cập trên, đề tài **"Thiết kế và xây dựng website tư vấn và so sánh thiết bị công nghệ – Better"** ra đời nhằm giải quyết đồng thời các vấn đề trên trong một nền tảng web ứng dụng thống nhất, hiện đại.

---

### 1.2 Mục Tiêu và Phạm Vi Đề Tài

#### 1.2.1 Mục Tiêu Đề Tài

**Mục tiêu học thuật:**
- Nghiên cứu và ứng dụng kiến trúc phát triển web full-stack **MERN Stack** (MongoDB, Express.js, React.js, Node.js) vào một dự án phần mềm hoàn chỉnh.
- Thực hành thiết kế cơ sở dữ liệu **NoSQL (MongoDB)** với mô hình dữ liệu linh hoạt phù hợp nhiều loại sản phẩm.
- Triển khai hệ thống bảo mật **JWT + bcryptjs** theo chuẩn ứng dụng web hiện đại.
- Áp dụng quy trình **DevOps thực tế**: Docker containerization, CI/CD với GitHub Actions, triển khai đám mây.

**Mục tiêu sản phẩm:**
- Xây dựng giao diện người dùng (UI) hiện đại theo phong cách **Glassmorphism + Dark Mode**, đáp ứng tiêu chuẩn thiết kế cao cấp.
- Phát triển **API RESTful** đầy đủ với 14 endpoint phục vụ các nghiệp vụ: quản lý sản phẩm, bài viết, người dùng, bình luận.
- Tích hợp **biểu đồ Radar Chart** động để so sánh đa chiều tối đa 4 thiết bị cùng lúc.
- Xây dựng **hệ thống phân quyền 3 cấp**: Khách vãng lai, Thành viên, Quản trị viên.
- Hoàn thiện **module AI Advisor** tư vấn thiết bị theo ngôn ngữ tự nhiên.
- Tích hợp **hệ thống Gamification** với điểm kinh nghiệm XP để khuyến khích tương tác cộng đồng.

#### 1.2.2 Phạm Vi Đề Tài

**Phạm vi chức năng:**
- Hệ thống quản lý 2 loại sản phẩm chính: **Điện thoại thông minh** và **Laptop**.
- Chức năng so sánh đồng thời 2-4 thiết bị với biểu đồ Radar trực quan.
- Module AI tư vấn sản phẩm dựa trên phân tích ngôn ngữ tự nhiên (Rule-based NLP).
- Hệ thống tin tức và bài đánh giá sản phẩm.
- Bảng quản trị Admin với đầy đủ quyền CRUD.
- Hệ thống xác thực đa phương thức: Email/Password + Google OAuth.

**Phạm vi triển khai:**
- Cơ sở dữ liệu lưu trữ trên **MongoDB Atlas** (Cloud Database).
- Frontend triển khai trên **Vercel** (CDN toàn cầu).
- Backend triển khai trên **Render.com** (Cloud Server).

**Giới hạn nghiên cứu:**
- Module AI trong phiên bản hiện tại sử dụng thuật toán lọc và phân tích ngôn ngữ tự nhiên đơn giản (Rule-based), không tích hợp mô hình ngôn ngữ lớn (LLM) do yêu cầu chi phí vận hành. Đây là hướng phát triển trong phiên bản tiếp theo.
- Hệ thống thanh toán trực tuyến chưa được tích hợp; thay vào đó, người dùng được điều hướng đến Shopee/TikTok Shop để thực hiện giao dịch.

---

### 1.3 Định Hướng Giải Pháp

Sau khi phân tích các vấn đề và nhu cầu thực tế, nhóm đề xuất xây dựng nền tảng **Better** với định hướng giải pháp như sau:

#### 1.3.1 Kiến Trúc Công Nghệ

Hệ thống được xây dựng theo mô hình **MERN Stack Full-Stack**, bao gồm:

| Tầng | Công nghệ | Vai trò |
|------|-----------|---------|
| Frontend | React.js + Vite | Giao diện người dùng, SPA |
| Backend | Node.js + Express.js | REST API Server |
| Database | MongoDB Atlas | Lưu trữ dữ liệu NoSQL |
| Authentication | JWT + bcryptjs | Xác thực và bảo mật |
| DevOps | Docker + GitHub Actions | Containerization & CI/CD |
| Cloud | Vercel + Render.com | Triển khai đám mây |

Kiến trúc này cho phép toàn bộ hệ thống sử dụng một ngôn ngữ lập trình duy nhất (JavaScript/JSON) từ frontend đến backend và database, giúp tăng tính nhất quán và giảm độ phức tạp kỹ thuật.

#### 1.3.2 Định Hướng Thiết Kế UI/UX

- **Dark Mode + Glassmorphism**: Giao diện tối cao cấp với hiệu ứng kính mờ (backdrop-filter: blur), tạo cảm giác hiện đại và premium.
- **Micro-animations**: Các hiệu ứng chuyển động nhỏ (fade-in, hover scale, gradient shift) giúp giao diện "sống động" và tăng trải nghiệm người dùng.
- **Responsive Design**: Giao diện tương thích từ desktop (1920px) đến tablet và mobile (390px).
- **Component-based Architecture**: Mỗi phần giao diện là một React Component độc lập, dễ bảo trì và tái sử dụng.

#### 1.3.3 Định Hướng Tính Năng Cốt Lõi

**So sánh đa chiều với Radar Chart:**
Thay vì bảng thống số thuần túy, Better sử dụng biểu đồ Radar (mạng nhện) của thư viện Recharts để trực quan hóa điểm số kỹ thuật theo 5 chiều: Hiệu Năng, Màn Hình, Camera, Pin & Sạc, Thiết Kế. Người dùng có thể so sánh tối đa 4 thiết bị cùng lúc chỉ trong một biểu đồ duy nhất.

**AI Advisor dựa trên Rule-based NLP:**
Module AI phân tích câu hỏi tự nhiên của người dùng, trích xuất danh mục sản phẩm và ngân sách, sau đó lọc và xếp hạng sản phẩm phù hợp nhất. Kết quả trả về theo định dạng có cấu trúc rõ ràng với "Phương án ưu tiên" và "Phương án dự phòng".

**Gamification (Hệ thống điểm XP):**
Mỗi lần thành viên viết bình luận sản phẩm, hệ thống tự động cộng 10 điểm XP vào tài khoản. Điểm XP được hiển thị trên hồ sơ cá nhân, khuyến khích người dùng đóng góp nội dung tích cực.

---

### 1.4 Bố Cục Đồ Án

Báo cáo đồ án được tổ chức thành các chương như sau:

**Chương 1: Tổng quan về đề tài và hệ thống**
Giới thiệu bối cảnh, vấn đề cần giải quyết, mục tiêu, phạm vi và định hướng giải pháp của đề tài.

**Chương 2: Các công cụ hỗ trợ xây dựng website**
Trình bày cơ sở lý thuyết và các công nghệ, thư viện, công cụ được sử dụng trong quá trình phát triển hệ thống, bao gồm MERN Stack, bảo mật JWT, biểu đồ Recharts và quy trình DevOps.

**Chương 3: Phân tích thiết kế hệ thống**
Trình bày kết quả khảo sát hiện trạng, phân tích yêu cầu chức năng và phi chức năng, mô hình hóa hệ thống bằng các biểu đồ UML (Use Case, Sequence, Activity, Class, Deployment), thiết kế cơ sở dữ liệu và giao diện người dùng.

**Kết luận và hướng phát triển**
Tổng kết kết quả đạt được, hạn chế và định hướng phát triển trong tương lai.

**Tài liệu tham khảo**
Danh sách các tài liệu, sách, bài báo và nguồn trực tuyến được tham khảo trong quá trình thực hiện đề tài.

---
