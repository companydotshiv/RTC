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
          <div class="policy-callout-box">
            <h4>🚚 Quick Summary: Delivery Across India</h4>
            <p>We partner with premier express air & surface logistics partners (BlueDart, Delhivery, DTDC, Xpressbees) to ensure our farm-fresh dry fruits, nuts, and whole spices reach your kitchen at peak freshness.</p>
          </div>

          <h3>1. Order Processing, Verification & Dispatch Protocols</h3>
          <p>Every order received on the RTC Foods online portal undergoes immediate automated validation followed by rigorous quality inspection at our climate-controlled processing and packaging facility located in HSIIDC Industrial Estate, Kundli, Haryana.</p>
          <p>Orders confirmed before <strong>2:00 PM IST</strong> on working days (Monday through Saturday) are hygienically packed, nitrogen-purged, and dispatched on the very same day. Orders received after 2:00 PM IST or on Sundays and National Public Holidays are dispatched on the immediate subsequent business day.</p>

          <h3>2. Domestic Delivery Timelines & Regional Coverage</h3>
          <p>RTC Foods delivers to over 19,000 postal pincodes across all 28 States and 8 Union Territories in India. Typical transit milestones from the timestamp of courier dispatch include:</p>
          <ul>
            <li><strong>Delhi NCR (Delhi, Gurgaon, Noida, Faridabad, Ghaziabad, Sonipat):</strong> 24 to 48 hours (Next-Day or 2-Day Delivery).</li>
            <li><strong>Tier-1 Metro Hubs (Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Pune, Ahmedabad):</strong> 2 to 3 business days via priority express air freight.</li>
            <li><strong>Tier-2 & Tier-3 Regional Centers:</strong> 3 to 5 business days via surface express.</li>
            <li><strong>Jammu & Kashmir, Himachal Pradesh, Uttarakhand & North-Eastern States:</strong> 5 to 7 business days, subject to local weather and road accessibility conditions.</li>
            <li><strong>Island Territories (Andaman & Nicobar, Lakshadweep):</strong> 7 to 10 business days via India Post Speed Post / multimodal cargo.</li>
          </ul>

          <h3>3. Transparent Shipping Charges & Free Shipping Threshold</h3>
          <p>We take pride in our zero-hidden-fee pricing policy:</p>
          <ul>
            <li><strong>Orders of ₹499 and Above:</strong> Qualify for <strong>100% Free Standard & Express Shipping</strong> across all deliverable pincodes in India.</li>
            <li><strong>Orders Below ₹499:</strong> A flat, subsidized logistics handling charge of <strong>₹50</strong> is automatically added at final checkout to offset parcel handling and courier surcharges.</li>
            <li><strong>Cash on Delivery (COD) Convenience:</strong> Zero additional convenience surcharges for COD orders up to ₹5,000.</li>
          </ul>

          <h3>4. Multi-Layer Nitrogen-Flushed Protective Packaging</h3>
          <p>Food integrity is our paramount promise. All dry fruits, raw nuts, dehydrated berries, and whole spices are packed in high-barrier metallized multi-layer pouches or food-grade sealed PET containers:</p>
          <ul>
            <li><strong>Nitrogen Flushing:</strong> Displaces residual oxygen to prevent lipid rancidity and retain crunchy texture.</li>
            <li><strong>Hermetic Heat Seal:</strong> Prevents atmospheric moisture, insect penetration, and external odor absorption during multi-state transit.</li>
            <li><strong>Corrugated Outer Shippers:</strong> High-burst-strength 5-ply cartons cushioned with biodegradable paper fillers to prevent crushing during transit.</li>
          </ul>

          <h3>5. Real-Time Consignment Tracking & SMS / WhatsApp Milestones</h3>
          <p>Upon courier handover, an automated tracking notification containing the direct Courier Partner Name, Tracking Waybill / AWB Number, and clickable tracking URL is dispatched to your registered mobile number via SMS, WhatsApp, and email. You may also track real-time milestones anytime through our <a href="<?php echo url('account.php'); ?>" class="text-green font-bold">Track Order Portal</a>.</p>

          <h3>6. Delivery Attempts, Address Corrections & Undelivered Parcels</h3>
          <p>Our courier partners make up to <strong>three (3) consecutive delivery attempts</strong> before initiating Return-to-Origin (RTO). If you are unavailable, please coordinate with the delivery executive via the OTP / calling prompt. If a parcel is returned due to incorrect address or recipient refusal, re-dispatch charges of ₹75 will apply.</p>

        <?php elseif ($type === 'returns'): ?>
          <div class="policy-callout-box">
            <h4>🛡️ 100% Customer Satisfaction & Quality Guarantee</h4>
            <p>Because dry fruits, raw nuts, and spices are perishable food consumables, standard return policies differ from apparel or electronics. However, RTC Foods stands firmly behind the unmatched quality of every gram shipped. If your package arrives defective, damaged, or incorrect, we provide a 100% Free Replacement or Full Refund.</p>
          </div>

          <h3>1. Qualifying Conditions for Return or Immediate Replacement</h3>
          <p>In adherence to Food Safety and Standards Authority of India (FSSAI) hygiene directives, opened food packages cannot be returned for general preference or taste subjectivity. However, you are eligible for an immediate replacement or refund if:</p>
          <ul>
            <li><strong>Transit Damage or Package Breach:</strong> The outer corrugated box or inside product pouch arrived torn, punctured, crushed, or visibly tampered with.</li>
            <li><strong>Incorrect Product or Variant:</strong> You received an item, pack size (e.g. 250g instead of 1kg), or variant different from your confirmed invoice.</li>
            <li><strong>Freshness or Seal Defect:</strong> The vacuum seal was broken, or the nuts/spices exhibited abnormal rancidity or moisture upon immediate opening.</li>
            <li><strong>Missing Quantity:</strong> Any item listed on your dispatch packing slip is missing from the sealed box.</li>
          </ul>

          <h3>2. Reporting Window & Verification Process</h3>
          <p>To claim a replacement or refund, please follow these simple steps:</p>
          <ol>
            <li><strong>Notify within 7 Days:</strong> Submit your request within <strong>7 calendar days</strong> of parcel delivery confirmation.</li>
            <li><strong>Evidence Requirement:</strong> Email <strong>info@rtcfoods.in</strong> or WhatsApp <strong>+91 98765 43210</strong> with your Order Number (e.g. RTC-2026-XXXX), clear photographs of the shipping label, batch number printed on the pouch, and defect photos.</li>
            <li><strong>Unboxing Video Recommendation:</strong> For claims regarding missing items or visible transit damage, a short continuous unboxing video recorded while opening the courier bag expedites replacement approval within 4 hours.</li>
          </ol>

          <h3>3. Resolution Modes: Free Replacement vs. Instant Refund</h3>
          <p>Once our Quality Assurance desk verifies your claim:</p>
          <ul>
            <li><strong>Priority Replacement:</strong> A brand-new replacement unit is dispatched via Express Air within 24 hours at zero added charge.</li>
            <li><strong>Store Credit / Gift Voucher:</strong> 100% order value issued instantly as an RTC Foods wallet credit with lifetime validity.</li>
            <li><strong>Original Payment Method Refund:</strong> Initiated directly back to your source account within 24 business hours.</li>
          </ul>

          <h3>4. Refund Settlement Timelines</h3>
          <table class="policy-table">
            <thead>
              <tr>
                <th>Payment Mode</th>
                <th>Refund Processing Channel</th>
                <th>Settlement Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>UPI (GPay, PhonePe, Paytm)</td>
                <td>Direct Virtual Payment Address (VPA) Credit</td>
                <td>Instant to 24 Hours</td>
              </tr>
              <tr>
                <td>Debit / Credit Cards</td>
                <td>Bank Payment Gateway Reversal</td>
                <td>3 to 5 Working Business Days</td>
              </tr>
              <tr>
                <td>Net Banking</td>
                <td>Direct NEFT / IMPS Bank Transfer</td>
                <td>2 to 4 Working Business Days</td>
              </tr>
              <tr>
                <td>Cash on Delivery (COD)</td>
                <td>Bank Account Transfer (NEFT/UPI Details required)</td>
                <td>24 to 48 Hours upon details submission</td>
              </tr>
            </tbody>
          </table>

          <h3>5. Order Cancellation Policy</h3>
          <p>Orders can be cancelled at zero penalty prior to dispatch:</p>
          <ul>
            <li><strong>Pre-Dispatch Cancellations:</strong> You can cancel directly from your <a href="<?php echo url('account.php'); ?>" class="text-green font-bold">My Account</a> dashboard or by calling customer care within 2 hours of placing the order. 100% refund is initiated immediately.</li>
            <li><strong>Post-Dispatch Cancellations:</strong> Once the tracking number is generated and courier has taken custody, the consignment is in active transit and cannot be cancelled in flight. In exceptional circumstances, refusing delivery upon courier arrival will trigger a refund minus return freight fees of ₹80.</li>
          </ul>

        <?php elseif ($type === 'privacy'): ?>
          <div class="policy-callout-box">
            <h4>🔒 Your Privacy is Sacred: Zero Telemarketing & Zero Data Reselling</h4>
            <p>RTC Foods adheres strictly to the Information Technology Act, 2000, IT (Reasonable Security Practices) Rules, 2011, and the Digital Personal Data Protection Act, 2023 (DPDP Act). We never sell, rent, lease, or monetize your personal identity or browsing habits to any third party.</p>
          </div>

          <h3>1. Category of Personal Data Collected</h3>
          <p>In order to fulfill and deliver your grocery orders, we collect only strictly necessary information:</p>
          <ul>
            <li><strong>Contact Identity:</strong> Full legal name, delivery shipping address, billing address, postal pincode, primary mobile phone number, and email address.</li>
            <li><strong>Transactional Records:</strong> Order identification numbers, purchased items, chosen weights, date/time timestamps, invoice amounts, and transaction confirmation codes.</li>
            <li><strong>Technical Telemetry:</strong> Device IP address, browser user-agent, operating system, approximate geographic location, and session cookies to maintain your shopping cart and wishlists.</li>
          </ul>

          <h3>2. Strict Non-Access to Sensitive Financial Data</h3>
          <p>RTC Foods strictly observes RBI and PCI-DSS Level 1 compliance directives. <strong>We do NOT store, capture, or have access to:</strong></p>
          <ul>
            <li>Your credit or debit card numbers, expiry dates, or CVV/CVC codes.</li>
            <li>Your UPI PIN, net banking credentials, or one-time passwords (OTPs).</li>
          </ul>
          <p>All financial payment authorization is handled on encrypted 256-bit SSL HTTPS channels hosted directly on the PCI-DSS certified servers of authorized Indian payment aggregators (e.g. Razorpay, Cashfree, PhonePe PG).</p>

          <h3>3. Purpose and Legal Basis of Processing</h3>
          <p>Your collected information is processed solely for legitimate commercial purposes:</p>
          <ul>
            <li>Printing shipping labels, packaging slips, and tax-compliant GST invoices.</li>
            <li>Dispatching courier consignment tracking updates via SMS, WhatsApp, and email.</li>
            <li>Providing proactive customer support, resolving returns, or answering dietary queries.</li>
            <li>Delivering seasonal discount coupon codes (which you can opt out of with a single click at any time).</li>
          </ul>

          <h3>4. Information Sharing with Authorized Service Partners</h3>
          <p>We disclose your identity data only to essential operational partners bound by non-disclosure agreements:</p>
          <ul>
            <li><strong>Integrated Courier Partners:</strong> (BlueDart, Delhivery, DTDC) to fulfill physical delivery to your doorstep.</li>
            <li><strong>Transactional SMS / Communication Providers:</strong> To deliver one-time OTPs, dispatch alerts, and digital tax invoices.</li>
            <li><strong>Law Enforcement Authorities:</strong> Solely when compelled by a formal subpoena or statutory requirement under Indian law.</li>
          </ul>

          <h3>5. Cookies, Local Storage & User Control</h3>
          <p>We use functional session cookies to remember items placed in your shopping cart, items in your saved wishlist, and active user login sessions. You may configure your browser to block or delete cookies at any time; however, note that disabling cookies may affect seamless checkout functionality.</p>

          <h3>6. Data Retention, Right to Erasure & Grievance Officer</h3>
          <p>We retain transaction data as mandated by Indian GST, commercial taxation, and FSSAI audit laws for up to 7 financial years. You retain the right to request access, correction, or permanent anonymization/erasure of your personal account by contacting our designated Privacy Grievance Officer:</p>
          <div class="policy-officer-card">
            <strong>Data Protection & Grievance Officer:</strong><br />
            Mr. Rakesh Sharma (Compliance Officer, RTC Foods)<br />
            Email: <a href="mailto:privacy@rtcfoods.in" class="text-green font-bold">privacy@rtcfoods.in</a> / <a href="mailto:info@rtcfoods.in" class="text-green font-bold">info@rtcfoods.in</a><br />
            Address: Phase-IV, HSIIDC Industrial Estate, Kundli, Sonipat, Haryana – 131028, India<br />
            Response Window: Statutory response within 48 business hours.
          </div>

        <?php elseif ($type === 'terms'): ?>
          <div class="policy-callout-box">
            <h4>📜 Legal Agreement for Use of RTC Foods Services</h4>
            <p>Welcome to RTC Foods (rtcfoods.in). These Terms and Conditions constitute a legally binding electronic agreement between you (the "Customer" or "User") and RTC Foods regarding your use of this website, user accounts, and purchases of dry fruits, nuts, berries, and whole spices.</p>
          </div>

          <h3>1. Electronic Record & Acceptance of Terms</h3>
          <p>This document is an electronic record published in accordance with the provisions of Rule 3(1) of the Information Technology (Intermediaries Guidelines) Rules, 2011. By accessing, browsing, creating an account, or placing an order on rtcfoods.in, you explicitly acknowledge and agree to be bound by these Terms & Conditions and our associated Privacy and Refund policies.</p>

          <h3>2. User Eligibility & Account Responsibilities</h3>
          <p>Use of this portal is restricted to persons who are legally competent to enter into contracts under the Indian Contract Act, 1872. If you are under 18 years of age, you may browse our catalog only under the supervision of a parent or legal guardian.</p>
          <p>When you register an account, you agree to provide authentic, accurate, and current information. You are solely responsible for maintaining the confidentiality of your credentials and account password.</p>

          <h3>3. Product Specifications, Natural Variations & Pricing</h3>
          <p>All agricultural food products listed on this site—including California almonds, Kashmiri walnuts, Afghan figs, jumbo cashews, cardamom, and saffron—are natural organic produce. As such:</p>
          <ul>
            <li><strong>Natural Variations:</strong> Minor natural variances in kernel size, color hue, natural skin marks, and individual kernel count per kilogram are intrinsic characteristics of authentic, unpolished crops and do not constitute defects.</li>
            <li><strong>Pricing Updates:</strong> Commodity market prices and seasonal harvests fluctuate. All prices displayed are in Indian Rupees (INR, ₹), inclusive of applicable CGST and SGST. Prices are subject to revision without prior notice, but price changes will never affect an order that has already been confirmed and paid for.</li>
            <li><strong>Typographical Errors:</strong> In the rare event of a typographical pricing error (e.g. an item listed at ₹0 or a miscalculated discount), RTC Foods reserves the right to cancel the order and provide an immediate 100% refund.</li>
          </ul>

          <h3>4. Food Safety, FSSAI Compliance & Storage Advisory</h3>
          <p>RTC Foods operates in strict compliance with the Food Safety and Standards Act, 2006 (FSSAI). All products are processed, graded, and packed in hygienic, certified premises. Customers are strongly advised to adhere to stated on-pack storage guidelines (cool, dry place, sealed containers, or refrigeration during humid weather) to prevent moisture degradation or natural oil oxidation.</p>

          <h3>5. Intellectual Property Rights</h3>
          <p>All graphic branding, logos, photographic product packaging images, website UI source code, banners, product names, descriptions, and written articles appearing on rtcfoods.in are the exclusive intellectual property of RTC Foods and protected under the Indian Copyright Act, 1957 and Trade Marks Act, 1999. Unauthorized scraping, reproduction, hotlinking, or commercial re-publication is strictly prohibited.</p>

          <h3>6. Limitation of Liability & Force Majeure</h3>
          <p>To the maximum extent permitted by applicable Indian law, RTC Foods and its directors, employees, and suppliers shall not be liable for any indirect, punitive, incidental, or consequential damages resulting from the use or inability to use this portal, or for carrier delays caused by Force Majeure events including acts of God, floods, severe weather, regional strikes, highway blockades, civil unrest, or nationwide logistics lockdowns.</p>
          <p>In all cases, the maximum cumulative liability of RTC Foods for any claim arising out of an order placed on this platform is strictly capped at the total amount actually paid by the Customer for the specific order under dispute.</p>

          <h3>7. Customer Conduct & Anti-Abuse Policy</h3>
          <p>Customers agree not to post defamatory, offensive, false, or unlawful reviews, initiate fraudulent chargebacks, or exploit coupon codes through automated bots. Accounts engaging in fraudulent behavior or repeated false damage claims will be permanently blacklisted.</p>

          <h3>8. Governing Law & Dispute Resolution</h3>
          <p>These Terms shall be interpreted, construed, and governed in accordance with the substantive laws of the Republic of India. In the event of any legal dispute, controversy, or claim arising out of or in connection with these Terms, the parties shall first endeavor to resolve the matter amicably through mutual negotiation. Failing resolution within 30 days, the courts located in <strong>Delhi / Sonipat, Haryana, India</strong> shall have exclusive jurisdiction over all proceedings.</p>

          <h3>9. Contact Information for Legal Inquiries</h3>
          <p>For any formal legal notices or policy clarification, please write to:</p>
          <div class="policy-officer-card">
            <strong>RTC Foods Legal & Regulatory Cell</strong><br />
            HSIIDC Industrial Area, Phase-IV, Kundli, Sonipat, Haryana – 131028, India<br />
            Corporate Email: <a href="mailto:legal@rtcfoods.in" class="text-green font-bold">legal@rtcfoods.in</a> / <a href="mailto:info@rtcfoods.in" class="text-green font-bold">info@rtcfoods.in</a><br />
            Customer Helpline: <a href="tel:+919876543210" class="text-green font-bold">+91 98765 43210</a> (10:00 AM – 6:00 PM IST)
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
