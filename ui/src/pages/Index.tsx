import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PosterPreview from "@/components/PosterPreview";
import PosterForm from "@/components/PosterForm";
import TemplateSelector from "@/components/TemplateSelector";
import { PosterData, PosterTemplate } from "@/types/poster";
import { exportPosterAsPNG } from "@/utils/exportPoster";
import { exportPosterAsPDF } from "@/utils/exportPosterPDF";
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
  const [isExportingPNG, setIsExportingPNG] = useState(false);
  const [isExportingPDF, setIsExportingPDF] = useState(false);
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

  const handleExportPNG = async () => {
    setIsExportingPNG(true);
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
      setIsExportingPNG(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExportingPDF(true);
    try {
      await exportPosterAsPDF();
      toast({
        title: "تم التصدير بنجاح",
        description: "تم تنزيل الملصق كملف PDF",
      });
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير الملصق. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      });
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm flex-shrink-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">منشئ الملصقات</h1>
                <p className="text-sm text-muted-foreground">Poster Designer</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleExportPNG}
                disabled={isExportingPNG || isExportingPDF}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                {isExportingPNG ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري التصدير...
                  </>
                ) : (
                  <>
                    <Download className="ml-2 h-5 w-5" />
                    تصدير كصورة
                  </>
                )}
              </Button>
              <Button
                onClick={handleExportPDF}
                disabled={isExportingPNG || isExportingPDF}
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
              >
                {isExportingPDF ? (
                  <>
                    <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    جاري التصدير...
                  </>
                ) : (
                  <>
                    <FileText className="ml-2 h-5 w-5" />
                    تصدير PDF
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 h-[calc(100vh-5rem)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left: Preview */}
          <div className="h-full overflow-hidden flex flex-col">
            <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-foreground mb-4 flex-shrink-0 text-right" dir="rtl">
                معاينة الملصق
              </h2>
              <div className="flex-1 overflow-auto flex items-center justify-center">
                <PosterPreview template={selectedTemplate} data={posterData} />
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="h-full overflow-hidden flex flex-col">
            <div className="bg-card rounded-lg border border-border p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-foreground mb-4 flex-shrink-0 text-right" dir="rtl">
                تحرير المحتوى
              </h2>

              <div className="flex-1 overflow-auto space-y-6">
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
