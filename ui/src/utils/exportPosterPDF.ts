import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPosterAsPDF = async (elementId: string = "poster-preview") => {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error("Poster element not found");
  }

  try {
    // Create canvas from the poster element
    const canvas = await html2canvas(element, {
      scale: 3, // 3x resolution for high quality (matching PNG export)
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      width: 800,
      height: 1200,
    });

    // Convert canvas to image
    const imgData = canvas.toDataURL("image/png");

    // Create PDF (A4 portrait, but sized to poster dimensions)
    // Poster is 800x1200px, convert to mm (assuming 96 DPI)
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm

    // Calculate dimensions to fit poster in A4
    const posterAspectRatio = 800 / 1200; // 0.666
    const pdfAspectRatio = pdfWidth / pdfHeight;

    let imgWidth, imgHeight, xOffset, yOffset;

    if (posterAspectRatio > pdfAspectRatio) {
      // Poster is wider relative to height
      imgWidth = pdfWidth;
      imgHeight = pdfWidth / posterAspectRatio;
      xOffset = 0;
      yOffset = (pdfHeight - imgHeight) / 2;
    } else {
      // Poster is taller relative to width
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * posterAspectRatio;
      xOffset = (pdfWidth - imgWidth) / 2;
      yOffset = 0;
    }

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);

    // Download PDF
    const timestamp = new Date().toISOString().slice(0, 10);
    pdf.save(`poster-${timestamp}.pdf`);

    return true;
  } catch (error) {
    console.error("Error exporting poster as PDF:", error);
    throw error;
  }
};
