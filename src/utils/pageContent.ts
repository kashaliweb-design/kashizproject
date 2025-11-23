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
          title: 'What is WordCounter? — Tolistaan\'s Free Online Word Count Tool',
          content: 'Tolistaan\'s WordCounter is a smart, fast, and user-friendly Free Online Word Counter Tool designed to help you count words, improve your writing, and get instant results. Whether you are a student, blogger, content creator, or professional writer, our word counter website makes writing easier, cleaner, and more accurate. Simply paste your text or start typing in the editor, and the tool will automatically count words and characters in real time. Every edit, delete, or update instantly adjusts the results, ensuring you always stay within your required word or character limits.',
          order: 1
        },
        {
          id: '2',
          title: 'Why Use Tolistaan\'s WordCounter?',
          content: '<strong>1. Count Words & Characters Instantly</strong><br/>Our advanced Character Counter and Word Counter give you instant results, showing your total words, characters (with and without spaces), sentences, and paragraphs. It also works as a reliable paragraph counter for longer content.<br/><br/><strong>2. Improve Your Writing Style</strong><br/>The tool is designed not only to Count Words but also to help you Correct Writing. You can refine your tone, eliminate unnecessary wording, and produce more clear and engaging content.<br/><br/><strong>3. Keyword Insights for Better SEO</strong><br/>Tolistaan\'s editor shows your top keywords and keyword density, ensuring you avoid over-optimization. This helps content creators maintain a natural flow while improving ranking opportunities.<br/><br/><strong>4. Reading Level & Engagement Score</strong><br/>Our built-in Reading Level feature tells you how easy or difficult your text is to understand. This ensures your content matches your audience\'s reading capability.<br/><br/><strong>5. Auto-Save Feature</strong><br/>No need to worry about losing your work. The text editor auto-saves your content so you can return anytime.',
          order: 2
        },
        {
          id: '3',
          title: 'How Tolistaan\'s Free Word Count Tool Helps You',
          content: 'Knowing the word count of your text is essential, especially for:<br/><ul><li>Articles & blog posts</li><li>Essays & academic assignments</li><li>Reports and books</li><li>Business documents</li><li>Creative writing</li><li>Social media captions</li><li>SEO-optimized content</li></ul><br/>Tolistaan\'s Free Online Word Counter, Free Word Count Tool, and all-in-one Writing Tools help you meet your required word limits while improving clarity and structure.',
          order: 3
        },
        {
          id: '4',
          title: 'Features Packed in One Powerful Counting Tool',
          content: '<ul><li>Free Online Word Counter</li><li>Count Words and Characters</li><li>Character Counter</li><li>Paragraph Counter</li><li>Reading Level Checker</li><li>Correct Writing Suggestions</li><li>Keyword Analysis</li><li>Writing Tools for SEO & Clarity</li><li>Instant Results</li><li>Auto-Save (No Data Loss!)</li><li>Clean, fast, mobile-friendly interface</li></ul><br/>Everything inside Tolistaan is built to Help WordCounter users write better, faster, and smarter.',
          order: 4
        },
        {
          id: '5',
          title: 'Why Tolistaan Is the Best Word Counting Tool Online',
          content: 'Tolistaan gives you accuracy, reliability, and a smooth writing experience. Whether you want to check your word limit, improve readability, or analyze keyword frequency, our counting tool provides everything in one place. We aim to make writing easier for everyone — from beginners to professionals — with tools that are simple, powerful, and 100% free.',
          order: 5
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
          title: 'What is a Convert Case Tool?',
          content: 'Welcome to Tolistaan, the most accurate and Free Online Case Converter Tool on the internet. Our Convert Case tool helps you instantly transform any text into multiple formats such as Sentence Case, Lowercase Letters, UPPERCASE, Title Case, alternated text, and many more. Whether you\'re a student, writer, blogger, or professional, Tolistaan makes it easy to Convert Uppercase to Lowercase, fix capitalization errors, or format text professionally with just one click. If your keyboard is stuck on CAPS LOCK, or you need a clean, readable format for your writing, our case converter tool gives you fast, error-free results.',
          order: 1
        },
        {
          id: '2',
          title: 'Sentence Case',
          content: 'Our Sentence Case Converter automatically converts your entire text into perfect sentence style. It capitalizes only the first letter of the sentence and converts the rest into lowercase. This tool is ideal for writers who want to change to sentence case effortlessly or fix improperly typed text. Whether your text came from notes, copied content, or CAPS LOCK mistakes, the sentence case tool corrects everything instantly.',
          order: 2
        },
        {
          id: '3',
          title: 'Lower Case',
          content: 'Need to convert text into small letters? Tolistaan\'s Lowercase letter tool instantly converts all characters into clean, simple lowercase formatting. It is also perfect for converting capital letter to small letter or doing fast transformations like caps to lowercase or using our caps to lowercase converter when an accidental uppercase text appears.',
          order: 3
        },
        {
          id: '4',
          title: 'Upper Case',
          content: 'Want to convert all text into capital letters? The all caps converter instantly transforms any sentence into UPPERCASE letters. Great for headings, emphasis text, formal documents, and when you need quick Text Case Convert features that remove formatting errors.',
          order: 4
        },
        {
          id: '5',
          title: 'Capitalized Case',
          content: 'The Capitalized Case tool capitalizes the first letter of every word, making your text look neat, professional, and ready for branding or titles. This option is especially helpful for social media posts, names, product titles, and formatting long blocks of text.',
          order: 5
        },
        {
          id: '6',
          title: 'Alternating Case',
          content: 'If you want fun, creative, eye-catching text, the Convert to Alternate Case tool changes your sentence into alternating upper and lowercase letters. Perfect for memes, fun messages, or unique styling.',
          order: 6
        },
        {
          id: '7',
          title: 'Title Case',
          content: 'Tolistaan\'s Title Case Converter Tool uses advanced rules to format your titles professionally — just like books, articles, and headlines. Our title capitalization converter and title case tool fix capitalization rules for English titles, ensuring the first letter of important words is capitalized correctly.',
          order: 7
        },
        {
          id: '8',
          title: 'Small Text Generator',
          content: 'Generate stylish, tiny-font text with the Small Text Generator. This tool converts your text into Unicode small characters, ideal for social media bios, captions, and aesthetic writing.',
          order: 8
        },
        {
          id: '9',
          title: 'Wide Text Generator',
          content: 'Use the Wide Text Generator to add spacing between letters, creating a stretched-out visual effect. Great for design work and creative formatting.',
          order: 9
        },
        {
          id: '10',
          title: 'Strikethrough Text Generator',
          content: 'The Strikethrough Text Generator lets you cross out text for memes, corrections, edits, or creative writing. One click adds strikethrough formatting to any sentence.',
          order: 10
        },
        {
          id: '11',
          title: 'An Easy Way to Change Uppercase to Lowercase and Title Capitalization',
          content: 'Tolistaan gives you the easiest way to Convert Uppercase to Lowercase, fix capitalization errors, and format text into title, sentence, or capitalized style. No need to manually retype your text — simply paste it, choose a case format, and get instant results.',
          order: 11
        },
        {
          id: '12',
          title: 'Case Converter Tool to Easily Transform Any Text',
          content: 'Our Free Online Case Converter Tool helps you transform text quickly:<br/><ul><li>Uppercase</li><li>Lowercase</li><li>Sentence Case</li><li>Title Case</li><li>Alternating Case</li><li>Capitalized Case</li></ul><br/>Tolistaan makes Convert Case Online simple, fast, and accurate.',
          order: 12
        },
        {
          id: '13',
          title: 'Convert to Toggle Case',
          content: 'The Toggle Case feature flips every letter — uppercase becomes lowercase and lowercase becomes uppercase. This is perfect when text is typed incorrectly or when you need a stylistic variation.',
          order: 13
        },
        {
          id: '14',
          title: 'Change Text Case to Sentence Case',
          content: 'If your text is in all caps or fully lowercase, you can change text case to sentence case with a single click. Useful for writers and editors who need quick formatting without manual effort.',
          order: 14
        },
        {
          id: '15',
          title: 'Convert Lower Case To Upper Case Letters',
          content: 'Instantly transform any lowercase text into clean uppercase formatting. Perfect for headings, announcements, and bold statements.',
          order: 15
        },
        {
          id: '16',
          title: 'Text Converter: Capital Letters and Small Letters',
          content: 'Using our advanced Text Case Convert tool, you can switch between capital letters and small letters flawlessly. It works better and faster than formatting in documents like Word. This includes conversions like:<br/><ul><li>capital letters to small converter</li><li>uppercase to lowercase in Word alternative</li><li>caps lock converter</li></ul><br/>Tolistaan simplifies everything with one click.',
          order: 16
        },
        {
          id: '17',
          title: 'Convert to Alternate Case',
          content: 'Use the Alternating Case tool to create playful and visually interesting text. It switches between uppercase and lowercase letters automatically, giving you a unique text style.',
          order: 17
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
