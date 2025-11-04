import { PosterTemplate } from "@/types/poster";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TemplateSelectorProps {
  templates: PosterTemplate[];
  selectedTemplate: string;
  onTemplateChange: (templateId: string) => void;
}

const TemplateSelector = ({
  templates,
  selectedTemplate,
  onTemplateChange,
}: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-foreground text-right block" dir="rtl">
        اختر القالب / Select Template
      </label>
      <Select value={selectedTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger className="w-full bg-card">
          <SelectValue placeholder="اختر قالب" />
        </SelectTrigger>
        <SelectContent className="bg-card z-50">
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              <span className="text-right" dir="rtl">
                {template.nameAr} / {template.name}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TemplateSelector;
