import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings, 
  LogOut,
  ChevronRight,
  Bell,
  Search,
  UserCheck,
  Calendar,
  MessageSquare,
  AlertCircle,
  Sparkles,
  ChevronDown,
  Menu,
  X,
  Send,
  CheckCircle2,
  Printer,
  Download,
  ArrowRight,
  Lock,
  Check,
  Star,
  Smartphone,
  Mail,
  FileText
} from 'lucide-react';

import { ParentLogin } from '../components/portal/ParentLogin';
import { ParentDashboard as DashboardContent } from '../components/portal/ParentDashboard';
import { ParentFees } from '../components/portal/ParentFees';

type ParentSection = 'Overview' | 'Fees & Billing' | 'Academic Progress' | 'Attendance' | 'Teacher Connect';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  method: string;
  desc: string;
  status: string;
}

interface ScheduledCall {
  date: string;
  adviser: string;
  topic: string;
}

// Academic Progress Component
const ParentAcademicProgress = ({ 
  triggerToast, 
  onScheduleClick 
}: { 
  triggerToast: (msg: string) => void; 
  onScheduleClick: () => void;
}) => {
  const subjects = [
    { name: "Mathematics", score: "98%", rank: "AIR 8", grade: "A+", color: "indigo" },
    { name: "Advanced Physics", score: "96%", rank: "AIR 12", grade: "A+", color: "orange" },
    { name: "Organic Chemistry", score: "88%", rank: "AIR 24", grade: "A", color: "emerald" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Academic <span className="text-secondary">Progress.</span></h2>
        <p className="text-slate-500 font-medium">Real-time marks tracking and test analytics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((sub, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm relative overflow-hidden group hover:shadow-xl transition-all">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{sub.name}</div>
            <div className="text-3xl font-black text-primary">{sub.score}</div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
              <span className="text-xs font-bold text-slate-400">{sub.rank}</span>
              <span className="text-xs font-black px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-full">{sub.grade}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Mastery Weakness Analysis</h4>
          <div className="space-y-4">
            {[
              { topic: "Kinematics & Friction", mastery: 94, status: "Mastered" },
              { topic: "Integration & Calculus", mastery: 90, status: "Mastered" },
              { topic: "Organic reaction mechanism", mastery: 65, status: "Needs Attention" },
              { topic: "Rotational Dynamics", mastery: 72, status: "Needs Revision" },
            ].map((topic, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700">{topic.topic}</span>
                  <span className={topic.mastery < 75 ? "text-amber-500" : "text-green-500"}>{topic.mastery}% ({topic.status})</span>
                </div>
                <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${topic.mastery < 75 ? 'bg-amber-400' : 'bg-green-500'}`} 
                    style={{ width: `${topic.mastery}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-2">Schedule Mentorship Call</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">Book a 1-on-1 counseling call directly with Rohan's lead academic advisor to plan the roadmap.</p>
          </div>
          <button 
            onClick={onScheduleClick}
            className="w-full py-4.5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-secondary hover:text-primary transition-all shadow-lg cursor-pointer"
          >
            Request Call Setup
          </button>
        </div>
      </div>
    </div>
  );
};

// Attendance Component
const ParentAttendance = ({ triggerToast }: { triggerToast: (msg: string) => void }) => {
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !reason) {
      triggerToast("⚠️ Please select a Date and enter a valid Leave Reason!");
      return;
    }
    triggerToast(`📝 Leave Request for [${date}] successfully dispatched to Center Head! Code: REQ-${Math.floor(Math.random() * 9000) + 1000}`);
    setReason("");
    setDate("");
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Attendance <span className="text-secondary">Records.</span></h2>
        <p className="text-slate-500 font-medium">Verify regular lecture and test attendance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total Lectures", val: "120", sub: "Since Jan 2026" },
          { label: "Present Days", val: "113", sub: "94.2% Attendance" },
          { label: "Late/Excused", val: "3", sub: "Excused by parent" },
          { label: "Absent Days", val: "4", sub: "Unexcused" },
        ].map((item, i) => (
          <div key={i} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{item.label}</div>
            <div className="text-3xl font-black text-primary">{item.val}</div>
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">{item.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Weekly Punch Card</h4>
            <div className="grid grid-cols-5 gap-4">
              {[
                { day: "Mon", status: "Present" },
                { day: "Tue", status: "Present" },
                { day: "Wed", status: "Present" },
                { day: "Thu", status: "Late" },
                { day: "Fri", status: "Present" },
              ].map((d, i) => (
                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center select-none">
                  <div className="text-xs font-black text-slate-600 mb-1">{d.day}</div>
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    d.status === 'Present' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs font-bold text-slate-400 uppercase mt-4 select-none">* Biometric attendance updated every weekday at 9:00 AM</div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Leave Application Portal</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Select Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-indigo-500 cursor-pointer" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Leave Reason</label>
                <input 
                  type="text" 
                  placeholder="Medical/Family" 
                  value={reason} 
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700 focus:outline-indigo-500" 
                />
              </div>
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer shadow-md"
            >
              Submit Leave Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Teacher Connect Component
const ParentTeacherConnect = ({ 
  triggerToast, 
  onMessageTeacher 
}: { 
  triggerToast: (msg: string) => void; 
  onMessageTeacher: (name: string) => void;
}) => {
  const [selectedSlot, setSelectedSlot] = useState("June 10, 4:00 PM");

  const bookMeeting = () => {
    triggerToast(`📅 Meeting slot booked successfully! Scheduled for ${selectedSlot} with Mentors.`);
  };

  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Teacher <span className="text-secondary">Connect.</span></h2>
        <p className="text-slate-500 font-medium">Direct mentorship and Parent-Teacher Meeting slot booking.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-6">Assigned Faculty Directory</h4>
          <div className="space-y-4">
            {[
              { name: "Dr. Vikram Sethi", role: "Physics Mentor", qual: "PhD (ex-IIT)", active: true },
              { name: "Prof. Sarah Ferguson", role: "Biological Sciences", qual: "MSc Biotech Medalist", active: true },
              { name: "Dr. Amit Deshpande", role: "Physical Chemistry", qual: "PhD Organic Chem", active: false }
            ].map((teach, i) => (
              <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:shadow-md transition-all">
                <div>
                  <div className="text-xs font-black text-primary uppercase">{teach.name}</div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-0.5">{teach.role} • {teach.qual}</div>
                </div>
                <button 
                  onClick={() => onMessageTeacher(teach.name)}
                  className="px-4 py-2 bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-650 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Message
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-black text-primary uppercase tracking-widest mb-4">Book Next PTM Slot</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-6">Select a slot to schedule a Parent-Teacher Meeting (PTM) for offline/online review.</p>
            
            <div className="space-y-3 mb-6">
              {["June 10, 4:00 PM", "June 10, 5:00 PM", "June 11, 3:00 PM"].map((slot) => (
                <button 
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full p-3 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                    selectedSlot === slot 
                      ? "bg-indigo-50 border-indigo-600 text-indigo-600" 
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={bookMeeting}
            className="w-full py-4.5 bg-primary text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all cursor-pointer shadow-md"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export const ParentPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<ParentSection>('Overview');

  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Shared Portal States
  const [paidAmount, setPaidAmount] = useState(180000);
  const [pendingDues, setPendingDues] = useState(45000);
  const [scheduledCalls, setScheduledCalls] = useState<ScheduledCall[]>([]);
  const [unreadAlerts, setUnreadAlerts] = useState(true);

  // Dynamic lists
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TX-8821', date: 'Apr 10, 2026', amount: '₹45,000', method: 'UPI', desc: 'Instalment 3 (JEE Core)', status: 'Success' },
    { id: 'TX-7642', date: 'Feb 12, 2026', amount: '₹45,000', method: 'Card', desc: 'Instalment 2 (JEE Core)', status: 'Success' },
    { id: 'TX-5291', date: 'Dec 15, 2025', amount: '₹90,000', method: 'NEFT', desc: 'Admission & Instalment 1', status: 'Success' },
  ]);

  // Support desk tickets
  const [supportTickets, setSupportTickets] = useState<Array<{ id: string; subject: string; status: string }>>([]);

  // Modals visibility toggles
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isChildProfileOpen, setIsChildProfileOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Sub-modal specific details
  const [selectedChatTeacher, setSelectedChatTeacher] = useState("Dr. Vikram Sethi");
  const [chatMessage, setChatMessage] = useState("");
  const [chats, setChats] = useState<{ [key: string]: Array<{ sender: 'parent' | 'teacher'; text: string; time: string }> }>({
    "Dr. Vikram Sethi": [
      { sender: 'teacher', text: "Hello! I am Dr. Vikram Sethi. Rohan is making excellent progress in Physics mechanics, but needs to focus more on rotational dynamics. Let me know if you have any questions.", time: "10:30 AM" }
    ],
    "Prof. Sarah Ferguson": [
      { sender: 'teacher', text: "Hello! Sarah here. Rohan's Biology performance is extremely steady. He is well-prepared for the upcoming mocks.", time: "Yesterday" }
    ],
    "Dr. Amit Deshpande": [
      { sender: 'teacher', text: "Hello! Rohan needs to practice reaction mechanisms in organic chemistry more regularly. I've uploaded some custom worksheets for him.", time: "2 days ago" }
    ]
  });

  // Settings preferences
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [parentAltNumber, setParentAltNumber] = useState("+91 98234 56789");

  // Call scheduler selections
  const [selectedAdviser, setSelectedAdviser] = useState("Dr. Vikram Sethi");
  const [callTopic, setCallTopic] = useState("Academic Roadmap Review");
  const [callDate, setCallDate] = useState("2026-06-08");
  const [callTime, setCallTime] = useState("04:30 PM");

  // Support Ticket Form
  const [supportName, setSupportName] = useState("");
  const [supportPhone, setSupportPhone] = useState("");
  const [supportType, setSupportType] = useState("Academic Counseling");
  const [supportDesc, setSupportDesc] = useState("");
  const [supportTicketCreated, setSupportTicketCreated] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3500);
  };

  const handlePaymentSuccess = (amountPaid: number, method: string) => {
    setPaidAmount(prev => prev + amountPaid);
    setPendingDues(0);
    const newTx: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Jun 01, 2026',
      amount: `₹${amountPaid.toLocaleString()}`,
      method: method,
      desc: 'Instalment 4 (JEE Core - Final)',
      status: 'Success'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleScheduleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = new Date(callDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const newCall: ScheduledCall = {
      date: `${formattedDate} • ${callTime}`,
      adviser: selectedAdviser,
      topic: callTopic
    };
    setScheduledCalls(prev => [newCall, ...prev]);
    setIsSchedulerOpen(false);
    triggerToast(`📅 Mentorship call scheduled with ${selectedAdviser} for ${formattedDate} successfully!`);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    
    const parentMsg = chatMessage;
    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    // 1. Add Parent Message
    setChats(prev => ({
      ...prev,
      [selectedChatTeacher]: [...(prev[selectedChatTeacher] || []), { sender: 'parent', text: parentMsg, time }]
    }));
    setChatMessage("");

    // 2. Simulate Teacher Automated Reply after 1.5s
    setTimeout(() => {
      let replyText = "Thank you for the message. I will check Rohan's scores and follow up.";
      if (selectedChatTeacher === "Dr. Vikram Sethi") {
        replyText = "Indeed. Rohan shows high potential in mechanics, but we need to practice more worksheets for rotational equilibrium. I will guide him in our next session!";
      } else if (selectedChatTeacher === "Prof. Sarah Ferguson") {
        replyText = "Hello! Yes, Rohan has completed all microbiology assignments this week. His performance is outstanding. Keep encouraging him!";
      } else if (selectedChatTeacher === "Dr. Amit Deshpande") {
        replyText = "Got it. I have shared some extra worksheets on organic reactive intermediates. He should try solving them by this Thursday.";
      }

      setChats(prev => ({
        ...prev,
        [selectedChatTeacher]: [...(prev[selectedChatTeacher] || []), { sender: 'teacher', text: replyText, time }]
      }));
    }, 1500);
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `TIC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setSupportTicketCreated(ticketId);
    setSupportTickets(prev => [{ id: ticketId, subject: supportType, status: 'Open' }, ...prev]);
    setSupportDesc("");
    triggerToast(`🎟️ Support Ticket ${ticketId} raised successfully! An adviser will call you shortly.`);
  };

  if (!isLoggedIn) {
    return (
      <>
        <ParentLogin 
          onLogin={() => setIsLoggedIn(true)} 
          onSupportClick={() => {
            setSupportTicketCreated(null);
            setIsSupportOpen(true);
          }} 
        />

        {/* Global Support Desk Modal on Login Screen */}
        <AnimatePresence>
          {isSupportOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100 overflow-hidden"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setIsSupportOpen(false)}
                  className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
                >
                  <X size={18} />
                </button>

                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-indigo-600" />

                {!supportTicketCreated ? (
                  <form onSubmit={handleSupportSubmit} className="space-y-6">
                    <div>
                      <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-1 flex items-center gap-1.5"><AlertCircle size={12}/> Parent Support Desk</span>
                      <h3 className="text-3xl font-black text-primary tracking-tight italic">Submit Request</h3>
                      <p className="text-xs text-slate-400 mt-1">Get immediate assistance from Center administrators.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Parent Name</label>
                        <input 
                          type="text" 
                          placeholder="Amit Shrivastava"
                          required
                          value={supportName}
                          onChange={(e) => setSupportName(e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
                        <input 
                          type="tel" 
                          placeholder="+91 98XXX XXXXX"
                          required
                          value={supportPhone}
                          onChange={(e) => setSupportPhone(e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Support Category</label>
                        <select 
                          value={supportType}
                          onChange={(e) => setSupportType(e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm cursor-pointer"
                        >
                          <option>Forgot Credentials</option>
                          <option>Billing & Fee Instalments</option>
                          <option>Academic Counseling Request</option>
                          <option>Portal Login Issue</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Describe Issue</label>
                        <textarea 
                          rows={3}
                          placeholder="Please provide details of your issue..."
                          required
                          value={supportDesc}
                          onChange={(e) => setSupportDesc(e.target.value)}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm resize-none"
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      Submit Ticket <ArrowRight size={16} />
                    </button>
                  </form>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner"><CheckCircle2 size={32} /></div>
                    <div>
                      <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">TICKET CREATED SUCCESSFULLY</span>
                      <h4 className="text-2xl font-black text-primary tracking-tight mt-1">Ticket Raised!</h4>
                      <p className="text-xs text-slate-400 mt-2">Support Ticket ID: <span className="font-extrabold text-indigo-600">{supportTicketCreated}</span></p>
                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed px-4">Our center administrative head will reach out to you within 30 minutes to resolve your issue.</p>
                    </div>

                    <button 
                      onClick={() => setIsSupportOpen(false)}
                      className="w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-primary transition-all cursor-pointer shadow-md"
                    >
                      Close Desk
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  const navItems: { label: ParentSection; icon: React.ReactNode }[] = [
    { label: 'Overview', icon: <UserCheck size={18} /> },
    { label: 'Academic Progress', icon: <BarChart3 size={18} /> },
    { label: 'Attendance', icon: <Calendar size={18} /> },
    { label: 'Fees & Billing', icon: <CreditCard size={18} /> },
    { label: 'Teacher Connect', icon: <MessageSquare size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-100 flex-col py-10 px-8 relative z-50">
        <div className="flex items-center gap-3 mb-16 px-2">
           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white text-xl -rotate-6">P</div>
           <div className="font-display font-black text-xl text-primary uppercase tracking-tighter">PARENT<span className="text-secondary text-base">CARE</span></div>
        </div>

        <nav className="flex-grow space-y-2">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveSection(item.label)}
              className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group cursor-pointer ${
                activeSection === item.label 
                  ? 'bg-indigo-600 text-white shadow-xl translate-x-2' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <div className="flex items-center gap-4">
                 <div className={`${activeSection === item.label ? 'text-secondary' : 'group-hover:text-indigo-600'}`}>{item.icon}</div>
                 <span className="text-[11px] font-black uppercase tracking-widest leading-none pt-0.5">{item.label}</span>
              </div>
              {activeSection === item.label && <ChevronRight size={14} className="text-secondary" />}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
           <Link to="/" className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest">
              <LogOut size={18} className="rotate-180" /> Back to Home
           </Link>
           <button 
             onClick={() => setIsSettingsOpen(true)}
             className="w-full flex items-center gap-4 p-4 text-slate-400 hover:text-primary transition-all font-black text-[11px] uppercase tracking-widest cursor-pointer"
           >
              <Settings size={18} /> Account Settings
           </button>
           <button 
             onClick={() => setIsLoggedIn(false)}
             className="w-full flex items-center gap-4 p-4 text-rose-400 hover:text-rose-500 transition-all font-black text-[11px] uppercase tracking-widest cursor-pointer"
           >
              <LogOut size={18} /> Secure Logout
           </button>
        </div>
      </aside>

      {/* Mobile Glassmorphic Header & Sidebar Drawer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-50/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 flex justify-between items-center">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-md">P</div>
            <div className="font-display font-black text-md text-primary uppercase tracking-tighter">PARENT<span className="text-secondary text-sm">CARE</span></div>
         </div>
         
         <div className="flex items-center gap-4">
           {/* Alerts on Mobile Header */}
           <button 
             onClick={() => {
               setUnreadAlerts(false);
               setIsNotificationsOpen(true);
             }}
             className="relative w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-slate-100 text-slate-400"
           >
              <Bell size={16} />
              {unreadAlerts && <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />}
           </button>
           
           {/* Hamburger Menu Toggle */}
           <button 
             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             className="w-8 h-8 rounded-lg bg-white border border-slate-100 text-slate-700 flex items-center justify-center focus:outline-none"
           >
             {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
           </button>
         </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 top-[65px] z-30 lg:hidden bg-white flex flex-col p-8 justify-between"
          >
            <nav className="space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveSection(item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                    activeSection === item.label 
                      ? 'bg-indigo-600 text-white shadow-lg' 
                      : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                  <div>{item.icon}</div>
                  <span className="text-[12px] font-black uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </nav>

            <div className="border-t border-slate-100 pt-6 space-y-4">
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSettingsOpen(true);
                }}
                className="w-full flex items-center gap-4 p-4 text-slate-400 font-black text-[12px] uppercase tracking-widest cursor-pointer"
              >
                 <Settings size={18} /> Account Settings
              </button>
              <button 
                onClick={() => setIsLoggedIn(false)}
                className="w-full flex items-center gap-4 p-4 text-rose-500 font-black text-[12px] uppercase tracking-widest cursor-pointer"
              >
                 <LogOut size={18} /> Secure Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Panel */}
      <main className="flex-grow relative overflow-y-auto pt-[65px] lg:pt-0">
        {/* Top Header - Desktop Only */}
        <header className="hidden lg:flex sticky top-0 z-40 bg-slate-50/80 backdrop-blur-md px-8 md:px-12 py-6 items-center justify-between">
           <div 
             onClick={() => triggerToast("📍 Switch Center: Contact Kothrud Center Head for regional seat changes.")}
             className="flex items-center gap-3 cursor-pointer group"
           >
              <div className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-ping" />
              <span className="text-[10px] font-black text-slate-400 group-hover:text-primary uppercase tracking-widest transition-colors">Center: Pune Kothrud • Academic Year 2026</span>
           </div>

           <div className="flex items-center gap-6">
              <button 
                onClick={() => {
                  setUnreadAlerts(false);
                  setIsNotificationsOpen(true);
                }}
                className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 hover:text-primary transition-colors border border-slate-100 shadow-sm cursor-pointer"
              >
                 <Bell size={18} />
                 {unreadAlerts && <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />}
              </button>
              <div 
                onClick={() => setIsChildProfileOpen(true)}
                className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-xl cursor-pointer hover:scale-105 transition-transform"
              >
                 <Users size={20} />
              </div>
           </div>
        </header>

        <div className="px-8 md:px-12 py-8">
           <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                  {activeSection === 'Overview' && (
                    <DashboardContent 
                      triggerToast={triggerToast} 
                      pendingDues={pendingDues}
                      scheduledCalls={scheduledCalls}
                      onDownloadClick={() => setIsReportModalOpen(true)}
                      onChatClick={() => {
                        setSelectedChatTeacher("Dr. Vikram Sethi");
                        setIsChatOpen(true);
                      }}
                    />
                  )}
                  {activeSection === 'Fees & Billing' && (
                    <ParentFees 
                      triggerToast={triggerToast} 
                      paidAmount={paidAmount}
                      pendingDues={pendingDues}
                      transactions={transactions}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  )}
                  {activeSection === 'Academic Progress' && (
                    <ParentAcademicProgress 
                      triggerToast={triggerToast} 
                      onScheduleClick={() => setIsSchedulerOpen(true)}
                    />
                  )}
                  {activeSection === 'Attendance' && <ParentAttendance triggerToast={triggerToast} />}
                  {activeSection === 'Teacher Connect' && (
                    <ParentTeacherConnect 
                      triggerToast={triggerToast} 
                      onMessageTeacher={(name) => {
                        setSelectedChatTeacher(name);
                        setIsChatOpen(true);
                      }}
                    />
                  )}
              </motion.div>
           </AnimatePresence>
        </div>
      </main>

      {/* Modal 1: Account Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mb-8 pr-10">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-1 flex items-center gap-1.5"><Settings size={12}/> Configure Alerts</span>
                <h3 className="text-3xl font-black text-primary tracking-tight italic">Parent Settings</h3>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setIsSettingsOpen(false);
                triggerToast("⚙️ Parent preferences and secure contact numbers updated successfully!");
              }} className="space-y-6">
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-xs font-black text-primary uppercase">SMS Notifications</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Immediate daily attendance punch alerts</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={smsAlerts}
                        onChange={() => setSmsAlerts(!smsAlerts)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-xs font-black text-primary uppercase">WhatsApp Reports</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Weekly test result cards via WhatsApp</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={whatsappAlerts}
                        onChange={() => setWhatsappAlerts(!whatsappAlerts)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <div className="text-xs font-black text-primary uppercase">Monthly Email Digest</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Academic review by Advisor in PDF</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={emailDigest}
                        onChange={() => setEmailDigest(!emailDigest)}
                        className="sr-only peer" 
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Alternative Contact Number</label>
                    <input 
                      type="text" 
                      value={parentAltNumber}
                      onChange={(e) => setParentAltNumber(e.target.value)}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-indigo-500 rounded-xl font-bold text-primary text-sm" 
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                   Save Settings
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal 2: Report Card Dialog & Print Template */}
      <AnimatePresence>
        {isReportModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-2xl w-full shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer print:hidden"
              >
                <X size={18} />
              </button>

              {/* Printable Area Wrapper */}
              <div id="printable-report" className="space-y-8 pr-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-6">
                  <div>
                    <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-1 flex items-center gap-1.5"><FileText size={12}/> Verified Academic Transcript</span>
                    <h3 className="text-3xl font-black text-primary tracking-tight leading-none uppercase">EduElevate Academy</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase mt-1.5">Weekly Diagnostic & Mock Assessment Report</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">Term: Spring 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 bg-slate-50 border border-slate-100 p-6 rounded-3xl text-sm">
                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Student Name</div>
                    <div className="font-extrabold text-primary">Rohan Shrivastava</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Batch & Stream</div>
                    <div className="font-extrabold text-primary">JEE Advanced 2026 Batch</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Center Location</div>
                    <div className="font-extrabold text-primary">Pune Kothrud Branch</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Center Head Code</div>
                    <div className="font-extrabold text-primary">KTH-CH-9821</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Subject Performance Grades</div>
                  <div className="border border-slate-100 rounded-3xl overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-black text-slate-400 uppercase">
                        <tr>
                          <th className="p-4 pl-6">Subject</th>
                          <th className="p-4">Syllabus Covered</th>
                          <th className="p-4">Weekly Score</th>
                          <th className="p-4">Rank</th>
                          <th className="p-4 pr-6 text-right">Term Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50 font-bold text-slate-700">
                        <tr>
                          <td className="p-4 pl-6 text-primary">Mathematics</td>
                          <td className="p-4 font-medium">Calculus, Vectors & 3D</td>
                          <td className="p-4">98%</td>
                          <td className="p-4">AIR 8</td>
                          <td className="p-4 pr-6 text-right"><span className="text-emerald-500 font-extrabold">A+</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 pl-6 text-primary">Physics</td>
                          <td className="p-4 font-medium">Rotational Motion, KTG</td>
                          <td className="p-4">96%</td>
                          <td className="p-4">AIR 12</td>
                          <td className="p-4 pr-6 text-right"><span className="text-emerald-500 font-extrabold">A+</span></td>
                        </tr>
                        <tr>
                          <td className="p-4 pl-6 text-primary">Chemistry</td>
                          <td className="p-4 font-medium">Organic Mechanisms, Biomolecules</td>
                          <td className="p-4">88%</td>
                          <td className="p-4">AIR 24</td>
                          <td className="p-4 pr-6 text-right"><span className="text-indigo-500 font-extrabold">A</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="p-6 bg-indigo-50/50 border border-indigo-100/50 rounded-3xl">
                  <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Star size={10} fill="currentColor"/> Lead Counselor Feedback</div>
                  <p className="text-xs text-indigo-900 leading-relaxed font-semibold">
                    "Rohan maintains exceptional mastery across complex mathematics. His performance on organic integration is improving. However, we advise reviewing Rotational Dynamics formulas prior to the July Mock Diagnostic series."
                  </p>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex gap-4 mt-8 print:hidden pt-4 border-t border-slate-100">
                <button 
                  onClick={() => window.print()}
                  className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-secondary hover:text-primary transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
                >
                  <Printer size={14} /> Print Report Card
                </button>
                <button 
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-8 py-4 bg-slate-50 text-slate-500 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-slate-100 cursor-pointer hover:bg-slate-100"
                >
                  Close Preview
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal 3: Mentor Live Chat Drawer */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex justify-end print:hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Chat Box Panel */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
            >
              {/* Top border decoration */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-indigo-600" />
              
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 pt-8 pr-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-50 border-2 border-white rounded-xl flex items-center justify-center text-indigo-600 font-extrabold shadow-sm">
                    {selectedChatTeacher.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-primary tracking-tight leading-none">{selectedChatTeacher}</h4>
                    <span className="text-[9px] text-green-500 font-bold flex items-center gap-1.5 mt-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" /> Online Adviser
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages log */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                {(chats[selectedChatTeacher] || []).map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col ${msg.sender === 'parent' ? 'items-end' : 'items-start'}`}
                  >
                    <div className={`p-4 rounded-3xl max-w-[85%] text-xs leading-relaxed font-semibold shadow-sm ${
                      msg.sender === 'parent' 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-slate-400 font-medium uppercase mt-1 px-2">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSendChatMessage} className="p-6 border-t border-slate-100 bg-white flex gap-3 pr-8">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder={`Send message to ${selectedChatTeacher}...`}
                  className="flex-grow p-4 bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none rounded-2xl text-xs font-bold text-slate-700"
                />
                <button 
                  type="submit"
                  className="w-12 h-12 bg-primary text-white hover:bg-secondary hover:text-primary transition-all rounded-xl flex items-center justify-center cursor-pointer shadow-md"
                >
                  <Send size={16} />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal 4: Mentorship Call Scheduler Modal */}
      <AnimatePresence>
        {isSchedulerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsSchedulerOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-indigo-600" />

              <form onSubmit={handleScheduleCallSubmit} className="space-y-6">
                <div>
                  <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-1 flex items-center gap-1.5"><Calendar size={12}/> Advisor Scheduler</span>
                  <h3 className="text-3xl font-black text-primary tracking-tight italic">Mentorship Call</h3>
                  <p className="text-xs text-slate-400 mt-1">Book a secure 1-on-1 counseling block with lead tutors.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Academic Advisor</label>
                    <select 
                      value={selectedAdviser}
                      onChange={(e) => setSelectedAdviser(e.target.value)}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-indigo-500 rounded-xl font-bold text-primary text-sm cursor-pointer"
                    >
                      <option>Dr. Vikram Sethi (Physics PhD)</option>
                      <option>Prof. Sarah Ferguson (Bio Biotech Medalist)</option>
                      <option>Dr. Amit Deshpande (Chem PhD)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Mentorship Topic</label>
                    <select 
                      value={callTopic}
                      onChange={(e) => setCallTopic(e.target.value)}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-indigo-500 rounded-xl font-bold text-primary text-sm cursor-pointer"
                    >
                      <option>Mechanics & Trigonometry Performance Review</option>
                      <option>Time-management & JEE Stress Counseling</option>
                      <option>Organic Chemistry Mechanism Weaknesses</option>
                      <option>General Term Progress Roadmap</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                      <input 
                        type="date"
                        required
                        value={callDate}
                        onChange={(e) => setCallDate(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-indigo-500 rounded-xl font-bold text-primary text-sm cursor-pointer"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Time Block</label>
                      <select 
                        value={callTime}
                        onChange={(e) => setCallTime(e.target.value)}
                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-indigo-500 rounded-xl font-bold text-primary text-sm cursor-pointer"
                      >
                        <option>04:30 PM</option>
                        <option>05:30 PM</option>
                        <option>06:00 PM</option>
                        <option>06:30 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
                >
                  Schedule Session <ArrowRight size={16} />
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal 5: Bell Notifications Alert Center */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100 pr-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="mb-8 pr-6">
                <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-1 flex items-center gap-1.5"><Bell size={12}/> Alert Bulletin</span>
                <h3 className="text-3xl font-black text-primary tracking-tight italic">Notifications</h3>
              </div>

              <div className="space-y-4">
                {[
                  { id: 1, title: 'Weekly Physics Assessment Result', desc: 'Rohan Shrivastava scored 96% (AIR 12) in Rotational Dynamics Diagnostics package.', date: 'Today at 10:15 AM', type: 'academic' },
                  { id: 2, title: 'Secure Attendance Register', desc: 'Rohan punched in safely at Pune Kothrud Center at 08:54 AM.', date: 'Today at 08:54 AM', type: 'attendance' },
                  { id: 3, title: 'Instalment 4 Notice Reminder', desc: 'Prepayment portal for Final tuition instalment 4 (₹45,000) is open. Due by June 15.', date: 'Yesterday at 04:00 PM', type: 'billing' }
                ].map((alert) => (
                  <div key={alert.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3">
                    <div className="mt-1 text-orange-500 shrink-0"><Sparkles size={16} /></div>
                    <div>
                      <div className="text-xs font-black text-primary uppercase leading-tight">{alert.title}</div>
                      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">{alert.desc}</p>
                      <span className="text-[9px] text-slate-400 font-bold uppercase mt-2 block">{alert.date}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => setIsNotificationsOpen(false)}
                className="w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-secondary hover:text-primary transition-all cursor-pointer shadow-md mt-6"
              >
                Close Alerts
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal 6: Detailed Child Profile Dialog */}
      <AnimatePresence>
        {isChildProfileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[3.5rem] p-10 max-w-md w-full shadow-2xl relative border border-slate-100 pr-10 overflow-hidden"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsChildProfileOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 to-indigo-600" />

              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 border-4 border-white shadow-xl overflow-hidden mx-auto mb-4">
                  <img src="https://i.pravatar.cc/150?u=r1" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-black text-secondary uppercase tracking-[0.25em]">Verified Student Profile</span>
                <h3 className="text-2xl font-black text-primary tracking-tight mt-1">Rohan Shrivastava</h3>
                <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-3 py-1 rounded-full inline-block mt-2">EE-2026-9821</span>
              </div>

              <div className="space-y-4 bg-slate-50 p-6 rounded-3xl border border-slate-100 text-xs">
                <div className="flex justify-between pb-3 border-b border-slate-200/50">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Enrolled Batch</span>
                  <span className="font-extrabold text-primary">JEE Advanced 2026 Batch</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200/50">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Center Location</span>
                  <span className="font-extrabold text-primary">Pune Kothrud Branch</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-slate-200/50">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Primary Guardian</span>
                  <span className="font-extrabold text-primary">Amit Shrivastava (Father)</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Emergency Alert</span>
                  <span className="font-extrabold text-rose-500 font-mono">+91 98765 43210</span>
                </div>
              </div>

              <button 
                onClick={() => setIsChildProfileOpen(false)}
                className="w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-secondary hover:text-primary transition-all cursor-pointer shadow-md mt-6"
              >
                Close Profile
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Notification Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 p-6 bg-slate-950/95 border border-indigo-500/30 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(99,102,241,0.5)] max-w-sm flex items-start gap-4 text-white"
            style={{
              boxShadow: '0 20px 50px -10px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="flex-1">
              <h4 className="text-xs font-black tracking-tight text-white flex items-center gap-1.5 uppercase">
                System Notification <Star size={12} className="text-indigo-400 fill-indigo-400 animate-pulse" />
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {toastMsg}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
