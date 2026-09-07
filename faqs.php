<?php
/**
 * RTC Foods - Frequently Asked Questions
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'Frequently Asked Questions (FAQs)';
$pageDescription = 'Find answers to common questions regarding RTC Foods products, shelf life, storage instructions, shipping, COD, and returns.';

$faqs = [
    [
        'category' => 'Product Quality & Storage',
        'items' => [
            [
                'q' => 'Where are RTC Foods dry fruits and nuts sourced from?',
                'a' => 'We source directly from origin: our California Almonds are imported from certified orchards in California, USA; Walnuts are sourced from Kashmir; Figs from Afghanistan; and authentic Spices from heritage growers across Kerala and Rajasthan.'
            ],
            [
                'q' => 'How should I store dry fruits to retain crunch and freshness?',
                'a' => 'Store dry fruits in an airtight container in a cool, dry place away from direct sunlight. In warm or humid weather, refrigerating nuts and seeds in sealed ziplock bags preserves natural oils and extends shelf life up to 12 months.'
            ],
            [
                'q' => 'Are your dry fruits polished or chemically treated?',
                'a' => 'No. RTC Foods maintains a strict Zero Chemical Polish policy. We never treat our dry fruits with mineral oils, sulphur, or artificial coloring agents. You get 100% pure, natural harvest.'
            ]
        ]
    ],
    [
        'category' => 'Shipping & Delivery',
        'items' => [
            [
                'q' => 'What are the delivery timelines across India?',
                'a' => 'Orders are processed and dispatched within 24 hours. Metro cities receive orders in 2–3 business days, while tier-2 and tier-3 locations take 3–5 business days.'
            ],
            [
                'q' => 'What is the Free Shipping threshold?',
                'a' => 'We offer FREE express doorstep delivery across India on all orders of ₹499 and above. Orders below ₹499 carry a nominal shipping charge of ₹50.'
            ],
            [
                'q' => 'How can I track my order status?',
                'a' => 'Once your order is placed, you will receive an SMS and email with your tracking number. You can also visit our Track Order page at any time to check real-time dispatch milestones.'
            ]
        ]
    ],
    [
        'category' => 'Payments & Returns',
        'items' => [
            [
                'q' => 'Is Cash on Delivery (COD) available?',
                'a' => 'Yes, Cash on Delivery is available across 19,000+ postal pincodes throughout India with no hidden convenience fees.'
            ],
            [
                'q' => 'What is your return and replacement policy?',
                'a' => 'We offer a 7-day hassle-free replacement policy. If your parcel arrives damaged or with broken packaging seals, simply email us at info@rtcfoods.in or WhatsApp our support team for an immediate free replacement.'
            ],
            [
                'q' => 'Do you provide bulk or corporate gifting discounts?',
                'a' => 'Yes! We specialize in custom festive and corporate gift hampers with company logo branding and bulk tiered discounts. Contact us at info@rtcfoods.in for custom quotes.'
            ]
        ]
    ]
];

include __DIR__ . '/includes/header.php';
?>

<div class="content-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">FAQs</span>
    </div>

    <div class="section-header text-center">
      <span class="section-pre-title text-gold">Got Questions?</span>
      <h1 class="section-title">Frequently Asked Questions</h1>
      <p class="section-desc">Everything you need to know about our sourcing, packaging hygiene, shipping, and payment methods.</p>
    </div>

    <div class="faqs-accordion-wrapper">
      <?php foreach ($faqs as $grpIdx => $grp): ?>
        <div class="faq-group">
          <h2 class="faq-group-title"><?php echo htmlspecialchars($grp['category']); ?></h2>
          
          <div class="faq-items-list">
            <?php foreach ($grp['items'] as $itemIdx => $item): ?>
              <div class="faq-accordion-item">
                <button type="button" class="faq-question-btn" onclick="toggleFaq(this)">
                  <span><?php echo htmlspecialchars($item['q']); ?></span>
                  <i data-lucide="chevron-down" class="faq-toggle-icon"></i>
                </button>
                <div class="faq-answer-panel">
                  <p><?php echo htmlspecialchars($item['a']); ?></p>
                </div>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      <?php endforeach; ?>
    </div>

    <div class="faq-contact-cta text-center">
      <h3>Still have a question?</h3>
      <p>Our customer care team is available Monday to Saturday (9:00 AM – 7:00 PM).</p>
      <a href="<?php echo url('contact-us.php'); ?>" class="btn-primary-gold">Contact Support Team</a>
    </div>
  </div>
</div>

<script>
  function toggleFaq(btn) {
    const panel = btn.nextElementSibling;
    const isOpen = btn.classList.contains('active');
    
    // Close all siblings in the same group
    const parentGroup = btn.closest('.faq-items-list');
    if (parentGroup) {
      parentGroup.querySelectorAll('.faq-question-btn').forEach(b => {
        b.classList.remove('active');
        if (b.nextElementSibling) b.nextElementSibling.style.display = 'none';
      });
    }

    if (!isOpen) {
      btn.classList.add('active');
      panel.style.display = 'block';
    }
  }
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
