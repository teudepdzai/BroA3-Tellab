import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle2, Lightbulb, Compass, Users, Settings, Triangle, Sparkles, GitMerge, Layers } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

interface TipsModalProps {
  onClose: () => void;
}

export default function TipsModal({ onClose }: TipsModalProps) {
  const { language } = useApp();

  const content = {
    en: {
      title: "Tips for each category",
      guides: [
        {
          icon: Lightbulb,
          title: "Concept",
          color: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
          tips: [
            "Focus on 'Why': Why does this idea matter?",
            "Use Metaphors to explain the new with the old.",
            "Clearly define the problem (The Dragon) and the solution (The City)."
          ]
        },
        {
          icon: Compass,
          title: "Explore",
          color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
          tips: [
            "Don't just list data, find the story behind the numbers.",
            "Use 'Social Proof' to increase credibility.",
            "Listen and understand the audience's emotions."
          ]
        },
        {
          icon: Users,
          title: "Character",
          color: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30",
          tips: [
            "The audience is the Hero, you are just the Guide.",
            "Clearly describe the character's motivations and barriers.",
            "Create empathy with relatable details."
          ]
        },
        {
          icon: Settings,
          title: "Function",
          color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
          tips: [
            "Define the goal: Sell, Persuade, or Lead?",
            "Use an 'Icebreaker' to connect.",
            "Summarize the story in a single sentence (Elevator Pitch)."
          ]
        },
        {
          icon: Triangle,
          title: "Structure",
          color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
          tips: [
            "Apply 'Man in a Hole': Stability -> Trouble -> Recovery.",
            "Create drama with Turning points.",
            "Always have a satisfying ending (Happy Ever After... or Lesson Learned)."
          ]
        },
        {
          icon: Sparkles,
          title: "Style",
          color: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
          tips: [
            "Simplify language (The Grandma Test).",
            "Use the Rule of Three (Three is the Magic Number).",
            "Show, Don't Tell: Use images and actions instead of empty words."
          ]
        },
        {
          icon: GitMerge,
          title: "Organise",
          color: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/30",
          tips: [
            "Build a detailed Audience Profile.",
            "Categorize stories: Big/Small, Internal/External.",
            "Save interesting anecdotes in a 'Story Bank'."
          ]
        },
        {
          icon: Layers,
          title: "Recipe",
          color: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800",
          tips: [
            "Combine multiple cards to solve complex problems.",
            "Example: Use 'The Pitch' to sell + 'Hero & Guide' to build trust.",
            "Flexibly adjust the recipe for the context."
          ]
        }
      ]
    },
    vi: {
      title: "Mẹo hay cho từng nhóm thẻ",
      guides: [
        {
          icon: Lightbulb,
          title: "Concept (Ý tưởng)",
          color: "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
          tips: [
            "Tập trung vào 'Why': Tại sao ý tưởng này quan trọng?",
            "Sử dụng phép ẩn dụ (Metaphor) để giải thích cái mới bằng cái cũ.",
            "Xác định rõ vấn đề (The Dragon) và giải pháp (The City)."
          ]
        },
        {
          icon: Compass,
          title: "Explore (Khám phá)",
          color: "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30",
          tips: [
            "Đừng chỉ liệt kê dữ liệu, hãy tìm câu chuyện đằng sau con số.",
            "Sử dụng 'Social Proof' (Bằng chứng xã hội) để tăng độ tin cậy.",
            "Lắng nghe và thấu hiểu cảm xúc của khán giả."
          ]
        },
        {
          icon: Users,
          title: "Character (Nhân vật)",
          color: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30",
          tips: [
            "Khán giả là Người hùng (Hero), bạn chỉ là Người dẫn đường (Guide).",
            "Mô tả rõ động lực và rào cản của nhân vật.",
            "Tạo sự đồng cảm bằng những chi tiết đời thường."
          ]
        },
        {
          icon: Settings,
          title: "Function (Chức năng)",
          color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
          tips: [
            "Xác định rõ mục tiêu: Bán hàng, Thuyết phục hay Lãnh đạo?",
            "Dùng 'Icebreaker' để phá băng và kết nối.",
            "Tóm tắt câu chuyện trong một câu duy nhất (Elevator Pitch)."
          ]
        },
        {
          icon: Triangle,
          title: "Structure (Cấu trúc)",
          color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
          tips: [
            "Áp dụng cấu trúc 'Man in a Hole': Ổn định -> Gặp nạn -> Thoát nạn.",
            "Tạo sự kịch tính bằng những bước ngoặt (Turning points).",
            "Luôn có một cái kết thỏa đáng (Happy Ever After... or Lesson Learned)."
          ]
        },
        {
          icon: Sparkles,
          title: "Style (Phong cách)",
          color: "text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30",
          tips: [
            "Đơn giản hóa ngôn từ (The Grandma Test).",
            "Sử dụng quy tắc số 3 (Three is the Magic Number).",
            "Show, Don't Tell: Dùng hình ảnh và hành động thay vì lời nói suông."
          ]
        },
        {
          icon: GitMerge,
          title: "Organise (Tổ chức)",
          color: "text-pink-600 bg-pink-100 dark:text-pink-400 dark:bg-pink-900/30",
          tips: [
            "Xây dựng hồ sơ khán giả (Audience Profile) chi tiết.",
            "Phân loại câu chuyện: Lớn/Nhỏ, Nội bộ/Bên ngoài.",
            "Lưu trữ các giai thoại thú vị vào 'Ngân hàng câu chuyện'."
          ]
        },
        {
          icon: Layers,
          title: "Recipe (Công thức)",
          color: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800",
          tips: [
            "Kết hợp nhiều thẻ để giải quyết vấn đề phức tạp.",
            "Ví dụ: Dùng 'The Pitch' để bán ý tưởng + 'Hero & Guide' để xây dựng niềm tin.",
            "Linh hoạt điều chỉnh công thức cho phù hợp ngữ cảnh."
          ]
        }
      ]
    }
  };

  const t = content[language];

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
        className="bg-white dark:bg-slate-900 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden relative z-10 flex flex-col border border-slate-100 dark:border-slate-800"
      >
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" />
            {t.title}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors text-slate-500 dark:text-slate-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.guides.map((guide, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className={`inline-flex p-3 rounded-lg ${guide.color} mb-4`}>
                  <guide.icon size={24} />
                </div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">{guide.title}</h4>
                <ul className="space-y-3">
                  {guide.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 flex-shrink-0" />
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
