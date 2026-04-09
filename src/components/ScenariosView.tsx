import { motion } from 'motion/react';
import { Store, ShoppingBag, GraduationCap, Users, Plane } from 'lucide-react';

export default function ScenariosView() {
  const scenarios = [
    {
      title: 'Local Services & Reviews',
      icon: Store,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      challenges: ['Font Anti-crawling (CSS mapping)', 'Dynamic Loading', 'NLP Requirements'],
      solutions: ['TTFont parsing & contour hashing', 'Playwright/Puppeteer', 'BERT+CRF Entity Extraction']
    },
    {
      title: 'E-commerce & Trendy Apps',
      icon: ShoppingBag,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
      borderColor: 'border-pink-500/20',
      challenges: ['HMAC-SHA256 Signatures', 'SSL Pinning', 'Code Obfuscation'],
      solutions: ['Frida Hooking', 'JADX Static Analysis', 'gRPC Signature Service']
    },
    {
      title: 'Academic Platforms',
      icon: GraduationCap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      challenges: ['Institutional IP/2FA', 'ReCAPTCHA v3', 'PDF Parsing'],
      solutions: ['Session Management', 'Captcha Farms', 'pdfplumber & GROBID']
    },
    {
      title: 'Social & Video Platforms',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      challenges: ['GraphQL Signatures', 'Ephemeral Content', 'Strict Rate Limits'],
      solutions: ['Account Matrix', 'Behavior Simulation', 'Local Caching First']
    },
    {
      title: 'Airlines & OTA',
      icon: Plane,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
      challenges: ['Price Discrimination', 'Dynamic Inventory', 'Strict IP Bans'],
      solutions: ['Multi-node Concurrent Query', 'WebSocket Listening', 'Redis Price History']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Scenarios & Solutions</h2>
        <p className="text-slate-400">Targeted strategies for complex data sources.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenarios.map((scenario, idx) => (
          <motion.div 
            key={scenario.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-slate-900 border ${scenario.borderColor} rounded-xl p-6`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-lg ${scenario.bgColor} flex items-center justify-center ${scenario.color}`}>
                <scenario.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white">{scenario.title}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Core Challenges</h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.challenges.map(c => (
                    <span key={c} className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Technical Solutions</h4>
                <div className="flex flex-wrap gap-2">
                  {scenario.solutions.map(s => (
                    <span key={s} className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
