<?php
/**
 * RTC Foods - Certifications & Quality Compliance
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'Quality Standards & Official Certifications';
$pageDescription = 'Review RTC Foods official FSSAI licensing, ISO 22000 hygiene certifications, and lab testing protocols.';

include __DIR__ . '/includes/header.php';
?>

<div class="content-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">Certificates & Quality</span>
    </div>

    <div class="section-header text-center">
      <span class="section-pre-title text-gold">Certified Excellence</span>
      <h1 class="section-title">Government Accreditations & Quality Standards</h1>
      <p class="section-desc">At RTC Foods, quality is never an afterthought. Every batch undergoes stringent analytical and sensory evaluation before packaging.</p>
    </div>

    <!-- Certificates Grid -->
    <div class="certificates-cards-grid">
      <div class="cert-card">
        <div class="cert-icon-wrap"><i data-lucide="shield-check"></i></div>
        <h3>FSSAI License Compliance</h3>
        <span class="cert-authority">Food Safety and Standards Authority of India</span>
        <p>Fully compliant with central food safety, hygienic processing, and nutritional packaging regulations under the Food Safety and Standards Act, 2006.</p>
        <div class="cert-pill">License Verified</div>
      </div>

      <div class="cert-card">
        <div class="cert-icon-wrap"><i data-lucide="award"></i></div>
        <h3>ISO 22000:2018 FSMS</h3>
        <span class="cert-authority">International Organization for Standardization</span>
        <p>Certified Food Safety Management System covering the entire value chain from incoming inspection of raw dry fruits to automated packing.</p>
        <div class="cert-pill">FSMS Certified</div>
      </div>

      <div class="cert-card">
        <div class="cert-icon-wrap"><i data-lucide="check-circle"></i></div>
        <h3>HACCP Process Certified</h3>
        <span class="cert-authority">Hazard Analysis Critical Control Point</span>
        <p>Systematic preventative approach to biological, chemical, and physical hazards in our processing facility, ensuring zero foreign contamination.</p>
        <div class="cert-pill">HACCP Validated</div>
      </div>

      <div class="cert-card">
        <div class="cert-icon-wrap"><i data-lucide="globe"></i></div>
        <h3>APEDA Registered Exporter</h3>
        <span class="cert-authority">Ministry of Commerce and Industry, India</span>
        <p>Registered with APEDA for meeting international export quality benchmarks in moisture retention, size consistency, and purity.</p>
        <div class="cert-pill">Registered Member</div>
      </div>
    </div>

    <!-- Quality Protocol Flow -->
    <div class="quality-protocol-box">
      <h2 class="protocol-heading">Our 5-Stage Testing Protocol</h2>
      <div class="protocol-steps-grid">
        <div class="proto-step">
          <span class="proto-num">01</span>
          <h4>Origin Verification</h4>
          <p>Certificate of Origin verification from Californian, Afghan, and Kashmiri growers.</p>
        </div>
        <div class="proto-step">
          <span class="proto-num">02</span>
          <h4>Optical Sorting</h4>
          <p>High-speed laser sorting to reject broken, discolored, or undersized kernels.</p>
        </div>
        <div class="proto-step">
          <span class="proto-num">03</span>
          <h4>Moisture Control</h4>
          <p>Strict moisture meter testing to safeguard against mold, rancidity, and insect infestation.</p>
        </div>
        <div class="proto-step">
          <span class="proto-num">04</span>
          <h4>Lab Analysis</h4>
          <p>Independent NABL-accredited lab testing for aflatoxins, pesticide residues, and heavy metals.</p>
        </div>
        <div class="proto-step">
          <span class="proto-num">05</span>
          <h4>Nitrogen Sealing</h4>
          <p>Hermetic multi-barrier nitrogen packaging to preserve crunch for 12 months.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
