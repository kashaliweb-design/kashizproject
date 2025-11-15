import { PageData, ContentSection, FAQ } from './pagesData';

// This function initializes content for all pages
export const initializePageContent = () => {
  const savedData = localStorage.getItem('pagesData');
  if (!savedData) return;

  const pagesData: PageData[] = JSON.parse(savedData);
  let updated = false;

  pagesData.forEach(page => {
    // Only add content if page doesn't have any
    if (!page.contentSections || page.contentSections.length === 0) {
      page.contentSections = generateContentForPage(page.id, page.name, page.category);
      updated = true;
    }
    
    if (!page.faqs || page.faqs.length === 0) {
      page.faqs = generateFAQsForPage(page.id, page.name, page.category);
      updated = true;
    }
  });

  if (updated) {
    localStorage.setItem('pagesData', JSON.stringify(pagesData));
    window.dispatchEvent(new Event('pagesDataUpdated'));
  }
};

const generateContentForPage = (pageId: string, pageName: string, category: string): ContentSection[] => {
  return [
    {
      id: `${pageId}-1`,
      title: `What is ${pageName}?`,
      content: `The ${pageName} tool on Toolistan is a powerful, free online utility designed to help you ${getToolPurpose(pageName, category)}. Whether you're a professional, student, content creator, or casual user, our ${pageName} provides instant, accurate results without requiring any registration, downloads, or installations. This browser-based tool ensures complete privacy and security while delivering lightning-fast performance. With an intuitive interface and comprehensive features, our ${pageName} streamlines your workflow and enhances productivity. At Toolistan, we believe in providing professional-grade tools that are accessible to everyone, completely free of charge. Our ${pageName} is regularly updated with new features and improvements based on user feedback, ensuring it remains at the forefront of online tools technology.`,
      order: 1
    },
    {
      id: `${pageId}-2`,
      title: `Key Features and Benefits`,
      content: `Our ${pageName} tool comes packed with powerful features designed to enhance your experience and productivity. The tool offers real-time processing that delivers instant results as you work, ensuring you don't waste time waiting. It features an intuitive, user-friendly interface that makes it accessible to users of all skill levels, from beginners to experts. The tool is fully responsive and mobile-compatible, working seamlessly across desktop computers, tablets, and smartphones. No registration or account creation is required - simply visit the page and start using the tool immediately. All processing happens securely in your browser, ensuring complete privacy and data security. The tool supports various input formats and provides flexible output options. It's optimized for speed and efficiency, handling even complex tasks with ease. Best of all, it's completely free to use with no hidden costs, limitations, or premium features locked behind paywalls.`,
      order: 2
    },
    {
      id: `${pageId}-3`,
      title: `How to Use ${pageName}`,
      content: `Using the ${pageName} tool on Toolistan is incredibly simple and straightforward, designed with user experience in mind. Start by navigating to the ${pageName} page on our website through the main menu or search function. Once on the page, you'll see a clean, intuitive interface with clear instructions. ${getUsageInstructions(pageName, category)} The tool processes your input instantly and displays results in a clear, easy-to-read format. You can copy the results to your clipboard with a single click, download them in various formats, or perform additional operations as needed. The interface includes helpful tooltips and guidance to assist you through each step. No technical knowledge or expertise is required, making our ${pageName} accessible to everyone. The tool remembers your preferences for a better user experience while maintaining complete privacy and security.`,
      order: 3
    },
    {
      id: `${pageId}-4`,
      title: `Applications and Use Cases`,
      content: `The ${pageName} tool serves a wide range of applications and use cases across different industries and user groups. ${getUseCases(pageName, category)} Professionals use it to streamline their daily workflows and improve efficiency in their work. Students find it invaluable for academic projects, assignments, and research work. Content creators and digital marketers rely on it for producing high-quality content and optimizing their online presence. Developers and programmers use it for various technical tasks and testing purposes. Small business owners leverage it to save time and resources on tasks that would otherwise require expensive software or services. The tool's versatility makes it suitable for both personal and professional use, handling everything from simple everyday tasks to complex professional requirements. Its reliability and accuracy have made it a trusted choice for thousands of users worldwide who depend on it for their daily needs.`,
      order: 4
    }
  ];
};

