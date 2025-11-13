import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Edit, Save, X, Image as ImageIcon, FileText, Tag, Globe, BarChart, Settings, FileEdit, HelpCircle, Plus, Trash2, AlertCircle } from 'lucide-react';
import { PageData, initialPagesData } from '../../utils/pagesData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PageData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'pages' | 'content' | 'faq'>('pages');
  const [pageContent, setPageContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [faqs, setFaqs] = useState<{id: number, question: string, answer: string}[]>([]);
  const [newFaq, setNewFaq] = useState({question: '', answer: ''});

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
      return;
    }
    loadPagesData();
    loadContent();
    loadFaqs();
  }, [navigate]);

  useEffect(() => {
    const words = pageContent.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [pageContent]);

  const loadPagesData = () => {
    const savedData = localStorage.getItem('pagesData');
    if (savedData) {
      setPages(JSON.parse(savedData));
    } else {
      setPages(initialPagesData);
      localStorage.setItem('pagesData', JSON.stringify(initialPagesData));
    }
  };

  const loadContent = () => {
    const savedContent = localStorage.getItem('pageContent');
    if (savedContent) {
      setPageContent(savedContent);
    }
  };

  const loadFaqs = () => {
    const savedFaqs = localStorage.getItem('faqs');
    if (savedFaqs) {
      setFaqs(JSON.parse(savedFaqs));
    }
  };

  const handleSaveContent = () => {
    localStorage.setItem('pageContent', pageContent);
    alert('Content saved successfully!');
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer) {
      const updatedFaqs = [...faqs, { id: Date.now(), ...newFaq }];
      setFaqs(updatedFaqs);
      localStorage.setItem('faqs', JSON.stringify(updatedFaqs));
      setNewFaq({question: '', answer: ''});
    }
  };

  const handleDeleteFaq = (id: number) => {
    const updatedFaqs = faqs.filter(faq => faq.id !== id);
    setFaqs(updatedFaqs);
    localStorage.setItem('faqs', JSON.stringify(updatedFaqs));
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleEditPage = (page: PageData) => {
    setSelectedPage({ ...page });
    setEditMode(true);
  };

  const handleSavePage = () => {
    if (selectedPage) {
      const updatedPages = pages.map(p => p.id === selectedPage.id ? selectedPage : p);
      setPages(updatedPages);
      localStorage.setItem('pagesData', JSON.stringify(updatedPages));
      setEditMode(false);
      setSelectedPage(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedPage(null);
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.name.toLowerCase().includes(searchTerm.toLowerCase()) || page.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || page.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(pages.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-8 h-8 text-indigo-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage all pages and SEO content</p>
              </div>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 bg-white rounded-lg shadow">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('pages')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                activeTab === 'pages'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Pages Management
              </div>
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                activeTab === 'content'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileEdit className="w-5 h-5" />
                Content Update
              </div>
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                activeTab === 'faq'
                  ? 'border-b-2 border-indigo-600 text-indigo-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <HelpCircle className="w-5 h-5" />
                FAQ Management
              </div>
            </button>
          </div>
        </div>

        {activeTab === 'pages' && (
        <>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pages</p>
                <p className="text-3xl font-bold text-gray-900">{pages.length}</p>
              </div>
              <FileText className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Categories</p>
                <p className="text-3xl font-bold text-gray-900">{categories.length - 1}</p>
              </div>
              <Tag className="w-12 h-12 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">SEO Optimized</p>
                <p className="text-3xl font-bold text-gray-900">{pages.filter(p => p.seo.keywords).length}</p>
              </div>
              <BarChart className="w-12 h-12 text-purple-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">With Images</p>
                <p className="text-3xl font-bold text-gray-900">{pages.filter(p => p.seo.ogImage).length}</p>
              </div>
              <ImageIcon className="w-12 h-12 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="Search pages..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
            </div>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Page Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Path</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SEO Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPages.map(page => (
                  <tr key={page.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{page.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">{page.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{page.path}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {page.seo.keywords && <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Keywords</span>}
                        {page.seo.ogImage && <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Image</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEditPage(page)} className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Page Content Editor</h2>
                  <p className="text-sm text-gray-600 mt-1">Write and update your page content (up to 2000 words)</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Word Count</p>
                    <p className={`text-2xl font-bold ${
                      wordCount > 2000 ? 'text-red-600' : wordCount > 1800 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {wordCount} / 2000
                    </p>
                  </div>
                </div>
              </div>

              {wordCount > 2000 && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Word limit exceeded!</p>
                    <p className="text-sm text-red-600">Please reduce your content to 2000 words or less.</p>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={pageContent}
                  onChange={(e) => setPageContent(e.target.value)}
                  rows={20}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
                  placeholder="Start writing your content here...\n\nYou can write up to 2000 words. This content will be displayed on your website pages."
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-gray-600">
                  <p>Characters: {pageContent.length}</p>
                </div>
                <button
                  onClick={handleSaveContent}
                  disabled={wordCount > 2000}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition"
                >
                  <Save className="w-5 h-5" />
                  Save Content
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Writing Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Write clear, engaging content that provides value to your readers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Use headings and subheadings to organize your content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Include relevant keywords naturally for better SEO</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>Keep paragraphs short and easy to read</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">FAQ Management</h2>
                <p className="text-sm text-gray-600 mt-1">Add and manage frequently asked questions</p>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-600" />
                  Add New FAQ
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                    <input
                      type="text"
                      value={newFaq.question}
                      onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter the question..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                    <textarea
                      value={newFaq.answer}
                      onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter the answer..."
                    />
                  </div>
                  <button
                    onClick={handleAddFaq}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                  >
                    <Plus className="w-5 h-5" />
                    Add FAQ
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Existing FAQs ({faqs.length})</h3>
                {faqs.length === 0 ? (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">No FAQs added yet. Add your first FAQ above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="p-5 bg-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              Q: {faq.question}
                            </h4>
                            <p className="text-gray-700 leading-relaxed">
                              A: {faq.answer}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteFaq(faq.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {editMode && selectedPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Edit: {selectedPage.name}</h2>
              <button onClick={handleCancelEdit} className="p-2 hover:bg-gray-100 rounded-lg transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Name</label>
                    <input type="text" value={selectedPage.name} onChange={(e) => setSelectedPage({ ...selectedPage, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input type="text" value={selectedPage.category} onChange={(e) => setSelectedPage({ ...selectedPage, category: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart className="w-5 h-5" />
                  SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input type="text" value={selectedPage.seo.title} onChange={(e) => setSelectedPage({ ...selectedPage, seo: { ...selectedPage.seo, title: e.target.value } })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea value={selectedPage.seo.description} onChange={(e) => setSelectedPage({ ...selectedPage, seo: { ...selectedPage.seo, description: e.target.value } })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Keywords</label>
                    <input type="text" value={selectedPage.seo.keywords} onChange={(e) => setSelectedPage({ ...selectedPage, seo: { ...selectedPage.seo, keywords: e.target.value } })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
                    <input type="text" value={selectedPage.seo.ogImage} onChange={(e) => setSelectedPage({ ...selectedPage, seo: { ...selectedPage.seo, ogImage: e.target.value } })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
                    <input type="text" value={selectedPage.seo.ogTitle} onChange={(e) => setSelectedPage({ ...selectedPage, seo: { ...selectedPage.seo, ogTitle: e.target.value } })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
                    <textarea value={selectedPage.seo.ogDescription} onChange={(e) => setSelectedPage({ ...selectedPage, seo: { ...selectedPage.seo, ogDescription: e.target.value } })} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t">
                <button onClick={handleSavePage} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
                <button onClick={handleCancelEdit} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
