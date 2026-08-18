import { products as initialProducts, categories as initialCategories } from './productsData';
import type { Product, Category } from '../types/product';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface AdminUserAccount {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: 'Super Admin' | 'Order Manager' | 'Catalog Manager';
  isActive: boolean;
  createdAt: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  type: 'flat_pct' | 'pct_capped' | 'flat_amount' | 'bogo' | 'b1g1' | 'b2g1' | 'b2g2';
  value: number;
  capAmount?: number;
  minOrderValue: number;
  description: string;
  isActive: boolean;
  usedCount: number;
  expiryDate: string;
}

export interface BannerLayer {
  id: string;
  type: 'text' | 'image' | 'shape' | 'badge' | 'button' | 'stats';
  content: string; // Text content, Image URL, or JSON data
  x: number; // Percentage offset from left (0-100)
  y: number; // Percentage offset from top (0-100)
  width?: number;
  height?: number;
  fontSize?: number;
  fontWeight?: string;
  fontStyle?: string;
  textDecoration?: string;
  color?: string;
  gradientStart?: string;
  gradientEnd?: string;
  useGradient?: boolean;
  hyperlink?: string;
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  opacity?: number;
  zIndex: number;
}

export interface AdminBanner {
  id: string;
  page: 'home' | 'products' | 'checkout' | 'category' | 'home_slider' | 'products_page' | 'checkout_page' | 'category_header';
  position?: 'hero' | 'top' | 'middle' | 'bottom';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16' | '21:9';
  imageZoom?: number;
  imagePanX?: number;
  imagePanY?: number;
  title: string;
  titleGradientStart?: string;
  titleGradientEnd?: string;
  useTitleGradient?: boolean;
  subtitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  linkUrl: string;
  buttonText: string;
  buttonStyle?: 'solid_green' | 'dark_pill' | 'glass' | 'outline';
  buttonBgColor?: string;
  buttonTextColor?: string;
  buttonBorderColor?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  textAlign?: 'left' | 'center' | 'right';
  bgColor?: string;
  overlayOpacity?: number;
  vignetteColor?: string;
  vignetteIntensity?: number;
  badgeText?: string;
  badgeBgColor?: string;
  badgeTextColor?: string;
  statsItems?: { value: string; label: string }[];
  layers?: BannerLayer[];
  isActive: boolean;
  order: number;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  weight?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: string;
  city: string;
  state: string;
  pincode: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  taxGst: number;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  courierName?: string;
  trackingId?: string;
  returnRequested?: boolean;
  refundStatus?: 'None' | 'Requested' | 'Approved' | 'Rejected' | 'Processed';
  createdAt: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  city: string;
}

export interface AdminReview {
  id: string;
  productId: number;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: 'Approved' | 'Pending' | 'Hidden';
  createdAt: string;
}

export interface PincodeRule {
  id: string;
  pincode: string;
  city: string;
  state: string;
  isDeliverable: boolean;
  isCodAvailable: boolean;
  estimatedDays: number;
}

export interface ShippingRule {
  id: string;
  minOrderForFreeShipping: number;
  standardFee: number;
  codCharge: number;
  expressDeliveryFee: number;
}

export interface AnnouncementConfig {
  text: string;
  linkText?: string;
  linkUrl?: string;
  isActive: boolean;
  bgColor: string;
  textColor: string;
}

export interface PopupConfig {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  couponCode?: string;
  delaySeconds: number;
  isActive: boolean;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  adminName: string;
  role: 'Super Admin' | 'Order Manager' | 'Catalog Manager';
  action: string;
  details: string;
}

export interface HomepageSection {
  id: string;
  title: string;
  type: 'hero_slider' | 'categories_grid' | 'featured_products' | 'special_offers' | 'testimonials' | 'cta_banner';
  isVisible: boolean;
  order: number;
  columns?: number;
  paddingY?: number;
  bgColor?: string;
}

export const defaultHomepageSections: HomepageSection[] = [
  { id: 'sec-hero', title: 'Main Hero Slider', type: 'hero_slider', isVisible: true, order: 1, paddingY: 20, bgColor: '#ffffff' },
  { id: 'sec-cats', title: 'Product Categories', type: 'categories_grid', isVisible: true, order: 2, columns: 6, paddingY: 30, bgColor: '#f8fafc' },
  { id: 'sec-feat', title: 'Featured Fresh Produce', type: 'featured_products', isVisible: true, order: 3, columns: 4, paddingY: 40, bgColor: '#ffffff' },
  { id: 'sec-offers', title: 'Special Seasonal Offers', type: 'special_offers', isVisible: true, order: 4, paddingY: 30, bgColor: '#ecfdf5' },
  { id: 'sec-testi', title: 'Customer Reviews', type: 'testimonials', isVisible: true, order: 5, paddingY: 30, bgColor: '#ffffff' },
  { id: 'sec-cta', title: 'Promotional Banner', type: 'cta_banner', isVisible: true, order: 6, paddingY: 20, bgColor: '#0284c7' }
];

