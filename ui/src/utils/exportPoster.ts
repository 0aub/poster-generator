import html2canvas from "html2canvas";

export const exportPosterAsPNG = async (elementId: string = "poster-preview") => {
  const element = document.getElementById(elementId);

  if (!element) {
    throw new Error("Poster element not found");
  }

  try {
    // Create canvas from the poster element
    const canvas = await html2canvas(element, {
      scale: 3, // 3x resolution for high quality (2400x3600)
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      width: 800, // Explicitly set dimensions
      height: 1200,
    });

    // Convert to blob
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create image blob");
      }

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const timestamp = new Date().toISOString().slice(0, 10);
      link.download = `poster-${timestamp}.png`;
      link.href = url;
      link.click();

      // Cleanup
      URL.revokeObjectURL(url);
    }, "image/png");

    return true;
  } catch (error) {
    console.error("Error exporting poster:", error);
    throw error;
  }
};
