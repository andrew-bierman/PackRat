import { AiClient } from '../integrations/ai/client';
import axios, { type AxiosInstance } from 'axios';

class VectorClient {
  private static _instance: VectorClient | null = null;
  private apiKey: string;
  private indexName: string;
  private accountId: string;
  private readonly VECTORIZE_INDEX_URL: string;
  private axiosInstance: AxiosInstance;

  private constructor(apiKey: string, indexName: string, accountId: string) {
    this.apiKey = apiKey;
    this.indexName = indexName;
    this.accountId = accountId;
    this.VECTORIZE_INDEX_URL = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/vectorize/indexes/${this.indexName}`;
    this.axiosInstance = axios.create({
      baseURL: this.VECTORIZE_INDEX_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
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
      method: 'PUT',
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

    try {
      const response = await this.axiosInstance.post('/upsert', ndjsonBody);
      return response.data;
    } catch (error) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response) {
        console.error(error.response.data);
        console.error(error.response.status);
        throw new Error(`Failed to upsert vector: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response was received from vector index');
      } else {
        throw new Error('Unknown error');
      }
    }
  }

  public async delete(id: string) {
    const response = await this.axiosInstance.post(
      '/delete-by-ids',
      {
        ids: [id],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return await response.data;
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
   * @param {boolean|null} isPublic - Filter vectors based on visibility. Pass `null` to not apply the filter.
   * @returns {Promise<Object>} A promise that resolves with object that contains matches.
   */
  public async search(
    content: string,
    namespace: string,
    topK: number = 3,
    isPublic?: boolean,
  ) {
    const values = await AiClient.getEmbedding(content);
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/vectorize/indexes/${this.indexName}/vectors/query`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        queries: [
          {
            values,
            topK,
            namespace,
            filter: isPublic != null ? { isPublic } : {},
          },
        ],
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
