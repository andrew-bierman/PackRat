import { AiClient } from '../integrations/ai/client';

interface VectorsQueryResponse {
  result: {
    count: number;
    matches: Array<{ id: string; namespace: string; score: number }>;
  };
  result_info: string | null;
  success: boolean;
  errors: Array<{ code: number; message: string }>;
  messages: Array<{ code: number; message: string }>;
}

class VectorClient {
  private static _instance: VectorClient | null = null;
  private readonly apiKey: string;
  private readonly indexName: string;
  private readonly accountId: string;
  private readonly VECTORIZE_INDEX_URL: string;

  private constructor(apiKey: string, indexName: string, accountId: string) {
    this.apiKey = apiKey;
    this.indexName = indexName;
    this.accountId = accountId;
    this.VECTORIZE_INDEX_URL = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/vectorize/v2/indexes/${this.indexName}`;
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
  public async insert(
    id: string,
    values: number[],
    namespace: string,
    metadata: { isPublic: boolean },
  ) {
    const url = `${this.VECTORIZE_INDEX_URL}/insert`;
    const ndjsonBody = `${JSON.stringify({ id, values, namespace, metadata })}\n`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-ndjson',
        Authorization: `Bearer ${this.apiKey}`,
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

  public async upsert(
    id: string,
    values: number[],
    namespace: string,
    metadata: { isPublic: boolean },
  ) {
    const ndjsonBody = `${JSON.stringify({ id, values, namespace, metadata })}\n`;

    const url = `${this.VECTORIZE_INDEX_URL}/upsert`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-ndjson',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: ndjsonBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to upsert vector: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }

  public async delete(id: string) {
    const url = `${this.VECTORIZE_INDEX_URL}/delete-by-ids`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({ ids: [id] }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to delete vector: ${response.statusText} - ${errorText}`,
      );
    }

    return await response.json();
  }

  // Commented out the original logic
  // public async search(queryEmbedding: number[]) {
  //   return await this.instance.query(queryEmbedding, { topK: 5 });
  // }

  // New API-based search method
  /**
   *
   * @param {string} content - Search query content.
   * @param {string} namespace - Segment vectors; only vectors within the provided namespace are used for search.
   * @param {string} topK - Return the top K similar vectors (default = 3).
   * @param {Object} filter - Optional [metadata filter](https://developers.cloudflare.com/vectorize/reference/metadata-filtering)
   * @returns {Promise<VectorsQueryResponse>} A promise that resolves with the vectors query response which contains the matches.
   */
  public async search(
    content: string,
    namespace: string,
    topK: number = 3,
    filter?: Record<string, any>,
  ): Promise<VectorsQueryResponse> {
    const vector = await AiClient.getEmbedding(content);
    const url = `${this.VECTORIZE_INDEX_URL}/query`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        vector,
        topK,
        namespace,
        ...(filter ? { filter } : {}),
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

  public async syncRecord(
    {
      id,
      content,
      namespace,
      metadata,
    }: {
      id: string;
      content: string;
      namespace: string;
      metadata: { isPublic: boolean };
    },
    upsert: boolean = false,
  ) {
    const values = await AiClient.getEmbedding(content);
    if (!upsert) await this.insert(id, values, namespace, metadata);
    else await this.upsert(id, values, namespace, metadata);
  }
}

export { VectorClient };

export interface Env {
  VECTORIZE_API_KEY: string;
  VECTORIZE_INDEX_NAME: string;
  ACCOUNT_ID: string;
}
