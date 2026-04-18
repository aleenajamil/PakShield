import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Hash, CreditCard } from 'lucide-react';

export function MaskingRules() {
  const [testCnic, setTestCnic] = useState("42101-1234567-1");
  const [testAcc, setTestAcc] = useState("12345678901234");

  const maskCnic = (val: string) => val.replace(/\b\d{5}-\d{7}-\d\b/g, (c) => `${c.slice(0, 6)}*******-${c.slice(-1)}`);
  const maskAcc = (val: string) => val.replace(/\b(\d{4})(\d{8,10})(\d{2})\b/g, (_, s, m, e) => `${s}${'*'.repeat(m.length)}${e}`);

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <section className="mb-20">
        <h2 className="text-[5rem] font-black leading-[0.85] tracking-tighter mb-8 uppercase italic">
          Masking <br />
          Engine <br />
          <span className="text-pakshield-green">Rules.</span>
        </h2>
        <p className="text-xl text-gray-400 font-medium max-w-2xl">
          Configure granular redaction patterns for Pakistani identity documents and 
          regional bank account formats.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-pakshield-green">
            <Hash size={24} />
            <h3 className="text-xl font-bold uppercase tracking-tight">CNIC Masking</h3>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Strict regex validation against 13-digit identity formats (00000-0000000-0) and redacts 
            the central block. Preserves the first 5 digits (district) and last digit (gender).
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 text-pakshield-green">
            <CreditCard size={24} />
            <h3 className="text-xl font-bold uppercase tracking-tight">Account Number Masking</h3>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Redacts 14-16 digit bank accounts, preserving first 4 and last 2 
            digits. Ensures audit trails never contain plaintext financial IDs.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Regex Preview</span>
        <div className="grid grid-cols-2 bg-pakshield-card border border-pakshield-border rounded-2xl overflow-hidden divide-x divide-pakshield-border">
          <div className="p-8 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Input Pattern</label>
              <input 
                value={testCnic}
                onChange={(e) => setTestCnic(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-lg px-6 py-4 font-mono text-white outline-none focus:border-pakshield-green/20"
              />
            </div>
            <div className="space-y-2">
              <div className="flex gap-4 font-mono text-[11px] text-gray-500 uppercase">
                <span>Regexp</span>
                <span className="text-pakshield-green">\b\d{"{5}"}-\d{"{7}"}-\d\b</span>
              </div>
              <div className="flex gap-4 font-mono text-[11px] text-gray-500 uppercase">
                <span>Replace</span>
                <span className="text-pakshield-green">$1-*******-$3</span>
              </div>
            </div>
          </div>
          <div className="p-8 space-y-8 bg-pakshield-green/[0.02]">
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-pakshield-green uppercase tracking-widest">Masked Output</label>
              <div className="w-full bg-black/40 border border-pakshield-green/20 rounded-lg px-6 py-4 font-mono text-pakshield-green shadow-[0_0_20px_rgba(0,255,157,0.05)]">
                {maskCnic(testCnic)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
