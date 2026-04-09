import { motion } from 'motion/react';
import { CheckCircle2, Filter, Code2, Database, Workflow, ShieldCheck } from 'lucide-react';

export default function FunctionsView() {
  const functions = [
    {
      title: 'Multi-Source Data Collection',
      icon: Workflow,
      features: [
        'Web Scraping (Static & Dynamic SPA)',
        'App API Interception & Reverse Engineering',
        'GraphQL & WebSocket Subscriptions',
        'RSS/Atom Feed Monitoring'
      ]
    },
    {
      title: 'Custom Rule Engine',
      icon: Code2,
      features: [
        'Visual XPath/CSS Selector Builder',
        'Regex & JSONPath Extraction',
        'Dynamic JavaScript Execution Hooks',
        'Custom Python/Node.js Script Injection'
      ]
    },
    {
      title: 'Data Cleaning & NLP',
      icon: Filter,
      features: [
        'Schema Validation (Cerberus/Pydantic)',
        'Deduplication (Bloom Filter, SimHash)',
        'Entity Recognition (BERT+CRF)',
        'Sentiment Analysis (RoBERTa)'
      ]
    },
    {
      title: 'Intelligent Storage',
      icon: Database,
      features: [
        'Auto-routing to appropriate DB (Mongo/PG/ES)',
        'Time-series data handling for pricing',
        'S3/MinIO integration for media assets',
        'Vector DB (Milvus) for embeddings'
      ]
    },
    {
      title: 'Anti-Bot Evasion',
      icon: ShieldCheck,
      features: [
        'Smart Proxy Rotation (Datacenter/Residential/Mobile)',
        'Browser Fingerprint Spoofing',
        'Automated Captcha Solving (CV + ML)',
        'Human Behavior Simulation (Mouse/Scroll)'
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Comprehensive Functional List</h2>
        <p className="text-slate-400">Core capabilities of the SpiderNet crawling system.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {functions.map((func, idx) => (
          <motion.div 
            key={func.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <func.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">{func.title}</h3>
            </div>
            
            <ul className="space-y-3">
              {func.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
