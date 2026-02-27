import React, { useState, useEffect } from 'react';
import { getCategories, getInitialCards, TacticCard, Category } from './data';
import { motion, AnimatePresence } from 'motion/react';
import { X, BookOpen, ArrowRight, Plus, ArrowLeft, Moon, Sun, Languages, LogIn, LogOut, History, User, TrendingUp } from 'lucide-react';
import Workspace from './components/Workspace';
import AddCardModal from './components/AddCardModal';
import { AppProvider, useApp } from './contexts/AppContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { translations } from './translations';
import { useCachedImage } from './hooks/useCachedImage';
import StatsModal from './components/StatsModal';
import LoginModal from './components/LoginModal';
import HistoryModal from './components/HistoryModal';
import UserGuide from './components/UserGuide';

const CardImage = ({ card, selectedCategory, bestScore }: { card: TacticCard, selectedCategory: Category, bestScore?: number }) => {
  const { imageSrc, isLoading } = useCachedImage(card.imageUrl, `card-image-${card.id}`);
  
  if (!card.imageUrl) return null;

  return (
    <div className="w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
      <div className={`w-full h-full transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <img 
          src={imageSrc || `https://picsum.photos/seed/${card.id}/800/600`}
          alt={card.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://picsum.photos/seed/${card.id}/800/600`;
          }}
        />
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800 animate-pulse">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
      
      {/* Category Icon Overlay */}
      <div className={`absolute top-4 left-4 p-2 rounded-lg ${selectedCategory.color} shadow-lg backdrop-blur-sm bg-opacity-90`}>
        <selectedCategory.icon className="w-5 h-5 text-slate-900" />
      </div>

      {/* Best Score Badge */}
      {bestScore !== undefined && bestScore > 0 && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg border-2 border-white dark:border-slate-800 z-10">
          {bestScore}/10
        </div>
      )}
    </div>
  );
};

