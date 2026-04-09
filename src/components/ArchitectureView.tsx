import { motion } from 'motion/react';
import { MonitorPlay, Settings, Network, Database, Cpu } from 'lucide-react';

export default function ArchitectureView() {
  const layers = [
    {
      name: 'Application Layer',
      desc: 'Task Scheduling, Quality Monitoring, NLP Engine, Analytics',
      icon: MonitorPlay,
      color: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
      items: ['Task Scheduler', 'Data Quality Monitor', 'NLP Processing', 'BI Reports']
    },
    {
      name: 'Core Engine Layer',
      desc: 'Routing, Parsing, Anti-bot Evasion, Protocol Adapters',
      icon: Settings,
      color: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      items: ['Smart Router', 'Dynamic Parser', 'Anti-bot Center', 'Protocol Adapter']
    },
    {
      name: 'Execution Layer',
      desc: 'Web, App, Reverse Engineering, Browser Pools, APIs',
      icon: Cpu,
      color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      items: ['Web Crawler (Scrapy)', 'App Proxy (Frida)', 'Reverse Engine', 'Browser Pool (CDP)', 'API Gateway']
    },
    {
      name: 'Infrastructure Layer',
      desc: 'Proxies, Cloud Devices, Captcha Solving, Fingerprinting',
      icon: Network,
      color: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      items: ['Residential Proxies', 'Cloud Mobile Devices', 'Captcha Solver', 'Fingerprint Masking', 'Crypto Service']
    },
    {
      name: 'Storage Layer',
      desc: 'Document, Relational, Search, Object Storage',
      icon: Database,
      color: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      items: ['MongoDB', 'PostgreSQL', 'Elasticsearch', 'S3 / MinIO']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">System Architecture</h2>
        <p className="text-slate-400">A layered approach to multi-source heterogeneous data collection.</p>
      </div>

      <div className="space-y-4 relative">
        {/* Connecting line */}
        <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-800 z-0"></div>

        {layers.map((layer, idx) => (
          <motion.div 
            key={layer.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative z-10 flex items-stretch gap-6"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 border bg-slate-950 ${layer.color}`}>
              <layer.icon className="w-8 h-8" />
            </div>
            
            <div className={`flex-1 rounded-xl border p-6 bg-slate-900/50 backdrop-blur-sm ${layer.color.replace('text-', 'border-').replace('/10', '/5')}`}>
              <h3 className="text-xl font-semibold text-white mb-1">{layer.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{layer.desc}</p>
              
              <div className="flex flex-wrap gap-2">
                {layer.items.map(item => (
                  <span key={item} className={`px-3 py-1 rounded-full text-xs font-medium border ${layer.color.replace('/10', '/20')}`}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
