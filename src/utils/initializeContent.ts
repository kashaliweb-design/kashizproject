import { PageData } from './pagesData';
import { generatePageContent } from './pageContent';

// This function initializes content for all pages
export const initializePageContent = () => {
  const savedData = localStorage.getItem('pagesData');
  if (!savedData) return;

  const pagesData: PageData[] = JSON.parse(savedData);
  let updated = false;

  // List of pages with predefined content that should be force-updated
  const pagesWithPredefinedContent = ['word-counter', 'character-counter', 'case-converter', 'tip-calculator', 'loan-calculator', 'color-picker', 'gradient-generator', 'color-palette-generator', 'random-color-generator', 'color-contrast-checker', 'hex-to-rgb', 'rgb-to-hex', 'meta-tag-generator'];

  pagesData.forEach(page => {
    // Force update pages with predefined content
    if (pagesWithPredefinedContent.includes(page.id)) {
      const pageContent = generatePageContent(page.id, page.name, page.category);
      // Only update if content is different or missing
      if (!page.contentSections || page.contentSections.length === 0 || 
          JSON.stringify(page.contentSections) !== JSON.stringify(pageContent.contentSections)) {
        page.contentSections = pageContent.contentSections;
        page.faqs = pageContent.faqs;
        updated = true;
      }
    } else {
      // For other pages, only add content if page doesn't have any
      if (!page.contentSections || page.contentSections.length === 0) {
        const pageContent = generatePageContent(page.id, page.name, page.category);
        page.contentSections = pageContent.contentSections;
        page.faqs = pageContent.faqs;
        updated = true;
      } else if (!page.faqs || page.faqs.length === 0) {
        const pageContent = generatePageContent(page.id, page.name, page.category);
        page.faqs = pageContent.faqs;
        updated = true;
      }
    }
  });

  if (updated) {
    localStorage.setItem('pagesData', JSON.stringify(pagesData));
    window.dispatchEvent(new Event('pagesDataUpdated'));
  }
};
