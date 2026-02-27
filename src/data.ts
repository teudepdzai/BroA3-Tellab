import { 
  Lightbulb, 
  Compass, 
  Users, 
  Settings, 
  Triangle, 
  Sparkles, 
  GitMerge, 
  Layers 
} from 'lucide-react';

export interface CardSection {
  title: string;
  items: string[];
}

export interface TacticCard {
  id: string;
  categoryId: string;
  title: string;
  subtitle: string;
  description: string;
  sections: CardSection[];
  isCustom?: boolean;
  imageUrl?: string;
  storyExample?: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  fullDescription?: string;
}

const getCardImage = (id: string, title: string, categoryId: string) => {
  // Category-specific keywords to improve relevance
  const categoryKeywords: Record<string, string> = {
    concept: "abstract idea, lightbulb, vision, strategy, ethereal, nebula, thought bubble, spark",
    explore: "map, compass, discovery, landscape, horizon, binoculars, magnifying glass, journey",
    character: "portrait, people, faces, emotion, interaction, crowd, silhouette, human connection",
    function: "gears, tools, mechanics, blueprint, structure, engineering, wrench, puzzle pieces",
    structure: "architecture, building, blocks, foundation, geometry, pyramid, scaffolding, bridge",
    style: "artistic, paint, brush strokes, vibrant, fashion, elegant, typography, calligraphy",
    organise: "library, shelves, folders, sorting, grid, network, connecting dots, flowchart",
    recipe: "cooking, alchemy, potion, mixing, chemistry, laboratory, ingredients, magic book"
  };

  const keywords = categoryKeywords[categoryId] || "abstract, creative";
  
  // Use a more descriptive prompt for better results
  const prompt = `${title} concept illustration, ${keywords}, minimalist vector art, flat design, geometric shapes, abstract, trending on dribbble, colorful, high quality`;
  const encodedPrompt = encodeURIComponent(prompt);
  // Add a random seed based on ID to ensure consistency but uniqueness
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // Using default model (turbo) for better reliability and speed
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&nologo=true&seed=${seed}`;
};

const categoriesEn: Category[] = [
  {
    id: 'concept',
    title: 'Concept',
    description: 'Stories shape how we see ourselves and the world around us. Frame your work as an epic adventure.',
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    fullDescription: "Concept cards help you find the 'Big Idea' behind your story. They are about strategy and vision. Use these to clarify what you are doing and why it matters."
  },
  {
    id: 'explore',
    title: 'Explore',
    description: 'Stories help us navigate confusing, unknown and changing situations. Make a map for your way ahead.',
    icon: Compass,
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    fullDescription: "Explore cards are for when you are stuck or facing the unknown. They help you research your audience and your topic before you start crafting the narrative."
  },
  {
    id: 'character',
    title: 'Character',
    description: 'Stories connect us to other people. Show us why we can trust you.',
    icon: Users,
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    fullDescription: "Character cards focus on the people in your story—the hero, the guide, the villain. They help you build empathy and trust with your audience."
  },
  {
    id: 'function',
    title: 'Function',
    description: 'Stories are more effective than facts or opinions by themselves. Put your stories to work.',
    icon: Settings,
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    fullDescription: "Function cards help you decide what job your story needs to do. Are you trying to sell, persuade, explain, or lead? Pick the right tool for the job."
  },
  {
    id: 'structure',
    title: 'Structure',
    description: 'Stories carry us along thanks to a few basic patterns. Make your ideas flow in a story-ish way.',
    icon: Triangle,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    fullDescription: "Structure cards give you the backbone of your narrative. They provide proven templates like 'The Hero's Journey' or 'Man in a Hole' to organize your events."
  },
  {
    id: 'style',
    title: 'Style',
    description: 'Stories carry useful information. Make sure people remember yours.',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    fullDescription: "Style cards are about the polish—metaphors, simple language, and sensory details. They ensure your story sticks in the listener's mind."
  },
  {
    id: 'organise',
    title: 'Organise',
    description: 'Stories work, so long as you use them well. Plan how you should tell yours.',
    icon: GitMerge,
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    fullDescription: "Organise cards help you manage your story backlog and production. They are about the process of storytelling within a team or project."
  },
  {
    id: 'recipe',
    title: 'Recipe',
    description: 'Stories can change the world. See which problems you can solve by combining different story tactics.',
    icon: Layers,
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    fullDescription: "Recipe cards show you how to combine other cards to solve specific problems, like 'Pitching a new product' or 'Leading a team through change'."
  }
];

const categoriesVi: Category[] = [
  {
    id: 'concept',
    title: 'Concept (Ý tưởng)',
    description: 'Mọi câu chuyện vĩ đại đều bắt đầu từ một ý tưởng. Hãy định hình tầm nhìn của bạn như một chuyến phiêu lưu đầy cảm hứng.',
    icon: Lightbulb,
    color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    fullDescription: "Thẻ Concept giúp bạn tìm ra 'Linh hồn' của câu chuyện. Chúng định hình chiến lược và tầm nhìn, giúp bạn làm rõ: Bạn đang làm gì và Tại sao điều đó lại quan trọng đến thế?"
  },
  {
    id: 'explore',
    title: 'Explore (Khám phá)',
    description: 'Khi con đường phía trước còn mờ mịt, câu chuyện sẽ là tấm bản đồ dẫn lối. Hãy thấu hiểu khán giả trước khi cất lời.',
    icon: Compass,
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    fullDescription: "Thẻ Explore dành cho những lúc bạn cảm thấy bế tắc hoặc đối mặt với những điều chưa biết. Chúng giúp bạn đào sâu nghiên cứu, thấu hiểu tâm tư khán giả và bối cảnh trước khi bắt tay vào kể chuyện."
  },
  {
    id: 'character',
    title: 'Character (Nhân vật)',
    description: 'Kết nối giữa người với người là chìa khóa của lòng tin. Hãy cho khán giả thấy nhân vật chính trong câu chuyện của bạn.',
    icon: Users,
    color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    fullDescription: "Thẻ Character thổi hồn vào câu chuyện qua những con người cụ thể—người hùng, người dẫn đường, hay kẻ phản diện. Đây là cách bạn xây dựng sự đồng cảm và lòng tin sâu sắc."
  },
  {
    id: 'function',
    title: 'Function (Chức năng)',
    description: 'Đừng để câu chuyện chỉ là lời nói suông. Hãy biến nó thành công cụ đắc lực để đạt được mục tiêu của bạn.',
    icon: Settings,
    color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    fullDescription: "Thẻ Function giúp bạn xác định nhiệm vụ của câu chuyện. Bạn muốn bán hàng, thuyết phục, giải thích hay truyền cảm hứng lãnh đạo? Hãy chọn đúng công cụ cho công việc."
  },
  {
    id: 'structure',
    title: 'Structure (Cấu trúc)',
    description: 'Một câu chuyện hay cần một khung xương vững chắc. Hãy sắp xếp ý tưởng của bạn theo những mô hình đã được kiểm chứng.',
    icon: Triangle,
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    fullDescription: "Thẻ Structure cung cấp bộ khung vững chãi cho câu chuyện. Sử dụng các mô hình kinh điển như 'Hành trình Anh hùng' hay 'Vượt qua Nghịch cảnh' để dẫn dắt cảm xúc người nghe."
  },
  {
    id: 'style',
    title: 'Style (Phong cách)',
    description: 'Nội dung hay cần cách diễn đạt tốt. Hãy trau chuốt ngôn từ để câu chuyện khắc sâu vào tâm trí người nghe.',
    icon: Sparkles,
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    fullDescription: "Thẻ Style là nghệ thuật của sự tinh tế—từ phép ẩn dụ, ngôn ngữ giản đơn đến những chi tiết gợi cảm xúc. Đảm bảo câu chuyện của bạn không chỉ được nghe, mà còn được nhớ mãi."
  },
  {
    id: 'organise',
    title: 'Organise (Tổ chức)',
    description: 'Kể chuyện là một quy trình cần chiến lược. Hãy quản lý kho tàng câu chuyện của bạn một cách thông minh.',
    icon: GitMerge,
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    fullDescription: "Thẻ Organise giúp bạn xây dựng và quản lý 'Ngân hàng câu chuyện' cũng như quy trình sáng tạo. Đây là bí quyết để duy trì mạch kể chuyện xuyên suốt trong đội nhóm và dự án."
  },
  {
    id: 'recipe',
    title: 'Recipe (Công thức)',
    description: 'Sức mạnh cộng hưởng từ sự kết hợp. Giải quyết những vấn đề phức tạp bằng cách phối hợp các chiến thuật kể chuyện.',
    icon: Layers,
    color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
    fullDescription: "Thẻ Recipe là những công thức phối hợp các thẻ khác để giải quyết bài toán cụ thể, như 'Thuyết trình sản phẩm mới' hay 'Lãnh đạo qua khủng hoảng'."
  }
];

const initialCardsEn: TacticCard[] = [
  {
    id: 'dragon-city',
    categoryId: 'concept',
    title: 'The Dragon & the City',
    subtitle: 'Get people excited',
    description: 'Explain your project as if it’s an epic adventure. Get people excited about your plan of action.',
    imageUrl: getCardImage('dragon-city', 'The Dragon & the City', 'concept'),
    sections: [
      {
        title: '1. What is your City?',
        items: [
          'What is good and valuable in the status quo?',
          'What is wrong, unfair or wasteful?',
          'Who’s in charge? Who do you need to persuade to act?'
        ]
      },
      {
        title: '2. What is your Dragon?',
        items: [
          'Where is the threat coming from?',
          'How has it been allowed to get this bad?',
          'Is there an opportunity here? (Dragons hoard gold!)'
        ]
      },
      {
        title: '3. Escape',
        items: [
          'Where would you go?',
          'What should you take with you?',
          'What’s the cost of abandoning the city?'
        ]
      },
      {
        title: '4. Defend',
        items: [
          'What is worth defending in the old city?',
          'How can you strengthen your walls?',
          'Walls protect, but they also restrict. What’s the cost of staying put?'
        ]
      },
      {
        title: '5. Attack',
        items: [
          'What’s your best line of attack?',
          'What are your chances of winning?',
          'What’s the reward and is it worth the risk?'
        ]
      }
    ]
  },
  // ... (Other English cards would go here, keeping existing ones for brevity in this example, but let's assume I only translate one fully for now to demonstrate)
  {
    id: 'data-detective',
    categoryId: 'explore',
    title: 'The Data Detective',
    subtitle: 'Find the story in the numbers',
    description: 'Don’t just show a spreadsheet. Find the human story hidden in the data to make it meaningful.',
    sections: [
      {
        title: '1. The Outlier',
        items: ['What stands out from the rest?', 'Why is it different?', 'Is it a good or bad anomaly?']
      },
      {
        title: '2. The Trend',
        items: ['Where are the numbers going?', 'Is it a steep climb or a slow decline?', 'What happens if we do nothing?']
      },
      {
        title: '3. The Human Factor',
        items: ['Who is affected by these numbers?', 'What does this data mean for a single user?', 'Put a face to the statistic.']
      }
    ]
  },
  // ... keeping the rest of English cards as is from the previous file content, but I need to return them all.
  // For brevity in this edit, I will include the rest of the English cards from the original file.
  {
    id: 'the-hero',
    categoryId: 'character',
    title: 'The Hero',
    subtitle: 'Make your audience care',
    description: 'Every story needs someone to root for. Usually, it’s not you—it’s your user or customer.',
    sections: [
      {
        title: '1. Who is the Hero?',
        items: ['It is usually your audience, not you.', 'What are they like?', 'Why should we care about them?']
      },
      {
        title: '2. The Goal',
        items: ['What do they want more than anything?', 'Why does it matter to them?', 'What happens if they fail?']
      },
      {
        title: '3. The Flaw',
        items: ['What is holding them back?', 'Is it an internal fear or an external lack of resources?', 'How can you help them overcome it?']
      }
    ]
  },
  {
    id: 'whats-it-about',
    categoryId: 'function',
    title: "What's It About?",
    subtitle: 'The elevator pitch',
    description: 'Summarize your story in a single sentence to ensure clarity and focus.',
    sections: [
      {
        title: 'The Formula',
        items: ['Somebody...', 'Wanted...', 'But...', 'So...']
      },
      {
        title: 'Example',
        items: ['(Somebody) A young farm boy', '(Wanted) wanted to save the princess', '(But) but she was held by the Empire', '(So) so he joined the rebellion.']
      }
    ]
  },
  {
    id: 'man-in-hole',
    categoryId: 'structure',
    title: 'Man in a Hole',
    subtitle: 'Get them out of trouble',
    description: 'A character gets into trouble, then gets out of it again. Simple, classic, and effective for problem-solution narratives.',
    sections: [
      {
        title: '1. Comfort Zone',
        items: ['Things are fine, but maybe a bit stagnant.', 'Establish the baseline.']
      },
      {
        title: '2. The Fall (The Problem)',
        items: ['Something goes wrong.', 'The situation deteriorates.', 'This creates tension and a need for a solution.']
      },
      {
        title: '3. The Climb (The Solution)',
        items: ['Hard work and ingenuity are applied.', 'Your product/service comes into play.', 'The situation improves.']
      },
      {
        title: '4. New Normal',
        items: ['Things are better than before.', 'The lesson has been learned.']
      }
    ]
  },
  {
    id: 'simple-sticky',
    categoryId: 'style',
    title: 'Simple & Sticky',
    subtitle: 'Cut the jargon',
    description: 'If a six-year-old can’t understand it, you don’t understand it well enough. Make your ideas stick.',
    sections: [
      {
        title: '1. The Grandma Test',
        items: ['Could you explain this to your grandmother?', 'If not, simplify it.']
      },
      {
        title: '2. Concrete vs Abstract',
        items: ['Don’t say "optimize synergies".', 'Say "work better together".', 'Use physical, sensory language.']
      },
      {
        title: '3. The Core Message',
        items: ['Strip away everything that isn’t essential.', 'What is the one thing you want them to remember?']
      }
    ]
  },
  {
    id: 'story-bank',
    categoryId: 'organise',
    title: 'The Story Bank',
    subtitle: 'Save it for a rainy day',
    description: 'Don’t let good anecdotes vanish. Collect them systematically so you always have a story ready.',
    sections: [
      {
        title: '1. Collect',
        items: ['When something interesting happens, write it down.', 'Did a customer say something funny?', 'Did a project fail spectacularly?']
      },
      {
        title: '2. Tag',
        items: ['Tag by emotion (funny, sad, inspiring).', 'Tag by topic (leadership, failure, innovation).']
      },
      {
        title: '3. Retrieve',
        items: ['Before a presentation, check your bank.', 'Find a story that fits your point.']
      }
    ]
  },
  {
    id: 'the-pitch',
    categoryId: 'recipe',
    title: 'The Pitch',
    subtitle: 'Win the business',
    description: 'A combination of cards to sell an idea effectively.',
    sections: [
      {
        title: 'Ingredients',
        items: ['The Dragon & The City (To set the stakes)', 'The Hero (To show who benefits)', 'Better World (To show the result)']
      },
      {
        title: 'Method',
        items: ['Start with the problem (Dragon).', 'Introduce the user (Hero).', 'Show how your solution leads to a Better World.']
      }
    ]
  },
  {
    id: 'happy-ever-afters',
    categoryId: 'structure',
    title: 'Happy Ever Afters',
    subtitle: 'Craft an ending',
    description: "We're suckers for a happy ending. Life is no fairy tale, but you can always give your story a satisfying end.",
    sections: [
      {
        title: 'a. Growing Up',
        items: ['Luke starts out a farm boy and ends up a Jedi.', 'Harry goes to Hogwarts and becomes a Wizard.', 'How has your hero grown?', 'What life-stage transition have they achieved?']
      },
      {
        title: 'b. Finding Home, Love or Respect',
        items: ['Odysseus makes it home to Penelope.', 'Beauty tames The Beast.', 'How does your hero find a place in the world?', 'How to fit in with others and how to do the right thing.']
      },
      {
        title: 'c. Doing the Right Thing',
        items: ['Ripley fights an Alien queen.', 'Rastamouse is here to "make a bad thing good."', 'What\'s the bad thing your hero faced?', 'How did you help?']
      }
    ]
  },
  {
    id: 'innovation-curve',
    categoryId: 'structure',
    title: 'Innovation Curve',
    subtitle: 'Convince the doubters',
    description: 'Make your bold new idea seem less risky. People will say "No!" to your new ideas if they feel the risk is too high for them.',
    sections: [
      {
        title: 'Innovators & Pioneers',
        items: ['Tell them stories about team culture.', 'They are adventurous with a high tolerance for risk.', 'Hopes: this is new and exciting.', 'Fears: "innovator tax" i.e. the costs of being first.']
      },
      {
        title: 'Early Mainstream',
        items: ['Open to new ideas but aware of the pitfalls.', 'Hopes: this is new but has been tested.', 'Fears: reputation damage if I endorse a flop.', 'Tell them: you can grab a lead in a niche market.']
      },
      {
        title: 'Late Mainstream',
        items: ['Want to buy a fully developed product, off the shelf.', 'Hopes: this is ready and recommended by others.', 'Fears: cost of disruption to business-as-usual.', 'Tell them: it works in a niche market, now it\'s ready for mass market.']
      },
      {
        title: 'Traditional',
        items: ['Regard all innovation as high risk.', 'Hopes: don\'t want to miss out.', 'Fears: there are costs to being left behind.', 'Tell them: everyone is doing it, we\'ve made it easy.']
      }
    ]
  },
  {
    id: 'no-easy-way',
    categoryId: 'structure',
    title: 'No Easy Way',
    subtitle: 'Keep it real',
    description: 'Nothing good is ever easy. If something was good and easy, we\'d be doing it already.',
    sections: [
      {
        title: 'The Arc',
        items: [
          'Problem: a bad place, where danger lurks or potential is unrealised.',
          'Early Success: The Hero takes an opportunity and things start to change.',
          'Setback: The Hero\'s own weakness, or hostile reaction of others, make things turn bad.',
          'Crisis: it gets so bad, maybe the Hero would\'ve been better off not trying to change.',
          'Recovery: The Hero learns where true strength lies.',
          'Better place: danger is averted, potential is realised.'
        ]
      }
    ]
  },
  {
    id: 'hero-and-guide',
    categoryId: 'character',
    title: 'Hero & Guide',
    subtitle: 'Help others succeed',
    description: 'Stop talking about yourself. Make your user the Hero of your story. You play a supporting role: the Expert Guide.',
    sections: [
      {
        title: '1. Map your user\'s journey',
        items: ['Where are they now?', 'What is their problem?', 'Where do they want to be?']
      },
      {
        title: '2. Where do you come in?',
        items: ['You come in to their journey as an Expert Guide.', 'Are you The Explorer, The Rebel, The Sage, The Muse, The Defender, or The Warrior?']
      },
      {
        title: '3. Use the story arc cards',
        items: ['Use Rags to Riches, Man in a Hole or No Easy Way to develop your Expert Guide story.']
      }
    ]
  },
  {
    id: 'whats-my-motivation',
    categoryId: 'character',
    title: "What's My Motivation?",
    subtitle: 'Figure people out',
    description: 'How will your user or customer respond to your idea? It helps if you know what\'s driving them.',
    sections: [
      {
        title: '1. Actors',
        items: ['Make a list of the key "actors" in your project.', 'This could include the client, a range of users or stakeholders.']
      },
      {
        title: '2. Method Acting',
        items: ['Who am I?', 'Where am I?', 'When is it?', 'What do I want?', 'Why do I want it?', 'How will I get it?', 'What must I overcome to get it?']
      },
      {
        title: '3. Connections',
        items: ['Co-operation: why might one actor help another reach their goal?', 'Conflict: why might one actor hinder another?']
      }
    ]
  },
  {
    id: 'drive-stories',
    categoryId: 'character',
    title: 'Drive Stories',
    subtitle: 'Motivate your team',
    description: 'Why do you work? For the money, yes. But what really drives you? These stories build a better team culture.',
    sections: [
      {
        title: 'a. Autonomy',
        items: ['A sense that you have control over the way you work.', 'Positive: "Here\'s a moment when I felt I had enough autonomy..."', 'Negative: "Here\'s a moment when I didn\'t have enough autonomy..."']
      },
      {
        title: 'b. Mastery',
        items: ['A sense that your skills are steadily improving.', 'Positive: "Here\'s a moment when I felt I\'d mastered the skills I need..."', 'Negative: "Here\'s a moment when I didn\'t have the skills I needed..."']
      },
      {
        title: 'c. Purpose',
        items: ['A sense that you are doing worthwhile work.', 'Positive: "Here\'s a moment when I could see how my work contributes to a greater good..."', 'Negative: "Here\'s a moment when I couldn\'t see the bigger picture..."']
      }
    ]
  },
  {
    id: 'story-listening',
    categoryId: 'explore',
    title: 'Story Listening',
    subtitle: 'Get insights from others',
    description: 'Listen to other people\'s stories when you need their wisdom or support. Don\'t just talk at them!',
    sections: [
      {
        title: '1st listen: Is this a memorable story?',
        items: ['Why does this story stick in your subject\'s memory?', 'What\'s the strong emotion attached to this story?']
      },
      {
        title: '2nd listen: Create a basic timeline',
        items: ['What were you trying to achieve?', 'What happened?']
      },
      {
        title: '3rd listen: Add key decisions',
        items: ['What were your options as the situation unfolded?', 'What if you\'d tried something else?']
      },
      {
        title: '4th listen: Identify the expertise',
        items: ['Where might a novice have made mistakes?', 'What might someone with different expertise have missed that you spotted?']
      }
    ]
  },
  {
    id: 'social-proof',
    categoryId: 'explore',
    title: 'Social Proof',
    subtitle: 'Establish credibility',
    description: 'You\'re in a busy room. Suddenly a fire alarm goes off. What do you do? You watch other people.',
    sections: [
      {
        title: 'a. Trends',
        items: ['What data can you present showing that lots of people are acting in a certain way?', 'Is there an Early Adopter who could be worth watching?']
      },
      {
        title: 'b. Prototypes',
        items: ['What kind of tests and trials have you run with your project?', 'How did people react?']
      },
      {
        title: 'c. Testimonials',
        items: ['Was there one thing you really liked about [x]?', 'Was there one moment when you thought "yes, I made the right decision"?', 'What would you say to persuade a friend to work with us?']
      }
    ]
  },
  {
    id: 'emotional-dashboard',
    categoryId: 'explore',
    title: 'Emotional Dashboard',
    subtitle: "Find your story's heart",
    description: 'Look for strong emotions when you need to find a story. What made you feel that way and what happened next?',
    sections: [
      {
        title: '1. Identify Emotions',
        items: ['Happiness, Confidence, Love, Delight, Trust, Pride, Excitement, Joy, Conviction', 'Sadness, Fear, Doubt, Disgust, Distrust, Shame, Boredom, Anger, Hate']
      },
      {
        title: '2. Write Sentences',
        items: ['"I felt... [strong emotion]"', '"When I realised... [change or new information]"', '"Because I wanted... [original goal]"', '"And so I... [reaction or lesson learned]"']
      },
      {
        title: '3. Customer View',
        items: ['Try the same exercise but from your customer or user\'s point of view.', 'How is your product helping them get what they wanted?']
      }
    ]
  },
  {
    id: 'stories-that-lead',
    categoryId: 'recipe',
    title: 'Stories that Lead',
    subtitle: 'Show the way',
    description: 'Build a stronger team by learning from each other\'s stories of struggles, triumphs and setbacks.',
    sections: [
      {
        title: 'Ingredients',
        items: ['Curious Tales', 'Man in a Hole', 'Emotional Dashboard', 'Thoughtful Failures', 'Story Bank']
      },
      {
        title: 'Method',
        items: ['Make your team more cohesive and inclusive by sharing stories of what "good" looks like.']
      }
    ]
  },
  {
    id: 'stories-that-sell',
    categoryId: 'recipe',
    title: 'Stories that Sell',
    subtitle: 'Show your value',
    description: 'Convince people that you can deliver. Stories work better than spreadsheets when it comes to building trust.',
    sections: [
      {
        title: 'Ingredients',
        items: ['Audience Profile', 'Simple Sales Stories', 'Social Proof', 'Rags to Riches', 'Pitch Perfect']
      },
      {
        title: 'Method',
        items: ['Selling is about so much more than price, quality or your "value proposition". You can\'t sell without trust.']
      }
    ]
  },
  {
    id: 'stories-that-convince',
    categoryId: 'recipe',
    title: 'Stories that Convince',
    subtitle: 'Explain your expertise',
    description: 'Explain years of experience and hours of research to a non-expert audience. Get them to back your judgement.',
    sections: [
      {
        title: 'Ingredients',
        items: ['Three is the Magic Number', "That's Funny", 'Data Detectives', "Trust Me, I'm an Expert", 'Hero & Guide']
      },
      {
        title: 'Method',
        items: ['It\'s annoying: you can have all the facts at your fingertips, but still people won\'t listen. Have you turned an exciting process of discovery into a dull spreadsheet?']
      }
    ]
  },
  {
    id: 'audience-profile',
    categoryId: 'organise',
    title: 'Audience Profile',
    subtitle: 'Tell your story right',
    description: 'Know your audience. You can\'t tell the right story if you don\'t know what your audience needs.',
    sections: [
      {
        title: '1. Create a profile',
        items: ['Basic info: name, age, gender, income, job role.', 'Problems: what are you going to help them with?', 'Positives: what are their hopes?', 'Negatives: what are their fears?']
      },
      {
        title: '2. Connect',
        items: ['Can you connect with your audience by telling a story about someone else like them?']
      },
      {
        title: '3. Who would tell your story?',
        items: ['Who would you trust: the boss who says "my product is great" or the customer who says "this product is great"?']
      }
    ]
  },
  {
    id: 'big-small-inside-outside',
    categoryId: 'organise',
    title: 'Big, Small, Inside, Outside',
    subtitle: 'Tell the right story',
    description: 'You might have a Big Story to tell the world. But you\'ll spend more time telling small stories to colleagues.',
    sections: [
      {
        title: 'Small Story, Inside',
        items: ['Habit/Training: use Emotional Dashboard', 'Appraisal: use Story Listening', 'Culture: Thoughtful Failures']
      },
      {
        title: 'Small Story, Outside',
        items: ['Blog/Social: What\'s It About?', 'Brand: Hero & Guide']
      },
      {
        title: 'Big Story, Inside',
        items: ['Induction: Drive Stories', 'Awards: Rolls Royce Moment']
      },
      {
        title: 'Big Story, Outside',
        items: ['Pitch: Pitch Perfect', 'Recruitment: Curious Tales', 'Conference: Show & Tell']
      }
    ]
  },
  {
    id: 'universal-stories',
    categoryId: 'concept',
    title: 'Universal Stories',
    subtitle: 'Find common ground',
    description: 'Build your story on solid foundations. Use elements that everyone will recognise.',
    sections: [
      {
        title: 'Elements',
        items: [
          'Free Will: we see ourselves as free-willed individuals.',
          'Conflict and Cooperation: everyone is capable of both.',
          'Inconsistencies: we all have gaps between what we do, say and think.',
          'Fear and Bravery: we all understand that fears can be overcome.',
          'Right and Wrong: we expect fairness.',
          'Rites of Passage: childhood, adolescent and adult phases.'
        ]
      }
    ]
  },
  {
    id: 'order-and-chaos',
    categoryId: 'concept',
    title: 'Order & Chaos',
    subtitle: 'Clarify your mission',
    description: 'Show how your project can impose order on a chaotic mess—or disrupt a system that\'s too rigid.',
    sections: [
      {
        title: '1. Order (The Known World)',
        items: ['Describe the client, existing products, users.', 'What\'s positive? (utility, predictability)', 'What is negative? (boring, incomplete)']
      },
      {
        title: '2. Chaos (The Unknown World)',
        items: ['Describe competitors, changing technologies, Acts of God.', 'What is negative? (threats and unpredictability)', 'What is positive? (potential for renewal)']
      },
      {
        title: '3. Disruption',
        items: ['How does Chaos disrupt Order?', 'What new info becomes available?']
      },
      {
        title: '4. Response',
        items: ['You are the Hero. How do you respond?', 'Are you helping impose order? Or injecting new life?']
      }
    ]
  },
  {
    id: 'three-is-the-magic-number',
    categoryId: 'style',
    title: 'Three is the Magic Number',
    subtitle: 'Help us remember',
    description: 'Choose the most important parts of your story, then use these tricks to fix them in your audience\'s memory.',
    sections: [
      {
        title: 'Attention Three: James Bond',
        items: ['"Once is happenstance. Twice is coincidence. The third time is enemy action."']
      },
      {
        title: 'Reversal Three: Little Pigs',
        items: ['Straw and sticks are weak. But a house made of brick? This pattern gives you a set up (1 and 2) followed by a reversal (3).']
      },
      {
        title: 'Moderate Three: Goldilocks',
        items: ['Too hot. Too cold. Just right. Set up two extremes then finding the middle ground.']
      }
    ]
  },
  {
    id: 'leave-it-out',
    categoryId: 'style',
    title: 'Leave it Out!',
    subtitle: 'Create some mystery',
    description: 'Tell us you\'ve left something out and we will work hard to fill in the gap. And then we feel like it\'s our story too.',
    sections: [
      {
        title: 'The Dragon',
        items: ['How big is the dragon on the front of this box? Waaay big! How do you know, you can\'t see him? Sometimes what we don\'t see is the best part of the story.']
      },
      {
        title: 'Imagination',
        items: ['Horror movies give us a hint of danger, and we imagine the rest.']
      },
      {
        title: 'Six Words',
        items: ['Ernest Hemmingway told the saddest story in just six words: "For sale. Baby shoes. Never worn."']
      }
    ]
  },
  {
    id: 'show-and-tell',
    categoryId: 'style',
    title: 'Show & Tell',
    subtitle: 'Control our attention',
    description: 'Keep people\'s attention on you while you make a presentation. Make your Show and Tell work together.',
    sections: [
      {
        title: 'Boring',
        items: ['If your script follows your images too closely, we\'re bored.']
      },
      {
        title: 'Confusing',
        items: ['If your script strays too far from the image you\'re showing, we\'re confused.']
      },
      {
        title: 'Engaging',
        items: ['Show us an image, tell us what it is, then you can tell us stuff we can\'t see.']
      }
    ]
  },
  {
    id: 'icebreaker-stories',
    categoryId: 'function',
    title: 'Icebreaker Stories',
    subtitle: 'Warm up with stories',
    description: 'Get your team thinking in a story-ish way.',
    sections: [
      {
        title: 'a. Photo Story',
        items: ['Arrange lots of random images. Choose three. Arrange them into a simple story structure: Before, During, After.']
      },
      {
        title: 'b. Love and Hate',
        items: ['Split team into two. Give each group the same photo (e.g., a stone).', 'Group 1: "You love this stone." Group 2: "You hate this stone."', 'Invent a story explaining why.']
      }
    ]
  },
  {
    id: 'story-ish-conversations',
    categoryId: 'function',
    title: 'Story-ish Conversations',
    subtitle: 'Discover hidden insights',
    description: 'Find the insights buried beneath everyday conversations with your colleagues, customers or users.',
    sections: [
      {
        title: 'Questions',
        items: [
          'Find vivid moments: "That\'s an interesting idea, what might it look like in action?"',
          'Get specific: "Where were you when this happened?"',
          'Look for emotion: "What\'s the strongest feeling you remember?"',
          'Find conflicts: "Who did you need to win over?"',
          'Change: "What happened that forced you to change?"'
        ]
      }
    ]
  },
  {
    id: 'pitch-perfect',
    categoryId: 'function',
    title: 'Pitch Perfect',
    subtitle: 'Sell your idea',
    description: 'Convince me to back your idea. Show me: what have you got that I need? And why should I trust you to deliver?',
    sections: [
      {
        title: '1. Top-line version',
        items: ['Write a top-line version of your idea. (Use What\'s It About)']
      },
      {
        title: '2. POPP',
        items: ['Problem, Opportunity, Practical Steps, Promise. Set out your pitch like a story arc.']
      },
      {
        title: '3. Visuals',
        items: ['Use Show & Tell if you need to create a visual pitch document.']
      }
    ]
  }
];

const initialCardsVi: TacticCard[] = [
  {
    id: 'dragon-city',
    categoryId: 'concept',
    title: 'Rồng & Tòa Thành',
    subtitle: 'Khơi dậy sự hào hứng',
    description: 'Hãy kể về dự án của bạn như một chuyến phiêu lưu đầy sử thi. Đánh thức khao khát hành động trong mỗi người.',
    imageUrl: getCardImage('dragon-city', 'The Dragon & the City', 'concept'),
    storyExample: "Ngày xửa ngày xưa, có một vương quốc thịnh vượng, nơi mọi người sống trong an lạc (**Hiện trạng**).\n\nBỗng một ngày, bóng đen của con Rồng khổng lồ bao trùm bầu trời, đe dọa thiêu rụi tất cả (**Nguy cơ**).\n\nĐứng trước thảm họa, người dân có 3 con đường:\n\n1. **Tháo chạy:** Bỏ lại tất cả để tìm chốn dung thân. Nhưng cái giá là mất đi quê hương, di sản.\n2. **Cố thủ:** Xây tường cao hào sâu. Nhưng tường cao cũng che khuất tầm nhìn và cô lập họ với thế giới.\n3. **Chinh phạt:** Tập hợp những hiệp sĩ dũng cảm nhất để tiêu diệt ác thú và giành lấy kho báu.\n\nDự án của bạn chính là con đường **Chinh phạt**. Kho báu vinh quang đang chờ những người dũng cảm.",
    sections: [
      {
        title: '1. Tòa Thành của bạn là gì?',
        items: [
          'Điều gì quý giá và tốt đẹp đang hiện hữu?',
          'Điều gì đang sai lệch, bất công hay lãng phí?',
          'Ai là người nắm quyền? Bạn cần thuyết phục ai cùng hành động?'
        ]
      },
      {
        title: '2. Con Rồng của bạn là gì?',
        items: [
          'Mối đe dọa thực sự đến từ đâu?',
          'Tại sao nó lại có thể lớn mạnh đến thế?',
          'Trong nguy có cơ không? (Rồng thường canh giữ kho báu!)'
        ]
      },
      {
        title: '3. Phương án Tháo chạy',
        items: [
          'Nếu bỏ cuộc, bạn sẽ đi đâu?',
          'Bạn có thể mang theo những gì?',
          'Cái giá phải trả khi từ bỏ "Tòa Thành" là gì?'
        ]
      },
      {
        title: '4. Phương án Cố thủ',
        items: [
          'Điều gì đáng để bảo vệ bằng mọi giá?',
          'Làm sao để củng cố thành lũy?',
          'Tường thành bảo vệ nhưng cũng giam hãm. Cái giá của sự trì trệ là gì?'
        ]
      },
      {
        title: '5. Phương án Chinh phạt',
        items: [
          'Đâu là điểm yếu của con Rồng?',
          'Cơ hội chiến thắng là bao nhiêu?',
          'Phần thưởng chiến thắng có xứng đáng với rủi ro không?'
        ]
      }
    ]
  },
  {
    id: 'happy-ever-afters',
    categoryId: 'structure',
    title: 'Hạnh phúc mãi mãi về sau',
    subtitle: 'Kiến tạo cái kết',
    description: 'Ai cũng khao khát một cái kết có hậu. Đời thực không phải cổ tích, nhưng bạn hoàn toàn có thể mang đến một cái kết thỏa đáng cho câu chuyện của mình.',
    storyExample: "Hãy nhớ về cái kết của Harry Potter. Sau bao mất mát đau thương, Harry không chỉ chiến thắng cái ác mà còn tìm thấy gia đình, tình bạn và sự bình yên.\n\nTrong kinh doanh, **'Hạnh phúc mãi mãi'** không có nghĩa là sự hoàn hảo viển vông, mà là sự **Giải quyết trọn vẹn (Resolution)**.\n\nVí dụ: *'Sau khi áp dụng hệ thống mới, nhân viên không còn phải tăng ca nhập liệu. Họ có thể về nhà sớm ăn tối cùng gia đình.'*\n\nĐó chính là một cái kết có hậu đời thường.",
    sections: [
      {
        title: 'a. Sự Trưởng thành',
        items: ['Luke từ chàng nông dân trở thành Hiệp sĩ Jedi.', 'Harry từ cậu bé gầm cầu thang trở thành Phù thủy vĩ đại.', 'Người hùng của bạn đã lớn lên như thế nào?', 'Họ đã bước qua giai đoạn chuyển mình nào của cuộc đời?']
      },
      {
        title: 'b. Tìm thấy Chốn về, Tình yêu hoặc Sự tôn trọng',
        items: ['Odysseus vượt trùng khơi về với Penelope.', 'Người đẹp cảm hóa Quái vật bằng tình yêu.', 'Người hùng của bạn tìm thấy chỗ đứng của mình thế nào?', 'Làm sao họ hòa nhập và được công nhận?']
      },
      {
        title: 'c. Hành động Chính nghĩa',
        items: ['Ripley chiến đấu với quái vật để bảo vệ mọi người.', 'Người hùng của bạn đã đối mặt với cái ác nào?', 'Bạn đã giúp họ thực thi công lý ra sao?']
      }
    ]
  },
  {
    id: 'innovation-curve',
    categoryId: 'structure',
    title: 'Đường cong Đổi mới',
    subtitle: 'Chinh phục những kẻ hoài nghi',
    description: 'Biến ý tưởng táo bạo thành điều an toàn. Đừng để nỗi sợ rủi ro cản bước sự đổi mới của bạn.',
    storyExample: "Khi Apple ra mắt iPhone, họ không bán cho cả thế giới cùng lúc.\n\n*   **Tiên phong (Innovators):** Họ mê hoặc dân công nghệ bằng sự đột phá.\n*   **Số đông sớm (Early Majority):** Họ chứng minh sự ổn định và sành điệu.\n*   **Số đông muộn (Late Majority):** Họ đơn giản hóa: *'Nó chỉ là cái điện thoại thôi, nhưng xịn hơn'*\n\nĐừng bán ý tưởng điên rồ cho người bảo thủ. Hãy bán cho họ sự an toàn và sự kiểm chứng.",
    sections: [
      {
        title: 'Nhóm Tiên phong & Đổi mới',
        items: ['Kể về văn hóa sáng tạo và tầm nhìn.', 'Họ là những nhà thám hiểm ưa mạo hiểm.', 'Hy vọng: Được trải nghiệm điều mới mẻ, độc đáo.', 'Nỗi sợ: "Thuế đổi mới" - cái giá phải trả của người đi đầu.']
      },
      {
        title: 'Nhóm Số đông sớm (Early Mainstream)',
        items: ['Cởi mở nhưng thận trọng.', 'Hy vọng: Công nghệ mới nhưng đã được kiểm chứng.', 'Nỗi sợ: Mất uy tín nếu ủng hộ sai lầm.', 'Thông điệp: "Bạn sẽ dẫn đầu thị trường ngách này."']
      },
      {
        title: 'Nhóm Số đông muộn (Late Mainstream)',
        items: ['Muốn giải pháp trọn gói, an toàn.', 'Hy vọng: Sản phẩm đã hoàn thiện, được nhiều người dùng.', 'Nỗi sợ: Rắc rối khi thay đổi quy trình cũ.', 'Thông điệp: "Nó đã sẵn sàng cho mọi người, rất dễ sử dụng."']
      },
      {
        title: 'Nhóm Bảo thủ (Traditional)',
        items: ['Coi đổi mới là rủi ro.', 'Hy vọng: Không bị bỏ lại phía sau.', 'Nỗi sợ: Chi phí của sự lạc hậu.', 'Thông điệp: "Mọi người đều dùng rồi, đừng lo lắng."']
      }
    ]
  },
  {
    id: 'no-easy-way',
    categoryId: 'structure',
    title: 'Vượt qua Nghịch cảnh',
    subtitle: 'Đối diện thực tế',
    description: 'Không có vinh quang nào trải đầy hoa hồng. Nếu dễ dàng, ai cũng đã làm được rồi. Hãy kể về những chông gai để tôn vinh thành quả.',
    storyExample: "Hãy kể về hành trình chinh phục Everest. Không ai nói nó dễ dàng cả.\n\n*   Bạn phải đối mặt với bão tuyết cuồng nộ (**Khó khăn**).\n*   Phổi thiếu oxy từng giây (**Thử thách**).\n*   Cơ thể kiệt quệ muốn bỏ cuộc (**Khủng hoảng**).\n\nChính vì nó khắc nghiệt, khoảnh khắc cắm cờ trên đỉnh núi mới vinh quang tột cùng (**Thành quả**).\n\nKhi trình bày dự án khó, đừng giấu giếm rủi ro. Hãy nói: *'Con đường này đầy chông gai, sẽ có lỗi hệ thống, sẽ có sự phản đối. Nhưng nếu vượt qua, chúng ta sẽ kiến tạo lịch sử'*. Sự trung thực trần trụi tạo nên lòng tin vững chãi.",
    sections: [
      {
        title: 'Cung bậc Cảm xúc',
        items: [
          'Vấn đề: Một nơi tồi tệ, hiểm nguy rình rập hoặc tiềm năng bị kìm hãm.',
          'Thành công bước đầu: Người hùng nắm lấy cơ hội, ánh sáng hy vọng lóe lên.',
          'Thất bại: Điểm yếu nội tại hoặc thế lực thù địch khiến mọi thứ sụp đổ.',
          'Khủng hoảng: Đáy vực thẳm. Có lẽ Người hùng nên từ bỏ thì hơn?',
          'Phục hồi: Trong tuyệt vọng, Người hùng tìm thấy sức mạnh nội tâm.',
          'Miền đất hứa: Hiểm họa qua đi, tiềm năng bừng sáng.'
        ]
      }
    ]
  },
  {
    id: 'hero-and-guide',
    categoryId: 'character',
    title: 'Người Hùng & Người Dẫn đường',
    subtitle: 'Nâng bước thành công',
    description: 'Đừng tự nhận mình là nhân vật chính. Hãy để khách hàng tỏa sáng như một Người Hùng. Bạn chỉ là Người Dẫn đường thông thái đứng sau cánh gà.',
    storyExample: "Trong Batman:\n\n*   **Batman** là **Người Hùng** (Khách hàng của bạn).\n*   **Alfred** là **Người Dẫn đường** (Thương hiệu của bạn).\n\nAlfred không trực tiếp chiến đấu, nhưng Batman sẽ gục ngã nếu thiếu ông. Alfred cung cấp vũ khí, thông tin và lời khuyên.\n\nHãy định vị thương hiệu của bạn là Alfred tận tụy, và khách hàng là Batman dũng cảm. Đừng tranh làm Batman với họ.",
    sections: [
      {
        title: '1. Bản đồ hành trình Người Hùng',
        items: ['Họ đang đứng ở đâu?', 'Quái vật họ phải đối mặt là gì?', 'Đích đến mơ ước của họ là đâu?']
      },
      {
        title: '2. Vai trò của bạn',
        items: ['Bạn xuất hiện đúng lúc để dẫn lối.', 'Bạn là ai? Nhà thám hiểm, Kẻ nổi loạn, Hiền triết, hay Chiến binh bảo vệ?']
      },
      {
        title: '3. Kết hợp cấu trúc',
        items: ['Sử dụng "Vượt qua Nghịch cảnh" hoặc "Người trong Hố" để làm nền cho câu chuyện về Người Dẫn đường của bạn.']
      }
    ]
  },
  {
    id: 'whats-my-motivation',
    categoryId: 'character',
    title: 'Động lực thầm kín',
    subtitle: 'Đọc vị lòng người',
    description: 'Khách hàng sẽ phản ứng thế nào? Để biết câu trả lời, hãy tìm hiểu điều gì thực sự thôi thúc họ từ sâu bên trong.',
    storyExample: "Kẻ phản diện trong phim không bao giờ nghĩ mình xấu. Họ tin mình là anh hùng đang cứu thế giới theo cách riêng.\n\nKhi gặp khách hàng khó tính (**Phản diện**), hãy tự hỏi: *'Động lực ngầm của họ là gì?'*\n\n*   Họ sợ mất ngân sách? (**Nỗi sợ**)\n*   Họ muốn được sếp khen ngợi? (**Khao khát**)\n\nThấu hiểu động lực là chìa khóa để xoay chuyển tình thế.",
    sections: [
      {
        title: '1. Dàn diễn viên',
        items: ['Liệt kê những "diễn viên" chính trên sân khấu dự án của bạn.', 'Đó là khách hàng, người dùng cuối, hay các bên liên quan?']
      },
      {
        title: '2. Nhập vai (Method Acting)',
        items: ['Tôi là ai?', 'Tôi đang ở đâu, vào lúc nào?', 'Tôi khao khát điều gì?', 'Tại sao tôi muốn nó đến thế?', 'Tôi phải vượt qua chướng ngại nào?']
      },
      {
        title: '3. Mạng lưới quan hệ',
        items: ['Hợp tác: Tại sao người này lại giúp người kia?', 'Xung đột: Tại sao họ lại cản trở nhau?']
      }
    ]
  },
  {
    id: 'drive-stories',
    categoryId: 'character',
    title: 'Câu chuyện Động lực',
    subtitle: 'Thổi lửa cho đội ngũ',
    description: 'Tiền bạc là cần thiết, nhưng ý nghĩa mới là thứ giữ chân nhân tài. Hãy chia sẻ những câu chuyện khơi dậy niềm tự hào và mục đích làm việc.',
    storyExample: "Thay vì nói khô khan: *'Mục tiêu quý này là tăng trưởng 10%'*.\n\nHãy kể về **Mục đích (Purpose)**:\n\n*'Tuần trước, nhờ sản phẩm của chúng ta, một bệnh nhân ung thư đã tìm được bác sĩ kịp thời. Đó là lý do chúng ta thức dậy mỗi sáng và nỗ lực hết mình'.*\n\nCâu chuyện này chạm đến trái tim, mạnh mẽ hơn bất kỳ khoản tiền thưởng nào.",
    sections: [
      {
        title: 'a. Sự Tự chủ (Autonomy)',
        items: ['Cảm giác được làm chủ công việc của mình.', 'Tích cực: "Đó là lúc tôi cảm thấy mình được tin tưởng giao trọng trách..."', 'Tiêu cực: "Đó là lúc tôi cảm thấy bị kiểm soát từng chút một..."']
      },
      {
        title: 'b. Sự Tinh thông (Mastery)',
        items: ['Cảm giác bản thân ngày càng giỏi hơn.', 'Tích cực: "Tôi cảm thấy mình đã chinh phục được kỹ năng khó nhằn này..."', 'Tiêu cực: "Tôi thấy mình dậm chân tại chỗ, không học được gì mới..."']
      },
      {
        title: 'c. Mục đích cao cả (Purpose)',
        items: ['Cảm giác công việc mình làm có ý nghĩa với thế giới.', 'Tích cực: "Tôi thấy rõ công sức của mình giúp ích cho cộng đồng..."', 'Tiêu cực: "Tôi không hiểu mình làm việc này để làm gì..."']
      }
    ]
  },
  {
    id: 'story-listening',
    categoryId: 'explore',
    title: 'Nghệ thuật Lắng nghe',
    subtitle: 'Khai thác kho báu ẩn giấu',
    description: 'Đừng chỉ nói, hãy lắng nghe. Trí tuệ của tập thể nằm trong những câu chuyện họ kể, không phải trong các bảng khảo sát khô khan.',
    storyExample: "Bạn muốn cải thiện quy trình? Đừng gửi bảng câu hỏi trắc nghiệm.\n\nHãy mời nhân viên đi uống cà phê và hỏi: *'Kể cho tôi nghe về ngày làm việc tồi tệ nhất tuần qua của bạn?'*.\n\nHọ sẽ kể về cái máy in kẹt giấy, phần mềm chậm chạp, sếp mắng oan. Đó là những **Insight (Sự thật ngầm hiểu)** đắt giá mà không dữ liệu nào đo đếm được.",
    sections: [
      {
        title: 'Lần nghe 1: Ấn tượng khó phai',
        items: ['Tại sao câu chuyện này lại ám ảnh họ?', 'Cảm xúc chủ đạo là gì: Tức giận, thất vọng hay tự hào?']
      },
      {
        title: 'Lần nghe 2: Dòng thời gian',
        items: ['Họ đã cố làm gì?', 'Chuyện gì đã xảy ra cản trở họ?']
      },
      {
        title: 'Lần nghe 3: Ngã rẽ quyết định',
        items: ['Họ đã đứng trước những lựa chọn nào?', 'Nếu chọn khác đi thì sao?']
      },
      {
        title: 'Lần nghe 4: Góc nhìn chuyên gia',
        items: ['Người mới sẽ vấp ngã ở đâu?', 'Chuyên gia sẽ nhìn thấy điều gì mà người thường bỏ lỡ?']
      }
    ]
  },
  {
    id: 'social-proof',
    categoryId: 'explore',
    title: 'Bằng chứng Xã hội',
    subtitle: 'Mượn gió bẻ măng',
    description: 'Trong đám cháy, ta nhìn người khác để tìm lối thoát. Trong kinh doanh, khách hàng nhìn người khác để quyết định mua hàng.',
    storyExample: "Giữa một quán ăn vắng tanh và một quán đông nghịt, bạn chọn quán nào? Chắc chắn là quán đông.\n\nĐừng tự khen: *'Sản phẩm tôi tốt lắm'*.\n\nHãy nói: *'500 doanh nghiệp hàng đầu đang tin dùng chúng tôi'*.\n\nHoặc kể về một người nổi tiếng đã thành công nhờ bạn. Đó là sức mạnh của hiệu ứng đám đông.",
    sections: [
      {
        title: 'a. Xu hướng đám đông',
        items: ['Dữ liệu nào cho thấy "mọi người đều đang làm thế"?', 'Có ai là Người tiên phong (Early Adopter) đang dẫn đầu trào lưu không?']
      },
      {
        title: 'b. Nguyên mẫu thử nghiệm',
        items: ['Bạn đã thử nghiệm chưa?', 'Phản ứng thực tế của người dùng ra sao?']
      },
      {
        title: 'c. Lời vàng ý ngọc',
        items: ['Khách hàng yêu thích nhất điều gì?', 'Khoảnh khắc nào khiến họ tin rằng mình đã chọn đúng?', 'Họ sẽ nói gì để rủ bạn bè cùng tham gia?']
      }
    ]
  },
  {
    id: 'emotional-dashboard',
    categoryId: 'explore',
    title: 'La bàn Cảm xúc',
    subtitle: 'Chạm đến trái tim',
    description: 'Cảm xúc là ngôn ngữ chung của nhân loại. Hãy tìm những rung động mạnh mẽ nhất để kết nối với khán giả.',
    storyExample: "Nhớ lại lần đầu bạn bỏ bánh xe phụ khi tập xe đạp.\n\n1.  **Sợ hãi:** Tim đập thình thịch, tay run rẩy.\n2.  **Hào hứng:** Gió lùa qua tóc, cảm giác tự do ùa đến.\n3.  **Tự hào:** 'Mẹ ơi nhìn con này! Con làm được rồi!'\n\nKhi giới thiệu sản phẩm mới, hãy khơi gợi lại những cảm xúc nguyên sơ này: Nỗi sợ bị bỏ lại, sự phấn khích khi trải nghiệm công nghệ mới, và niềm kiêu hãnh của người tiên phong.",
    sections: [
      {
        title: '1. Gọi tên Cảm xúc',
        items: ['Tích cực: Hạnh phúc, Tự tin, Yêu thương, Hân hoan, Tin tưởng, Kiêu hãnh.', 'Tiêu cực: Sợ hãi, Nghi ngờ, Xấu hổ, Giận dữ, Chán chường, Bất an.']
      },
      {
        title: '2. Điền vào chỗ trống',
        items: ['"Tôi cảm thấy... [cảm xúc mạnh]"', '"Khoảnh khắc tôi nhận ra... [bước ngoặt]"', '"Vì tôi khao khát... [động lực]"', '"Nên tôi đã... [hành động]"']
      },
      {
        title: '3. Đặt mình vào vị trí Khách hàng',
        items: ['Họ đang cảm thấy gì?', 'Sản phẩm của bạn xoa dịu nỗi đau hay mang lại niềm vui nào cho họ?']
      }
    ]
  },
  {
    id: 'stories-that-lead',
    categoryId: 'recipe',
    title: 'Câu chuyện Lãnh đạo',
    subtitle: 'Dẫn lối tiên phong',
    description: 'Lãnh đạo không phải là ra lệnh. Lãnh đạo là kể một câu chuyện khiến mọi người muốn đi theo.',
    imageUrl: getCardImage('stories-that-lead', 'Leadership Stories', 'recipe'),
    recipeCardIds: ['man-in-hole', 'emotional-dashboard', 'story-bank'],
    storyExample: "JFK không ra lệnh: *'Hãy chế tạo tên lửa'*. Ông kể một câu chuyện vĩ đại:\n\n*'Chúng ta chọn đi lên mặt trăng... không phải vì nó dễ, mà vì nó khó.'*\n\nCâu chuyện về sự chinh phục, về giới hạn của con người đã đoàn kết cả một quốc gia. Hãy kể cho đội ngũ của bạn nghe về **Tại sao** chúng ta ở đây, chứ không chỉ là **Làm gì**.",
    sections: [
      {
        title: 'Nguyên liệu',
        items: ['Chuyện lạ (Curious Tales)', 'Vượt qua Nghịch cảnh (Man in a Hole)', 'La bàn Cảm xúc (Emotional Dashboard)', 'Thất bại đáng giá (Thoughtful Failures)', 'Ngân hàng câu chuyện (Story Bank)']
      },
      {
        title: 'Cách chế biến',
        items: ['Gắn kết đội ngũ bằng cách chia sẻ tầm nhìn về một tương lai tốt đẹp hơn và con đường chông gai chúng ta sẽ cùng nhau vượt qua.']
      }
    ]
  },
  {
    id: 'stories-that-sell',
    categoryId: 'recipe',
    title: 'Câu chuyện Bán hàng',
    subtitle: 'Trao giá trị, Nhận niềm tin',
    description: 'Đừng bán sản phẩm, hãy bán một phiên bản tốt đẹp hơn của chính khách hàng. Niềm tin là đơn vị tiền tệ đắt giá nhất.',
    imageUrl: getCardImage('stories-that-sell', 'Sales Stories', 'recipe'),
    recipeCardIds: ['audience-profile', 'social-proof', 'pitch-perfect'],
    storyExample: "Đừng bán cái máy khoan, hãy bán cái lỗ trên tường. Tốt hơn nữa, hãy bán **cảm giác ấm cúng** khi treo bức ảnh gia đình lên cái lỗ đó.\n\nKhách hàng không mua mũi khoan kim cương, họ mua sự tiện lợi và niềm vui trang hoàng tổ ấm.\n\nHãy kể về một người giống hệt họ, đã giải quyết được vấn đề đau đầu nhờ giải pháp của bạn.",
    sections: [
      {
        title: 'Nguyên liệu',
        items: ['Hồ sơ Khán giả (Audience Profile)', 'Câu chuyện bán hàng giản đơn', 'Bằng chứng xã hội (Social Proof)', 'Từ nghèo khó đến giàu sang (Rags to Riches)', 'Lời chào hàng hoàn hảo (Pitch Perfect)']
      },
      {
        title: 'Cách chế biến',
        items: ['Bán hàng không phải là cuộc chiến về giá hay tính năng. Đó là cuộc chiến giành lấy trái tim và lòng tin.']
      }
    ]
  },
  {
    id: 'stories-that-convince',
    categoryId: 'recipe',
    title: 'Câu chuyện Thuyết phục',
    subtitle: 'Chuyên gia lên tiếng',
    description: 'Làm sao để giải thích những điều phức tạp cho người ngoại đạo? Hãy biến kiến thức khô khan thành câu chuyện sống động.',
    imageUrl: getCardImage('stories-that-convince', 'Persuasion Stories', 'recipe'),
    recipeCardIds: ['three-is-the-magic-number', 'data-detective', 'hero-and-guide'],
    storyExample: "Bạn là bác sĩ. Bệnh nhân không hiểu thuật ngữ y khoa.\n\nĐừng nói: *'Thuốc này ức chế enzyme X để giảm viêm Y'*\n\nHãy nói: *'Tôi đã điều trị cho 100 người có triệu chứng y hệt bạn. 99 người trong số họ đã khỏe lại hoàn toàn sau 1 tuần uống thuốc này'.*\n\nSử dụng dữ liệu thực tế và kinh nghiệm (Uy tín) để xoa dịu nỗi sợ hãi của họ.",
    sections: [
      {
        title: 'Nguyên liệu',
        items: ['Phép màu số 3 (Three is the Magic Number)', 'Thật buồn cười (That\'s Funny)', 'Thám tử Số liệu (Data Detectives)', 'Tin tôi đi, tôi là chuyên gia', 'Người Hùng & Người Dẫn đường']
      },
      {
        title: 'Cách chế biến',
        items: ['Đừng để kiến thức uyên thâm trở thành rào cản. Hãy là người phiên dịch tài ba, chuyển hóa dữ liệu thành câu chuyện dễ hiểu.']
      }
    ]
  },
  {
    id: 'audience-profile',
    categoryId: 'organise',
    title: 'Hồ sơ Khán giả',
    subtitle: 'Kể câu chuyện đúng cách',
    description: 'Biết khán giả của bạn. Bạn không thể kể câu chuyện đúng nếu bạn không biết khán giả của mình cần gì.',
    storyExample: "Bạn không kể chuyện ma cho trẻ em 3 tuổi (**sai khán giả**).\n\nTương tự:\n*   Đừng kể chuyện về *'ROI và EBITDA'* cho đội ngũ thiết kế sáng tạo.\n*   Với Giám đốc tài chính, hãy kể chuyện về *'Tiết kiệm chi phí'*.\n*   Với Đội ngũ kỹ thuật, hãy kể chuyện về *'Công nghệ đột phá'*.\n\nCùng một dự án, nhưng mỗi khán giả cần nghe một phiên bản câu chuyện khác nhau phù hợp với mối quan tâm của họ.",
    sections: [
      {
        title: '1. Tạo hồ sơ',
        items: ['Thông tin cơ bản: tên, tuổi, giới tính, thu nhập, vai trò công việc.', 'Vấn đề: bạn sẽ giúp họ giải quyết điều gì?', 'Tích cực: hy vọng của họ là gì?', 'Tiêu cực: nỗi sợ hãi của họ là gì?']
      },
      {
        title: '2. Kết nối',
        items: ['Bạn có thể kết nối với khán giả của mình bằng cách kể một câu chuyện về một người khác giống họ không?']
      },
      {
        title: '3. Ai sẽ kể câu chuyện?',
        items: ['Bạn sẽ tin ai: ông chủ nói "sản phẩm của tôi rất tuyệt" hay khách hàng nói "sản phẩm này rất tuyệt"?']
      }
    ]
  },
  {
    id: 'big-small-inside-outside',
    categoryId: 'organise',
    title: 'Lớn, Nhỏ, Bên trong, Bên ngoài',
    subtitle: 'Kể đúng câu chuyện',
    description: 'Bạn có thể có một Câu chuyện Lớn để kể với thế giới. Nhưng bạn sẽ dành nhiều thời gian hơn để kể những câu chuyện nhỏ cho đồng nghiệp.',
    storyExample: "**Google** có một **Câu chuyện Lớn (Big Story)**: *'Tổ chức thông tin của thế giới'*.\n\nNhưng hàng ngày, các kỹ sư kể những **Câu chuyện Nhỏ (Small Stories)** về việc sửa lỗi code, cải thiện thuật toán.\n\nĐừng nhầm lẫn. Đừng dùng Câu chuyện Lớn để giải quyết vấn đề nhỏ hàng ngày, và đừng dùng Câu chuyện Nhỏ vụn vặt để định hướng chiến lược toàn công ty.",
    sections: [
      {
        title: 'Câu chuyện Nhỏ, Bên trong',
        items: ['Thói quen/Đào tạo: dùng Emotional Dashboard', 'Đánh giá: dùng Story Listening', 'Văn hóa: Thoughtful Failures']
      },
      {
        title: 'Câu chuyện Nhỏ, Bên ngoài',
        items: ['Blog/Mạng xã hội: What\'s It About?', 'Thương hiệu: Hero & Guide']
      },
      {
        title: 'Câu chuyện Lớn, Bên trong',
        items: ['Giới thiệu nhân viên mới: Drive Stories', 'Giải thưởng: Rolls Royce Moment']
      },
      {
        title: 'Câu chuyện Lớn, Bên ngoài',
        items: ['Chào hàng: Pitch Perfect', 'Tuyển dụng: Curious Tales', 'Hội nghị: Show & Tell']
      }
    ]
  },
  {
    id: 'universal-stories',
    categoryId: 'concept',
    title: 'Câu chuyện Phổ quát',
    subtitle: 'Tìm điểm chung',
    description: 'Xây dựng câu chuyện của bạn trên nền tảng vững chắc. Sử dụng các yếu tố mà mọi người sẽ nhận ra.',
    storyExample: "Dù bạn ở văn hóa nào, câu chuyện về **'David và Goliath'** (Kẻ yếu thắng kẻ mạnh) luôn gây xúc động.\n\nTại sao? Vì ai cũng từng cảm thấy mình nhỏ bé trước khó khăn lớn.\n\nKhi kể chuyện thương hiệu, hãy chạm vào những chủ đề phổ quát này:\n*   Tình mẫu tử\n*   Sự trưởng thành\n*   Cuộc chiến giữa Thiện và Ác\n\nNó sẽ giúp câu chuyện của bạn vượt qua rào cản ngôn ngữ và văn hóa.",
    sections: [
      {
        title: 'Các yếu tố',
        items: [
          'Tự do ý chí: chúng ta coi bản thân và người khác là những cá nhân có ý chí tự do, đưa ra những lựa chọn có chủ ý.',
          'Xung đột và Hợp tác: mọi người đều có khả năng làm cả hai. Chúng ta có thể chọn một trong hai.',
          'Sự không nhất quán: tất cả chúng ta đều có khoảng cách giữa những gì chúng ta làm, nói và nghĩ.',
          'Sợ hãi và Dũng cảm: tất cả chúng ta đều hiểu rằng nỗi sợ hãi có thể vượt qua.',
          'Đúng và Sai: chúng ta mong đợi sự công bằng.',
          'Nghi thức chuyển đổi: tất cả các nền văn hóa đều có các giai đoạn thời thơ ấu, thanh thiếu niên và trưởng thành.'
        ]
      }
    ]
  },
  {
    id: 'order-and-chaos',
    categoryId: 'concept',
    title: 'Trật tự & Hỗn loạn',
    subtitle: 'Làm rõ sứ mệnh của bạn',
    description: 'Cho thấy dự án của bạn có thể áp đặt trật tự lên một mớ hỗn độn như thế nào—hoặc phá vỡ một hệ thống quá cứng nhắc.',
    storyExample: "Thị trường taxi trước đây là một hệ thống cứng nhắc và trì trệ (**Trật tự cũ**).\n\n**Uber** xuất hiện như một sự **Hỗn loạn (Chaos)** phá vỡ quy tắc.\n\nNhưng với người dùng, Uber mang lại một **Trật tự mới (New Order)** tiện lợi hơn.\n\nCâu chuyện của bạn là gì? Bạn đang mang trật tự đến cho sự hỗn loạn (ví dụ: phần mềm quản lý công việc) hay mang sự phá cách đến cho sự nhàm chán (ví dụ: thời trang phá cách)?",
    sections: [
      {
        title: '1. Trật tự (Thế giới đã biết)',
        items: ['Mô tả khách hàng, sản phẩm hiện có, người dùng.', 'Điều gì tích cực? (tiện ích, khả năng dự đoán)', 'Điều gì tiêu cực? (nhàm chán, chưa hoàn thiện)']
      },
      {
        title: '2. Hỗn loạn (Thế giới chưa biết)',
        items: ['Mô tả đối thủ cạnh tranh, công nghệ thay đổi, Thiên tai.', 'Điều gì tiêu cực? (mối đe dọa và sự không thể đoán trước)', 'Điều gì tích cực? (tiềm năng đổi mới)']
      },
      {
        title: '3. Sự gián đoạn',
        items: ['Hỗn loạn phá vỡ Trật tự như thế nào?', 'Thông tin mới nào xuất hiện?']
      },
      {
        title: '4. Phản hồi',
        items: ['Bạn là Người hùng. Bạn phản ứng thế nào?', 'Bạn đang giúp áp đặt trật tự? Hay tiêm vào một sức sống mới cần thiết?']
      }
    ]
  },
  {
    id: 'three-is-the-magic-number',
    categoryId: 'style',
    title: 'Số 3 Kỳ diệu',
    subtitle: 'Giúp chúng tôi ghi nhớ',
    description: 'Chọn những phần quan trọng nhất trong câu chuyện của bạn, sau đó sử dụng những thủ thuật này để ghim chúng vào trí nhớ của khán giả.',
    storyExample: "Tại sao lại là *'Vàng, Hương, Mộc dược'*? Tại sao lại là *'Tự do, Bình đẳng, Bác ái'*? Tại sao Steve Jobs giới thiệu iPhone là *'iPod, Phone, Internet Communicator'*?\n\nBộ não con người yêu thích **số 3**. Nó vừa đủ để tạo ra một mẫu (pattern) nhưng không quá nhiều để gây rối.\n\nKhi liệt kê lợi ích sản phẩm, hãy chọn 3 ý chính nhất. Đừng chọn 2, đừng chọn 4. Hãy chọn 3.",
    sections: [
      {
        title: 'Số 3 Chú ý: James Bond',
        items: ['"Một lần là ngẫu nhiên. Hai lần là trùng hợp. Lần thứ ba là hành động của kẻ thù."']
      },
      {
        title: 'Số 3 Đảo ngược: Ba chú heo con',
        items: ['Rơm và gậy thì yếu. Nhưng một ngôi nhà làm bằng gạch? Mô hình này cung cấp cho bạn một thiết lập (1 và 2) theo sau là một sự đảo ngược (3).']
      },
      {
        title: 'Số 3 Vừa phải: Goldilocks',
        items: ['Quá nóng. Quá lạnh. Vừa phải. Thiết lập hai thái cực sau đó tìm điểm trung gian.']
      }
    ]
  },
  {
    id: 'leave-it-out',
    categoryId: 'style',
    title: 'Bỏ nó ra!',
    subtitle: 'Tạo một chút bí ẩn',
    description: 'Nói với chúng tôi rằng bạn đã bỏ sót điều gì đó và chúng tôi sẽ làm việc chăm chỉ để lấp đầy khoảng trống. Và sau đó chúng tôi cảm thấy như đó cũng là câu chuyện của mình.',
    storyExample: "Trong phim **Jaws (Hàm cá mập)**, con cá mập không xuất hiện rõ ràng trong suốt nửa đầu phim. Chúng ta chỉ thấy cái vây, hoặc mặt nước chuyển động.\n\nChính sự **'vắng mặt'** đó khiến nỗi sợ hãi tăng lên tột độ vì trí tưởng tượng của khán giả tự vẽ ra con quái vật đáng sợ nhất.\n\nTrong marketing, đừng nói hết mọi thứ. Hãy hé lộ một chút (**Teaser**) để khách hàng tò mò và tự điền vào chỗ trống.",
    sections: [
      {
        title: 'Con Rồng',
        items: ['Con rồng ở mặt trước của chiếc hộp này lớn đến mức nào? Rất lớn! Làm sao bạn biết, bạn không thể nhìn thấy nó? Đôi khi những gì chúng ta không nhìn thấy là phần hay nhất của câu chuyện.']
      },
      {
        title: 'Trí tưởng tượng',
        items: ['Phim kinh dị cho chúng ta một gợi ý về sự nguy hiểm, và chúng ta tưởng tượng phần còn lại.']
      },
      {
        title: 'Sáu từ',
        items: ['Ernest Hemmingway đã kể câu chuyện buồn nhất chỉ trong sáu từ: "Bán. Giày em bé. Chưa từng mang."']
      }
    ]
  },
  {
    id: 'show-and-tell',
    categoryId: 'style',
    title: 'Khoe & Kể',
    subtitle: 'Kiểm soát sự chú ý của chúng tôi',
    description: 'Giữ sự chú ý của mọi người vào bạn trong khi bạn thuyết trình. Làm cho Khoe (Show) và Kể (Tell) hoạt động cùng nhau.',
    storyExample: "Steve Jobs khi giới thiệu MacBook Air đã không nói thông số độ dày ngay.\n\nÔng ấy cầm một chiếc phong bì văn phòng bình thường (**Show**), và rút chiếc laptop ra từ đó (**Tell**).\n\nHình ảnh chiếc laptop nằm gọn trong phong bì mạnh mẽ hơn ngàn lời nói. Hãy dùng đạo cụ, hình ảnh minh họa để 'Show', và dùng lời nói để 'Tell' ý nghĩa của nó.",
    sections: [
      {
        title: 'Nhàm chán',
        items: ['Nếu kịch bản của bạn bám quá sát hình ảnh, chúng tôi sẽ chán.']
      },
      {
        title: 'Bối rối',
        items: ['Nếu kịch bản của bạn đi quá xa so với hình ảnh bạn đang hiển thị, chúng tôi sẽ bối rối.']
      },
      {
        title: 'Hấp dẫn',
        items: ['Cho chúng tôi xem một hình ảnh, nói cho chúng tôi biết nó là gì, sau đó bạn có thể kể cho chúng tôi những điều chúng tôi không thể nhìn thấy.']
      }
    ]
  },
  {
    id: 'icebreaker-stories',
    categoryId: 'function',
    title: 'Câu chuyện Phá băng',
    subtitle: 'Khởi động bằng những câu chuyện',
    description: 'Giúp đội ngũ của bạn suy nghĩ theo lối kể chuyện.',
    storyExample: "Trong buổi họp đầu tiên của dự án mới, không khí thường căng thẳng. Hãy phá băng bằng trò chơi *'Hai sự thật, một lời nói dối'*.\n\nHoặc đơn giản hơn, hãy hỏi: *'Món đồ đầu tiên bạn mua bằng tiền tự kiếm được là gì?'*.\n\nNhững câu chuyện nhỏ này giúp mọi người nhìn thấy con người thật của nhau, tạo sự kết nối trước khi bước vào công việc khô khan.",
    sections: [
      {
        title: 'a. Câu chuyện Ảnh',
        items: ['Sắp xếp nhiều hình ảnh ngẫu nhiên. Chọn ba. Sắp xếp chúng thành một cấu trúc câu chuyện đơn giản: Trước, Trong, Sau.']
      },
      {
        title: 'b. Yêu và Ghét',
        items: ['Chia nhóm thành hai. Đưa cho mỗi nhóm cùng một bức ảnh (ví dụ: một hòn đá).', 'Nhóm 1: "Bạn yêu hòn đá này." Nhóm 2: "Bạn ghét hòn đá này."', 'Bịa ra một câu chuyện giải thích tại sao.']
      }
    ]
  },
  {
    id: 'story-ish-conversations',
    categoryId: 'function',
    title: 'Trò chuyện kiểu Kể chuyện',
    subtitle: 'Khám phá những hiểu biết ẩn giấu',
    description: 'Tìm những hiểu biết ẩn sâu bên dưới những cuộc trò chuyện hàng ngày với đồng nghiệp, khách hàng hoặc người dùng của bạn.',
    storyExample: "Khi phỏng vấn người dùng, đừng hỏi *'Bạn có thích tính năng này không?'* (Câu hỏi đóng).\n\nHãy hỏi *'Kể cho tôi nghe lần cuối cùng bạn gặp khó khăn khi thanh toán online?'*.\n\nHọ sẽ kể cho bạn một câu chuyện về sự bực bội, về việc thẻ bị từ chối, về việc phải nhập lại thông tin 3 lần. Đó là nơi bạn tìm thấy vấn đề thực sự cần giải quyết.",
    sections: [
      {
        title: 'Câu hỏi',
        items: [
          'Tìm khoảnh khắc sống động: "Đó là một ý tưởng thú vị, nó trông như thế nào trong thực tế?"',
          'Cụ thể hóa: "Bạn đã ở đâu khi điều này xảy ra?"',
          'Tìm cảm xúc: "Cảm giác mạnh mẽ nhất mà bạn nhớ từ lúc đó là gì?"',
          'Tìm xung đột: "Bạn cần phải giành được sự ủng hộ của ai?"',
          'Thay đổi: "Điều gì đã xảy ra buộc bạn phải thay đổi?"'
        ]
      }
    ]
  },
  {
    id: 'pitch-perfect',
    categoryId: 'function',
    title: 'Lời chào hàng Hoàn hảo',
    subtitle: 'Bán ý tưởng của bạn',
    description: 'Thuyết phục tôi ủng hộ ý tưởng của bạn. Cho tôi thấy: bạn có những gì tôi cần? Và tại sao tôi nên tin tưởng bạn sẽ thực hiện được?',
    storyExample: "Bạn đang trong thang máy với CEO. Bạn có 30 giây. Đừng nói về quy trình kỹ thuật. Hãy dùng cấu trúc **POPP**:\n\n1.  **Problem (Vấn đề):** 'Sếp biết đấy, chúng ta đang mất 20% khách hàng vì web chậm'.\n2.  **Opportunity (Cơ hội):** 'Nếu chúng ta nâng cấp server ngay bây giờ...'\n3.  **Practical Steps (Các bước):** '...chúng ta chỉ cần 2 tuần và 5000$'.\n4.  **Promise (Lời hứa):** 'Em cam kết doanh thu sẽ tăng lại 15% trong tháng tới'.\n\nNgắn gọn, súc tích và đi thẳng vào vấn đề.",
    sections: [
      {
        title: '1. Phiên bản tóm tắt',
        items: ['Viết một phiên bản tóm tắt ý tưởng của bạn. (Sử dụng "Nó nói về cái gì?")']
      },
      {
        title: '2. POPP',
        items: ['Vấn đề (Problem), Cơ hội (Opportunity), Các bước thực tế (Practical Steps), Lời hứa (Promise). Thiết lập lời chào hàng của bạn giống như một cung chuyện.']
      },
      {
        title: '3. Hình ảnh',
        items: ['Sử dụng Show & Tell nếu bạn cần tạo tài liệu chào hàng trực quan.']
      }
    ]
  },
  {
    id: 'data-detective',
    categoryId: 'explore',
    title: 'Thám tử Dữ liệu',
    subtitle: 'Tìm câu chuyện trong những con số',
    description: 'Đừng chỉ đưa ra một bảng tính. Hãy tìm câu chuyện con người ẩn sau dữ liệu để làm cho nó có ý nghĩa.',
    storyExample: "Hãy tưởng tượng bạn là Sherlock Holmes, và dữ liệu là hiện trường vụ án. Đừng chỉ nhìn vào con số tổng thể.\n\n1.  **Tìm kiếm sự bất thường (Outlier):** Tại sao doanh số bán hàng lại tăng đột biến vào ngày thứ Ba mưa gió?\n2.  **Manh mối:** Có thể đó là ngày mọi người ở nhà và đặt hàng online nhiều hơn.\n3.  **Xu hướng (Trend):** Khách hàng cần sự tiện lợi khi thời tiết xấu.\n4.  **Yếu tố con người (Human Factor):** Đó là câu chuyện về sự thoải mái trong ngày mưa.",
    sections: [
      {
        title: '1. Điểm ngoại lai (The Outlier)',
        items: ['Điều gì nổi bật so với phần còn lại?', 'Tại sao nó lại khác biệt?', 'Đó là một sự bất thường tốt hay xấu?']
      },
      {
        title: '2. Xu hướng (The Trend)',
        items: ['Các con số đang đi về đâu?', 'Đó là một sự leo thang dốc đứng hay sự suy giảm chậm chạp?', 'Điều gì xảy ra nếu chúng ta không làm gì cả?']
      },
      {
        title: '3. Yếu tố con người',
        items: ['Ai bị ảnh hưởng bởi những con số này?', 'Dữ liệu này có ý nghĩa gì đối với một người dùng đơn lẻ?', 'Hãy gán một gương mặt cho số liệu thống kê.']
      }
    ]
  },
  {
    id: 'the-hero',
    categoryId: 'character',
    title: 'Người Hùng',
    subtitle: 'Khiến khán giả quan tâm',
    description: 'Mọi câu chuyện đều cần một ai đó để ủng hộ. Thông thường, đó không phải là bạn—mà là người dùng hoặc khách hàng của bạn.',
    storyExample: "Hãy nghĩ về Luke Skywalker trong Star Wars.\n\n*   **Luke** là **Người dùng của bạn** (Chàng trai nông dân bình thường).\n*   **Đế chế** là **Vấn đề** (Mối đe dọa).\n*   **Yoda/Obi-Wan** là **Bạn/Sản phẩm của bạn** (Người hướng dẫn).\n\nBạn trao cho anh ta thanh gươm ánh sáng (Công cụ) và dạy anh ta cách sử dụng Thần lực (Kiến thức). Cuối cùng, anh ta là người tiêu diệt Death Star, không phải Obi-Wan.\n\nHãy để khách hàng của bạn là Luke, còn bạn là Yoda.",
    sections: [
      {
        title: '1. Ai là Người Hùng?',
        items: ['Thường là khán giả của bạn, không phải bạn.', 'Họ như thế nào?', 'Tại sao chúng ta nên quan tâm đến họ?']
      },
      {
        title: '2. Mục tiêu',
        items: ['Họ muốn gì hơn bất cứ thứ gì?', 'Tại sao điều đó lại quan trọng với họ?', 'Điều gì xảy ra nếu họ thất bại?']
      },
      {
        title: '3. Khiếm khuyết',
        items: ['Điều gì đang kìm hãm họ?', 'Đó là nỗi sợ hãi bên trong hay sự thiếu hụt nguồn lực bên ngoài?', 'Bạn có thể giúp họ vượt qua nó như thế nào?']
      }
    ]
  },
  {
    id: 'whats-it-about',
    categoryId: 'function',
    title: "Nó nói về cái gì?",
    subtitle: 'Bài thuyết trình thang máy (Elevator pitch)',
    description: 'Tóm tắt câu chuyện của bạn trong một câu duy nhất để đảm bảo sự rõ ràng và tập trung.',
    storyExample: "Hãy thử tóm tắt bộ phim **'Đi tìm Nemo'**:\n\n*   **Ai đó (Somebody):** Một chú cá hề nhút nhát...\n*   **Muốn (Wanted):** ...muốn tìm lại đứa con trai bị bắt cóc...\n*   **Nhưng (But):** ...nhưng đại dương đầy rẫy nguy hiểm...\n*   **Vì vậy (So):** ...vì vậy chú phải vượt qua nỗi sợ hãi và kết bạn với những người lạ.\n\nĐây là công thức đơn giản nhưng cực kỳ hiệu quả để tóm tắt bất kỳ ý tưởng nào.",
    sections: [
      {
        title: 'Công thức',
        items: ['Ai đó...', 'Muốn...', 'Nhưng...', 'Vì vậy...']
      },
      {
        title: 'Ví dụ',
        items: ['(Ai đó) Một chàng trai nông dân trẻ', '(Muốn) muốn cứu công chúa', '(Nhưng) nhưng cô ấy bị Đế chế giam giữ', '(Vì vậy) vì vậy anh ấy đã tham gia quân nổi dậy.']
      }
    ]
  },
  {
    id: 'man-in-hole',
    categoryId: 'structure',
    title: 'Người trong Hố',
    subtitle: 'Đưa họ thoát khỏi rắc rối',
    description: 'Một nhân vật gặp rắc rối, sau đó thoát khỏi nó. Đơn giản, cổ điển và hiệu quả cho các câu chuyện giải quyết vấn đề.',
    storyExample: "1.  **Vùng an toàn:** Một người đàn ông đang đi dạo vui vẻ.\n2.  **Cú ngã (Vấn đề):** Đột nhiên, anh ta rơi xuống một cái hố sâu.\n3.  **Leo lên (Giải pháp):** Anh ta tìm thấy một cái thang (**Giải pháp của bạn**). Anh ta leo lên, thoát khỏi cái hố.\n4.  **Trạng thái mới:** Anh ta tiếp tục cuộc hành trình, nhưng giờ đây anh ta đã cẩn thận hơn và biết ơn cái thang.\n\nĐó là cấu trúc của mọi câu chuyện quảng cáo thành công.",
    sections: [
      {
        title: '1. Vùng an toàn',
        items: ['Mọi thứ đều ổn, nhưng có lẽ hơi trì trệ.', 'Thiết lập mức cơ bản.']
      },
      {
        title: '2. Cú ngã (Vấn đề)',
        items: ['Có điều gì đó không ổn.', 'Tình hình xấu đi.', 'Điều này tạo ra sự căng thẳng và nhu cầu về một giải pháp.']
      },
      {
        title: '3. Leo lên (Giải pháp)',
        items: ['Sự chăm chỉ và khéo léo được áp dụng.', 'Sản phẩm/dịch vụ của bạn phát huy tác dụng.', 'Tình hình được cải thiện.']
      },
      {
        title: '4. Trạng thái bình thường mới',
        items: ['Mọi thứ tốt hơn trước đây.', 'Bài học đã được rút ra.']
      }
    ]
  },
  {
    id: 'simple-sticky',
    categoryId: 'style',
    title: 'Đơn giản & Dễ nhớ',
    subtitle: 'Cắt bỏ thuật ngữ chuyên môn',
    description: 'Nếu một đứa trẻ sáu tuổi không thể hiểu nó, bạn chưa hiểu nó đủ rõ. Hãy làm cho ý tưởng của bạn trở nên dễ nhớ.',
    storyExample: "Tại sao câu chuyện **'Cô bé quàng khăn đỏ'** lại tồn tại hàng trăm năm?\n\nVì nó **Đơn giản** (Cô bé, Bà, Chó sói) và **Dính** (Hình ảnh cái miệng to, cái tai to).\n\nĐừng nói: *'Chúng tôi tối ưu hóa giải pháp dinh dưỡng cho người cao tuổi'*.\n\nHãy nói: *'Chúng tôi giúp bà của bạn ăn ngon miệng hơn'*.",
    sections: [
      {
        title: '1. Bài kiểm tra Bà ngoại',
        items: ['Bạn có thể giải thích điều này cho bà của mình không?', 'Nếu không, hãy đơn giản hóa nó.']
      },
      {
        title: '2. Cụ thể vs Trừu tượng',
        items: ['Đừng nói "tối ưu hóa sự hợp lực".', 'Hãy nói "làm việc cùng nhau tốt hơn".', 'Sử dụng ngôn ngữ vật lý, cảm giác.']
      },
      {
        title: '3. Thông điệp cốt lõi',
        items: ['Loại bỏ mọi thứ không cần thiết.', 'Điều duy nhất bạn muốn họ nhớ là gì?']
      }
    ]
  },
  {
    id: 'story-bank',
    categoryId: 'organise',
    title: 'Ngân hàng Câu chuyện',
    subtitle: 'Để dành cho ngày mưa',
    description: 'Đừng để những giai thoại hay biến mất. Hãy thu thập chúng một cách có hệ thống để bạn luôn có sẵn một câu chuyện.',
    storyExample: "Hãy tưởng tượng bạn là một đầu bếp. Bạn không đi chợ mỗi khi khách gọi món. Bạn có một kho nguyên liệu sẵn sàng (**Ngân hàng câu chuyện**).\n\nKhi cần nấu món *'Thuyết phục khách hàng khó tính'*, bạn mở kho ra và lấy câu chuyện về *'Lần thất bại thảm hại nhưng học được bài học lớn'*.\n\nĐừng đợi đến lúc cần mới đi tìm, hãy tích lũy mỗi ngày.",
    sections: [
      {
        title: '1. Thu thập',
        items: ['Khi có điều gì thú vị xảy ra, hãy viết nó xuống.', 'Khách hàng có nói điều gì hài hước không?', 'Dự án có thất bại thảm hại không?']
      },
      {
        title: '2. Gắn thẻ',
        items: ['Gắn thẻ theo cảm xúc (hài hước, buồn, truyền cảm hứng).', 'Gắn thẻ theo chủ đề (lãnh đạo, thất bại, đổi mới).']
      },
      {
        title: '3. Truy xuất',
        items: ['Trước một bài thuyết trình, hãy kiểm tra ngân hàng của bạn.', 'Tìm một câu chuyện phù hợp với quan điểm của bạn.']
      }
    ]
  },
  {
    id: 'the-pitch',
    categoryId: 'recipe',
    title: 'Bài thuyết trình (The Pitch)',
    subtitle: 'Giành được hợp đồng',
    description: 'Sự kết hợp của các thẻ để bán một ý tưởng một cách hiệu quả.',
    imageUrl: getCardImage('the-pitch', 'The Pitch Presentation', 'recipe'),
    recipeCardIds: ['dragon-city', 'the-hero', 'happy-ever-afters'],
    storyExample: "Bạn đang đứng trước nhà đầu tư. Đừng bắt đầu bằng slide PowerPoint chán ngắt.\n\n1.  **Rồng & Thành phố:** Nêu bật vấn đề cấp bách.\n2.  **Người Hùng:** Giới thiệu khách hàng đang gặp khó khăn.\n3.  **Thế giới Tốt đẹp hơn:** Trình bày giải pháp của bạn như một kết quả tất yếu.\n\nĐó là công thức của một bài Pitch thành công.",
    sections: [
      {
        title: 'Thành phần',
        items: ['Rồng & Thành phố (Để đặt ra các rủi ro)', 'Người Hùng (Để cho thấy ai được hưởng lợi)', 'Thế giới Tốt đẹp hơn (Để cho thấy kết quả)']
      },
      {
        title: 'Phương pháp',
        items: ['Bắt đầu với vấn đề (Rồng).', 'Giới thiệu người dùng (Người Hùng).', 'Cho thấy giải pháp của bạn dẫn đến một Thế giới Tốt đẹp hơn như thế nào.']
      }
    ]
  }
];

export const getCategories = (lang: 'en' | 'vi') => lang === 'vi' ? categoriesVi : categoriesEn;
export const getInitialCards = (lang: 'en' | 'vi') => {
  const cards = lang === 'vi' ? initialCardsVi : initialCardsEn;
  return cards.map(card => ({
    ...card,
    imageUrl: card.imageUrl || getCardImage(card.id, card.id.replace(/-/g, ' '), card.categoryId)
  }));
};

