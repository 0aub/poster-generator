import { PosterData, PosterTemplate } from "@/types/poster";
import { useRef } from "react";

interface PosterPreviewProps {
  template: PosterTemplate;
  data: PosterData;
}

const PosterPreview = ({ template, data }: PosterPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const TemplateComponent = template.component;

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={previewRef} 
        id="poster-preview"
        className="shadow-2xl rounded-lg overflow-hidden transform scale-75 origin-top"
        style={{ 
          transformOrigin: 'top center',
        }}
      >
        <TemplateComponent data={data} />
      </div>
    </div>
  );
};

export default PosterPreview;
