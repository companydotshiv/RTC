<?php
/**
 * RTC Foods - Legal Policies (Shipping, Returns, Privacy, Terms)
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$type = clean_input($_GET['type'] ?? 'shipping');
$validTypes = ['shipping', 'returns', 'privacy', 'terms'];
if (!in_array($type, $validTypes, true)) {
    $type = 'shipping';
}

$titles = [
    'shipping' => 'Shipping & Delivery Policy',
    'returns' => 'Return, Refund & Cancellation Policy',
    'privacy' => 'Privacy Policy',
    'terms' => 'Terms & Conditions'
];

$pageTitle = $titles[$type];
$pageDescription = 'Review the official ' . $titles[$type] . ' of RTC Foods.';

include __DIR__ . '/includes/header.php';
?>

<div class="content-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current"><?php echo htmlspecialchars($titles[$type]); ?></span>
    </div>

    <!-- Policy Navigation Tabs -->
    <div class="policy-tabs-nav">
      <a href="<?php echo url('policy.php?type=shipping'); ?>" class="policy-tab <?php echo $type === 'shipping' ? 'active' : ''; ?>">Shipping Policy</a>
      <a href="<?php echo url('policy.php?type=returns'); ?>" class="policy-tab <?php echo $type === 'returns' ? 'active' : ''; ?>">Returns & Refunds</a>
      <a href="<?php echo url('policy.php?type=privacy'); ?>" class="policy-tab <?php echo $type === 'privacy' ? 'active' : ''; ?>">Privacy Policy</a>
      <a href="<?php echo url('policy.php?type=terms'); ?>" class="policy-tab <?php echo $type === 'terms' ? 'active' : ''; ?>">Terms of Service</a>
    </div>

    <div class="policy-content-card">
      <h1 class="policy-title"><?php echo htmlspecialchars($titles[$type]); ?></h1>
      <p class="policy-meta">Last Updated: January 15, 2026 | Effective for all orders placed on rtcfoods.in</p>

      <div class="policy-text-body">
        <?php if ($type === 'shipping'): ?>
          <h3>1. Order Processing & Dispatch</h3>
          <p>All orders placed on RTC Foods are processed and hygienically packaged within 24 hours of confirmation. Orders received on Sundays or national holidays are dispatched on the immediate next working business day.</p>

          <h3>2. Delivery Timelines</h3>
          <ul>
            <li><strong>Delhi NCR & Metro Cities:</strong> 2 to 3 working business days.</li>
            <li><strong>Tier-2 & Tier-3 Cities:</strong> 3 to 5 working business days.</li>
            <li><strong>Remote & North-Eastern Regions:</strong> 5 to 7 working business days.</li>
          </ul>

          <h3>3. Shipping Charges</h3>
          <p>Orders totaling <strong>₹499 or more</strong> qualify for 100% <strong>FREE Express Shipping</strong> anywhere within India. For orders below ₹499, a nominal standard logistics handling fee of ₹50 is applied at checkout.</p>

          <h3>4. Tamper-Proof Packaging</h3>
          <p>All items are sealed in food-grade multi-barrier nitrogen flushed pouches or airtight food jars to prevent oxidation, moisture ingress, or external odor contamination during transit.</p>

        <?php elseif ($type === 'returns'): ?>
          <h3>1. 7-Day Replacement Guarantee</h3>
          <p>Due to the consumable nature of food items, products once delivered cannot be returned for general preference. However, we offer an immediate <strong>100% Free Replacement</strong> if:</p>
          <ul>
            <li>The parcel packaging or pouch seal was visibly torn, punctured, or damaged upon arrival.</li>
            <li>An incorrect product or variant size was dispatched in error.</li>
            <li>The contents exhibit any sensory rancidity or manufacturing seal defect.</li>
          </ul>

          <h3>2. Reporting a Quality Concern</h3>
          <p>To request a replacement, please notify us within <strong>7 days of delivery</strong> by sending an email with your Order ID and clear photographs of the defect to <strong>info@rtcfoods.in</strong> or WhatsApp at <strong>+91 98765 43210</strong>.</p>

          <h3>3. Cancellation Policy</h3>
          <p>You may cancel an order free of charge at any time prior to shipment dispatch. Once a parcel has been handed over to our third-party logistics courier, cancellation is not permissible.</p>

        <?php elseif ($type === 'privacy'): ?>
          <h3>1. Information We Collect</h3>
          <p>When you place an order or create an account, we collect necessary customer details including your name, contact phone number, shipping address, and email address for order processing and dispatch notifications.</p>

          <h3>2. Secure Payment Processing</h3>
          <p>RTC Foods does <strong>not</strong> store, log, or have access to your sensitive financial payment data, credit card numbers, CVVs, or UPI PINs. All online payment transactions are processed through RBI-authorized, PCI-DSS compliant payment gateways.</p>

          <h3>3. Zero Spam & Data Selling</h3>
          <p>We respect your personal privacy. RTC Foods will never sell, rent, license, or disclose your contact information to third-party telemarketers or advertisers.</p>

        <?php elseif ($type === 'terms'): ?>
          <h3>1. Terms of Website Use</h3>
          <p>By accessing and browsing the RTC Foods website or ordering products through our platform, you acknowledge and agree to comply with our stated Terms and Conditions and applicable Indian commercial regulations.</p>

          <h3>2. Pricing & Product Accuracy</h3>
          <p>Prices, product images, packaging dimensions, and available weights are subject to continuous updates based on seasonal harvests. While we strive for absolute accuracy, inadvertent typographical errors are subject to correction without prior notice.</p>

          <h3>3. Governing Law & Jurisdiction</h3>
          <p>All transactions, disputes, and legal claims arising from transactions conducted on this website are subject exclusively to the jurisdiction of the competent courts of Delhi / Sonipat, Haryana, India.</p>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
