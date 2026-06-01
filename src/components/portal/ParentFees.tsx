import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, 
  Download, 
  ShieldCheck, 
  X, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Smartphone
} from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  amount: string;
  method: string;
  desc: string;
  status: string;
}

interface ParentFeesProps {
  triggerToast?: (msg: string) => void;
  paidAmount: number;
  pendingDues: number;
  transactions: Transaction[];
  onPaymentSuccess: (amountPaid: number, method: string) => void;
}

export const ParentFees = ({ 
  triggerToast, 
  paidAmount, 
  pendingDues, 
  transactions, 
  onPaymentSuccess 
}: ParentFeesProps) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | null>(null);
  const [paymentStep, setPaymentStep] = useState<'select' | 'input' | 'processing' | 'success'>('select');
  
  // Card form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // UPI state
  const [upiId, setUpiId] = useState('');

  const handleDownloadInvoice = (txId: string) => {
    if (triggerToast) {
      triggerToast(`📥 Invoice Verified! Downloading official fee receipt for transaction ${txId} in PDF...`);
    }
  };

  const startCheckout = () => {
    if (pendingDues <= 0) {
      if (triggerToast) {
        triggerToast("✨ All tuition installments paid in full! No outstanding dues remaining.");
      }
      return;
    }
    setPaymentMethod(null);
    setPaymentStep('select');
    setIsCheckoutOpen(true);
  };

  const handleNextStep = () => {
    if (!paymentMethod) return;
    setPaymentStep('input');
  };

  const submitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    
    // Simulate high-security banking verification
    setTimeout(() => {
      setPaymentStep('success');
      // Trigger callback to update portal-wide financial state
      onPaymentSuccess(45000, paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Net Banking');
      if (triggerToast) {
        triggerToast("🎉 Prepayment successful! Final installment registered. Receipt generated.");
      }
    }, 2800);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const paidPercent = Math.min(100, Math.round((paidAmount / 225000) * 100));

  return (
    <div className="space-y-12 pb-24">
       <div className="flex justify-between items-end">
        <div>
           <h2 className="text-4xl font-black text-primary tracking-tighter uppercase italic">Fee <span className="text-secondary">Summary.</span></h2>
           <p className="text-slate-500 font-medium">Manage tuition payments and academic insurance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Summary Card */}
         <div className="bg-primary text-white p-12 rounded-[4rem] shadow-3xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 select-none pointer-events-none"><CreditCard size={150} /></div>
            <div className="relative z-10">
               <div className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] mb-4">Total Program Fee</div>
               <div className="text-5xl font-black mb-8 tracking-tighter">₹2,25,000</div>
               
               <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-indigo-200">Paid Amount</span>
                     <span className="font-black">₹{paidAmount.toLocaleString()} ({paidPercent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${paidPercent}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-secondary" 
                     />
                  </div>
               </div>
            </div>
            
            <div className="pt-12 relative z-10 space-y-4">
               <div className="p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md">
                  <div className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Scholarship Applied</div>
                  <div className="text-sm font-bold">25% (NST 2025 Tier II)</div>
               </div>
               
               <button 
                 onClick={startCheckout}
                 disabled={pendingDues <= 0}
                 className={`w-full py-4.5 rounded-[2rem] font-black text-[10px] uppercase tracking-widest transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 ${
                   pendingDues <= 0 
                     ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none border border-slate-700' 
                     : 'bg-secondary text-primary hover:bg-white hover:scale-105 active:scale-95'
                 }`}
               >
                 {pendingDues <= 0 ? 'Fully Paid' : `Prepay Final Installment (₹${pendingDues.toLocaleString()})`}
               </button>
            </div>
         </div>

         {/* Transactions List */}
         <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-4">Transaction History</h4>
            <div className="space-y-4">
               {transactions.map((tx, i) => (
                 <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-8 bg-white border border-slate-50 rounded-[2.5rem] flex items-center justify-between group hover:shadow-xl transition-all"
                  >
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-primary transition-all"><ShieldCheck size={24} /></div>
                        <div>
                           <div className="text-sm font-black text-primary mb-1">{tx.desc}</div>
                           <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.date} • {tx.method}</div>
                        </div>
                     </div>
                     <div className="text-right flex items-center gap-8">
                        <div>
                           <div className="text-xl font-black text-primary">{tx.amount}</div>
                           <div className="text-[10px] font-bold text-green-500 uppercase tracking-widest">{tx.status}</div>
                        </div>
                        <button 
                          onClick={() => handleDownloadInvoice(tx.id)}
                          className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center hover:text-primary hover:bg-slate-100 transition-all cursor-pointer"
                        >
                          <Download size={18} />
                        </button>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </div>

      {/* Checkout Modal / Gateway Portal */}
      <AnimatePresence>
        {isCheckoutOpen && (
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
              className="bg-white rounded-[3.5rem] p-10 max-w-lg w-full shadow-2xl relative border border-slate-100 overflow-hidden"
            >
              {/* Top border decor */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-400 to-indigo-600" />
              
              {/* Close Button */}
              <button 
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all hover:rotate-90 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Steps Progress */}
              {paymentStep !== 'success' && (
                <div className="flex gap-4 items-center mb-8 border-b border-slate-50 pb-6 pr-10">
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    paymentStep === 'select' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'
                  }`}>1. Method</span>
                  <span className="text-slate-300">→</span>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    paymentStep === 'input' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'
                  }`}>2. Details</span>
                  <span className="text-slate-300">→</span>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full ${
                    paymentStep === 'processing' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'
                  }`}>3. Verify</span>
                </div>
              )}

              {/* Step 1: Select Method */}
              {paymentStep === 'select' && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] font-black text-secondary tracking-widest uppercase mb-1 flex items-center gap-1.5"><Lock size={12}/> Secure Payment Gate</span>
                    <h3 className="text-3xl font-black text-primary tracking-tight italic">Prepay Fees</h3>
                    <p className="text-xs text-slate-400 mt-1">Prepay remaining Final Installment of <span className="font-extrabold text-primary">₹{pendingDues.toLocaleString()}</span></p>
                  </div>

                  <div className="space-y-3">
                    <button 
                      onClick={() => setPaymentMethod('upi')}
                      className={`w-full p-6 rounded-3xl border flex items-center justify-between transition-all text-left cursor-pointer ${
                        paymentMethod === 'upi' ? 'border-orange-500 bg-orange-50/30' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-500"><Smartphone size={20}/></div>
                        <div>
                          <div className="text-xs font-black text-primary uppercase">UPI / QR Code</div>
                          <div className="text-[10px] text-slate-400 font-semibold">GPay, PhonePe, Paytm, BHIM</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'upi' ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                      }`}>
                        {paymentMethod === 'upi' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full p-6 rounded-3xl border flex items-center justify-between transition-all text-left cursor-pointer ${
                        paymentMethod === 'card' ? 'border-orange-500 bg-orange-50/30' : 'border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-500"><CreditCard size={20}/></div>
                        <div>
                          <div className="text-xs font-black text-primary uppercase">Credit / Debit Card</div>
                          <div className="text-[10px] text-slate-400 font-semibold">Visa, MasterCard, RuPay</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'card' ? 'border-orange-500 bg-orange-500' : 'border-slate-300'
                      }`}>
                        {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </button>
                  </div>

                  <button 
                    onClick={handleNextStep}
                    disabled={!paymentMethod}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 ${
                      paymentMethod 
                        ? 'bg-primary text-white hover:bg-secondary hover:text-primary shadow-xl' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Step 2: Input Details */}
              {paymentStep === 'input' && (
                <form onSubmit={submitPayment} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-primary tracking-tight">Enter Payment Details</h3>
                    <p className="text-xs text-slate-400">Secure 256-bit encrypted SSL checkout</p>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="space-y-6">
                      <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-3xl text-center">
                        <div className="w-36 h-36 bg-white border border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden p-2">
                          {/* Styled high-tech QR code simulation */}
                          <div className="absolute inset-2 border-2 border-slate-900 border-dashed animate-pulse opacity-10" />
                          <img 
                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=eduelevate-academy-upi-payment" 
                            alt="Payment QR" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-4">Scan QR to pay ₹{pendingDues.toLocaleString()}</span>
                        <div className="w-full flex items-center my-4">
                          <hr className="flex-1 border-slate-200" />
                          <span className="px-3 text-[10px] font-bold text-slate-300 uppercase">OR USE UPI ID</span>
                          <hr className="flex-1 border-slate-200" />
                        </div>
                        <input 
                          type="text" 
                          placeholder="parent@upi"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full px-6 py-4 bg-white border border-slate-200 outline-none focus:border-orange-500 rounded-2xl font-bold text-primary text-center text-sm"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Cardholder Name</label>
                        <input 
                          type="text" 
                          placeholder="AMIT SHRIVASTAVA"
                          required
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value.toUpperCase())}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Card Number</label>
                        <input 
                          type="text" 
                          placeholder="4532 8812 9011 2341"
                          maxLength={19}
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm tracking-widest"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Expiry Date</label>
                          <input 
                            type="text" 
                            placeholder="MM/YY"
                            maxLength={5}
                            required
                            value={expiry}
                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm tracking-wider text-center"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                          <input 
                            type="password" 
                            placeholder="•••"
                            maxLength={3}
                            required
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/gi, ''))}
                            className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 outline-none focus:border-orange-500 rounded-xl font-bold text-primary text-sm tracking-widest text-center"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 mt-6">
                    <button 
                      type="button" 
                      onClick={() => setPaymentStep('select')}
                      className="px-6 py-4 bg-slate-50 text-slate-500 font-black uppercase text-[10px] tracking-widest border border-slate-100 rounded-2xl cursor-pointer hover:bg-slate-100"
                    >
                      Back
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] shadow-lg hover:bg-indigo-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      Authorize Payment of ₹{pendingDues.toLocaleString()}
                    </button>
                  </div>
                </form>
              )}

              {/* Step 3: Processing */}
              {paymentStep === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="relative flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                    <div className="absolute text-indigo-600"><Lock size={24}/></div>
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-primary uppercase tracking-tight">Verifying with Bank...</h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">Processing payment. Please do not close the window or click back.</p>
                  </div>
                </div>
              )}

              {/* Step 4: Success */}
              {paymentStep === 'success' && (
                <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 10 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  >
                    <CheckCircle2 size={40} />
                  </motion.div>
                  
                  <div>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">TRANSACTION SUCCESSFUL</span>
                    <h4 className="text-3xl font-black text-primary tracking-tight mt-1">Payment Completed!</h4>
                    <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">Thank you. An amount of ₹{pendingDues.toLocaleString()} has been received. Installment 4 is registered.</p>
                  </div>

                  <div className="w-full bg-slate-50 border border-slate-100 p-6 rounded-3xl text-left space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Receipt ID:</span>
                      <span className="text-primary font-black">EE-REC-{Math.floor(100000 + Math.random() * 900000)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Date/Time:</span>
                      <span className="text-primary font-black">Jun 01, 2026, 03:26 PM</span>
                    </div>
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Payment Method:</span>
                      <span className="text-primary font-black">{paymentMethod === 'card' ? 'Visa Card' : 'UPI Gateway'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setIsCheckoutOpen(false)}
                    className="w-full py-4.5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-secondary hover:text-primary transition-all cursor-pointer shadow-md"
                  >
                    Close Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
