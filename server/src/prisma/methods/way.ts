import type { Way as TWay } from '@prisma/client/edge';

type ExtendedWay = {
  toJSON: () => Partial<TWay>;
  save: (prisma: any) => Promise<void>;
};

const Way = <T extends TWay>(prismaWay: T): T & ExtendedWay => {
  if (!prismaWay) return;
  return Object.assign(prismaWay, {
    toJSON(): Partial<TWay> {
      const {
        id,
        // destructure methods
        toJSON,
        save,
        ...wayObject
      } = this;
      return wayObject;
    },
    async save(prisma: any): Promise<void> {
      if (this.osm_type !== 'way') {
        console.log(
          'ERROR in WaySchema.pre("save"): this.osm_type !== "way"',
          this.osm_type,
        );
        throw new Error('This is not a way');
      }

      const {
        id,
        // destructure methods
        toJSON,
        save,
        ...wayObject
      } = this;

      await prisma.way.upsert({
        where: {
          id,
        },
        update: wayObject,
        create: wayObject,
      });
    },
  });
};

export { Way };
