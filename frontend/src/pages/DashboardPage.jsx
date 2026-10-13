import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  HelpCircle,
  BookOpen,
  Sparkles,
  RefreshCw,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  DollarSign,
  X,
  Star,
  Tag,
  Clock,
  Eye,
  Filter,
  Layers,
  Phone,
  MapPin,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Zap,
  Leaf
} from 'lucide-react';

import {
  fetchDashboardStats,
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchOrders,
  updateOrderStatus,
  deleteOrder,
  fetchReviews,
  submitReview,
  updateReview,
  deleteReview,
  fetchFaqs,
  createFaq,
  updateFaq,
  deleteFaq,
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  fetchTransformations,
  createTransformation,
  updateTransformation,
  deleteTransformation,
  fetchHomePageData
} from '../services/api';

export default function DashboardPage({ onBackToStore, onDataUpdated }) {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'reviews' | 'faqs' | 'blogs' | 'ingredients' | 'transformations'
  
  // Data States
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [transformations, setTransformations] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('ALL');
  
  // Feedback Toast
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Modals
  const [modalType, setModalType] = useState(null); // 'product' | 'faq' | 'review' | 'blog' | 'ingredient' | 'transformation' | 'order_view'
  const [modalMode, setModalMode] = useState('create'); // 'create' | 'edit'
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type, id, title }

  // Initial Load
  const loadAllData = async () => {
    setLoading(true);
    try {
      const [
        statsData,
        productsData,
        ordersData,
        reviewsData,
        faqsData,
        blogsData,
        ingredientsData,
        transformationsData
      ] = await Promise.all([
        fetchDashboardStats(),
        fetchProducts(),
        fetchOrders(),
        fetchReviews(),
        fetchFaqs(),
        fetchBlogs(),
        fetchIngredients(),
        fetchTransformations()
      ]);

      if (statsData) setStats(statsData.metrics);
      if (productsData) setProducts(productsData);
      if (ordersData) setOrders(ordersData);
      if (reviewsData) setReviews(reviewsData);
      if (faqsData) setFaqs(faqsData);
      if (blogsData) setBlogs(blogsData);
      if (ingredientsData) setIngredients(ingredientsData);
      if (transformationsData) setTransformations(transformationsData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
      showToast('Could not reach Django Backend API. Ensure server is running.', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    await loadAllData();
    showToast('Dashboard data refreshed directly from Django database');
  };

  // Sync back to store if changed
  const triggerStoreSync = () => {
    if (onDataUpdated) onDataUpdated();
  };

  // ==========================================
  // PRODUCT ACTIONS
  // ==========================================
  const handleSaveProduct = async (formData) => {
    try {
      if (modalMode === 'create') {
        const created = await createProduct(formData);
        setProducts([created, ...products]);
        showToast(`Bundle "${created.name}" created successfully!`);
      } else {
        const idToUpdate = editingItem.db_id || editingItem.id || editingItem.slug;
        const updated = await updateProduct(idToUpdate, formData);
        setProducts(products.map(p => (p.slug === updated.slug || p.id === updated.id ? updated : p)));
        showToast(`Bundle "${updated.name}" updated successfully!`);
      }
      setModalType(null);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteProduct = async (item) => {
    try {
      const idToDelete = item.db_id || item.id || item.slug;
      await deleteProduct(idToDelete);
      setProducts(products.filter(p => p.slug !== item.slug && p.id !== item.id));
      setDeleteConfirm(null);
      showToast(`Bundle removed from catalog.`);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ==========================================
  // ORDER ACTIONS
  // ==========================================
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(o => o.order_id === orderId ? { ...o, status: newStatus } : o));
      showToast(`Order #${orderId} status changed to ${newStatus}`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteOrder = async (order) => {
    try {
      const idToDelete = order.id || order.order_id;
      await deleteOrder(idToDelete);
      setOrders(orders.filter(o => o.order_id !== order.order_id));
      setDeleteConfirm(null);
      showToast(`Order #${order.order_id} deleted.`);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ==========================================
  // REVIEW ACTIONS
  // ==========================================
  const handleSaveReview = async (formData) => {
    try {
      if (modalMode === 'create') {
        const created = await submitReview(formData);
        setReviews([created, ...reviews]);
        showToast(`Review by ${created.author} added!`);
      } else {
        const updated = await updateReview(editingItem.id, formData);
        setReviews(reviews.map(r => r.id === updated.id ? updated : r));
        showToast(`Review updated successfully!`);
      }
      setModalType(null);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteReview = async (item) => {
    try {
      await deleteReview(item.id);
      setReviews(reviews.filter(r => r.id !== item.id));
      setDeleteConfirm(null);
      showToast('Review deleted.');
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ==========================================
  // FAQ ACTIONS
  // ==========================================
  const handleSaveFaq = async (formData) => {
    try {
      if (modalMode === 'create') {
        const created = await createFaq(formData);
        setFaqs([...faqs, created]);
        showToast('New FAQ added successfully!');
      } else {
        const updated = await updateFaq(editingItem.id, formData);
        setFaqs(faqs.map(f => f.id === updated.id ? updated : f));
        showToast('FAQ updated successfully!');
      }
      setModalType(null);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteFaq = async (item) => {
    try {
      await deleteFaq(item.id);
      setFaqs(faqs.filter(f => f.id !== item.id));
      setDeleteConfirm(null);
      showToast('FAQ removed.');
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ==========================================
  // BLOG ACTIONS
  // ==========================================
  const handleSaveBlog = async (formData) => {
    try {
      if (modalMode === 'create') {
        const created = await createBlog(formData);
        setBlogs([created, ...blogs]);
        showToast(`Article "${created.title}" published!`);
      } else {
        const idToUpdate = editingItem.db_id || editingItem.id || editingItem.slug;
        const updated = await updateBlog(idToUpdate, formData);
        setBlogs(blogs.map(b => (b.slug === updated.slug || b.id === updated.id ? updated : b)));
        showToast('Article updated successfully!');
      }
      setModalType(null);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteBlog = async (item) => {
    try {
      const idToDelete = item.db_id || item.id || item.slug;
      await deleteBlog(idToDelete);
      setBlogs(blogs.filter(b => b.slug !== item.slug && b.id !== item.id));
      setDeleteConfirm(null);
      showToast('Article deleted.');
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ==========================================
  // INGREDIENTS ACTIONS
  // ==========================================
  const handleSaveIngredient = async (formData) => {
    try {
      if (modalMode === 'create') {
        const created = await createIngredient(formData);
        setIngredients([...ingredients, created]);
        showToast(`Ingredient "${created.name}" created!`);
      } else {
        const updated = await updateIngredient(editingItem.id, formData);
        setIngredients(ingredients.map(i => i.id === updated.id ? updated : i));
        showToast(`Ingredient updated.`);
      }
      setModalType(null);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteIngredient = async (item) => {
    try {
      await deleteIngredient(item.id);
      setIngredients(ingredients.filter(i => i.id !== item.id));
      setDeleteConfirm(null);
      showToast('Ingredient deleted.');
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // ==========================================
  // TRANSFORMATIONS ACTIONS
  // ==========================================
  const handleSaveTransformation = async (formData) => {
    try {
      if (modalMode === 'create') {
        const created = await createTransformation(formData);
        setTransformations([...transformations, created]);
        showToast(`Case study for "${created.name}" created!`);
      } else {
        const updated = await updateTransformation(editingItem.id, formData);
        setTransformations(transformations.map(t => t.id === updated.id ? updated : t));
        showToast('Transformation case updated.');
      }
      setModalType(null);
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteTransformation = async (item) => {
    try {
      await deleteTransformation(item.id);
      setTransformations(transformations.filter(t => t.id !== item.id));
      setDeleteConfirm(null);
      showToast('Case study deleted.');
      triggerStoreSync();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Navigation Items
  const navItems = [
    { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard, count: null },
    { id: 'products', label: 'Products & Bundles', icon: Package, count: products.length },
    { id: 'orders', label: 'Customer Orders', icon: ShoppingCart, count: orders.length },
    { id: 'reviews', label: 'Customer Reviews', icon: Star, count: reviews.length },
    { id: 'faqs', label: 'FAQs & Knowledge', icon: HelpCircle, count: faqs.length },
    { id: 'blogs', label: 'Clinical Journal / Blogs', icon: BookOpen, count: blogs.length },
    { id: 'ingredients', label: 'Active Ingredients', icon: Sparkles, count: ingredients.length },
    { id: 'transformations', label: 'Before & After Results', icon: Layers, count: transformations.length },
  ];

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = orderStatusFilter === 'ALL' || order.status.toUpperCase() === orderStatusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = !q ||
        order.order_id?.toLowerCase().includes(q) ||
        order.full_name?.toLowerCase().includes(q) ||
        order.phone?.toLowerCase().includes(q) ||
        order.city?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderStatusFilter, searchQuery]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return products;
    return products.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.subtitle?.toLowerCase().includes(q) ||
      p.tag?.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f4f7f4] text-slate-900 font-sans flex flex-col selection:bg-emerald-500/20 selection:text-emerald-950">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all transform animate-fadeIn border ${
          toast.type === 'error'
            ? 'bg-rose-900 text-rose-50 border-rose-700'
            : 'bg-[#064e3b] text-emerald-50 border-emerald-600'
        }`}>
          {toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          )}
          <span>{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Luxury Executive Top Bar */}
      <header className="bg-[#053b2c] border-b border-emerald-800 text-white sticky top-0 z-40 shadow-md w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-12 py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand & Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-emerald-400 p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#053b2c] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-luxury text-lg tracking-[0.18em] font-extrabold text-white">
                  FOLLI<span className="text-emerald-300">LUXE</span>
                </span>
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Executive Admin Portal
                </span>
              </div>
              <p className="text-[10px] text-emerald-200/80 font-medium tracking-wide hidden sm:block">
                Full-Screen Dynamic Management Dashboard (Django REST + PostgreSQL)
              </p>
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2.5">
            
            {/* Live Database Status Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-900/60 border border-emerald-700/50 text-[11px] font-medium text-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Django API Active</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-semibold border border-emerald-600/40 transition-all cursor-pointer disabled:opacity-50"
              title="Refresh Data from Server"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-amber-300' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            {/* Return to Web App Store */}
            <button
              onClick={onBackToStore}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 text-xs font-extrabold shadow-md transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout - Left Side Full Cover */}
      <div className="w-full flex-1 flex flex-col lg:flex-row">
        
        {/* Navigation Sidebar - Docked to Left Edge (0px margin, full height) */}
        <aside className="w-full lg:w-64 xl:w-72 shrink-0 bg-white border-r border-slate-200/90 lg:min-h-[calc(100vh-65px)] flex flex-col justify-between p-4 lg:p-5 lg:sticky lg:top-[65px] z-30 shadow-xs">
          <div className="space-y-4">
            <div>
              <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Management Modules
              </div>

              <div className="space-y-1 mt-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSearchQuery('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer ${
                        isActive
                          ? 'bg-[#064e3b] text-white shadow-sm shadow-emerald-900/20'
                          : 'text-slate-700 hover:bg-emerald-50/70 hover:text-emerald-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.count !== null && (
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                          isActive ? 'bg-emerald-800 text-amber-300' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions Shortcuts inside Sidebar */}
            <div className="pt-3 border-t border-slate-100">
              <div className="px-3 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                Quick Shortcuts
              </div>
              <div className="space-y-1 mt-1">
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('product');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors text-left cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Create New Bundle</span>
                </button>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('faq');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors text-left cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Create New FAQ</span>
                </button>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('blog');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-800 hover:bg-emerald-50 transition-colors text-left cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Publish Article</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Help Card at bottom of sidebar */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="bg-gradient-to-br from-emerald-950 via-[#064e3b] to-[#022c22] rounded-2xl p-4 text-emerald-100 text-xs shadow-md border border-emerald-700/30">
              <div className="flex items-center gap-2 text-amber-300 font-bold mb-1.5">
                <Zap className="w-4 h-4" />
                <span>100% Dynamic Engine</span>
              </div>
              <p className="text-[11px] text-emerald-200/90 leading-relaxed mb-3">
                All edits to products, prices, stock, blogs, and reviews are instantly synced with PostgreSQL.
              </p>
              <div className="flex items-center justify-between text-[10px] text-emerald-400 font-semibold pt-2 border-t border-emerald-800/80">
                <span>Django Admin:</span>
                <span className="text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded font-black">Disabled</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Dynamic Content View Area - Full width right side */}
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 2xl:p-10 space-y-6">
          
          {/* TAB 1: OVERVIEW & ANALYTICS */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <span>Executive Overview</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                      Live Dynamic
                    </span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real-time catalog metrics and store operations summary
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setModalMode('create');
                      setEditingItem(null);
                      setModalType('product');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Bundle</span>
                  </button>
                  <button
                    onClick={() => {
                      setModalMode('create');
                      setEditingItem(null);
                      setModalType('faq');
                    }}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New FAQ</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Revenue */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Gross Sales</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      Rs. {stats ? Math.round(stats.total_revenue_usd * 278).toLocaleString() : '0'}
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{orders.length} orders processed</span>
                    </div>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Customer Orders</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                      <ShoppingCart className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      {orders.length}
                    </div>
                    <div className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-1">
                      <span>{orders.filter(o => o.status === 'Pending').length} Pending Delivery</span>
                    </div>
                  </div>
                </div>

                {/* Products in Catalog */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Active Bundles</span>
                    <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      {products.length}
                    </div>
                    <div className="text-[11px] text-indigo-600 font-semibold flex items-center gap-1 mt-1">
                      <span>{products.filter(p => p.in_stock).length} In Stock</span>
                    </div>
                  </div>
                </div>

                {/* Verified Reviews */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm flex flex-col justify-between hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">Reviews & Rating</span>
                    <div className="w-8 h-8 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">
                      {reviews.length} <span className="text-xs font-semibold text-slate-400">(4.9★)</span>
                    </div>
                    <div className="text-[11px] text-yellow-700 font-semibold flex items-center gap-1 mt-1">
                      <span>100% Verified Clinical Buyers</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Order Status Workflow Pills */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-700">Order Fulfilment Pipeline</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <span>View All Orders</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-amber-700">Pending</div>
                      <div className="text-lg font-black">{orders.filter(o => o.status === 'Pending').length}</div>
                    </div>
                    <Clock className="w-5 h-5 text-amber-600 opacity-60" />
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-900 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-blue-700">Processing</div>
                      <div className="text-lg font-black">{orders.filter(o => o.status === 'Processing').length}</div>
                    </div>
                    <RefreshCw className="w-5 h-5 text-blue-600 opacity-60" />
                  </div>
                  <div className="p-3 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-900 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-purple-700">Shipped</div>
                      <div className="text-lg font-black">{orders.filter(o => o.status === 'Shipped').length}</div>
                    </div>
                    <Layers className="w-5 h-5 text-purple-600 opacity-60" />
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-emerald-700">Delivered</div>
                      <div className="text-lg font-black">{orders.filter(o => o.status === 'Delivered').length}</div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 opacity-60" />
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-900 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold uppercase text-rose-700">Cancelled</div>
                      <div className="text-lg font-black">{orders.filter(o => o.status === 'Cancelled').length}</div>
                    </div>
                    <X className="w-5 h-5 text-rose-600 opacity-60" />
                  </div>
                </div>
              </div>

              {/* Recent Orders and Recent Reviews Two-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-emerald-700" />
                      <span>Recent Orders</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Manage All
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No customer orders recorded yet. Place an order on the checkout page to see it here!
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {orders.slice(0, 5).map((order) => (
                        <div key={order.order_id} className="py-3 flex items-center justify-between gap-3 text-xs">
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>#{order.order_id}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                                {order.city || 'Standard'}
                              </span>
                            </div>
                            <div className="text-slate-500 text-[11px] mt-0.5">
                              {order.full_name} • {order.items?.length || 1} items
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-extrabold text-slate-900">
                              Rs. {Math.round(parseFloat(order.total_usd || 0) * 278).toLocaleString()}
                            </div>
                            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                              order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                              order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Catalog Bundles Preview */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-700" />
                      <span>Product Bundles ({products.length})</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Edit Catalog
                    </button>
                  </div>

                  <div className="space-y-3">
                    {products.slice(0, 4).map((bundle) => (
                      <div key={bundle.id || bundle.slug} className="p-3 rounded-xl bg-slate-50/70 border border-slate-200/60 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-100/50 flex items-center justify-center font-bold text-emerald-800 text-xs shrink-0 overflow-hidden">
                            {bundle.image ? (
                              <img src={bundle.image} alt={bundle.name} className="w-full h-full object-cover" />
                            ) : (
                              <span>{bundle.bottles_count || bundle.bottlesCount}x</span>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 leading-tight">
                              {bundle.name}
                            </div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                              <span>Rs. {Math.round(parseFloat(bundle.price_usd || bundle.priceUSD || 0) * 278).toLocaleString()}</span>
                              <span className="text-slate-300">•</span>
                              <span className="text-emerald-700 font-semibold">{bundle.supply_days || bundle.supplyDays}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setModalMode('edit');
                              setEditingItem(bundle);
                              setModalType('product');
                            }}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-emerald-50 hover:text-emerald-800 text-slate-600 transition-colors cursor-pointer"
                            title="Edit Bundle"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}


          {/* TAB 2: PRODUCTS & BUNDLES MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Product Bundles Catalog
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Create, modify prices, stock status, and features for customer purchases.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('product');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Bundle</span>
                </button>
              </div>

              {/* Products Table Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider text-[10px] font-extrabold">
                      <tr>
                        <th className="py-3 px-4">Bundle Name</th>
                        <th className="py-3 px-4">Pricing</th>
                        <th className="py-3 px-4">Supply</th>
                        <th className="py-3 px-4">Badges</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => {
                        const price = p.price_usd || p.priceUSD;
                        const origPrice = p.original_price_usd || p.originalPriceUSD;
                        const disc = p.discount_percent || p.discountPercent;
                        const supply = p.supply_days || p.supplyDays;
                        const inStock = p.in_stock !== undefined ? p.in_stock : p.inStock;
                        return (
                          <tr key={p.id || p.slug} className="hover:bg-emerald-50/30 transition-colors">
                            <td className="py-3.5 px-4 font-semibold text-slate-900">
                              <div className="font-bold text-slate-900">{p.name}</div>
                              <div className="text-[11px] text-slate-500 font-normal truncate max-w-xs">{p.subtitle}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-slate-900">Rs. {Math.round(parseFloat(price || 0) * 278).toLocaleString()}</div>
                              {origPrice && (
                                <div className="text-[10px] text-slate-400 line-through">
                                  Rs. {Math.round(parseFloat(origPrice || 0) * 278).toLocaleString()} ({disc}% OFF)
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 font-medium">
                              {supply}
                            </td>
                            <td className="py-3.5 px-4 space-x-1">
                              {p.popular && (
                                <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Popular
                                </span>
                              )}
                              {p.best_value && (
                                <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  Best Value
                                </span>
                              )}
                              {p.tag && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  {p.tag}
                                </span>
                              )}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${inStock ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                                {inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setModalMode('edit');
                                  setEditingItem(p);
                                  setModalType('product');
                                }}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors cursor-pointer"
                                title="Edit Bundle"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'product', item: p, title: p.name })}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-800 text-slate-700 transition-colors cursor-pointer"
                                title="Delete Bundle"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}


          {/* TAB 3: CUSTOMER ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-5 animate-fadeIn">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Customer Orders ({filteredOrders.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Orders received from website checkout. Update statuses or review customer delivery details.
                  </p>
                </div>

                {/* Filter and Search */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search Order ID, Name..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  
                  {/* Status Filter */}
                  <select
                    value={orderStatusFilter}
                    onChange={(e) => setOrderStatusFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="SHIPPED">Shipped</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12 text-slate-400 text-xs">
                    No orders matching criteria. Place an order on the checkout page to test live creation!
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider text-[10px] font-extrabold">
                        <tr>
                          <th className="py-3 px-4">Order ID & Date</th>
                          <th className="py-3 px-4">Customer Details</th>
                          <th className="py-3 px-4">Delivery Address</th>
                          <th className="py-3 px-4">Total & Payment</th>
                          <th className="py-3 px-4">Status Workflow</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {filteredOrders.map((order) => (
                          <tr key={order.order_id} className="hover:bg-emerald-50/20 transition-colors">
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-slate-900">#{order.order_id}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">
                                {order.created_at ? new Date(order.created_at).toLocaleDateString() : 'Recent'}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-slate-900">{order.full_name}</div>
                              <div className="text-[11px] text-emerald-800 flex items-center gap-1 mt-0.5 font-medium">
                                <Phone className="w-3 h-3" />
                                <span>{order.phone}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-4 text-slate-600 max-w-xs">
                              <div className="truncate font-medium">{order.address}</div>
                              <div className="text-[11px] text-slate-400 font-semibold">{order.city}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-extrabold text-slate-900">Rs. {Math.round(parseFloat(order.total_usd || 0) * 278).toLocaleString()}</div>
                              <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {order.payment_method?.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                                className={`text-[11px] font-black uppercase px-2.5 py-1 rounded-xl border border-slate-200 cursor-pointer focus:outline-none ${
                                  order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  order.status === 'Shipped' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                                  order.status === 'Processing' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                  order.status === 'Cancelled' ? 'bg-rose-50 text-rose-800 border-rose-300' :
                                  'bg-amber-50 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right space-x-2">
                              <button
                                onClick={() => {
                                  setEditingItem(order);
                                  setModalType('order_view');
                                }}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors cursor-pointer"
                                title="View Order Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm({ type: 'order', item: order, title: `#${order.order_id}` })}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-800 text-slate-700 transition-colors cursor-pointer"
                                title="Delete Order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* TAB 4: REVIEWS MANAGEMENT */}
          {activeTab === 'reviews' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Customer Reviews ({reviews.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Customer feedback and testimonials displayed on the homepage.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('review');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Review</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                            {rev.avatar || rev.author?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 text-xs">{rev.author}</div>
                            <div className="text-[10px] text-slate-400">{rev.location || 'Verified Buyer'}</div>
                          </div>
                        </div>

                        {/* Stars */}
                        <div className="flex items-center text-amber-500">
                          {[...Array(rev.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>

                      <div className="font-bold text-xs text-slate-800 mb-1">{rev.title}</div>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                        "{rev.content}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px] text-slate-400">
                      <span className="font-semibold text-emerald-700">{rev.bundle}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalMode('edit');
                            setEditingItem(rev);
                            setModalType('review');
                          }}
                          className="p-1 rounded text-slate-500 hover:text-emerald-700 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'review', item: rev, title: rev.author })}
                          className="p-1 rounded text-slate-500 hover:text-rose-700 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 5: FAQS MANAGEMENT */}
          {activeTab === 'faqs' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Frequently Asked Questions ({faqs.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Manage the accordion FAQ list displayed on the store landing page and FAQ page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('faq');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full inline-block mb-1.5">
                          {faq.category || 'General'}
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                          {faq.question || faq.q}
                        </h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {faq.answer || faq.a}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setModalMode('edit');
                            setEditingItem(faq);
                            setModalType('faq');
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700 transition-colors cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'faq', item: faq, title: faq.question || faq.q })}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-800 text-slate-700 transition-colors cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 6: BLOG ARTICLES MANAGEMENT */}
          {activeTab === 'blogs' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Clinical Journal Articles ({blogs.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Scientific education and clinical study publications.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('blog');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {blogs.map((b) => (
                  <div key={b.id || b.slug} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                          {b.category}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{b.read_time || b.readTime || '5 min read'}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1">{b.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">{b.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                      <span className="text-slate-400 text-[11px]">By {b.author}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalMode('edit');
                            setEditingItem(b);
                            setModalType('blog');
                          }}
                          className="p-1 rounded text-slate-600 hover:text-emerald-800 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'blog', item: b, title: b.title })}
                          className="p-1 rounded text-slate-600 hover:text-rose-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 7: ACTIVE INGREDIENTS */}
          {activeTab === 'ingredients' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Active Clinical Ingredients ({ingredients.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Scientific formulations highlighted in the Science & Ingredients section.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('ingredient');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Ingredient</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {ingredients.map((ing) => (
                  <div key={ing.id} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
                          {ing.badge}
                        </span>
                        <span className="text-xs font-black text-amber-600">{ing.stat}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900">{ing.name}</h4>
                      <div className="text-[11px] text-slate-400 font-semibold mb-1">{ing.origin} • {ing.role}</div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">{ing.description}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setModalMode('edit');
                          setEditingItem(ing);
                          setModalType('ingredient');
                        }}
                        className="p-1.5 rounded text-slate-600 hover:text-emerald-800 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'ingredient', item: ing, title: ing.name })}
                        className="p-1.5 rounded text-slate-600 hover:text-rose-800 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* TAB 8: BEFORE & AFTER TRANSFORMATIONS */}
          {activeTab === 'transformations' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    Before & After Results ({transformations.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Real case studies displayed in the interactive slider on the home page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setModalMode('create');
                    setEditingItem(null);
                    setModalType('transformation');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Case Study</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                {transformations.map((t) => (
                  <div key={t.id} className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900">{t.name}</span>
                        <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                          {t.duration}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mb-1">{t.location} • Concern: {t.concern}</div>
                      <p className="text-xs text-slate-600 italic leading-relaxed mb-3">"{t.review}"</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                      <span>{t.bundle_used || t.bundleUsed}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setModalMode('edit');
                            setEditingItem(t);
                            setModalType('transformation');
                          }}
                          className="p-1.5 rounded text-slate-600 hover:text-emerald-800 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'transformation', item: t, title: t.name })}
                          className="p-1.5 rounded text-slate-600 hover:text-rose-800 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>


      {/* ======================================================== */}
      {/* MODALS SECTION */}
      {/* ======================================================== */}

      {/* 1. PRODUCT BUNDLE CREATE/EDIT MODAL */}
      {modalType === 'product' && (
        <ProductModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSaveProduct}
          initialData={editingItem}
          mode={modalMode}
        />
      )}

      {/* 2. FAQ CREATE/EDIT MODAL */}
      {modalType === 'faq' && (
        <FaqModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSaveFaq}
          initialData={editingItem}
          mode={modalMode}
        />
      )}

      {/* 3. REVIEW CREATE/EDIT MODAL */}
      {modalType === 'review' && (
        <ReviewModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSaveReview}
          initialData={editingItem}
          mode={modalMode}
        />
      )}

      {/* 4. BLOG CREATE/EDIT MODAL */}
      {modalType === 'blog' && (
        <BlogModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSaveBlog}
          initialData={editingItem}
          mode={modalMode}
        />
      )}

      {/* 5. INGREDIENT CREATE/EDIT MODAL */}
      {modalType === 'ingredient' && (
        <IngredientModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSaveIngredient}
          initialData={editingItem}
          mode={modalMode}
        />
      )}

      {/* 6. TRANSFORMATION CREATE/EDIT MODAL */}
      {modalType === 'transformation' && (
        <TransformationModal
          isOpen={true}
          onClose={() => setModalType(null)}
          onSave={handleSaveTransformation}
          initialData={editingItem}
          mode={modalMode}
        />
      )}

      {/* 7. ORDER VIEW MODAL */}
      {modalType === 'order_view' && editingItem && (
        <OrderViewModal
          isOpen={true}
          onClose={() => setModalType(null)}
          order={editingItem}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* 8. DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Are you sure?</h3>
              <p className="text-xs text-slate-500 mt-1">
                This will delete "{deleteConfirm.title}" from the database. This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'product') handleDeleteProduct(deleteConfirm.item);
                  if (deleteConfirm.type === 'order') handleDeleteOrder(deleteConfirm.item);
                  if (deleteConfirm.type === 'review') handleDeleteReview(deleteConfirm.item);
                  if (deleteConfirm.type === 'faq') handleDeleteFaq(deleteConfirm.item);
                  if (deleteConfirm.type === 'blog') handleDeleteBlog(deleteConfirm.item);
                  if (deleteConfirm.type === 'ingredient') handleDeleteIngredient(deleteConfirm.item);
                  if (deleteConfirm.type === 'transformation') handleDeleteTransformation(deleteConfirm.item);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


// =========================================================================
// MODAL SUB-COMPONENTS
// =========================================================================

function ProductModal({ isOpen, onClose, onSave, initialData, mode }) {
  const [name, setName] = useState(initialData?.name || '');
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || '');
  const [tag, setTag] = useState(initialData?.tag || '');
  const [bottlesCount, setBottlesCount] = useState(initialData?.bottles_count || initialData?.bottlesCount || 1);
  const [supplyDays, setSupplyDays] = useState(initialData?.supply_days || initialData?.supplyDays || '30 Days Supply');
  const [priceUSD, setPriceUSD] = useState(initialData?.price_usd || initialData?.priceUSD || 49.00);
  const [originalPriceUSD, setOriginalPriceUSD] = useState(initialData?.original_price_usd || initialData?.originalPriceUSD || 70.00);
  const [discountPercent, setDiscountPercent] = useState(initialData?.discount_percent || initialData?.discountPercent || 30);
  const [inStock, setInStock] = useState(initialData?.in_stock !== undefined ? initialData.in_stock : (initialData?.inStock !== undefined ? initialData.inStock : true));
  const [popular, setPopular] = useState(initialData?.popular || false);
  const [bestValue, setBestValue] = useState(initialData?.best_value || initialData?.bestValue || false);
  const [image, setImage] = useState(initialData?.image || '/assets/bundle-set.jpg');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      subtitle,
      tag,
      bottles_count: Number(bottlesCount),
      supply_days: supplyDays,
      price_usd: Number(priceUSD),
      original_price_usd: Number(originalPriceUSD),
      discount_percent: Number(discountPercent),
      in_stock: Boolean(inStock),
      popular: Boolean(popular),
      best_value: Boolean(bestValue),
      image
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {mode === 'create' ? 'Add New Bundle' : 'Edit Bundle'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bundle Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="e.g. FOLLILUXE™ 1-Month Starter Pack"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Subtitle / Bundle Contents</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="e.g. 1x Advanced Peptide & Botanical Hair Serum (50ml)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Price (USD) *</label>
              <input
                type="number"
                step="0.01"
                required
                value={priceUSD}
                onChange={(e) => setPriceUSD(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Original Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={originalPriceUSD}
                onChange={(e) => setOriginalPriceUSD(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Discount %</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bottles</label>
              <input
                type="number"
                value={bottlesCount}
                onChange={(e) => setBottlesCount(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Supply Period</label>
              <input
                type="text"
                value={supplyDays}
                onChange={(e) => setSupplyDays(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="60 Days Supply"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tag / Promo Badge</label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="e.g. MOST POPULAR"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="/assets/bundle-set.jpg"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="rounded text-emerald-600"
              />
              <span>In Stock</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="rounded text-emerald-600"
              />
              <span>Popular</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={bestValue}
                onChange={(e) => setBestValue(e.target.checked)}
                className="rounded text-emerald-600"
              />
              <span>Best Value</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md cursor-pointer"
            >
              {mode === 'create' ? 'Create Bundle' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function FaqModal({ isOpen, onClose, onSave, initialData, mode }) {
  const [category, setCategory] = useState(initialData?.category || 'Results & Timeline');
  const [question, setQuestion] = useState(initialData?.question || initialData?.q || '');
  const [answer, setAnswer] = useState(initialData?.answer || initialData?.a || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ category, question, answer });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {mode === 'create' ? 'Add FAQ' : 'Edit FAQ'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <input
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="e.g. Results & Timeline, Application & Routine"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Question *</label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="e.g. How long before I see noticeable results?"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Answer *</label>
            <textarea
              rows={4}
              required
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="Provide clear, clinical explanation..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md cursor-pointer"
            >
              {mode === 'create' ? 'Create FAQ' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function ReviewModal({ isOpen, onClose, onSave, initialData, mode }) {
  const [author, setAuthor] = useState(initialData?.author || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [bundle, setBundle] = useState(initialData?.bundle || '3-Month Clinical Regrowth Kit');
  const [rating, setRating] = useState(initialData?.rating || 5);
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      author,
      location,
      bundle,
      rating: Number(rating),
      title,
      content,
      verified: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {mode === 'create' ? 'Add Verified Review' : 'Edit Review'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Author Name *</label>
              <input
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="Dr. Ayesha Malik"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="Islamabad / Lahore"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Bundle Purchased</label>
              <input
                type="text"
                value={bundle}
                onChange={(e) => setBundle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Rating (1 to 5)</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              >
                <option value={5}>5 Stars ★★★★★</option>
                <option value={4}>4 Stars ★★★★☆</option>
                <option value={3}>3 Stars ★★★☆☆</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Review Headline *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="Remarkable formulation with zero irritation"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Review Content *</label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="Customer feedback details..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md cursor-pointer"
            >
              {mode === 'create' ? 'Save Review' : 'Update Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function BlogModal({ isOpen, onClose, onSave, initialData, mode }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'Clinical Science');
  const [author, setAuthor] = useState(initialData?.author || 'Dr. Tariq Niazi');
  const [readTime, setReadTime] = useState(initialData?.read_time || initialData?.readTime || '6 min read');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [image, setImage] = useState(initialData?.image || '/assets/bundle-set.jpg');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      title,
      category,
      author,
      read_time: readTime,
      excerpt,
      image,
      date: initialData?.date || 'October 2026'
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {mode === 'create' ? 'Publish Article' : 'Edit Article'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Article Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="e.g. Redensyl® vs Minoxidil: What Clinical Studies Show"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Author Name</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Excerpt / Summary *</label>
            <textarea
              rows={3}
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="Summary of article..."
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md cursor-pointer"
            >
              Save Article
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function IngredientModal({ isOpen, onClose, onSave, initialData, mode }) {
  const [name, setName] = useState(initialData?.name || '');
  const [badge, setBadge] = useState(initialData?.badge || 'Patented Active');
  const [origin, setOrigin] = useState(initialData?.origin || 'Swiss Biotechnology');
  const [role, setRole] = useState(initialData?.role || 'Follicle Reactivator');
  const [stat, setStat] = useState(initialData?.stat || '+214% Growth');
  const [description, setDescription] = useState(initialData?.description || '');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, badge, origin, role, stat, description });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {mode === 'create' ? 'Add Active Ingredient' : 'Edit Ingredient'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Ingredient Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              placeholder="e.g. Redensyl® (3%)"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Badge</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Stat Highlight</label>
              <input
                type="text"
                value={stat}
                onChange={(e) => setStat(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Origin</label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinical Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description *</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md cursor-pointer"
            >
              Save Ingredient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function TransformationModal({ isOpen, onClose, onSave, initialData, mode }) {
  const [name, setName] = useState(initialData?.name || '');
  const [location, setLocation] = useState(initialData?.location || 'Lahore, Pakistan');
  const [duration, setDuration] = useState(initialData?.duration || '90 Days Result');
  const [concern, setConcern] = useState(initialData?.concern || 'Crown Thinning');
  const [review, setReview] = useState(initialData?.review || '');
  const [bundleUsed, setBundleUsed] = useState(initialData?.bundle_used || initialData?.bundleUsed || '3-Month Clinical Regrowth Kit');
  const [beforeImage, setBeforeImage] = useState(initialData?.before_image || initialData?.beforeImage || '/assets/crown-before.jpg');
  const [afterImage, setAfterImage] = useState(initialData?.after_image || initialData?.afterImage || '/assets/crown-after.jpg');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      location,
      duration,
      concern,
      review,
      bundle_used: bundleUsed,
      before_image: beforeImage,
      after_image: afterImage,
      rating: 5
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-extrabold text-slate-900 text-sm">
            {mode === 'create' ? 'Add Transformation Case' : 'Edit Transformation'}
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Patient Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="Hamza A. (32 yrs)"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
                placeholder="90 Days Result"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Hair Concern</label>
              <input
                type="text"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Patient Review Quote *</label>
            <textarea
              rows={3}
              required
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Before Image URL</label>
              <input
                type="text"
                value={beforeImage}
                onChange={(e) => setBeforeImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">After Image URL</label>
              <input
                type="text"
                value={afterImage}
                onChange={(e) => setAfterImage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold shadow-md cursor-pointer"
            >
              Save Transformation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


function OrderViewModal({ isOpen, onClose, order, onStatusChange }) {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-black text-slate-900 text-sm">Order #{order.order_id}</h3>
            <p className="text-[11px] text-slate-400">Placed on {order.created_at ? new Date(order.created_at).toLocaleString() : 'Recent'}</p>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="font-extrabold text-slate-900 mb-1">Customer Information</div>
            <div className="text-slate-700 font-medium">{order.full_name}</div>
            <div className="text-slate-500">{order.phone} • {order.email || 'No email provided'}</div>
            <div className="mt-2 text-slate-700">
              <span className="font-bold">Shipping Address: </span>
              {order.address}, {order.city} {order.postal_code}
            </div>
            {order.notes && (
              <div className="mt-2 text-amber-800 bg-amber-50 p-2 rounded-lg font-medium">
                Note: {order.notes}
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
            <div className="font-extrabold text-slate-900 mb-2">Order Items ({order.items?.length || 1})</div>
            {order.items && order.items.length > 0 ? (
              <div className="space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-none">
                    <span className="font-medium text-slate-800">{item.product_name} (x{item.quantity})</span>
                    <span className="font-bold text-slate-900">Rs. {Math.round(parseFloat(item.price_usd || 0) * 278).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-500">1x Selected Bundle</div>
            )}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-slate-200 font-black text-sm text-slate-900">
              <span>Total Amount</span>
              <span className="text-emerald-800">Rs. {Math.round(parseFloat(order.total_usd || 0) * 278).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="font-bold text-slate-700">Current Status:</span>
            <select
              value={order.status}
              onChange={(e) => onStatusChange(order.order_id, e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 font-bold bg-white cursor-pointer"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
