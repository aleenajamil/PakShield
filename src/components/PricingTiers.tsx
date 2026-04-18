import React from 'react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter Node',
    price: 'PKR 15,000',
    desc: 'Essential sanitization for emerging digital startups.',
    features: ['5,000 API Scans', 'Standard Masking Rules', 'Email Support']
  },
  {
    name: 'EMI Shield',
    price: 'PKR 85,000',
    desc: 'Hardened protection for licensed Electronic Money Institutions.',
    features: ['Unlimited API Scans', 'Custom Regex Rules', 'DPoP Authentication', '24/7 Priority SOC'],
    popular: true
  },
  {
    name: 'Infrastructure',
    price: 'Custom',
    desc: 'National-scale deployment for Banks & Aggregators.',
    features: ['On-Premise Deployment', 'Hardware Security Modules', 'Dedicated Audit Cluster', 'Unlimited Scale']
  }
];

export function PricingTiers({ onAddLog }: { onAddLog: (action: string) => void }) {
  const handleRequest = (name: string) => {
    onAddLog(`${name} Request Initialized`);
    alert(`${name} plan request has been sent to the provisioning team.`);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <section className="mb-20">
        <h2 className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-[0.82] tracking-tighter mb-8 uppercase italic">
          Pricing <br />
          Deployment <br />
          <span className="text-pakshield-green">Models.</span> <br />
        </h2>
        <p className="text-xl text-gray-400 font-medium max-w-2xl">
          Scalable subscription tiers designed to support Pakistani Fintechs from 
          startup node to national infrastructure.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {tiers.map((tier, i) => (
          <div key={i} className={`relative bg-pakshield-card border rounded-2xl p-8 flex flex-col group transition-all ${
            tier.popular ? 'border-pakshield-green shadow-[0_0_40px_rgba(0,255,157,0.05)]' : 'border-pakshield-border'
          }`}>
            {tier.popular && (
              <div className="absolute top-0 right-10 -translate-y-1/2 bg-pakshield-green text-black text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                Highly Recommended
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{tier.price}</span>
                {tier.price !== 'Custom' && <span className="text-gray-500 text-xs uppercase font-bold tracking-widest">/Mo</span>}
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">{tier.desc}</p>
            <ul className="space-y-4 mb-10">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                  <Check size={14} className="text-pakshield-green shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => handleRequest(tier.name)}
              className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-sm transition-all ${
              tier.popular ? 'bg-pakshield-green text-black hover:bg-[#00e68e]' : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
            }`}>
              Initialize Request
            </button>
          </div>
        ))}
      </div>

      <div className="bg-pakshield-card border border-pakshield-border p-20 rounded-2xl text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-pakshield-green/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
        <h3 className="text-4xl font-black uppercase tracking-tighter mb-6">Enterprise Compliance Ready</h3>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed mb-10">
          Every plan includes our core regex sanitization engine, verified against SBP Technology 
          Risk Management Framework (TRMF) guidelines for fintech data security.
        </p>
        <div className="flex justify-center gap-12 grayscale opacity-40">
           <div className="h-8 w-24 bg-white/10 rounded" />
           <div className="h-8 w-24 bg-white/10 rounded" />
           <div className="h-8 w-24 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}
