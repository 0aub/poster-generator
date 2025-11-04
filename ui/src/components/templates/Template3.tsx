import { PosterData } from "@/types/poster";
import { Calendar, Clock, MapPin, Mic, Mail } from "lucide-react";

interface Template3Props {
  data: PosterData;
}

const Template3 = ({ data }: Template3Props) => {
  return (
    <div className="w-[800px] h-[1200px] bg-white relative overflow-hidden" dir="rtl">
      {/* Decorative Header Background */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-br from-primary via-accent to-primary opacity-90" />
      
      {/* Header Content */}
      <div className="relative z-10 pt-12 px-12">
        <div className="flex justify-between items-start mb-8">
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <div className="text-4xl">🌾</div>
          </div>
          <div className="text-right text-white">
            <p className="text-lg font-bold">وزارة البيئة والمياه والزراعة</p>
            <p className="text-sm opacity-90">Ministry of Environment, Water & Agriculture</p>
          </div>
        </div>

        {/* Title Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl mb-8">
          <div className="inline-block bg-gradient-to-r from-primary to-accent text-white px-6 py-2 rounded-full mb-4">
            <span className="font-bold">دعوة خاصة</span>
          </div>
          
          <h1 className="text-5xl font-bold text-primary mb-4 leading-tight">
            {data.title || "دعوة عامة"}
          </h1>
          
          <h2 className="text-3xl font-semibold text-poster-text mb-6 leading-relaxed">
            {data.subtitle || "عنوان الفعالية أو الندوة"}
          </h2>
          
          <div className="h-1 w-32 bg-gradient-to-r from-accent to-primary rounded-full" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 px-12">
        {/* Description */}
        <div className="bg-secondary/30 rounded-2xl p-8 mb-8 border-r-4 border-accent">
          <p className="text-xl text-poster-text leading-relaxed">
            {data.description || "وصف الفعالية والمحتوى الرئيسي"}
          </p>
        </div>

        {/* Event Details Grid */}
        <div className="space-y-4 mb-8">
          {data.speaker && (
            <div className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-md border-r-4 border-accent">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-semibold mb-1">المتحدث</p>
                <p className="text-2xl font-bold text-poster-text">{data.speaker}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-md border-r-4 border-primary">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">التاريخ</p>
                <p className="text-lg font-bold text-poster-text">{data.date || "الثلاثاء ٤ نوفمبر"}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-md border-r-4 border-accent">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">الوقت</p>
                <p className="text-lg font-bold text-poster-text">{data.time || "11:00 صباحاً"}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-md border-r-4 border-primary">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-semibold mb-1">المنصة / الموقع</p>
              <p className="text-2xl font-bold text-poster-text">{data.location || "Microsoft Teams"}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {data.additionalInfo && (
          <div className="bg-gradient-to-br from-secondary/50 to-primary/5 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-accent mb-4">تفاصيل إضافية</h3>
            <p className="text-lg text-poster-text leading-relaxed whitespace-pre-line">
              {data.additionalInfo}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary via-accent to-primary text-white p-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {data.contactEmail && (
              <>
                <Mail className="w-8 h-8" />
                <div>
                  <p className="text-sm opacity-90 mb-1">للتواصل</p>
                  <p className="text-xl font-bold">{data.contactEmail}</p>
                </div>
              </>
            )}
          </div>
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            <div className="text-center text-primary text-xs font-bold">
              <div className="text-2xl mb-1">📱</div>
              <div>امسح للتسجيل</div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/3 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
};

export default Template3;
