import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PosterData } from "@/types/poster";
import { Upload, X } from "lucide-react";

interface PosterFormProps {
  data: PosterData;
  onChange: (data: PosterData) => void;
  templateId: string;
}

const PosterForm = ({ data, onChange, templateId }: PosterFormProps) => {
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

  const showImageUpload = templateId === "template4";
  const showPoints = templateId === "template4";
  const showAdditionalInfo = templateId !== "template4";

  return (
    <div className="space-y-6 p-6 bg-card rounded-lg border border-border">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-semibold">
          العنوان الرئيسي / Main Title
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
        <Label htmlFor="subtitle" className="text-sm font-semibold">
          العنوان الفرعي / Subtitle
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
        <Label htmlFor="description" className="text-sm font-semibold">
          الوصف / Description
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
          <Label htmlFor="date" className="text-sm font-semibold">
            التاريخ / Date
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
          <Label htmlFor="time" className="text-sm font-semibold">
            الوقت / Time
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
        <Label htmlFor="location" className="text-sm font-semibold">
          الموقع / Location
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
        <Label htmlFor="speaker" className="text-sm font-semibold">
          المتحدث / Speaker (اختياري)
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
        <Label htmlFor="contactEmail" className="text-sm font-semibold">
          البريد الإلكتروني / Email (اختياري)
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
          <Label className="text-sm font-semibold">
            صورة الملصق / Poster Image (اختياري)
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
          <Label className="text-sm font-semibold">
            النقاط الرئيسية / Key Points (اختياري)
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
          <Label htmlFor="additionalInfo" className="text-sm font-semibold">
            معلومات إضافية / Additional Info (اختياري)
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

