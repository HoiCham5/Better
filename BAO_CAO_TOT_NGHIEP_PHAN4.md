## CHƯƠNG 4. KẾT QUẢ VÀ THẢO LUẬN

---

### 4.1. Mô Tả Công Việc Đã Tiến Hành

Trong quá trình thực hiện đồ án, các công việc đã được tiến hành theo đúng kế hoạch đề ra, bao gồm các giai đoạn sau:

1. **Khảo sát và thu thập yêu cầu:**
   - Nghiên cứu các nền tảng so sánh công nghệ hiện có (như Versus, GSMArena, TheGioiDiDong, FPTShop) để xác định các tính năng cốt lõi cần thiết cho một hệ thống so sánh hiện đại.
   - Thu thập dữ liệu thông số kỹ thuật thực tế của các dòng điện thoại và laptop phổ biến trên thị trường để xây dựng bộ dữ liệu mẫu (seed data).

2. **Phân tích và thiết kế hệ thống:**
   - Xây dựng biểu đồ Use Case, Activity, Sequence và Class diagram để làm rõ luồng nghiệp vụ.
   - Thiết kế kiến trúc hệ thống theo mô hình Client-Server sử dụng MERN Stack (MongoDB, Express.js, React.js, Node.js).
   - Thiết kế cơ sở dữ liệu MongoDB với các collection chính: `Users`, `Products`, `Posts`, `Reviews`.

3. **Phát triển giao diện người dùng (Frontend):**
   - Xây dựng giao diện bằng React.js kết hợp với Vite.
   - Thiết kế UI/UX theo phong cách Glassmorphism và Dark Mode hiện đại, sử dụng CSS thuần kết hợp các biến màu (CSS Variables) để dễ dàng chuyển đổi giao diện sáng/tối.
   - Xây dựng các component chính: `Header`, `VersusHero`, `ProductCard`, `CompareSection`, `AIAnalyzer`, `StoreSection`, `AdminPanel`.
   - Tích hợp thư viện `Recharts` để vẽ biểu đồ Radar Chart trực quan hoá thông số so sánh đa chiều.

4. **Phát triển máy chủ và API (Backend):**
   - Xây dựng RESTful API bằng Node.js và Express.js.
   - Cài đặt hệ thống xác thực và phân quyền người dùng bảo mật với JWT (JSON Web Token) và tích hợp đăng nhập nhanh qua Google OAuth (Firebase).
   - Tích hợp trí tuệ nhân tạo (thông qua Pollinations AI) để tự động phân tích thông số, điền dữ liệu sản phẩm (cho Admin) và đưa ra lời khuyên mua sắm (cho Khách hàng).

5. **Kiểm thử và triển khai:**
   - Kiểm thử thủ công các chức năng cốt lõi: CRUD sản phẩm/bài viết, so sánh, lọc, bình luận, tính điểm XP.
   - Cấu hình Docker (`Dockerfile`, `docker-compose.yml`) để đóng gói ứng dụng.
   - Triển khai (Deployment) thử nghiệm trên môi trường cloud.

---

### 4.2. Đánh Giá Và Thảo Luận Kết Quả Đạt Được

**1. Những kết quả đã đạt được:**
- **Về mặt chức năng:** Hệ thống đã hoàn thiện và đáp ứng đầy đủ các yêu cầu chức năng đặt ra ban đầu. Tính năng cốt lõi là "So sánh đa chiều" hoạt động mượt mà, cho phép người dùng đối chiếu trực quan tối đa 4 thiết bị cùng lúc.
- **Về trải nghiệm người dùng (UX/UI):** Giao diện được thiết kế mang tính thẩm mỹ cao, tốc độ phản hồi nhanh nhờ cơ chế SPA (Single Page Application) của React, mang lại cảm giác cao cấp và chuyên nghiệp.
- **Về tính đổi mới:** Việc tích hợp AI vào quy trình (AI Tư Vấn cho người dùng và AI Generator cho Admin) là một điểm sáng, giúp tự động hóa quá trình nhập liệu và mang lại giá trị gia tăng lớn cho quyết định mua sắm của khách hàng.
- **Về sự tương tác (Gamification):** Hệ thống điểm kinh nghiệm (XP) và cấp bậc hoạt động trơn tru, tạo động lực cho người dùng đăng ký tài khoản và để lại đánh giá chất lượng.

