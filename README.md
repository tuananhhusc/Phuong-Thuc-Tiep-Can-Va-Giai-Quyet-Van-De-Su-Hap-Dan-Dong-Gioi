# Báo Cáo Nghiên Cứu Công Giáo Chuyên Sâu: Sự Hấp Dẫn Đồng Giới (Same-Sex Attraction)

Dự án ứng dụng web Next.js 14 phục vụ hiển thị báo cáo nghiên cứu chuyên sâu về **"Phương thức Tiếp cận và Giải quyết Vấn đề Sự hấp dẫn Đồng giới từ Hệ quy chiếu Công giáo và Đa chiều"**. Ứng dụng được thiết kế theo phong cách giao diện báo chí học thuật kết hợp với thẩm mỹ nghệ thuật Công giáo Thánh đường cổ điển, trang nghiêm.

---

## 📖 Tính Năng Nổi Bật

### 1. Giao Diện Thiết Kế Học Thuật & Tôn Giáo Thánh Đường (Sacred Academic Aesthetic)
* **Bảng màu tinh tuyển**: Chuyển đổi linh hoạt giữa 2 chế độ đọc:
  * **Sách Cổ (Parchment - Light Theme)**: Sự kết hợp của màu kem giấy cổ (`#FDFBF7`), viền nâu nhạt và chữ màu xám đậm giúp chống mỏi mắt.
  * **Ban Đêm (Twilight - Dark Theme)**: Màu xanh đen đại dương sâu thẳm (`#0B1D3A`), viền vàng nhạt và chữ vàng kim (`#D4AF37`) mô phỏng bầu trời đêm lấp lánh ánh nến thánh đường.
* **Kiểu chữ sang trọng**: Sử dụng phông chữ serif cổ điển `Playfair Display` cho các tiêu đề lớn học thuật và phông chữ `Lora` có độ giãn dòng cao (`line-height: 2.0`) đảm bảo trải nghiệm đọc dài hoàn hảo.
* **Họa tiết trang trí Vatican**: Phân tách các phần lớn bằng các đường kẻ chuyển màu (gradient) kết hợp họa tiết chữ thập cách điệu.

### 2. Hệ Thống Điều Hướng Bám Theo Vị Trí Đọc (Interactive Scroll Spy TOC)
* Thanh mục lục bên trái tự động theo dõi vị trí cuộn trang của người đọc để làm nổi bật (highlight) tiêu đề phần hiện tại.
* Cho phép click nhảy nhanh đến bất kỳ tiêu đề hoặc tiểu mục nào trong báo cáo với hiệu ứng cuộn mượt mà (smooth scrolling).

### 3. Tối Ưu Hóa Giao Diện Di Động (Mobile UX Optimization)
* **Ngăn kéo Mục lục (Mobile Drawer Menu)**: Tự động ẩn sidebar mục lục trên màn hình nhỏ và thay thế bằng nút nổi kích hoạt menu trượt từ cạnh trái màn hình cực kỳ tiện lợi.
* **Chống vỡ khung màn hình**: Các bảng dữ liệu khoa học được tự động bao bọc trong khung trượt ngang (`overflow-x-auto`). Mọi liên kết URL và chú thích dài được cấu hình bẻ dòng (`word-break: break-word`) để triệt tiêu hoàn toàn lỗi tràn màn hình ngang.

### 4. Ghi Nhớ Tiến Độ Đọc Tự Động (Reading Progress Auto-Save)
* Tự động lưu trữ phân đoạn đang đọc gần nhất của người dùng vào `localStorage`.
* Khi người dùng truy cập lại trang hoặc nhấn F5, một Toast thông báo thủy tinh mờ (Glassmorphism) sẽ hiện lên kèm nút **"Cuộn đến đoạn này"** giúp họ tiếp tục đọc ngay tại vị trí đã dừng.

### 5. Bảng Điều Khiển Tùy Biến Đọc & Nhạc Ambient Thánh Ca
* **Menu cài đặt nổi**: Nằm gọn gàng ở góc dưới bên phải màn hình để tăng giảm cỡ chữ đọc trực tiếp (`16px` đến `24px`) hoặc thay đổi chủ đề Sáng/Tối.
* **Nhạc nền thiền tôn nghiêm**: Tích hợp trình phát nhạc nền bản thánh ca Latin cổ **"Veni Creator Spiritus"** (hát bởi dàn hợp xướng trên Archive.org) giúp tạo không gian thư giãn sâu. Đi kèm hiệu ứng xoay chậm (`slow-spin`) của biểu tượng bánh răng khi nhạc đang phát.

### 6. Chú Thích Học Thuật Thông Minh (Footnote Tooltips)
* Tự động phát hiện các thẻ chú thích học thuật `[1]`, `[2]`.
* Khi người dùng rê chuột (hover) vào số chú thích, một Tooltip chứa nội dung chú thích đầy đủ sẽ hiện lên ngay lập tức tại vị trí con trỏ mà không cần phải cuộn xuống cuối trang.

---

## 🛠️ Công Nghệ Sử Dụng

* **Core**: Next.js 14.2 (App Router), React 18, TypeScript.
* **Style**: Tailwind CSS, `@tailwindcss/typography` (tự động tối ưu hóa hiển thị văn bản).
* **Icons**: Lucide React.
* **Markdown Parser**: `react-markdown` kết hợp `remark-gfm` để biên dịch trực tiếp tệp nội dung [report.md](file:///d:/dongtinhluyenai/data/report.md).

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
├── app/
│   ├── fonts/            # Các phông chữ tải cục bộ
│   ├── globals.css       # Các cài đặt CSS tùy chỉnh, keyframes, scrollbar
│   ├── layout.tsx        # Cấu hình phông chữ Google Fonts và Meta SEO
│   └── page.tsx          # Trang chủ SSG đọc tệp Markdown
├── components/
│   ├── ArticleArea.tsx        # Khu vực render nội dung bài viết và Tooltip
│   ├── DecorativeDivider.tsx  # Đường kẻ trang trí phong cách Công giáo
│   ├── ReadingControls.tsx    # Bảng điều khiển kích thước chữ, theme, nhạc ambient
│   ├── ReadingWrapper.tsx     # Bộ điều phối chính, mobile TOC, resume progress toast
│   └── TableOfContents.tsx    # Thanh mục lục bám đuổi (Scroll Spy)
├── data/
│   └── report.md         # Toàn bộ nội dung bài viết học thuật (Markdown)
├── lib/
│   └── markdown.ts       # Bộ đọc và phân tích tệp Markdown
├── tailwind.config.ts    # Cấu hình thiết lập hệ màu Parchment/Burgundy/Navy/Gold
└── package.json          # Danh sách thư viện phụ thuộc
```

---

## 🚀 Hướng Dẫn Cài Đặt và Khởi Chạy

### 1. Cài đặt các thư viện phụ thuộc
```bash
npm install
```

### 2. Chạy ứng dụng trên môi trường phát triển (Development)
```bash
npm run dev
```
Truy cập ứng dụng tại địa chỉ: **[http://localhost:3000](http://localhost:3000)**

### 3. Biên dịch ứng dụng sản xuất (Production Build)
```bash
npm run build
npm run start
```

---

## 📜 Quy chuẩn trích dẫn tài liệu tham khảo
Nội dung tài liệu trong tệp [report.md](file:///d:/dongtinhluyenai/data/report.md) đã được chuẩn hóa trích dẫn theo định dạng chuẩn quốc tế **APA (American Psychological Association)** và **Chicago Manual of Style** để đảm bảo tính chuyên nghiệp cao nhất cho mục tiêu nghiên cứu học thuật tôn giáo.
