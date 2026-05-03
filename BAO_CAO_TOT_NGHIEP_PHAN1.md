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

Trong bối cảnh nền kinh tế số và cuộc cách mạng công nghiệp lần thứ tư đang phát triển mạnh mẽ tại Việt Nam, thị trường thiết bị điện tử tiêu dùng – đặc biệt là điện thoại thông minh và máy tính xách tay – đang chứng kiến sự tăng trưởng mạnh mẽ cả về số lượng sản phẩm lẫn nhu cầu mua sắm. Mỗi năm, hàng trăm mẫu thiết bị mới được tung ra từ các thương hiệu hàng đầu như Apple, Samsung, Xiaomi, ASUS, Dell, Lenovo, HP... tạo nên một "rừng" lựa chọn khổng lồ cho người tiêu dùng.

Theo báo cáo của IDC Vietnam năm 2024, thị trường điện thoại thông minh Việt Nam đạt trên **13,5 triệu chiếc** bán ra trong năm 2023, trong khi thị trường máy tính cá nhân đạt **3,2 triệu đơn vị**. Nghịch lý đáng chú ý là dù lượng tiêu thụ tăng mạnh, tỷ lệ người dùng cảm thấy "mua sai sản phẩm" vẫn ở mức cao – ước tính khoảng 34% trong vòng 6 tháng đầu sử dụng. Nguyên nhân cốt lõi nằm ở chỗ người tiêu dùng thiếu một công cụ đủ mạnh, đủ trực quan và đủ thông minh để hỗ trợ ra quyết định.

Nhìn nhận thực trạng cụ thể, người tiêu dùng hiện đang phải đối mặt với các vấn đề sau:

**1. Thông tin phân tán và thiếu tin cậy:**
Để tìm hiểu về một sản phẩm, người dùng thường phải lướt qua nhiều tab trình duyệt, xem nhiều video YouTube, đọc nhiều diễn đàn công nghệ. Chất lượng thông tin không đồng đều, nhiều nguồn bị chi phối bởi lợi ích thương mại hoặc quảng cáo ngầm. Điều này dẫn đến quyết định mua hàng thiếu chính xác và mất nhiều thời gian.

**2. Thiếu công cụ so sánh đa chiều và trực quan:**
Các nền tảng thương mại điện tử lớn tại Việt Nam như Thegioididong.com hay CellphoneS.com.vn dù có tính năng so sánh sản phẩm, nhưng kết quả chỉ là bảng liệt kê thông số kỹ thuật đơn giản theo hàng ngang. Người dùng phổ thông gặp khó khăn trong việc đọc và diễn giải ý nghĩa của các con số kỹ thuật để đưa ra nhận định rõ ràng về ưu và nhược điểm của từng sản phẩm.

**3. Vắng bóng tư vấn cá nhân hóa theo ngôn ngữ tự nhiên:**
Nhu cầu của mỗi người dùng là rất đa dạng và cụ thể: "Tôi cần điện thoại chụp ảnh tốt, pin trâu, giá dưới 12 triệu" hay "Laptop học đồ họa, nhẹ dưới 1,5kg, dưới 20 triệu". Hiện chưa có nền tảng nào tại Việt Nam cho phép người dùng đặt câu hỏi theo ngôn ngữ tự nhiên như vậy và nhận lại gợi ý sản phẩm phù hợp một cách tức thì.

**4. Thiếu cộng đồng đánh giá thực tế và hệ thống khuyến khích đóng góp:**
Người mua hàng hiện đại không chỉ tin vào thông số kỹ thuật trên giấy mà cần ý kiến từ những người đã thực sự sử dụng sản phẩm. Một nền tảng cộng đồng kết hợp đánh giá từ người dùng thực tế và cơ chế khuyến khích tham gia (như tích điểm) sẽ tạo ra nguồn thông tin đáng tin cậy và bền vững hơn.

Từ những bất cập thiết thực trên, đề tài **"Thiết kế và xây dựng website tư vấn và so sánh thiết bị công nghệ – Better"** được hình thành nhằm xây dựng một nền tảng web ứng dụng toàn diện, giải quyết đồng thời tất cả các vấn đề nêu trên trong một hệ thống thống nhất, hiện đại và thực sự hữu ích cho người tiêu dùng Việt Nam.

---

### 1.2 Mục Tiêu và Phạm Vi Đề Tài

#### 1.2.1 Mục Tiêu Đề Tài

Đề tài đặt ra hai nhóm mục tiêu song song: mục tiêu về mặt học thuật và mục tiêu về sản phẩm thực tế.

**Mục tiêu học thuật:**

