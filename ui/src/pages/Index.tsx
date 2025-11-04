import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PosterPreview from "@/components/PosterPreview";
import PosterForm from "@/components/PosterForm";
import TemplateSelector from "@/components/TemplateSelector";
import { PosterData, PosterTemplate } from "@/types/poster";
import { exportPosterAsPNG } from "@/utils/exportPoster";
import Template1 from "@/components/templates/Template1";
import Template2 from "@/components/templates/Template2";
import Template3 from "@/components/templates/Template3";
import Template4 from "@/components/templates/Template4";

const templates: PosterTemplate[] = [
  {
    id: "template1",
    name: "Modern Event Poster",
    nameAr: "قالب الفعالية الحديث",
    component: Template1,
  },
  {
    id: "template2",
    name: "Gradient Professional",
    nameAr: "قالب احترافي متدرج",
    component: Template2,
  },
  {
    id: "template3",
    name: "Elegant Invitation",
    nameAr: "قالب الدعوة الأنيق",
    component: Template3,
  },
  {
    id: "template4",
    name: "Creative Visual",
    nameAr: "قالب مرئي إبداعي",
    component: Template4,
  },
];

const Index = () => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(templates[0].id);
  const [isExporting, setIsExporting] = useState(false);
  const [posterData, setPosterData] = useState<PosterData>({
    title: "دعوة عامة",
    subtitle: "التقنيات الثانوية الخضراء لتنقية المياه من المعادن الثقيلة",
    description: "نحو حلول مستدامة لمصادر المياه في المملكة",
    date: "الثلاثاء ٤ نوفمبر",
    time: "11:00 صباحاً",
    location: "Microsoft Teams",
    speaker: "د. أحمد النويهي",
    contactEmail: "ICR@mewa.gov.sa",
    additionalInfo: "• دعم مستهدفات رؤية المملكة 2030 في الاستخدامة البيئية وحماية الموارد المالية\n• إبراز دور التقنيات الثانوية الخضراء في إزالة المعادن الثقيلة من مختلف مصادر المياه",
  });

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportPosterAsPNG();
      toast({
        title: "تم التصدير بنجاح",
        description: "تم تنزيل الملصق كصورة PNG",
      });
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير الملصق. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">منشئ الملصقات</h1>
                <p className="text-sm text-muted-foreground">Poster Designer</p>
              </div>
            </div>
            <Button
              onClick={handleExport}
              disabled={isExporting}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              {isExporting ? (
                <>
                  <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                  جاري التصدير...
                </>
              ) : (
                <>
                  <Download className="ml-2 h-5 w-5" />
                  تصدير كصورة PNG
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Preview */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                معاينة الملصق / Preview
              </h2>
              <div className="flex justify-center">
                <PosterPreview template={selectedTemplate} data={posterData} />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold text-foreground mb-4">
                تحرير المحتوى / Edit Content
              </h2>
              
              <div className="space-y-6">
                <TemplateSelector
                  templates={templates}
                  selectedTemplate={selectedTemplateId}
                  onTemplateChange={setSelectedTemplateId}
                />
                
                <div className="h-px bg-border" />
                
                <PosterForm 
                  data={posterData} 
                  onChange={setPosterData}
                  templateId={selectedTemplateId}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
