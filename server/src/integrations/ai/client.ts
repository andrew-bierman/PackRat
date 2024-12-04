import { Ai } from '@cloudflare/ai';

class AiClient {
  private static _instance: AiClient | null = null;
  private readonly apiKey: string;
  private readonly accountId: string;
  private readonly MODEL_NAME: string = '@cf/baai/bge-base-en-v1.5';
  private readonly EXECUTE_AI_MODEL_URL: string;

  private constructor(apiKey: string, accountId: string) {
    this.apiKey = apiKey;
    this.accountId = accountId;
    this.EXECUTE_AI_MODEL_URL = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${this.MODEL_NAME}`;
  }

  public static get instance(): AiClient {
    if (!AiClient._instance) {
      throw new Error('AiClient instance not initialized.');
    }
    return AiClient._instance;
  }

  public static async init({
    apiKey,
    accountId,
  }: {
    apiKey: string;
    accountId: string;
  }): Promise<void> {
    if (!AiClient._instance) {
      AiClient._instance = new AiClient(apiKey, accountId);
    }
  }

  public async run(text: string | string[]) {
    const response = await fetch(this.EXECUTE_AI_MODEL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to get embedding: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }

  /**
   * Transform a list of given text into a list of compact vectors.
   * @param {string[]} contentList - List of text to transform.
   * @returns {Promise<number[][]>} - List of compact vectors.
   */
  public static async getEmbeddingBash<T = number[]>(
    contentList: string[],
    transform: (embedding: number[], index: number) => T,
  ): Promise<T[]> {
    const MAX_BATCH_SIZE = 100; // REF: https://developers.cloudflare.com/workers-ai/models/bge-base-en-v1.5/
    const MAX_ROUND = Math.ceil(contentList.length / MAX_BATCH_SIZE);

    const result: T[] = [];

    for (let round = 0; round < MAX_ROUND; round++) {
      const batch = contentList.slice(
        round * MAX_BATCH_SIZE,
        (round + 1) * MAX_BATCH_SIZE,
      );

      const {
        result: { data },
      } = await AiClient.instance.run(batch);

      // Flatten the result
      for (let idx = 0; idx < batch.length; idx++) {
        const embedding = data[idx];
        result.push(transform(embedding, round * MAX_BATCH_SIZE + idx));
      }
    }

    return result;
  }

  public static async getEmbedding(content: string): Promise<number[]> {
    const {
      result: { data },
    } = await AiClient.instance.run(content);
    return data[0];
  }

  // Commented out using AI client and temporalily use REST API instead
  // public static async init(cfAi): Promise<void> {
  //   if (!AiClient._instance) {
  //     AiClient._instance = new Ai(cfAi);
  //   }
  // }

  // public static async getEmbedding(content: string): Promise<number[]> {
  //   const { data } = await AiClient.instance.run('@cf/baai/bge-base-en-v1.5', { text: [content] });
  //   return data[0];
  // }
}

export { AiClient };

export interface Env {
  AI: any;
}
