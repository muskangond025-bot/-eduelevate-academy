import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  Users, 
  Award, 
  Phone, 
  HelpCircle,
  ChevronRight,
  SearchCheck
} from 'lucide-react';
import { cn } from '../lib/utils';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would redirect to a search results page
      console.log('Searching for:', searchQuery);
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const quickLinks = [
    { label: 'JEE Coaching', to: '/courses' },
    { label: 'NEET Coaching', to: '/courses' },
    { label: '11th Science', to: '/courses' },
    { label: '12th Science', to: '/courses' },
    { label: 'Book Demo Class', to: '/book-demo' },
    { label: 'Free Scholarship Test', to: '/scholarship' },
  ];

  const popularCourses = [
    { title: 'JEE Advanced Masterclass', desc: 'Intensive 2-year program for IIT aspirants.', to: '/courses' },
    { title: 'NEET Victory Batch', desc: 'Focus on Biology & Chemistry for medical success.', to: '/courses' },
    { title: 'MHT-CET Fast Track', desc: 'Accelerated revision for state-level entrance.', to: '/courses' },
    { title: 'Foundation Grade 10', desc: 'Building strong concepts for future entrance exams.', to: '/courses' },
  ];

  return (
    <div className="bg-bg-light min-h-screen font-sans selection:bg-accent-orange selection:text-white pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-20">
        {/* Floating Background Elements */}
        <motion.div 
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[15%] text-blue-100 hidden md:block"
        >
          <BookOpen size={120} />
        </motion.div>
        <motion.div 
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[15%] text-orange-100 hidden md:block"
        >
          <GraduationCap size={140} />
        </motion.div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Confused Student Illustration Placeholder (Geometric/Abstract) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 bg-white rounded-full mx-auto mb-12 flex items-center justify-center shadow-2xl relative"
          >
             <motion.div 
               animate={{ rotate: [0, 10, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity }}
               className="text-primary"
             >
                <HelpCircle size={80} />
             </motion.div>
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute -top-4 -right-4 w-12 h-12 bg-accent-orange rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-orange-500/30"
             >
                ?
             </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-primary tracking-tighter mb-6"
          >
            Oops! You’ve taken a <span className="text-accent-orange italic">wrong turn</span> 📚
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 font-medium max-w-2xl mx-auto mb-10"
          >
            The page you're looking for doesn’t exist. But your success journey is still on track!
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/" className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-900 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-900/20">
              Go to Homepage
            </Link>
            <Link to="/courses" className="w-full sm:w-auto px-8 py-4 bg-white text-primary border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-2 hover:border-accent-orange hover:text-accent-orange transition-all hover:scale-105 active:scale-95">
              Explore Courses
            </Link>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 border border-slate-100 bg-white/50 backdrop-blur-sm rounded-[2rem] max-w-lg mx-auto"
          >
             <p className="text-sm italic font-medium text-slate-400">
               "Success is not final, failure is not fatal — it’s the courage to continue that counts."
             </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Smart Navigation Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none"><Search size={200}/></div>
          
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-black text-primary mb-8">Let's find your <span className="text-accent-orange">way back.</span></h2>
            
            <form onSubmit={handleSearch} className="relative mb-12">
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Search for JEE, NEET, 11th, 12th..."
                 className="w-full h-18 bg-slate-50 border border-slate-100 rounded-3xl px-8 pl-16 focus:outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-accent-orange transition-all font-medium"
               />
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
               <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 bg-accent-orange text-white px-6 py-3 rounded-2xl font-bold hover:bg-orange-600 transition-colors">
                  Search
               </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {quickLinks.map((link, i) => (
                <Link 
                  key={i} 
                  to={link.to}
                  className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:bg-white hover:shadow-xl hover:border-orange-200 transition-all group"
                >
                   <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                         <ChevronRight size={20} />
                      </div>
                   </div>
                   <div className="text-sm font-bold text-slate-600 group-hover:text-primary transition-colors uppercase tracking-widest">{link.label}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Choose Your Path (Bonus) */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl font-black text-slate-300 uppercase tracking-[0.3em] mb-12">Which grade are you in?</h3>
        <div className="flex flex-wrap justify-center gap-6">
           {['I am in 10th', 'I am in 11th', 'I am in 12th'].map((path, i) => (
             <Link key={i} to="/path" className="px-10 py-6 bg-white border border-slate-100 rounded-full font-black text-primary uppercase tracking-widest text-xs hover:border-accent-orange hover:text-accent-orange hover:shadow-2xl transition-all hover:-translate-y-1">
                {path}
             </Link>
           ))}
        </div>
      </section>

      {/* 3. Popular Courses Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-end mb-12">
              <div>
                 <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Most Chosen <br/><span className="text-accent-orange">by Students.</span></h2>
              </div>
              <div className="hidden md:flex gap-2 text-slate-400 font-bold text-xs uppercase tracking-widest items-center">
                 Scroll to explore <ArrowRight size={16} />
              </div>
           </div>

           <div className="flex gap-8 overflow-x-auto pb-10 scrollbar-hide snap-x">
             {popularCourses.map((course, i) => (
               <motion.div 
                 key={i} 
                 whileHover={{ y: -10 }}
                 className="min-w-[320px] bg-slate-50 border border-slate-100 p-10 rounded-[3rem] snap-start group"
               >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-accent-orange mb-8 shadow-sm">
                     <BookOpen size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-primary mb-4 tracking-tight leading-tight">{course.title}</h3>
                  <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">{course.desc}</p>
                  <Link to={course.to} className="inline-flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest group-hover:text-accent-orange transition-colors">
                     View Details <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform font-bold" />
                  </Link>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 4. Student Success Highlight */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                 <h2 className="text-5xl font-black text-primary tracking-tighter italic mb-8">Thousands of students found their path — <span className="text-accent-orange">you can too.</span></h2>
                 <p className="text-lg text-slate-500 font-medium leading-relaxed mb-12 italic-small">
                    Join the league of top rankers who decoded the success secret with our precision-engineered masterclasses.
                 </p>
                 <Link to="/results" className="inline-flex items-center gap-3 text-sm font-black text-accent-orange uppercase tracking-[0.2em] hover:gap-6 transition-all">
                    See 2025 Wall of Fame <ArrowRight size={20} />
                 </Link>
              </div>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm text-center">
                    <Award className="text-orange-500 mx-auto mb-6" size={48} />
                    <div className="text-4xl font-black text-primary mb-2 tracking-tighter italic">AIR 14</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Highest JEE Rank</div>
                 </div>
                 <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm text-center lg:translate-y-12">
                    <Users className="text-blue-500 mx-auto mb-6" size={48} />
                    <div className="text-4xl font-black text-primary mb-2 tracking-tighter italic">98%</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selection Ratio</div>
                 </div>
                 <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm text-center">
                    <SearchCheck className="text-green-500 mx-auto mb-6" size={48} />
                    <div className="text-4xl font-black text-primary mb-2 tracking-tighter italic">25k+</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students Enrolled</div>
                 </div>
                 <div className="p-10 bg-white border border-slate-100 rounded-[3rem] shadow-sm text-center lg:translate-y-12">
                    <Phone className="text-rose-500 mx-auto mb-6" size={48} />
                    <div className="text-4xl font-black text-primary mb-2 tracking-tighter italic">24/7</div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expert Support</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 5. CTA Banner (High Conversion) */}
      <section className="py-20">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary p-20 rounded-[4rem] text-white text-center shadow-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.15),transparent_50%)]" />
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }} 
                 transition={{ duration: 10, repeat: Infinity }}
                 className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none"
               >
                 <HelpCircle size={300} />
               </motion.div>

               <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase mb-6">Not sure <span className="text-accent-orange">where to start?</span></h3>
                  <p className="max-w-xl mx-auto text-blue-200 font-medium mb-12 italic-small leading-relaxed">Let our senior counselors map out your target goal and provide a tailored success blueprint.</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/book-demo" className="w-full sm:w-auto px-10 py-5 bg-accent-orange text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95">
                       Book Free Demo Class
                    </Link>
                    <Link to="/scholarship" className="w-full sm:w-auto px-10 py-5 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                       Take Scholarship Test
                    </Link>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Help / Support Section */}
      <section className="pt-20 text-center">
         <div className="max-w-4xl mx-auto px-4">
            <h4 className="text-2xl font-black text-primary mb-4">Need guidance?</h4>
            <p className="text-slate-500 font-medium mb-8">Talk directly to our academic experts for personal counselling.</p>
            <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-slate-100 text-primary rounded-2xl font-bold hover:border-primary transition-all group">
               Contact Us <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </Link>
         </div>
      </section>
    </div>
  );
};
