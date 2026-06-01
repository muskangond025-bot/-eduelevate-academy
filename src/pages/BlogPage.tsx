import React, { useState } from 'react';
import { BlogHero } from '../components/blog/BlogHero';
import { BlogCategories } from '../components/blog/BlogCategories';
import { FeaturedArticles } from '../components/blog/FeaturedArticles';
import { BlogList } from '../components/blog/BlogList';
import { BlogNewsletter } from '../components/blog/BlogNewsletter';
import { motion, AnimatePresence } from 'motion/react';
import { X, Clock, Calendar, User, Sparkles, CheckCircle2 } from 'lucide-react';

const INITIAL_POSTS = [
  {
    title: "How to Balance Board Exams with JEE Preparation",
    excerpt: "The most common struggle for aspirants. We break down the 70/30 rule used by our toppers.",
    author: "Prashant Kumar",
    date: "May 15, 2026",
    readTime: "8 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1434039353568-460b8b539f11?q=80&w=2070&auto=format&fit=crop",
    content: [
      "Securing dual success in both school board examinations and competitive entrance tests like JEE Main/Advanced is a primary bottleneck for Class 12 aspirants. However, top rankers do not view these as two separate struggles. They utilize a unified syllabus system.",
      "The 70/30 execution rule allocates 70% of weekly effort to competitive physics, chemistry, and mathematics (high-level applications, advanced numerical worksheets, and previous year questions), while dedicating 30% to board-specific writing structures, English, and lab practical summaries.",
      "Chemistry is the easiest bridge. Writing detailed descriptions of inorganic reaction mechanisms serves as direct preparation for competitive exams while ensuring high board grades. For physics, deriving standard electromagnetic and optical formulas on paper cements theoretical foundations, which immediately helps in solving complex JEE numericals.",
      "Ensure to spend at least 3 hours every Sunday solving school board papers from past years. This builds writing stamina and guarantees that you do not drop below the mandatory board score thresholds while chasing elite percentile marks in competitive assessments."
    ]
  },
  {
    title: "The Science of Retention: Revision Techniques that Work",
    excerpt: "Active recall vs. Passive reading. Learn why spatial repetition is the secret to inorganic chemistry.",
    author: "Dr. S. Sharma",
    date: "May 12, 2026",
    readTime: "12 min read",
    category: "Learning",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1973&auto=format&fit=crop",
    content: [
      "Many students spend hours rereading textbooks, highlighting sentences, and reviewing summary sheets. Cognitive science indicates that these passive reading methods produce a false illusion of competence, but deliver minimal long-term memory retention.",
      "Active recall and spaced repetition are the two pillars of high-efficiency retention. Active recall forces the brain to retrieve information from memory without looking at any prompts. To practice this, summarize each page of a textbook after closing it, or use structured flashcards.",
      "Spaced repetition schedules reviews at increasing intervals (e.g., after 1 day, 3 days, 7 days, 14 days, and 30 days). This halts the decay curve of the brain's forgetting index. It is particularly effective for inorganic chemistry reactions, coordinate geometry formula sets, and vocabulary lists.",
      "By shifting from passive review cycles to active retrieval frameworks, aspirants can cut overall revision time by 40% while maintaining a 95% retention accuracy across the entire syllabus."
    ]
  },
  {
    title: "Meditation and Mental Fortitude in Competitive Exams",
    excerpt: "Preparing your mind is as important as the syllabus. A guide to 10-minute mindfulness for focus.",
    author: "Vivek Roy",
    date: "May 08, 2026",
    readTime: "6 min read",
    category: "Wellness",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop",
    content: [
      "Competitive exam prep is a marathon, not a sprint. While mastering the physics or mathematics syllabus is crucial, your psychological resilience is what guarantees execution accuracy on the actual test day.",
      "Chronic stress releases cortisol, which impairs the hippocampus (the brain's center for consolidation and memory recall). This leads to brain fog, fatigue, and higher rates of calculation errors. Practicing 10 minutes of daily mindfulness acts as a direct antidote.",
      "We recommend the Box Breathing technique (inhale for 4 seconds, hold for 4 seconds, exhale for 4 seconds, hold for 4 seconds) or a simple breath-anchored meditation. Doing this at the beginning of your study blocks aligns brain waves and clears cognitive clutter.",
      "Toppers allocate 15 minutes of quiet decompression time every evening. Treating mental well-being as a mandatory core preparation discipline keeps you highly motivated and prevents burnout during the crucial pre-exam weeks."
    ]
  },
  {
    title: "Understanding New Patterns in NEET 2026",
    excerpt: "A deep dive into the recent NTA updates and how our curriculum has adapted to these changes.",
    author: "Academic Cell",
    date: "May 05, 2026",
    readTime: "10 min read",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070&auto=format&fit=crop",
    content: [
      "The National Testing Agency (NTA) recently published the conceptual and structural guidelines for the NEET 2026 session. While the primary syllabus remains tied to the core NCERT text blocks, the presentation format is undergoing subtle shifts.",
      "Particularly, the Biology section features a significant increase in conceptual integration. Rather than direct memory-based questions, there is a higher frequency of multi-statement check filters, assertion-reason logic puzzles, and structural matching tables.",
      "Physics and Chemistry also show a transition towards conceptual derivation questions rather than simple single-formula substitutions. This is designed to test structural reasoning and eliminate guess-work.",
      "To safeguard our students, the EduElevate curriculum has been fully optimized. The weekly test worksheets now incorporate 40% analytical format vectors. This ensures students build natural cognitive speeds and handle updated exam sheets with perfect precision."
    ]
  }
];