- Nghiên cứu, nắm vững và vận dụng thành thạo kiến trúc phát triển web đầy đủ ngăn xếp (**Full-Stack MERN**: MongoDB, Express.js, React.js, Node.js) vào một dự án phần mềm hoàn chỉnh, từ khâu phân tích yêu cầu đến triển khai thực tế.
- Thực hành thiết kế cơ sở dữ liệu **NoSQL (MongoDB)** với mô hình tài liệu (Document Model) linh hoạt thông qua thư viện Mongoose ODM, phù hợp với cấu trúc dữ liệu đa dạng của nhiều loại sản phẩm công nghệ.
- Triển khai hệ thống bảo mật theo chuẩn công nghiệp hiện đại: xác thực bằng **JSON Web Token (JWT)** và mã hóa mật khẩu không thể đảo ngược bằng **bcryptjs**.
- Tiếp cận và áp dụng quy trình **DevOps thực tế** bao gồm: đóng gói ứng dụng bằng Docker, tự động hóa kiểm thử và triển khai qua GitHub Actions CI/CD, và hosting trên nền tảng đám mây.

**Mục tiêu sản phẩm:**

- Xây dựng giao diện người dùng hiện đại theo phong cách **Glassmorphism + Dark Mode**, đáp ứng tiêu chuẩn thiết kế cao cấp với hệ thống CSS Custom Properties nhất quán toàn ứng dụng.
- Phát triển hệ thống **API RESTful** đầy đủ phục vụ các nghiệp vụ cốt lõi: quản lý sản phẩm (Products), bài viết (Posts), bình luận (Reviews) và tài khoản người dùng (Users).
- Xây dựng chức năng **so sánh đa chiều** tối đa 4 thiết bị cùng lúc, trực quan hóa bằng **biểu đồ Radar Chart** động từ thư viện Recharts với 5 trục đánh giá: Hiệu Năng, Màn Hình, Camera, Pin & Sạc, Thiết Kế.
- Triển khai **hệ thống phân quyền 3 cấp** hoàn chỉnh: Khách vãng lai (Guest) – Thành viên (Member) – Quản trị viên (Admin), được kiểm soát bởi JWT Middleware trên mọi route yêu cầu xác thực.
- Hoàn thiện **module AI Advisor** cho phép người dùng nhập câu hỏi theo ngôn ngữ tự nhiên và nhận lại gợi ý sản phẩm phù hợp, có cấu trúc rõ ràng với phương án ưu tiên và phương án dự phòng.
- Tích hợp **hệ thống Gamification** với điểm kinh nghiệm (XP Points): mỗi lần thành viên đăng bình luận sản phẩm, hệ thống tự động cộng điểm và lưu vào cơ sở dữ liệu, khuyến khích cộng đồng đóng góp nội dung tích cực.

#### 1.2.2 Phạm Vi Đề Tài

**Phạm vi chức năng hệ thống:**

Hệ thống Better tập trung vào hai danh mục sản phẩm công nghệ phổ biến nhất tại thị trường Việt Nam:

| Danh mục | Mô tả |
|----------|-------|
| Điện thoại thông minh | Các mẫu flagship và tầm trung từ Apple, Samsung, Xiaomi, OPPO... |
| Máy tính xách tay (Laptop) | Laptop văn phòng, laptop đồ họa, laptop gaming từ ASUS, Dell, HP, Apple... |

Các chức năng chính được triển khai:
- Xem danh sách và chi tiết sản phẩm (thông số kỹ thuật đầy đủ, video YouTube review nhúng trực tiếp).
- So sánh đồng thời 2 đến 4 thiết bị với biểu đồ Radar đa lớp.
- Tư vấn sản phẩm thông qua module AI theo ngôn ngữ tự nhiên.
- Đọc tin tức và bài đánh giá sản phẩm (NewsFeed).
- Tìm kiếm, lọc sản phẩm theo danh mục và mức giá (StoreSection).
- Đăng ký, đăng nhập tài khoản; quản lý hồ sơ cá nhân, Wishlist và điểm XP.
- Bảng quản trị Admin (AdminPanel) với đầy đủ quyền CRUD cho sản phẩm và bài viết.

**Phạm vi triển khai:**

| Thành phần | Nền tảng |
|------------|----------|
| Cơ sở dữ liệu | MongoDB Atlas (Cloud NoSQL Database) |
| Backend API | Render.com (Cloud Server, Node.js) |
| Frontend | Vercel (CDN toàn cầu, React SPA) |
| Containerization | Docker + Docker Compose |
| CI/CD | GitHub Actions |

**Giới hạn nghiên cứu:**

