import React from 'react';
import { FileText, Shield, CheckCircle2, Download, ExternalLink, Lock } from 'lucide-react';

const blocks = [
  { 
    section: 'SECTION 4.2: DATA PRIVACY', 
    title: 'Masking of PII (CNIC/Accounts) in logs and persistent storage.',
    status: 'COMPLIANT',
    icon: FileText
  },
  { 
    section: 'SECTION 7.1: API INTEGRITY', 
    title: 'Implementation of DPoP (Proof of Possession) for all fintech endpoints.',
    status: 'COMPLIANT',
    icon: Shield
  },
  { 
    section: 'SECTION 3.1: LOG INTEGRITY', 
    title: 'Tamper-evident audit trails for all data access events.',
    status: 'PENDING',
    icon: FileText
  },
  { 
    section: 'SECTION 5.5: SECURE AUTH', 
    title: 'Multi-factor authentication for administrative dashboards.',
    status: 'PENDING',
    icon: Shield
  }
];

export function ComplianceRoadmap({ onAddLog }: { onAddLog: (action: string) => void }) {
  const handleDownload = () => {
    // Simulate PDF download
    const content = "PakShield SBP Compliance Report\nGenerated: " + new Date().toISOString() + "\n\nScore: 88/100\nStatus: Secure";
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'PakShield_SBP_Audit_Report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    onAddLog('Compliance PDF Exported');
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <section className="mb-16">
        <h2 className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-[0.82] tracking-tighter mb-6 uppercase italic">
          SBP <br />
          Cyber <br />
          <span className="text-pakshield-green">Shield.</span>
        </h2>
        <p className="text-xl text-gray-400 font-medium max-w-2xl leading-relaxed">
          Adherence tracker for State Bank of Pakistan TRM Framework and Cyber 
          Shield 2026 security mandates.
        </p>
      </section>

      {/* Main Stats Card */}
      <div className="bg-pakshield-green border border-pakshield-green/20 p-10 rounded-2xl mb-12 shadow-[0_20px_40px_rgba(0,255,157,0.1)] group overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
           <Shield size={160} className="text-black" />
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-black/20 rounded-lg">
                <CheckCircle2 size={24} className="text-black" />
             </div>
             <h3 className="text-black font-black uppercase tracking-[0.2em] text-sm">National Compliance Roadmap</h3>
          </div>
          <div className="pt-2">
             <p className="text-black/80 font-mono text-xs uppercase tracking-widest font-bold">
               Audit Score: 88/100 • Critical Status Verified
             </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-20">
        {blocks.map((block, i) => (
          <div key={i} className="bg-pakshield-card border border-pakshield-border p-8 rounded-2xl flex items-center justify-between group hover:bg-white/[0.01] transition-all">
            <div className="flex items-center gap-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 group-hover:text-pakshield-green transition-colors">
                <block.icon size={24} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{block.section}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{block.title}</h3>
              </div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border flex items-center gap-1.5 ${
                block.status === 'COMPLIANT' 
                ? 'bg-pakshield-green/10 text-pakshield-green border-pakshield-green/20' 
                : 'bg-white/5 text-gray-500 border-white/10'
              }`}>
                {block.status === 'COMPLIANT' && <CheckCircle2 size={10} />}
                {block.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-pakshield-card border border-pakshield-border p-12 rounded-2xl space-y-8">
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Policy Export</h4>
          <p className="text-xl font-bold tracking-tight">Generated PDF report for SBP audit committee (Internal Use)</p>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pakshield-green hover:underline cursor-pointer"
          >
            <Download size={14} />
            Download Report
          </button>
        </div>
        <div className="bg-pakshield-card border border-pakshield-border p-12 rounded-2xl space-y-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity">
            <Lock size={64} className="text-pakshield-green" />
          </div>
          <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Regional Specs</h4>
          <p className="text-xl font-bold tracking-tight">Localized rules for 1-Link and M-Net inter-bank networks.</p>
          <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pakshield-green hover:underline">
            <ExternalLink size={14} />
            View Specs
          </button>
        </div>
      </div>
    </div>
  );
}
