# ☕ Coffee 1900 - Premium Coffee Experience

<div align="center">
  <img src="./assets/coffee.png" alt="Coffee 1900 Logo" width="120"/>
  
  <h3>Trải nghiệm cà phê đẳng cấp thế giới</h3>
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
  [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

## 📖 Giới thiệu

Coffee 1900 là một website của cửa hàng cà phê cao cấp, mang đến trải nghiệm cà phê đẳng cấp thế giới. Website được thiết kế với giao diện hiện đại, responsive và tối ưu trải nghiệm người dùng.

### ✨ Tính năng chính

- 🏠 **Trang chủ hiện đại** - Hero section với video background
- 🛍️ **Catalog sản phẩm** - Hiển thị menu cà phê với bộ lọc
- 📱 **Responsive Design** - Tối ưu cho mọi thiết bị
- 🎨 **Giao diện đẹp mắt** - Sử dụng màu sắc và typography chuyên nghiệp
- 🔄 **Hiệu ứng mượt mà** - CSS animations và transitions
- 📧 **Newsletter** - Đăng ký nhận tin tức
- 👥 **Testimonials** - Phản hồi khách hàng
- 📍 **Thông tin liên hệ** - Chi tiết cửa hàng và social media

## 🚀 Demo

🌐 **[Xem Demo Trực Tiếp](https://phongdz76.github.io/Coffee-1900/)**

### 📸 Screenshots

<details>
<summary>Xem ảnh chụp màn hình</summary>

![Homepage](./assets/screenshot-home.png)
*Trang chủ với hero section*

![Products](./assets/screenshot-products.png)
*Trang sản phẩm*

![Mobile](./assets/screenshot-mobile.png)
*Giao diện mobile*

</details>

## 🛠️ Công nghệ sử dụng

- **Frontend:**
  - HTML5 - Cấu trúc trang web
  - CSS3 - Styling và animations
  - Vanilla JavaScript - Tương tác và logic
  - Font Awesome - Icons
  - Google Fonts - Typography

- **Build Tool:**
  - Vite - Build tool và dev server

- **Backend (Tương lai):**
  - PHP - Server-side logic
  - MySQL - Database (planned)

## 📁 Cấu trúc thư mục

```
Coffee-1900/
├── 📄 index.html              # Trang chủ
├── 🎨 style.css               # CSS chính
├── ⚙️ main.js                 # JavaScript chính
├── 📦 package.json            # Dependencies và scripts
├── 📖 README.md               # Tài liệu dự án
├── 🖼️ assets/                 # Hình ảnh và media
│   ├── coffee.png            # Logo
│   ├── Coffee-ad.mkv         # Video hero
│   ├── coffee-*.png/jpg      # Hình ảnh sản phẩm
│   └── ...                   # Các assets khác
├── 📄 pages/                  # Các trang phụ
│   └── location/             # Trang vị trí cửa hàng
│       ├── location.html
│       └── location.css
├── 🔐 php/                    # Backend PHP
│   ├── login.html            # Trang đăng nhập
│   ├── login.php             # Logic đăng nhập
│   ├── signup.html           # Trang đăng ký
│   └── signup.php            # Logic đăng ký
└── 🔧 public/                 # Public assets
    └── vite.svg
```

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 16.0.0
- npm hoặc yarn
- Web server (Apache/Nginx cho PHP)

### 1. Clone repository

```bash
git clone https://github.com/phongdz76/Coffee-1900.git
cd Coffee-1900
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt và truy cập `http://localhost:5173`

### 4. Build cho production

```bash
npm run build
```

### 5. Preview production build

```bash
npm run preview
```

## 🎯 Tính năng chi tiết

### 🏠 Trang chủ (index.html)

- **Hero Section**: Video background với call-to-action buttons
- **Features Section**: Giới thiệu điểm mạnh của Coffee 1900
- **About Section**: Câu chuyện thương hiệu
- **Products Section**: Menu sản phẩm với bộ lọc
- **Statistics**: Số liệu thành tích
- **Gallery**: Không gian cửa hàng
- **Testimonials**: Slider phản hồi khách hàng
- **Newsletter**: Form đăng ký nhận tin
- **Blog**: Tin tức và bài viết
- **Clients**: Logo đối tác
- **Footer**: Thông tin liên hệ và social media

### 📱 Responsive Design

- **Desktop**: >= 1200px
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

### 🎨 Design System

#### Màu sắc
```css
--primary-color: #D4A574    /* Vàng đồng chủ đạo */
--secondary-color: #8B4513  /* Nâu cà phê */
--accent-color: #F4E4C1     /* Kem nhạt */
--dark-color: #2C1810       /* Nâu đậm */
--text-color: #4A4A4A       /* Xám chữ */
```

#### Typography
- **Heading**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🔧 Cấu hình

### Vite Configuration

File `vite.config.js` (tạo nếu cần):

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 3000,
    open: true
  }
})
```

### Environment Variables

Tạo file `.env` cho các biến môi trường:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SITE_URL=http://localhost:5173
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Navigation hoạt động trên mọi thiết bị
- [ ] Video hero tự động phát
- [ ] Product filters hoạt động
- [ ] Testimonials slider
- [ ] Newsletter form validation
- [ ] Responsive design
- [ ] Cross-browser compatibility

## 📝 Roadmap

### Version 2.0 (Planned)

- [ ] **Backend Integration**
  - [ ] User authentication
  - [ ] Shopping cart functionality
  - [ ] Order management
  - [ ] Admin dashboard

- [ ] **Enhanced Features**
  - [ ] Search functionality
  - [ ] Product reviews
  - [ ] Wishlist
  - [ ] Multi-language support

- [ ] **Performance**
  - [ ] Image optimization
  - [ ] Lazy loading
  - [ ] PWA features

- [ ] **SEO**
  - [ ] Meta tags optimization
  - [ ] Structured data
  - [ ] Sitemap

## 🤝 Đóng góp

Chúng tôi hoan nghênh mọi đóng góp! Để đóng góp:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

### Coding Standards

- Sử dụng 2 spaces cho indentation
- Đặt tên biến và function bằng tiếng Anh
- Comment code bằng tiếng Việt hoặc tiếng Anh
- Follow BEM methodology cho CSS

## 🐛 Báo lỗi

Nếu bạn tìm thấy lỗi, vui lòng tạo issue với:

- Mô tả chi tiết lỗi
- Các bước tái tạo lỗi
- Screenshot (nếu có)
- Thông tin môi trường (browser, OS)
wd

## 📄 License

Dự án này được cấp phép theo [MIT License](LICENSE).

## 👥 Team

- **Developer**: [phongdz76](https://github.com/phongdz76)
- **Designer**: Coffee 1900 Design Team
- **Content**: Coffee 1900 Marketing Team

---

<div align="center">
  <p>Made with ☕ and ❤️ by Coffee 1900 Team</p>
  <p>© 2024 Coffee 1900. All rights reserved.</p>
</div>
