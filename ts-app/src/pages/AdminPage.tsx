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
          <span className="wp-adminbar-item">
            💬 0 Comments
          </span>
          <span className="wp-adminbar-item">
            ➕ New
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

            {/* Site Kit */}
            <li className="wp-menu-item">
              <button className="wp-menu-header">
                <div className="wp-menu-title">
                  <span>G Site Kit</span>
                </div>
              </button>
            </li>

            {/* Elementor */}
            <li className="wp-menu-item">
              <button className="wp-menu-header">
                <div className="wp-menu-title">
                  <span>E Elementor</span>
                </div>
              </button>
            </li>

            {/* Simple History */}
            <li className="wp-menu-item">
              <button className="wp-menu-header">
                <div className="wp-menu-title">
                  <span>📜 Simple History</span>
                </div>
              </button>
            </li>

            {/* Posts */}
            <li className={`wp-menu-item ${activeTab.startsWith('posts') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => { setActiveTab('posts-all'); toggleSubmenu('posts'); }}>
                <div className="wp-menu-title">
                  <FileText size={16} /> <span>Posts</span>
                </div>
                {openSubmenu === 'posts' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'posts' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'posts-all' ? 'active' : ''}`} onClick={() => setActiveTab('posts-all')}>All Posts</li>
                  <li className={`wp-submenu-item ${activeTab === 'posts-add' ? 'active' : ''}`} onClick={() => setActiveTab('posts-add')}>Add New</li>
                  <li className={`wp-submenu-item ${activeTab === 'posts-categories' ? 'active' : ''}`} onClick={() => setActiveTab('posts-categories')}>Categories</li>
                  <li className={`wp-submenu-item ${activeTab === 'posts-tags' ? 'active' : ''}`} onClick={() => setActiveTab('posts-tags')}>Tags</li>
                </ul>
              )}
            </li>

            {/* Media */}
            <li className={`wp-menu-item ${activeTab === 'media' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('appearance-banners')}>
                <div className="wp-menu-title">
                  <Image size={16} /> <span>Media</span>
                </div>
              </button>
            </li>

            {/* Pages */}
            <li className={`wp-menu-item ${activeTab === 'pages' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('pages')}>
                <div className="wp-menu-title">
                  <File size={16} /> <span>Pages</span>
                </div>
              </button>
            </li>

            {/* Google reviews */}
            <li className={`wp-menu-item ${activeTab === 'google-reviews' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('products-reviews')}>
                <div className="wp-menu-title">
                  <Star size={16} /> <span>Google reviews</span>
                </div>
              </button>
            </li>

            {/* Contact */}
            <li className={`wp-menu-item ${activeTab === 'contact' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('contact')}>
                <div className="wp-menu-title">
                  <Mail size={16} /> <span>Contact</span>
                </div>
              </button>
            </li>

            {/* WooCommerce */}
            <li className={`wp-menu-item ${activeTab.startsWith('woo') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => toggleSubmenu('woocommerce')}>
                <div className="wp-menu-title">
                  <ShoppingBag size={16} /> <span>WooCommerce</span>
                </div>
                {pendingOrdersCount > 0 && <span className="wp-badge">{pendingOrdersCount}</span>}
                {openSubmenu === 'woocommerce' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'woocommerce' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'woo-orders' ? 'active' : ''}`} onClick={() => setActiveTab('woo-orders')}>
                    Orders {pendingOrdersCount > 0 && `(${pendingOrdersCount})`}
                  </li>
                  <li className={`wp-submenu-item ${activeTab === 'woo-customers' ? 'active' : ''}`} onClick={() => setActiveTab('woo-customers')}>Customers</li>
                  <li className={`wp-submenu-item ${activeTab === 'woo-coupons' ? 'active' : ''}`} onClick={() => setActiveTab('woo-coupons')}>Coupons</li>
                  <li className={`wp-submenu-item ${activeTab === 'woo-settings' ? 'active' : ''}`} onClick={() => setActiveTab('woo-settings')}>Settings</li>
                  <li className="wp-submenu-item" onClick={() => setActiveTab('woo-settings')}>Status</li>
                  <li className="wp-submenu-item" onClick={() => setActiveTab('woo-settings')}>Extensions</li>
                </ul>
              )}
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
                  <li className={`wp-submenu-item ${activeTab === 'products-categories' ? 'active' : ''}`} onClick={() => setActiveTab('products-categories')}>Categories</li>
                  <li className={`wp-submenu-item ${activeTab === 'products-attributes' ? 'active' : ''}`} onClick={() => setActiveTab('products-categories')}>Attributes</li>
                  <li className={`wp-submenu-item ${activeTab === 'products-reviews' ? 'active' : ''}`} onClick={() => setActiveTab('products-reviews')}>Reviews</li>
                </ul>
              )}
            </li>

            {/* Payments */}
            <li className={`wp-menu-item ${activeTab === 'payments' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('payments')}>
                <div className="wp-menu-title">
                  <CreditCard size={16} /> <span>Payments</span>
                </div>
              </button>
            </li>

            {/* Analytics */}
            <li className={`wp-menu-item ${activeTab.startsWith('analytics') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => toggleSubmenu('analytics')}>
                <div className="wp-menu-title">
                  <BarChart3 size={16} /> <span>Analytics</span>
                </div>
                {openSubmenu === 'analytics' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'analytics' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'analytics-overview' ? 'active' : ''}`} onClick={() => setActiveTab('analytics-overview')}>Overview</li>
                  <li className={`wp-submenu-item ${activeTab === 'analytics-products' ? 'active' : ''}`} onClick={() => setActiveTab('analytics-products')}>Products</li>
                  <li className={`wp-submenu-item ${activeTab === 'analytics-revenue' ? 'active' : ''}`} onClick={() => setActiveTab('analytics-overview')}>Revenue</li>
                  <li className={`wp-submenu-item ${activeTab === 'analytics-orders' ? 'active' : ''}`} onClick={() => setActiveTab('analytics-orders')}>Orders</li>
                  <li className={`wp-submenu-item ${activeTab === 'analytics-categories' ? 'active' : ''}`} onClick={() => setActiveTab('analytics-categories')}>Categories</li>
                  <li className={`wp-submenu-item ${activeTab === 'analytics-coupons' ? 'active' : ''}`} onClick={() => setActiveTab('analytics-coupons')}>Coupons</li>
                </ul>
              )}
            </li>

            {/* Marketing */}
            <li className={`wp-menu-item ${activeTab === 'marketing' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('woo-coupons')}>
                <div className="wp-menu-title">
                  <Megaphone size={16} /> <span>Marketing</span>
                </div>
              </button>
            </li>

            {/* Appearance */}
            <li className={`wp-menu-item ${activeTab.startsWith('appearance') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => toggleSubmenu('appearance')}>
                <div className="wp-menu-title">
                  <Palette size={16} /> <span>Appearance</span>
                </div>
                {openSubmenu === 'appearance' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'appearance' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'appearance-themes' ? 'active' : ''}`} onClick={() => setActiveTab('appearance-banners')}>Themes</li>
                  <li className={`wp-submenu-item ${activeTab === 'appearance-banners' ? 'active' : ''}`} onClick={() => setActiveTab('appearance-banners')}>Page Banners</li>
                  <li className="wp-submenu-item" onClick={() => setActiveTab('appearance-banners')}>Customize</li>
                </ul>
              )}
            </li>

            {/* Plugins */}
            <li className={`wp-menu-item ${activeTab === 'plugins' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('plugins')}>
                <div className="wp-menu-title">
                  <Plug size={16} /> <span>Plugins</span>
                </div>
              </button>
            </li>

            {/* Users */}
            <li className={`wp-menu-item ${activeTab.startsWith('users') ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => toggleSubmenu('users')}>
                <div className="wp-menu-title">
                  <Users size={16} /> <span>Users</span>
                </div>
                {openSubmenu === 'users' ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
              </button>
              {openSubmenu === 'users' && (
                <ul className="wp-submenu">
                  <li className={`wp-submenu-item ${activeTab === 'users-all' ? 'active' : ''}`} onClick={() => setActiveTab('users-all')}>All Users</li>
                  <li className="wp-submenu-item" onClick={() => setActiveTab('users-all')}>Add New</li>
                  <li className="wp-submenu-item" onClick={() => setActiveTab('users-all')}>Profile</li>
                </ul>
              )}
            </li>

            {/* Tools */}
            <li className={`wp-menu-item ${activeTab === 'tools' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('tools')}>
                <div className="wp-menu-title">
                  <Sliders size={16} /> <span>Tools</span>
                </div>
              </button>
            </li>

            {/* WP Mail SMTP */}
            <li className={`wp-menu-item ${activeTab === 'wp-mail-smtp' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('wp-mail-smtp')}>
                <div className="wp-menu-title">
                  <Send size={16} /> <span>WP Mail SMTP</span>
                </div>
              </button>
            </li>

            {/* Instagram Feed */}
            <li className={`wp-menu-item ${activeTab === 'instagram-feed' ? 'active' : ''}`}>
              <button className="wp-menu-header" onClick={() => setActiveTab('appearance-banners')}>
                <div className="wp-menu-title">
                  <Camera size={16} /> <span>Instagram Feed</span>
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