**2. Hạn chế và hướng phát triển trong tương lai:**
- **Nguồn dữ liệu:** Dữ liệu sản phẩm hiện tại được nhập thủ công hoặc qua AI sinh ra ở mức độ tham khảo. Hướng phát triển tiếp theo là xây dựng các công cụ thu thập dữ liệu (Crawler/Scraper) tự động chạy định kỳ để lấy thông số từ các trang thương mại điện tử lớn, đảm bảo tính cập nhật theo thời gian thực về giá cả và hàng hóa.
- **Khả năng của AI:** Module AI hiện tại sử dụng prompt cơ bản. Có thể nâng cấp lên hệ thống RAG (Retrieval-Augmented Generation) kết hợp Vector Database để AI có thể đọc và hiểu chính xác dữ liệu từ kho sản phẩm khổng lồ thay vì chỉ phụ thuộc vào kiến thức có sẵn của LLM.
- **Tối ưu hóa SEO:** Vì là React SPA, khả năng index của các công cụ tìm kiếm (Google Bot) chưa thực sự tốt nhất. Trong tương lai, dự án có thể chuyển đổi sang Next.js (Server-Side Rendering) để tối ưu hóa SEO, giúp website tiếp cận được lượng lớn khách hàng tự nhiên.

---

### 4.3. Giao Diện Người Dùng

Hệ thống Better được xây dựng theo kiến trúc Single Page Application (SPA) với React.js, toàn bộ giao diện nằm trong một trang duy nhất và chuyển đổi nội dung thông qua cơ chế tab và modal, không reload trang. Phần này trình bày chi tiết danh sách 19 màn hình giao diện theo 3 nhóm người dùng: **Khách vãng lai (Guest)**, **Thành viên (Member)** và **Quản trị viên (Admin)** để làm tài liệu đối chiếu.

---

#### 4.1.1. Giao Diện Dành Cho Khách Vãng Lai (Guest)

---

##### Giao diện 1 – Thanh Điều Hướng (Header)

> **[CHỤP ẢNH]:** Thanh Header toàn chiều ngang khi chưa đăng nhập (trạng thái Guest)

**Mô tả chức năng:**

Thanh điều hướng cố định (sticky) ở đầu trang, hiển thị xuyên suốt toàn bộ phiên sử dụng. Header bao gồm:

- **Logo "Better"** ở góc trái: nhấn để quay về trang chủ (tab Điện Thoại).
- **Các tab điều hướng chính:** Điện Thoại | Laptop | So Sánh | AI Tư Vấn | Tin Tức | Cửa Hàng – mỗi tab chuyển nội dung chính ngay lập tức không tải lại trang.
- **Nút chuyển Dark/Light Mode** (biểu tượng mặt trời/trăng): lưu trạng thái vào `localStorage`.
- **Nút "Đăng Nhập"**: mở modal `AuthModal` để đăng ký hoặc đăng nhập tài khoản.
- Khi Thành viên đăng nhập: nút Đăng Nhập thay bằng **ảnh đại diện + tên người dùng**.
- Khi Admin đăng nhập: xuất hiện thêm **nút "Quản Trị"** (biểu tượng bánh răng).

---

##### Giao diện 2 – Trang Chủ Hero (VersusHero)

> **[CHỤP ẢNH]:** Khu vực Hero toàn màn hình đầu trang với banner so sánh nổi bật

**Mô tả chức năng:**

Đây là khu vực banner đầu tiên người dùng nhìn thấy khi truy cập hệ thống, thiết kế theo phong cách Glassmorphism Dark Mode. Khu vực Hero bao gồm:

