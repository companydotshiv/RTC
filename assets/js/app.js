/**
 * RTC Foods - Frontend Application Scripts
 */
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Base API endpoint
  const getApiUrl = (action) => {
    const base = window.RTC_BASE_URL || '';
    return `${base}/includes/api.php?action=${action}`;
  };

  // Toast Notification
  window.showToast = function (message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-message toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
        <span class="toast-text">${message}</span>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  };

  // Cart Drawer Elements
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartTriggers = document.querySelectorAll('.cart-trigger-btn');
  const cartCountBadges = document.querySelectorAll('.cart-count-badge');
  const cartDrawerItems = document.getElementById('cart-drawer-items');
  const cartDrawerSubtotal = document.getElementById('cart-drawer-subtotal');
  const cartDrawerEmpty = document.getElementById('cart-drawer-empty');
  const cartDrawerFooter = document.getElementById('cart-drawer-footer');

  // Open Cart Drawer
  window.openCartDrawer = function () {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.classList.add('drawer-open');
      fetchCart();
    }
  };

  // Close Cart Drawer
  window.closeCartDrawer = function () {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.classList.remove('drawer-open');
    }
  };

  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);
  cartTriggers.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openCartDrawer();
  }));

  // Update Cart Badges
  function updateCartBadges(count) {
    cartCountBadges.forEach((badge) => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  // Render Cart Items in Drawer
  function renderCartDrawer(cartData) {
    if (!cartDrawerItems) return;

    const items = cartData.cart || [];
    updateCartBadges(cartData.cart_count || 0);

    if (items.length === 0) {
      if (cartDrawerEmpty) cartDrawerEmpty.style.display = 'block';
      if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
      cartDrawerItems.innerHTML = '';
      return;
    }

    if (cartDrawerEmpty) cartDrawerEmpty.style.display = 'none';
    if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';

    const baseUrl = window.RTC_BASE_URL || '';

    cartDrawerItems.innerHTML = items.map((item) => {
      const cartKey = item.id + (item.weight ? '_' + item.weight : '');
      const imgUrl = item.image.startsWith('http') ? item.image : `${baseUrl}/${item.image.replace(/^\//, '')}`;
      return `
        <div class="cart-drawer-item" data-cart-key="${cartKey}">
          <img src="${imgUrl}" alt="${item.name}" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-meta">
              <span class="cart-item-weight">${item.weight || '250g'}</span>
              <span class="cart-item-price">₹${Number(item.price).toFixed(2)}</span>
            </div>
            <div class="cart-item-qty-row">
              <div class="qty-control">
                <button type="button" class="qty-btn qty-minus" data-key="${cartKey}" data-qty="${item.quantity - 1}">-</button>
                <span class="qty-val">${item.quantity}</span>
                <button type="button" class="qty-btn qty-plus" data-key="${cartKey}" data-qty="${item.quantity + 1}">+</button>
              </div>
              <button type="button" class="cart-item-remove" data-key="${cartKey}" title="Remove item">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (cartDrawerSubtotal) {
      cartDrawerSubtotal.textContent = cartData.subtotal_formatted || `₹${Number(cartData.subtotal).toFixed(2)}`;
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Attach quantity event handlers
    cartDrawerItems.querySelectorAll('.qty-minus, .qty-plus').forEach((btn) => {
      btn.addEventListener('click', function () {
        const key = this.dataset.key;
        const qty = parseInt(this.dataset.qty, 10);
        updateCartItemQty(key, qty);
      });
    });

    cartDrawerItems.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', function () {
        const key = this.dataset.key;
        removeCartItem(key);
      });
    });
  }

  // Fetch Cart Data
  function fetchCart() {
    fetch(getApiUrl('get_cart'))
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          renderCartDrawer(data);
        }
      })
      .catch((err) => console.error('Error fetching cart:', err));
  }

  // Add To Cart
  window.addToCart = function (productId, quantity = 1, weight = '250g') {
    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', quantity);
    formData.append('weight', weight);

    fetch(getApiUrl('add_to_cart'), {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showToast(data.message || 'Added to cart!', 'success');
          renderCartDrawer(data);
          openCartDrawer();
        } else {
          showToast(data.message || 'Failed to add item', 'error');
        }
      })
      .catch((err) => {
        console.error('Add to cart error:', err);
        showToast('Network error, please try again', 'error');
      });
  };

  // Update Item Quantity
  function updateCartItemQty(cartKey, quantity) {
    const formData = new FormData();
    formData.append('cart_key', cartKey);
    formData.append('quantity', quantity);

    fetch(getApiUrl('update_qty'), {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          renderCartDrawer(data);
          // If on the full cart page, refresh table
          if (typeof window.refreshFullCartPage === 'function') {
            window.refreshFullCartPage(data);
          }
        }
      })
      .catch((err) => console.error('Update qty error:', err));
  }

  // Remove Item
  function removeCartItem(cartKey) {
    const formData = new FormData();
    formData.append('cart_key', cartKey);

    fetch(getApiUrl('remove_from_cart'), {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showToast('Item removed from cart', 'info');
          renderCartDrawer(data);
          if (typeof window.refreshFullCartPage === 'function') {
            window.refreshFullCartPage(data);
          }
        }
      })
      .catch((err) => console.error('Remove item error:', err));
  }

  // Global Add to Cart listener for buttons with data-product-id
  document.addEventListener('click', function (e) {
    const addBtn = e.target.closest('.btn-add-to-cart');
    if (addBtn) {
      e.preventDefault();
      const pId = addBtn.dataset.productId;
      const weight = addBtn.dataset.weight || '250g';
      const qtyInput = document.getElementById(`qty-${pId}`);
      const qty = qtyInput ? parseInt(qtyInput.value, 10) : 1;
      addToCart(pId, qty, weight);
    }

    const wishlistBtn = e.target.closest('.btn-wishlist-toggle');
    if (wishlistBtn) {
      e.preventDefault();
      const pId = wishlistBtn.dataset.productId;
      toggleWishlist(pId, wishlistBtn);
    }
  });

  // Toggle Wishlist
  window.toggleWishlist = function (productId, buttonEl) {
    const formData = new FormData();
    formData.append('product_id', productId);

    fetch(getApiUrl('toggle_wishlist'), {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          showToast(data.added ? 'Added to Wishlist!' : 'Removed from Wishlist', 'info');
          if (buttonEl) {
            buttonEl.classList.toggle('active', data.added);
          }
          const badges = document.querySelectorAll('.wishlist-count-badge');
          badges.forEach((b) => {
            b.textContent = data.wishlist_count;
            b.style.display = data.wishlist_count > 0 ? 'inline-flex' : 'none';
          });
        }
      })
      .catch((err) => console.error('Wishlist error:', err));
  };

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');

  const closeMobileNav = () => {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  const openMobileNav = () => {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', openMobileNav);
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileNav);
  }

  // Quick Search Overlay
  const searchBtn = document.getElementById('header-search-btn');
  const searchModal = document.getElementById('search-modal');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('search-modal-input');

  const closeSearchModal = () => {
    if (searchModal) searchModal.classList.remove('open');
  };

  if (searchBtn && searchModal) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      searchModal.classList.add('open');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });
  }

  if (searchClose && searchModal) {
    searchClose.addEventListener('click', closeSearchModal);
  }

  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        closeSearchModal();
      }
    });
  }

  // ==========================================================
  // Auto-scroll Product Card Images at Smooth Random 3-5.5s Intervals
  // ==========================================================
  function initProductCardsAutoScroll() {
    const cardLinks = document.querySelectorAll('.product-card-image-link[data-gallery]');
    if (!cardLinks || cardLinks.length === 0) return;

    cardLinks.forEach((wrap) => {
      let gallery = [];
      try {
        gallery = JSON.parse(wrap.getAttribute('data-gallery') || '[]');
      } catch (err) {
        return;
      }

      if (!Array.isArray(gallery) || gallery.length <= 1) return;

      const img = wrap.querySelector('.product-card-img');
      const dots = wrap.querySelectorAll('.card-img-dot');
      if (!img) return;

      // Ensure we have a secondary overlay layer for seamless ping-pong cross-fade
      let fadeImg = wrap.querySelector('.product-card-img-fade');
      if (!fadeImg) {
        fadeImg = document.createElement('img');
        fadeImg.className = 'product-card-img product-card-img-fade';
        fadeImg.alt = img.alt || '';
        fadeImg.setAttribute('aria-hidden', 'true');
        fadeImg.loading = 'lazy';
        const dotsWrap = wrap.querySelector('.card-img-dots');
        wrap.insertBefore(fadeImg, dotsWrap || null);
      }

      let currentIndex = 0;
      let isFadeOnTop = false; // false = img visible, true = fadeImg visible
      let timer = null;
      let isHovered = false;

      // Preload images for seamless transitions
      gallery.forEach((src) => {
        const preload = new Image();
        preload.src = src;
      });

      function switchCardImage(nextIndex) {
        currentIndex = (nextIndex + gallery.length) % gallery.length;
        const targetSrc = gallery[currentIndex];

        if (!isFadeOnTop) {
          // fadeImg is transparent; load target image into fadeImg and smoothly fade it IN
          fadeImg.src = targetSrc;
          fadeImg.style.opacity = '1';
          isFadeOnTop = true;
        } else {
          // fadeImg is visible; load target image into base img underneath, then fade fadeImg OUT
          img.src = targetSrc;
          fadeImg.style.opacity = '0';
          isFadeOnTop = false;
        }

        // Update indicator dots smoothly
        if (dots && dots.length > 0) {
          dots.forEach((dot, idx) => {
            if (idx === currentIndex) dot.classList.add('active');
            else dot.classList.remove('active');
          });
        }
      }

      function scheduleNextFlip() {
        if (timer) clearTimeout(timer);
        if (isHovered) return;

        // Gentle, relaxing random interval between 3200ms and 5500ms
        const randomDelay = Math.floor(Math.random() * (5500 - 3200 + 1)) + 3200;

        timer = setTimeout(() => {
          if (!isHovered) {
            switchCardImage(currentIndex + 1);
          }
          scheduleNextFlip();
        }, randomDelay);
      }

      // Pause on user hover, resume on leave
      const card = wrap.closest('.product-card') || wrap;
      card.addEventListener('mouseenter', () => {
        isHovered = true;
        if (timer) clearTimeout(timer);
      });

      card.addEventListener('mouseleave', () => {
        isHovered = false;
        scheduleNextFlip();
      });

      // Start initial flip timer with a randomized stagger
      scheduleNextFlip();
    });
  }

  initProductCardsAutoScroll();
});
