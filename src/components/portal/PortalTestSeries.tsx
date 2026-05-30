import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardCheck, 
  Timer, 
  Share2, 
  Award, 
  CheckCircle, 
  X, 
  Calendar, 
  Plus, 
  Clock, 
  History, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

const DEFAULT_TESTS = [
  { id: 1, title: 'All India JEE Mock - IV', date: '24 May', duration: '3h', questions: 90, status: 'Active', color: 'bg-green-500' },
  { id: 2, title: 'Inorganic Chemistry Unit - 2', date: '26 May', duration: '1h', questions: 30, status: 'Upcoming', color: 'bg-amber-500' },
  { id: 3, title: 'Monthly Merit Assessment', date: '28 May', duration: '3h', questions: 90, status: 'Upcoming', color: 'bg-indigo-500' },
];

const COMPLETED_TESTS = [
  { id: 101, title: 'All India JEE Mock - III', date: '20 May', score: '245/300', percentile: '98.6%', duration: '2h 45m', questions: 90 },
  { id: 102, title: 'Physics Mechanics Prep', date: '15 May', score: '85/100', percentile: '95.4%', duration: '50m', questions: 30 },
  { id: 103, title: 'Chemistry Electrochemistry Mock', date: '10 May', score: '78/100', percentile: '91.2%', duration: '55m', questions: 30 },
  { id: 104, title: 'Maths Vector Calculus', date: '05 May', score: '92/100', percentile: '99.1%', duration: '48m', questions: 30 },
];

const BG_COLORS = [
  'bg-indigo-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-violet-500',
  'bg-rose-500',
  'bg-emerald-500',
  'bg-sky-500'
];

