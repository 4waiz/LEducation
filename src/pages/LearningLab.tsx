import { useState } from 'react';
import DiagramOutput from '../components/DiagramOutput';
import FilterChips from '../components/FilterChips';
import WhiteboardCanvas from '../components/WhiteboardCanvas';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { downloadSvgAsPng } from '../utils/svg';

export default function LearningLab() {
  const [template, setTemplate] = useState<'blank' | 'flowchart' | 'mindmap' | 'geometry'>('blank');
  const [svg, setSvg] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="text-xs uppercase tracking-[0.3em] text-lime-400">Learning Lab</div>
      <h1 className="mt-4 text-3xl font-semibold text-chalk-50">Interactive whiteboard + Diagramizer</h1>
      <p className="mt-3 text-sm text-chalk-300">
        Sketch ideas and instantly convert them into clean diagrams. Use templates to jump-start flowcharts, mind maps,
        and geometry explorations.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-2xl p-4">
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-chalk-400">Templates</div>
          <FilterChips
            options={['blank', 'flowchart', 'mindmap', 'geometry']}
            value={template}
            onChange={(value) => setTemplate(value as 'blank' | 'flowchart' | 'mindmap' | 'geometry')}
          />
          <div className="mt-4">
            <WhiteboardCanvas
              template={template}
              onGenerate={setSvg}
              onGenerating={setIsGenerating}
            />
          </div>
        </div>
        <DiagramOutput
          svg={svg}
          onDownload={() => svg && downloadSvgAsPng(svg, 'leducation-diagram.png')}
          isGenerating={isGenerating}
          prefersReduced={prefersReduced}
        />
      </div>
    </div>
  );
}

