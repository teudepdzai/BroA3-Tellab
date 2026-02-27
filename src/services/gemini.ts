import { GoogleGenAI, SchemaType } from "@google/genai";
import { TacticCard } from "../data";

// Initialize the Gemini API client
// The API key is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface FeedbackCriterion {
  name: string;
  score: number; // 0-10
  summary: string;
  details: string;
}

export interface FeedbackResponse {
  score: number;
  scoreColor: 'gray' | 'yellow' | 'green' | 'dark-green';
  scoreReason: string;
  criteria: FeedbackCriterion[];
}

export async function getStoryFeedback(storyContent: string, card: TacticCard): Promise<FeedbackResponse> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API Key is missing. Please configure it in your environment.");
  }

  const systemInstruction = `Bạn là một chuyên gia Storytelling Coach chuyên nghiệp. Nhiệm vụ của bạn là đánh giá câu chuyện của người dùng dựa trên "Thẻ Chiến thuật" (Tactic Card) họ đang sử dụng.

Hãy đánh giá khắt khe và công tâm trên thang điểm 10 dựa trên 4 tiêu chí sau:
1. **Độ rõ ràng:** Thông điệp có dễ hiểu không?
2. **Độ hấp dẫn:** Câu chuyện có thu hút người đọc không?
3. **Sự phù hợp:** Câu chuyện có bám sát hướng dẫn của thẻ không?
4. **Cảm xúc:** Câu chuyện có khơi gợi được cảm xúc không?

**Quy định về điểm số và màu sắc:**
- **0-4 điểm (gray):** Chưa đạt.
- **5-6 điểm (yellow):** Tạm ổn.
- **7-8 điểm (green):** Tốt.
- **9-10 điểm (dark-green):** Xuất sắc.

**Yêu cầu đầu ra:**
Trả về kết quả dưới dạng JSON thuần túy (không dùng markdown code block) với cấu trúc:
{
  "score": (số nguyên từ 0-10, điểm trung bình làm tròn),
  "scoreColor": (chọn một trong: "gray", "yellow", "green", "dark-green"),
  "scoreReason": (giải thích ngắn gọn tổng quan, khoảng 1-2 câu),
  "criteria": [
    {
      "name": "Độ rõ ràng",
      "score": (0-10),
      "summary": (nhận xét ngắn gọn súc tích, 1 câu),
      "details": (phân tích chi tiết, gợi ý cải thiện cụ thể, định dạng Markdown)
    },
    ... (lặp lại cho 3 tiêu chí còn lại)
  ]
}

Hãy trả lời bằng Tiếng Việt. Giọng văn chuyên nghiệp, chân thành và mang tính xây dựng.`;

  const prompt = `
Bối cảnh: Người dùng đang sử dụng thẻ Story Tactic: "${card.title}" (${card.subtitle}).
Mô tả thẻ: ${card.description}

Các gợi ý chính của thẻ:
${card.sections.map(s => `- ${s.title}: ${s.items.join(', ')}`).join('\n')}

Nội dung câu chuyện của người dùng:
"""
${storyContent}
"""

Hãy đánh giá câu chuyện này.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
      }
    });

    let responseText = response.text;
    if (!responseText) {
      throw new Error("Empty response from Gemini");
    }

    // Clean up potential markdown code blocks if the model ignores the instruction
    responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();

    try {
      const parsedResponse = JSON.parse(responseText) as FeedbackResponse;
      return parsedResponse;
    } catch (e) {
      console.error("Failed to parse JSON response:", responseText);
      // Fallback if JSON parsing fails
      return {
        score: 0,
        scoreColor: 'gray',
        scoreReason: "Không thể phân tích phản hồi từ AI.",
        criteria: [
          {
            name: "Lỗi hệ thống",
            score: 0,
            summary: "Đã xảy ra lỗi khi xử lý dữ liệu.",
            details: `Nội dung thô từ AI: \n\n${responseText}`
          }
        ]
      };
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Không thể lấy phản hồi từ Gemini.");
  }
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function chatWithAI(
  history: ChatMessage[], 
  message: string, 
  card: TacticCard, 
  currentContent: string
): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Gemini API Key is missing.");
  }

  const systemInstruction = `Bạn là một Mentor (Người hướng dẫn) về Kể chuyện (Storytelling). 
Nhiệm vụ của bạn là giúp người dùng cải thiện kỹ năng kể chuyện dựa trên thẻ chiến thuật "${card.title}".

QUY TẮC TUYỆT ĐỐI QUAN TRỌNG:
1. KHÔNG BAO GIỜ viết hộ người dùng cả bài văn hay câu chuyện hoàn chỉnh.
2. Nếu người dùng yêu cầu viết bài, hãy từ chối lịch sự và đề nghị cung cấp dàn ý, câu hỏi gợi mở, hoặc ví dụ ngắn gọn.
3. Chỉ đưa ra gợi ý, hướng dẫn, sửa lỗi, hoặc đặt câu hỏi để người dùng tự tư duy.
4. Luôn bám sát nội dung và mục tiêu của thẻ "${card.title}".
5. Trả lời ngắn gọn, súc tích, mang tính khích lệ.
6. Ngôn ngữ: Tiếng Việt.

Thông tin thẻ:
- Mô tả: ${card.description}
- Gợi ý: ${card.sections.map(s => s.title + ": " + s.items.join(', ')).join('; ')}

Nội dung hiện tại của người dùng (để tham khảo):
"""
${currentContent}
"""`;

  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemInstruction,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text || "Xin lỗi, tôi không thể trả lời lúc này.";
  } catch (error) {
    console.error("Error in chatWithAI:", error);
    return "Đã xảy ra lỗi khi kết nối với AI.";
  }
}
