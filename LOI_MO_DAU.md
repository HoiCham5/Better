## LỜI MỞ ĐẦU

### 1. Lý Do Chọn Đề Tài

Trong bối cảnh cuộc cách mạng công nghiệp lần thứ tư và nền kinh tế số phát triển mạnh mẽ tại Việt Nam, thị trường thiết bị điện tử tiêu dùng – đặc biệt là điện thoại thông minh và máy tính xách tay – đang bùng nổ cả về số lượng sản phẩm lẫn nhu cầu mua sắm. Theo báo cáo của IDC Vietnam năm 2024, thị trường điện thoại thông minh Việt Nam đạt trên 13,5 triệu chiếc bán ra trong năm 2023, trong khi thị trường máy tính cá nhân đạt 3,2 triệu đơn vị. Mỗi năm, hàng trăm mẫu thiết bị mới từ các thương hiệu lớn như Apple, Samsung, Xiaomi, ASUS, Dell, Lenovo, HP... liên tục được ra mắt, đặt người tiêu dùng trước bài toán ngày càng khó: **làm thế nào để chọn được thiết bị phù hợp nhất với nhu cầu và ngân sách cá nhân?**

Thực tế hiện nay bộc lộ một số vấn đề cấp thiết:

- **Thông tin phân tán và thiếu tin cậy:** Để tìm hiểu về một sản phẩm, người dùng phải lướt qua nhiều tab trình duyệt, xem nhiều video YouTube, đọc nhiều diễn đàn với chất lượng nội dung không đồng đều, nhiều nguồn bị chi phối bởi quảng cáo thương mại.

- **Thiếu công cụ so sánh trực quan và đa chiều:** Các nền tảng thương mại điện tử lớn tại Việt Nam (Thegioididong, CellphoneS) dù có tính năng so sánh, nhưng kết quả chỉ là bảng liệt kê thông số kỹ thuật thuần túy – thiếu trực quan hóa đa chiều để người dùng phổ thông dễ dàng nhận biết ưu và nhược điểm của từng sản phẩm.

- **Vắng bóng tư vấn cá nhân hóa:** Hiện chưa có nền tảng nào tại Việt Nam cho phép người dùng đặt câu hỏi theo ngôn ngữ tự nhiên (ví dụ: "Tôi cần laptop nhẹ dưới 1,5kg, học đồ họa, giá dưới 20 triệu") và nhận lại gợi ý sản phẩm phù hợp một cách tức thì.

- **Thiếu cộng đồng đánh giá thực tế:** Người mua hàng cần ý kiến từ những người đã thực sự sử dụng sản phẩm, không chỉ từ thông số trên giấy hay các bài review có tính quảng cáo.

Bên cạnh đó, từ góc độ học thuật, kiến trúc **MERN Stack** (MongoDB, Express.js, React.js, Node.js) là một trong những kiến trúc phát triển ứng dụng web full-stack phổ biến nhất hiện nay, được các công ty công nghệ hàng đầu thế giới áp dụng. Việc thực hiện một dự án hoàn chỉnh trên MERN Stack giúp sinh viên tích lũy kiến thức và kỹ năng thực chiến đúng chuẩn công nghiệp, từ khâu phân tích yêu cầu, thiết kế kiến trúc, lập trình front-end/back-end, bảo mật xác thực, đến quy trình DevOps (Docker, CI/CD) và triển khai đám mây.

Xuất phát từ những lý do trên, đề tài **"Thiết kế và xây dựng website tư vấn và so sánh thiết bị công nghệ – Better"** được lựa chọn nhằm đồng thời giải quyết một bài toán thực tiễn của thị trường và đáp ứng yêu cầu rèn luyện kỹ năng phát triển phần mềm theo chuẩn công nghiệp hiện đại.

---

### 2. Mục Đích Nghiên Cứu

Đề tài được thực hiện với các mục đích cụ thể sau:

- **Nghiên cứu và ứng dụng** kiến trúc phát triển web full-stack MERN Stack (MongoDB, Express.js, React.js, Node.js) vào một dự án phần mềm hoàn chỉnh, trải qua đầy đủ các giai đoạn trong vòng đời phát triển phần mềm: phân tích yêu cầu → thiết kế hệ thống → triển khai mã nguồn → kiểm thử → triển khai và vận hành.

- **Xây dựng một nền tảng web ứng dụng** giúp người tiêu dùng Việt Nam so sánh thiết bị công nghệ (điện thoại thông minh và laptop) một cách trực quan, đa chiều thông qua biểu đồ Radar Chart, đồng thời được hỗ trợ tư vấn cá nhân hóa bằng module trí tuệ nhân tạo (AI Advisor).

- **Thực hành áp dụng** hệ thống bảo mật theo chuẩn hiện đại (JWT Authentication + bcryptjs hashing), hệ thống phân quyền đa cấp (Guest – Member – Admin) và quy trình DevOps thực tế (Docker containerization, GitHub Actions CI/CD, Cloud Deployment).

- **Tạo ra một sản phẩm phần mềm có giá trị thực tiễn**, có thể tiếp tục phát triển và mở rộng sau khi hoàn thành đồ án tốt nghiệp.

---

### 3. Đối Tượng và Phạm Vi Nghiên Cứu

#### 3.1 Đối Tượng Nghiên Cứu

- **Đối tượng kỹ thuật:** Kiến trúc MERN Stack full-stack, cơ sở dữ liệu NoSQL (MongoDB), cơ chế xác thực JWT, thư viện trực quan hóa dữ liệu (Recharts), công cụ DevOps (Docker, GitHub Actions) và phương pháp xử lý ngôn ngữ tự nhiên dựa trên luật (Rule-based NLP).

