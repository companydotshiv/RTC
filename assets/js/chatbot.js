/**
 * RTC Foods — AI Shopping Concierge Chatbot
 * Understands customer needs, recommends authentic products, and provides direct purchase links.
 */

(function () {
  'use strict';

  // Base URL helper
  const baseUrl = window.RTC_BASE_URL || '';

  // 19 Curated Products Catalog from RTC Foods database
  const RTC_CATALOG = [
    {
      id: 1,
      name: "California Almonds",
      price: 274,
      priceDisplay: "₹274.00",
      image: baseUrl + "/california_almonds_pouch.png",
      category: "dry-fruits",
      weight: "250g",
      desc: "Handpicked jumbo California almonds packed with Vitamin E, protein & crunch.",
      keywords: ["almond", "almonds", "badam", "california", "memory", "brain", "skin", "protein", "vitamin e", "snack", "nuts"]
    },
    {
      id: 2,
      name: "Chia Seeds",
      price: 27,
      priceDisplay: "₹27.00 – ₹108.00",
      image: baseUrl + "/chia_seeds_front.jpg",
      category: "seeds-berries",
      weight: "100g",
      desc: "Superfood chia seeds loaded with Omega-3, fiber, and plant-based protein.",
      keywords: ["chia", "seeds", "seed", "weight loss", "gym", "diet", "fitness", "smoothie", "omega", "fiber"]
    },
    {
      id: 3,
      name: "Cashew (Premium Jumbo Kaju)",
      price: 300,
      priceDisplay: "₹300.00",
      image: baseUrl + "/cashew_front.png",
      category: "dry-fruits",
      weight: "250g",
      desc: "Buttery, creamy whole jumbo cashews hand-sorted for rich crunch and sweet taste.",
      keywords: ["cashew", "cashews", "kaju", "sweet", "energy", "creamy", "nuts", "curry", "dessert"]
    },
    {
      id: 15,
      name: "Dried Apricot",
      price: 123,
      priceDisplay: "₹123.00",
      image: baseUrl + "/dried_apricot_front.png",
      category: "dry-fruits",
      weight: "250g",
      desc: "Naturally sun-dried golden apricots rich in Vitamin A, potassium, and antioxidants.",
      keywords: ["apricot", "apricots", "khubani", "khobani", "skin", "eyes", "vitamins", "dehydrated", "sweet"]
    },
    {
      id: 16,
      name: "Indian Raisins (Kishmish)",
      price: 163,
      priceDisplay: "₹163.00",
      image: baseUrl + "/indian_raisins_front.png",
      category: "dry-fruits",
      weight: "250g",
      desc: "Sweet green Indian raisins packed with natural iron, potassium, and digestion aids.",
      keywords: ["raisin", "raisins", "kishmish", "kismis", "iron", "blood", "energy", "kheer", "sweet"]
    },
    {
      id: 4,
      name: "Dry Figs Diamond (Anjeer)",
      price: 233,
      priceDisplay: "₹233.00",
      image: baseUrl + "/dry_figs_front.png",
      category: "dry-figs",
      weight: "250g",
      desc: "Premium sun-dried anjeer garland rich in dietary fiber, calcium, and minerals.",
      keywords: ["fig", "figs", "anjeer", "anjir", "fiber", "digestion", "constipation", "calcium", "bones"]
    },
    {
      id: 20,
      name: "Dry Figs Gold",
      price: 250,
      priceDisplay: "₹250.00",
      image: baseUrl + "/dry_figs_gold_front.png",
      category: "dry-figs",
      weight: "250g",
      desc: "Jumbo royal gold grade anjeer with soft chewy center and rich natural sweetness.",
      keywords: ["fig", "figs", "anjeer gold", "royal", "calcium", "fiber"]
    },
    {
      id: 6,
      name: "Walnut Kernels Platinum",
      price: 420,
      priceDisplay: "₹420.00",
      image: baseUrl + "/walnut_platinum_front.jpg",
      category: "dry-fruits",
      weight: "250g",
      desc: "Extra light halved walnut kernels brimming with plant-based Omega-3 ALA.",
      keywords: ["walnut", "walnuts", "akhrot", "brain", "memory", "heart", "omega 3", "dha", "cholesterol", "exam", "focus"]
    },
    {
      id: 17,
      name: "Walnut Kernals Diamond",
      price: 375,
      priceDisplay: "₹375.00",
      image: baseUrl + "/walnut_diamond_front.png",
      category: "dry-fruits",
      weight: "250g",
      desc: "Selected light halves and quarters with crisp bite and buttery aroma.",
      keywords: ["walnut diamond", "akhrot", "brain", "omega 3"]
    },
    {
      id: 21,
      name: "Dry Dates (Chuara)",
      price: 120,
      priceDisplay: "₹120.00",
      image: baseUrl + "/dry_dates_front.jpg",
      category: "dry-fruits",
      weight: "250g",
      desc: "Wholesome yellow-brown dried dates ideal for stamina, milk boiling, and festive rituals.",
      keywords: ["dates", "date", "chuara", "khajoor", "stamina", "blood", "milk", "iron"]
    },
    {
      id: 22,
      name: "Black Raisins (Kali Kishmish)",
      price: 162,
      priceDisplay: "₹162.00",
      image: baseUrl + "/black_raisins_front.png",
      category: "dry-fruits",
      weight: "250g",
      desc: "Seedless black raisins revered for fighting anemia, boosting hair, and cleansing blood.",
      keywords: ["black raisins", "kali kishmish", "hair", "anemia", "blood purifier", "iron", "soak"]
    },
    {
      id: 7,
      name: "Whole Cranberries Dried (Gold)",
      price: 310,
      priceDisplay: "₹310.00",
      image: baseUrl + "/cranberries_gold_front.jpg",
      category: "dehydrated-fruits",
      weight: "250g",
      desc: "Ruby red dehydrated cranberries offering vital urinary tract wellness and antioxidants.",
      keywords: ["cranberry", "cranberries", "uti", "urinary", "berries", "skin", "tart", "antioxidant"]
    },
    {
      id: 23,
      name: "Exotic Dried Blueberries",
      price: 405,
      priceDisplay: "₹405.00",
      image: baseUrl + "/dried_blueberries_front.png",
      category: "dehydrated-fruits",
      weight: "200g",
      desc: "Potent antioxidant super-berries for sharp memory, youthful skin, and eye health.",
      keywords: ["blueberry", "blueberries", "memory", "eyes", "anti aging", "superfood", "berries"]
    },
    {
      id: 5,
      name: "Exotic Dried Kiwi",
      price: 171,
      priceDisplay: "₹171.00",
      image: baseUrl + "/exotic_kiwi_front.png",
      category: "dehydrated-fruits",
      weight: "200g",
      desc: "Tangy-sweet dried kiwi slices rich in immune-strengthening Vitamin C.",
      keywords: ["kiwi", "dried kiwi", "vitamin c", "immunity", "tangy", "fruit snack"]
    },
    {
      id: 24,
      name: "Prunes",
      price: 238,
      priceDisplay: "₹238.00",
      image: baseUrl + "/prunes_front.jpg",
      category: "dehydrated-fruits",
      weight: "250g",
      desc: "Soft pitted dried plums famous for daily gut motility, bowel regularity, and bone density.",
      keywords: ["prunes", "prune", "plum", "digestion", "constipation", "gut health", "fiber"]
    },
    {
      id: 26,
      name: "Kasuri Methi",
      price: 300,
      priceDisplay: "₹300.00",
      image: baseUrl + "/kasuri_methi_front.jpg",
      category: "chemical-herbs",
      weight: "100g",
      desc: "Nagaur sun-dried fenugreek leaves that infuse restaurant-style aroma into Indian gravies.",
      keywords: ["kasuri methi", "methi", "spices", "cooking", "paneer", "gravy", "aroma", "herbs"]
    },
    {
      id: 25,
      name: "Ajino Seasoning",
      price: 137,
      priceDisplay: "₹137.00",
      image: baseUrl + "/ajino_front.png",
      category: "chemical-herbs",
      weight: "500g",
      desc: "Pure food-grade umami flavor booster for Indo-Chinese soups, fried rice, and snacks.",
      keywords: ["ajino", "seasoning", "chinese", "fried rice", "umami", "msg"]
    }
  ];

  // Quick Chips prompts
  const PROMPTS = [
    { label: "🌰 California Almonds", query: "Tell me about California Almonds" },
    { label: "🧠 Best for Memory", query: "Which dry fruits are best for memory and brain health?" },
    { label: "🥗 Weight Loss & Fitness", query: "What should I eat for weight loss and gym protein?" },
    { label: "🎁 Festive Gift Hampers", query: "Show me corporate and festive gift hampers" },
    { label: "🚚 Shipping & Delivery", query: "What is your delivery time and shipping cost?" },
    { label: "💰 Discount Codes", query: "Are there any discount codes or offers available?" }
  ];

  // Store conversation history in sessionStorage
  const STORAGE_KEY = 'rtc_concierge_messages_v1';

  // Initialize Chatbot on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', initChatbot);

  function initChatbot() {
    // Inject HTML elements if not already present
    if (!document.getElementById('rtc-chat-trigger')) {
      createChatbotDOM();
    }

    bindChatEvents();
    loadStoredHistory();
  }

  function createChatbotDOM() {
    const triggerHtml = `
      <div class="rtc-chat-teaser" id="rtc-chat-teaser">
        <span>👋 Need help choosing dry fruits? Ask me!</span>
        <button type="button" class="rtc-teaser-close" id="rtc-teaser-close" aria-label="Dismiss">&times;</button>
      </div>

      <button type="button" class="rtc-chat-trigger" id="rtc-chat-trigger" aria-label="Open RTC Shopping Assistant">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span class="chat-badge-pulse"></span>
      </button>

      <div class="rtc-chat-widget" id="rtc-chat-widget" role="dialog" aria-label="RTC Concierge Chat">
        <div class="rtc-chat-header">
          <div class="rtc-chat-header-info">
            <div class="rtc-avatar-ring">
              <img src="${baseUrl}/rtc-logo.png" alt="RTC Foods" onerror="this.src='${baseUrl}/cat_dry_figs.png'" />
              <span class="rtc-online-dot"></span>
            </div>
            <div class="rtc-chat-title">
              <h4>RTC Food Concierge</h4>
              <span><i data-lucide="sparkles" style="width:12px;height:12px;"></i> Product &amp; Buying Guide</span>
            </div>
          </div>
          <div class="rtc-chat-actions">
            <button type="button" class="rtc-chat-btn-icon" id="rtc-chat-close" aria-label="Close Chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div class="rtc-quick-chips-wrapper" id="rtc-quick-chips"></div>

        <div class="rtc-chat-messages" id="rtc-chat-messages"></div>

        <form class="rtc-chat-input-bar" id="rtc-chat-form">
          <input type="text" id="rtc-chat-input" placeholder="Ask about nuts, health benefits, prices..." autocomplete="off" required />
          <button type="submit" class="rtc-chat-send-btn" id="rtc-chat-send" aria-label="Send Message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    `;

    const container = document.createElement('div');
    container.id = 'rtc-chatbot-root';
    container.innerHTML = triggerHtml;
    document.body.appendChild(container);
  }

  function bindChatEvents() {
    const trigger = document.getElementById('rtc-chat-trigger');
    const teaser = document.getElementById('rtc-chat-teaser');
    const teaserClose = document.getElementById('rtc-teaser-close');
    const widget = document.getElementById('rtc-chat-widget');
    const closeBtn = document.getElementById('rtc-chat-close');
    const form = document.getElementById('rtc-chat-form');
    const input = document.getElementById('rtc-chat-input');
    const chipsWrapper = document.getElementById('rtc-quick-chips');

    // Populate chips
    chipsWrapper.innerHTML = '';
    PROMPTS.forEach(item => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'rtc-chip';
      chip.textContent = item.label;
      chip.addEventListener('click', () => {
        handleUserMessage(item.query);
      });
      chipsWrapper.appendChild(chip);
    });

    // Toggle Chat
    trigger.addEventListener('click', () => {
      const isOpen = widget.classList.contains('open');
      if (isOpen) {
        closeChat();
      } else {
        openChat();
      }
    });

    teaser.addEventListener('click', (e) => {
      if (e.target.id === 'rtc-teaser-close') {
        teaser.classList.add('hidden');
        sessionStorage.setItem('rtc_teaser_dismissed', '1');
      } else {
        openChat();
      }
    });

    closeBtn.addEventListener('click', closeChat);

    // Send Form
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text) {
        input.value = '';
        handleUserMessage(text);
      }
    });

    // Dismiss teaser if previously closed
    if (sessionStorage.getItem('rtc_teaser_dismissed') === '1') {
      teaser.classList.add('hidden');
    }
  }

  function openChat() {
    const widget = document.getElementById('rtc-chat-widget');
    const teaser = document.getElementById('rtc-chat-teaser');
    const input = document.getElementById('rtc-chat-input');
    widget.classList.add('open');
    if (teaser) teaser.classList.add('hidden');
    setTimeout(() => {
      input.focus();
      scrollToBottom();
    }, 150);
  }

  function closeChat() {
    const widget = document.getElementById('rtc-chat-widget');
    widget.classList.remove('open');
  }

  function loadStoredHistory() {
    const messagesEl = document.getElementById('rtc-chat-messages');
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach(msg => renderMessageDOM(msg.sender, msg.html, msg.products));
          return;
        }
      }
    } catch (e) {
      console.warn('Could not load chat history:', e);
    }

    // Default Initial Welcome
    const welcomeHtml = `
      Hello! Welcome to <strong>RTC Foods</strong> 🌿<br><br>
      I am your personal dry fruit concierge. I can answer questions about our authentic almonds, cashews, walnuts, figs, seeds, and gift hampers, and help you buy directly on our site.<br><br>
      <em>How can I assist your health and wellness goals today?</em>
    `;
    addBotMessage(welcomeHtml);
  }

  function handleUserMessage(text) {
    addUserMessage(text);
    showTypingIndicator();

    // Natural processing delay
    setTimeout(() => {
      removeTypingIndicator();
      const response = processNLPQuery(text);
      addBotMessage(response.text, response.products);
    }, 600);
  }

  function addUserMessage(text) {
    const html = escapeHtml(text);
    renderMessageDOM('user', html);
    saveMessageToStorage('user', html);
    scrollToBottom();
  }

  function addBotMessage(html, products = []) {
    renderMessageDOM('bot', html, products);
    saveMessageToStorage('bot', html, products);
    scrollToBottom();
  }

  function renderMessageDOM(sender, html, products = []) {
    const messagesEl = document.getElementById('rtc-chat-messages');
    const msg = document.createElement('div');
    msg.className = `rtc-msg rtc-msg-${sender}`;

    let productCardsHtml = '';
    if (products && products.length > 0) {
      productCardsHtml = `<div class="rtc-chat-products-grid">`;
      products.forEach(p => {
        const productUrl = `${baseUrl}/product.php?id=${p.id}`;
        productCardsHtml += `
          <div class="rtc-chat-product-card">
            <img src="${p.image}" alt="${escapeHtml(p.name)}" class="rtc-chat-card-img" onerror="this.src='${baseUrl}/cat_dry_figs.png'" />
            <div class="rtc-chat-card-details">
              <span class="rtc-chat-card-title">${escapeHtml(p.name)}</span>
              <span class="rtc-chat-card-price">${p.priceDisplay} <small style="color:#64748B;font-weight:normal;">(${p.weight})</small></span>
              <div class="rtc-chat-card-actions">
                <a href="${productUrl}" class="rtc-chat-btn-buy">View &amp; Buy &rarr;</a>
                <button type="button" class="rtc-chat-btn-cart" onclick="window.rtcBotAddToCart(${p.id}, '${escapeHtml(p.name)}', '${p.weight}')">+ Cart</button>
              </div>
            </div>
          </div>
        `;
      });
      productCardsHtml += `</div>`;
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msg.innerHTML = `
      <div class="rtc-msg-bubble">
        <div>${html}</div>
        ${productCardsHtml}
        <span class="rtc-msg-time">${timeStr}</span>
      </div>
    `;

    messagesEl.appendChild(msg);
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const messagesEl = document.getElementById('rtc-chat-messages');
    const indicator = document.createElement('div');
    indicator.id = 'rtc-typing-indicator';
    indicator.className = 'rtc-msg rtc-msg-bot';
    indicator.innerHTML = `
      <div class="rtc-typing-indicator">
        <span class="rtc-typing-dot"></span>
        <span class="rtc-typing-dot"></span>
        <span class="rtc-typing-dot"></span>
      </div>
    `;
    messagesEl.appendChild(indicator);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const existing = document.getElementById('rtc-typing-indicator');
    if (existing) existing.remove();
  }

  function scrollToBottom() {
    const messagesEl = document.getElementById('rtc-chat-messages');
    if (messagesEl) {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }

  function saveMessageToStorage(sender, html, products = []) {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      const list = stored ? JSON.parse(stored) : [];
      list.push({ sender, html, products });
      // Keep only last 25 messages
      if (list.length > 25) list.shift();
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }

  // Quick Cart Add Integration
  window.rtcBotAddToCart = function (productId, productName, weight) {
    if (typeof window.addToCart === 'function') {
      window.addToCart(productId, 1, weight || '250g');
    } else {
      // Fallback redirect
      window.location.href = `${baseUrl}/product.php?id=${productId}`;
    }
  };

  /**
   * Smart Natural Language Search Engine for RTC Foods
   */
  function processNLPQuery(query) {
    const q = query.toLowerCase().trim();

    // 1. Corporate & Festive Gifting Hampers
    if (matchesAny(q, ['gift', 'gifting', 'hamper', 'hampers', 'corporate', 'diwali', 'wedding', 'keepsake', 'box', 'celebration'])) {
      return {
        text: `We specialize in <strong>Celebration Edition Corporate & Festive Gift Hampers</strong>! Packed in handcrafted wooden keepsake boxes with custom laser engraving and premium California almonds, cashews, and walnuts.<br><br>You can browse hampers directly on this website:`,
        products: [
          {
            id: 1,
            name: "California Almonds (Gift Box Favorite)",
            priceDisplay: "₹274.00",
            image: baseUrl + "/california_almonds_pouch.png",
            weight: "250g"
          },
          {
            id: 3,
            name: "Jumbo Royal Cashews",
            priceDisplay: "₹300.00",
            image: baseUrl + "/cashew_front.png",
            weight: "250g"
          }
        ]
      };
    }

    // 2. Brain, Memory, Students, Exams, Focus
    if (matchesAny(q, ['memory', 'brain', 'exam', 'student', 'focus', 'study', 'dha', 'mental', 'mind', 'intellect'])) {
      return {
        text: `For <strong>brain health, sharp memory, and focus</strong>, nutritionists recommend consuming walnuts and soaked almonds daily. Walnuts provide essential plant-based <em>Omega-3 ALA</em>, while almonds supply protective <em>Vitamin E</em>.<br><br>Here are the best products to buy directly from our store:`,
        products: findProductsByIds([6, 1, 23])
      };
    }

    // 3. Weight Loss, Diet, Gym, Fitness, Protein
    if (matchesAny(q, ['weight loss', 'lose weight', 'diet', 'gym', 'protein', 'fitness', 'workout', 'slimming', 'belly fat', 'low carb', 'keto'])) {
      return {
        text: `For <strong>weight management and fitness</strong>, our top recommendations are high in dietary fiber and plant protein, which promote satiety and curb unhealthy snacking:<br><br>• <strong>Chia Seeds</strong>: Expand in the stomach and slow down glucose absorption.<br>• <strong>California Almonds</strong>: Satisfying crunch with 21g protein per 100g.<br>• <strong>Prunes</strong>: Natural fiber that optimizes digestive motility.<br><br>Order yours online below:`,
        products: findProductsByIds([2, 1, 24])
      };
    }

    // 4. Glowing Skin, Hair Growth, Anti-Aging
    if (matchesAny(q, ['skin', 'glow', 'glowing', 'hair', 'hair loss', 'hair growth', 'anti aging', 'wrinkles', 'beauty', 'acne', 'complexion'])) {
      return {
        text: `For <strong>radiant skin and healthy hair</strong>, your body thrives on natural antioxidants and Vitamin E:<br><br>• <strong>Exotic Blueberries & Cranberries</strong>: Neutralize free radicals and promote collagen.<br>• <strong>Black Raisins</strong>: Ancient Indian remedy soaked overnight for purifying blood and reducing hair fall.<br>• <strong>California Almonds</strong>: Rich in natural Vitamin E.<br><br>Explore and buy directly below:`,
        products: findProductsByIds([23, 22, 1])
      };
    }

    // 5. Digestion, Gut Health, Constipation, Acidity
    if (matchesAny(q, ['digestion', 'constipation', 'gut', 'stomach', 'acidity', 'fiber', 'laxative', 'digestive', 'bowel'])) {
      return {
        text: `For <strong>seamless digestion and gut wellness</strong>, dried anjeer (figs) and prunes are nature’s most effective remedies. Rich in soluble fiber, they gently regulate digestion without chemicals:<br><br>Order directly from our farm-fresh batches:`,
        products: findProductsByIds([4, 24, 16])
      };
    }

    // 6. Energy, Blood, Iron, Anemia, Stamina
    if (matchesAny(q, ['iron', 'blood', 'anemia', 'hemoglobin', 'energy', 'stamina', 'weakness', 'fatigue', 'tired'])) {
      return {
        text: `To naturally <strong>boost hemoglobin, iron levels, and daily vitality</strong>, our black raisins, golden kishmish, and dry dates are naturally packed with bioavailable iron and potassium:`,
        products: findProductsByIds([22, 21, 16])
      };
    }

    // 7. Heart Health, Cholesterol, Blood Pressure
    if (matchesAny(q, ['heart', 'cholesterol', 'blood pressure', 'bp', 'cardio', 'arteries', 'ldl'])) {
      return {
        text: `For <strong>cardiovascular health and maintaining healthy cholesterol</strong>, whole walnut kernels and raw California almonds deliver monosaturated fats and Omega-3 ALA proven to support arterial flexibility:`,
        products: findProductsByIds([6, 1, 2])
      };
    }

    // 8. Specific Product: Almond / Badam
    if (matchesAny(q, ['almond', 'almonds', 'badam', 'california almond'])) {
      return {
        text: `Our <strong>RTC California Almonds</strong> are premium Grade-A jumbo kernels imported directly from California, USA. They are 100% raw, non-GMO, and packed with Vitamin E and healthy crunch.<br><br>• Available in 250g, 500g, and 1kg vacuum pouches starting at <strong>₹274.00</strong>:`,
        products: findProductsByIds([1])
      };
    }

    // 9. Specific Product: Cashew / Kaju
    if (matchesAny(q, ['cashew', 'cashews', 'kaju'])) {
      return {
        text: `Our <strong>RTC Jumbo Whole Cashews</strong> are hand-sorted W320/W240 grade nuts with a naturally creamy, sweet, buttery flavor. Ideal for direct snacking, desserts, and royal curries.<br><br>• Price starts at <strong>₹300.00</strong> for 250g:`,
        products: findProductsByIds([3])
      };
    }

    // 10. Specific Product: Walnut / Akhrot
    if (matchesAny(q, ['walnut', 'walnuts', 'akhrot'])) {
      return {
        text: `We offer 4 premium grades of <strong>RTC Walnut Kernels</strong> (Platinum, Diamond, Gold, and Silver). They are vacuum-sealed to preserve natural oils and crunch without any bitterness:<br><br>Click below to choose your favorite grade:`,
        products: findProductsByIds([6, 17, 18, 19])
      };
    }

    // 11. Specific Product: Fig / Anjeer
    if (matchesAny(q, ['fig', 'figs', 'anjeer', 'anjir'])) {
      return {
        text: `Our <strong>RTC Dry Figs (Anjeer)</strong> are naturally sun-dried and hand-threaded on garlands. Chewy, sweet, and bursting with high dietary fiber and calcium:<br><br>Available in Diamond and Gold grades:`,
        products: findProductsByIds([4, 20])
      };
    }

    // 12. Specific Product: Raisins / Kishmish
    if (matchesAny(q, ['raisin', 'raisins', 'kishmish', 'kismis'])) {
      return {
        text: `We have two delicious raisin varieties:<br>1. <strong>Indian Green Raisins</strong>: Naturally sweet, tender, and high in potassium.<br>2. <strong>Black Raisins</strong>: Seedless and potent for hemoglobin and hair health.`,
        products: findProductsByIds([16, 22])
      };
    }

    // 13. Specific Product: Berries (Cranberry, Blueberry, Kiwi)
    if (matchesAny(q, ['berry', 'berries', 'cranberry', 'blueberry', 'blueberries', 'kiwi', 'prune', 'prunes'])) {
      return {
        text: `Our <strong>Exotic Dried Berries & Fruits</strong> are dehydrated under controlled moisture settings to retain vibrant natural colors, tart flavors, and antioxidant nutrients:`,
        products: findProductsByIds([23, 7, 5, 24])
      };
    }

    // 14. Specific Product: Seeds
    if (matchesAny(q, ['seed', 'seeds', 'chia'])) {
      return {
        text: `Our <strong>RTC Chia Seeds</strong> are 100% organic, triple-cleaned, and packed with natural Omega-3 and soluble dietary fiber. Available from just <strong>₹27.00</strong>:`,
        products: findProductsByIds([2])
      };
    }

    // 15. Cooking & Spices
    if (matchesAny(q, ['spice', 'spices', 'methi', 'kasuri', 'fenugreek', 'cooking', 'gravy', 'seasoning', 'ajino'])) {
      return {
        text: `For culinary excellence, check out our aromatic spices and seasonings:<br>• <strong>Nagaur Kasuri Methi</strong>: Exceptional herbal aroma.<br>• <strong>Ajino Seasoning</strong>: Umami flavor booster for noodles and Chinese dishes.`,
        products: findProductsByIds([26, 25])
      };
    }

    // 16. Discounts, Coupons, Promo Codes
    if (matchesAny(q, ['coupon', 'code', 'discount', 'offer', 'promo', 'deal', 'cheap', 'save'])) {
      return {
        text: `🎉 <strong>Active Exclusive Offers for You:</strong><br><br>
        1. <strong>WELCOME10</strong> — Get <strong>10% FLAT OFF</strong> your first order at checkout!<br>
        2. <strong>Free Express Shipping</strong> — Automatically applied on all orders above <strong>₹499</strong> across India!<br><br>
        Here are today’s bestselling picks to get started:`,
        products: findProductsByIds([1, 3, 6])
      };
    }

    // 17. Shipping, Delivery & Tracking
    if (matchesAny(q, ['shipping', 'delivery', 'deliver', 'track', 'courier', 'charges', 'time', 'how long', 'cod', 'cash on delivery'])) {
      return {
        text: `🚚 <strong>RTC Foods Shipping & Delivery Details:</strong><br><br>
        • <strong>Free Shipping</strong>: On all orders above ₹499 across India.<br>
        • <strong>Delivery Time</strong>: Metro cities receive orders in 2–3 days; other regions within 4–5 business days.<br>
        • <strong>Track Consignment</strong>: You can check live status on our <a href="${baseUrl}/account.php" style="color:#15803D;font-weight:700;text-decoration:underline;">Order Tracking Page</a>.<br>
        • <strong>Payment Modes</strong>: UPI, Cards, NetBanking, and Cash on Delivery (COD) accepted!`,
        products: []
      };
    }

    // 18. Contact & Customer Support
    if (matchesAny(q, ['contact', 'phone', 'support', 'help', 'email', 'number', 'whatsapp', 'call', 'talk'])) {
      return {
        text: `📞 <strong>We are always here to help!</strong><br><br>
        • <strong>Phone Support</strong>: <a href="tel:+919876543210" style="color:#15803D;font-weight:700;">+91 98765 43210</a> (Mon–Sat, 9 AM – 7 PM)<br>
        • <strong>Email</strong>: <a href="mailto:info@rtcfoods.in" style="color:#15803D;font-weight:700;">info@rtcfoods.in</a><br>
        • <strong>WhatsApp</strong>: <a href="https://wa.me/919876543210" target="_blank" style="color:#15803D;font-weight:700;">Click to Chat on WhatsApp</a><br>
        • Or visit our <a href="${baseUrl}/contact-us.php" style="color:#15803D;font-weight:700;">Contact Us page</a>.`,
        products: []
      };
    }

    // 19. General Pricing Query
    if (matchesAny(q, ['price', 'prices', 'rate', 'cost', 'how much', 'menu', 'list'])) {
      return {
        text: `Here is a sample price snapshot of our top bestselling dry fruits:<br><br>
        • California Almonds: from ₹274.00<br>
        • Jumbo Cashews: from ₹300.00<br>
        • Walnut Platinum Halves: from ₹420.00<br>
        • Dry Figs (Anjeer): from ₹233.00<br>
        • Chia Seeds: from ₹27.00<br><br>
        Click below to inspect and buy directly:`,
        products: findProductsByIds([1, 3, 6, 4])
      };
    }

    // 20. Greeting / Hello / Hi
    if (matchesAny(q, ['hi', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'start'])) {
      return {
        text: `Hello there! 😊 Welcome to <strong>RTC Foods</strong>.<br><br>I can guide you through our handpicked dry fruits, recommend nuts based on your health goals (brain, skin, digestion, weight loss), or provide direct links to buy anything on this website.<br><br>What would you like to explore today?`,
        products: findProductsByIds([1, 3, 6])
      };
    }

    // 21. Dynamic Fuzzy Fallback Matcher
    const matchedProducts = scoreProducts(q);
    if (matchedProducts.length > 0) {
      return {
        text: `Here are the best matching products from our catalog for "<strong>${escapeHtml(query)}</strong>":`,
        products: matchedProducts.slice(0, 3)
      };
    }

    // Final fallback
    return {
      text: `I'd love to help you find that! We offer 100% authentic California Almonds, Jumbo Cashews, Kashmiri Walnuts, Anjeer Figs, Chia Seeds, and Exotic Berries.<br><br>Browse our popular bestsellers below or visit our full <a href="${baseUrl}/products.php" style="color:#15803D;font-weight:700;text-decoration:underline;">Product Catalog</a>:`,
      products: findProductsByIds([1, 3, 6])
    };
  }

  function matchesAny(str, keywords) {
    return keywords.some(k => str.includes(k));
  }

  function findProductsByIds(ids) {
    return RTC_CATALOG.filter(p => ids.includes(p.id));
  }

  function scoreProducts(query) {
    const tokens = query.split(/\s+/).filter(t => t.length > 2);
    if (tokens.length === 0) return [];

    const scored = RTC_CATALOG.map(p => {
      let score = 0;
      const searchable = (p.name + ' ' + p.desc + ' ' + p.keywords.join(' ')).toLowerCase();
      tokens.forEach(tok => {
        if (p.name.toLowerCase().includes(tok)) score += 10;
        if (p.keywords.some(k => k.includes(tok))) score += 5;
        if (searchable.includes(tok)) score += 2;
      });
      return { product: p, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