const MOCK_EXTRA_POSTS = [
  {
    title: "Inorganic Chemistry: The Memory Palace Strategy",
    excerpt: "Consolidate periodic properties and salt analysis trends using spatial memory maps.",
    author: "Dr. V. Verma",
    date: "May 01, 2026",
    readTime: "9 min read",
    category: "Learning",
    image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=2070",
    content: [
      "Inorganic Chemistry is often feared for its vast volume of reactions, exceptions, and compound colors. However, top scorers do not rely on brute memorization. They convert abstract concepts into spatial layouts called a Memory Palace.",
      "A Memory Palace is a mental visualization of a familiar physical space—such as your home. You assign inorganic compounds, reaction paths, and periodic trends to specific rooms or objects. For instance, the transition metal complexes can be visualised as colored glassware sitting on your kitchen table.",
      "Salt Analysis is perfect for this strategy. Group cations can be visualized in sequence as you walk through your front door, with their corresponding precipitating colors and tests matching objects in the hallway.",
      "By utilizing spatial memory instead of rote cramming, inorganic chemistry shifts from a source of stress to a highly reliable, high-speed scoring segment in both JEE and NEET."
    ]
  },
  {
    title: "Effective Time-Blocking for 12+ Hour Schedules",
    excerpt: "Learn how topper Ananya Sen managed three high-intensity study blocks without fatigue.",
    author: "Ananya Sen",
    date: "Apr 28, 2026",
    readTime: "7 min read",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=2068",
    content: [
      "Studying 12 hours a day sounds exhausting, but the secret lies in time-blocking instead of chasing a running clock. Rather than deciding to study 'all day', divide your day into three high-intensity study blocks separated by restorative pauses.",
      "Block A (8:00 AM - 12:00 PM) is for highly analytical work—solving advanced math problem sets or chemistry mechanism charts when cognitive focus is fresh. Block B (2:00 PM - 5:00 PM) mimics active exam hours, making it perfect for high-speed timed mock papers. Block C (7:00 PM - 10:00 PM) is for lighter consolidation, revision, and reading inorganic segments.",
      "Crucially, separate these blocks with absolute non-study downtime: physical exercises, meals, and outdoor walks. Never check social media during study breaks, as it triggers attention residue and degrades focus in the subsequent study block.",
      "Implementing structured time blocks keeps you fresh, highly focused, and consistently productive across long months of preparation."
    ]
  },
  {
    title: "NEET 2026 Biology: Scoring 360/360 Guide",
    excerpt: "The exact study roadmap and diagram labeling strategies to achieve a flawless biology score.",
    author: "Academic Cell",
    date: "Apr 25, 2026",
    readTime: "11 min read",
    category: "Updates",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=2071",
    content: [
      "Scoring a maximum 360/360 in NEET Biology is not just a dream—it is a highly systematic achievement. It requires absolute clarity on the NCERT syllabus and an analytical practice strategy.",
      "Begin by dissecting every diagram, table, and summary block inside the NCERT texts. Over 98% of NEET Biology questions are drawn directly from these pages. Develop custom diagram labeling sheets where you draw, label, and annotate plant and animal physiological systems.",
      "Combine textbook reading with topic-wise mock worksheets. It is critical to practice resolving tricky multi-statement options and 'Incorrect Match' formats which are frequently tested to trigger silly slip-ups.",
      "Ensure you keep a dedicated 'Mistake Logbook' to write down every conceptual error and review it weekly. Mastering the biological vocabulary and practicing active recall will help you build the speed and confidence needed for a flawless biology score."
    ]
  }
];

