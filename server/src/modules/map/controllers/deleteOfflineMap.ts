import { protectedProcedure } from '../../../trpc';
import { z } from 'zod';
import { deleteOfflineMapService } from '../services/deleteOfflineMapService';

export function deleteOfflineMapRoute() {
  return protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async (opts): Promise<{ success: boolean }> => {
      const { id } = opts.input;
      await deleteOfflineMapService(id);
      return { success: true };
    });
}
