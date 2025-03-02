
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from "sonner";

interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
}

interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface CVData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
  about: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: string[];
}

export const generatePDF = async (cvData: CVData) => {
  const { firstName, lastName } = cvData;
  const fullName = `${firstName} ${lastName}`.trim();
  
  if (!fullName) {
    toast.error("Please enter at least your name before generating a PDF");
    return;
  }
  
  try {
    toast.info("Preparing your CV for download...");
    
    const cvElement = document.querySelector('.bg-white.rounded-2xl.shadow-md') as HTMLElement;
    
    if (!cvElement) {
      toast.error("Could not find CV preview element");
      return;
    }
    
    // Temporarily adjust the element for better PDF generation
    const originalPadding = cvElement.style.padding;
    const originalBorder = cvElement.style.border;
    const originalBorderRadius = cvElement.style.borderRadius;
    const originalBoxShadow = cvElement.style.boxShadow;
    const originalOverflow = cvElement.style.overflow;
    
    cvElement.style.padding = '10mm';
    cvElement.style.border = 'none';
    cvElement.style.borderRadius = '0';
    cvElement.style.boxShadow = 'none';
    cvElement.style.overflow = 'visible';
    
    // Create canvas from the element
    const canvas = await html2canvas(cvElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      allowTaint: true,
      onclone: (clonedDoc) => {
        // Additional styling adjustments to the cloned document if needed
        const clonedElement = clonedDoc.querySelector('.bg-white.rounded-2xl.shadow-md') as HTMLElement;
        if (clonedElement) {
          clonedElement.style.height = 'auto';
          clonedElement.style.minHeight = '100%';
        }
      }
    });
    
    // Restore original styles
    cvElement.style.padding = originalPadding;
    cvElement.style.border = originalBorder;
    cvElement.style.borderRadius = originalBorderRadius;
    cvElement.style.boxShadow = originalBoxShadow;
    cvElement.style.overflow = originalOverflow;
    
    // Calculate PDF dimensions (A4)
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Split into pages if content is too long
    let position = 0;
    
    // Add first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    
    // Add more pages if needed
    const heightLeft = imgHeight - pageHeight;
    
    if (heightLeft > 0) {
      let page = 1;
      
      while (position < imgHeight) {
        position -= (pageHeight - 10); // 10mm overlap for better transitions
        pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
        page++;
      }
    }
    
    // Save PDF
    const filename = `${fullName.replace(/\s+/g, '_')}_CV.pdf`;
    pdf.save(filename);
    
    toast.success("CV downloaded successfully!");
  } catch (error) {
    console.error("Error generating PDF:", error);
    toast.error("There was an error generating your PDF. Please try again.");
  }
};
