<script>
    // Dùng sự kiện capture (true) để cướp quyền xử lý trước mọi file JS khác
    document.addEventListener('submit', function(e) {
        const form = e.target;
        if (form && form.id === 'loginForm') {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            const emailInput = document.getElementById('loginEmail');
            const email = emailInput ? emailInput.value.trim() : "doquangthien10102000@gmail.com";

            let userData = {
                name: "Thiện Đỗ",
                email: email,
                phone: "0779224960"
            };

            // Lưu dữ liệu vào localStorage
            localStorage.setItem('currentUser', JSON.stringify(userData));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);

            // Buộc chuyển hướng thẳng sang account.html bằng mọi giá
            window.location.replace('account.html');
            return false;
        }
    }, true);
</script>