// Initial Admin Account Credentials requested by user:
// username: Login1 | password: RTC@12345
const defaultAdminAccounts: AdminUserAccount[] = [
  {
    id: 'usr-admin-1',
    username: 'Login1',
    password: 'RTC@12345',
    fullName: 'Master Personnel',
    role: 'Super Admin',
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0]
  }
];

const defaultCoupons: AdminCoupon[] = [
  {
    id: 'c1',
    code: 'WELCOME20',
    type: 'flat_pct',
    value: 20,
    minOrderValue: 499,
    description: 'Flat 20% Off on orders above ₹499',
    isActive: true,
    usedCount: 0,
    expiryDate: '2026-12-31',
  },
  {
    id: 'c2',
    code: 'SUPERMAX200',
    type: 'pct_capped',
    value: 50,
    capAmount: 200,
    minOrderValue: 799,
    description: '50% Off up to ₹200 on orders above ₹799',
    isActive: true,
    usedCount: 0,
    expiryDate: '2026-10-15',
  }
];

const defaultBanners: AdminBanner[] = [
  {
    id: 'b1',
    page: 'home',
    position: 'hero',
    title: '100% Pure Premium Dry Fruits & Spices',
    subtitle: 'Triple-sorted, handpicked jumbo almonds, cashews, Kashmir saffron & gourmet seeds',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
    mobileImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
    linkUrl: '/products',
    buttonText: 'Shop All Products',
    buttonStyle: 'solid_green',
    textAlign: 'left',
    bgColor: '#043927',
    overlayOpacity: 0.35,
    isActive: true,
    order: 1,
  },
  {
    id: 'b2',
    page: 'products',
    position: 'top',
    title: 'Explore Our Complete Wholesome Range',
    subtitle: '100% natural, hygienic food-grade pouches preserved for peak crunch and freshness',
    imageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=1200',
    mobileImageUrl: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&q=80&w=600',
    linkUrl: '/products',
    buttonText: 'Browse Catalog',
    buttonStyle: 'glass',
    textAlign: 'center',
    bgColor: '#007A3D',
    overlayOpacity: 0.25,
    isActive: true,
    order: 1,
  }
];

// Clean initial empty real data (no fake orders or sales)
const defaultOrders: AdminOrder[] = [];
const defaultCustomers: AdminCustomer[] = [];

const defaultReviews: AdminReview[] = [
  { id: 'rev-1', productId: 1, productName: 'Alphonso Mangoes Premium', customerName: 'Aarav Sharma', rating: 5, comment: 'Extremely sweet and naturally ripened! Excellent packaging.', status: 'Approved', createdAt: '2026-08-10' }
];

const defaultPincodes: PincodeRule[] = [
  { id: 'pin-1', pincode: '560038', city: 'Bengaluru', state: 'Karnataka', isDeliverable: true, isCodAvailable: true, estimatedDays: 1 },
  { id: 'pin-2', pincode: '400020', city: 'Mumbai', state: 'Maharashtra', isDeliverable: true, isCodAvailable: true, estimatedDays: 2 },
  { id: 'pin-3', pincode: '110054', city: 'Delhi', state: 'Delhi', isDeliverable: true, isCodAvailable: false, estimatedDays: 2 }
];

const defaultShippingRule: ShippingRule = {
  id: 'ship-rule-1',
  minOrderForFreeShipping: 999,
  standardFee: 49,
  codCharge: 30,
  expressDeliveryFee: 99
};

const defaultAnnouncement: AnnouncementConfig = {
  text: '🚀 Flat 20% OFF on your grocery order! Use code WELCOME20',
  linkText: 'Claim Offer',
  linkUrl: '/products',
  isActive: true,
  bgColor: '#0284c7',
  textColor: '#ffffff'
};

const defaultPopup: PopupConfig = {
  id: 'pop-1',
  title: '🎁 Special Welcome Offer!',
  description: 'Get an extra ₹150 OFF on fresh organic fruits and juices above ₹599.',
  imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=600',
  couponCode: 'WELCOME20',
  delaySeconds: 4,
  isActive: true
};

