// Xử lý giỏ hàng cơ bản với localStorage cho Thiệnpod Store
document.addEventListener("DOMContentLoaded", () => {
    console.log("Thiệnpod Store JS đã được tải thành công.");
    
    // Khởi tạo giỏ hàng nếu chưa có
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([]));
    }
});

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
}
// --- SCRIPT RIÊNG CHO TRANG CHỦ (INDEX) ---
const PRODUCTS = [
  { id: 'ao-thidau', name: 'ÁO POLO THỂ THAO (Tím)', kind: 'ÁO POLO THỂ THAO (Tím)', price: 399000, icon: 'ao', badge: 'MỚI', variant: 'Size M · Đỏ', image: 'images/ao1.jpg' },
  { id: 'quan-short', name: 'ÁO POLO THỂ THAO (Xanh Dương)', kind: 'ÁO POLO THỂ THAO (Xanh Dương)', price: 399000, icon: 'quan', variant: 'Size M', image: 'images/ao3.jpg' },
  { id: 'giay-tf', name: 'ÁO POLO THỂ THAO (Xanh Lá)', kind: 'ÁO POLO THỂ THAO (Xanh Lá)', price: 399000, was: 1090000, icon: 'giay', variant: 'Size 41', image: 'images/ao2.jpg' },
  { id: 'gang-thumon', name: 'ÁO POLO THỂ THAO (Đen)', kind: 'ÁO POLO THỂ THAO (Đen)', price: 399000, icon: 'gangtay', badge: 'HOT', variant: 'Size L', image: 'images/ao4.jpg' },
  { id: 'balo-2ngan', name: 'Mizuno Alpha Elite AS TF (XANH)', kind: 'Mizuno Alpha Elite AS TF (XANH)', price: 1200000, icon: 'balo', variant: 'Đen', image: 'images/mizuno3.jpg' },
  { id: 'bong-so5', name: 'Mizuno Alpha Elite AS TF (BẠC)', kind: 'Mizuno Alpha Elite AS TF (BẠC)', price: 1200000, icon: 'bong', badge: 'MỚI', variant: 'Số 5', image: 'images/mizuno2.jpg' },
  { id: 'ao-khoac', name: 'Mizuno Alpha Elite AS TF (TRẮNG)', kind: 'Mizuno Alpha Elite AS TF (TRẮNG)', price: 1200000, icon: 'ao', variant: 'Size L', image: 'images/giay4.jpg' }, // <--- Đã thêm image
  { id: 'giay-dibo', name: 'Mizuno Alpha Elite AS TF (ĐỎ)', kind: 'Mizuno Alpha Elite AS TF (ĐỎ)', price: 1200000, was: 750000, icon: 'giay', variant: 'Size 40', image: 'images/mizuno1.jpg' } // <--- Đã thêm image
];

