import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClinicalBanner from './components/ClinicalBanner';
import ProductBundles from './components/ProductBundles';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import ScienceIngredients from './components/ScienceIngredients';
import BlogSection from './components/BlogSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HairQuizModal from './components/HairQuizModal';
import CheckoutModal from './components/CheckoutModal';
import CheckoutPage from './pages/CheckoutPage';
import SearchModal from './components/SearchModal';
import PolicyModal from './components/PolicyModal';
import LiveToast from './components/LiveToast';
import MobileStickyBar from './components/MobileStickyBar';

// Dedicated Pages
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CollectionsPage from './pages/CollectionsPage';
import ShopPage from './pages/ShopPage';
import ArticlePage from './pages/ArticlePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import RefundPage from './pages/RefundPage';
import BlogsPage from './pages/BlogsPage';
import FaqPage from './pages/FaqPage';
import DashboardPage from './pages/DashboardPage';

import { PRODUCTS } from './data/storeData';
import { fetchHomePageData } from './services/api';

function getInitialPage() {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  if (path.includes('dashboard') || hash.includes('dashboard')) return 'dashboard';
  if (path.includes('shop') || hash.includes('shop')) return 'shop';
  if (path.includes('about') || hash.includes('about')) return 'about';
  if (path.includes('contact') || hash.includes('contact')) return 'contact';
  if (path.includes('blogs') || hash.includes('blogs')) return 'blogs';
  if (path.includes('faq') || hash.includes('faq')) return 'faq';
  if (path.includes('collections') || hash.includes('collections')) return 'collections';
  if (path.includes('terms') || hash.includes('terms')) return 'terms';
  if (path.includes('privacy') || hash.includes('privacy')) return 'privacy';
  if (path.includes('refund') || hash.includes('refund')) return 'refund';
  return 'home';
}

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [selectedArticleId, setSelectedArticleId] = useState('redensyl-vs-minoxidil');
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);

  // Dynamic Backend Data State
  const [homeData, setHomeData] = useState(null);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  const refreshHomeData = async () => {
    const data = await fetchHomePageData();
    if (data) {
      setHomeData(data);
      setIsBackendConnected(true);
    }
  };

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      const data = await fetchHomePageData();
      if (data && isMounted) {
        setHomeData(data);
        setIsBackendConnected(true);
      }
    }
    loadData();

    // Listen for browser navigation (back/forward and URL changes like /dashboard)
    const handleUrlChange = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('dashboard') || hash.includes('dashboard')) {
        setCurrentPage('dashboard');
      } else if (path === '/' || path === '' || hash === '#home') {
        setCurrentPage('home');
      } else {
        const clean = path.replace(/^\//, '');
        if (clean) setCurrentPage(clean);
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    return () => {
      isMounted = false;
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);


  // Policy Modal State (kept for optional quick previews)
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [activePolicyType, setActivePolicyType] = useState('terms');

  // Global Store State
  const [currency, setCurrency] = useState('PKR');
  const [cart, setCart] = useState([
    {
      ...PRODUCTS[2],
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [cartNotification, setCartNotification] = useState(null);

  // Cart Handlers
  const handleAddToCart = (product, qty = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prevCart, { ...product, quantity: qty }];
    });

    setCartNotification({
      title: 'Added to Bag!',
      subtitle: `${product.name} (x${qty})`
    });
    setTimeout(() => {
      setCartNotification(null);
    }, 3500);

    setIsCartOpen(true);
  };

  const handleBuyNow = (product) => {
    setCart([{ ...product, quantity: 1 }]);
    setIsCheckoutPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutPage(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigateToShop = () => {
    setCurrentPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenArticle = (articleId) => {
    setSelectedArticleId(articleId);
    handlePageChange('article');
  };

  const handleOpenPolicy = (type) => {
    handlePageChange(type);
  };

  // Full-Screen Dedicated Custom Executive Dashboard
  if (currentPage === 'dashboard') {
    return (
      <DashboardPage
        onBackToStore={() => handlePageChange('home')}
        onDataUpdated={refreshHomeData}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] text-slate-900 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-900 pb-16 md:pb-0 overflow-x-hidden">
      
      {/* Sticky Luxury Header */}
      <Navbar
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        currency={currency}
        setCurrency={setCurrency}
        openSearch={() => setIsSearchOpen(true)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full overflow-x-hidden">
        {/* Dedicated Article Reader Page */}
        {currentPage === 'article' && (
          <ArticlePage
            articleId={selectedArticleId}
            onBack={() => handlePageChange('blogs')}
            onSelectArticle={handleOpenArticle}
            onAddToCart={handleAddToCart}
            currency={currency}
            articles={homeData?.blogs}
          />
        )}

        {/* Dedicated Blogs / Clinical Journal Hub Page */}
        {currentPage === 'blogs' && (
          <BlogsPage
            onBack={() => handlePageChange('home')}
            onSelectArticle={handleOpenArticle}
            onNavigateToShop={handleNavigateToShop}
            articles={homeData?.blogs}
          />
        )}

        {/* Dedicated Shop Page */}
        {currentPage === 'shop' && (
          <ShopPage
            currency={currency}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            openQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {/* Dedicated About Us Page */}
        {currentPage === 'about' && (
          <AboutPage 
            onShopClick={handleNavigateToShop}
            openQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {/* Dedicated Contact Page */}
        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {/* Dedicated Collections Page */}
        {currentPage === 'collections' && (
          <CollectionsPage
            currency={currency}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            openQuiz={() => setIsQuizOpen(true)}
          />
        )}

        {/* Dedicated Terms & Conditions Page */}
        {currentPage === 'terms' && (
          <TermsPage
            onBack={() => handlePageChange('home')}
            onNavigateToShop={handleNavigateToShop}
            onNavigateToContact={() => handlePageChange('contact')}
          />
        )}

        {/* Dedicated Privacy Policy Page */}
        {currentPage === 'privacy' && (
          <PrivacyPage
            onBack={() => handlePageChange('home')}
            onNavigateToShop={handleNavigateToShop}
            onNavigateToContact={() => handlePageChange('contact')}
          />
        )}

        {/* Dedicated Refund & Exchange Policy Page */}
        {currentPage === 'refund' && (
          <RefundPage
            onBack={() => handlePageChange('home')}
            onNavigateToShop={handleNavigateToShop}
            onNavigateToContact={() => handlePageChange('contact')}
          />
        )}

        {/* Dedicated FAQs & Help Center Page */}
        {currentPage === 'faq' && (
          <FaqPage
            onBack={() => handlePageChange('home')}
            onNavigateToContact={() => handlePageChange('contact')}
            onNavigateToShop={handleNavigateToShop}
          />
        )}

        {/* Main Home Page Landing */}
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              currency={currency}
              onShopClick={handleNavigateToShop}
            />

            {/* Clinical Statistics & Trust Banner */}
            <ClinicalBanner />

            {/* Product Bundles Selector (Shop Section) */}
            <ProductBundles
              currency={currency}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
              products={homeData?.products}
            />

            {/* Interactive Before/After Comparison Slider */}
            <BeforeAfterSlider
              cases={homeData?.transformations}
            />

            {/* Active Science & Ingredients Deep Dive */}
            <ScienceIngredients
              ingredients={homeData?.ingredients}
            />

            {/* Clinical Journal / Blog Section */}
            <BlogSection
              onOpenArticle={handleOpenArticle}
              blogs={homeData?.blogs}
            />

            {/* Verified Customer Reviews */}
            <ReviewsSection
              reviews={homeData?.reviews}
            />

            {/* Accordion FAQ Section */}
            <FaqSection
              faqs={homeData?.faqs}
            />
          </>
        )}
      </main>

      {/* Luxury Footer with working pages for all buttons */}
      <Footer
        onNavigate={(target) => {
          if (target === 'about') handlePageChange('about');
          else if (target === 'contact') handlePageChange('contact');
          else if (target === 'shop' || target === 'bundles') handleNavigateToShop();
          else if (target === 'home') handlePageChange('home');
          else if (target === 'blogs' || target === 'journal') handlePageChange('blogs');
          else if (target === 'terms') handlePageChange('terms');
          else if (target === 'privacy') handlePageChange('privacy');
          else if (target === 'refund') handlePageChange('refund');
          else if (target === 'faq') handlePageChange('faq');
          else handlePageChange(target);
        }}
      />

      {/* Mobile Sticky Floating Quick Action Bar */}
      <MobileStickyBar
        onShopClick={handleNavigateToShop}
        currency={currency}
      />

      {/* Policy Modal for Terms, Privacy, Refund (backup if triggered) */}
      <PolicyModal
        isOpen={policyModalOpen}
        onClose={() => setPolicyModalOpen(false)}
        policyType={activePolicyType}
      />

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Hair Growth Assessment Quiz Modal */}
      <HairQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* Full-Screen Checkout Page (rendered as overlay) */}
      {isCheckoutPage && (
        <div className="fixed inset-0 z-[60] bg-[#f8faf8] overflow-y-auto">
          <CheckoutPage
            cart={cart}
            currency={currency}
            promoDiscount={promoDiscount}
            onClearCart={handleClearCart}
            onBack={() => {
              setIsCheckoutPage(false);
              setIsCartOpen(true);
            }}
            onContinueShopping={() => {
              setIsCheckoutPage(false);
              handlePageChange('home');
            }}
          />
        </div>
      )}

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => {
          handleAddToCart(product);
          setCurrentPage('shop');
        }}
        onNavigate={(sec) => {
          if (sec === 'terms' || sec === 'privacy' || sec === 'refund' || sec === 'blogs' || sec === 'faq') {
            handlePageChange(sec);
          } else {
            setCurrentPage('home');
            setTimeout(() => {
              const el = document.getElementById(sec);
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }
        }}
      />

      {/* Real-Time Live Order Notifications & Cart Toast */}
      <LiveToast
        cartNotification={cartNotification}
      />

    </div>
  );
}
