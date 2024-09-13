import { getPackTemplatesService } from 'src/services/packTemplate/packTemplate.service';
import { protectedProcedure } from 'src/trpc';

export function getPackTemplatesRoute() {
  return protectedProcedure.query(async () => {
    return await getPackTemplatesService();
  });
}