- **Tiêu đề lớn:** "Better – So sánh thiết bị thông minh hơn" cùng tagline mô tả hệ thống.
- **Bộ chọn so sánh nhanh:** Hai dropdown cho phép người dùng chọn trực tiếp 2 thiết bị bất kỳ từ danh sách, sau đó nhấn **"So Sánh Ngay"** để chuyển thẳng đến `CompareSection` với 2 thiết bị đã chọn.
- **Danh sách sản phẩm nổi bật** (carousel/grid): hiển thị các thiết bị được Admin đánh dấu `isFeatured = true`, mỗi item có ảnh, tên, giá và nút gọi hành động nhanh.
- **Hiệu ứng gradient và animation**: nền gradient chuyển màu, các phần tử có hiệu ứng fade-in khi cuộn đến.

---

##### Giao diện 3 – Danh Sách Điện Thoại Nổi Bật (Tab "Điện Thoại")

> **[CHỤP ẢNH]:** Tab Điện Thoại với FilterSidebar bên trái và danh sách ProductCard bên phải

**Mô tả chức năng:**

Giao diện chính của tab **Điện Thoại** gồm hai khu vực:

**Thanh lọc FilterSidebar (bên trái):**
- Bộ lọc **Ưu tiên cá nhân**: dropdown chọn tiêu chí quan trọng nhất (Camera / Hiệu năng / Pin / Màn hình / Thiết kế). Khi chọn, các card sản phẩm sẽ hiển thị badge "Phù hợp với bạn" tương ứng.

**Danh sách ProductCard (bên phải):**
- Mỗi card hiển thị: ảnh sản phẩm, tên, thương hiệu, giá bán, badge danh mục và 2 nút hành động:
  - **"Xem Chi Tiết"**: mở modal `ProductDetailsModal`.
  - **"So Sánh"**: thêm sản phẩm vào danh sách so sánh (floating popup góc phải màn hình).
- Nút **"Xem Toàn Bộ Mẫu Điện Thoại Khác →"** dẫn đến tab Cửa Hàng.
- Bên dưới danh sách là khu vực `CompareSection` thu nhỏ cho phép so sánh ngay trong tab.

---

##### Giao diện 4 – Danh Sách Laptop Nổi Bật (Tab "Laptop")

> **[CHỤP ẢNH]:** Tab Laptop với FilterSidebar và danh sách laptop nổi bật

**Mô tả chức năng:**

Tương tự tab Điện Thoại nhưng lọc riêng `category === 'laptop'`. Giao diện hiển thị:

- Danh sách laptop được Admin đánh dấu nổi bật với đầy đủ thông tin.
- `FilterSidebar` với bộ lọc ưu tiên dành riêng cho laptop (CPU / RAM / Màn hình / Pin / Thiết kế).
- Nút **"Xem Toàn Bộ Mẫu Laptop Khác →"** dẫn đến tab Cửa Hàng.
- `CompareSection` laptop phía dưới để so sánh nhanh.

---

##### Giao diện 5 – Modal Chi Tiết Sản Phẩm (ProductDetailsModal)

> **[CHỤP ẢNH]:** Modal chi tiết sản phẩm khi nhấn "Xem Chi Tiết" trên một ProductCard

**Mô tả chức năng:**

Modal overlay hiển thị toàn bộ thông tin kỹ thuật của một sản phẩm:

- **Ảnh sản phẩm** kích thước lớn + tên + thương hiệu + giá bán + badge danh mục.
- **Bảng thông số kỹ thuật** đầy đủ: CPU/Chip, RAM, Bộ nhớ, Màn hình, Camera, Pin, Hệ điều hành, Kết nối...
- **Video YouTube review** nhúng trực tiếp (iframe) bên dưới thông số.
- **Khu vực bình luận** (`CommentSection`): hiển thị danh sách đánh giá từ cộng đồng; Thành viên đăng nhập mới có thể gửi bình luận.
- Nút **"X"** góc trên phải để đóng modal, quay về trang trước đó.

---

##### Giao diện 6 – So Sánh Đa Chiều (Tab "So Sánh" / CompareSection)

> **[CHỤP ẢNH]:** Trang So Sánh với biểu đồ Radar Chart và bảng thông số song song

**Mô tả chức năng:**

