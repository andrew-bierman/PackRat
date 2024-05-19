import { publicProcedure } from '../../trpc';
import * as validator from '@packrat/validations';
import { TripImage } from '../../drizzle/methods/tripImage';
import { FileService } from '../../services/file';

export function addTripImageRoute() {
  return publicProcedure
    .input(validator.addTripImage)
    .mutation(async (opts) => {
      const { tripId, image } = { ...opts.input };
      const tripImageClass = new TripImage();
      const fileService = FileService();
      const fileKey = `${new Date().toString()}_${tripId}`;
      console.log(fileService.save);

      await fileService.save(fileKey, image);
      const trip = await tripImageClass.create({
        trip_id: tripId,
        path: image,
      });
    });
}
