// Quản lý giỏ hàng chung cho toàn bộ website
const CartManager = {
    getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    },

    saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
    },

    addItem(product) {
        let cart = this.getCart();
        // Kiểm tra xem sản phẩm cùng ID và variant đã có trong giỏ chưa
        let existing = cart.find(item => item.id === product.id && item.variant === product.variant);
        
        if (existing) {
            existing.quantity += (product.quantity || 1);
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                variant: product.variant || 'Mặc định',
                quantity: product.quantity || 1,
                image: product.image || ''
            });
        }
        
        this.saveCart(cart);
        showToast('Đã thêm sản phẩm vào giỏ hàng!');
    },

    updateCartCount() {
        let cart = this.getCart();
        let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        const countEl = document.getElementById('cartCount');
        if (countEl) {
            countEl.textContent = totalCount;
        }
    }
};

// Hiển thị thông báo Toast
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Khởi chạy cập nhật số lượng giỏ hàng khi load trang
document.addEventListener('DOMContentLoaded', () => {
    CartManager.updateCartCount();
});