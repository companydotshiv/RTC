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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="social-btn social-instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="social-btn social-facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="social-btn social-whatsapp">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="social-btn social-youtube">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="social-btn social-linkedin">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v7.6H9.2v-7.6H6.46M7.83 6.45a1.64 1.64 0 1 0 1.64 1.64 1.63 1.63 0 0 0-1.64-1.64z"/>
              </svg>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="social-btn social-x">
              <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
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

  <!-- RTC AI Shopping Concierge Chatbot -->
  <link rel="stylesheet" href="<?php echo asset('assets/css/chatbot.css'); ?>?v=<?php echo filemtime(__DIR__ . '/../assets/css/chatbot.css'); ?>" />
  <script src="<?php echo asset('assets/js/chatbot.js'); ?>?v=<?php echo filemtime(__DIR__ . '/../assets/js/chatbot.js'); ?>"></script>
</body>
</html>