- **Đối tượng ứng dụng:** Thị trường thiết bị điện tử tiêu dùng tại Việt Nam, tập trung vào hai danh mục sản phẩm phổ biến nhất: điện thoại thông minh (smartphone) và máy tính xách tay (laptop).

- **Đối tượng người dùng:** Người tiêu dùng Việt Nam có nhu cầu tìm hiểu, so sánh và lựa chọn thiết bị công nghệ trước khi đưa ra quyết định mua hàng. Đặc biệt hướng đến nhóm người dùng trẻ (18–35 tuổi) – đối tượng chủ lực của thị trường thiết bị công nghệ.

#### 3.2 Phạm Vi Nghiên Cứu

**Về mặt chức năng:**
- Hệ thống quản lý hai danh mục sản phẩm: điện thoại thông minh và laptop.
- Chức năng so sánh đồng thời 2 đến 4 thiết bị với biểu đồ Radar đa lớp.
- Module AI tư vấn sản phẩm dựa trên phân tích ngôn ngữ tự nhiên.
- Hệ thống tin tức, bài đánh giá và bình luận cộng đồng.
- Bảng quản trị Admin với quyền CRUD đầy đủ.
- Hệ thống tài khoản với xác thực JWT và đăng nhập Google OAuth.

**Về mặt triển khai:**
- Frontend triển khai trên Vercel (CDN toàn cầu).
- Backend triển khai trên Render.com (Cloud Server).
- Cơ sở dữ liệu trên MongoDB Atlas (Cloud NoSQL Database).
- Hệ thống đóng gói bằng Docker và tự động hóa qua GitHub Actions CI/CD.

**Giới hạn nghiên cứu:**
- Module AI sử dụng thuật toán Rule-based NLP, chưa tích hợp mô hình ngôn ngữ lớn (LLM).
- Chưa tích hợp cổng thanh toán trực tuyến; người dùng được điều hướng sang Shopee/TikTok Shop.
- Dữ liệu sản phẩm được nhập thủ công hoặc qua script seed, chưa có cơ chế thu thập tự động theo thời gian thực.

---

### 4. Ý Nghĩa Khoa Học và Thực Tiễn

#### 4.1 Ý Nghĩa Khoa Học

- **Minh chứng khả năng áp dụng kiến trúc MERN Stack** vào bài toán xây dựng nền tảng tư vấn và so sánh sản phẩm công nghệ. Đề tài chứng minh rằng một hệ thống web full-stack hoàn chỉnh – từ giao diện người dùng, API server, cơ sở dữ liệu đến quy trình DevOps – có thể được xây dựng hiệu quả chỉ bằng một ngôn ngữ lập trình duy nhất (JavaScript).

- **Đề xuất mô hình dữ liệu NoSQL linh hoạt** cho bài toán quản lý đa dạng sản phẩm công nghệ. Thiết kế trường `specs` kiểu `Mixed` trong Mongoose cho phép lưu trữ thông số kỹ thuật có cấu trúc khác nhau (điện thoại vs. laptop) trong cùng một collection mà không tạo ra các trường NULL dư thừa – một ưu điểm rõ rệt so với mô hình cơ sở dữ liệu quan hệ truyền thống.

- **Ứng dụng phương pháp trực quan hóa dữ liệu đa chiều** bằng biểu đồ Radar Chart vào lĩnh vực so sánh thiết bị. Thay vì bảng thông số thuần túy, biểu đồ Radar cho phép người dùng nhận biết tổng thể và so sánh nhiều chiều kỹ thuật cùng lúc – một phương pháp trình bày dữ liệu khoa học, trực quan và hiệu quả hơn.

- **Nghiên cứu và thử nghiệm phương pháp NLP đơn giản (Rule-based)** trong bối cảnh tư vấn sản phẩm. Dù chưa sử dụng LLM, hệ thống AI Advisor chứng minh rằng phương pháp lọc dựa trên luật kết hợp biểu thức chính quy vẫn có thể mang lại kết quả tư vấn hữu ích cho người dùng trong phạm vi dữ liệu cụ thể.

#### 4.2 Ý Nghĩa Thực Tiễn

- **Giải quyết nhu cầu thực tế** của người tiêu dùng Việt Nam: cung cấp một công cụ so sánh thiết bị trực quan, đa chiều và có tư vấn thông minh – điều mà các nền tảng thương mại điện tử hiện tại chưa đáp ứng đầy đủ.

- **Tạo nền tảng cộng đồng** nơi người dùng thực tế có thể đóng góp bình luận, đánh giá sản phẩm và được khuyến khích bằng hệ thống tích điểm XP (Gamification). Điều này giúp xây dựng nguồn thông tin đáng tin cậy và bền vững từ chính cộng đồng người dùng.

- **Sản phẩm có khả năng mở rộng:** Kiến trúc MERN Stack và thiết kế cơ sở dữ liệu linh hoạt cho phép dễ dàng bổ sung thêm danh mục sản phẩm (máy tính bảng, tai nghe, đồng hồ thông minh), tích hợp mô hình AI nâng cao (Gemini/GPT API) và phát triển ứng dụng di động (React Native) trong tương lai.

- **Giá trị học tập cho sinh viên:** Đề tài giúp sinh viên thực hành trọn vẹn quy trình phát triển phần mềm theo chuẩn công nghiệp – từ phân tích yêu cầu, thiết kế UML, lập trình full-stack, bảo mật JWT, containerization (Docker), CI/CD (GitHub Actions) đến triển khai đám mây (Vercel, Render.com). Đây là bộ kỹ năng thiết yếu mà doanh nghiệp công nghệ yêu cầu ở các kỹ sư phần mềm mới ra trường.

---
