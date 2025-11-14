const fs = require('fs');
const path = require('path');

// Directories to process
const directories = [
  'src/pages/text-tools',
  'src/pages/seo-tools',
  'src/pages/calculator-tools',
  'src/pages/unit-converters',
  'src/pages/color-tools',
  'src/pages/file-tools',
  'src/pages/audio-tools',
  'src/pages/video-tools'
];

function addPageContentToFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has PageContent
  if (content.includes('PageContent')) {
    console.log(`✓ Skipped (already has PageContent): ${filePath}`);
    return;
  }
  
  // Skip admin pages
  if (filePath.includes('admin')) {
    console.log(`✓ Skipped (admin page): ${filePath}`);
    return;
  }
  
  // Add import statement after Layout import
  if (content.includes("import Layout from '../../components/Layout';")) {
    content = content.replace(
      "import Layout from '../../components/Layout';",
      "import Layout from '../../components/Layout';\nimport PageContent from '../../components/PageContent';"
    );
  } else if (content.includes("import Layout from '../components/Layout';")) {
    content = content.replace(
      "import Layout from '../components/Layout';",
      "import Layout from '../components/Layout';\nimport PageContent from '../components/PageContent';"
    );
  }
  
  // Add <PageContent /> before </Layout>
  // Look for the pattern: whitespace + </div> + whitespace + </Layout>
  const layoutClosePattern = /(\s+)<\/div>(\s+)<\/Layout>/;
  if (layoutClosePattern.test(content)) {
    content = content.replace(
      layoutClosePattern,
      '$1</div>\n\n        <PageContent />$2</Layout>'
    );
  }
  
  // Write the modified content back
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Updated: ${filePath}`);
}

function processDirectory(dir) {
  const fullPath = path.join(__dirname, dir);
  
  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  Directory not found: ${fullPath}`);
    return;
  }
  
  const files = fs.readdirSync(fullPath);
  
  files.forEach(file => {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(fullPath, file);
      addPageContentToFile(filePath);
    }
  });
}

console.log('🚀 Starting to add PageContent to all pages...\n');

directories.forEach(dir => {
  console.log(`\n📁 Processing: ${dir}`);
  processDirectory(dir);
});

console.log('\n✨ Done! All pages have been updated.');
console.log('\n📝 Summary:');
console.log('- PageContent component import added');
console.log('- <PageContent /> component added before </Layout>');
console.log('- This will display content sections and FAQs from the dashboard on all pages');