export const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeArticle, setActiveArticle] = useState<any | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; progress: number; message: string } | null>(null);

  const handleCategoryClick = (catName: string) => {
    if (catName === 'JEE Preparation') {
      setSearchQuery("JEE");
      setSelectedCategory("All");
    } else if (catName === 'NEET Preparation') {
      setSearchQuery("NEET");
      setSelectedCategory("All");
    } else if (catName === 'Study Tips') {
      setSearchQuery("");
      setSelectedCategory("Learning");
    } else if (catName === 'Board Exams') {
      setSearchQuery("Board");
      setSelectedCategory("All");
    }
    
    // Smooth scroll to the blog list
    document.getElementById("blog-list-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLoadMore = () => {
    if (isLoadingMore) return;
    setIsLoadingMore(true);
    setToast({ visible: true, progress: 0, message: "CONNECTING CENTRAL JOURNAL DATABASE..." });

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setToast((prev) => prev ? { ...prev, progress } : null);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setPosts((prev) => {
            // Check if already appended
            const alreadyAppended = prev.some(p => p.title === MOCK_EXTRA_POSTS[0].title);
            if (alreadyAppended) return prev;
            return [...prev, ...MOCK_EXTRA_POSTS];
          });
          setToast({ visible: true, progress: 100, message: "LOAD COMPLETE: 3 ADDITIONAL INSIGHTS MOUNTED" });
          setIsLoadingMore(false);

          // Dismiss toast after 2 seconds
          setTimeout(() => {
            setToast(null);
          }, 2000);
        }, 300);
      }
    }, 150);
  };

  return (
    <div className="bg-white min-h-screen relative">
      <BlogHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <BlogCategories onCategoryClick={handleCategoryClick} />
      <FeaturedArticles onArticleClick={setActiveArticle} />
      <BlogList 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        onArticleClick={setActiveArticle}
        posts={posts}
        onLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
      <BlogNewsletter />

      {/* Immersive Glassmorphic Modal Article Reader */}
      <AnimatePresence>
        {activeArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 select-none">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveArticle(null)}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-xl"
            />
            
            {/* Modal Glass Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#060813] border border-white/10 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col z-10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Top ambient spotlight glow inside modal */}
              <div className="absolute top-0 left-1/4 right-1/4 h-32 bg-indigo-500/10 blur-[80px] pointer-events-none" />

              {/* Close Button Crosshair */}
              <button 
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white bg-slate-900/60 backdrop-blur-md hover:border-indigo-400/50 hover:bg-slate-800 transition-all z-50 cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Scrollable Container */}
              <div className="overflow-y-auto flex-1 select-text scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                {/* Hero Cover Header */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden border-b border-white/10">
                  <img 
                    src={activeArticle.image} 
                    alt={activeArticle.title} 
                    className="w-full h-full object-cover opacity-[0.25] filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060813] via-[#060813]/60 to-transparent" />
                  
                  {/* Floating category badge inside image cover */}
                  <div className="absolute bottom-6 left-8 md:left-12">
                    <span className="px-5 py-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {activeArticle.category}
                    </span>
                  </div>
                </div>

                {/* Article Content Core Container */}
                <div className="p-8 md:p-12 md:px-16">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-6 mb-6 font-mono text-[9px] text-slate-400 uppercase tracking-[0.2em] select-none border-b border-white/5 pb-6">
                    <span className="flex items-center gap-2 text-indigo-400"><Calendar size={13} /> {activeArticle.date}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="flex items-center gap-2 text-cyan-400"><Clock size={13} /> {activeArticle.readTime}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="flex items-center gap-2 text-slate-300"><User size={13} /> {activeArticle.author}</span>
                  </div>

                  {/* Dynamic Gradient Title */}
                  <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-8 select-none">
                    {activeArticle.title.split(':').map((part: string, idx: number) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <br />}
                        <span className={idx > 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300 italic font-extrabold" : "text-white"}>
                          {part}
                        </span>
                      </React.Fragment>
                    ))}
                  </h3>

                  {/* Excerpt highlighting banner */}
                  <div className="p-6 rounded-2xl bg-indigo-500/5 border-l-4 border-indigo-400 mb-8 select-none">
                    <p className="text-slate-300 text-sm font-semibold italic">
                      "{activeArticle.excerpt}"
                    </p>
                  </div>

                  {/* Content Paragraphs */}
                  <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed font-semibold">
                    {activeArticle.content && activeArticle.content.map((p: string, idx: number) => (
                      <p key={idx} className="indent-4 md:indent-8">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Holographic verify seal badge at the bottom */}
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between gap-6 flex-col sm:flex-row select-none">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-400/30 rounded-2xl flex items-center justify-center text-emerald-400">
                        <CheckCircle2 size={24} className="animate-pulse" />
                      </div>
                      <div>

                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Verified Study Strategy</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Glassmorphic Loading Toast Notification */}
      <AnimatePresence>
        {toast && toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[100] w-96 p-6 rounded-3xl bg-[#060813]/90 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col gap-4 select-none"
          >
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="absolute inset-[-4px] border border-dashed border-indigo-400/30 rounded-xl animate-spin pointer-events-none" style={{ animationDuration: '6s' }} />
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 border border-indigo-400/40 rounded-xl flex items-center justify-center text-indigo-400 shadow-md">
                  <Sparkles size={18} className="animate-pulse" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="block font-mono text-[7px] text-slate-500">[DATABASE_SYNC: CONNECTING...]</span>
                <p className="text-xs font-black uppercase tracking-widest text-slate-200 truncate mt-0.5">{toast.message}</p>
              </div>
            </div>

            {/* Smooth Progress Bar */}
            <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden border border-white/5 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${toast.progress}%` }}
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
