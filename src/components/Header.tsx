import { Circle } from 'lucide-react';

interface HeaderProps {
  activeView: string;
  onOpenSecurePortal: () => void;
  onOpenSupport: () => void;
}

export function Header({ activeView, onOpenSecurePortal, onOpenSupport }: HeaderProps) {
  const getViewName = () => {
    switch (activeView) {
      case 'detection': return 'Detection Engine';
      case 'masking': return 'Masking Rules';
      case 'audit': return 'Audit Logs';
      case 'compliance': return 'SBP Compliance';
      case 'pricing': return 'Pricing Tiers';
      default: return 'System Admin';
    }
  };

  return (
    <header className="h-20 border-b border-pakshield-border px-8 flex items-center justify-between bg-pakshield-bg/50 backdrop-blur-md sticky top-0 z-30 shrink-0">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Circle size={8} className="text-pakshield-green fill-pakshield-green animate-pulse" />
          <div className="absolute inset-0 bg-pakshield-green blur-sm rounded-full opacity-50" />
        </div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
          Scanner Node: {getViewName()}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onOpenSupport}
          className="text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-widest"
        >
          Support
        </button>
        <button 
          onClick={onOpenSecurePortal}
          className="bg-white text-black px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-lg shadow-white/5 uppercase"
        >
          Secure Portal
        </button>
      </div>
    </header>
  );
}
