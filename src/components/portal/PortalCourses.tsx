import React from 'react';
import { motion } from 'motion/react';
import { Play, FileText, CheckCircle, BookOpen } from 'lucide-react';

const COURSES = [
  { id: 1, title: 'Advanced Calculus', teacher: 'Dr. Rahul Verma', progress: 85, lessons: 24, completed: 20 },
  { id: 2, title: 'Organic Reaction Mechanisms', teacher: 'Prof. Amrita Singh', progress: 42, lessons: 18, completed: 8 },
  { id: 3, title: 'Quantum Mechanics for JEE', teacher: 'Vivek Kulkarni', progress: 12, lessons: 15, completed: 2 },
];

export const PortalCourses = ({ searchQuery }: { searchQuery: string }) => {
  const filteredCourses = COURSES.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">My <span className="text-secondary">Academy.</span></h2>
           <p className="text-slate-500 font-medium">Continue your structured learning path.</p>
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center max-w-xl mx-auto space-y-6 shadow-sm"
        >
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
             <BookOpen size={36} />
          </div>
          <h3 className="text-2xl font-black text-primary tracking-tight italic-small">No Courses Found</h3>
          <p className="text-slate-500 font-medium text-sm">We couldn't find any courses matching "{searchQuery}". Check the spelling or browse our catalogs.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-2xl transition-all p-2"
          >
            <div className="relative aspect-[16/9] rounded-[2.5rem] bg-slate-900 overflow-hidden mb-6">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 mix-blend-overlay" />
               <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-2xl">
                  <Play className="fill-primary ml-1" size={24} />
               </button>
            </div>
            
            <div className="px-8 pb-8">
               <div className="text-[10px] font-black text-secondary tracking-widest uppercase mb-2">{course.teacher}</div>
               <h3 className="text-2xl font-black text-primary mb-6 tracking-tight italic-small leading-tight">
                  {course.title}
               </h3>
               
               <div className="space-y-6">
                  <div>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</span>
                        <span className="text-xs font-black text-primary italic">{course.progress}%</span>
                     </div>
                     <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          className="h-full bg-secondary"
                        />
                     </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                     <div className="flex gap-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                           <FileText size={12} className="text-secondary" /> {course.lessons} PDFS
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                           <CheckCircle size={12} className="text-green-500" /> {course.completed} DONE
                        </div>
                     </div>
                     <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-secondary transition-colors">Start Learning</button>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
};