function formatVND(n) {
  return Math.round(n).toLocaleString('vi-VN') + '₫';
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map((p) => `
    <div class="card" data-id="${p.id}">
      <div class="thumb">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="meta">
        <div class="kind">${p.kind}</div>
        <h3>${p.name}</h3>
        <div class="price-row">
          <span>
            <span class="now">${formatVND(p.price)}</span>
            ${p.was ? `<span class="was">${formatVND(p.was)}</span>` : ''}
          </span>
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        </div>
        <button class="add-btn" data-add-to-cart="${p.id}">THÊM VÀO GIỎ</button>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const product = PRODUCTS.find((p) => p.id === btn.dataset.addToCart);
      if (!product) return;

      Cart.addItem(product, 1);
      showToast(`Đã thêm "${product.name}" vào giỏ hàng — đang chuyển đến trang thanh toán...`);

      setTimeout(() => {
        window.location.href = 'checkout.html';
      }, 700);
    });
  });
}

function renderAuthNav() {
  const nav = document.getElementById('authNav');
  if (!nav) return;

  const userRaw = localStorage.getItem('thienpod_user');
  if (!userRaw) return;

  try {
    const user = JSON.parse(userRaw);
    const firstName = user.name.trim().split(/\s+/).pop();
    nav.innerHTML = `<a href="#" id="logoutBtn" class="icon-btn">Hi ${firstName} · Đăng xuất</a>`;
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('thienpod_user');
      window.location.reload();
    });
  } catch (e) {
    // Giữ nguyên liên kết mặc định nếu lỗi
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderAuthNav();

  const newsletterBtn = document.getElementById('newsletterBtn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', () => {
      const input = document.getElementById('newsletterEmail');
      const email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Vui lòng nhập email hợp lệ.');
        return;
      }
      showToast('Đăng ký nhận tin thành công!');
      input.value = '';
    });
  }
});
// --- XỬ LÝ SỰ KIỆN TRANG ĐĂNG NHẬP / ĐĂNG KÝ (LOGIN.HTML) ---
document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Hàm hiển thị thông báo (Toast) chống lỗi ngầm
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  const loginForm = document.getElementById('loginForm');
  const btnSwitchRegister = document.getElementById('btnSwitchRegister');
  const titleEl = document.querySelector('.auth-card-split h2');
  const descEl = document.querySelector('.auth-card-split .desc');
  const submitBtn = document.querySelector('#loginForm button[type="submit"]');
  const switchContainer = document.querySelector('.auth-switch');

  let isRegisterMode = false; // Biến theo dõi đang ở form Đăng nhập hay Đăng ký

  // 2. Logic click vào "Đăng ký ngay"
  if (btnSwitchRegister) {
    btnSwitchRegister.addEventListener('click', (e) => {
      e.preventDefault(); // Chặn việc trình duyệt bị tải lại hoặc nhảy trang
      isRegisterMode = true; 
      
      // Đổi chữ trên giao diện mà không làm mất form
      if (titleEl && descEl && submitBtn) {
        titleEl.textContent = 'TẠO TÀI KHOẢN MỚI';
        descEl.textContent = 'Đăng ký thành viên để nhận ưu đãi độc quyền.';s
        submitBtn.textContent = 'ĐĂNG KÝ';
        
        // Đổi chữ phía dưới thành "Quay lại Đăng nhập"
        switchContainer.innerHTML = `
          <span>HOẶC</span>
          <p>Đã có tài khoản? <a href="login.html">Đăng nhập ngay</a></p>
          <p style="margin-top: 10px;"><a href="index.html" style="font-size:12px;">← Quay lại cửa hàng</a></p>
        `;
      }
    });
  }

  // 3. Logic xử lý khi bấm nút Submit (chạy cho cả Đăng nhập & Đăng ký)
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Chặn form tải lại trang
      
      const emailInput = document.getElementById('loginEmail');
      const email = emailInput ? emailInput.value.trim() : 'user@thienpod.store';
      
      // Giả lập lưu dữ liệu user
      const mockUser = {
        name: email.split('@')[0].toUpperCase(),
        email: email
      };
      localStorage.setItem('thienpod_user', JSON.stringify(mockUser));

      // Hiển thị thông báo tương ứng
      if (isRegisterMode) {
        showToast('Đăng ký tài khoản thành công! Đang chuyển về trang chủ...');
      } else {
        showToast('Đăng nhập thành công! Đang chuyển về trang chủ...');
      }

      // Tự động chuyển về trang chủ sau 1 giây
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
    });
  }
});
// --- JAVASCRIPT CHO HERO SLIDER ---
let slideIndex = 1;
let slideTimer = null;

// Khởi chạy slider nếu tồn tại trên trang
if (document.querySelector('.hero-slider-container')) {
    showSlides(slideIndex);
    startAutoSlide();
}

function plusSlides(n) {
    showSlides(slideIndex += n);
    resetTimer();
}

function currentSlide(n) {
    showSlides(slideIndex = n);
    resetTimer();
}

function showSlides(n) {
    let slides = document.getElementsByClassName("hero-slide");
    let dots = document.getElementsByClassName("dot");
    
    if (!slides.length) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }
    
    slides[slideIndex - 1].classList.add("active");
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add("active");
    }
}

function startAutoSlide() {
    slideTimer = setInterval(function() {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // Tự động chuyển sau 5 giây
}

function resetTimer() {
    clearInterval(slideTimer);
    startAutoSlide();
}
