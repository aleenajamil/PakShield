import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { LogEntry } from '../types';
import { cn } from '../lib/utils';

interface AuditLogsProps {
  logs: LogEntry[];
}

export function AuditLogs({ logs }: AuditLogsProps) {
  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <section className="mb-20">
        <h2 className="text-[clamp(3.5rem,10vw,7rem)] font-black leading-[0.82] tracking-tighter mb-8 uppercase italic">
          Log <br />
          History. <br />
        </h2>
        <p className="text-xl text-gray-400 font-medium max-w-2xl">
          Real-time records of every detection, masking, and validation event 
          processed by the PakShield engine.
        </p>
      </section>

      <div className="bg-pakshield-card border border-pakshield-border rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-black/50 border-b border-pakshield-border">
            <tr>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Timestamp</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Action</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
              <th className="px-8 py-5 text-[10px] font-bold text-gray-500 uppercase tracking-widest text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pakshield-border font-mono text-xs">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6 text-gray-400">{log.time}</td>
                <td className="px-8 py-6 text-white font-bold">{log.action}</td>
                <td className="px-8 py-6">
                  <div className={cn(
                    "flex items-center gap-2",
                    log.status === 'Success' ? "text-pakshield-green" : "text-red-500"
                  )}>
                    {log.status === 'Success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                    <span className="uppercase tracking-widest font-black text-[10px]">{log.status}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <span className="text-gray-600 group-hover:text-pakshield-green transition-colors cursor-default">
                    {log.verificationId}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="p-8 border-t border-pakshield-border bg-black/20 text-center">
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Showing last 24 hours of secure traffic</p>
        </div>
      </div>
    </div>
  );
}
