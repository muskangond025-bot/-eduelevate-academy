import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, MessageSquare } from 'lucide-react';

const POPULAR = [
  { title: "Best Books for Organic Chemistry 2026", views: "12k", comments: 45 },
  { title: "Managing Exam Stress: The 4-7-8 Breathing Method", views: "8.5k", comments: 22 },
  { title: "Is NEET pattern changing? NTA Latest Updates", views: "25k", comments: 110 },
];

export const PopularArticles = ({ onArticleClick }: { onArticleClick: (article: any) => void }) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
         <TrendingUp className="text-secondary" />
         <h2 className="text-2xl font-black text-primary tracking-tighter uppercase italic">Popular Now</h2>
      </div>
      
      <div className="space-y-6">
        {POPULAR.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group cursor-pointer p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-slate-200 hover:bg-white transition-all"
            onClick={() => onArticleClick({
              title: post.title,
              excerpt: `Detailed insights on: ${post.title}`,
              author: "Editorial Team",
              date: "May 22, 2026",
              readTime: "5 min read",
              category: "Popular Insight",
              image: i === 0 
                ? "https://images.unsplash.com/photo-1434039353568-460b8b539f11?q=80&w=2070" 
                : i === 1 
                  ? "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999" 
                  : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070",
              content: i === 0 
                ? [
                    "Organic Chemistry is heavily driven by spatial reasoning and structural pattern recognition rather than rote memorization. Aspirants who attempt to memorize reactions without understanding their electronic displacement mechanics find themselves struggling at the JEE Advanced level.",
                    "Our academic experts recommend starting with standard, conceptually sound textbooks: Morrison & Boyd (renowned for deep mechanism pathways), Solomons & Fryhle (known for clear synthesis paths), and Clayden's Organic Chemistry (essential for top 100 rank seekers).",
                    "To supplement these, develop a reaction matrix dashboard where every conversion path is linked to its active reagents and thermodynamic settings. This structural blueprint consolidates reaction mechanisms in active memory, raising reaction identification speeds significantly during competitive assessments."
                  ]
                : i === 1 
                  ? [
                      "Academic stress is not an intellectual failure; it is an automatic biological reaction of the sympathetic nervous system under heavy load.",
                      "By practicing the 4-7-8 cyclic breathing method (inhaling for 4 seconds, holding for 7 seconds, and exhaling audibly for 8 seconds) before study blocks or major exams, you can restore vagal tone, decrease pulse rate, and switch into a parasympathetic relaxed focus state.",
                      "Topper logs show that incorporating just two 10-minute mindfulness sessions daily results in a 15% boost in memory recall speed and drastically reduces numerical calculation slip-ups caused by high-pressure fatigue."
                    ]
                  : [
                      "Recent policy changes and announcements from the National Testing Agency (NTA) indicate subtle adjustments in the question presentation for the NEET 2026 session.",
                      "While the core syllabus remains bound strictly to the NCERT guidelines, there is a clear trend towards highly integrated multi-concept questions, especially in genetics and biological systems. There is also an increase in analytical matching matrices and assertion-reason formats.",
                      "Our academic cell has fully adapted to these changes. The mock series now incorporates 40% assertion-reason vectors to ensure students build natural cognitive speed and tackle updated formats with absolute precision."
                    ]
            })}
          >
            <h3 className="text-lg font-black text-primary mb-3 leading-tight group-hover:text-secondary transition-colors">
               {post.title}
            </h3>
            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
               <span className="flex items-center gap-1">{post.views} Views</span>
               <span className="flex items-center gap-1"><MessageSquare size={12} className="text-secondary" /> {post.comments} Comments</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
