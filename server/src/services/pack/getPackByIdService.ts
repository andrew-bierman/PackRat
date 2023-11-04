import { prisma } from '../../prisma/index';

export const getPackByIdService = async (packId) => {
  try {
    const pack = await prisma.item.findUnique({
      where: { id: packId },
      include: {
        category: true, // Include the 'category' relation
        owners: true, // Include the 'owners' relation
        packs: true, // Include the 'packs' relation
      } as never,
    });

    return pack;
  } catch (error) {
    // Handle any potential errors here
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
