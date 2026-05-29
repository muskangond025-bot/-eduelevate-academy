import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  { 
    name: "Dr. Arvind Gupta", 
    type: "Parent of IITian", 
    text: "The discipline and personal mentoring at AcademyPro are what set them apart. My son's rank in JEE Advanced is a testament to their pedagogy.",
    rating: 5
  },
  { 
    name: "Megha Kulkarni", 
    type: "NEET Ranker", 
    text: "Unlike other institutes, the teachers here focus on 'Why' a concept works. The doubt clearing sessions were a lifesaver for my NEET prep.",
    rating: 5
  },
  { 
    name: "Sanjay Deshmukh", 
    type: "Parent of CET Topper", 
    text: "Transparency and consistent feedback. We always knew where our daughter stood and how she could improve. Highly professional.",
    rating: 5
  },
];

export const Testimonials = () => {
  return (
    <section className="py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black text-primary tracking-tight">Voice of <span className="text-secondary italic">Trust</span></h2>
          <p className="text-slate-500 mt-4 font-medium italic-small">Honest experiences from our community of parents and high-achieving students.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col relative group hover:shadow-2xl hover:-translate-y-2 transition-all"
            >
              <div className="absolute top-8 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Quote size={80} className="text-primary" />
              </div>
              
              <div className="flex gap-1 mb-8">
                {[...Array(item.rating)].map((_, j) => (
                  <Star key={j} size={16} className="text-secondary fill-secondary" />
                ))}
              </div>
              
              <p className="text-lg text-primary font-medium leading-relaxed italic mb-10 flex-grow">
                "{item.text}"
              </p>
              
              <div className="pt-8 border-t border-slate-50 mt-auto">
                <div className="font-bold text-primary text-xl">{item.name}</div>
                <div className="text-xs font-black text-secondary uppercase tracking-widest mt-1">{item.type}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative text background */}
      <div className="absolute -bottom-20 left-0 w-full text-center">
        <span className="text-[12rem] font-black text-slate-200/40 select-none pointer-events-none tracking-tighter">SUCCESS STORIES</span>
      </div>
    </section>
  );
};
