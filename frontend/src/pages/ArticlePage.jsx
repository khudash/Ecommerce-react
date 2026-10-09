import React from 'react';
import { 
  ArrowLeft, 
  Clock, 
  UserCheck, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  Share2, 
  Bookmark, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogData';
import { PRODUCTS, CURRENCIES } from '../data/storeData';

export default function ArticlePage({ 
  articleId, 
  onBack, 
  onSelectArticle, 
  onAddToCart, 
  currency,
  articles = null
}) {
  const articlesList = (articles && articles.length > 0) ? articles : BLOG_ARTICLES;
  const article = articlesList.find(a => a.id === articleId || a.slug === articleId) || articlesList[0];
  const recommendedProduct = PRODUCTS.find(p => p.id === article.recommendedBundleId || p.id === article.recommended_bundle_id) || PRODUCTS[2];
  const relatedArticles = articlesList.filter(a => a.id !== article.id && a.slug !== article.slug);


  const formatPrice = (usd) => {
    const curr = CURRENCIES[currency];
    const amount = (usd * curr.rate).toFixed(curr.rate > 10 ? 0 : 2);
    return `${curr.symbol}${amount}`;
  };

  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900 pb-20 text-left">
      
      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-white border-b border-slate-200/80 relative z-20 py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home / Journal</span>
          </button>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline font-medium">Category: <strong className="text-slate-700">{article.category}</strong></span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <header className="py-10 sm:py-14 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
              {article.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-500 font-medium">
              Published {article.date}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            {article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center border-2 border-white shadow-md">
                {article.authorAvatar}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900">{article.author}</span>
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span className="text-xs text-slate-500 block">{article.authorRole}</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* Main Article Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-10">
        
        {/* Featured Main Image */}
        <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl aspect-[16/10]">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className="p-6 sm:p-7 rounded-3xl bg-[#f0f7f3] border-2 border-emerald-300 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-900">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Executive Clinical Summary</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Structured Article Paragraphs */}
        <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
          {article.content.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 pt-3">
                {sec.heading}
              </h2>
              <p className="whitespace-pre-line text-slate-600 leading-relaxed">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

        {/* Medical Review Disclaimer */}
        <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-500 space-y-1">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Medically Reviewed & Fact-Checked</span>
          </div>
          <p>
            This article references peer-reviewed biochemical trials on Swiss Redensyl® (Givaudan Active Beauty), AnaGain™ (Mibelle Biochemistry), and Procapil® (Sederma).
          </p>
        </div>

        {/* Embedded Recommended Protocol Product Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border-2 border-emerald-300 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img 
              src={recommendedProduct.image} 
              alt={recommendedProduct.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 shrink-0"
            />
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Featured Clinical Protocol
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif mt-1">
                {recommendedProduct.name}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {recommendedProduct.subtitle}
              </p>
              <div className="text-sm font-extrabold text-amber-700 mt-1">
                {formatPrice(recommendedProduct.priceUSD)} (Save {recommendedProduct.discountPercent}%)
              </div>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(recommendedProduct)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-transform hover:scale-105 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add Recommended Protocol</span>
          </button>
        </div>

        {/* More Articles Section */}
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 font-serif">
            More From The Clinical Journal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  onSelectArticle(rel.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                  <span className="text-emerald-700 font-bold">{rel.category}</span>
                  <span>{rel.readTime}</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                  {rel.title}
                </h5>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {rel.excerpt}
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 pt-1 group-hover:translate-x-1 transition-transform">
                  Read Article →
                </span>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  );
}
