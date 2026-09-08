/**
 * WordPress & WooCommerce Identical Admin JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. WooCommerce Product Data Tabs Switching
  const wcTabs = document.querySelectorAll('ul.wc-tabs li a');
  wcTabs.forEach(tab => {
    tab.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      if (!targetId) return;

      // Deactivate all tabs
      document.querySelectorAll('ul.wc-tabs li').forEach(li => li.classList.remove('active'));
      document.querySelectorAll('.wc-tab-panel').forEach(panel => panel.classList.remove('active'));

      // Activate clicked tab
      this.parentElement.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 2. Select All Checkboxes in Table
  const selectAllCbs = document.querySelectorAll('.cb-select-all');
  selectAllCbs.forEach(allCb => {
    allCb.addEventListener('change', function () {
      const isChecked = this.checked;
      document.querySelectorAll('input[name="post[]"]').forEach(cb => {
        cb.checked = isChecked;
      });
    });
  });

  // 3. Auto-generate permalink slug from title if empty
  const titleInput = document.getElementById('title');
  const slugInput = document.getElementById('post_name');
  if (titleInput && slugInput) {
    titleInput.addEventListener('blur', function () {
      if (!slugInput.value) {
        slugInput.value = this.value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      }
    });
  }

  // 4. Coupon Code Generator
  window.generateCouponCode = function () {
    const prefixes = ['RTC', 'FESTIVE', 'SPECIAL', 'HARVEST', 'SAVE', 'ORGANIC'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(10 + Math.random() * 90);
    const code = `${randomPrefix}${randomNum}`;
    const codeInput = document.getElementById('coupon_code');
    if (codeInput) {
      codeInput.value = code;
    }
  };

  // 5. Category Quick Adder
  const addCatToggle = document.getElementById('add-cat-toggle');
  const addCatBox = document.getElementById('add-cat-box');
  if (addCatToggle && addCatBox) {
    addCatToggle.addEventListener('click', function (e) {
      e.preventDefault();
      addCatBox.style.display = addCatBox.style.display === 'none' ? 'block' : 'none';
    });
  }

  window.addNewCategoryInline = function () {
    const input = document.getElementById('new-cat-name');
    if (!input || !input.value.trim()) return;
    const catName = input.value.trim();
    const list = document.querySelector('.categorychecklist');
    if (list) {
      const li = document.createElement('li');
      li.innerHTML = `
        <label>
          <input type="checkbox" name="tax_input[product_cat][]" value="${catName.toLowerCase().replace(/\s+/g, '-')}" checked />
          ${catName}
        </label>
      `;
      list.prepend(li);
      input.value = '';
    }
  };

  // 6. Elementor Visual Builder Live Drag & Drop / Click to Insert
  const canvasArea = document.getElementById('elementor-canvas-content');
  if (canvasArea) {
    window.insertElementorWidget = function (type) {
      let widgetHtml = '';
      if (type === 'heading') {
        widgetHtml = `
          <div class="elementor-section-box">
            <span class="elementor-handle-tag">Heading</span>
            <h2 contenteditable="true" style="font-size:2rem; font-weight:800; color:#1D231F; margin:0 0 10px 0;">Handpicked Festive Delights</h2>
            <p contenteditable="true" style="color:#64748b; margin:0;">Directly sourced from certified international orchards and heritage Kashmir farms.</p>
          </div>
        `;
      } else if (type === 'product_grid') {
        widgetHtml = `
          <div class="elementor-section-box">
            <span class="elementor-handle-tag">Product Grid</span>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-top:10px;">
              <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px; text-align:center;">
                <div style="height:100px; background:#f8fafc; border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:8px;">🌰 Almonds</div>
                <strong>California Almonds</strong>
                <div style="color:#15803D; font-weight:700; margin-top:4px;">₹274.00</div>
              </div>
              <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px; text-align:center;">
                <div style="height:100px; background:#f8fafc; border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:8px;">🥜 Cashews</div>
                <strong>Jumbo Whole Cashews</strong>
                <div style="color:#15803D; font-weight:700; margin-top:4px;">₹300.00</div>
              </div>
              <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px; text-align:center;">
                <div style="height:100px; background:#f8fafc; border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:8px;">🧠 Walnuts</div>
                <strong>Platinum Walnuts</strong>
                <div style="color:#15803D; font-weight:700; margin-top:4px;">₹420.00</div>
              </div>
            </div>
          </div>
        `;
      } else if (type === 'button') {
        widgetHtml = `
          <div class="elementor-section-box" style="text-align:center;">
            <span class="elementor-handle-tag">Button</span>
            <a href="#" style="display:inline-block; background:#15803D; color:#fff; font-weight:700; padding:12px 28px; border-radius:8px; text-decoration:none;">Explore Fresh Harvest &rarr;</a>
          </div>
        `;
      } else if (type === 'banner') {
        widgetHtml = `
          <div class="elementor-section-box" style="background:linear-gradient(135deg, #0f1710, #16241a); color:#fff; border-radius:14px; padding:30px;">
            <span class="elementor-handle-tag" style="background:#f5a623; color:#000;">Promo Banner</span>
            <span style="background:rgba(245,166,35,0.2); color:#f5a623; border:1px solid #f5a623; padding:4px 10px; border-radius:20px; font-size:11px; font-weight:700;">CELEBRATION EDITION</span>
            <h3 contenteditable="true" style="color:#fff; font-size:1.8rem; margin:14px 0 10px 0;">Corporate & Festive Gift Hampers</h3>
            <p contenteditable="true" style="color:rgba(255,255,255,0.8); margin:0 0 18px 0;">Luxury wooden keepsake boxes with custom laser engraving & doorstep dispatch across India.</p>
            <button type="button" style="background:#f5a623; color:#000; border:none; padding:10px 22px; border-radius:6px; font-weight:700; cursor:pointer;">Order Custom Hampers</button>
          </div>
        `;
      }

      const wrapper = document.createElement('div');
      wrapper.innerHTML = widgetHtml;
      canvasArea.appendChild(wrapper.firstElementChild);
    };
  }

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