Đây là tính năng cốt lõi của hệ thống, cho phép so sánh đồng thời tối đa 4 thiết bị:

- **Khu vực chọn thiết bị**: tối đa 4 ô, mỗi ô có dropdown danh sách sản phẩm. Người dùng chọn thiết bị muốn so sánh.
- **Biểu đồ Radar Chart** (Recharts): vẽ đa giác với 5 trục – Hiệu Năng, Màn Hình, Camera, Pin & Sạc, Thiết Kế. Mỗi thiết bị một màu riêng biệt. Có legend giải thích màu sắc.
- **Bảng thông số song song**: liệt kê từng chỉ số kỹ thuật theo hàng, các thiết bị theo cột. Chỉ số nào tốt hơn được tô màu nổi bật (badge "Better").
- **Nút "Mua Ngay"** dưới mỗi thiết bị: link đến Shopee / TikTok Shop.
- **Phân tích AI tự động**: sau khi chọn đủ thiết bị, hệ thống gọi Pollinations AI API và hiển thị nhận xét phân tích ưu/nhược điểm từng thiết bị.

---

##### Giao diện 7 – Popup Danh Sách So Sánh (ComparePopup)

> **[CHỤP ẢNH]:** Popup nổi góc dưới phải màn hình khi đã chọn ít nhất 1 sản phẩm để so sánh

**Mô tả chức năng:**

Popup cố định (fixed) ở góc dưới-phải màn hình, xuất hiện khi người dùng nhấn "So Sánh" trên bất kỳ ProductCard nào:

- Tiêu đề **"VS – Danh sách so sánh"** với gradient tím-xanh.
- Danh sách các sản phẩm đã chọn (ảnh thumbnail + tên + nút X để bỏ chọn).
- Nút **"So Sánh Ngay (n)"**: kích hoạt khi có ≥ 2 sản phẩm, chuyển sang tab Compare. Bị vô hiệu hóa nếu chỉ chọn 1 sản phẩm.

---

##### Giao diện 8 – Tư Vấn AI (Tab "AI Tư Vấn" / AIAnalyzer)

> **[CHỤP ẢNH]:** Trang AI Tư Vấn với ô nhập câu hỏi và kết quả gợi ý

**Mô tả chức năng:**

Module tư vấn sản phẩm bằng ngôn ngữ tự nhiên:

- **Ô nhập liệu lớn**: người dùng gõ câu hỏi tự do, ví dụ: *"Tôi cần laptop đồ họa nhẹ dưới 25 triệu"*.
- Các **gợi ý câu hỏi nhanh** (chip buttons): ví dụ sẵn để người dùng chọn nhanh.
- Nút **"Tư Vấn Ngay"**: gửi câu hỏi vào module AI xử lý.
- **Kết quả tư vấn có cấu trúc**:
  - *Phương án ưu tiên*: thẻ sản phẩm phù hợp nhất (ảnh + tên + giá + lý do).
  - *Phương án dự phòng*: thẻ sản phẩm thay thế.
  - Nút "Xem Chi Tiết" và "So Sánh" trực tiếp trên kết quả.

---

##### Giao diện 9 – Tin Tức (Tab "Tin Tức" / NewsFeed)

> **[CHỤP ẢNH]:** Tab Tin Tức với danh sách bài viết dạng card

**Mô tả chức năng:**

Khu vực hiển thị bài viết tin tức và đánh giá công nghệ:

- Danh sách bài viết dạng **card lưới**: mỗi card gồm ảnh bìa, tiêu đề, tóm tắt và ngày đăng.
- Sắp xếp theo **thứ tự mới nhất** (id giảm dần).
- Nhấn vào card: mở rộng hoặc hiển thị đầy đủ nội dung bài viết.
- Bài viết do Admin tạo và quản lý từ AdminPanel.

---

##### Giao diện 10 – Cửa Hàng & Tìm Kiếm (Tab "Cửa Hàng" / StoreSection)

> **[CHỤP ẢNH]:** Tab Cửa Hàng với ô tìm kiếm, bộ lọc và danh sách toàn bộ sản phẩm

