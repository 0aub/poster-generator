# Poster Generator | منشئ الملصقات

Professional Arabic poster design system with multiple templates, AI enhancement, and high-quality export.

## Quick Start

### 1. Configuration

Configure your API keys in the `.env` file:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your API keys:

```env
# OpenAI API Key (for AI enhancement)
# Get your key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-openai-key-here

# Google Gemini API Key (for AI enhancement)
# Get your key from: https://makersuite.google.com/app/apikey
GEMINI_API_KEY=your-actual-gemini-key-here
```

### 2. Run with Docker

```bash
# Start the application
docker compose up --build -d

# Access the application
open http://localhost:8080
```

## Development Guide

### Creating a New Template

**1. Template Location**

Templates are located in: `ui/src/components/templates/`

Existing templates:
- `Template1.tsx` - Modern Event Poster
- `Template2.tsx` - Gradient Professional
- `Template3.tsx` - Elegant Invitation
- `Template4.tsx` - Creative Visual

**2. Create a New Template**

Create a new file: `ui/src/components/templates/Template5.tsx`

```typescript
import { PosterData } from "@/types/poster";

interface Template5Props {
  data: PosterData;
}

const Template5 = ({ data }: Template5Props) => {
  return (
    <div className="w-[800px] h-[1200px] bg-white" dir="rtl">
      {/* Your template design here */}
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default Template5;
```

**Important Template Guidelines:**
- Fixed size: `800px × 1200px` (will be exported at 2400×3600 with 3x DPI)
- Always use `dir="rtl"` for Arabic support
- Available data fields:
  - `title` - Main title
  - `subtitle` - Subtitle
  - `description` - Description text
  - `date` - Event date
  - `time` - Event time
  - `location` - Event location
  - `speaker` - Speaker name (optional)
  - `contactEmail` - Contact email (optional)
  - `additionalInfo` - Additional information (optional)
  - `image` - Image URL (Template4 only)
  - `points` - Array of bullet points (Template4 only)

**3. Register Your Template**

Add your template to `ui/src/pages/Index.tsx`:

```typescript
import Template5 from "@/components/templates/Template5";

const templates: PosterTemplate[] = [
  // ... existing templates
  {
    id: "template5",
    name: "Your Template Name",
    nameAr: "اسم القالب بالعربي",
    component: Template5,
  },
];
```

### Customizing Form Fields for Templates

**Conditional Form Fields**

Form fields can be customized per template in `ui/src/components/PosterForm.tsx`:

```typescript
// Show/hide fields based on template
const showImageUpload = templateId === "template4" || templateId === "template5";
const showPoints = templateId === "template4";
const showAdditionalInfo = templateId !== "template4";
```

**Adding New Form Fields**

1. Update the `PosterData` type in `ui/src/types/poster.ts`:

```typescript
export interface PosterData {
  // ... existing fields
  yourNewField?: string; // Add new field
}
```

2. Add the form field in `ui/src/components/PosterForm.tsx`:

```typescript
<div className="space-y-2">
  <Label htmlFor="yourNewField" className="text-sm font-semibold text-right block" dir="rtl">
    Your Field Label
  </Label>
  <Input
    id="yourNewField"
    value={data.yourNewField || ""}
    onChange={(e) => handleChange("yourNewField", e.target.value)}
    placeholder="Placeholder text"
    className="text-right"
    dir="rtl"
  />
</div>
```

3. Use the field in your template:

```typescript
<p>{data.yourNewField}</p>
```

## Features

- ✨ **4 Professional Templates** - Ready-to-use Arabic poster designs
- 🎨 **Real-time Preview** - See changes instantly
- 📥 **High-Quality Export** - PNG (2400×3600) and PDF (A4)
- 🤖 **AI Enhancement** - Improve content with OpenAI or Gemini
- 🌍 **Arabic RTL Support** - Full right-to-left text support
- 🐳 **Docker Ready** - One command to start

## Export Quality

- **PNG Export**: 2400×3600 pixels (3x DPI scale)
- **PDF Export**: A4 format with centered content (3x DPI scale)
- Both formats use the hidden full-size template for pixel-perfect exports

## AI Enhancement

The AI enhancement feature uses:
- **OpenAI**: `gpt-4o-mini` model
- **Gemini**: `gemini-2.0-flash-exp` model

Configure API keys in `.env` to enable this feature.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: TailwindCSS, ShadCN UI
- **Export**: html2canvas, jsPDF
- **AI**: OpenAI API, Google Gemini API
- **Container**: Docker, Docker Compose

## Changing Port

Edit `docker-compose.yml` to change the port:

```yaml
ports:
  - "3000:8080"  # Change left side to your desired port
```

## License

MIT
