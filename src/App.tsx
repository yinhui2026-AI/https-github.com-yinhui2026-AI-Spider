import { useState } from 'react';
import { Database, Cpu, Globe, Layers, Activity, Server, SearchCode } from 'lucide-react';
import ArchitectureView from './components/ArchitectureView';
import FunctionsView from './components/FunctionsView';
import ScenariosView from './components/ScenariosView';
import MiddlewareView from './components/MiddlewareView';
import StorageComplianceView from './components/StorageComplianceView';
import ArxivCrawlerView from './components/ArxivCrawlerView';

export default function App() {
  const [activeTab, setActiveTab] = useState('crawler');

  const tabs = [
    { id: 'crawler', label: 'Live Crawler Demo', icon: SearchCode },
    { id: 'architecture', label: 'System Architecture', icon: Layers },
    { id: 'functions', label: 'Core Functions', icon: Activity },
    { id: 'scenarios', label: 'Scenarios & Solutions', icon: Globe },
    { id: 'middleware', label: 'Middleware Engine', icon: Cpu },
    { id: 'storage', label: 'Storage & Compliance', icon: Database },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'crawler': return <ArxivCrawlerView />;
      case 'architecture': return <ArchitectureView />;
      case 'functions': return <FunctionsView />;
      case 'scenarios': return <ScenariosView />;
      case 'middleware': return <MiddlewareView />;
      case 'storage': return <StorageComplianceView />;
      default: return <ArxivCrawlerView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
            <Server className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">SpiderNet</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          v2.0.4 Enterprise Edition
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

