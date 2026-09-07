<?php
/**
 * RTC Foods - Contact Us Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'Contact Us - Customer Care & Bulk Inquiries';
$pageDescription = 'Get in touch with RTC Foods for customer support, bulk wholesale dry fruits orders, corporate gifting, or dealership inquiries.';

$submitted = false;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = clean_input($_POST['name'] ?? '');
    $email = clean_input($_POST['email'] ?? '');
    $phone = clean_input($_POST['phone'] ?? '');
    $subject = clean_input($_POST['subject'] ?? 'General Inquiry');
    $message = clean_input($_POST['message'] ?? '');

    // In a real setup, mail() can be dispatched here
    $submitted = true;
}

include __DIR__ . '/includes/header.php';
?>

<div class="content-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">Contact Us</span>
    </div>

    <div class="section-header text-center">
      <span class="section-pre-title text-gold">We're Here For You</span>
      <h1 class="section-title">Get in Touch with RTC Foods</h1>
      <p class="section-desc">Have a question regarding our products, corporate gifting, or an existing delivery? Reach out directly to our support desk.</p>
    </div>

    <div class="contact-layout-grid">
      <!-- Contact Details Column -->
      <div class="contact-info-col">
        <div class="contact-info-card">
          <div class="info-icon"><i data-lucide="phone"></i></div>
          <div>
            <h4>Phone & WhatsApp</h4>
            <p>Mon–Sat: 9:00 AM – 7:00 PM</p>
            <a href="tel:+919876543210" class="info-link font-bold">+91 98765 43210</a>
          </div>
        </div>

        <div class="contact-info-card">
          <div class="info-icon"><i data-lucide="mail"></i></div>
          <div>
            <h4>Email Support</h4>
            <p>Typical response time within 4 hours</p>
            <a href="mailto:info@rtcfoods.in" class="info-link font-bold">info@rtcfoods.in</a>
          </div>
        </div>

        <div class="contact-info-card">
          <div class="info-icon"><i data-lucide="map-pin"></i></div>
          <div>
            <h4>Processing & Packaging Facility</h4>
            <p>Phase-IV, HSIIDC Industrial Estate, Kundli, Sonipat, Haryana – 131028, India</p>
          </div>
        </div>

        <div class="contact-info-card">
          <div class="info-icon"><i data-lucide="gift"></i></div>
          <div>
            <h4>Corporate & Bulk Orders</h4>
            <p>For custom gift hampers and wholesale pallet pricing:</p>
            <a href="mailto:corporate@rtcfoods.in" class="info-link font-bold">corporate@rtcfoods.in</a>
          </div>
        </div>
      </div>

      <!-- Contact Form Column -->
      <div class="contact-form-col">
        <div class="contact-form-card">
          <?php if ($submitted): ?>
            <div class="alert-box alert-success text-center">
              <i data-lucide="check-circle" class="large-icon"></i>
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for contacting RTC Foods. Our customer care representative will review your message and reach out within 24 hours.</p>
            </div>
          <?php else: ?>
            <h3>Send Us a Message</h3>
            <form method="POST" action="<?php echo url('contact-us.php'); ?>" class="contact-form">
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="contact-name">Full Name *</label>
                  <input type="text" id="contact-name" name="name" required placeholder="Your name" />
                </div>
                <div class="form-group">
                  <label for="contact-phone">Phone Number *</label>
                  <input type="tel" id="contact-phone" name="phone" required placeholder="10-digit number" />
                </div>
              </div>

              <div class="form-grid-2">
                <div class="form-group">
                  <label for="contact-email">Email Address *</label>
                  <input type="email" id="contact-email" name="email" required placeholder="name@domain.com" />
                </div>
                <div class="form-group">
                  <label for="contact-subject">Inquiry Type</label>
                  <select id="contact-subject" name="subject">
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Corporate Gifting">Festive & Corporate Gifting</option>
                    <option value="Wholesale Bulk">Bulk Wholesale Purchasing</option>
                    <option value="Order Support">Order Tracking & Support</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="contact-message">Your Message *</label>
                <textarea id="contact-message" name="message" rows="5" required placeholder="How can we assist you today?"></textarea>
              </div>

              <button type="submit" class="btn-primary-gold">
                Send Message <i data-lucide="send"></i>
              </button>
            </form>
          <?php endif; ?>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
