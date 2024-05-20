export class FileService {
  async get(filePath: string) {
    const object = await process.env.PACKRAT_BUCKET.get(filePath);

    if (object === null) {
      return new Response('Object Not Found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);

    return { headers, body: object.body };
  }

  async save(savePath: string, fileBase64: string) {
    const buffer = Buffer.from(fileBase64);
    await process.env.PACKRAT_BUCKET.put(savePath, buffer);
  }

  async delete(filePath: string) {
    await process.env.PACKRAT_BUCKET.delete(filePath);
  }
}