**Mô tả chức năng:**

Giao diện hiển thị toàn bộ sản phẩm kèm chức năng tìm kiếm và lọc:

- **Ô tìm kiếm theo tên**: lọc real-time phía client, không gọi API lại.
- **Bộ lọc danh mục**: Tất cả / Điện thoại / Laptop (tab buttons).
- **Bộ lọc khoảng giá**: thanh trượt (range slider) từ 0 đến 50 triệu.
- Danh sách **tất cả sản phẩm** dạng grid card với: ảnh, tên, giá, badge danh mục.
- Nút **"Mua Ngay"** trên mỗi card: mở link Shopee/TikTok Shop trong tab mới.
- Nút **"Xem Chi Tiết"** và **"So Sánh"** tương tự trang chủ.

---

##### Giao diện 11 – Modal Đăng Ký / Đăng Nhập (AuthModal)

> **[CHỤP ẢNH 1]:** Modal ở trạng thái Đăng Nhập (tab Login)
> **[CHỤP ẢNH 2]:** Modal ở trạng thái Đăng Ký (tab Register)

**Mô tả chức năng:**

Modal overlay xuất hiện khi nhấn nút "Đăng Nhập" trên Header:

- **Tab "Đăng Nhập"**:
  - Form: Email + Mật khẩu.
  - Nút **"Đăng Nhập"**: gọi `POST /api/auth/login`, nhận JWT Token lưu localStorage.
  - Nút **"Đăng nhập bằng Google"**: popup Firebase OAuth, đăng nhập 1 click.
  - Link chuyển sang tab Đăng Ký.

- **Tab "Đăng Ký"**:
  - Form: Họ tên + Email + Mật khẩu (tối thiểu 6 ký tự).
  - Nút **"Tạo Tài Khoản"**: gọi `POST /api/auth/register`, bcrypt hash mật khẩu.
  - Thông báo lỗi đỏ nếu email đã tồn tại hoặc dữ liệu không hợp lệ.

---

#### 4.1.2. Giao Diện Bổ Sung Dành Cho Thành Viên (Member)

> *(Thành viên thấy toàn bộ giao diện của Khách + các giao diện bổ sung dưới đây)*

---

##### Giao diện 12 – Hồ Sơ Cá Nhân (UserProfileModal)

> **[CHỤP ẢNH]:** Modal hồ sơ cá nhân khi nhấn vào ảnh đại diện trên Header

**Mô tả chức năng:**

Modal hiển thị thông tin tài khoản và tài sản của Thành viên:

- **Ảnh đại diện** + Tên hiển thị + Email tài khoản.
- **Điểm XP tích lũy**: số điểm kinh nghiệm với progress bar trực quan; mỗi bình luận được cộng +10 XP.
- **Danh sách Wishlist**: các sản phẩm đã yêu thích, hiển thị dạng danh sách mini (ảnh + tên + giá). Nhấn vào để mở ProductDetailsModal.
- **Nút "Xóa khỏi Wishlist"**: xóa sản phẩm khỏi danh sách yêu thích ngay lập tức.
- **Nút "Đăng Xuất"**: xóa JWT Token khỏi localStorage, reset giao diện về trạng thái Guest.

---

##### Giao diện 13 – Nút Yêu Thích trên ProductCard (Wishlist Toggle)

> **[CHỤP ẢNH]:** ProductCard với nút tim đỏ (đã thêm Wishlist) và nút tim rỗng (chưa thêm)

**Mô tả chức năng:**

Khi đăng nhập, mỗi ProductCard hiển thị thêm **nút tim (♡/♥)**:

- **Tim rỗng (♡)**: sản phẩm chưa trong Wishlist → nhấn để thêm vào.
- **Tim đỏ (♥)**: sản phẩm đã trong Wishlist → nhấn để xóa khỏi danh sách.
- Trạng thái cập nhật ngay lập tức qua `PUT /api/users/me` mà không reload trang.

---

##### Giao diện 14 – Khu Vực Bình Luận (CommentSection)