const generateFAQsForPage = (pageId: string, pageName: string, category: string): FAQ[] => {
  return [
    {
      id: `${pageId}-faq-1`,
      question: `Is the ${pageName} tool completely free?`,
      answer: `Yes, our ${pageName} tool is 100% free to use with absolutely no limitations. You can use it as many times as you need without any registration, subscription, or payment required. We believe in providing accessible tools for everyone.`,
      pageId: pageId,
      order: 1
    },
    {
      id: `${pageId}-faq-2`,
      question: `Do I need to create an account or register?`,
      answer: `No, you don't need to create an account, register, or provide any personal information. Simply visit the ${pageName} page and start using the tool immediately. We respect your privacy and don't require unnecessary data collection.`,
      pageId: pageId,
      order: 2
    },
    {
      id: `${pageId}-faq-3`,
      question: `Is my data safe and secure?`,
      answer: `Absolutely! All processing happens locally in your browser. We do not store, collect, transmit, or have access to your data in any way. Your information remains completely private and secure on your device.`,
      pageId: pageId,
      order: 3
    },
    {
      id: `${pageId}-faq-4`,
      question: `Can I use this tool on mobile devices?`,
      answer: `Yes! Our ${pageName} tool is fully responsive and optimized for all devices. It works perfectly on smartphones, tablets, and desktop computers, providing a consistent experience across all screen sizes and platforms.`,
      pageId: pageId,
      order: 4
    },
    {
      id: `${pageId}-faq-5`,
      question: `Are there any usage limits or restrictions?`,
      answer: `No, there are no usage limits, restrictions, or quotas. You can use the ${pageName} tool as many times as you need, process as much data as required, completely free of charge without any limitations.`,
      pageId: pageId,
      order: 5
    }
  ];
};

const getToolPurpose = (toolName: string, category: string): string => {
  const purposes: Record<string, string> = {
    'Word Counter': 'count words, characters, sentences, and paragraphs in your text with precision and speed',
    'Character Counter': 'accurately count characters in your text, including or excluding spaces, for social media, SEO, and content optimization',
    'Case Converter': 'convert text between different letter cases including uppercase, lowercase, title case, and more',
    'Text to Binary': 'convert text to binary code and vice versa for programming, data encoding, and educational purposes',
    'Reverse Text': 'reverse your text instantly for creative writing, social media posts, and fun text transformations',
    'Remove Duplicates': 'remove duplicate lines from your text to clean up data and improve content quality',
    'Meta Tag Generator': 'generate SEO-optimized meta tags for your website to improve search engine rankings',
    'URL Slug Generator': 'create SEO-friendly URL slugs from your titles for better website structure',
    'BMI Calculator': 'calculate your Body Mass Index and understand your health status',
    'Age Calculator': 'calculate your exact age in years, months, days, hours, and minutes',
    'Temperature Converter': 'convert temperatures between Celsius, Fahrenheit, and Kelvin instantly',
    'Color Picker': 'pick colors from images and get color codes in various formats',
    'CSV to JSON': 'convert CSV files to JSON format for data processing and web development',
  };
  
  return purposes[toolName] || `perform ${toolName.toLowerCase()} operations quickly and efficiently for your ${category.toLowerCase()} needs`;
};

const getUsageInstructions = (toolName: string, category: string): string => {
  if (category === 'Text Tools') {
    return 'Simply paste or type your text into the input area provided. ';
  } else if (category === 'Calculator Tools') {
    return 'Enter the required values in the input fields provided. ';
  } else if (category === 'Unit Converters') {
    return 'Enter the value you want to convert and select the units. ';
  } else if (category === 'Color Tools') {
    return 'Use the color picker or enter color values in the provided fields. ';
  } else if (category === 'File Tools') {
    return 'Upload your file or paste your data in the input area. ';
  } else if (category === 'SEO Tools') {
    return 'Enter your website URL or content in the provided fields. ';
  }
  return 'Follow the on-screen instructions to input your data. ';
};

const getUseCases = (toolName: string, category: string): string => {
  const useCases: Record<string, string> = {
    'Text Tools': 'Writers and editors use these tools to analyze and format text for articles, books, and documents. Students rely on them for essays and assignments with specific formatting requirements. Content creators use them to optimize social media posts and blog content. Programmers use them for code formatting and data processing.',
    'SEO Tools': 'Digital marketers use these tools to optimize websites for search engines and improve rankings. SEO specialists rely on them for technical SEO audits and optimization. Content marketers use them to create SEO-friendly content. Web developers use them to implement proper SEO practices.',
    'Calculator Tools': 'Financial planners use these calculators for investment and loan calculations. Healthcare professionals use them for medical calculations and assessments. Students use them for mathematical problems and homework. Business owners use them for financial planning and analysis.',
    'Unit Converters': 'Engineers use these converters for technical calculations and specifications. Scientists use them for research and laboratory work. International businesses use them for global trade and commerce. Travelers use them for currency and measurement conversions.',
    'Color Tools': 'Graphic designers use these tools for creating color schemes and palettes. Web developers use them for implementing color codes in websites. Artists use them for digital art and design projects. Marketers use them for brand identity and visual content.',
    'File Tools': 'Data analysts use these tools for data conversion and processing. Developers use them for file format transformations. Business professionals use them for document management. Researchers use them for data organization and analysis.',
  };
  
  return useCases[category] || 'Users across various industries rely on this tool for their daily tasks and professional requirements.';
};
