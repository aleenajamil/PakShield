import { Activity, Shield, FileText, Lock, LayoutGrid, Terminal } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const navItems = [
  { 
    id: 'detection', 
    label: 'Detection Engine', 
    icon: Activity, 
    desc: 'Real-time PII pattern matching'
  },
  { 
    id: 'masking', 
    label: 'Masking Rules', 
    icon: Terminal,
    desc: 'Regex-based data transformation'
  },
  { 
    id: 'audit', 
    label: 'Audit Logs', 
    icon: FileText,
    desc: 'Traceable security events'
  },
  { 
    id: 'compliance', 
    label: 'SBP Compliance', 
    icon: Shield,
    desc: 'TRM framework adherence status'
  },
  { 
    id: 'pricing', 
    label: 'Pricing Tiers', 
    icon: LayoutGrid,
    desc: 'Scaling and deployment models'
  },
];

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <aside className="w-64 border-r border-pakshield-border h-screen flex flex-col bg-pakshield-bg shrink-0">
      <div className="p-8">
        <h1 className="text-2xl font-black tracking-tighter text-pakshield-green italic">
          PAKSHIELD<span className="text-white">.</span>
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 relative">
        <p className="px-4 text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-4">
          Nav System
        </p>
        {navItems.map((item) => (
          <div 
            key={item.id} 
            className="relative"
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-left relative z-10",
                activeView === item.id 
                  ? "bg-pakshield-green/10 text-pakshield-green border border-pakshield-green/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
              )}
            >
              <item.icon size={18} className={cn(activeView === item.id ? "text-pakshield-green" : "text-gray-400 group-hover:text-white")} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>

            <AnimatePresence>
              {hoveredItem === item.id && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute left-full ml-4 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                >
                  <div className="bg-pakshield-card border border-pakshield-border px-3 py-2 rounded-lg shadow-2xl whitespace-nowrap">
                    <div className="text-[10px] font-bold text-pakshield-green uppercase tracking-widest mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium">
                      {item.desc}
                    </div>
                    {/* Tooltip Arrow */}
                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 border-8 border-transparent border-r-pakshield-border" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="p-6">
        <div className="bg-pakshield-green/5 border border-pakshield-green/10 rounded-xl p-4">
          <div className="text-[10px] font-bold text-pakshield-green uppercase tracking-wider mb-2">
            SBP TRM FRAMEWORK
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed font-mono">
            SEC 4.2: DATA PRIVACY COMPLIANT STATUS
          </p>
        </div>
      </div>
    </aside>
  );
}
