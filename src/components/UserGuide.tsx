import React from 'react';
import { Lightbulb, Compass, Users, Settings, Triangle, Sparkles, GitMerge, Layers, Star, Target, Zap, CheckCircle2 } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function UserGuide() {
  const { language } = useApp();

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
      categoryTipsTitle: "Tips for each category",
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
      categoryTipsTitle: "Mẹo hay cho từng nhóm thẻ",
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.steps.map((step, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20">
                <div className="font-bold text-lg mb-2 text-yellow-300">{step.title}</div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Specific Guides */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
        <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" />
        {t.categoryTipsTitle}
      </h3>
      
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
  );
}
