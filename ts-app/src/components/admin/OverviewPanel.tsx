import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import { IndianRupee, ShoppingBag, Ticket, Users, TrendingUp, AlertTriangle } from 'lucide-react';

export const OverviewPanel: React.FC = () => {
  const [chartTimeframe, setChartTimeframe] = useState<'daily' | 'weekly'>('daily');

  const products = adminStore.products;
  const orders = adminStore.orders;
  const coupons = adminStore.coupons;
  const customers = adminStore.customers;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.totalAmount : 0), 0);
  const totalOrdersCount = orders.length;
  const activeCouponsCount = coupons.filter((c) => c.isActive).length;
  const totalCustomersCount = customers.length;

  const lowStockProducts = products.filter((p) => (p.stockCount !== undefined && p.stockCount <= 5) || !p.stock);
  const topBestsellers = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const chartData = chartTimeframe === 'daily'
    ? daysOfWeek.map((day) => {
        const dayOrders = orders.filter((o) => {
          if (!o.createdAt) return false;
          const date = new Date(o.createdAt);
          if (isNaN(date.getTime())) return false;
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          return dayName === day && o.paymentStatus === 'Paid';
        });
        const rev = dayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        return { label: day, revenue: rev, orders: dayOrders.length };
      })
    : ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((weekLabel, index) => {
        const weekOrders = orders.filter((o) => {
          if (!o.createdAt) return false;
          const date = new Date(o.createdAt);
          if (isNaN(date.getTime())) return false;
          const weekNum = Math.floor((date.getDate() - 1) / 7);
          return weekNum === index && o.paymentStatus === 'Paid';
        });
        const rev = weekOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        return { label: weekLabel, revenue: rev, orders: weekOrders.length };
      });

  const maxChartRev = Math.max(...chartData.map((d) => d.revenue), 1);

  return (
    <div style={{ maxWidth: '1200px' }}>
      <h1 className="wp-page-title">Dashboard</h1>

      {/* WordPress Welcome Card */}
      <div className="wp-card" style={{ background: '#ffffff', padding: '20px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #c3c4c7' }}>
        <h2 style={{ fontSize: '21px', fontWeight: 400, margin: '0 0 8px 0', color: '#1d2327' }}>Welcome to RTC Foods WordPress Admin!</h2>
        <p style={{ color: '#50575e', fontSize: '13px', margin: 0 }}>We’ve assembled some links to get you started on managing store products, orders, and content.</p>
      </div>

      {/* 4 Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        
        <div className="wp-card" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#50575e', textTransform: 'uppercase', fontWeight: 600 }}>Total Revenue</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1d2327', margin: '4px 0' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: '12px', color: '#008a20' }}>+14.2% from last week</div>
          </div>
          <div style={{ width: '40px', height: '40px', background: '#e7f5ec', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#008a20' }}>
            <IndianRupee size={20} />
          </div>
        </div>

        <div className="wp-card" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#50575e', textTransform: 'uppercase', fontWeight: 600 }}>Total Orders</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1d2327', margin: '4px 0' }}>{totalOrdersCount}</div>
            <div style={{ fontSize: '12px', color: '#2271b1' }}>+8.4% this month</div>
          </div>
          <div style={{ width: '40px', height: '40px', background: '#f0f6fc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2271b1' }}>
            <ShoppingBag size={20} />
          </div>
        </div>

        <div className="wp-card" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#50575e', textTransform: 'uppercase', fontWeight: 600 }}>Active Coupons</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1d2327', margin: '4px 0' }}>{activeCouponsCount}</div>
            <div style={{ fontSize: '12px', color: '#646970' }}>{coupons.length} total active</div>
          </div>
          <div style={{ width: '40px', height: '40px', background: '#fcf9e8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dba617' }}>
            <Ticket size={20} />
          </div>
        </div>

        <div className="wp-card" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '12px', color: '#50575e', textTransform: 'uppercase', fontWeight: 600 }}>Total Buyers</div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#1d2327', margin: '4px 0' }}>{totalCustomersCount}</div>
            <div style={{ fontSize: '12px', color: '#008a20' }}>+5 new today</div>
          </div>
          <div style={{ width: '40px', height: '40px', background: '#f0f6fc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2271b1' }}>
            <Users size={20} />
          </div>
        </div>

      </div>

      {/* Chart & Low Stock Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
        
        {/* Sales Chart */}
        <div className="wp-card" style={{ margin: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div className="wp-card-header" style={{ margin: 0, border: 'none', padding: 0 }}>
              <TrendingUp size={16} color="#2271b1" style={{ display: 'inline', marginRight: '6px' }} />
              Sales & Revenue Analytics
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                className={chartTimeframe === 'daily' ? 'wp-button-primary' : 'wp-button-secondary'}
                style={{ padding: '2px 8px', fontSize: '12px' }}
                onClick={() => setChartTimeframe('daily')}
              >
                Daily
              </button>
              <button
                className={chartTimeframe === 'weekly' ? 'wp-button-primary' : 'wp-button-secondary'}
                style={{ padding: '2px 8px', fontSize: '12px' }}
                onClick={() => setChartTimeframe('weekly')}
              >
                Weekly
              </button>
            </div>
          </div>

          <div style={{ height: '180px', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '10px 0 0 0', borderBottom: '1px solid #c3c4c7' }}>
            {chartData.map((d, idx) => {
              const rawPct = (d.revenue / maxChartRev) * 100;
              const heightPct = d.revenue > 0 ? Math.max(Math.round(rawPct), 6) : 4;
              const formattedValue = d.revenue >= 1000 ? `₹${(d.revenue / 1000).toFixed(1)}k` : `₹${d.revenue}`;
              return (
                <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '11px', color: '#2271b1', fontWeight: 600, marginBottom: '4px' }}>
                    {formattedValue}
                  </span>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '32px',
                      height: `${heightPct}%`,
                      background: d.revenue > 0 ? '#2271b1' : '#dcdcde',
                      borderRadius: '2px 2px 0 0'
                    }}
                    title={`${d.label}: ₹${d.revenue} (${d.orders} orders)`}
                  />
                  <span style={{ fontSize: '12px', color: '#50575e', marginTop: '6px' }}>
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock Widget */}
        <div className="wp-card" style={{ margin: 0 }}>
          <div className="wp-card-header" style={{ color: '#d63638', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={16} /> Low Stock Warnings ({lowStockProducts.length})
          </div>

          <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lowStockProducts.length === 0 ? (
              <p style={{ color: '#50575e', fontSize: '13px', margin: 0 }}>All products are sufficiently stocked!</p>
            ) : (
              lowStockProducts.map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', background: '#fcf0f1', border: '1px solid #f8cbad', borderRadius: '3px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={p.image} alt={p.name} style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '2px' }} />
                    <span style={{ fontSize: '12px', fontWeight: 600, color: '#1d2327' }}>{p.name}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#d63638', fontWeight: 600 }}>{p.stockCount ?? 0} Left</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Top Bestsellers Table */}
      <div className="wp-card">
        <div className="wp-card-header">🔥 Top Selling Products</div>
        <table className="wp-list-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Stock Status</th>
            </tr>
          </thead>
          <tbody>
            {topBestsellers.map((p) => (
              <tr key={p.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={p.image} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '3px', objectFit: 'cover' }} />
                  <div>
                    <strong style={{ color: '#2271b1' }}>{p.name}</strong>
                    <div style={{ fontSize: '11px', color: '#50575e' }}>SKU: {p.sku}</div>
                  </div>
                </td>
                <td>{p.categoryName}</td>
                <td><strong>₹{p.price}</strong></td>
                <td>⭐ {p.rating} ({p.reviewsCount})</td>
                <td>
                  <span style={{ padding: '2px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: 600, background: p.stock ? '#e7f5ec' : '#fcf0f1', color: p.stock ? '#008a20' : '#d63638' }}>
                    {p.stock ? `In Stock (${p.stockCount ?? 20})` : 'Out of Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