> **[CHỤP ẢNH 1]:** CommentSection khi chưa đăng nhập (chỉ xem)
> **[CHỤP ẢNH 2]:** CommentSection khi đã đăng nhập (có ô nhập bình luận)

**Mô tả chức năng:**

Khu vực bình luận nằm bên dưới video YouTube trong `ProductDetailsModal`:

- **Danh sách bình luận**: hiển thị ảnh đại diện, tên người dùng, nội dung và thời gian đăng.
- **Khi chưa đăng nhập**: hiển thị thông báo "Đăng nhập để bình luận".
- **Khi đã đăng nhập**:
  - Ô textarea nhập nội dung đánh giá.
  - Nút **"Gửi Đánh Giá"**: gọi `POST /api/reviews` với JWT Token.
  - Sau khi gửi thành công: bình luận xuất hiện ngay đầu danh sách + Thành viên được cộng **+10 điểm XP** tự động.

---

#### 4.1.3. Giao Diện Bổ Sung Dành Cho Quản Trị Viên (Admin)

> *(Admin thấy toàn bộ giao diện của Thành viên + các giao diện quản trị dưới đây)*

---

##### Giao diện 15 – Bảng Điều Khiển Quản Trị (AdminPanel – Tổng Quan)

> **[CHỤP ẢNH]:** AdminPanel vừa mở, tab "Quản Lý Sản Phẩm" mặc định

**Mô tả chức năng:**

AdminPanel mở dưới dạng overlay modal toàn màn hình khi Admin nhấn biểu tượng bánh răng trên Header. Giao diện gồm:

- **Tiêu đề "Admin Panel"** + nút đóng (X) góc trên phải.
- **2 tab chính**: Quản Lý Sản Phẩm | Quản Lý Bài Viết.
- **Thống kê nhanh**: tổng số sản phẩm, tổng bài viết.

---

##### Giao diện 16 – Quản Lý Sản Phẩm (AdminPanel – Tab Sản Phẩm)

> **[CHỤP ẢNH]:** Tab Quản Lý Sản Phẩm với danh sách sản phẩm và các nút thao tác

**Mô tả chức năng:**

Tab quản lý toàn bộ sản phẩm trong hệ thống:

- **Danh sách sản phẩm**: dạng bảng hoặc card, mỗi dòng gồm ảnh, tên, danh mục, giá, trạng thái nổi bật.
- **Nút "Thêm Sản Phẩm Mới"**: mở form `ProductForm` trống.
- **Nút "Sửa"** (bên cạnh mỗi sản phẩm): load dữ liệu vào `ProductForm` để chỉnh sửa.
- **Nút "Xóa"**: xác nhận rồi gọi `DELETE /api/products/:id`, xóa khỏi MongoDB.
- **Toggle "Nổi Bật"**: bật/tắt `isFeatured` để sản phẩm xuất hiện trên trang chủ.

---

##### Giao diện 17 – Form Thêm / Sửa Sản Phẩm (ProductForm)

> **[CHỤP ẢNH 1]:** ProductForm trống (thêm mới)
> **[CHỤP ẢNH 2]:** ProductForm đã điền dữ liệu (chỉnh sửa)

**Mô tả chức năng:**

Form đầy đủ để nhập/sửa thông tin sản phẩm, gồm các trường:

- **Thông tin cơ bản**: Tên sản phẩm, Thương hiệu, Giá (text), Giá trị số (priceValue), Danh mục (phone/laptop), URL ảnh, URL YouTube review.
- **Điểm đánh giá kỹ thuật** (0–100): Hiệu Năng, Màn Hình, Camera, Pin & Sạc, Thiết Kế → dùng để vẽ Radar Chart.
- **Thông số kỹ thuật chi tiết** (`specs`): CPU/Chip, RAM, Bộ nhớ, Màn hình, Camera (trước/sau), Pin, Sạc, Hệ điều hành, Kết nối.
- **Nút "Nhập từ AI"**: nhập tên sản phẩm → gọi `GET /api/scrape?query=<tên>` → Pollinations AI API tự động điền toàn bộ thông số.
- **Nút "Lưu Sản Phẩm"**: gọi `POST /api/products` (upsert), hiển thị thông báo thành công.
- **Nút "Hủy"**: đóng form, không lưu thay đổi.

