import React from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Target, TrendingUp } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Category, TacticCard } from '../data';

interface StatsModalProps {
  onClose: () => void;
  bestScores: Record<string, number>;
  categories: Category[];
  allCards: TacticCard[];
}

export default function StatsModal({ onClose, bestScores, categories, allCards }: StatsModalProps) {
  // Calculate average score per category
  const data = categories.map(category => {
    const categoryCards = allCards.filter(c => c.categoryId === category.id);
    const scoredCards = categoryCards.filter(c => bestScores[c.id] !== undefined);
    
    let averageScore = 0;
    if (scoredCards.length > 0) {
      const totalScore = scoredCards.reduce((sum, c) => sum + (bestScores[c.id] || 0), 0);
      averageScore = totalScore / scoredCards.length;
    }

    return {
      subject: category.title,
      A: parseFloat(averageScore.toFixed(1)),
      fullMark: 10,
    };
  });

  const overallAverage = data.reduce((sum, item) => sum + item.A, 0) / (data.filter(d => d.A > 0).length || 1);

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
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col border border-slate-100 dark:border-slate-800"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Thống kê kỹ năng</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto flex-1">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Chart Section */}
            <div className="flex-1 min-h-[400px] bg-slate-50 dark:bg-slate-800/30 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar
                    name="Kỹ năng"
                    dataKey="A"
                    stroke="#6366f1"
                    strokeWidth={3}
                    fill="#818cf8"
                    fillOpacity={0.5}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className="w-full md:w-80 space-y-6">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2 opacity-90">
                  <Trophy size={20} />
                  <span className="font-bold uppercase tracking-wider text-sm">Điểm trung bình</span>
                </div>
                <div className="text-5xl font-bold mb-2">{overallAverage.toFixed(1)}</div>
                <div className="text-sm opacity-80">Trên thang điểm 10</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Target size={18} className="text-indigo-500" />
                  Chi tiết từng kỹ năng
                </h4>
                <div className="space-y-2">
                  {data.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.subject}</span>
                      <span className={`text-sm font-bold ${
                        item.A >= 8 ? 'text-emerald-600 dark:text-emerald-400' :
                        item.A >= 5 ? 'text-yellow-600 dark:text-yellow-400' :
                        'text-slate-500'
                      }`}>
                        {item.A > 0 ? item.A : '-'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
