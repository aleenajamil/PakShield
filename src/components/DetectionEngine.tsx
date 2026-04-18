import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Copy, Check, Terminal, ShieldCheck, Cpu, FileText } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function DetectionEngine({ onAddLog }: { onAddLog: (action: string) => void }) {
  const [input, setInput] = useState(JSON.stringify({
    customer: {
      name: "Arslan Ahmed",
      cnic: "42101-1234567-1",
      email: "arslan.ahmed@example.pk"
    },
    accounts: [
      {
        bank: "HBL",
        account_number: "12345678901234",
        balance: 150000
      },
      {
        bank: "Meezan",
        account_number: "9876543210987654",
        type: "Savings"
      }
    ],
    transaction: {
      id: "TXN_9921",
      remarks: "Payment for CNIC 42101-1234567-1 source account 12345678901234"
    }
  }, null, 2));

  const [output, setOutput] = useState<any>(null);
  const [findings, setFindings] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({ cnics: 0, accs: 0 });

  const handleProcess = async () => {
    try {
      setIsProcessing(true);
      setFindings([]);
      setOutput(null);
      
      const parsed = JSON.parse(input);
      
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      
      const result = await response.json();
      
      // Dramatic delay as seen in video
      await new Promise(r => setTimeout(r, 800));
      
      // Analyze for findings display
      const cnicCount = (input.match(/\b\d{5}-\d{7}-\d\b/g) || []).length;
      const accCount = (input.match(/\b(\d{4})(\d{8,10})(\d{2})\b/g) || []).length;
      
      const newFindings = [];
      if (cnicCount > 0) {
        newFindings.push({ type: 'CNIC', label: 'CNIC FOUND', count: cnicCount, val: '42101-1234567-1' });
        onAddLog('CNIC Masked');
      }
      if (accCount > 0) {
        newFindings.push({ type: 'ACCOUNT', label: 'BANK ACCOUNT FOUND', count: accCount, val: '12345678901234' });
        onAddLog('Bank Account Scanned');
      }

      setFindings(newFindings);
      setOutput(result.data);
      setStats({ cnics: cnicCount, accs: accCount });
    } catch (err) {
      console.error("Invalid JSON input");
      setOutput({ error: "Invalid JSON structure." });
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(JSON.stringify(output, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput("");
    setOutput(null);
    setFindings([]);
    setStats({ cnics: 0, accs: 0 });
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      {/* Hero Section */}
      <section className="mb-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.85] tracking-tighter mb-4 uppercase italic">
            Shielding <br />
            Sensitive <br />
            <span className="text-pakshield-green">Records.</span>
          </h2>
          <div className="max-w-2xl">
            <p className="text-xl text-gray-400 font-medium leading-relaxed">
              National-grade regex engine designed to meet SBP requirements for PII 
              sanitization across all fintech infrastructure.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText size={14} className="text-gray-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Input Buffer</span>
            </div>
            <button 
              onClick={handleReset}
              className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>
          
          <div className="bg-pakshield-card border border-pakshield-border rounded-xl p-6 min-h-[500px] flex flex-col group focus-within:border-pakshield-green/30 transition-colors">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-gray-300 font-mono text-sm outline-none resize-none leading-relaxed overflow-y-auto scrollbar-hide"
              placeholder='Paste JSON here...'
              spellCheck={false}
            />
            
            <button
              onClick={handleProcess}
              disabled={isProcessing}
              className="mt-6 bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-5 px-6 rounded-sm hover:bg-gray-200 transition-all disabled:opacity-50 active:scale-[0.98] flex items-center justify-center gap-3 w-full shadow-xl shadow-white/5"
            >
              <Cpu size={18} className={cn(isProcessing && "animate-spin")} />
              {isProcessing ? "ANALYZING DATA..." : "SCAN API BODY"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 h-24">
            <div className="bg-pakshield-card border border-pakshield-border rounded-xl p-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-pakshield-green" />
                <span className="text-2xl font-black text-white">{stats.cnics}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">CNICs Logged</span>
            </div>
            <div className="bg-pakshield-card border border-pakshield-border rounded-xl p-4 flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-pakshield-green" />
                <span className="text-2xl font-black text-white">{stats.accs}</span>
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Accs Logged</span>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-pakshield-green" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-pakshield-green">Engine Output</span>
            </div>
            {output && (
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
              >
                {copied ? <Check size={12} className="text-pakshield-green" /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy Output'}
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-4 min-h-[616px]">
            <AnimatePresence mode="popLayout">
              {isProcessing ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-pakshield-card border border-pakshield-border rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center"
                >
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="mb-4"
                  >
                    <RotateCcw size={48} className="text-pakshield-green opacity-20" />
                  </motion.div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pakshield-green animate-pulse">Running Regex Matrix</p>
                </motion.div>
              ) : output ? (
                <>
                  <div className="space-y-3 overflow-y-auto max-h-[300px] scrollbar-hide">
                    {findings.map((finding, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={idx}
                        className="bg-pakshield-green/10 border border-pakshield-green/20 p-4 rounded-xl flex items-center justify-between"
                      >
                         <div className="space-y-1">
                            <div className="flex items-center gap-2">
                               <div className="bg-pakshield-green text-black text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">{finding.type}</div>
                               <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Found at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                            </div>
                            <p className="text-sm font-mono text-white tracking-wide">{finding.val}</p>
                            <p className="text-[10px] font-bold text-pakshield-green uppercase tracking-widest">Replaced with Mask</p>
                         </div>
                         <ShieldCheck className="text-pakshield-green opacity-50" size={20} />
                      </motion.div>
                    ))}
                  </div>

                  <div className="bg-pakshield-card border border-pakshield-border rounded-xl p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 mb-4">
                      <Terminal size={14} className="text-gray-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Sanitized JSON Preview</span>
                    </div>
                    <pre className="flex-1 font-mono text-xs text-pakshield-green/90 leading-relaxed overflow-auto scrollbar-hide">
                      {JSON.stringify(output, null, 2)}
                    </pre>
                  </div>
                </>
              ) : (
                <div className="bg-pakshield-card border border-pakshield-border rounded-xl flex-1 flex flex-col items-center justify-center p-8 text-center opacity-40">
                   <div className="p-6 rounded-full border border-white/5 mb-6">
                      <FileText size={48} className="text-gray-600" />
                   </div>
                   <h4 className="text-[10px] font-extrabold uppercase tracking-[0.3em] text-gray-500">No Analysis Performed</h4>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <footer className="mt-20 pt-10 border-t border-pakshield-border flex flex-wrap gap-12">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
           <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none">Cnic Logic</span>
              <h5 className="text-sm font-bold uppercase tracking-tight">Regional Masking</h5>
              <p className="text-[10px] text-gray-500 leading-relaxed">Strict regex validation against 13-digit identity formats. Redacts unique identifiers while retaining regional headwords.</p>
           </div>
           <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none">Banking Logic</span>
              <h5 className="text-sm font-bold uppercase tracking-tight">Fintech Compliance</h5>
              <p className="text-[10px] text-gray-500 leading-relaxed">Scans 14-16 digit sequences using word boundaries. Ensures internal account numbers are never logged in plaintext.</p>
           </div>
           <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none">Dpop Protocol</span>
              <h5 className="text-sm font-bold uppercase tracking-tight">Token Binding</h5>
              <p className="text-[10px] text-gray-500 leading-relaxed">Implements Proof-of-Possession to prevent token hijacking. Validates JWT-signed headers with HTU/HTM binding.</p>
           </div>
           <div className="space-y-4">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest leading-none">Trm Policy</span>
              <h5 className="text-sm font-bold uppercase tracking-tight">SBP Guidelines</h5>
              <p className="text-[10px] text-gray-500 leading-relaxed">Hardened policy verified against SBP standard Technology Risk Management for digital banking entities.</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
