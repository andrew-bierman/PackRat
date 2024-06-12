class VectorClient {
  private static _instance: any = null;
  private constructor() {}

  public static get instance(): any {
    if (!VectorClient._instance) {
      throw new Error('VectorClient instance not initialized.');
    }
    return VectorClient._instance;
  }

  public static async init(env: any): Promise<void> {
    if (!VectorClient._instance) {
      VectorClient._instance = env.VECTORIZE_INDEX;
    }
  }

  public static async insert(id: string, values: number[]) {
    return await VectorClient.instance.upsert([{ id, values }]);
  }

  public static async search(queryEmbedding: number[]) {
    return await VectorClient.instance.query(queryEmbedding, { topK: 5 });
  }
}

export { VectorClient };

export interface Env {
    VECTORIZE_INDEX: any;
    }