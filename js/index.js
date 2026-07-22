// Dữ liệu sản phẩm gắn liền với file HTML chi tiết riêng biệt của từng màu
const mockProducts = [
    {
        id: 1,
        kind: "ÁO POLO THỂ THAO (Tím)",
        name: "ÁO POLO THỂ THAO (Tím)",
        price: 399000,
        was: 0,
        badge: "MỚI",
        image: "images/ao1.jpg",
        link: "ao-polo-tim.html"
    },
    {
        id: 2,
        kind: "ÁO POLO THỂ THAO (Xanh Dương)",
        name: "ÁO POLO THỂ THAO (Xanh Dương)",
        price: 399000,
        was: 0,
        badge: "",
        image: "images/ao3.jpg",
        link: "ao-polo-xanh.html"
    },
    {
        id: 3,
        kind: "ÁO POLO THỂ THAO (Xanh Lá)",
        name: "ÁO POLO THỂ THAO (Xanh Lá)",
        price: 399000,
        was: 1090000,
        badge: "",
        image: "images/ao2.jpg",
        link: "ao-polo-xanhla.html"
    },
    {
        id: 4,
        kind: "ÁO POLO THỂ THAO (Đỏ)",
        name: "ÁO POLO THỂ THAO (Đỏ)",
        price: 399000,
        was: 0,
        badge: "HOT",
        image: "images/polo_do2.jpg",
        link: "ao-polo-do.html"
    },
    {
        id: 5,
        kind: "Mizuno Alpha Elite AS TF (XANH)",
        name: "Mizuno Alpha Elite AS TF (XANH)",
        price: 1200000,
        was: 0,
        badge: "",
        image: "images/mizuno3.jpg",
        link: "san-pham-xanh.html" // Trỏ thẳng file riêng giày Xanh
    },
    {
        id: 6,
        kind: "Mizuno Alpha Elite AS TF (BẠC)",
        name: "Mizuno Alpha Elite AS TF (BẠC)",
        price: 1200000,
        was: 0,
        badge: "MỚI",
        image: "images/mizuno2.jpg",
        link: "san-pham-bac.html" // Trỏ thẳng file riêng giày Bạc (hoặc bạn đổi tên file tùy ý)
    },
    {
        id: 7,
        kind: "Mizuno Alpha Elite AS TF (TRẮNG)",
        name: "Mizuno Alpha Elite AS TF (TRẮNG)",
        price: 1200000,
        was: 0,
        badge: "",
        image: "images/giay4.jpg",
        link: "san-pham-trang.html" // Trỏ thẳng file riêng giày Trắng
    },
    {
        id: 8,
        kind: "Mizuno Alpha Elite AS TF (ĐỎ)",
        name: "Mizuno Alpha Elite AS TF (ĐỎ)",
        price: 1200000,
        was: 750000,
        badge: "",
        image: "images/mizuno1.jpg",
        link: "san-pham-do.html" // Trỏ thẳng file riêng giày Đỏ
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('productGrid');
    if (grid) {
        grid.innerHTML = mockProducts.map(p => `
            <div class="card">
                <!-- Bọc thẻ a quanh phần ảnh để click sang đúng file HTML riêng -->
                <a href="${p.link}" class="thumb" style="display: block; position: relative;">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.badge ? `<span class="badge" style="position:absolute; top:10px; left:10px;">${p.badge}</span>` : ''}
                </a>
                <div class="meta">
                    <div class="kind">${p.kind}</div>
                    <!-- Bọc thẻ a quanh tên sản phẩm để click sang đúng file HTML riêng -->
                    <h3>
                        <a href="${p.link}" style="text-decoration: none; color: inherit;">
                            ${p.name}
                        </a>
                    </h3>
                    <div class="price-row">
                        <span class="now">${p.price.toLocaleString('vi-VN')}₫</span>
                        ${p.was ? `<span class="was">${p.was.toLocaleString('vi-VN')}₫</span>` : ''}
                    </div>
                    <button class="add-btn" onclick="addToCart(${p.id})">THÊM VÀO GIỎ</button>
                </div>
            </div>
        `).join('');
    }

    const newsletterBtn = document.getElementById('newsletterBtn');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            const emailInput = document.getElementById('newsletterEmail');
            if (emailInput && emailInput.value.trim() !== '') {
                showToast('Đăng ký nhận bản tin thành công!');
                emailInput.value = '';
            } else {
                alert('Vui lòng nhập địa chỉ email hợp lệ!');
            }
        });
    }
});

function addToCart(productId) {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
        CartManager.addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            variant: 'Tiêu chuẩn',
            quantity: 1,
            image: product.image
        });
    }
}