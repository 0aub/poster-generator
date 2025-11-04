import { PosterData } from "@/types/poster";
import { Calendar, Clock, MapPin, Mic, CheckCircle2 } from "lucide-react";

interface Template1Props {
  data: PosterData;
}

const Template1 = ({ data }: Template1Props) => {
  return (
    <div className="w-[800px] h-[1200px] bg-poster-bg relative overflow-hidden" dir="rtl">
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-6 flex justify-between items-center border-b-4 border-primary">
        <div className="text-right">
          <p className="text-sm text-poster-text font-semibold">الإدارة العامة للاتصال المؤسسي والإعلام</p>
          <p className="text-xs text-muted-foreground">إدارة التواصل الداخلي</p>
        </div>
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
          <div className="text-white text-2xl font-bold">🌾</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 px-12">
        {/* Badge */}
        <div className="inline-block bg-accent text-white px-6 py-2 rounded-full mb-6">
          <span className="font-bold text-lg">منصة مجرة</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-poster-title mb-4 leading-tight">
          {data.title || "دعوة عامة"}
        </h1>

        {/* Subtitle */}
        <h2 className="text-3xl font-semibold text-poster-text mb-6 leading-relaxed">
          {data.subtitle || "عنوان الندوة أو الفعالية"}
        </h2>

        {/* Description */}
        <p className="text-xl text-poster-text leading-relaxed mb-8 max-w-2xl">
          {data.description || "وصف الفعالية أو الندوة"}
        </p>

        {/* Event Details */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 mb-8 border-2 border-primary/20">
          <h3 className="flex items-center gap-3 text-2xl font-bold text-accent mb-6">
            <CheckCircle2 className="w-8 h-8" />
            أهداف الندوة
          </h3>
          
          {data.additionalInfo && (
            <div className="text-lg text-poster-text leading-relaxed whitespace-pre-line">
              {data.additionalInfo}
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {data.speaker && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 border-2 border-accent/30">
              <Mic className="w-8 h-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">المتحدث</p>
                <p className="text-xl font-bold text-poster-text">{data.speaker}</p>
              </div>
            </div>
          )}
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 border-2 border-accent/30">
            <Calendar className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">التاريخ</p>
              <p className="text-xl font-bold text-poster-text">{data.date || "الثلاثاء ٤ نوفمبر"}</p>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 border-2 border-accent/30">
            <Clock className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">الوقت</p>
              <p className="text-xl font-bold text-poster-text">{data.time || "11:00 صباحاً"}</p>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 flex items-center gap-4 border-2 border-accent/30">
            <MapPin className="w-8 h-8 text-accent" />
            <div>
              <p className="text-sm text-muted-foreground">المنصة</p>
              <p className="text-xl font-bold text-poster-text">{data.location || "Microsoft Teams"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-primary text-white p-6">
        <div className="flex justify-between items-center">
          <div className="text-right">
            <p className="text-lg font-bold mb-1">نرحب بمشاركتكم</p>
            {data.contactEmail && (
              <p className="text-sm opacity-90">{data.contactEmail}</p>
            )}
          </div>
          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
            <div className="text-xs text-center text-primary font-bold">QR Code</div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-40 left-0 w-32 h-32 bg-accent/10 rounded-full -translate-x-1/2" />
      <div className="absolute bottom-40 right-0 w-40 h-40 bg-primary/10 rounded-full translate-x-1/2" />
    </div>
  );
};

export default Template1;
