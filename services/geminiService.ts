
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-flash-preview';

export class GeminiBotanyService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askBotanist(query: string) {
    const response = await this.ai.models.generateContent({
      model: MODEL_NAME,
      contents: query,
      config: {
        systemInstruction: "你是一位资深的植物学教授，专门为园艺专业的学生解答问题。请使用专业但易懂的中文回答，适时使用比喻，并强调解剖结构和分类学特征。"
      }
    });
    return response.text;
  }

  async generateMysterySpecimen() {
    const prompt = `
      请生成一段关于一个随机植物标本的详细形态描述。
      描述应包含：根、茎、叶、花（或孢子囊）的特征。
      不要直接说出植物的名字或分类。
      描述必须符合以下四类之一的典型特征：苔藓植物、蕨类植物、裸子植物、被子植物。
      请以 JSON 格式返回，格式为：{"description": "...", "answer": "bryo|pter|gymno|angio", "name": "植物名字(用于解析显示)"}
    `;

    const response = await this.ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });
    
    return JSON.parse(response.text);
  }

  async diagnosePlantProblem(problemDesc: string) {
     const prompt = `
      学生提交了一个植物健康问题： "${problemDesc}"
      请作为植物医生进行诊断。
      请按以下结构回答：
      1. 可能的诊断 (例如：缺氮、红蜘蛛感染、根腐病)
      2. 典型的解剖或生理症状解释
      3. 园艺建议
    `;
    const response = await this.ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text;
  }
}

export const botanyAI = new GeminiBotanyService();
