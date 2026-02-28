import React, { useState } from 'react';
import { Lightbulb, Compass, Users, Settings, Triangle, Sparkles, GitMerge, Layers, Star, Target, Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import TipsModal from './TipsModal';
import { AnimatePresence } from 'motion/react';

export default function UserGuide() {
  const { language } = useApp();
  const [isTipsModalOpen, setIsTipsModalOpen] = useState(false);

  const content = {
    en: {
      title: "User Guide & High Score Secrets",
      subtitle: "Master the art of storytelling with expert tips for each card category and AI evaluation criteria.",
      highScoreTitle: "How to get a 10/10 score?",
      steps: [
        {
          title: "Step 1: Clarity",
          desc: "The message must be sharp. Avoid jargon. Write as if you are telling a friend."
        },
        {
          title: "Step 2: Engagement",
          desc: "Start with a Hook. Keep the rhythm. Create curiosity so the reader can't stop."
        },
        {
          title: "Step 3: Relevance",
          desc: "Stick to the card structure. Answer all the prompt questions in each section."
        },
        {
          title: "Step 4: Emotion",
          desc: "Don't just list facts, tell feelings. Connect heart to heart. Sincerity is key."
        }
      ],
      tipsButton: "Tips to improve"
    },
    vi: {
      title: "Hướng dẫn & Bí quyết đạt điểm cao",
      subtitle: "Làm chủ nghệ thuật kể chuyện với những lời khuyên chuyên sâu cho từng nhóm thẻ và tiêu chí đánh giá của AI.",
      highScoreTitle: "Làm thế nào để đạt 10/10 điểm?",
      steps: [
        {
          title: "Bước 1: Độ rõ ràng",
          desc: "Thông điệp phải sắc bén. Tránh dùng từ ngữ chuyên ngành khó hiểu. Hãy viết như đang kể cho một người bạn."
        },
        {
          title: "Bước 2: Độ hấp dẫn",
          desc: "Mở đầu ấn tượng (Hook). Giữ nhịp điệu câu chuyện. Tạo sự tò mò khiến người đọc không thể dừng lại."
        },
        {
          title: "Bước 3: Sự phù hợp",
          desc: "Bám sát cấu trúc của thẻ bài. Trả lời đầy đủ các câu hỏi gợi ý trong từng phần của thẻ."
        },
        {
          title: "Bước 4: Cảm xúc",
          desc: "Đừng chỉ kể sự việc, hãy kể cảm xúc. Kết nối trái tim với trái tim. Sự chân thành là chìa khóa."
        }
      ],
      tipsButton: "Mẹo hay để cải thiện"
    }
  };

  const t = content[language];

  return (
    <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-slate-900 dark:text-white mb-4 flex items-center justify-center gap-3">
          <Target className="text-indigo-600 dark:text-indigo-400" size={32} />
          {t.title}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          {t.subtitle}
        </p>
      </div>

      {/* High Score Tips */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white shadow-xl mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Star size={200} />
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Zap className="text-yellow-300" />
            {t.highScoreTitle}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {t.steps.map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="font-bold text-lg mb-2 text-yellow-300">{step.title}</div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <button 
              onClick={() => setIsTipsModalOpen(true)}
              className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Lightbulb size={20} />
              {t.tipsButton}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isTipsModalOpen && (
          <TipsModal onClose={() => setIsTipsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
