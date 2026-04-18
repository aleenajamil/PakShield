import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Mail, Phone, Send, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLog: (action: string) => void;
}

export function SupportModal({ isOpen, onClose, onAddLog }: SupportModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      onAddLog('Support Ticket Initialized');
      
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-pakshield-card border border-pakshield-border w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="px-6 py-4 border-b border-pakshield-border flex items-center justify-between bg-pakshield-bg">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white">Contact PakShield SOC</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 text-center group cursor-pointer hover:border-pakshield-green/30 transition-colors">
              <Mail className="text-pakshield-green mb-1" size={24} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Email Terminal</span>
              <span className="text-xs font-mono text-white">SOC@PAKSHIELD.PK</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex flex-col items-center gap-2 text-center group cursor-pointer hover:border-pakshield-green/30 transition-colors">
              <Phone className="text-pakshield-green mb-1" size={24} />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Direct Line</span>
              <span className="text-xs font-mono text-white">+92-21-344-9921</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Submit a Priority Ticket</p>
            
            <input 
              required
              type="text" 
              placeholder="Subject (e.g. Compliance Audit Inquiry)"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-pakshield-green/30 transition-colors text-white"
            />
            
            <textarea 
              required
              rows={4}
              placeholder="Describe the technical or compliance issue..."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-pakshield-green/30 transition-colors resize-none text-white"
            />

            <button 
              disabled={isSubmitting || submitted}
              className={cn(
                "w-full font-black uppercase text-xs tracking-[0.2em] py-4 rounded-sm transition-all flex items-center justify-center gap-2",
                submitted 
                  ? "bg-pakshield-green text-black" 
                  : "bg-pakshield-green text-black hover:bg-[#00e68e] disabled:opacity-50"
              )}
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={14} />}
              {submitted ? 'TICKET INITIALIZED ✅' : isSubmitting ? 'INITIALIZING...' : 'Initialize Request'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
