import { PosterData } from "@/types/poster";
import { Calendar, Clock, MapPin, Mic, Phone } from "lucide-react";

interface Template2Props {
  data: PosterData;
}

const Template2 = ({ data }: Template2Props) => {
  return (
    <div className="w-[800px] h-[1200px] bg-gradient-to-br from-poster-bg via-white to-secondary/30 relative overflow-hidden" dir="rtl">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-8">
        <div className="flex justify-between items-start">
          <div className="text-right flex-1">
            <h1 className="text-4xl font-bold mb-2">{data.title || "دعوة عامة"}</h1>
            <p className="text-xl opacity-90">{data.subtitle || "عنوان الفعالية"}</p>
          </div>
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shrink-0">
            <span className="text-3xl flex items-center justify-center w-full h-full">🌾</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-12">
        {/* Description Box */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-r-8 border-accent">
          <p className="text-2xl text-poster-text leading-relaxed">
            {data.description || "وصف الفعالية والمحتوى الرئيسي للندوة"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {data.speaker && (
            <div className="bg-gradient-to-l from-accent/10 to-transparent rounded-2xl p-6 border-r-4 border-accent">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <Mic className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold mb-1">المتحدث الرئيسي</p>
                  <p className="text-2xl font-bold text-poster-text">{data.speaker}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gradient-to-l from-primary/10 to-transparent rounded-2xl p-6 border-r-4 border-primary">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold mb-1">التاريخ</p>
                  <p className="text-xl font-bold text-poster-text">{data.date || "الثلاثاء ٤ نوفمبر"}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-l from-accent/10 to-transparent rounded-2xl p-6 border-r-4 border-accent">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-semibold mb-1">الوقت</p>
                  <p className="text-xl font-bold text-poster-text">{data.time || "11:00 صباحاً"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-l from-primary/10 to-transparent rounded-2xl p-6 border-r-4 border-primary">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-1">المنصة / الموقع</p>
                <p className="text-xl font-bold text-poster-text">{data.location || "Microsoft Teams"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {data.additionalInfo && (
          <div className="bg-secondary/50 rounded-3xl p-8 mb-8 border-2 border-primary/20">
            <h3 className="text-2xl font-bold text-accent mb-4">معلومات إضافية</h3>
            <p className="text-lg text-poster-text leading-relaxed whitespace-pre-line">
              {data.additionalInfo}
            </p>
          </div>
        )}

        {/* Contact Info */}
        {data.contactEmail && (
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Phone className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90 mb-1">للتواصل والاستفسارات</p>
                  <p className="text-xl font-bold">{data.contactEmail}</p>
                </div>
              </div>
              <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center shrink-0">
                <span className="text-xs text-center text-primary font-bold flex flex-col items-center justify-center w-full h-full leading-tight">
                  <span>QR</span>
                  <span>Code</span>
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-poster-text text-white p-6">
        <div className="text-center">
          <p className="text-lg font-bold">وزارة البيئة والمياه والزراعة</p>
          <p className="text-sm opacity-80">Ministry of Environment, Water & Agriculture</p>
        </div>
      </div>

      {/* Decorative Wave */}
      <svg className="absolute bottom-0 left-0 w-full opacity-20" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
        <path fill="hsl(var(--primary))" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"/>
      </svg>
    </div>
  );
};

export default Template2;
