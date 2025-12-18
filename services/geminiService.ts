
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export class GeminiBotanyService {
  /**
   * 获取 AI 实例的辅助方法
   * 确保始终从当前环境变量中读取最新的 API KEY
   */
  private getAI() {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("未检测到 API_KEY，请确保在 Vercel 环境变量中已正确配置。");
      // 注意：这里不要在前端泄露密钥，仅作逻辑检查
      throw new Error("实验室连接配置缺失");
    }
    return new GoogleGenAI({ apiKey });
  }

  async askBotanist(query: string) {
    try {
      const ai = this.getAI();
      const response = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: query,
        config: {
          systemInstruction: "你是一位资深的植物学教授，专门为园艺专业的学生解答问题。请使用专业但易懂的中文回答，适时使用比喻，并强调解剖结构和分类学特征。"
        }
      });
      return response.text;
    } catch (error) {
      console.error("AI 响应错误:", error);
      return "实验室通讯中断，请检查 API 配置。";
    }
  }

  async generateMysterySpecimen() {
    const ai = this.getAI();
    const prompt = `
      请生成一段关于一个随机植物标本的详细形态描述。
      描述应包含：根、茎、叶、花（或孢子囊）的特征。
      不要直接说出植物的名字或分类。
      描述必须符合以下四类之一的典型特征：苔藓植物、蕨类植物、裸子植物、被子植物。
      请以 JSON 格式返回，格式为：{"description": "...", "answer": "bryo|pter|gymno|angio", "name": "植物名字(用于解析显示)"}
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return JSON.parse(response.text);
  }

  async diagnosePlantProblem(problemDesc: string) {
    const ai = this.getAI();
    const prompt = `
      学生提交了一个植物健康问题： "${problemDesc}"
      请作为植物医生进行诊断。
      请按以下结构回答：
      1. 可能的诊断 (例如：缺氮、红蜘蛛感染、根腐病)
      2. 典型的解剖或生理症状解释
      3. 园艺建议
    `;
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text;
  }
}

export const botanyAI = new GeminiBotanyService();
