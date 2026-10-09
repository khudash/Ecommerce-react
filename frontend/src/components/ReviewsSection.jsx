import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquarePlus, 
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Clock,
  Play,
  Pause
} from 'lucide-react';
import { REVIEWS } from '../data/storeData';
import { submitReview, fetchReviews } from '../services/api';

export default function ReviewsSection({ reviews = null }) {
  const [reviewsList, setReviewsList] = useState(reviews && reviews.length > 0 ? reviews : REVIEWS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Sync with prop if it updates
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setReviewsList(reviews);
    }
  }, [reviews]);


  // Swiper State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [touchStartX, setTouchStartX] = useState(null);
  const progressKey = useRef(0);

  // New review form state
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newBundle, setNewBundle] = useState('3-Month Clinical Regrowth Kit');

  // Handle Responsive Items Per Page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredReviews = reviewsList.filter((r) => {
    if (activeFilter === '5STAR') return r.rating === 5;
    if (activeFilter === '3MONTH') return r.bundle.includes('3-Month');
    return true;
  });

  const maxIndex = Math.max(0, filteredReviews.length - itemsPerPage);

  // 3-Second Automatic Swiper Interval
  useEffect(() => {
    if (isPaused || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      progressKey.current += 1;
    }, 3000);

    return () => clearInterval(timer);
  }, [maxIndex, isPaused, currentIndex]);

  // Clamp current index if filtered list changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentIndex(0);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      setTouchStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null || !e.changedTouches || !e.changedTouches[0]) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newAuthor || !newContent) return;

    setIsSubmitting(true);
    const reviewPayload = {
      author: newAuthor,
      role: 'Verified Customer',
      location: newLocation || 'Pakistan',
      rating: newRating,
      date: 'Just now',
      title: newTitle || 'Amazing hair growth results!',
      content: newContent,
      verified: true,
      helpful: 1,
      bundle: newBundle,
      avatar: newAuthor.substring(0, 2).toUpperCase()
    };

    try {
      const savedReview = await submitReview(reviewPayload);
      setReviewsList((prev) => [savedReview, ...prev]);
    } catch (err) {
      console.warn('API submit failed, adding locally:', err);
      setReviewsList((prev) => [{ ...reviewPayload, id: Date.now() }, ...prev]);
    } finally {
      setIsSubmitting(false);
      setIsWriteModalOpen(false);
      setCurrentIndex(0);
      setNewAuthor('');
      setNewLocation('');
      setNewTitle('');
      setNewContent('');
    }
  };

  const handleHelpful = (id) => {
    setReviewsList(reviewsList.map(r => r.id === id ? { ...r, helpful: r.helpful + 1 } : r));
  };

  return (
    <section id="reviews" className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Verified Customer Community</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight">
            Over <span className="emerald-gradient-text">4,850+ Real Results</span>
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-normal max-w-xl mx-auto">
            Read authentic reviews from doctors, dermatologists, and everyday users who restored their hair with FOLLILUXE™.
          </p>
        </div>

        {/* Overall Rating Summary Card */}
        <div className="p-5 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-amber-50 border border-emerald-200 mb-8 sm:mb-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-left">
          
          {/* Big Score */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 text-center sm:text-left">
            <div>
              <div className="text-4xl sm:text-6xl font-extrabold text-slate-900 font-serif">
                4.95
              </div>
              <div className="flex text-amber-500 my-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] sm:text-xs text-slate-500">4,850+ Verified Ratings</span>
            </div>

            {/* Score Bar Breakdown */}
            <div className="hidden sm:block space-y-1.5 w-48 text-[11px] text-slate-600 font-medium">
              <div className="flex items-center gap-2">
                <span>5★</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[94%]" />
                </div>
                <span>94%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>4★</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[5%]" />
                </div>
                <span>5%</span>
              </div>
              <div className="flex items-center gap-2">
                <span>3★</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 w-[1%]" />
                </div>
                <span>1%</span>
              </div>
            </div>
          </div>

          {/* Write Review Action */}
          <button
            onClick={() => setIsWriteModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition-all hover:scale-105 shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Verified Review</span>
          </button>
        </div>

        {/* Filter Pills & Swiper Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 sm:mb-8">
          
          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2">
            <button
              onClick={() => handleFilterChange('ALL')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'ALL'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Reviews ({reviewsList.length})
            </button>
            <button
              onClick={() => handleFilterChange('5STAR')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeFilter === '5STAR'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              5-Star Reviews Only
            </button>
            <button
              onClick={() => handleFilterChange('3MONTH')}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold transition-all cursor-pointer ${
                activeFilter === '3MONTH'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              3-Month Kit Results
            </button>
          </div>

          {/* 3-Second Auto Swiper Status & Navigation Buttons */}
          <div className="flex items-center gap-3">
            
            {/* Auto-play badge & Pause Toggle */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? "Resume 3s Auto-Swiper" : "Pause 3s Auto-Swiper"}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold border transition-colors cursor-pointer ${
                isPaused 
                  ? 'bg-amber-50 text-amber-800 border-amber-300' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}
            >
              {isPaused ? (
                <>
                  <Play className="w-3 h-3 text-amber-600 fill-amber-500" />
                  <span>Paused</span>
                </>
              ) : (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Auto-Sliding (3s)</span>
                  <Pause className="w-2.5 h-2.5 text-emerald-600 opacity-60 ml-0.5" />
                </>
              )}
            </button>

            {/* Left / Right Arrow Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Review"
                className="w-9 h-9 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Review"
                className="w-9 h-9 rounded-full bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-500 text-slate-700 hover:text-emerald-700 flex items-center justify-center shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* 3-Second Swiper Track Container */}
        <div 
          className="relative overflow-hidden rounded-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous Slide Track */}
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`
            }}
          >
            {filteredReviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-2 sm:p-2.5 shrink-0 flex flex-col"
                style={{
                  width: `${100 / itemsPerPage}%`
                }}
              >
                <div className="h-full p-5 sm:p-6 rounded-3xl bg-[#fbfdfc] border border-slate-200 hover:border-emerald-400 shadow-md hover:shadow-xl flex flex-col justify-between transition-all duration-300 text-left select-none">
                  <div className="space-y-3">
                    {/* Author Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center border border-emerald-200 shrink-0">
                          {rev.avatar}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-slate-900 truncate">{rev.author}</span>
                            {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                          </div>
                          <span className="text-[11px] text-slate-500 block truncate">{rev.location} • {rev.role}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0">{rev.date}</span>
                    </div>

                    {/* Stars & Title */}
                    <div>
                      <div className="flex text-amber-400 mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {rev.title}
                      </h4>
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                      "{rev.content}"
                    </p>
                  </div>

                  {/* Card Footer with Protocol Tag & Helpful count */}
                  <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-800 font-bold truncate max-w-[150px] sm:max-w-[170px]">
                      {rev.bundle}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHelpful(rev.id);
                      }}
                      className="flex items-center gap-1 text-slate-500 hover:text-emerald-700 transition-colors font-semibold cursor-pointer shrink-0"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({rev.helpful})</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Swiper Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 pt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? 'w-7 bg-emerald-600 shadow-sm' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* Write Review Modal */}
        {isWriteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-left max-h-[90vh] flex flex-col">
              
              <div className="p-4 sm:p-5 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between shrink-0">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                  <span>Submit Your Experience</span>
                </h3>
                <button 
                  onClick={() => setIsWriteModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-emerald-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="p-4 sm:p-6 space-y-3.5 overflow-y-auto flex-1">
                
                {/* Rating selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Rating
                  </label>
                  <div className="flex gap-1.5 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setNewRating(num)}
                        className="p-1 sm:p-1.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${num <= newRating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Fatima Ali"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore, PK"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                {/* Review Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Visible baby hair in 4 weeks!"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                  />
                </div>

                {/* Review Content */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Share how FOLLILUXE helped your hair density, shedding, or hairline..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:border-emerald-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
                >
                  {isSubmitting ? 'Saving to Database...' : 'Publish Verified Review'}
                </button>
              </form>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
