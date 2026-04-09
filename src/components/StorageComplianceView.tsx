import { motion } from 'motion/react';
import { Database, ShieldAlert, Scale, AlertTriangle } from 'lucide-react';

export default function StorageComplianceView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Storage & Compliance</h2>
        <p className="text-slate-400">Data persistence strategies and legal boundary controls.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage Matrix */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">Storage Matrix</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { type: 'Raw HTML/JSON', tech: 'MongoDB Sharded Cluster', reason: 'Flexible Schema, nested structures' },
              { type: 'Structured Products', tech: 'PostgreSQL + TimescaleDB', reason: 'Strong consistency, time-series pricing' },
              { type: 'Images/Video', tech: 'MinIO Object Storage', reason: 'S3 compatible, CDN friendly' },
              { type: 'NLP Vectors', tech: 'Milvus / Pinecone', reason: 'Similarity search, deduplication' },
              { type: 'Logs/Monitoring', tech: 'ClickHouse', reason: 'High-throughput OLAP' },
            ].map((item, idx) => (
              <div key={idx} className="border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm font-medium text-slate-200">{item.type}</span>
                  <span className="text-xs font-mono text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">{item.tech}</span>
                </div>
                <p className="text-xs text-slate-500">{item.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Guard */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">Compliance Guard</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-500" />
                Legal Boundary Controls
              </h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Strict adherence to <code className="text-slate-300">robots.txt</code> protocols</li>
                <li>PII filtering for GDPR/CCPA compliance</li>
                <li>Rate limiting to human-possible thresholds (e.g., &lt;60 RPM)</li>
              </ul>
            </div>

            <div className="bg-slate-950 rounded-lg p-4 border border-slate-800">
              <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Emergency Response
              </h4>
              <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
                <li>Ban Detection via latency, status codes, and page features</li>
                <li>Exponential Backoff upon ban triggers</li>
                <li>Sub-second hot-swapping to backup nodes/proxies</li>
              </ul>
            </div>
            
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-400 leading-relaxed">
                <strong>Risk Warning:</strong> Scenarios involving "E-commerce" or "Digital Collectibles" may touch commercial secrets and system security legal boundaries. Legal compliance review and data usage authorization are mandatory before implementation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