export const PortalTestSeries = ({ searchQuery }: { searchQuery: string }) => {
  const [tests, setTests] = useState(DEFAULT_TESTS);
  const [registeredList, setRegisteredList] = useState<number[]>([2, 3]);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const [toastTimeoutId, setToastTimeoutId] = useState<number | null>(null);

  // Modal states
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  // New test states
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDuration, setNewDuration] = useState('3h');
  const [newQuestions, setNewQuestions] = useState('90');

  const showToast = (message: string) => {
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
    }
    setToast({ message, visible: true });
    const timerId = window.setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
    setToastTimeoutId(timerId);
  };

  const toggleRegistration = (id: number) => {
    const test = tests.find(t => t.id === id);
    if (!test) return;

    if (registeredList.includes(id)) {
      setRegisteredList(prev => prev.filter(item => item !== id));
      showToast(`Cancelled registration for ${test.title}`);
    } else {
      setRegisteredList(prev => [...prev, id]);
      showToast(`Registered for ${test.title}!`);
    }
  };

  const handleScheduleTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDate.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }

    const nextId = tests.length > 0 ? Math.max(...tests.map(t => t.id)) + 1 : 1;
    const randomColor = BG_COLORS[nextId % BG_COLORS.length];

    const newTest = {
      id: nextId,
      title: newTitle.trim(),
      date: newDate.trim(),
      duration: newDuration,
      questions: parseInt(newQuestions),
      status: 'Upcoming' as const,
      color: randomColor,
    };

    setTests(prev => [...prev, newTest]);
    setRegisteredList(prev => [...prev, nextId]);
    showToast(`Scheduled and registered for ${newTest.title}!`);

    // Reset Form & Close
    setNewTitle('');
    setNewDate('');
    setNewDuration('3h');
    setNewQuestions('90');
    setIsScheduleOpen(false);
  };

  const filteredTests = tests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Exam <span className="text-secondary">Simulator.</span></h2>
           <p className="text-slate-500 font-medium">Standardized testing environments for real-world preparation.</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
           <button 
             onClick={() => setIsHistoryOpen(true)}
             className="flex items-center justify-center gap-2 flex-1 sm:flex-initial px-6 py-3 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors cursor-pointer"
           >
              <History size={12} /> Test History
           </button>
           <button 
             onClick={() => setIsScheduleOpen(true)}
             className="flex items-center justify-center gap-2 flex-1 sm:flex-initial px-6 py-3 bg-primary text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all cursor-pointer shadow-lg"
           >
              <Plus size={12} /> Schedule New
           </button>
        </div>
      </div>

      {filteredTests.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[3rem] border border-slate-100 p-16 text-center max-w-xl mx-auto space-y-6 shadow-sm"
        >
          <div className="w-20 h-20 bg-slate-50 text-slate-400 rounded-3xl flex items-center justify-center mx-auto">
             <ClipboardCheck size={36} />
          </div>
          <h3 className="text-2xl font-black text-primary tracking-tight italic-small">No Exams Found</h3>
          <p className="text-slate-500 font-medium text-sm">We couldn't find any exams matching "{searchQuery}". Try editing your query.</p>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {filteredTests.map((test, i) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 bg-white border border-slate-100 rounded-[3rem] shadow-sm flex flex-col md:flex-row items-center gap-12 group hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-8 md:border-r border-slate-50 pr-12">
                 <div className="text-center w-14 shrink-0">
                    <div className="text-2xl font-black text-primary">{test.date.split(' ')[0]}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{test.date.split(' ')[1] || 'Jun'}</div>
                 </div>
                 <div className={`w-12 h-12 rounded-2xl ${test.color} bg-opacity-10 flex items-center justify-center`}>
                    <ClipboardCheck className={test.color.replace('bg-', 'text-')} size={24} />
                 </div>
              </div>

              <div className="flex-grow">
                 <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full ${test.color} animate-pulse`} />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{test.status}</span>
                 </div>
                 <h3 className="text-2xl font-black text-primary tracking-tight">{test.title}</h3>
              </div>

              <div className="flex items-center gap-12 text-center md:border-l border-slate-50 pl-12">
                 <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 justify-center"><Timer size={12}/> Time</div>
                    <div className="text-sm font-black text-primary italic">{test.duration}</div>
                 </div>
                 <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1 justify-center"><Award size={12}/> Weight</div>
                    <div className="text-sm font-black text-primary italic">{test.questions} Q</div>
                 </div>
              </div>

              {test.status === 'Active' ? (
                <button className="px-10 py-5 bg-secondary text-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform cursor-pointer">
                   Start Exam
                </button>
              ) : (
                <button 
                  onClick={() => toggleRegistration(test.id)}
                  className={`px-10 py-5 border rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center gap-2 group/btn cursor-pointer ${
                    registeredList.includes(test.id)
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                      : 'bg-primary text-white border-transparent hover:bg-secondary hover:text-primary shadow-lg'
                  }`}
                >
                  {registeredList.includes(test.id) ? (
                    <>
                      <CheckCircle size={14} className="shrink-0" />
                      <span className="group-hover/btn:hidden">Registered</span>
                      <span className="hidden group-hover/btn:inline">Unregister</span>
                    </>
                  ) : (
                    <span>Register</span>
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Test History Modal */}
      <AnimatePresence>
        {isHistoryOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative border border-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsHistoryOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="mb-8">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-2 flex items-center gap-1.5"><History size={12} /> Performance Log</span>
                <h3 className="text-3xl font-black text-primary tracking-tight italic-small leading-none">Completed Exams</h3>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 rounded-3xl mb-8">
                <div className="text-center">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Taken</div>
                  <div className="text-2xl font-black text-primary">4 Tests</div>
                </div>
                <div className="text-center border-x border-slate-100">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg Percentile</div>
                  <div className="text-2xl font-black text-secondary flex items-center justify-center gap-1">
                    <TrendingUp size={16} className="text-secondary" /> 96.1%
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Top Score</div>
                  <div className="text-2xl font-black text-emerald-600 flex items-center justify-center gap-1">
                    <Sparkles size={14} /> 245
                  </div>
                </div>
              </div>

              {/* List */}
              <div className="flex-grow overflow-y-auto pr-2 space-y-4 max-h-[40vh] scrollbar-thin">
                {COMPLETED_TESTS.map(completed => (
                  <div 
                    key={completed.id} 
                    className="p-5 bg-white border border-slate-100 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-200 transition-colors"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{completed.date} • {completed.duration}</div>
                      <h4 className="font-black text-primary tracking-tight text-base leading-tight italic-small">{completed.title}</h4>
                    </div>
                    <div className="flex items-center gap-6 self-end sm:self-auto">
                      <div className="text-right">
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Score</div>
                        <div className="font-black text-primary text-sm">{completed.score}</div>
                      </div>
                      <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl px-4 py-2 text-center">
                        <div className="text-[8px] font-black uppercase tracking-wider leading-none mb-0.5">Rank</div>
                        <div className="font-black text-xs">{completed.percentile} tile</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Schedule New Modal */}
      <AnimatePresence>
        {isScheduleOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsScheduleOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Title */}
              <div className="mb-8">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-2 flex items-center gap-1.5"><Calendar size={12} /> Test Scheduler</span>
                <h3 className="text-3xl font-black text-primary tracking-tight italic-small leading-none">Schedule Custom Exam</h3>
              </div>

              {/* Form */}
              <form onSubmit={handleScheduleTest} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Test Series / Title</label>
                  <input 
                    type="text" 
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Waves & Thermodynamics Mock"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Exam Date</label>
                  <input 
                    type="text" 
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    placeholder="e.g. 30 May"
                    required
                    className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-1"><Clock size={10} /> Duration</label>
                    <select
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary cursor-pointer appearance-none"
                    >
                      <option value="1h">1 Hour</option>
                      <option value="2h">2 Hours</option>
                      <option value="3h">3 Hours</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4 flex items-center gap-1"><Award size={10} /> Questions</label>
                    <select
                      value={newQuestions}
                      onChange={(e) => setNewQuestions(e.target.value)}
                      className="w-full px-6 py-4 bg-slate-50 border border-transparent focus:border-secondary transition-all outline-none rounded-2xl font-bold text-sm text-primary cursor-pointer appearance-none"
                    >
                      <option value="30">30 Questions</option>
                      <option value="60">60 Questions</option>
                      <option value="90">90 Questions</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 cursor-pointer mt-4"
                >
                   Schedule & Register
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#0c0f1d] border border-indigo-500/30 text-white rounded-3xl p-5 shadow-2xl flex items-center gap-3 backdrop-blur-md max-w-sm"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
              <ClipboardCheck className="text-secondary" size={16} />
            </div>
            <p className="text-xs font-bold leading-tight">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

