import { hardSyncVectorDB } from 'src/services/vectorDB/hardSyncVectorDBService';
import { publicProcedure } from '../../trpc';

export function hardSyncVectorDBRoute() {
  return publicProcedure.mutation(async () => {
    try {
      await hardSyncVectorDB();
      return { message: 'Vectors synced successfully!' };
    } catch (error) {
      console.error(`Failed to sync vectors: ${error.message}`, error);
      throw error;
    }
  });
}
