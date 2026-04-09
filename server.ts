import express from 'express';
import { createServer as createViteServer } from 'vite';
import { XMLParser } from 'fast-xml-parser';
import path from 'path';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for arXiv Crawler
  app.get('/api/arxiv/agents', async (req, res) => {
    try {
      const timeframe = req.query.timeframe as string || '1m';
      const topic = req.query.topic as string;
      
      let days = 30;
      if (timeframe === '1d') days = 1;
      else if (timeframe === '1w') days = 7;
      else if (timeframe === '1m') days = 30;
      else if (timeframe === '3m') days = 90;
      else if (timeframe === '6m') days = 180;

      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      // Query arXiv for AI Agent related papers
      let queryStr = 'all:"AI Agent" OR all:"autonomous agent" OR all:"LLM Agent"';
      if (topic) {
        // Lowercase to avoid arXiv API treating uppercase words as boolean operators
        const sanitizedTopic = topic.toLowerCase().trim();
        
        // Generalize search: split by space and require all terms, rather than exact phrase
        const terms = sanitizedTopic.split(/\s+/).filter(Boolean);
        if (terms.length > 1) {
          queryStr = terms.map(term => `all:${term}`).join(' AND ');
        } else {
          queryStr = `all:${sanitizedTopic}`;
        }
      }
      const query = encodeURIComponent(queryStr);
      const url = `http://export.arxiv.org/api/query?search_query=${query}&sortBy=submittedDate&sortOrder=descending&max_results=300`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`arXiv API responded with status: ${response.status}`);
      }
      const xmlData = await response.text();

      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: "@_"
      });
      const result = parser.parse(xmlData);

      let entries = result.feed?.entry || [];
      if (!Array.isArray(entries)) {
        entries = [entries];
      }

      const papers = entries.map((entry: any) => {
        let authors = entry.author;
        if (!Array.isArray(authors)) authors = [authors];
        
        return {
          id: entry.id,
          title: entry.title?.replace(/\n/g, ' ').trim() || 'Untitled',
          summary: entry.summary?.replace(/\n/g, ' ').trim() || 'No summary available.',
          published: entry.published,
          updated: entry.updated,
          authors: authors.map((a: any) => a?.name).filter(Boolean),
          link: entry.id
        };
      });

      // Filter by date
      const filteredPapers = papers.filter((p: any) => new Date(p.published) >= cutoffDate);

      res.json({ success: true, count: filteredPapers.length, data: filteredPapers });
    } catch (error) {
      console.error('Error fetching arXiv:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch data from arXiv' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
