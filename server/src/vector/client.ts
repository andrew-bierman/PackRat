import { AiClient } from '../integrations/ai/client';

class VectorClient {
  private static _instance: VectorClient | null = null;
  private apiKey: string;
  private indexName: string;
  private accountId: string;

  private constructor(apiKey: string, indexName: string, accountId: string) {
    this.apiKey = apiKey;
    this.indexName = indexName;
    this.accountId = accountId;
  }

  public static get instance(): VectorClient {
    if (!VectorClient._instance) {
      throw new Error('VectorClient instance not initialized.');
    }
    return VectorClient._instance;
  }

  public static async init({
    apiKey,
    indexName,
    accountId,
  }: {
    apiKey: string;
    indexName: string;
    accountId: string;
  }): Promise<void> {
    if (!VectorClient._instance) {
      VectorClient._instance = new VectorClient(apiKey, indexName, accountId);
    }
  }

  // Commented out the original logic
  // public async insert(id: string, values: number[]) {
  //   return await this.instance.upsert([{ id, values }]);
  // }

  // New API-based insert method
  public async insert(id: string, values: number[], namespace: string) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/vectorize/indexes/${this.indexName}/insert`;
    const ndjsonBody = `${JSON.stringify({ id, values, namespace })}\n`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/x-ndjson',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: ndjsonBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to insert vector: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }


  // Commented out the original logic
  // public async search(queryEmbedding: number[]) {
  //   return await this.instance.query(queryEmbedding, { topK: 5 });
  // }

  // New API-based search method
  public async search(queryEmbedding: number[], namespace: string) {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/vectorize/indexes/${this.indexName}/vectors/query`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        queries: [{ values: queryEmbedding, topK: 5, namespace }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to search vectors: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }

  public async syncRecord({ id, content, namespace }: { id: string; content: string, namespace: string }) {
    const values = await AiClient.getEmbedding(content);
    await this.insert(id, values, namespace);
  }
}

export { VectorClient };

export interface Env {
  VECTORIZE_API_KEY: string;
  VECTORIZE_INDEX_NAME: string;
  ACCOUNT_ID: string;
}
