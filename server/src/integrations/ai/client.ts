import { Ai } from "@cloudflare/ai";

class AiClient {
  private static _instance: Ai | null = null;
  private constructor() {}

  public static get instance(): Ai {
    if (!AiClient._instance) {
      throw new Error('AiClient instance not initialized.');
    }
    return AiClient._instance;
  }

  public static async init(env: any): Promise<void> {
    if (!AiClient._instance) {
      AiClient._instance = new Ai(env.AI);
    }
  }

  public static async getEmbedding(content: string): Promise<number[]> {
    const { data } = await AiClient.instance.run('@cf/baai/bge-base-en-v1.5', { text: [content] });
    return data[0];
  }
}

export { AiClient };

export interface Env {
  AI: any;
}