const defaultAuditLogs: AuditLogItem[] = [
  { id: 'log-1', timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }), adminName: 'System', role: 'Super Admin', action: 'System Init', details: 'Initialized store with Login1 master account' }
];

const initProductsList = (): Product[] => {
  const stored = localStorage.getItem('admin_products');
  if (stored) {
    try {
      const parsed: Product[] = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p) => {
          const gallery = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image || ''];
          const firstImg = gallery[0] || p.image || '';
          return {
            ...p,
            image: firstImg,
            gallery: gallery
          };
        });
      }
    } catch (e) { console.error('Failed to parse admin_products from localStorage:', e); }
  }
  return initialProducts.map((p) => ({
    ...p,
    stockCount: p.stockCount ?? (p.stock ? 24 : 0)
  }));
};

const initCategoriesList = (): Category[] => {
  const stored = localStorage.getItem('admin_categories');
  if (stored) {
    try {
      const parsed: Category[] = JSON.parse(stored);
      return parsed.map((c) => {
        const initMatch = initialCategories.find((ic) => ic.id === c.id);
        return {
          ...c,
          subcategories: c.subcategories || (initMatch ? initMatch.subcategories || [] : [])
        };
      });
    } catch (e) { console.error(e); }
  }
  return initialCategories;
};

class AdminStore {
  adminAccounts: AdminUserAccount[] = JSON.parse(localStorage.getItem('admin_accounts') || JSON.stringify(defaultAdminAccounts));
  authenticatedUser: AdminUserAccount | null = JSON.parse(sessionStorage.getItem('admin_session') || 'null');

  products: Product[] = initProductsList();
  categories: Category[] = initCategoriesList();
  coupons: AdminCoupon[] = JSON.parse(localStorage.getItem('admin_coupons') || JSON.stringify(defaultCoupons));
  banners: AdminBanner[] = JSON.parse(localStorage.getItem('admin_banners') || JSON.stringify(defaultBanners));
  orders: AdminOrder[] = JSON.parse(localStorage.getItem('admin_orders') || JSON.stringify(defaultOrders));
  customers: AdminCustomer[] = JSON.parse(localStorage.getItem('admin_customers') || JSON.stringify(defaultCustomers));
  reviews: AdminReview[] = JSON.parse(localStorage.getItem('admin_reviews') || JSON.stringify(defaultReviews));
  pincodes: PincodeRule[] = JSON.parse(localStorage.getItem('admin_pincodes') || JSON.stringify(defaultPincodes));
  shippingRule: ShippingRule = JSON.parse(localStorage.getItem('admin_shipping') || JSON.stringify(defaultShippingRule));
  announcement: AnnouncementConfig = JSON.parse(localStorage.getItem('admin_announcement') || JSON.stringify(defaultAnnouncement));
  popup: PopupConfig = JSON.parse(localStorage.getItem('admin_popup') || JSON.stringify(defaultPopup));
  auditLogs: AuditLogItem[] = JSON.parse(localStorage.getItem('admin_audit_logs') || JSON.stringify(defaultAuditLogs));

  homepageSections: HomepageSection[] = JSON.parse(
    localStorage.getItem('admin_homepage_sections') || JSON.stringify(defaultHomepageSections)
  );

  currentRole: 'Super Admin' | 'Order Manager' | 'Catalog Manager' = 'Super Admin';

