import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Clock, Search } from 'lucide-react';
import { PopularArticles } from './PopularArticles';

export const BlogList = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onArticleClick,
  posts,
  onLoadMore,
  isLoadingMore
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  onArticleClick: (article: any) => void;
  posts: any[];
  onLoadMore: () => void;
  isLoadingMore: boolean;
}) => {
  const categories = ['All', 'Strategy', 'Learning', 'Wellness', 'Updates'];

  // Filter posts based on active category and search query
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const cleanQuery = searchQuery.trim().toLowerCase();
    const matchesSearch = !cleanQuery || 
      post.title.toLowerCase().includes(cleanQuery) ||
      post.excerpt.toLowerCase().includes(cleanQuery) ||
      post.category.toLowerCase().includes(cleanQuery) ||
      post.author.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog-list-section" className="py-24 bg-white scroll-mt-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
           <div>
              <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">
                Latest <span className="text-secondary">Articles.</span>
              </h2>
              <div className="h-1 w-20 bg-secondary mt-2" />
           </div>
           <div className="flex flex-wrap gap-2 md:gap-4">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                    selectedCategory === cat 
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/10' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-secondary hover:text-secondary cursor-pointer'
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 min-h-[400px] relative">
              <AnimatePresence mode="popLayout">
                {filteredPosts.length === 0 ? (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center p-12 md:p-20 bg-slate-50/50 border border-dashed border-slate-200 rounded-[3rem] shadow-sm"
                  >
                    <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-450 mb-6 shadow-sm">
                      <Search size={26} className="text-slate-400" />
                    </div>
                    <h4 className="text-2xl font-black text-primary mb-2 tracking-tight uppercase italic-small">No Articles Found</h4>
                    <p className="text-slate-500 text-sm font-semibold max-w-md mb-8 leading-relaxed italic-small">
                      We couldn't find any articles matching "{searchQuery}" in category "{selectedCategory}". Try adjusting your keywords or clearing the filter.
                    </p>
                    <button 
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                      }}
                      className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest text-xs rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
                    >
                      Clear Search & Filters
                    </button>
                  </motion.div>
                ) : (
                  filteredPosts.map((post, i) => (
                    <motion.article
                      layout
                      key={post.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20, scale: 0.98 }}
                      transition={{ 
                        opacity: { duration: 0.3 },
                        y: { duration: 0.4 },
                        layout: { duration: 0.4, type: "spring", stiffness: 180, damping: 24 }
                      }}
                      className="group cursor-pointer flex flex-col justify-between"
                      onClick={() => onArticleClick(post)}
                    >
                      <div>
                        <div className="relative aspect-[16/10] rounded-[3rem] overflow-hidden mb-8 shadow-md">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                          />
                          <div className="absolute top-6 left-6">
                            <span className="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-primary uppercase tracking-widest">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-6 mb-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                          <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                          <span className="flex items-center gap-2"><Clock size={12} /> {post.readTime}</span>
                        </div>
                        
                        <h3 className="text-2xl font-black text-primary mb-4 tracking-tight group-hover:text-secondary transition-colors leading-tight italic-small">
                          {post.title}
                        </h3>
                        
                        <p className="text-slate-500 text-sm font-medium mb-8 leading-relaxed italic-small line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary font-black text-[10px]">
                            {post.author[0]}
                          </div>
                          <span className="text-xs font-black text-primary italic">{post.author}</span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-lg group-hover:bg-secondary group-hover:text-primary transition-all">
                          Detail <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </motion.article>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-1">
             <PopularArticles onArticleClick={onArticleClick} />
          </div>
        </div>

        {filteredPosts.length > 0 && (
          <div className="mt-20 text-center">
             <button 
               onClick={onLoadMore}
               disabled={isLoadingMore}
               className="px-10 py-5 bg-white border border-slate-100 text-primary font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all shadow-xl cursor-pointer disabled:opacity-50 min-w-[240px] flex items-center justify-center mx-auto"
             >
                {isLoadingMore ? "CONNECTING..." : "Load More Articles"}
             </button>
          </div>
        )}
      </div>
    </section>
  );
};
