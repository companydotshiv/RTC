/* RTC Foods JavaScript Core */
document.addEventListener('DOMContentLoaded', () => {
    // Quantity increment / decrement
    const qtyInputs = document.querySelectorAll('.qty-input');
    qtyInputs.forEach(input => {
        const minus = input.previousElementSibling;
        const plus = input.nextElementSibling;
        if (minus && minus.classList.contains('qty-minus')) {
            minus.addEventListener('click', () => {
                let val = parseInt(input.value) || 1;
                if (val > 1) input.value = val - 1;
            });
        }
        if (plus && plus.classList.contains('qty-plus')) {
            plus.addEventListener('click', () => {
                let val = parseInt(input.value) || 1;
                input.value = val + 1;
            });
        }
    });

    // Weight Selector buttons in Product Details
    const weightBtns = document.querySelectorAll('.weight-btn');
    weightBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            weightBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Gallery Thumbnail Switcher
    const mainImg = document.querySelector('#main-product-img');
    const thumbs = document.querySelectorAll('.thumb-img');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            if (mainImg) {
                mainImg.src = thumb.src;
                thumbs.forEach(t => t.style.borderColor = 'rgba(0,0,0,0.1)');
                thumb.style.borderColor = 'var(--brand-green)';
            }
        });
    });

    // Simple toast notification for actions
    window.showToast = function(msg) {
        let toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerText = msg;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: var(--brand-green);
            color: #fff;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
            font-weight: 600;
            transition: all 0.4s ease;
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    };
});