- **Module AI:** Phiên bản hiện tại áp dụng thuật toán Rule-based NLP (lọc theo từ khóa và ngân sách), không tích hợp mô hình ngôn ngữ lớn (LLM) như GPT hay Gemini API do yêu cầu chi phí vận hành. Việc tích hợp LLM là định hướng phát triển ưu tiên trong phiên bản tiếp theo.
- **Hệ thống thanh toán:** Không tích hợp cổng thanh toán trực tuyến; người dùng được điều hướng sang Shopee/TikTok Shop để thực hiện giao dịch thực tế.
- **Phạm vi dữ liệu:** Dữ liệu sản phẩm được nhập thủ công bởi Admin hoặc thông qua script seed, chưa có cơ chế thu thập dữ liệu tự động (web scraping) theo thời gian thực.

---

### 1.3 Định Hướng Giải Pháp

Sau khi phân tích toàn diện các vấn đề ở mục 1.1 và xác định rõ mục tiêu ở mục 1.2, đề tài đề xuất xây dựng nền tảng **Better** với các định hướng giải pháp cụ thể như sau:

#### 1.3.1 Định Hướng Kiến Trúc Công Nghệ

Hệ thống được xây dựng theo mô hình **MERN Stack Full-Stack** với kiến trúc **3 tầng (3-Layer Architecture)** kết hợp mô hình **Client-Server**:

| Tầng | Công nghệ | Vai trò cụ thể |
|------|-----------|----------------|
| **Tầng Trình Bày** (Presentation) | React.js + Vite | Giao diện SPA, xử lý tương tác người dùng |
| **Tầng Xử Lý Nghiệp Vụ** (Business) | Node.js + Express.js | REST API Server, JWT Middleware, xử lý logic |
| **Tầng Dữ Liệu** (Data) | MongoDB Atlas + Mongoose | Lưu trữ 4 collections: Products, Posts, Reviews, Users |
| **Bảo mật** | JWT + bcryptjs | Xác thực token, mã hóa mật khẩu |
| **Biểu đồ** | Recharts | Radar Chart so sánh đa chiều |
| **DevOps** | Docker + GitHub Actions | Containerization & CI/CD Pipeline |
| **Cloud** | Vercel + Render.com | Triển khai Frontend và Backend đám mây |

Điểm nổi bật của kiến trúc MERN là toàn bộ hệ thống sử dụng **một ngôn ngữ lập trình duy nhất – JavaScript** từ giao diện người dùng (React.js) đến logic server (Node.js/Express.js) và định nghĩa cơ sở dữ liệu (Mongoose Schema). Điều này giúp giảm đáng kể sự chuyển đổi ngữ pháp và tăng tính nhất quán của toàn bộ codebase.

Luồng giao tiếp giữa các tầng hoạt động theo nguyên tắc sau:
1. **Frontend (React.js)** gửi HTTP request với Header `Authorization: Bearer <JWT_Token>` đến Backend.
2. **Backend (Express.js)** xác thực JWT qua `authMiddleware`, xử lý nghiệp vụ và truy vấn MongoDB qua Mongoose.
3. **MongoDB Atlas** trả về kết quả dưới dạng JSON document, Backend phản hồi lại Frontend.
4. **React.js** cập nhật giao diện người dùng theo cơ chế Virtual DOM mà không cần tải lại trang.

#### 1.3.2 Định Hướng Thiết Kế Giao Diện (UI/UX)

Giao diện Better được thiết kế theo phong cách **Glassmorphism Dark Mode** – một xu hướng thiết kế web cao cấp và hiện đại:

- **Dark Mode:** Nền tối chủ đạo (`#0f1117`) kết hợp với tone màu xanh-tím (`#3b82f6` / `#a855f7`), tạo cảm giác chuyên nghiệp và giảm mỏi mắt khi sử dụng lâu dài.
- **Glassmorphism:** Các thẻ nội dung sử dụng hiệu ứng kính mờ thông qua CSS `backdrop-filter: blur(20px)` và nền trong suốt `rgba(255,255,255,0.05)`, tạo chiều sâu thẩm mỹ độc đáo.
- **Micro-animations:** Các hiệu ứng chuyển động nhỏ (fade-in, hover scale, gradient shift) được áp dụng thông qua CSS transitions, giúp giao diện "sống động" và tăng trải nghiệm tương tác.
- **Responsive Design:** Giao diện tương thích từ màn hình desktop lớn (1920px) đến tablet và điện thoại di động (390px) thông qua CSS Grid và Media Queries.
- **Component-based Architecture:** Mỗi phần giao diện được tách thành React Component độc lập (`Header`, `ProductCard`, `CompareSection`, `AIAnalyzer`, `StoreSection`, `AdminPanel`...), đảm bảo khả năng tái sử dụng và bảo trì dễ dàng.

#### 1.3.3 Định Hướng Các Tính Năng Cốt Lõi

**a) So sánh đa chiều với biểu đồ Radar Chart:**

