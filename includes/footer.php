<?php
/**
 * RTC Foods - Footer Partial
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/data.php';

$categories = get_all_categories();
?>
  </main>

  <!-- Partner Delivery Platforms Banner -->
  <section class="partners-section">
    <div class="partners-container">
      <span class="partners-label">Also available on premier delivery platforms:</span>
      <div class="partners-grid">
        <img src="<?php echo asset('partner_blinkit.png'); ?>" alt="Blinkit" class="partner-logo" onerror="this.style.display='none'" />
        <img src="<?php echo asset('partner_zepto.png'); ?>" alt="Zepto" class="partner-logo" onerror="this.style.display='none'" />
        <img src="<?php echo asset('partner_swiggy.png'); ?>" alt="Swiggy Instamart" class="partner-logo" onerror="this.style.display='none'" />
        <img src="<?php echo asset('partner_bigbasket.png'); ?>" alt="BigBasket" class="partner-logo" onerror="this.style.display='none'" />
        <img src="<?php echo asset('partner_zomato.png'); ?>" alt="Zomato" class="partner-logo" onerror="this.style.display='none'" />
        <img src="<?php echo asset('partner_countrydelight.png'); ?>" alt="Country Delight" class="partner-logo" onerror="this.style.display='none'" />
      </div>
    </div>
  </section>

  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="footer-top-container">
      <div class="footer-columns-grid">
        <!-- Brand Column -->
        <div class="footer-column brand-col">
          <img src="<?php echo asset('rtc-logo-transparent.png'); ?>" alt="RTC Foods" class="footer-logo" onerror="this.onerror=null;this.src='<?php echo asset('rtc-logo.png'); ?>';" />
          <p class="footer-desc">
            RTC Foods brings you authentic, premium-grade dry fruits, handpicked nuts, natural sun-dried berries, and aromatic whole spices directly sourced from certified global orchards and heritage Indian farms.
          </p>
          <div class="footer-fssai-badge">
            <i data-lucide="shield-check" class="green-icon"></i>
            <span>100% FSSAI Certified & Food Safety Compliant</span>
          </div>
          <div class="footer-social-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i data-lucide="instagram"></i></a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i data-lucide="facebook"></i></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i data-lucide="linkedin"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i data-lucide="twitter"></i></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-column">
          <h4 class="footer-heading">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="<?php echo url('index.php'); ?>">Home</a></li>
            <li><a href="<?php echo url('products.php'); ?>">All Products</a></li>
            <li><a href="<?php echo url('about-us.php'); ?>">About RTC Foods</a></li>
            <li><a href="<?php echo url('certificates.php'); ?>">Quality Certificates</a></li>
            <li><a href="<?php echo url('blog.php'); ?>">Wellness & Nutrition Blog</a></li>
            <li><a href="<?php echo url('faqs.php'); ?>">Frequently Asked Questions</a></li>
            <li><a href="<?php echo url('contact-us.php'); ?>">Contact Us</a></li>
          </ul>
        </div>

        <!-- Product Categories -->
        <div class="footer-column">
          <h4 class="footer-heading">Categories</h4>
          <ul class="footer-links">
            <?php foreach ($categories as $cat): ?>
              <li><a href="<?php echo url('products.php?category=' . urlencode($cat['id'])); ?>"><?php echo htmlspecialchars($cat['name']); ?></a></li>
            <?php endforeach; ?>
          </ul>
        </div>

        <!-- Policies & Legal -->
        <div class="footer-column">
          <h4 class="footer-heading">Customer Policies</h4>
          <ul class="footer-links">
            <li><a href="<?php echo url('policy.php?type=shipping'); ?>">Shipping & Delivery Policy</a></li>
            <li><a href="<?php echo url('policy.php?type=returns'); ?>">Returns & Cancellation Policy</a></li>
            <li><a href="<?php echo url('policy.php?type=privacy'); ?>">Privacy Policy</a></li>
            <li><a href="<?php echo url('policy.php?type=terms'); ?>">Terms & Conditions</a></li>
            <li><a href="<?php echo url('account.php'); ?>">Order Tracking & Invoices</a></li>
          </ul>
        </div>

        <!-- Newsletter Column -->
        <div class="footer-column newsletter-col">
          <h4 class="footer-heading">Stay Connected</h4>
          <p class="newsletter-subtext">Subscribe for exclusive seasonal offers, health recipes, and new harvest arrivals.</p>
          <form class="footer-newsletter-form" onsubmit="event.preventDefault(); window.showToast('Thank you for subscribing to RTC Foods!', 'success'); this.reset();">
            <div class="newsletter-input-group">
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" class="btn-newsletter-submit" aria-label="Subscribe"><i data-lucide="send"></i></button>
            </div>
          </form>
          <div class="customer-care-box">
            <span class="care-label">Customer Support:</span>
            <a href="mailto:info@rtcfoods.in" class="care-link"><i data-lucide="mail"></i> info@rtcfoods.in</a>
            <a href="tel:+919876543210" class="care-link"><i data-lucide="phone"></i> +91 98765 43210</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Copyright & Badges -->
    <div class="footer-bottom-container">
      <div class="footer-bottom-inner">
        <p class="copyright-text">
          &copy; <?php echo date('Y'); ?> <strong><?php echo SITE_NAME; ?></strong>. All Rights Reserved. Crafted with care in India.
        </p>
        <div class="secure-payment-badges">
          <span class="payment-badge">UPI</span>
          <span class="payment-badge">RuPay</span>
          <span class="payment-badge">Visa</span>
          <span class="payment-badge">Mastercard</span>
          <span class="payment-badge">NetBanking</span>
          <span class="payment-badge">Cash on Delivery</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Toast Container -->
  <div id="toast-container" class="toast-container"></div>

  <!-- Application Scripts -->
  <script src="<?php echo asset('assets/js/app.js'); ?>?v=<?php echo filemtime(__DIR__ . '/../assets/js/app.js'); ?>"></script>
</body>
</html>
