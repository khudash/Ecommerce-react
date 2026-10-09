import React from 'react';
import { 
  BookOpen, 
  Sparkles, 
  ArrowRight, 
  Clock
} from 'lucide-react';
import { BLOG_ARTICLES } from '../data/blogData';

export default function BlogSection({ onOpenArticle, blogs = null }) {
  const articlesList = (blogs && blogs.length > 0) ? blogs : BLOG_ARTICLES;

  return (
    <section id="journal" className="py-12 sm:py-16 md:py-20 bg-[#f4f8f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span>The Clinical Journal</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Trichology & <span className="emerald-gradient-text">Hair Growth Science</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xl mx-auto">
            Evidence-based clinical insights, peptide biology, and dermatological routines written by trichology specialists.
          </p>
        </div>

        {/* Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {articlesList.map((article) => (
            <article
              key={article.id}
              onClick={() => onOpenArticle(article.id)}
              className="rounded-3xl bg-white border border-slate-200 hover:border-emerald-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group cursor-pointer text-left"
            >
              <div>
                {/* Article Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold text-emerald-800 shadow-xs border border-emerald-100">
                    {article.category}
                  </div>
                  <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold text-emerald-200 flex items-center gap-1 shadow-xs">
                    <Clock className="w-3 h-3 text-amber-400" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3">
                  <div className="text-[10px] sm:text-[11px] text-slate-400 font-semibold">
                    Published {article.date}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug group-hover:text-emerald-700 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer & Read Article Button */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-3 sm:mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center border border-emerald-200 shrink-0">
                    {article.authorAvatar}
                  </div>
                  <div className="text-left min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate max-w-[120px]">
                      {article.author}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[120px]">
                      {article.authorRole.split('&')[0]}
                    </span>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenArticle(article.id);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-700 group-hover:text-emerald-800 group-hover:translate-x-0.5 transition-all cursor-pointer shrink-0"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
