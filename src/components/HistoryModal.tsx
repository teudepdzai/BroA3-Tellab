import React, { useEffect, useState } from 'react';
import { X, History, FileText, Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { TacticCard } from '../data';

interface HistoryModalProps {
  onClose: () => void;
  allCards: TacticCard[];
  onSelectStory: (cardId: string, content: string) => void;
}

interface StoryRecord {
  id: string;
  cardId: string;
  content: string;
  score?: number;
  bestScore?: number;
  updatedAt: string;
}

export default function HistoryModal({ onClose, allCards, onSelectStory }: HistoryModalProps) {
  const { token } = useAuth();
  const [stories, setStories] = useState<StoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/history', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setStories(data);
          } else {
            console.error('History data is not an array:', data);
            setStories([]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchHistory();
    }
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col border border-slate-100 dark:border-slate-800"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History size={20} className="text-indigo-600 dark:text-indigo-400" />
            Lịch sử làm bài
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin text-indigo-600" size={32} />
            </div>
          ) : stories.length === 0 ? (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
              <FileText size={48} className="mx-auto mb-4 opacity-20" />
              <p>Bạn chưa có bài làm nào được lưu.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {stories.map((story) => {
                const card = allCards.find(c => c.id === story.cardId);
                if (!card) return null;

                return (
                  <div 
                    key={story.id}
                    onClick={() => {
                      onSelectStory(story.cardId, story.content);
                      onClose();
                    }}
                    className="group p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50/30 dark:hover:bg-indigo-900/10 cursor-pointer transition-all relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {card.title}
                        </h4>
                        {story.score !== undefined && (
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            story.score >= 8 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                            story.score >= 5 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                            'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}>
                            {story.score}/10
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(story.updatedAt)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 font-serif italic">
                      {story.content || "(Chưa có nội dung)"}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-xs font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Tiếp tục làm bài <ArrowRight size={12} className="ml-1" />
                      </div>
                      {story.bestScore !== undefined && (
                        <div className="text-xs text-slate-400 font-medium">
                          Cao nhất: <span className="text-slate-600 dark:text-slate-300 font-bold">{story.bestScore}/10</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
