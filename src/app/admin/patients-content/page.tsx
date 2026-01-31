'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/admin/Sidebar';
import { Plus, Trash2, Edit2, ChevronDown, ChevronUp, Eye, EyeOff, GripVertical, Save, X } from 'lucide-react';

interface Section {
  id: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  slug: string;
  order_index: number;
  is_visible: boolean;
}

interface Block {
  id: string;
  section_id: string;
  block_type: string;
  title_ru: string;
  title_kz: string;
  title_en: string;
  content_ru: Record<string, unknown>;
  content_kz: Record<string, unknown>;
  content_en: Record<string, unknown>;
  settings: Record<string, unknown>;
  order_index: number;
}

const BLOCK_TYPES = [
  { value: 'text', label: 'Текст', description: 'Простой текстовый блок' },
  { value: 'colored_block', label: 'Цветной блок', description: 'Блок с цветным фоном' },
  { value: 'list', label: 'Список', description: 'Список с галочками' },
  { value: 'cards', label: 'Карточки', description: 'Карточки в ряд (2-3 колонки)' },
  { value: 'faq', label: 'FAQ', description: 'Вопросы и ответы (аккордеон)' },
  { value: 'table', label: 'Таблица', description: 'Таблица (название + значение)' },
  { value: 'contact_block', label: 'Контакты', description: 'Блок с контактами' },
];

const BACKGROUND_COLORS = [
  { value: 'transparent', label: 'Без фона' },
  { value: '#f8fafa', label: 'Светло-серый' },
  { value: '#e8f5f6', label: 'Светло-бирюзовый' },
  { value: '#fef7ed', label: 'Светло-оранжевый' },
  { value: '#209DA7', label: 'Бирюзовый' },
];

