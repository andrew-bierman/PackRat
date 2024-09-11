import { getPackTemplatesService } from 'src/services/packTemplate/packTemplate.service';
import { protectedProcedure } from 'src/trpc';

export default function getPackTemplatesRoute() {
  return protectedProcedure.query(async () => {
    return await getPackTemplatesService();
  });
}
