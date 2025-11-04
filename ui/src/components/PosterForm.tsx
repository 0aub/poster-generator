import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PosterData } from "@/types/poster";
import { Upload, X, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { enhanceText, AIProvider } from "@/utils/aiEnhancement";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PosterFormProps {
  data: PosterData;
  onChange: (data: PosterData) => void;
  templateId: string;
}

const PosterForm = ({ data, onChange, templateId }: PosterFormProps) => {
  const [aiProvider, setAiProvider] = useState<AIProvider>('gemini');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const handleChange = (field: keyof PosterData, value: string | string[]) => {
    onChange({ ...data, [field]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePointChange = (index: number, value: string) => {
    const newPoints = [...(data.points || [])];
    newPoints[index] = value;
    handleChange("points", newPoints);
  };

  const addPoint = () => {
    const newPoints = [...(data.points || []), ""];
    handleChange("points", newPoints);
  };

  const removePoint = (index: number) => {
    const newPoints = (data.points || []).filter((_, i) => i !== index);
    handleChange("points", newPoints);
  };

  const handleEnhance = async () => {
    if (!data.description) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال الوصف أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsEnhancing(true);
    try {
      const enhanced = await enhanceText({
        description: data.description,
        additionalInfo: data.additionalInfo || "",
        provider: aiProvider,
      });

      onChange({
        ...data,
        description: enhanced.description,
        additionalInfo: enhanced.additionalInfo,
      });

      toast({
        title: "تم التحسين بنجاح",
        description: `تم تحسين المحتوى باستخدام ${aiProvider === 'openai' ? 'OpenAI' : 'Gemini'}`,
      });
    } catch (error) {
      toast({
        title: "خطأ في التحسين",
        description: error instanceof Error ? error.message : "حدث خطأ أثناء تحسين المحتوى",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(false);
    }
  };

  const showImageUpload = templateId === "template4";
  const showPoints = templateId === "template4";
  const showAdditionalInfo = templateId !== "template4";

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
      {/* AI Enhancement Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-2 mb-3" dir="rtl">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h3 className="text-sm font-bold text-purple-900 dark:text-purple-100">
            تحسين المحتوى بالذكاء الاصطناعي
          </h3>
        </div>
        <div className="flex gap-3">
          <Select value={aiProvider} onValueChange={(value: AIProvider) => setAiProvider(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر المزود" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gemini">Google Gemini</SelectItem>
              <SelectItem value="openai">OpenAI GPT</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleEnhance}
            disabled={isEnhancing || !data.description}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isEnhancing ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري التحسين...
              </>
            ) : (
              <>
                <Sparkles className="ml-2 h-4 w-4" />
                تحسين الوصف والمعلومات
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          سيتم تحسين الوصف والمعلومات الإضافية تلقائياً
        </p>
      </div>

      <div className="h-px bg-border" />
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-semibold text-right block" dir="rtl">
          العنوان الرئيسي
        </Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="أدخل العنوان الرئيسي"
          className="text-right"
          dir="rtl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle" className="text-sm font-semibold text-right block" dir="rtl">
          العنوان الفرعي
        </Label>
        <Input
          id="subtitle"
          value={data.subtitle}
          onChange={(e) => handleChange("subtitle", e.target.value)}
          placeholder="أدخل العنوان الفرعي"
          className="text-right"
          dir="rtl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-semibold text-right block" dir="rtl">
          الوصف
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="أدخل الوصف"
          className="text-right min-h-[100px]"
          dir="rtl"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-semibold text-right block" dir="rtl">
            التاريخ
          </Label>
          <Input
            id="date"
            value={data.date}
            onChange={(e) => handleChange("date", e.target.value)}
            placeholder="الثلاثاء ٤ نوفمبر"
            className="text-right"
            dir="rtl"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-semibold text-right block" dir="rtl">
            الوقت
          </Label>
          <Input
            id="time"
            value={data.time}
            onChange={(e) => handleChange("time", e.target.value)}
            placeholder="11:00 صباحاً"
            className="text-right"
            dir="rtl"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-sm font-semibold text-right block" dir="rtl">
          الموقع
        </Label>
        <Input
          id="location"
          value={data.location}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="Microsoft Teams"
          className="text-right"
          dir="rtl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="speaker" className="text-sm font-semibold text-right block" dir="rtl">
          المتحدث (اختياري)
        </Label>
        <Input
          id="speaker"
          value={data.speaker || ""}
          onChange={(e) => handleChange("speaker", e.target.value)}
          placeholder="د. أحمد النويهي"
          className="text-right"
          dir="rtl"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contactEmail" className="text-sm font-semibold text-right block" dir="rtl">
          البريد الإلكتروني (اختياري)
        </Label>
        <Input
          id="contactEmail"
          value={data.contactEmail || ""}
          onChange={(e) => handleChange("contactEmail", e.target.value)}
          placeholder="ICR@mewa.gov.sa"
          className="text-left"
          dir="ltr"
        />
      </div>

      {showImageUpload && (
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-right block" dir="rtl">
            صورة الملصق (اختياري)
          </Label>
          <div className="space-y-3">
            {data.image && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border">
                <img src={data.image} alt="Preview" className="w-full h-full object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => handleChange("image", "")}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}

      {showPoints && (
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-right block" dir="rtl">
            النقاط الرئيسية (اختياري)
          </Label>
          <div className="space-y-3">
            {(data.points || []).map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point}
                  onChange={(e) => handlePointChange(index, e.target.value)}
                  placeholder={`النقطة ${index + 1}`}
                  className="text-right flex-1"
                  dir="rtl"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removePoint(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addPoint}
              className="w-full"
            >
              إضافة نقطة +
            </Button>
          </div>
        </div>
      )}

      {showAdditionalInfo && (
        <div className="space-y-2">
          <Label htmlFor="additionalInfo" className="text-sm font-semibold text-right block" dir="rtl">
            معلومات إضافية (اختياري)
          </Label>
          <Textarea
            id="additionalInfo"
            value={data.additionalInfo || ""}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            placeholder="معلومات إضافية"
            className="text-right min-h-[80px]"
            dir="rtl"
          />
        </div>
      )}
    </div>
  );
};

export default PosterForm;

