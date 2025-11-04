import { PosterData } from "@/types/poster";

interface Template4Props {
  data: PosterData;
}

const Template4 = ({ data }: Template4Props) => {
  return (
    <div
      className="w-[800px] h-[1200px] relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 100%)",
      }}
    >
      {/* Header with Image */}
      <div className="relative h-[400px] overflow-hidden">
        {data.image ? (
          <img
            src={data.image}
            alt="Poster visual"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-6xl">🎯</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        
        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg" dir="rtl">
            {data.title}
          </h1>
          <h2 className="text-3xl font-semibold text-white/90 drop-shadow-md" dir="rtl">
            {data.subtitle}
          </h2>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-12 space-y-8">
        {/* Description */}
        {data.description && (
          <div className="bg-card/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <p className="text-xl leading-relaxed text-foreground" dir="rtl">
              {data.description}
            </p>
          </div>
        )}

        {/* Key Points as Boxes */}
        {data.points && data.points.length > 0 && (
          <div className="grid grid-cols-2 gap-6">
            {data.points.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-t-4"
                style={{ borderColor: "hsl(var(--primary))" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ background: "hsl(var(--primary))" }}
                  >
                    {index + 1}
                  </div>
                  <p className="text-base font-medium text-foreground flex-1" dir="rtl">
                    {point}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Details */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl mb-3">📅</div>
            <div className="text-sm text-muted-foreground mb-2">التاريخ</div>
            <div className="text-lg font-semibold text-foreground" dir="rtl">{data.date}</div>
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl mb-3">⏰</div>
            <div className="text-sm text-muted-foreground mb-2">الوقت</div>
            <div className="text-lg font-semibold text-foreground" dir="rtl">{data.time}</div>
          </div>
          <div className="bg-card/90 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
            <div className="text-4xl mb-3">📍</div>
            <div className="text-sm text-muted-foreground mb-2">المكان</div>
            <div className="text-lg font-semibold text-foreground" dir="rtl">{data.location}</div>
          </div>
        </div>

        {/* Speaker & Contact */}
        <div className="flex justify-between items-center">
          {data.speaker && (
            <div className="bg-card/90 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/20">
              <div className="text-sm text-muted-foreground mb-1">المتحدث</div>
              <div className="text-xl font-bold text-foreground" dir="rtl">{data.speaker}</div>
            </div>
          )}
          {data.contactEmail && (
            <div className="bg-card/90 backdrop-blur-sm rounded-xl px-8 py-4 border border-white/20">
              <div className="text-sm text-muted-foreground mb-1">للتواصل</div>
              <div className="text-lg font-semibold text-foreground">{data.contactEmail}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Template4;
