import React, { useState } from 'react';
import { generateKeyPair, SignJWT, exportJWK } from 'jose';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, Lock, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function SecurePortalModal({ isOpen, onClose, onAddLog }: { isOpen: boolean; onClose: () => void; onAddLog: (action: string, status?: 'Success' | 'Failed') => void }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [simulateAttack, setSimulateAttack] = useState(false);

  const testSecureEndpoint = async () => {
    try {
      setLoading(true);
      setError(null);
      setResult(null);
      onAddLog(simulateAttack ? 'DPoP Replay Simulation Initiated' : 'DPoP Signature Initiated');

      // 1. Generate key pair on client
      const { privateKey, publicKey } = await generateKeyPair('ES256');
      const jwk = await exportJWK(publicKey);
      jwk.alg = 'ES256';

      // 2. Create DPoP Proof
      // If simulating an attack, we provide a mismatched HTU (URL) 
      // to simulate a token being replayed on a different endpoint.
      const htu = simulateAttack 
        ? `${window.location.origin}/api/malicious_endpoint` 
        : `${window.location.origin}/api/secure`;
      
      const dpopToken = await new SignJWT({
        htu: htu,
        htm: 'POST',
        iat: Math.floor(Date.now() / 1000),
        jti: Math.random().toString(36).slice(2),
      })
        .setProtectedHeader({ alg: 'ES256', typ: 'dpop+jwt', jwk })
        .sign(privateKey);

      // 3. Call Secure Endpoint
      const response = await fetch('/api/secure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-bearer-token',
          'DPoP': dpopToken
        },
        body: JSON.stringify({
          secret_note: simulateAttack ? "MALICIOUS ACCESS ATTEMPT" : "Accessing high-value fintech vectors via DPoP channel.",
          privileged_data: {
            bank_id: "SBP-PK-001",
            auth_level: simulateAttack ? "UNAUTHORIZED" : "Tier-1"
          }
        })
      });

      const data = await response.json();
      if (!response.ok) {
        onAddLog(simulateAttack ? 'Attack Blocked: Invalid HTU' : 'DPoP Signature Failed', 'Failed');
        throw new Error(data.error || 'Identity verification failed');
      }
      
      onAddLog('DPoP Signature Verified');
      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
        className="relative bg-pakshield-card border border-pakshield-border w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
      >
        <div className="px-6 py-4 border-b border-pakshield-border flex items-center justify-between bg-pakshield-bg">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-pakshield-green" />
            <h3 className="text-sm font-bold uppercase tracking-widest">DPoP Secure Portal</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-8">
          <div className="flex items-center justify-between mb-8 p-4 bg-red-500/5 border border-red-500/10 rounded-xl group cursor-pointer" onClick={() => setSimulateAttack(!simulateAttack)}>
            <div className="space-y-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-red-500 group-hover:text-red-400 transition-colors">
                Attack Simulation Mode
              </h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                Simulate a Replay Attack by misaligning the DPoP proof URL.
              </p>
            </div>
            <div className={cn(
              "w-10 h-5 rounded-full relative transition-colors duration-300",
              simulateAttack ? "bg-red-500" : "bg-gray-800"
            )}>
              <div className={cn(
                "absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300",
                simulateAttack ? "left-6" : "left-1"
              )} />
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            This portal utilizes RFC 9449 compliant DPoP (Demonstrating Proof-of-Possession) 
            at the Application Layer. A unique cryptographic proof is generated on each 
            request to bind the token to this specific client session.
          </p>

          <div className="space-y-6">
            <button
              onClick={testSecureEndpoint}
              disabled={loading}
              className="w-full bg-white text-black font-black uppercase text-xs tracking-[0.2em] py-4 rounded-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
              {loading ? 'Generating Proof...' : 'Initiate Secure handshake'}
            </button>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-start gap-3"
              >
                <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 leading-normal">{error}</p>
              </motion.div>
            )}

            {result && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-pakshield-green/5 border border-pakshield-green/10 p-6 rounded-lg space-y-4"
              >
                <div className="flex items-center gap-2 text-pakshield-green">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Verification Successful</span>
                </div>
                <div className="font-mono text-[11px] text-gray-300 leading-relaxed bg-black/40 p-4 rounded border border-white/5 overflow-auto max-h-48">
                  <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-pakshield-bg border-t border-pakshield-border flex justify-between items-center">
          <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">PAKSHIELD SECURE NODES</span>
          <span className="text-[9px] font-mono text-gray-500">v2.4.0-STABLE</span>
        </div>
      </motion.div>
    </div>
  );
}
