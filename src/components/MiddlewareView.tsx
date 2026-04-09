import { motion } from 'motion/react';
import { Network, ScanFace, Smartphone } from 'lucide-react';

export default function MiddlewareView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Core Middleware Engine</h2>
        <p className="text-slate-400">Infrastructure components powering the extraction layer.</p>
      </div>

      <div className="space-y-6">
        {/* Proxy Rotator */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Network className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">Smart Proxy Rotator</h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">Dynamically routes requests based on target domain risk score and failure rates.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'Datacenter', desc: 'Cheap, easily blocked', color: 'text-slate-400' },
              { type: 'Residential', desc: 'High anonymity, costly', color: 'text-emerald-400' },
              { type: 'Mobile (4G/5G)', desc: 'App scraping specific', color: 'text-blue-400' },
              { type: 'Starlink', desc: 'Satellite IP, untraceable', color: 'text-purple-400' },
            ].map(p => (
              <div key={p.type} className="bg-slate-950 rounded-lg p-4 border border-slate-800">
                <div className={`font-medium mb-1 ${p.color}`}>{p.type}</div>
                <div className="text-xs text-slate-500">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Captcha System */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded bg-amber-500/10 flex items-center justify-center text-amber-400">
              <ScanFace className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">Captcha Evasion System</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-950 border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Captcha Type</th>
                  <th className="px-4 py-3">Solution</th>
                  <th className="px-4 py-3">Success Rate</th>
                  <th className="px-4 py-3">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <td className="px-4 py-3 font-medium">Slider / Puzzle</td>
                  <td className="px-4 py-3">OpenCV Edge Detection + Selenium Trajectory</td>
                  <td className="px-4 py-3 text-emerald-400">85%</td>
                  <td className="px-4 py-3">Low</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Text Selection</td>
                  <td className="px-4 py-3">Deep Learning (YOLO + CRNN)</td>
                  <td className="px-4 py-3 text-emerald-400">90%</td>
                  <td className="px-4 py-3">Medium</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">ReCAPTCHA v2</td>
                  <td className="px-4 py-3">3rd Party Solving API Integration</td>
                  <td className="px-4 py-3 text-emerald-400">95%</td>
                  <td className="px-4 py-3">High ($2/1k)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">ReCAPTCHA v3</td>
                  <td className="px-4 py-3">Behavior Sim + Token Farming</td>
                  <td className="px-4 py-3 text-amber-400">60%</td>
                  <td className="px-4 py-3 text-red-400">Extreme</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Device Fingerprint */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold text-white">Device Fingerprint Factory</h3>
          </div>
          <p className="text-slate-400 text-sm mb-4">Generates trusted device environments for App reverse engineering.</p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-emerald-400 border border-slate-800 overflow-x-auto">
            <pre>{`// Frida Script: Hook Build class to return spoofed device info
Java.perform(function() {
    var Build = Java.use("android.os.Build");
    Build.FINGERPRINT.value = "google/walleye/walleye:8.1.0/OPM1.171019.011/4448085:user/release-keys";
    Build.MANUFACTURER.value = "Google";
    // Randomize other parameters...
});`}</pre>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
