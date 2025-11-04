import { PosterData, PosterTemplate } from "@/types/poster";
import { useRef } from "react";

interface PosterPreviewProps {
  template: PosterTemplate;
  data: PosterData;
}

const PosterPreview = ({ template, data }: PosterPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = template.component;

  // Render two versions: one for display (scaled), one for export (hidden, full-size)
  return (
    <>
      {/* Hidden full-size version for clean export */}
      <div
        id="poster-preview"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '800px',
          height: '1200px',
        }}
      >
        <TemplateComponent data={data} />
      </div>

      {/* Visible scaled version for display */}
      <div className="flex items-start justify-center w-full h-full py-4">
        <div
          ref={previewRef}
          className="shadow-2xl rounded-lg overflow-hidden"
          style={{
            width: '400px',
            height: '600px',
            transformOrigin: 'top center',
          }}
        >
          <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left', width: '800px', height: '1200px' }}>
            <TemplateComponent data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PosterPreview;