function AppContent() {
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const { user, logout, isAuthenticated, token } = useAuth();
  const t = translations[language];
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [activeCard, setActiveCard] = useState<TacticCard | null>(null);
  const [cards, setCards] = useState<TacticCard[]>([]);
  const [userContent, setUserContent] = useState<Record<string, string>>({});
  const [bestScores, setBestScores] = useState<Record<string, number>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  // Load data from local storage on mount or language change
  useEffect(() => {
    // Only load from local storage if NOT authenticated
    if (!isAuthenticated) {
      const savedCards = localStorage.getItem('storyTactics_cards');
      const savedContent = localStorage.getItem('storyTactics_content');
      
      // We always want to merge saved custom cards with the initial cards for the current language
      const currentInitialCards = getInitialCards(language);
      
      if (savedCards) {
        const parsedSavedCards = JSON.parse(savedCards);
        // Filter out only custom cards from saved data
        const customCards = parsedSavedCards.filter((c: TacticCard) => c.isCustom);
        setCards([...currentInitialCards, ...customCards]);
      } else {
        setCards(currentInitialCards);
      }

      if (savedContent) {
        setUserContent(JSON.parse(savedContent));
      }
    } else {
      // If authenticated, just load cards (content comes from API)
      const currentInitialCards = getInitialCards(language);
      setCards(currentInitialCards);
    }
  }, [language, isAuthenticated]);

  // Fetch history when authenticated and on dashboard
  useEffect(() => {
    if (isAuthenticated && token && !activeCard) {
      fetch('/api/history', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Failed to fetch history');
      })
      .then(data => {
        if (!Array.isArray(data)) return;
        
        const contentMap: Record<string, string> = {};
        const scoresMap: Record<string, number> = {};
        
        // Data is sorted by updatedAt desc
        data.forEach((story: any) => {
          if (!contentMap[story.cardId]) {
            contentMap[story.cardId] = story.content;
          }
          if (story.bestScore !== undefined) {
            scoresMap[story.cardId] = story.bestScore;
          }
        });
        setUserContent(contentMap);
        
        // Merge with existing bestScores to preserve optimistic updates
        setBestScores(prev => {
          const newScores = { ...prev };
          Object.entries(scoresMap).forEach(([cardId, score]) => {
            newScores[cardId] = Math.max(newScores[cardId] || 0, score);
          });
          return newScores;
        });
      })
      .catch(err => console.error(err));
    }
  }, [isAuthenticated, token, activeCard]);

  const handleLogout = () => {
    logout();
    setUserContent({});
    setBestScores({});
    localStorage.removeItem('storyTactics_content');
  };

  // Save custom cards to local storage
  useEffect(() => {
    if (cards.length > 0) {
      localStorage.setItem('storyTactics_cards', JSON.stringify(cards));
    }
  }, [cards]);

  // Save user content to local storage
  const saveContent = (cardId: string, content: string) => {
    const newContent = { ...userContent, [cardId]: content };
    setUserContent(newContent);
    localStorage.setItem('storyTactics_content', JSON.stringify(newContent));
  };

  const handleAddCard = (newCard: TacticCard) => {
    setCards([...cards, newCard]);
  };

  const handleSelectHistory = (cardId: string, content: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      const newContent = { ...userContent, [cardId]: content };
      setUserContent(newContent);
      
      const category = getCategories(language).find(c => c.id === card.categoryId);
      if (category) {
        setSelectedCategory(category);
        setActiveCard(card);
      }
    }
  };

  const handleUpdateScore = (cardId: string, score: number) => {
    setBestScores(prev => {
      const currentBest = prev[cardId] || 0;
      if (score > currentBest) {
        return { ...prev, [cardId]: score };
      }
      return prev;
    });
  };

  const filteredCards = selectedCategory 
    ? cards.filter(c => c.categoryId === selectedCategory.id)
    : [];

  const categories = getCategories(language);

  // If active card is selected, show workspace
  if (activeCard && selectedCategory) {
    return (
      <Workspace 
        card={activeCard}
        category={selectedCategory}
        allCards={cards}
        onBack={() => setActiveCard(null)}
        onSaveContent={saveContent}
        onUpdateScore={handleUpdateScore}
        initialContent={userContent[activeCard.id] || ''}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-yellow-200 dark:selection:bg-indigo-900 transition-colors duration-300">
      {/* Settings Bar */}
      <div className="absolute top-4 right-6 flex items-center gap-3 z-50">
        {/* Auth Buttons */}
        {isAuthenticated ? (
          <>
            <button 
              onClick={() => setIsStatsModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <TrendingUp size={14} />
              Thống kê
            </button>
            <button 
              onClick={() => setIsHistoryModalOpen(true)}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors text-xs font-bold uppercase tracking-wider"
            >
              <History size={14} />
              Lịch sử
            </button>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold">
              <User size={14} />
              <span className="hidden sm:inline">{user?.username}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 text-slate-700 dark:text-slate-200 transition-colors"
              title="Đăng xuất"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all text-xs font-bold uppercase tracking-wider"
          >
            <LogIn size={14} />
            Đăng nhập
          </button>
        )}

        <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-1"></div>

        <button 
          onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
          className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          title="Switch Language"
        >
          <span className="font-bold text-xs">{language.toUpperCase()}</span>
        </button>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>

      {/* Header / Hero - Only show when no category selected */}
      {!selectedCategory && (
        <header className="px-6 py-12 md:py-20 max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center justify-center p-3 mb-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
            <span className="font-semibold text-slate-600 dark:text-slate-400 tracking-wide uppercase text-sm">{t.appTitle}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
            {t.heroTitle} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">{t.heroTitleHighlight}</span>.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {t.heroSubtitle}
          </p>
        </header>
      )}

      {/* Main Content Area */}
      <main className="px-6 pb-24 max-w-7xl mx-auto">
        
        {/* Category Grid - Hidden when a category is selected (replaced by detail view) */}
        {!selectedCategory ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <motion.div
                  key={category.id}
                  layoutId={`card-${category.id}`}
                  onClick={() => setSelectedCategory(category)}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group cursor-pointer bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-full h-1.5 ${category.color.split(' ')[0].replace('bg-', 'bg-')}`} />
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                    {category.description}
                  </p>
                </motion.div>
              ))}
            </div>
            
            <UserGuide />
          </>
        ) : (
          /* Category Detail View */
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-8"
          >
            <button 
              onClick={() => setSelectedCategory(null)}
              className="mb-8 flex items-center text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {t.backToCategories}
            </button>

            <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
              <div className={`p-6 rounded-3xl ${selectedCategory.color} inline-block`}>
                <selectedCategory.icon className="w-12 h-12" />
              </div>
              <div>
                <h2 className="text-4xl font-serif font-bold text-slate-900 dark:text-white mb-4">{selectedCategory.title} {t.tactics}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">{selectedCategory.fullDescription}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Add New Card Button */}
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="group flex flex-col items-center justify-center min-h-[280px] rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/20 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 flex items-center justify-center mb-4 transition-colors">
                  <Plus className="w-6 h-6 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                </div>
                <span className="font-medium text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{t.createCustomCard}</span>
              </button>

              {/* Tactic Cards */}
              <AnimatePresence mode="popLayout">
                {filteredCards.map((card) => (
                  <motion.div 
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setActiveCard(card)}
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 cursor-pointer transition-all duration-300 flex flex-col group relative overflow-hidden"
                  >
                    <CardImage card={card} selectedCategory={selectedCategory} bestScore={bestScores[card.id]} />

                    <div className="p-6 flex flex-col flex-grow">
                      {card.isCustom && (
                        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-600 dark:text-slate-300 px-2 py-1 rounded-full shadow-sm z-10">
                          {t.customLabel}
                        </span>
                      )}
                      <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium italic mb-4 text-sm">{card.subtitle}</p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 mb-6 flex-grow text-sm">
                        {card.description}
                      </p>
                      <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 mt-auto">
                        {t.openWorkspace} <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal onClose={() => setIsLoginModalOpen(false)} />
        )}
        {isHistoryModalOpen && (
          <HistoryModal 
            onClose={() => setIsHistoryModalOpen(false)} 
            allCards={cards}
            onSelectStory={handleSelectHistory}
          />
        )}
        {isStatsModalOpen && (
          <StatsModal 
            onClose={() => setIsStatsModalOpen(false)} 
            bestScores={bestScores}
            categories={categories}
            allCards={cards}
          />
        )}
        {isAddModalOpen && selectedCategory && (
          <AddCardModal 
            category={selectedCategory} 
            onClose={() => setIsAddModalOpen(false)} 
            onAdd={handleAddCard} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </AppProvider>
  );
}
