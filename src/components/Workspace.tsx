import React, { useState, useEffect } from 'react';
import { TacticCard, Category } from '../data';
import { ArrowLeft, Save, Sparkles, X, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import Timer from './Timer';
import { getStoryFeedback, FeedbackResponse } from '../services/gemini';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { translations } from '../translations';
import { useAuth } from '../contexts/AuthContext';
import AIChatBot from './AIChatBot';

// Add FeedbackCriterionCard component
const FeedbackCriterionCard = ({ criterion }: { criterion: any }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800';
    if (score >= 7) return 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (score >= 5) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'text-slate-500 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 flex items-start gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg border-2 ${getScoreColor(criterion.score)} flex-shrink-0`}>
          <span className="text-lg font-bold">{criterion.score}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-bold text-slate-900 dark:text-white">{criterion.name}</h4>
            {isExpanded ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{criterion.summary}</p>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <div className="prose prose-sm prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300">
                <ReactMarkdown>{criterion.details}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface WorkspaceProps {
  card: TacticCard;
  category: Category;
  allCards: TacticCard[];
  onBack: () => void;
  onSaveContent: (cardId: string, content: string) => void;
  onUpdateScore: (cardId: string, score: number) => void;
  initialContent: string;
}

export default function Workspace({ card, category, allCards, onBack, onSaveContent, onUpdateScore, initialContent }: WorkspaceProps) {
  const { language } = useApp();
  const { token, isAuthenticated } = useAuth();
  const t = translations[language];

  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackResponse | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  // Auto-save effect
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSave(content);
    }, 1000);
    return () => clearTimeout(timer);
  }, [content, card.id]);
  
  const handleSave = async (newContent: string, newScore?: number) => {
    // Always save to local storage (via parent handler) for offline/guest support
    onSaveContent(card.id, newContent);

    // Update parent score state if a score is provided
    if (newScore !== undefined) {
      onUpdateScore(card.id, newScore);
    }

    // If logged in, also save to API
    if (isAuthenticated && token) {
      try {
        await fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            cardId: card.id,
            content: newContent,
            score: newScore
          })
        });
      } catch (error) {
        console.error('Failed to save to cloud:', error);
      }
    }
  };

  const handleManualSave = () => {
    setIsSaving(true);
    handleSave(content);
    setTimeout(() => setIsSaving(false), 500);
  };
  
  // ...

  const handleGetFeedback = async () => {
    if (!content.trim()) return;
    
    setIsGettingFeedback(true);
    try {
      const response = await getStoryFeedback(content, card);
      setFeedback(response);
      setShowFeedbackModal(true);
      // Save content and score when feedback is received
      handleSave(content, response.score);
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lấy phản hồi. Vui lòng kiểm tra API key của bạn.");
    } finally {
      setIsGettingFeedback(false);
    }
  };

  const getScoreColorClasses = (color: string) => {
    switch (color) {
      case 'gray': return 'text-slate-500 border-slate-200 dark:border-slate-700';
      case 'yellow': return 'text-yellow-600 border-yellow-200 dark:border-yellow-700';
      case 'green': return 'text-green-600 border-green-200 dark:border-green-700';
      case 'dark-green': return 'text-emerald-600 border-emerald-200 dark:border-emerald-700';
      default: return 'text-slate-500 border-slate-200 dark:border-slate-700';
    }
  };

  const getScoreBadgeClasses = (color: string) => {
    switch (color) {
      case 'gray': return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      case 'yellow': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'green': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'dark-green': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-[#fdfbf7] dark:bg-slate-950 z-50 flex flex-col overflow-hidden transition-colors duration-300">
      {/* Top Bar */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between shadow-sm z-10 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {card.title}
              {card.isCustom && <span className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-sans">{t.customLabel}</span>}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">{category.title} {t.tactic}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Timer />
          
          <button 
            onClick={handleGetFeedback}
            disabled={isGettingFeedback || !content.trim()}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium border ${
              isGettingFeedback || !content.trim() 
                ? 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-700 cursor-not-allowed' 
                : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
            }`}
          >
            {isGettingFeedback ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {isGettingFeedback ? t.analyzing : t.aiFeedback}
          </button>

          <button 
            onClick={handleManualSave}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors text-sm font-medium"
          >
            <Save size={16} />
            {isSaving ? t.saved : t.saveWork}
          </button>
        </div>
      </header>

      {/* Main Content Split View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel: Card Instructions */}
        <div className="w-full md:w-1/3 lg:w-2/5 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0 transition-colors duration-300">
          {/* Card Image Header */}
          {card.imageUrl && (
            <div className="w-full h-64 relative">
              <img 
                src={card.imageUrl} 
                alt={card.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://picsum.photos/seed/${card.id}/800/600`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${category.color} bg-opacity-90 backdrop-blur-sm mb-3 shadow-lg`}>
                  <category.icon className="w-4 h-4 text-slate-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">{category.title}</span>
                </div>
                <h2 className="text-3xl font-serif font-bold text-white mb-1 shadow-sm">{card.title}</h2>
                <p className="text-lg text-white/90 font-medium italic">{card.subtitle}</p>
              </div>
            </div>
          )}

          <div className="p-6 md:p-8">
            {!card.imageUrl && (
              <>
                <div className={`inline-block p-3 rounded-xl ${category.color} mb-6`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-2">{card.title}</h2>
                <p className="text-lg text-slate-600 dark:text-slate-300 font-medium italic mb-8">{card.subtitle}</p>
              </>
            )}
            
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="lead text-slate-700 dark:text-slate-300">{card.description}</p>
              
              {card.storyExample && (
                <div className="my-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 p-5 rounded-r-xl shadow-sm">
                  <h3 className="text-amber-800 dark:text-amber-200 font-bold text-sm uppercase tracking-wider mb-3 mt-0 flex items-center gap-2">
                    <Sparkles size={18} />
                    Ví dụ minh họa
                  </h3>
                  <div className="text-slate-700 dark:text-slate-300 text-base mb-0 prose prose-sm prose-amber dark:prose-invert max-w-none italic">
                    <ReactMarkdown>{card.storyExample}</ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Recipe Ingredients Section */}
              {card.recipeCardIds && card.recipeCardIds.length > 0 && (
                <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      Thành phần công thức
                    </h3>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700"></div>
                  </div>

                  <div className="space-y-8">
                    {card.recipeCardIds.map(ingredientId => {
                      const ingredientCard = allCards.find(c => c.id === ingredientId);
                      if (!ingredientCard) return null;
                      
                      return (
                        <div key={ingredientId} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
                          <div className="p-5 border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex justify-between items-start">
                            <div>
                              <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-white mb-1">
                                {ingredientCard.title}
                              </h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                                {ingredientCard.subtitle}
                              </p>
                            </div>
                            {/* We could add an icon or category badge here if we had access to categories lookup */}
                          </div>
                          
                          <div className="p-5">
                            <p className="text-slate-600 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                              {ingredientCard.description}
                            </p>
                            
                            {ingredientCard.storyExample && (
                              <div className="bg-amber-50 dark:bg-amber-900/10 border-l-2 border-amber-300 p-3 rounded-r-lg">
                                <p className="text-xs font-bold text-amber-800 dark:text-amber-200 uppercase mb-1 flex items-center gap-1">
                                  <Sparkles size={12} /> Ví dụ
                                </p>
                                <div className="text-slate-700 dark:text-slate-300 text-sm prose prose-sm prose-amber dark:prose-invert max-w-none italic">
                                  <ReactMarkdown>{ingredientCard.storyExample}</ReactMarkdown>
                                </div>
                              </div>
                            )}

                            {/* Collapsible Sections for Ingredient */}
                            <div className="mt-4">
                              <details className="group">
                                <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                                  <span>Xem chi tiết hướng dẫn</span>
                                  <ChevronDown size={16} className="group-open:rotate-180 transition-transform" />
                                </summary>
                                <div className="mt-4 space-y-4 pl-4 border-l-2 border-indigo-100 dark:border-indigo-900/30">
                                  {ingredientCard.sections.map((section, idx) => (
                                    <div key={idx}>
                                      <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{section.title}</h5>
                                      <ul className="list-disc pl-4 space-y-1">
                                        {section.items.map((item, i) => (
                                          <li key={i} className="text-xs text-slate-600 dark:text-slate-400">{item}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </details>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="my-8 h-px bg-slate-100 dark:bg-slate-800" />
              
              <div className="space-y-8">
              {card.sections.map((section, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 mt-0">{section.title}</h3>
                  <ul className="list-disc pl-5 space-y-2 mb-0">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-slate-700 dark:text-slate-300">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Right Panel: Editor */}
        <div className="flex-1 bg-[#fdfbf7] dark:bg-slate-950 flex flex-col relative transition-colors duration-300">
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto h-full flex flex-col">
              <label className="block text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                {t.storyWorkspace}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.startWritingPlaceholder}
                className="flex-1 w-full bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-serif placeholder:font-sans placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-colors duration-300"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedbackModal && feedback && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFeedbackModal(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col border border-slate-100 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <Sparkles size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t.aiFeedbackTitle}</h3>
                </div>
                <button 
                  onClick={() => setShowFeedbackModal(false)}
                  className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-8 overflow-y-auto">
                {/* Score Section */}
                <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                  <div className={`flex flex-col items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreColorClasses(feedback.scoreColor)} bg-white dark:bg-slate-900 shadow-sm flex-shrink-0`}>
                    <span className="text-3xl font-bold">{feedback.score}</span>
                    <span className="text-[10px] uppercase font-bold opacity-60">/ 10</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <h4 className="font-bold text-xl text-slate-900 dark:text-white">Đánh giá tổng quan</h4>
                       <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getScoreBadgeClasses(feedback.scoreColor)}`}>
                         {feedback.score >= 9 ? 'Xuất sắc' : feedback.score >= 7 ? 'Tốt' : feedback.score >= 5 ? 'Tạm ổn' : 'Cần cố gắng'}
                       </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">{feedback.scoreReason}</p>
                  </div>
                </div>

                {/* Detailed Feedback Criteria */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Chi tiết đánh giá</h4>
                  {feedback.criteria && feedback.criteria.map((criterion, idx) => (
                    <FeedbackCriterionCard key={idx} criterion={criterion} />
                  ))}
                  
                  {/* Fallback for old feedback format or if criteria is missing */}
                  {!feedback.criteria && (feedback as any).feedback && (
                    <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
                      <ReactMarkdown>{(feedback as any).feedback}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end">
                <button 
                  onClick={() => setShowFeedbackModal(false)}
                  className="px-6 py-2 bg-slate-900 dark:bg-indigo-600 text-white font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
                >
                  {t.close}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      <AIChatBot card={card} currentContent={content} />
    </div>
  );
}
