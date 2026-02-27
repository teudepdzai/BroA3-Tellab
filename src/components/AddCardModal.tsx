import React, { useState } from 'react';
import { Category, TacticCard } from '../data';
import { Plus, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations';

interface AddCardModalProps {
  category: Category;
  onClose: () => void;
  onAdd: (card: TacticCard) => void;
}

export default function AddCardModal({ category, onClose, onAdd }: AddCardModalProps) {
  const { language } = useApp();
  const t = translations[language];

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([{ title: t.sectionTitlePlaceholder, items: [''] }]);

  const handleAddItem = (sectionIndex: number) => {
    const newSections = [...sections];
    newSections[sectionIndex].items.push('');
    setSections(newSections);
  };

  const handleItemChange = (sectionIndex: number, itemIndex: number, value: string) => {
    const newSections = [...sections];
    newSections[sectionIndex].items[itemIndex] = value;
    setSections(newSections);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCard: TacticCard = {
      id: `custom-${Date.now()}`,
      categoryId: category.id,
      title,
      subtitle,
      description,
      sections: sections.map(s => ({
        ...s,
        items: s.items.filter(i => i.trim() !== '')
      })).filter(s => s.items.length > 0),
      isCustom: true
    };
    onAdd(newCard);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t.createCardTitle}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
            <X size={20} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          <form id="add-card-form" onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.cardTitleLabel}</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="e.g., The Mystery Box"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.subtitleLabel}</label>
              <input
                required
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="e.g., Keep them guessing"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t.descriptionLabel}</label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                placeholder="What is this tactic about?"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.promptsLabel}</label>
              {sections.map((section, sIdx) => (
                <div key={sIdx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const newSections = [...sections];
                      newSections[sIdx].title = e.target.value;
                      setSections(newSections);
                    }}
                    className="w-full bg-transparent font-semibold text-slate-900 dark:text-white mb-2 border-b border-slate-200 dark:border-slate-700 focus:border-indigo-500 outline-none pb-1"
                    placeholder={t.sectionTitlePlaceholder}
                  />
                  <div className="space-y-2">
                    {section.items.map((item, iIdx) => (
                      <input
                        key={iIdx}
                        type="text"
                        value={item}
                        onChange={(e) => handleItemChange(sIdx, iIdx, e.target.value)}
                        className="w-full px-3 py-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:border-indigo-500 outline-none"
                        placeholder={`${t.promptPlaceholder} ${iIdx + 1}`}
                      />
                    ))}
                    <button
                      type="button"
                      onClick={() => handleAddItem(sIdx)}
                      className="text-xs text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 mt-2"
                    >
                      <Plus size={14} /> {t.addPrompt}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            {t.cancel}
          </button>
          <button
            type="submit"
            form="add-card-form"
            className="px-6 py-2 bg-slate-900 dark:bg-indigo-600 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors shadow-lg shadow-slate-900/20"
          >
            {t.createCard}
          </button>
        </div>
      </div>
    </div>
  );
}