---

##### Giao diện 18 – Quản Lý Bài Viết (AdminPanel – Tab Bài Viết)

> **[CHỤP ẢNH]:** Tab Quản Lý Bài Viết với danh sách bài viết và các nút thao tác

**Mô tả chức năng:**

Tab quản lý tin tức và bài đánh giá:

- **Danh sách bài viết**: hiển thị tiêu đề, tóm tắt, ngày đăng, ảnh bìa thu nhỏ.
- **Nút "Thêm Bài Viết Mới"**: mở form `NewsForm` trống.
- **Nút "Sửa"**: load dữ liệu vào `NewsForm` để chỉnh sửa.
- **Nút "Xóa"**: xác nhận rồi gọi `DELETE /api/posts/:id`.

---

##### Giao diện 19 – Form Thêm / Sửa Bài Viết (NewsForm)

> **[CHỤP ẢNH]:** NewsForm với các trường nhập liệu bài viết

**Mô tả chức năng:**

Form nhập thông tin bài viết, gồm các trường:

- **Tiêu đề** (`title`): bắt buộc.
- **Tóm tắt** (`summary`): đoạn mô tả ngắn hiển thị trên card danh sách.
- **Nội dung** (`content`): nội dung đầy đủ của bài viết.
- **URL ảnh bìa** (`image`): link ảnh hiển thị trên card và trang chi tiết.
- **Ngày đăng** (`date`): nhập thủ công hoặc tự động lấy ngày hiện tại.
- **Nút "Lưu Bài Viết"**: gọi `POST /api/posts` (upsert).
- **Nút "Hủy"**: đóng form không lưu.

---

### 4.2. Tổng Hợp Danh Sách Giao Diện

| STT | Tên Giao Diện | Nhóm Người Dùng | Component |
|-----|--------------|-----------------|-----------|
| 1 | Thanh Điều Hướng (Header) | Tất cả | `Header.jsx` |
| 2 | Trang Chủ Hero | Tất cả | `VersusHero.jsx` |
| 3 | Danh Sách Điện Thoại Nổi Bật | Tất cả | `ProductCard.jsx` + `FilterSidebar.jsx` |
| 4 | Danh Sách Laptop Nổi Bật | Tất cả | `ProductCard.jsx` + `FilterSidebar.jsx` |
| 5 | Modal Chi Tiết Sản Phẩm | Tất cả | `ProductDetailsModal.jsx` |
| 6 | So Sánh Đa Chiều (Radar Chart) | Tất cả | `CompareSection.jsx` |
| 7 | Popup Danh Sách So Sánh | Tất cả | `App.jsx` (renderComparePopup) |
| 8 | Tư Vấn AI | Tất cả | `AIAnalyzer.jsx` |
| 9 | Tin Tức | Tất cả | `NewsFeed.jsx` |
| 10 | Cửa Hàng & Tìm Kiếm | Tất cả | `StoreSection.jsx` |
| 11 | Modal Đăng Ký / Đăng Nhập | Tất cả (Guest) | `AuthModal.jsx` |
| 12 | Hồ Sơ Cá Nhân | Member + Admin | `UserProfileModal.jsx` |
| 13 | Nút Yêu Thích (Wishlist Toggle) | Member + Admin | `ProductCard.jsx` |
| 14 | Khu Vực Bình Luận | Member + Admin | `CommentSection.jsx` |
| 15 | Bảng Điều Khiển Quản Trị | Admin | `AdminPanel.jsx` |
| 16 | Quản Lý Sản Phẩm | Admin | `AdminPanel.jsx` |
| 17 | Form Thêm / Sửa Sản Phẩm | Admin | `ProductForm.jsx` |
| 18 | Quản Lý Bài Viết | Admin | `AdminPanel.jsx` |
| 19 | Form Thêm / Sửa Bài Viết | Admin | `NewsForm.jsx` |

---
