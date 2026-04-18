/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DetectionEngine } from './components/DetectionEngine';
import { MaskingRules } from './components/MaskingRules';
import { AuditLogs } from './components/AuditLogs';
import { ComplianceRoadmap } from './components/ComplianceRoadmap';
import { PricingTiers } from './components/PricingTiers';
import { SecurePortalModal } from './components/SecurePortalModal';
import { SupportModal } from './components/SupportModal';
import { AnimatePresence, motion } from 'motion/react';
import { LogEntry } from './types';

export default function App() {
  const [activeView, setActiveView] = useState('detection');
  const [isSecurePortalOpen, setIsSecurePortalOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: '14:35:48', action: 'Sanitized JSON Exported', status: 'Success', verificationId: '0x8A2C3E91' },
    { time: '14:31:05', action: 'Access Token Binded', status: 'Success', verificationId: '0xBD421A0F' },
  ]);

  const addLog = useCallback((action: string, status: 'Success' | 'Failed' = 'Success') => {
    const newLog: LogEntry = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }),
      action,
      status,
      verificationId: `0x${Math.random().toString(16).slice(2, 10).toUpperCase()}`
    };
    setLogs(prev => [newLog, ...prev]);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'detection': return <DetectionEngine onAddLog={addLog} />;
      case 'masking': return <MaskingRules />;
      case 'audit': return <AuditLogs logs={logs} />;
      case 'compliance': return <ComplianceRoadmap onAddLog={addLog} />;
      case 'pricing': return <PricingTiers onAddLog={addLog} />;
      default: return <DetectionEngine onAddLog={addLog} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-pakshield-bg">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          activeView={activeView}
          onOpenSecurePortal={() => setIsSecurePortalOpen(true)} 
          onOpenSupport={() => setIsSupportOpen(true)}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <SecurePortalModal 
        isOpen={isSecurePortalOpen} 
        onClose={() => setIsSecurePortalOpen(false)} 
        onAddLog={addLog}
      />

      <SupportModal 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
        onAddLog={addLog}
      />
    </div>
  );
}
