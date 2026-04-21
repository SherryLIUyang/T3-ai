import {GoogleGenAI} from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

const SYSTEM_PROMPT = `你是“领航员”应用的 AI 出行助手。
你的目标是帮助用户解决出行相关问题，包括：
1. 查询打车费用细节（如价格变动原因）。
2. 提供路线建议。
3. 推荐附近的餐厅或景点。
4. 处理账单相关的疑问。

Sarah 是你的主要用户。保持专业、亲切且高效。回答要简洁，符合移动端阅读习惯。`;

export async function chatWithAI(message: string, history: {role: 'user' | 'model', parts: [{text: string}]}[] = []) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history,
        {role: 'user', parts: [{text: message}]}
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    return response.text || "抱歉，我现在无法回答。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "连接 AI 助手时出错，请稍后再试。";
  }
}
