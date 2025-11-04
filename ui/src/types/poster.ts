export interface PosterData {
  title: string;
  subtitle: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speaker?: string;
  contactEmail?: string;
  additionalInfo?: string;
  qrCode?: string;
  image?: string;
  points?: string[];
}

export interface PosterTemplate {
  id: string;
  name: string;
  nameAr: string;
  component: React.ComponentType<{ data: PosterData }>;
}
