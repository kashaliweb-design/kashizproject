import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Search, Edit, Save, X, Image as ImageIcon, FileText, Tag, Globe, BarChart, Settings, FileEdit, HelpCircle, Plus, Trash2 } from 'lucide-react';
import { PageData, initialPagesData, ContentSection, FAQ } from '../../utils/pagesData';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState<PageData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'pages' | 'content' | 'faq'>('pages');
  const [selectedContentPage, setSelectedContentPage] = useState<string>('');
  const [contentSections, setContentSections] = useState<ContentSection[]>([]);
  const [newSection, setNewSection] = useState({title: '', content: ''});
  const [editingSection, setEditingSection] = useState<ContentSection | null>(null);
  const [contentSearchTerm, setContentSearchTerm] = useState('');
  const [selectedFaqPage, setSelectedFaqPage] = useState<string>('');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newFaq, setNewFaq] = useState({question: '', answer: ''});
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [faqSearchTerm, setFaqSearchTerm] = useState('');

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
    if (selectedContentPage) {
      loadContentForPage(selectedContentPage);
    }
  }, [selectedContentPage]);

  useEffect(() => {
    if (selectedFaqPage) {
      loadFaqsForPage(selectedFaqPage);
    }
  }, [selectedFaqPage]);

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
    // Content is now stored per page in pagesData
    // No separate loading needed
  };

  const loadFaqs = () => {
    // FAQs are now stored per page in pagesData
    // No separate loading needed
  };

  const loadContentForPage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page && page.contentSections) {
      setContentSections(page.contentSections);
    } else {
      setContentSections([]);
    }
  };

  const loadFaqsForPage = (pageId: string) => {
    const page = pages.find(p => p.id === pageId);
    if (page && page.faqs) {
      setFaqs(page.faqs);
    } else {
      setFaqs([]);
    }
  };

  const generateSlugFromTitle = (title: string): string => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleGenerateSlug = () => {
    if (selectedPage) {
      const slug = generateSlugFromTitle(selectedPage.name);
      const category = selectedPage.category.toLowerCase().replace(/\s+/g, '-');
      const newPath = `/${category}/${slug}`;
      setSelectedPage({ ...selectedPage, path: newPath });
    }
  };

  const updatePagesData = (updatedPages: PageData[]) => {
    setPages(updatedPages);
    localStorage.setItem('pagesData', JSON.stringify(updatedPages));
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('pagesDataUpdated'));
  };

  const handleAddContentSection = () => {
    if (newSection.title && newSection.content && selectedContentPage) {
      const newContentSection: ContentSection = {
        id: Date.now().toString(),
        title: newSection.title,
        content: newSection.content,
        order: contentSections.length
      };
      const updatedSections = [...contentSections, newContentSection];
      setContentSections(updatedSections);
      
      // Update page data
      const updatedPages = pages.map(p => 
        p.id === selectedContentPage 
          ? { ...p, contentSections: updatedSections }
          : p
      );
      updatePagesData(updatedPages);
      setNewSection({title: '', content: ''});
      alert('Content section added successfully!');
    } else {
      alert('Please select a page and fill in all fields!');
    }
  };

  const handleDeleteContentSection = (id: string) => {
    const updatedSections = contentSections.filter(section => section.id !== id);
    setContentSections(updatedSections);
    
    const updatedPages = pages.map(p => 
      p.id === selectedContentPage 
        ? { ...p, contentSections: updatedSections }
        : p
    );
    updatePagesData(updatedPages);
  };

  const handleEditContentSection = (section: ContentSection) => {
    setEditingSection({ ...section });
  };

  const handleUpdateContentSection = () => {
    if (editingSection && editingSection.title && editingSection.content) {
      const updatedSections = contentSections.map(s => 
        s.id === editingSection.id ? editingSection : s
      );
      setContentSections(updatedSections);
      
      const updatedPages = pages.map(p => 
        p.id === selectedContentPage 
          ? { ...p, contentSections: updatedSections }
          : p
      );
      updatePagesData(updatedPages);
      setEditingSection(null);
      alert('Content section updated successfully!');
    }
  };

  const handleCancelEditSection = () => {
    setEditingSection(null);
  };

  const insertFormatting = (format: string, isEditing: boolean = false) => {
    const textarea = document.getElementById(isEditing ? 'edit-content-textarea' : 'new-content-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const currentContent = isEditing ? editingSection?.content || '' : newSection.content;
    
    let beforeText = currentContent.substring(0, start);
    let afterText = currentContent.substring(end);
    let insertText = '';

    switch(format) {
      case 'h1':
        insertText = selectedText ? `<h1>${selectedText}</h1>` : '<h1></h1>';
        break;
      case 'h2':
        insertText = selectedText ? `<h2>${selectedText}</h2>` : '<h2></h2>';
        break;
      case 'h3':
        insertText = selectedText ? `<h3>${selectedText}</h3>` : '<h3></h3>';
        break;
      case 'bold':
        insertText = selectedText ? `<strong>${selectedText}</strong>` : '<strong></strong>';
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) {
          insertText = selectedText ? `<a href="${url}">${selectedText}</a>` : `<a href="${url}">Link Text</a>`;
        } else {
          return;
        }
        break;
    }

    const newContent = beforeText + insertText + afterText;
    
    if (isEditing && editingSection) {
      setEditingSection({ ...editingSection, content: newContent });
    } else {
      setNewSection({ ...newSection, content: newContent });
    }

    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + insertText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleAddFaq = () => {
    if (newFaq.question && newFaq.answer && selectedFaqPage) {
      const newFaqItem: FAQ = {
        id: Date.now().toString(),
        question: newFaq.question,
        answer: newFaq.answer,
        pageId: selectedFaqPage,
        order: faqs.length
      };
      const updatedFaqs = [...faqs, newFaqItem];
      setFaqs(updatedFaqs);
      
      // Update page data
      const updatedPages = pages.map(p => 
        p.id === selectedFaqPage 
          ? { ...p, faqs: updatedFaqs }
          : p
      );
      updatePagesData(updatedPages);
      setNewFaq({question: '', answer: ''});
      alert('FAQ added successfully!');
    } else {
      alert('Please select a page and fill in all fields!');
    }
  };

  const handleDeleteFaq = (id: string) => {
    const updatedFaqs = faqs.filter(faq => faq.id !== id);
    setFaqs(updatedFaqs);
    
    const updatedPages = pages.map(p => 
      p.id === selectedFaqPage 
        ? { ...p, faqs: updatedFaqs }
        : p
    );
    updatePagesData(updatedPages);
  };

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq({ ...faq });
  };

  const handleUpdateFaq = () => {
    if (editingFaq && editingFaq.question && editingFaq.answer) {
      const updatedFaqs = faqs.map(f => 
        f.id === editingFaq.id ? editingFaq : f
      );
      setFaqs(updatedFaqs);
      
      const updatedPages = pages.map(p => 
        p.id === selectedFaqPage 
          ? { ...p, faqs: updatedFaqs }
          : p
      );
      updatePagesData(updatedPages);
      setEditingFaq(null);
      alert('FAQ updated successfully!');
    }
  };

  const handleCancelEditFaq = () => {
    setEditingFaq(null);
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
      updatePagesData(updatedPages);
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
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Page Content Editor</h2>
                <p className="text-sm text-gray-600 mt-1">Select a page and add content sections that will be displayed with beautiful UI cards</p>
              </div>

              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Pages</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={contentSearchTerm}
                      onChange={(e) => setContentSearchTerm(e.target.value)}
                      placeholder="Search pages by name or category..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Page</label>
                  <select
                    value={selectedContentPage}
                    onChange={(e) => setSelectedContentPage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">-- Select a page --</option>
                    {pages
                      .filter(page => 
                        contentSearchTerm === '' || 
                        page.name.toLowerCase().includes(contentSearchTerm.toLowerCase()) ||
                        page.category.toLowerCase().includes(contentSearchTerm.toLowerCase())
                      )
                      .map(page => (
                        <option key={page.id} value={page.id}>{page.name} ({page.category})</option>
                      ))}
                  </select>
                </div>
              </div>

              {selectedContentPage && (
                <>
                  <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-indigo-600" />
                      Add Content Section
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                        <input
                          type="text"
                          value={newSection.title}
                          onChange={(e) => setNewSection({...newSection, title: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          placeholder="e.g., What is this tool?"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <div className="mb-2 flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                          <button
                            type="button"
                            onClick={() => insertFormatting('h1', false)}
                            className="px-3 py-1 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Insert H1 heading"
                          >
                            H1
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting('h2', false)}
                            className="px-3 py-1 text-sm font-semibold bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Insert H2 heading"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting('h3', false)}
                            className="px-3 py-1 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Insert H3 heading"
                          >
                            H3
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting('bold', false)}
                            className="px-3 py-1 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Make text bold"
                          >
                            <strong>B</strong>
                          </button>
                          <button
                            type="button"
                            onClick={() => insertFormatting('link', false)}
                            className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                            title="Insert link"
                          >
                            🔗 Link
                          </button>
                        </div>
                        <textarea
                          id="new-content-textarea"
                          value={newSection.content}
                          onChange={(e) => setNewSection({...newSection, content: e.target.value})}
                          rows={8}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                          placeholder="Write your content here... Use the buttons above to add HTML formatting."
                        />
                      </div>
                      <button
                        onClick={handleAddContentSection}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                      >
                        <Plus className="w-5 h-5" />
                        Add Section
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Sections ({contentSections.length})</h3>
                    {contentSections.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">No content sections added yet. Add your first section above!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {contentSections.map((section) => (
                          <div key={section.id} className="p-5 bg-gradient-to-r from-white to-gray-50 rounded-lg border border-gray-200 hover:border-indigo-300 transition shadow-sm">
                            {editingSection?.id === section.id ? (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                                  <input
                                    type="text"
                                    value={editingSection.title}
                                    onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                                  <div className="mb-2 flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
                                    <button
                                      type="button"
                                      onClick={() => insertFormatting('h1', true)}
                                      className="px-3 py-1 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                                      title="Insert H1 heading"
                                    >
                                      H1
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertFormatting('h2', true)}
                                      className="px-3 py-1 text-sm font-semibold bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                                      title="Insert H2 heading"
                                    >
                                      H2
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertFormatting('h3', true)}
                                      className="px-3 py-1 text-sm font-medium bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                                      title="Insert H3 heading"
                                    >
                                      H3
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertFormatting('bold', true)}
                                      className="px-3 py-1 text-sm font-bold bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                                      title="Make text bold"
                                    >
                                      <strong>B</strong>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => insertFormatting('link', true)}
                                      className="px-3 py-1 text-sm bg-white border border-gray-300 rounded hover:bg-gray-100 transition"
                                      title="Insert link"
                                    >
                                      🔗 Link
                                    </button>
                                  </div>
                                  <textarea
                                    id="edit-content-textarea"
                                    value={editingSection.content}
                                    onChange={(e) => setEditingSection({...editingSection, content: e.target.value})}
                                    rows={8}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={handleUpdateContentSection}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                  </button>
                                  <button
                                    onClick={handleCancelEditSection}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                                    {section.title}
                                  </h4>
                                  <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditContentSection(section)}
                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                                    title="Edit Section"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteContentSection(section.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Delete Section"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-6 border border-emerald-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Content Tips</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Content sections will be displayed as beautiful cards on the frontend</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Each section should have a clear title and informative content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>Use multiple sections to organize different aspects of your page</span>
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
                <p className="text-sm text-gray-600 mt-1">Select a page and add FAQs specific to that page</p>
              </div>

              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search Pages</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={faqSearchTerm}
                      onChange={(e) => setFaqSearchTerm(e.target.value)}
                      placeholder="Search pages by name or category..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Page for FAQs</label>
                  <select
                    value={selectedFaqPage}
                    onChange={(e) => setSelectedFaqPage(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">-- Select a page --</option>
                    {pages
                      .filter(page => 
                        faqSearchTerm === '' || 
                        page.name.toLowerCase().includes(faqSearchTerm.toLowerCase()) ||
                        page.category.toLowerCase().includes(faqSearchTerm.toLowerCase())
                      )
                      .map(page => (
                        <option key={page.id} value={page.id}>{page.name} ({page.category})</option>
                      ))}
                  </select>
                </div>
              </div>

              {selectedFaqPage && (
                <>
                  <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Plus className="w-5 h-5 text-purple-600" />
                      Add New FAQ
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                        <input
                          type="text"
                          value={newFaq.question}
                          onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter the question..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                        <textarea
                          value={newFaq.answer}
                          onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                          rows={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter the answer..."
                        />
                      </div>
                      <button
                        onClick={handleAddFaq}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
                      >
                        <Plus className="w-5 h-5" />
                        Add FAQ
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQs for this page ({faqs.length})</h3>
                    {faqs.length === 0 ? (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">No FAQs added yet. Add your first FAQ above!</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {faqs.map((faq) => (
                          <div key={faq.id} className="p-5 bg-gradient-to-r from-white to-purple-50 rounded-lg border border-purple-200 hover:border-purple-400 transition shadow-sm">
                            {editingFaq?.id === faq.id ? (
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
                                  <input
                                    type="text"
                                    value={editingFaq.question}
                                    onChange={(e) => setEditingFaq({...editingFaq, question: e.target.value})}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
                                  <textarea
                                    value={editingFaq.answer}
                                    onChange={(e) => setEditingFaq({...editingFaq, answer: e.target.value})}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                  />
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={handleUpdateFaq}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                                  >
                                    <Save className="w-4 h-4" />
                                    Save Changes
                                  </button>
                                  <button
                                    onClick={handleCancelEditFaq}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                                    <HelpCircle className="w-5 h-5 text-purple-600" />
                                    {faq.question}
                                  </h4>
                                  <p className="text-gray-700 leading-relaxed pl-7">
                                    {faq.answer}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditFaq(faq)}
                                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                                    title="Edit FAQ"
                                  >
                                    <Edit className="w-5 h-5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteFaq(faq.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                    title="Delete FAQ"
                                  >
                                    <Trash2 className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
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
                <div className="space-y-4">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Page URL Path (Slug)
                      <span className="text-xs text-gray-500 ml-2">Example: /text-tools/word-counter</span>
                    </label>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={selectedPage.path} 
                        onChange={(e) => setSelectedPage({ ...selectedPage, path: e.target.value })} 
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                        placeholder="/category/page-name"
                      />
                      <button
                        onClick={handleGenerateSlug}
                        type="button"
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition flex items-center gap-2 whitespace-nowrap"
                        title="Generate SEO-friendly URL slug from page name"
                      >
                        <Tag className="w-4 h-4" />
                        Generate Slug
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">⚠️ Changing this will change the page URL. Click "Generate Slug" to auto-create SEO-friendly URL.</p>
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