export default function PatientsContentPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);
  const [showNewSection, setShowNewSection] = useState(false);
  const [showNewBlock, setShowNewBlock] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'ru' | 'kz' | 'en'>('ru');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sectionsRes, blocksRes] = await Promise.all([
        fetch('/api/admin/patients-sections'),
        fetch('/api/admin/patients-blocks')
      ]);

      if (sectionsRes.ok) {
        const sectionsData = await sectionsRes.json();
        setSections(sectionsData);
      }

      if (blocksRes.ok) {
        const blocksData = await blocksRes.json();
        setBlocks(blocksData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Section CRUD
  const saveSection = async (section: Partial<Section>) => {
    try {
      const method = section.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/patients-sections', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section)
      });

      if (res.ok) {
        fetchData();
        setEditingSection(null);
        setShowNewSection(false);
      }
    } catch (error) {
      console.error('Error saving section:', error);
    }
  };

  const deleteSection = async (id: string) => {
    if (!confirm('Удалить секцию и все блоки внутри неё?')) return;

    try {
      const res = await fetch(`/api/admin/patients-sections?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const toggleSectionVisibility = async (section: Section) => {
    await saveSection({ id: section.id, is_visible: !section.is_visible });
  };

  const moveSectionUp = async (section: Section) => {
    const idx = sections.findIndex(s => s.id === section.id);
    if (idx <= 0) return;

    const prevSection = sections[idx - 1];
    await Promise.all([
      saveSection({ id: section.id, order_index: prevSection.order_index }),
      saveSection({ id: prevSection.id, order_index: section.order_index })
    ]);
  };

  const moveSectionDown = async (section: Section) => {
    const idx = sections.findIndex(s => s.id === section.id);
    if (idx >= sections.length - 1) return;

    const nextSection = sections[idx + 1];
    await Promise.all([
      saveSection({ id: section.id, order_index: nextSection.order_index }),
      saveSection({ id: nextSection.id, order_index: section.order_index })
    ]);
  };

  // Block CRUD
  const saveBlock = async (block: Partial<Block>) => {
    try {
      const method = block.id ? 'PUT' : 'POST';
      const res = await fetch('/api/admin/patients-blocks', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(block)
      });

      if (res.ok) {
        fetchData();
        setEditingBlock(null);
        setShowNewBlock(null);
      }
    } catch (error) {
      console.error('Error saving block:', error);
    }
  };

  const deleteBlock = async (id: string) => {
    if (!confirm('Удалить этот блок?')) return;

    try {
      const res = await fetch(`/api/admin/patients-blocks?id=${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Error deleting block:', error);
    }
  };

  const getBlocksForSection = (sectionId: string) => {
    return blocks.filter(b => b.section_id === sectionId).sort((a, b) => a.order_index - b.order_index);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 rounded mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Страница "Пациентам"</h1>
              <p className="text-gray-500 mt-1">Управление секциями и контентом</p>
            </div>
            <button
              onClick={() => setShowNewSection(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#209DA7] text-white rounded-lg hover:bg-[#1a8a93] transition-colors"
            >
              <Plus size={18} />
              Добавить секцию
            </button>
          </div>

          {/* New Section Form */}
          {showNewSection && (
            <SectionForm
              onSave={saveSection}
              onCancel={() => setShowNewSection(false)}
            />
          )}

          {/* Sections List */}
          <div className="space-y-4">
            {sections.map((section, idx) => (
              <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Section Header */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                  <GripVertical size={18} className="text-gray-400" />

                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{section.title_ru}</span>
                      {!section.is_visible && (
                        <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded">Скрыта</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">/{section.slug}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveSectionUp(section)}
                      disabled={idx === 0}
                      className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      title="Вверх"
                    >
                      <ChevronUp size={18} />
                    </button>
                    <button
                      onClick={() => moveSectionDown(section)}
                      disabled={idx === sections.length - 1}
                      className="p-1.5 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      title="Вниз"
                    >
                      <ChevronDown size={18} />
                    </button>
                    <button
                      onClick={() => toggleSectionVisibility(section)}
                      className="p-1.5 text-gray-400 hover:text-gray-600"
                      title={section.is_visible ? 'Скрыть' : 'Показать'}
                    >
                      {section.is_visible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                    <button
                      onClick={() => setEditingSection(section)}
                      className="p-1.5 text-gray-400 hover:text-blue-600"
                      title="Редактировать"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600"
                      title="Удалить"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                      className="p-1.5 ml-2 text-gray-600 hover:text-gray-900"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Section Content (Blocks) */}
                {expandedSection === section.id && (
                  <div className="p-4">
                    {/* Blocks List */}
                    <div className="space-y-3 mb-4">
                      {getBlocksForSection(section.id).map((block) => (
                        <div key={block.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <GripVertical size={16} className="text-gray-400" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs px-2 py-0.5 bg-[#209DA7] text-white rounded">
                                {BLOCK_TYPES.find(t => t.value === block.block_type)?.label || block.block_type}
                              </span>
                              <span className="text-sm text-gray-700">{block.title_ru || '(без заголовка)'}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => setEditingBlock(block)}
                            className="p-1.5 text-gray-400 hover:text-blue-600"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteBlock(block.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}

                      {getBlocksForSection(section.id).length === 0 && (
                        <p className="text-sm text-gray-500 text-center py-4">Нет блоков в этой секции</p>
                      )}
                    </div>

                    {/* Add Block Button */}
                    <button
                      onClick={() => setShowNewBlock(section.id)}
                      className="flex items-center gap-2 text-sm text-[#209DA7] hover:text-[#1a8a93]"
                    >
                      <Plus size={16} />
                      Добавить блок
                    </button>

                    {/* New Block Form */}
                    {showNewBlock === section.id && (
                      <BlockForm
                        sectionId={section.id}
                        onSave={saveBlock}
                        onCancel={() => setShowNewBlock(null)}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {sections.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 mb-4">Секции не найдены</p>
              <button
                onClick={() => setShowNewSection(true)}
                className="text-[#209DA7] hover:underline"
              >
                Добавить первую секцию
              </button>
            </div>
          )}
        </div>

        {/* Edit Section Modal */}
        {editingSection && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Редактировать секцию</h2>
                <SectionForm
                  section={editingSection}
                  onSave={saveSection}
                  onCancel={() => setEditingSection(null)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Edit Block Modal */}
        {editingBlock && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Редактировать блок</h2>
                <BlockForm
                  sectionId={editingBlock.section_id}
                  block={editingBlock}
                  onSave={saveBlock}
                  onCancel={() => setEditingBlock(null)}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Section Form Component
function SectionForm({
  section,
  onSave,
  onCancel
}: {
  section?: Section;
  onSave: (s: Partial<Section>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    id: section?.id || '',
    title_ru: section?.title_ru || '',
    title_kz: section?.title_kz || '',
    title_en: section?.title_en || '',
    slug: section?.slug || '',
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название (RU)</label>
          <input
            type="text"
            value={formData.title_ru}
            onChange={(e) => setFormData({ ...formData, title_ru: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название (KZ)</label>
          <input
            type="text"
            value={formData.title_kz}
            onChange={(e) => setFormData({ ...formData, title_kz: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Название (EN)</label>
          <input
            type="text"
            value={formData.title_en}
            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL)</label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="например: preparation"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Отмена
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-4 py-2 bg-[#209DA7] text-white rounded-lg hover:bg-[#1a8a93]"
          >
            <Save size={16} />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

// Block Form Component
function BlockForm({
  sectionId,
  block,
  onSave,
  onCancel,
  activeTab,
  setActiveTab
}: {
  sectionId: string;
  block?: Block;
  onSave: (b: Partial<Block>) => void;
  onCancel: () => void;
  activeTab: 'ru' | 'kz' | 'en';
  setActiveTab: (tab: 'ru' | 'kz' | 'en') => void;
}) {
  const [formData, setFormData] = useState({
    id: block?.id || '',
    section_id: sectionId,
    block_type: block?.block_type || 'text',
    title_ru: block?.title_ru || '',
    title_kz: block?.title_kz || '',
    title_en: block?.title_en || '',
    content_ru: block?.content_ru || {},
    content_kz: block?.content_kz || {},
    content_en: block?.content_en || {},
    settings: block?.settings || {},
  });

  const updateContent = (lang: 'ru' | 'kz' | 'en', key: string, value: unknown) => {
    const contentKey = `content_${lang}` as 'content_ru' | 'content_kz' | 'content_en';
    setFormData({
      ...formData,
      [contentKey]: {
        ...formData[contentKey],
        [key]: value
      }
    });
  };

  const getContent = (lang: 'ru' | 'kz' | 'en', key: string): string => {
    const contentKey = `content_${lang}` as 'content_ru' | 'content_kz' | 'content_en';
    return (formData[contentKey] as Record<string, string>)?.[key] || '';
  };

  const getContentArray = (lang: 'ru' | 'kz' | 'en', key: string): string[] => {
    const contentKey = `content_${lang}` as 'content_ru' | 'content_kz' | 'content_en';
    return (formData[contentKey] as Record<string, string[]>)?.[key] || [];
  };

  const renderContentEditor = () => {
    switch (formData.block_type) {
      case 'text':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Текст</label>
            <textarea
              value={getContent(activeTab, 'text')}
              onChange={(e) => updateContent(activeTab, 'text', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
            />
          </div>
        );

      case 'colored_block':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Текст</label>
              <textarea
                value={getContent(activeTab, 'text')}
                onChange={(e) => updateContent(activeTab, 'text', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Цвет фона</label>
              <select
                value={(formData.settings as Record<string, string>).bgColor || 'transparent'}
                onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, bgColor: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
              >
                {BACKGROUND_COLORS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </>
        );

      case 'list':
        const listItems = getContentArray(activeTab, 'items');
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пункты списка</label>
            {listItems.map((item, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newItems = [...listItems];
                    newItems[idx] = e.target.value;
                    updateContent(activeTab, 'items', newItems);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <button
                  onClick={() => {
                    const newItems = listItems.filter((_, i) => i !== idx);
                    updateContent(activeTab, 'items', newItems);
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateContent(activeTab, 'items', [...listItems, ''])}
              className="text-sm text-[#209DA7] hover:underline"
            >
              + Добавить пункт
            </button>
          </div>
        );

      case 'cards':
        const cards = getContentArray(activeTab, 'cards') as unknown as { title: string; text: string }[];
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Карточки</label>
            {(cards || []).map((card, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                <input
                  type="text"
                  value={card?.title || ''}
                  onChange={(e) => {
                    const newCards = [...(cards || [])];
                    newCards[idx] = { ...newCards[idx], title: e.target.value };
                    updateContent(activeTab, 'cards', newCards as unknown as string[]);
                  }}
                  placeholder="Заголовок"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <textarea
                  value={card?.text || ''}
                  onChange={(e) => {
                    const newCards = [...(cards || [])];
                    newCards[idx] = { ...newCards[idx], text: e.target.value };
                    updateContent(activeTab, 'cards', newCards as unknown as string[]);
                  }}
                  placeholder="Текст"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <button
                  onClick={() => {
                    const newCards = (cards || []).filter((_, i) => i !== idx);
                    updateContent(activeTab, 'cards', newCards as unknown as string[]);
                  }}
                  className="text-sm text-red-500 hover:underline mt-1"
                >
                  Удалить карточку
                </button>
              </div>
            ))}
            <button
              onClick={() => updateContent(activeTab, 'cards', [...(cards || []), { title: '', text: '' }] as unknown as string[])}
              className="text-sm text-[#209DA7] hover:underline"
            >
              + Добавить карточку
            </button>
          </div>
        );

      case 'faq':
        const faqs = getContentArray(activeTab, 'faqs') as unknown as { question: string; answer: string }[];
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Вопросы и ответы</label>
            {(faqs || []).map((faq, idx) => (
              <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                <input
                  type="text"
                  value={faq?.question || ''}
                  onChange={(e) => {
                    const newFaqs = [...(faqs || [])];
                    newFaqs[idx] = { ...newFaqs[idx], question: e.target.value };
                    updateContent(activeTab, 'faqs', newFaqs as unknown as string[]);
                  }}
                  placeholder="Вопрос"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <textarea
                  value={faq?.answer || ''}
                  onChange={(e) => {
                    const newFaqs = [...(faqs || [])];
                    newFaqs[idx] = { ...newFaqs[idx], answer: e.target.value };
                    updateContent(activeTab, 'faqs', newFaqs as unknown as string[]);
                  }}
                  placeholder="Ответ"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <button
                  onClick={() => {
                    const newFaqs = (faqs || []).filter((_, i) => i !== idx);
                    updateContent(activeTab, 'faqs', newFaqs as unknown as string[]);
                  }}
                  className="text-sm text-red-500 hover:underline mt-1"
                >
                  Удалить
                </button>
              </div>
            ))}
            <button
              onClick={() => updateContent(activeTab, 'faqs', [...(faqs || []), { question: '', answer: '' }] as unknown as string[])}
              className="text-sm text-[#209DA7] hover:underline"
            >
              + Добавить вопрос
            </button>
          </div>
        );

      case 'table':
        const rows = getContentArray(activeTab, 'rows') as unknown as { label: string; value: string }[];
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Строки таблицы</label>
            {(rows || []).map((row, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={row?.label || ''}
                  onChange={(e) => {
                    const newRows = [...(rows || [])];
                    newRows[idx] = { ...newRows[idx], label: e.target.value };
                    updateContent(activeTab, 'rows', newRows as unknown as string[]);
                  }}
                  placeholder="Название"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <input
                  type="text"
                  value={row?.value || ''}
                  onChange={(e) => {
                    const newRows = [...(rows || [])];
                    newRows[idx] = { ...newRows[idx], value: e.target.value };
                    updateContent(activeTab, 'rows', newRows as unknown as string[]);
                  }}
                  placeholder="Значение"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
                />
                <button
                  onClick={() => {
                    const newRows = (rows || []).filter((_, i) => i !== idx);
                    updateContent(activeTab, 'rows', newRows as unknown as string[]);
                  }}
                  className="p-2 text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => updateContent(activeTab, 'rows', [...(rows || []), { label: '', value: '' }] as unknown as string[])}
              className="text-sm text-[#209DA7] hover:underline"
            >
              + Добавить строку
            </button>
          </div>
        );

      case 'contact_block':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок</label>
              <input
                type="text"
                value={getContent(activeTab, 'contactTitle')}
                onChange={(e) => updateContent(activeTab, 'contactTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
              <textarea
                value={getContent(activeTab, 'contactDesc')}
                onChange={(e) => updateContent(activeTab, 'contactDesc', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
              <input
                type="text"
                value={(formData.settings as Record<string, string>).phone || '+7 (705) 100-03-33'}
                onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, phone: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                value={(formData.settings as Record<string, string>).email || 'info@gammalab.kz'}
                onChange={(e) => setFormData({ ...formData, settings: { ...formData.settings, email: e.target.value } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mt-4">
      <div className="space-y-4">
        {/* Block Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Тип блока</label>
          <select
            value={formData.block_type}
            onChange={(e) => setFormData({ ...formData, block_type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
          >
            {BLOCK_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label} - {type.description}</option>
            ))}
          </select>
        </div>

        {/* Language Tabs */}
        <div className="flex gap-2 border-b border-gray-200">
          {(['ru', 'kz', 'en'] as const).map(lang => (
            <button
              key={lang}
              onClick={() => setActiveTab(lang)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                activeTab === lang
                  ? 'border-[#209DA7] text-[#209DA7]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Заголовок блока</label>
          <input
            type="text"
            value={formData[`title_${activeTab}` as 'title_ru' | 'title_kz' | 'title_en']}
            onChange={(e) => setFormData({ ...formData, [`title_${activeTab}`]: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#209DA7] focus:border-transparent"
          />
        </div>

        {/* Content Editor based on block type */}
        {renderContentEditor()}

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Отмена
          </button>
          <button
            onClick={() => onSave(formData)}
            className="flex items-center gap-2 px-4 py-2 bg-[#209DA7] text-white rounded-lg hover:bg-[#1a8a93]"
          >
            <Save size={16} />
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}
