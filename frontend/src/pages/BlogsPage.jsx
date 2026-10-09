import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Search, 
  Clock, 
  ArrowRight, 
  UserCheck, 
  CheckCircle2, 
  ArrowLeft,
  Filter
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogData';

export default function BlogsPage({ onBack, onSelectArticle, onNavigateToShop, articles = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const articlesList = (articles && articles.length > 0) ? articles : BLOG_ARTICLES;
  const categories = ['ALL', 'Clinical Science', 'Hair Biology', 'Trichologist Tips'];

  const filteredArticles = articlesList.filter((article) => {
    const matchesCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = articlesList[0];


  return (
    <div className="animate-fadeIn min-h-screen bg-[#f8faf8] text-slate-900 pb-20 text-left">
      
      {/* Top Breadcrumbs & Back Bar */}
      <div className="bg-white border-b border-slate-200/80 relative z-20 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="hidden sm:inline">FOLLILUXE™ Clinical Journal</span>
            <span className="hidden sm:inline">•</span>
            <span className="font-semibold text-emerald-800">Evidence-Based Science</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="py-12 sm:py-16 bg-gradient-to-b from-[#edf6f0] via-[#f7faf8] to-[#f8faf8] border-b border-emerald-100 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>Trichology Insights & Research</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight">
            The Clinical <span className="emerald-gradient-text">Hair Journal</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            Discover peer-reviewed biological research, Swiss peptide mechanics, and expert trichologist advice to understand your hair follicle lifecycle.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-5" />
            <input
              type="text"
              placeholder="Search clinical topics (e.g. Redensyl, DHT, 90-day cycle)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-300 text-slate-900 text-xs placeholder-slate-400 focus:border-emerald-500 outline-none shadow-sm"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat === 'ALL' ? 'All Publications' : cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-12">
        
        {/* Featured Article Spotlight Card (shown when not searching) */}
        {!searchQuery && selectedCategory === 'ALL' && (
          <div 
            onClick={() => onSelectArticle(featuredArticle.id)}
            className="rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 shadow-xl overflow-hidden cursor-pointer group transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100 relative">
              <img 
                src={featuredArticle.image} 
                alt={featuredArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                ★ Editor's Pick
              </div>
            </div>

            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                  <span className="text-emerald-700 font-bold uppercase">{featuredArticle.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{featuredArticle.readTime}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200">
                    {featuredArticle.authorAvatar}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{featuredArticle.author}</span>
                    <span className="text-[10px] text-slate-400 block">{featuredArticle.authorRole.split('&')[0]}</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* All Articles Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : 'Recent Clinical Publications'}
            </h3>
            <span className="text-xs text-slate-500">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No articles matched your query</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching with different keywords such as "Redensyl", "Peptides", or "Scalp".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
                className="mt-2 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => onSelectArticle(article.id)}
                  className="rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer"
                >
                  <div>
                    {/* Article Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-emerald-800 shadow-sm border border-emerald-100">
                        {article.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-200 flex items-center gap-1 shadow-sm">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="text-[11px] text-slate-400 font-semibold">
                        Published {article.date}
                      </div>

                      <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-emerald-700 transition-colors">
                        {article.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center justify-center border border-emerald-200">
                        {article.authorAvatar}
                      </div>
                      <span className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
                        {article.author}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-1 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#06241a] to-[#041a12] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">
              Ready for Clinically Proven Hair Density?
            </span>
            <h4 className="text-2xl font-serif font-bold text-white">
              Try the 90-Day Swiss Bio-Peptide Regimen
            </h4>
            <p className="text-xs sm:text-sm text-emerald-200/80 max-w-xl">
              Restore your hairline and stop chronic shedding backed by our 60-day satisfaction guarantee.
            </p>
          </div>

          <button
            onClick={onNavigateToShop}
            className="px-7 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            Shop Clinical Protocols
          </button>
        </div>

      </main>

    </div>
  );
}
