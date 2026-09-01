import React, { useState, useEffect } from 'react';
import { adminStore } from '../data/adminStore';
import { AdminLogin } from '../components/admin/AdminLogin';
import { OverviewPanel } from '../components/admin/OverviewPanel';
import { ProductsPanel } from '../components/admin/ProductsPanel';
import { CouponsPanel } from '../components/admin/CouponsPanel';
import { BannersPanel } from '../components/admin/BannersPanel';
import { OrdersPanel } from '../components/admin/OrdersPanel';
import { CategoriesTagsPanel } from '../components/admin/CategoriesTagsPanel';
import { CustomersReviewsPanel } from '../components/admin/CustomersReviewsPanel';
import { ShippingRulesPanel } from '../components/admin/ShippingRulesPanel';
import { AnnouncementsPanel } from '../components/admin/AnnouncementsPanel';
import { SecurityAuditPanel } from '../components/admin/SecurityAuditPanel';
import { AdminUsersPanel } from '../components/admin/AdminUsersPanel';
import { PostsPanel } from '../components/admin/PostsPanel';
import '../components/admin/wp-admin-classic.css';

import {
  Wrench,
  FileText,
  Image,
  File,
  Star,
  Mail,
  ShoppingBag,
  Package,
  CreditCard,
  BarChart3,
  Megaphone,
  Palette,
  Plug,
  Users,
  Sliders,
  Send,
  Camera,
  LogOut,
  ExternalLink,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface AdminPageProps {
  setCurrentView: (view: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ setCurrentView }) => {
  const [activeTab, setActiveTabInternal] = useState<string>(() => {
    return localStorage.getItem('admin_active_tab') || 'products';
  });
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(() => {
    return localStorage.getItem('admin_open_submenu') || 'products';
  });
  const [, setRenderTick] = useState(0);

  const setActiveTab = (tab: string) => {
    setActiveTabInternal(tab);
    localStorage.setItem('admin_active_tab', tab);
  };

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setRenderTick((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  if (!adminStore.authenticatedUser) {
    return (
      <AdminLogin
        onSuccess={() => setRenderTick((prev) => prev + 1)}
        onGoToStore={() => setCurrentView('home')}
      />
    );
  }

  const currentUser = adminStore.authenticatedUser;
  const pendingOrdersCount = adminStore.orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;

  const toggleSubmenu = (menuKey: string) => {
    setOpenSubmenu((prev) => {
      const next = prev === menuKey ? null : menuKey;
      if (next) localStorage.setItem('admin_open_submenu', next);
      else localStorage.removeItem('admin_open_submenu');
      return next;
    });
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out of the WordPress Admin panel?')) {
      adminStore.logout();
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'analytics-overview':
        return <OverviewPanel />;
      case 'posts-all':
        return <PostsPanel key="posts-all" subView="all" />;
      case 'posts-add':
        return <PostsPanel key="posts-add" subView="add" />;
      case 'posts-categories':
        return <PostsPanel key="posts-categories" subView="categories" />;
      case 'posts-tags':
        return <PostsPanel key="posts-tags" subView="tags" />;
      case 'products-all':
      case 'products-add':
      case 'analytics-products':
        return <ProductsPanel />;
      case 'products-categories':
      case 'analytics-categories':
        return <CategoriesTagsPanel />;
      case 'products-reviews':
        return <CustomersReviewsPanel />;
      case 'woo-orders':
      case 'analytics-orders':
        return <OrdersPanel />;
      case 'woo-coupons':
      case 'analytics-coupons':
        return <CouponsPanel />;
      case 'woo-customers':
        return <CustomersReviewsPanel />;
      case 'woo-settings':
      case 'payments':
        return <ShippingRulesPanel />;
      case 'pages':
      case 'appearance-themes':
      case 'appearance-banners':
        return <BannersPanel />;
      case 'contact':
      case 'wp-mail-smtp':
        return <AnnouncementsPanel />;
      case 'users-all':
        return <AdminUsersPanel />;
      case 'tools':
        return <SecurityAuditPanel />;
      default:
        return <OverviewPanel />;
    }
  };

  return (
    <div className="wp-admin-root">
      {/* 32px Top WordPress Admin Bar */}
      <div className="wp-adminbar">
        <div className="wp-adminbar-left">
          <span className="wp-adminbar-item" onClick={() => setCurrentView('home')}>
            <Wrench size={14} /> <strong>rtcfoods</strong>
          </span>
          <span className="wp-adminbar-item" onClick={() => setCurrentView('home')}>
            <ExternalLink size={14} /> Visit Site
          </span>
        </div>

        <div className="wp-adminbar-right">
          <span className="wp-adminbar-item">
            Howdy, <strong>{currentUser.username}</strong>
          </span>
          <span className="wp-adminbar-item" onClick={handleLogout}>
            <LogOut size={13} /> Log Out
          </span>
        </div>
      </div>

      {/* Workspace with Left Sidebar & Main Content Area */}
      <div className="wp-admin-workspace">
        {/* Left WP Sidebar */}
        <aside className="wp-sidebar">
          <ul className="wp-nav-menu">

            {/* Dashboard */}
            <li className={`wp-menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('dashboard')}>
                <div className="wp-menu-title">
                  <BarChart3 size={16} /> <span>Dashboard</span>
                </div>
              </button>
            </li>

            {/* Orders */}
            <li className={`wp-menu-item ${activeTab === 'woo-orders' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('woo-orders')}>
                <div className="wp-menu-title">
                  <ShoppingBag size={16} /> <span>Orders</span>
                </div>
                {pendingOrdersCount > 0 && <span className="wp-badge">{pendingOrdersCount}</span>}
              </button>
            </li>

            {/* Products */}
            <li className={`wp-menu-item ${activeTab.startsWith('products') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => toggleSubmenu('products')}>
                <div className="wp-menu-title">
                  <Package size={16} /> <span>Products</span>
                </div>
                {openSubmenu === 'products' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'products' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'products-all' ? 'active' : ''}`} onClick={() => setActiveTab('products-all')}>All Products</li>
                  <li className={`wp-submenu-item ${activeTab === 'products-add' ? 'active' : ''}`} onClick={() => setActiveTab('products-add')}>Add New</li>
                  <li className={`wp-submenu-item ${activeTab === 'products-categories' ? 'active' : ''}`} onClick={() => setActiveTab('products-categories')}>Categories</li>
                  <li className={`wp-submenu-item ${activeTab === 'products-reviews' ? 'active' : ''}`} onClick={() => setActiveTab('products-reviews')}>Reviews</li>
                </ul>
              )}
            </li>

            {/* Customers */}
            <li className={`wp-menu-item ${activeTab === 'woo-customers' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('woo-customers')}>
                <div className="wp-menu-title">
                  <Users size={16} /> <span>Customers</span>
                </div>
              </button>
            </li>

            {/* Coupons & Discounts */}
            <li className={`wp-menu-item ${activeTab === 'woo-coupons' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('woo-coupons')}>
                <div className="wp-menu-title">
                  <Sliders size={16} /> <span>Coupons & Discounts</span>
                </div>
              </button>
            </li>

            {/* Shipping & Delivery Settings */}
            <li className={`wp-menu-item ${activeTab === 'woo-settings' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('woo-settings')}>
                <div className="wp-menu-title">
                  <CreditCard size={16} /> <span>Shipping & Rates</span>
                </div>
              </button>
            </li>

            {/* Posts / Wellness Blog */}
            <li className={`wp-menu-item ${activeTab.startsWith('posts') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => { setActiveTab('posts-all'); toggleSubmenu('posts'); }}>
                <div className="wp-menu-title">
                  <FileText size={16} /> <span>Posts (Blog)</span>
                </div>
                {openSubmenu === 'posts' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'posts' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'posts-all' ? 'active' : ''}`} onClick={() => setActiveTab('posts-all')}>All Posts</li>
                  <li className={`wp-submenu-item ${activeTab === 'posts-add' ? 'active' : ''}`} onClick={() => setActiveTab('posts-add')}>Add New</li>
                  <li className={`wp-submenu-item ${activeTab === 'posts-categories' ? 'active' : ''}`} onClick={() => setActiveTab('posts-categories')}>Categories</li>
                </ul>
              )}
            </li>

            {/* Hero Sliders & Banners */}
            <li className={`wp-menu-item ${activeTab === 'appearance-banners' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('appearance-banners')}>
                <div className="wp-menu-title">
                  <Palette size={16} /> <span>Hero Banners</span>
                </div>
              </button>
            </li>

            {/* Announcement Bar */}
            <li className={`wp-menu-item ${activeTab === 'contact' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('contact')}>
                <div className="wp-menu-title">
                  <Megaphone size={16} /> <span>Announcement Bar</span>
                </div>
              </button>
            </li>

            {/* Users / Admin Accounts */}
            <li className={`wp-menu-item ${activeTab === 'users-all' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('users-all')}>
                <div className="wp-menu-title">
                  <Users size={16} /> <span>Users & Accounts</span>
                </div>
              </button>
            </li>

          </ul>
        </aside>

        {/* Main Content Workspace */}
        <main className="wp-content-area">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};