Thay thế bảng thống số thuần túy khó đọc bằng biểu đồ **Radar Chart** (biểu đồ mạng nhện) từ thư viện Recharts. Biểu đồ trực quan hóa điểm số kỹ thuật theo 5 trục: Hiệu Năng – Màn Hình – Camera – Pin & Sạc – Thiết Kế. Người dùng có thể so sánh tối đa **4 thiết bị** cùng lúc chỉ trong một biểu đồ duy nhất, với mỗi thiết bị hiển thị bằng màu sắc riêng biệt.

**b) Module AI Advisor – Tư vấn theo ngôn ngữ tự nhiên:**

Module AI xử lý câu hỏi của người dùng qua các bước:
1. **Phân loại danh mục:** Phát hiện từ khóa "điện thoại" / "laptop" trong câu nhập.
2. **Trích xuất ngân sách:** Dùng biểu thức chính quy tìm và chuyển đổi con số ngân sách từ văn bản.
3. **Lọc và xếp hạng:** Lọc danh sách sản phẩm từ database theo danh mục và khoảng giá phù hợp.
4. **Sinh phản hồi có cấu trúc:** Trả về "Phương án ưu tiên" (phù hợp nhất) và "Phương án dự phòng" (thay thế) kèm lý do giải thích rõ ràng.

**c) Hệ thống Gamification – Điểm XP:**

Mỗi lần thành viên đăng bình luận đánh giá sản phẩm, Backend tự động cộng **10 điểm XP** vào tài khoản người dùng thông qua lệnh `$inc` của MongoDB. Điểm XP được hiển thị trực tiếp trên hồ sơ cá nhân, tạo động lực khuyến khích người dùng đóng góp nội dung thực tế và có giá trị cho cộng đồng.

**d) Hệ thống phân quyền 3 cấp với JWT Middleware:**

Backend triển khai middleware `authMiddleware` xác thực JWT trên mọi route nhạy cảm. Hệ thống phân biệt rõ ràng ba vai trò: Khách vãng lai chỉ xem; Thành viên có thể bình luận và quản lý Wishlist; Quản trị viên có toàn quyền CRUD trên sản phẩm và bài viết.

---

### 1.4 Bố Cục Đồ Án

Báo cáo đồ án được tổ chức thành các chương với nội dung và mối liên hệ logic như sau:

**Chương 1: Tổng quan về đề tài và hệ thống** *(Chương hiện tại)*

Trình bày toàn bộ bối cảnh và cơ sở lý luận của đề tài, bao gồm: phân tích vấn đề thực tiễn mà hệ thống Better hướng đến giải quyết; xác định mục tiêu học thuật và mục tiêu sản phẩm; xác định phạm vi chức năng và giới hạn nghiên cứu; và trình bày định hướng giải pháp về kiến trúc công nghệ, thiết kế giao diện và các tính năng cốt lõi.

**Chương 2: Các công cụ hỗ trợ xây dựng website**

Trình bày cơ sở lý thuyết và các công nghệ được sử dụng trong quá trình phát triển hệ thống, bao gồm: kiến trúc MERN Stack (MongoDB/Mongoose, Express.js, React.js/Vite, Node.js); cơ chế bảo mật JWT và bcryptjs; thư viện biểu đồ Recharts; công cụ DevOps (Docker, GitHub Actions); và các nền tảng triển khai đám mây (Vercel, Render.com, MongoDB Atlas). Chương này cung cấp nền tảng lý luận cho các thiết kế và quyết định kỹ thuật được trình bày ở các chương sau.

**Chương 3: Phân tích thiết kế hệ thống**

Trình bày toàn bộ kết quả phân tích và thiết kế hệ thống, bao gồm: phân tích yêu cầu chức năng và phi chức năng; đặc tả Use Case với danh sách 27 ca sử dụng; thiết kế cơ sở dữ liệu với 4 Mongoose Schema (Product, Post, Review, User); thiết kế 14 API Endpoint RESTful; thiết kế cấu trúc cây Component React; và thiết kế giao diện người dùng.

**Kết luận và hướng phát triển**

Tổng kết các kết quả đạt được so với mục tiêu đề ra, đánh giá ưu điểm và hạn chế còn tồn tại của hệ thống, và đề xuất các định hướng phát triển tiếp theo như: tích hợp LLM (Gemini/GPT API) cho module AI, bổ sung thêm danh mục sản phẩm (máy tính bảng, tai nghe, đồng hồ thông minh), và xây dựng ứng dụng di động (React Native).

**Tài liệu tham khảo**

Danh sách các tài liệu kỹ thuật chính thức, sách giáo trình, bài báo khoa học và nguồn trực tuyến được tham khảo trong quá trình thực hiện đề tài, bao gồm tài liệu từ ReactJS, Node.js, MongoDB, Docker, JWT và các tài liệu liên quan.

---