  private listeners: (() => void)[] = [];

  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.persist();
    this.syncToSupabaseRemote();
    this.listeners.forEach((l) => l());
  }

  private async syncToSupabaseRemote() {
    if (!isSupabaseConfigured()) return;
    try {
      // Background Dual-Sync engine to remote Supabase tables when configured
      await Promise.allSettled([
        supabase.from('products').upsert(this.products.map(p => ({ id: p.id, name: p.name, price: p.price, stock_count: p.stockCount, category: p.category }))),
        supabase.from('categories').upsert(this.categories.map(c => ({ id: c.id, name: c.name, icon: c.icon }))),
        supabase.from('banners').upsert(this.banners.map(b => ({ id: b.id, title: b.title, image_url: b.imageUrl, is_active: b.isActive }))),
        supabase.from('homepage_sections').upsert(this.homepageSections.map(s => ({ id: s.id, title: s.title, is_visible: s.isVisible, order: s.order })))
      ]);
    } catch (e) {
      console.warn('Supabase dual-sync warning:', e);
    }
  }

  private persist() {
    localStorage.setItem('admin_accounts', JSON.stringify(this.adminAccounts));
    localStorage.setItem('admin_products', JSON.stringify(this.products));
    localStorage.setItem('admin_categories', JSON.stringify(this.categories));
    localStorage.setItem('admin_product_types', JSON.stringify(this.productTypes));
    localStorage.setItem('admin_coupons', JSON.stringify(this.coupons));
    localStorage.setItem('admin_banners', JSON.stringify(this.banners));
    localStorage.setItem('admin_orders', JSON.stringify(this.orders));
    localStorage.setItem('admin_customers', JSON.stringify(this.customers));
    localStorage.setItem('admin_reviews', JSON.stringify(this.reviews));
    localStorage.setItem('admin_pincodes', JSON.stringify(this.pincodes));
    localStorage.setItem('admin_shipping', JSON.stringify(this.shippingRule));
    localStorage.setItem('admin_announcement', JSON.stringify(this.announcement));
    localStorage.setItem('admin_popup', JSON.stringify(this.popup));
    localStorage.setItem('admin_audit_logs', JSON.stringify(this.auditLogs));
    localStorage.setItem('admin_homepage_sections', JSON.stringify(this.homepageSections));
    
    if (this.authenticatedUser) {
      sessionStorage.setItem('admin_session', JSON.stringify(this.authenticatedUser));
    } else {
      sessionStorage.removeItem('admin_session');
    }
  }

  // --- AUTHENTICATION ---
  login(usernameInput: string, passwordInput: string): { success: boolean; message: string } {
    const user = this.adminAccounts.find(
      (u) => u.username.trim().toLowerCase() === usernameInput.trim().toLowerCase()
    );

    if (!user) {
      return { success: false, message: 'Invalid Username. Personnel account not found.' };
    }

    if (user.password !== passwordInput) {
      return { success: false, message: 'Invalid Password. Please check your credentials.' };
    }

    if (!user.isActive) {
      return { success: false, message: 'Account Access Deactivated by Super Admin.' };
    }

    this.authenticatedUser = user;
    this.currentRole = user.role;
    this.logAction('Admin Login', `User "${user.username}" logged in successfully`);
    this.notify();
    return { success: true, message: 'Login successful' };
  }

  logout() {
    if (this.authenticatedUser) {
      this.logAction('Admin Logout', `User "${this.authenticatedUser.username}" logged out`);
    }
    this.authenticatedUser = null;
    sessionStorage.removeItem('admin_session');
    this.notify();
  }

  createAdminUser(account: { username: string; password: string; fullName: string; role: AdminUserAccount['role'] }) {
    const exists = this.adminAccounts.some((a) => a.username.toLowerCase() === account.username.toLowerCase());
    if (exists) {
      throw new Error(`Username "${account.username}" already exists.`);
    }

    const newUser: AdminUserAccount = {
      id: `usr-admin-${Date.now()}`,
      username: account.username,
      password: account.password,
      fullName: account.fullName,
      role: account.role,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    this.adminAccounts = [...this.adminAccounts, newUser];
    this.logAction('Create Admin Account', `Created new personnel account "${newUser.username}" (${newUser.role})`);
    this.notify();
  }

  toggleAdminUserAccess(id: string) {
    this.adminAccounts = this.adminAccounts.map((acc) => {
      if (acc.id === id) {
        const next = !acc.isActive;
        this.logAction('Toggle Admin Access', `${next ? 'Activated' : 'Deactivated'} account access for "${acc.username}"`);
        return { ...acc, isActive: next };
      }
      return acc;
    });
    this.notify();
  }

  deleteAdminUser(id: string) {
    const acc = this.adminAccounts.find((a) => a.id === id);
    if (acc) {
      if (acc.username === 'Login1') {
        throw new Error('Master personnel account "Login1" cannot be deleted.');
      }
      this.adminAccounts = this.adminAccounts.filter((a) => a.id !== id);
      this.logAction('Delete Admin Account', `Deleted personnel account "${acc.username}"`);
      this.notify();
    }
  }

  logAction(action: string, details: string) {
    const adminName = this.authenticatedUser ? this.authenticatedUser.username : 'System';
    const newLog: AuditLogItem = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
      adminName,
      role: this.currentRole,
      action,
      details
    };
    this.auditLogs = [newLog, ...this.auditLogs];
    this.notify();
  }

  // --- REAL STOREFRONT ORDER PLACEMENT INTERCONNECTION ---
  placeCustomerOrder(orderData: {
    customerName: string;
    email: string;
    phone: string;
    shippingAddress: string;
    city: string;
    state: string;
    pincode: string;
    items: OrderItem[];
    couponCodeApplied?: string;
    paymentMethod: 'COD' | 'UPI' | 'Card' | 'NetBanking';
  }): AdminOrder {
    const subtotal = orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Calculate coupon discount
    let discount = 0;
    if (orderData.couponCodeApplied) {
      const foundCoupon = this.coupons.find(
        (c) => c.code.toLowerCase() === orderData.couponCodeApplied?.toLowerCase() && c.isActive
      );
      if (foundCoupon && subtotal >= foundCoupon.minOrderValue) {
        if (foundCoupon.type === 'flat_pct') {
          discount = Math.round((subtotal * foundCoupon.value) / 100);
        } else if (foundCoupon.type === 'pct_capped') {
          const raw = Math.round((subtotal * foundCoupon.value) / 100);
          discount = foundCoupon.capAmount ? Math.min(raw, foundCoupon.capAmount) : raw;
        } else if (foundCoupon.type === 'flat_amount') {
          discount = foundCoupon.value;
        }
        // Increment coupon usage
        foundCoupon.usedCount += 1;
      }
    }

    const taxableBase = Math.max(subtotal - discount, 0);
    const taxGst = Math.round(taxableBase * 0.05); // 5% GST
    const shippingFee = taxableBase >= this.shippingRule.minOrderForFreeShipping ? 0 : this.shippingRule.standardFee;
    const totalAmount = taxableBase + taxGst + shippingFee;

    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: AdminOrder = {
      id: newOrderId,
      customerName: orderData.customerName,
      email: orderData.email,
      phone: orderData.phone,
      shippingAddress: orderData.shippingAddress,
      city: orderData.city,
      state: orderData.state,
      pincode: orderData.pincode,
      items: orderData.items,
      subtotal,
      discount,
      taxGst,
      shippingFee,
      totalAmount,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'COD' ? 'Pending' : 'Paid',
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })
    };

    // Add to orders list
    this.orders = [newOrder, ...this.orders];

    // Deduct stock for ordered items
    orderData.items.forEach((item) => {
      this.products = this.products.map((p) => {
        if (p.id === item.productId) {
          const currentCount = p.stockCount ?? 20;
          const nextCount = Math.max(currentCount - item.quantity, 0);
          return { ...p, stockCount: nextCount, stock: nextCount > 0 };
        }
        return p;
      });
    });

    // Update customer database
    const existingCust = this.customers.find((c) => c.email.toLowerCase() === orderData.email.toLowerCase());
    if (existingCust) {
      existingCust.totalOrders += 1;
      existingCust.totalSpent += totalAmount;
    } else {
      this.customers.push({
        id: `usr-${Date.now()}`,
        name: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        totalOrders: 1,
        totalSpent: totalAmount,
        joinedDate: new Date().toISOString().split('T')[0],
        city: orderData.city
      });
    }

    this.logAction('New Customer Order', `Order ${newOrderId} placed by ${orderData.customerName} (₹${totalAmount})`);
    this.notify();

    return newOrder;
  }

  // --- PRODUCTS ---
  toggleProductStock(id: number, weight?: string) {
    this.products = this.products.map((p) => {
      if (p.id === id) {
        if (weight) {
          // Initialize map with all weights if not already present
          const currentMap = p.weightStock ? { ...p.weightStock } : {};
          if (p.weights) {
            p.weights.forEach((w) => {
              if (!currentMap[w]) {
                currentMap[w] = { stock: p.stock, stockCount: p.stockCount ?? 10 };
              }
            });
          }
          const currentWeightData = currentMap[weight] || { stock: p.stock, stockCount: p.stockCount ?? 10 };
          const nextStock = !currentWeightData.stock;
          const updatedMap = {
            ...currentMap,
            [weight]: { stock: nextStock, stockCount: currentWeightData.stockCount || 10 }
          };
          const hasAnyStock = Object.values(updatedMap).some((w) => w.stock);
          this.logAction('Weight Stock Toggle', `Toggled stock status for "${p.name}" (${weight}) to ${nextStock ? 'In Stock' : 'Out of Stock'}`);
          return { ...p, weightStock: updatedMap, stock: hasAnyStock };
        }
        const nextStock = !p.stock;
        this.logAction('Stock Toggle', `Toggled stock status for "${p.name}" to ${nextStock ? 'In Stock' : 'Out of Stock'}`);
        return { ...p, stock: nextStock };
      }
      return p;
    });
    this.notify();
  }

  updateProductStockCount(id: number, count: number, weight?: string) {
    this.products = this.products.map((p) => {
      if (p.id === id) {
        if (weight) {
          const currentMap = p.weightStock ? { ...p.weightStock } : {};
          if (p.weights) {
            p.weights.forEach((w) => {
              if (!currentMap[w]) {
                currentMap[w] = { stock: p.stock, stockCount: p.stockCount ?? 10 };
              }
            });
          }
          const updatedMap = {
            ...currentMap,
            [weight]: { stock: count > 0, stockCount: count }
          };
          const hasAnyStock = Object.values(updatedMap).some((w) => w.stock);
          this.logAction('Update Weight Quantity', `Updated inventory quantity for "${p.name}" (${weight}) to ${count}`);
          return { ...p, weightStock: updatedMap, stock: hasAnyStock };
        }
        this.logAction('Update Quantity', `Updated inventory quantity for "${p.name}" to ${count}`);
        return { ...p, stock: count > 0, stockCount: count };
      }
      return p;
    });
    this.notify();
  }

  addOrUpdateProduct(product: Partial<Product>): boolean {
    try {
      if (product.id) {
        this.products = this.products.map((p) => {
          if (p.id === product.id) {
            const rawGallery = product.gallery && product.gallery.length > 0 ? product.gallery : p.gallery;
            const firstImg = rawGallery[0] || product.image || p.image || '';
            const updated = {
              ...p,
              ...product,
              image: firstImg,
              gallery: rawGallery
            } as Product;
            this.logAction('Update Product', `Updated details for product "${updated.name}"`);
            return updated;
          }
          return p;
        });
      } else {
        const newId = Math.max(...this.products.map((p) => p.id), 0) + 1;
        const rawGallery = (product.gallery || []).filter(Boolean);
        const firstImg = rawGallery[0] || product.image || '';
        const newProduct: Product = {
          id: newId,
          slug: (product.name || 'product').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          name: product.name || 'New Product',
          category: product.category || 'dry-fruits',
          categoryName: product.categoryName || 'Dry Fruits & Nuts',
          price: product.price || 99,
          originalPrice: product.originalPrice || (product.price ? product.price + 50 : 149),
          badge: product.badge || '',
          rating: 4.8,
          reviewsCount: 1,
          image: firstImg,
          gallery: rawGallery.length > 0 ? rawGallery : [firstImg],
          shortDesc: product.shortDesc || product.description || 'Freshly sourced quality produce.',
          description: product.description || 'Farm fresh product delivered to your doorstep.',
          weights: product.weights && product.weights.length ? product.weights : ['250g', '500g'],
          sku: product.sku || `SKU-${newId}00`,
          stock: product.stockCount ? product.stockCount > 0 : true,
          stockCount: product.stockCount || 20,
          origin: product.origin || 'India',
          shelfLife: product.shelfLife || '12 Months',
          nutrition: { 'Calories': '45 kcal', 'Vitamin C': '15 mg' },
          features: ['100% Fresh', 'No Preservatives']
        };
        this.products = [newProduct, ...this.products];
        this.logAction('Add Product', `Added new product "${newProduct.name}" (₹${newProduct.price})`);
      }
      this.notify();
      this.persist();

      // If Supabase API client is configured with real credentials, perform dual sync
      if (isSupabaseConfigured() && supabase) {
        (async () => {
          try {
            await supabase.from('products').upsert(this.products, { onConflict: 'id' });
          } catch (e) {
            console.warn('Background Supabase sync notice:', e);
          }
        })();
      }

      return true;
    } catch (err) {
      console.error('Error saving product data:', err);
      return false;
    }
  }

  deleteProduct(id: number) {
    const target = this.products.find((p) => p.id === id);
    if (target) {
      this.products = this.products.filter((p) => p.id !== id);
      this.logAction('Remove Product', `Deleted product "${target.name}"`);
      this.notify();
    }
  }

  // --- COUPONS ---
  toggleCouponStatus(id: string) {
    this.coupons = this.coupons.map((c) => {
      if (c.id === id) {
        const next = !c.isActive;
        this.logAction('Coupon Toggle', `${next ? 'Activated' : 'Deactivated'} coupon code ${c.code}`);
        return { ...c, isActive: next };
      }
      return c;
    });
    this.notify();
  }

  addOrUpdateCoupon(coupon: Partial<AdminCoupon>) {
    if (coupon.id) {
      this.coupons = this.coupons.map((c) => (c.id === coupon.id ? { ...c, ...coupon } as AdminCoupon : c));
      this.logAction('Update Coupon', `Updated coupon code ${coupon.code}`);
    } else {
      const newCoupon: AdminCoupon = {
        id: `c-${Date.now()}`,
        code: (coupon.code || 'SAVE10').toUpperCase(),
        type: coupon.type || 'flat_pct',
        value: coupon.value || 10,
        capAmount: coupon.capAmount,
        minOrderValue: coupon.minOrderValue || 299,
        description: coupon.description || 'Promotional coupon',
        isActive: true,
        usedCount: 0,
        expiryDate: coupon.expiryDate || '2026-12-31'
      };
      this.coupons = [newCoupon, ...this.coupons];
      this.logAction('Add Coupon', `Created new coupon code ${newCoupon.code}`);
    }
    this.notify();
  }

  deleteCoupon(id: string) {
    const c = this.coupons.find((x) => x.id === id);
    if (c) {
      this.coupons = this.coupons.filter((x) => x.id !== id);
      this.logAction('Delete Coupon', `Deleted coupon code ${c.code}`);
      this.notify();
    }
  }

  // --- BANNERS ---
  addOrUpdateBanner(banner: Partial<AdminBanner>) {
    if (banner.id) {
      this.banners = this.banners.map((b) => (b.id === banner.id ? { ...b, ...banner } as AdminBanner : b));
      this.logAction('Update Banner', `Updated banner title "${banner.title}"`);
    } else {
      const newBanner: AdminBanner = {
        id: `b-${Date.now()}`,
        page: banner.page || 'home_slider',
        title: banner.title || 'Promotional Banner',
        subtitle: banner.subtitle || '',
        imageUrl: banner.imageUrl || 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=1200',
        linkUrl: banner.linkUrl || '/products',
        buttonText: banner.buttonText || 'Shop Now',
        isActive: true,
        order: this.banners.length + 1
      };
      this.banners = [...this.banners, newBanner];
      this.logAction('Add Banner', `Added banner for ${newBanner.page}`);
    }
    this.notify();
  }

  deleteBanner(id: string) {
    const b = this.banners.find((x) => x.id === id);
    if (b) {
      this.banners = this.banners.filter((x) => x.id !== id);
      this.logAction('Delete Banner', `Deleted banner "${b.title}"`);
      this.notify();
    }
  }

  // --- ORDERS ---
  updateOrderStatus(orderId: string, status: AdminOrder['status']) {
    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        this.logAction('Update Order Status', `Order ${orderId} status changed to ${status}`);
        return { ...o, status };
      }
      return o;
    });
    this.notify();
  }

  addTrackingInfo(orderId: string, courierName: string, trackingId: string) {
    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        this.logAction('Add Tracking Info', `Added courier tracking ${trackingId} (${courierName}) to order ${orderId}`);
        return { ...o, courierName, trackingId, status: 'Shipped' };
      }
      return o;
    });
    this.notify();
  }

  handleRefundRequest(orderId: string, action: 'Approved' | 'Rejected') {
    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        this.logAction('Refund Moderation', `${action} refund request for order ${orderId}`);
        return { ...o, refundStatus: action, paymentStatus: action === 'Approved' ? 'Refunded' : o.paymentStatus };
      }
      return o;
    });
    this.notify();
  }

  // --- REVIEWS ---
  updateReviewStatus(id: string, status: AdminReview['status']) {
    this.reviews = this.reviews.map((r) => {
      if (r.id === id) {
        this.logAction('Review Moderation', `Review status changed to ${status} for product ${r.productName}`);
        return { ...r, status };
      }
      return r;
    });
    this.notify();
  }

  // --- PINCODES & RULES ---
  addOrUpdatePincode(rule: Partial<PincodeRule>) {
    if (rule.id) {
      this.pincodes = this.pincodes.map((p) => (p.id === rule.id ? { ...p, ...rule } as PincodeRule : p));
      this.logAction('Update Pincode', `Updated serviceability for pincode ${rule.pincode}`);
    } else {
      const newPin: PincodeRule = {
        id: `pin-${Date.now()}`,
        pincode: rule.pincode || '110001',
        city: rule.city || 'Delhi',
        state: rule.state || 'Delhi',
        isDeliverable: rule.isDeliverable ?? true,
        isCodAvailable: rule.isCodAvailable ?? true,
        estimatedDays: rule.estimatedDays || 2
      };
      this.pincodes = [newPin, ...this.pincodes];
      this.logAction('Add Pincode', `Added pincode ${newPin.pincode} (${newPin.city})`);
    }
    this.notify();
  }

  deletePincode(id: string) {
    const p = this.pincodes.find((x) => x.id === id);
    if (p) {
      this.pincodes = this.pincodes.filter((x) => x.id !== id);
      this.logAction('Delete Pincode', `Removed pincode ${p.pincode}`);
      this.notify();
    }
  }

  updateShippingRule(rule: Partial<ShippingRule>) {
    this.shippingRule = { ...this.shippingRule, ...rule };
    this.logAction('Update Shipping Rules', `Set free shipping threshold to ₹${this.shippingRule.minOrderForFreeShipping}`);
    this.notify();
  }

  // --- ANNOUNCEMENT & POPUP ---
  updateAnnouncement(config: Partial<AnnouncementConfig>) {
    this.announcement = { ...this.announcement, ...config };
    this.logAction('Update Announcement', `Updated top header ticker text`);
    this.notify();
  }

  updatePopup(config: Partial<PopupConfig>) {
    this.popup = { ...this.popup, ...config };
    this.logAction('Update Promo Popup', `Updated promo popup title "${this.popup.title}"`);
    this.notify();
  }

  productTypes: string[] = JSON.parse(localStorage.getItem('admin_product_types') || JSON.stringify(['Gold', 'Platinum', 'Diamond']));

  addCategory(category: { name: string; icon: string; desc: string; subcategories?: string[] }) {
    const id = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: Category = { id, subcategories: category.subcategories || [], ...category };
    this.categories = [...this.categories, newCat];
    this.logAction('Add Category', `Created category "${newCat.name}"`);
    this.persist();
    this.notify();
  }

  updateCategory(id: string, updatedFields: Partial<Category>) {
    this.categories = this.categories.map((c) => (c.id === id ? { ...c, ...updatedFields } : c));
    this.logAction('Update Category', `Updated category "${id}"`);
    this.persist();
    this.notify();
  }

  deleteCategory(id: string) {
    const cat = this.categories.find((c) => c.id === id);
    if (cat) {
      this.categories = this.categories.filter((c) => c.id !== id);
      this.logAction('Delete Category', `Deleted category "${cat.name}"`);
      this.persist();
      this.notify();
    }
  }

  addSubcategory(categoryId: string, subCategoryName: string) {
    const trimmed = subCategoryName.trim();
    if (!trimmed) return;
    this.categories = this.categories.map((c) => {
      if (c.id === categoryId) {
        const subs = c.subcategories || [];
        if (!subs.includes(trimmed)) {
          return { ...c, subcategories: [...subs, trimmed] };
        }
      }
      return c;
    });
    this.logAction('Add Subcategory', `Added subcategory "${trimmed}" to category ${categoryId}`);
    this.persist();
    this.notify();
  }

  deleteSubcategory(categoryId: string, subCategoryName: string) {
    this.categories = this.categories.map((c) => {
      if (c.id === categoryId) {
        return { ...c, subcategories: (c.subcategories || []).filter((s) => s !== subCategoryName) };
      }
      return c;
    });
    this.logAction('Delete Subcategory', `Deleted subcategory "${subCategoryName}" from category ${categoryId}`);
    this.persist();
    this.notify();
  }

  updateSubcategory(categoryId: string, oldSubName: string, newSubName: string) {
    const trimmed = newSubName.trim();
    if (!trimmed) return;
    this.categories = this.categories.map((c) => {
      if (c.id === categoryId) {
        const subs = (c.subcategories || []).map((s) => (s === oldSubName ? trimmed : s));
        return { ...c, subcategories: subs };
      }
      return c;
    });
    this.logAction('Update Subcategory', `Renamed subcategory "${oldSubName}" to "${trimmed}" in category ${categoryId}`);
    this.persist();
    this.notify();
  }

  addProductType(typeName: string) {
    const trimmed = typeName.trim();
    if (!trimmed || this.productTypes.includes(trimmed)) return;
    this.productTypes = [...this.productTypes, trimmed];
    this.logAction('Add Product Type', `Added product type grade "${trimmed}"`);
    this.persist();
    this.notify();
  }

  deleteProductType(typeName: string) {
    this.productTypes = this.productTypes.filter((t) => t !== typeName);
    this.logAction('Delete Product Type', `Deleted product type grade "${typeName}"`);
    this.persist();
    this.notify();
  }

  // --- HOMEPAGE LAYOUT MANAGEMENT ---
  updateHomepageSection(id: string, updatedFields: Partial<HomepageSection>) {
    this.homepageSections = this.homepageSections.map((sec) =>
      sec.id === id ? { ...sec, ...updatedFields } : sec
    );
    this.logAction('Update Homepage Section', `Updated section settings for ${id}`);
    this.notify();
  }

  reorderHomepageSections(reordered: HomepageSection[]) {
    this.homepageSections = reordered.map((sec, idx) => ({ ...sec, order: idx + 1 }));
    this.logAction('Reorder Homepage Sections', 'Updated homepage layout order');
    this.notify();
  }
}

export const adminStore = new AdminStore();
