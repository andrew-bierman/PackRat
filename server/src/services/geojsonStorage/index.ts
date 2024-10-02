export type ResourceType = 'trip' | 'map';

export class GeojsonStorageService {
  private static _bucket: R2Bucket | null = null;
  private static _instance: GeojsonStorageService | null = null;

  private constructor(bucket: R2Bucket) {
    GeojsonStorageService._bucket = bucket;
  }

  public static init(bucketBinding: R2Bucket) {
    GeojsonStorageService._instance = new GeojsonStorageService(bucketBinding);
  }

  public static get instance(): R2Bucket {
    if (!GeojsonStorageService._instance) {
      throw new Error('GeojsonStorageService instance not initialized.');
    }
    return GeojsonStorageService._bucket;
  }

  public static async save(
    resource: ResourceType,
    geojson: string,
    resourceId: string,
  ): Promise<R2Object> {
    const object = await this._bucket.put(`${resource}/${resourceId}`, geojson);
    return object;
  }

  public static async retrieve(
    resource: ResourceType,
    resourceId: string,
  ): Promise<R2ObjectBody> {
    const object = await this._bucket.get(`${resource}/${resourceId}`);
    return object;
  }
}
