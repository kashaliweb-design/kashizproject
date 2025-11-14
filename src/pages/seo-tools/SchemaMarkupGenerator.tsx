import React, { useState } from 'react';
import Layout from '../../components/Layout';
import PageContent from '../../components/PageContent';

const SchemaMarkupGenerator: React.FC = () => {
  const [schemaType, setSchemaType] = useState('Organization');
  const [schemaData, setSchemaData] = useState<any>({});

  const schemaTypes = [
    'Organization', 'Person', 'Article', 'Product', 'LocalBusiness', 
    'Recipe', 'Event', 'FAQ', 'BreadcrumbList', 'Review'
  ];

  const getSchemaFields = (type: string) => {
    switch (type) {
      case 'Organization':
        return [
          { key: 'name', label: 'Organization Name', type: 'text', required: true },
          { key: 'url', label: 'Website URL', type: 'url', required: true },
          { key: 'logo', label: 'Logo URL', type: 'url', required: false },
          { key: 'description', label: 'Description', type: 'textarea', required: false },
          { key: 'telephone', label: 'Phone Number', type: 'tel', required: false },
          { key: 'email', label: 'Email', type: 'email', required: false }
        ];
      case 'Person':
        return [
          { key: 'name', label: 'Full Name', type: 'text', required: true },
          { key: 'jobTitle', label: 'Job Title', type: 'text', required: false },
          { key: 'url', label: 'Website URL', type: 'url', required: false },
          { key: 'image', label: 'Photo URL', type: 'url', required: false },
          { key: 'email', label: 'Email', type: 'email', required: false },
          { key: 'telephone', label: 'Phone', type: 'tel', required: false }
        ];
      case 'Article':
        return [
          { key: 'headline', label: 'Article Title', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'author', label: 'Author Name', type: 'text', required: true },
          { key: 'datePublished', label: 'Published Date', type: 'date', required: true },
          { key: 'dateModified', label: 'Modified Date', type: 'date', required: false },
          { key: 'image', label: 'Featured Image URL', type: 'url', required: false }
        ];
      case 'Product':
        return [
          { key: 'name', label: 'Product Name', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'image', label: 'Product Image URL', type: 'url', required: false },
          { key: 'brand', label: 'Brand Name', type: 'text', required: false },
          { key: 'price', label: 'Price', type: 'number', required: false },
          { key: 'currency', label: 'Currency', type: 'text', required: false }
        ];
      default:
        return [
          { key: 'name', label: 'Name', type: 'text', required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: false }
        ];
    }
  };

  const generateSchema = () => {
    const schema: any = {
      "@context": "https://schema.org",
      "@type": schemaType
    };

    Object.entries(schemaData).forEach(([key, value]) => {
      if (value) {
        schema[key] = value;
      }
    });

    return JSON.stringify(schema, null, 2);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSchema());
  };

  const clearAll = () => {
    setSchemaData({});
  };

  const handleSchemaTypeChange = (type: string) => {
    setSchemaType(type);
    setSchemaData({});
  };

  const currentFields = getSchemaFields(schemaType);

  return (
    <Layout title="Schema Markup Generator" showBackButton>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Schema Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">Schema Type</label>
                <select
                  value={schemaType}
                  onChange={(e) => handleSchemaTypeChange(e.target.value)}
                  className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  {schemaTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {currentFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={schemaData[field.key] || ''}
                      onChange={(e) => setSchemaData({...schemaData, [field.key]: e.target.value})}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="w-full h-20 p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={schemaData[field.key] || ''}
                      onChange={(e) => setSchemaData({...schemaData, [field.key]: e.target.value})}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      className="w-full p-3 backdrop-blur-md bg-black/20 border border-glass rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Generated Schema */}
          <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">Generated Schema</h3>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm rounded-md hover:opacity-90 transition-opacity"
              >
                Copy JSON-LD
              </button>
            </div>
            
            <div className="backdrop-blur-md bg-black/20 border border-glass rounded-lg p-4 h-64 overflow-y-auto">
              <pre className="text-white/90 whitespace-pre-wrap text-sm font-mono">
                {generateSchema()}
              </pre>
            </div>

            <div className="mt-4 backdrop-blur-md bg-black/10 border border-glass rounded-lg p-3">
              <div className="text-white/70 text-sm mb-2">How to use:</div>
              <div className="text-white/60 text-xs">
                Copy the JSON-LD code and paste it in a &lt;script type="application/ld+json"&gt; tag in your HTML head section.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Clear All
          </button>
        </div>

        {/* Schema Information */}
        <div className="backdrop-blur-md bg-black/20 border border-glass rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Schema Markup Benefits</h3>
          <div className="space-y-3 text-white/70 text-sm">
            <p>• Helps search engines understand your content better</p>
            <p>• Can improve search result appearance with rich snippets</p>
            <p>• Increases click-through rates from search results</p>
            <p>• Provides better context for voice search queries</p>
            <p>• Supports Google's Knowledge Graph integration</p>
          </div>
        </div>
      </div>

        <PageContent />
    </Layout>
  );
};

export default SchemaMarkupGenerator;