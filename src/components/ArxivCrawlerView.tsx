import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, FileText, Users, ExternalLink, Loader2, AlertCircle, Tag } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  authors: string[];
  link: string;
}

export default function ArxivCrawlerView() {
  const [timeframe, setTimeframe] = useState('1m');
  const [topic, setTopic] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPapers = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = new URL('/api/arxiv/agents', window.location.origin);
      url.searchParams.append('timeframe', timeframe);
      if (topic) {
        url.searchParams.append('topic', topic);
      }
      
      const response = await fetch(url.toString());
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to fetch papers');
      }
      
      setPapers(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [timeframe, topic]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setTopic(searchInput);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchInput(suggestion);
    setTopic(suggestion);
  };

  const timeframes = [
    { value: '1d', label: 'Last 1 Day' },
    { value: '1w', label: 'Last 1 Week' },
    { value: '1m', label: 'Last 1 Month' },
    { value: '3m', label: 'Last 3 Months' },
    { value: '6m', label: 'Last 6 Months' },
  ];

  const suggestions = ['AI Agent', 'Prefill-Decode', 'MoE', 'Multiagents', 'RAG'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">arXiv Papers Crawler</h2>
        <p className="text-slate-400">Live demonstration of crawling and filtering recent research papers from arXiv.</p>
      </div>

      {/* Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-blue-500/10 flex items-center justify-center text-blue-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Crawl Settings</h3>
              <p className="text-sm text-slate-400">Filter by topic and date</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  timeframe === tf.value
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="w-4 h-4 text-slate-500" />
              </div>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter a topic to crawl (e.g., AI Agent, MoE)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
          
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider mr-2">Hot Topics:</span>
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  topic === suggestion
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                    : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-300'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Results
            {!loading && !error && (
              <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                {papers.length} papers found
              </span>
            )}
          </h3>
          
          <button 
            onClick={fetchPapers}
            disabled={loading}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-slate-400">Crawling arXiv database...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 bg-red-500/5 border border-red-500/20 rounded-xl">
            <AlertCircle className="w-8 h-8 text-red-500 mb-2" />
            <p className="text-red-400 font-medium">Crawler Error</p>
            <p className="text-red-400/80 text-sm mt-1">{error}</p>
          </div>
        ) : papers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-900/50 border border-slate-800 rounded-xl border-dashed">
            <FileText className="w-8 h-8 text-slate-600 mb-4" />
            <p className="text-slate-400">No papers found for the selected timeframe.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {papers.map((paper, idx) => (
              <motion.div 
                key={paper.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/30 transition-colors group"
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <h4 className="text-lg font-medium text-slate-100 group-hover:text-blue-400 transition-colors leading-snug">
                    {paper.title}
                  </h4>
                  <a 
                    href={paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0 text-slate-500 hover:text-blue-400 p-1"
                    title="View on arXiv"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(paper.published).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[300px] sm:max-w-md">
                      {paper.authors.join(', ')}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-400 line-clamp-6 leading-relaxed">
                  {paper.summary}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
