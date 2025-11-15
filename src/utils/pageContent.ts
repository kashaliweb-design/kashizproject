import { ContentSection, FAQ } from './pagesData';

interface PageContentData {
  contentSections: ContentSection[];
  faqs: FAQ[];
}

// Helper function to generate content sections for each page
export const generatePageContent = (pageId: string, pageName: string, category: string): PageContentData => {
  const contentMap: Record<string, PageContentData> = {
    // TEXT TOOLS
    'word-counter': {
      contentSections: [
        {
          id: '1',
          title: 'What is a Word Counter Tool?',
          content: 'A Word Counter is an essential online tool designed to help writers, students, content creators, and professionals accurately count the number of words, characters, sentences, and paragraphs in any given text. At Toolistan, our free Word Counter tool provides instant and accurate results, making it perfect for anyone who needs to meet specific word count requirements for essays, articles, blog posts, social media content, or any other written material. The tool is completely free to use, requires no registration, and works directly in your browser without any downloads or installations.',
          order: 1
        },
        {
          id: '2',
          title: 'Why Use Our Word Counter?',
          content: 'Our Word Counter tool at Toolistan offers numerous benefits for various users. Whether you are a student working on an assignment with strict word limits, a content writer optimizing articles for SEO, a social media manager crafting posts within character limits, or a professional preparing reports and documents, our tool provides accurate real-time counting. It helps you stay within word limits, improve your writing efficiency, optimize content for search engines, and ensure your text meets platform-specific requirements. The tool is fast, reliable, and provides comprehensive statistics including word count, character count with and without spaces, sentence count, paragraph count, and reading time estimates.',
          order: 2
        },
        {
          id: '3',
          title: 'How to Use the Word Counter Tool',
          content: 'Using our Word Counter tool is incredibly simple and straightforward. First, navigate to the Word Counter page on Toolistan. Then, simply paste or type your text into the text area provided. The tool will automatically and instantly count the words, characters, sentences, and paragraphs as you type or paste. You can see real-time updates of all statistics displayed clearly on the screen. The tool also provides additional information such as reading time, speaking time, and keyword density. You can easily copy your text, clear the text area, or export the statistics for your records. Our Word Counter works with text in any language and handles large documents efficiently.',
          order: 3
        },
        {
          id: '4',
          title: 'Features and Benefits',
          content: 'Toolistan Word Counter comes packed with powerful features designed to enhance your writing experience. Key features include real-time counting that updates as you type, accurate word and character counting algorithms, sentence and paragraph detection, reading time estimation based on average reading speed, speaking time calculation for presentations, keyword density analysis for SEO optimization, support for multiple languages, mobile-friendly responsive design, no registration or login required, completely free to use with no limitations, privacy-focused with no data storage, and fast processing even for large documents. These features make our Word Counter an indispensable tool for anyone working with text content.',
          order: 4
        }
      ],
      faqs: [
        {
          id: '1',
          question: 'Is the Word Counter tool free to use?',
          answer: 'Yes, our Word Counter tool is completely free to use with no limitations. You can count words in unlimited documents without any registration or payment required.',
          pageId: 'word-counter',
          order: 1
        },
        {
          id: '2',
          question: 'Does the tool store my text?',
          answer: 'No, we do not store any of your text. All processing happens locally in your browser, ensuring complete privacy and security of your content.',
          pageId: 'word-counter',
          order: 2
        },
        {
          id: '3',
          question: 'Can I use this tool for academic papers?',
          answer: 'Absolutely! Our Word Counter is perfect for academic papers, essays, research documents, and any other academic writing where word count requirements are important.',
          pageId: 'word-counter',
          order: 3
        },
        {
          id: '4',
          question: 'Does it work with different languages?',
          answer: 'Yes, our Word Counter supports text in multiple languages and uses intelligent algorithms to accurately count words regardless of the language used.',
          pageId: 'word-counter',
          order: 4
        },
        {
          id: '5',
          question: 'What is the maximum text length supported?',
          answer: 'Our Word Counter can handle very large documents efficiently. There is no strict limit, and the tool processes even lengthy documents quickly and accurately.',
          pageId: 'word-counter',
          order: 5
        }
      ]
    },

    'character-counter': {
      contentSections: [
        {
          id: '1',
          title: 'Understanding Character Counter Tool',
          content: 'The Character Counter tool by Toolistan is a powerful and free online utility that helps you count the exact number of characters in your text, including or excluding spaces. This tool is essential for writers, marketers, students, and professionals who need to adhere to specific character limits imposed by various platforms like Twitter, Facebook, Instagram, SMS messages, meta descriptions, and more. Our Character Counter provides instant results and displays both character count with spaces and without spaces, giving you complete flexibility in how you measure your text. The tool is designed to be fast, accurate, and user-friendly, making character counting effortless.',
          order: 1
        },
        {
          id: '2',
          title: 'Why Character Count Matters',
          content: 'Character counting is crucial in modern digital communication and content creation. Social media platforms like Twitter have strict character limits (280 characters), while meta descriptions for SEO should ideally be between 150-160 characters. SMS messages are typically limited to 160 characters, and many online forms have character restrictions. By using our Character Counter, you can ensure your content fits within these limits, optimize your messages for maximum impact, avoid truncation of important information, improve user experience, and maintain professional standards. Understanding character count helps you craft concise, effective messages that resonate with your audience while meeting platform requirements.',
          order: 2
        },
        {
          id: '3',
          title: 'How to Use Character Counter',
          content: 'Using the Toolistan Character Counter is simple and intuitive. Start by visiting our Character Counter page. Type or paste your text into the provided text area. The tool will automatically count characters in real-time as you type or paste. You will see two counts displayed: total characters including spaces, and total characters excluding spaces. Additional statistics like word count, sentence count, and paragraph count are also provided. You can easily edit your text and see the character count update instantly. The tool works on all devices including desktop computers, tablets, and smartphones, ensuring you can count characters wherever you are.',
          order: 3
        },
        {
          id: '4',
          title: 'Applications and Use Cases',
          content: 'The Character Counter tool has numerous practical applications across different fields. Content writers use it to optimize meta descriptions and title tags for SEO. Social media managers rely on it to craft perfect tweets, Facebook posts, and Instagram captions within character limits. Students use it for assignments with specific character requirements. Marketers use it for creating compelling ad copy that fits within advertising platform restrictions. Developers use it for testing form validations and input limits. Customer service teams use it for crafting concise responses. SMS marketers use it to ensure messages fit within standard SMS length. The versatility of our Character Counter makes it an indispensable tool for anyone working with text in the digital age.',
          order: 4
        }
      ],
      faqs: [
        {
          id: '1',
          question: 'What is the difference between characters with and without spaces?',
          answer: 'Characters with spaces count every character including space characters, while characters without spaces only count visible letters, numbers, and symbols, excluding all whitespace.',
          pageId: 'character-counter',
          order: 1
        },
        {
          id: '2',
          question: 'Is this tool accurate for all languages?',
          answer: 'Yes, our Character Counter accurately counts characters in all languages, including languages with special characters, accents, and non-Latin scripts.',
          pageId: 'character-counter',
          order: 2
        },
        {
          id: '3',
          question: 'Can I use this for Twitter character counting?',
          answer: 'Absolutely! Our tool is perfect for counting characters for Twitter posts. Remember that Twitter has a 280-character limit for most tweets.',
          pageId: 'character-counter',
          order: 3
        },
        {
          id: '4',
          question: 'Does it count emojis and special characters?',
          answer: 'Yes, our Character Counter counts all characters including emojis, special symbols, punctuation marks, and any other visible or invisible characters in your text.',
          pageId: 'character-counter',
          order: 4
        },
        {
          id: '5',
          question: 'Is there a limit to how much text I can count?',
          answer: 'No, there is no limit. You can count characters in texts of any length, from short tweets to lengthy documents, and the tool will process them instantly.',
          pageId: 'character-counter',
          order: 5
        }
      ]
    },

    'case-converter': {
      contentSections: [
        {
          id: '1',
          title: 'What is a Case Converter Tool?',
          content: 'The Case Converter tool by Toolistan is a versatile online utility that allows you to instantly convert text between different letter cases. Whether you need to convert text to UPPERCASE, lowercase, Title Case, Sentence case, or other variations, our free Case Converter makes it effortless. This tool is invaluable for writers, editors, students, programmers, and anyone who works with text and needs to quickly change the capitalization style. The Case Converter supports multiple case formats and processes text instantly without any manual retyping. It saves time, reduces errors, and ensures consistency in your text formatting across documents, websites, and applications.',
          order: 1
        },
        {
          id: '2',
          title: 'Available Case Conversion Options',
          content: 'Our Case Converter offers several powerful conversion options to meet all your text formatting needs. UPPERCASE converts all letters to capital letters, perfect for headings and emphasis. lowercase converts all letters to small letters, useful for email addresses and URLs. Title Case capitalizes the first letter of each word, ideal for titles and headings. Sentence case capitalizes only the first letter of each sentence, mimicking natural writing style. Capitalized Case capitalizes the first letter of each word including articles. Alternating Case alternates between uppercase and lowercase letters for creative effects. Inverse Case swaps the case of each letter. Each conversion option is designed to handle text intelligently, preserving numbers, special characters, and punctuation while transforming letter cases accurately.',
          order: 2
        },
        {
          id: '3',
          title: 'How to Use the Case Converter',
          content: 'Using the Toolistan Case Converter is straightforward and efficient. First, navigate to the Case Converter tool page. Paste or type your text into the input text area. Select the desired case conversion option from the available buttons (UPPERCASE, lowercase, Title Case, Sentence case, etc.). Click the conversion button and your text will be instantly transformed to the selected case format. You can then copy the converted text to your clipboard with a single click. The tool allows you to convert text multiple times, switching between different case formats until you achieve the desired result. It works seamlessly on all devices and browsers, providing a consistent experience whether you are on desktop, tablet, or mobile.',
          order: 3
        },
        {
          id: '4',
          title: 'Benefits and Use Cases',
          content: 'The Case Converter tool offers numerous benefits and serves various use cases across different professions and scenarios. Writers and editors use it to fix capitalization errors in manuscripts and articles. Students use it to format essays and assignments according to specific style guides. Programmers use it to convert variable names and code comments to different naming conventions. Content creators use it to format social media posts and blog titles consistently. Marketers use it to create attention-grabbing headlines and ad copy. Data entry professionals use it to standardize text data from multiple sources. SEO specialists use it to optimize title tags and meta descriptions. The tool eliminates the tedious manual work of retyping text in different cases, saving valuable time and ensuring accuracy in text formatting.',
          order: 4
        }
      ],
      faqs: [
        {
          id: '1',
          question: 'Does the Case Converter work with special characters?',
          answer: 'Yes, our Case Converter intelligently handles special characters, numbers, and punctuation marks, converting only the alphabetic characters while preserving all other elements.',
          pageId: 'case-converter',
          order: 1
        },
        {
          id: '2',
          question: 'Can I convert text in multiple languages?',
          answer: 'Absolutely! The Case Converter supports text in multiple languages including those with accented characters and non-Latin scripts, ensuring accurate case conversion across different alphabets.',
          pageId: 'case-converter',
          order: 2
        },
        {
          id: '3',
          question: 'Is there a limit on text length?',
          answer: 'No, there is no limit on the amount of text you can convert. Our tool efficiently handles everything from short phrases to lengthy documents.',
          pageId: 'case-converter',
          order: 3
        },
        {
          id: '4',
          question: 'What is the difference between Title Case and Sentence case?',
          answer: 'Title Case capitalizes the first letter of every word, while Sentence case only capitalizes the first letter of each sentence, similar to normal writing.',
          pageId: 'case-converter',
          order: 4
        },
        {
          id: '5',
          question: 'Can I undo a conversion?',
          answer: 'Yes, you can easily convert text back to its original format or try different case options until you get the desired result. The original text remains available for re-conversion.',
          pageId: 'case-converter',
          order: 5
        }
      ]
    }
  };

  // Return the content if it exists, otherwise return default content
  if (contentMap[pageId]) {
    return contentMap[pageId];
  }

  // Default content for pages not yet defined
  return {
    contentSections: [
      {
        id: '1',
        title: `About ${pageName}`,
        content: `Welcome to the ${pageName} tool on Toolistan. This powerful and free online tool is designed to help you ${pageName.toLowerCase()} quickly and efficiently. Whether you're a professional, student, or casual user, our ${pageName} provides accurate results instantly without any registration or downloads required. The tool works directly in your browser, ensuring your privacy and security while delivering fast, reliable performance. With an intuitive interface and comprehensive features, our ${pageName} makes your tasks easier and more efficient. Experience the convenience of professional-grade tools completely free at Toolistan.`,
        order: 1
      },
      {
        id: '2',
        title: `Key Features of ${pageName}`,
        content: `Our ${pageName} tool comes packed with powerful features designed to enhance your productivity. The tool offers real-time processing, accurate results, user-friendly interface, mobile compatibility, and no registration requirements. It supports various input formats and provides instant output that you can easily copy or download. The tool is optimized for speed and efficiency, handling even complex tasks with ease. All processing happens securely in your browser, ensuring complete privacy of your data. Whether you're working on a desktop computer, tablet, or smartphone, our ${pageName} delivers consistent performance across all devices. Best of all, it's completely free to use with no hidden costs or limitations.`,
        order: 2
      },
      {
        id: '3',
        title: `How to Use ${pageName}`,
        content: `Using the ${pageName} tool on Toolistan is simple and straightforward. Start by navigating to the ${pageName} page on our website. Input your data using the provided interface - you can type directly, paste from clipboard, or upload files depending on the tool's functionality. The tool will process your input instantly and display the results clearly on screen. You can then copy the results, download them, or perform additional operations as needed. The interface is designed to be intuitive, with helpful tooltips and clear instructions guiding you through each step. No technical knowledge is required, making our ${pageName} accessible to users of all skill levels.`,
        order: 3
      },
      {
        id: '4',
        title: `Benefits and Applications`,
        content: `The ${pageName} tool offers numerous benefits for various users and use cases. Professionals can use it to streamline their workflow and improve productivity. Students find it helpful for academic projects and assignments. Content creators rely on it for producing high-quality work efficiently. The tool saves time by automating tasks that would otherwise require manual effort. It ensures accuracy and consistency in results, reducing errors and improving quality. Whether you're working on personal projects or professional tasks, our ${pageName} provides the reliability and performance you need. The tool is regularly updated with new features and improvements based on user feedback, ensuring it remains a cutting-edge solution for your needs.`,
        order: 4
      }
    ],
    faqs: [
      {
        id: '1',
        question: `Is the ${pageName} tool free to use?`,
        answer: `Yes, our ${pageName} tool is completely free to use with no limitations. You can use it as many times as you need without any registration or payment required.`,
        pageId: pageId,
        order: 1
      },
      {
        id: '2',
        question: `Do I need to create an account?`,
        answer: `No, you don't need to create an account or register. Simply visit the ${pageName} page and start using the tool immediately.`,
        pageId: pageId,
        order: 2
      },
      {
        id: '3',
        question: `Is my data secure?`,
        answer: `Yes, all processing happens locally in your browser. We do not store, collect, or transmit your data to any servers, ensuring complete privacy and security.`,
        pageId: pageId,
        order: 3
      },
      {
        id: '4',
        question: `Can I use this tool on mobile devices?`,
        answer: `Absolutely! Our ${pageName} tool is fully responsive and works perfectly on all devices including smartphones, tablets, and desktop computers.`,
        pageId: pageId,
        order: 4
      },
      {
        id: '5',
        question: `Are there any usage limits?`,
        answer: `No, there are no usage limits. You can use the ${pageName} tool as many times as you need, process as much data as required, completely free of charge.`,
        pageId: pageId,
        order: 5
      }
    ]
  };
};
