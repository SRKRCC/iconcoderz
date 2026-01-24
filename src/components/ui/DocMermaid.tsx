import { useEffect, useState } from 'react';
import mermaid from 'mermaid';

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    fontFamily: 'inherit',
    primaryColor: '#f59e0b',       // primary (amber-500)
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#d97706', // primary-dark
    lineColor: '#6366f1',          // secondary
    secondaryColor: '#6366f1',
    tertiaryColor: '#f3f4f6',      // muted
  },
  securityLevel: 'loose',
});

export default function DocMermaid({ chart }: { chart: string }) {
  const [svg, setSvg] = useState('');
  const [id] = useState(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Mermaid render error:', error);
        setSvg('<div class="text-red-500">Error rendering diagram</div>');
      }
    };
    renderChart();
  }, [chart, id]);

  return (
    <div 
        className="my-8 flex justify-center bg-muted/50 p-6 rounded-lg border border-border overflow-x-auto" 
        dangerouslySetInnerHTML={{ __html: svg }} 
    />
  );
}
