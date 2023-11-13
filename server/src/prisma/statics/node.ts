import prisma from '../client';

const findOrCreateMany = async (ids, nodes) => {
  // Find existing nodes
  const existingNodes = await prisma.node.findMany({
    where: {
      id: {
        in: ids,
      },
    },
  });

  const existingIds = existingNodes.map((node: any) => node.id);

  const filteredNodes = nodes.filter(
    (node: any) => !existingIds.includes(node.id),
  );

  // Save new nodes
  if (filteredNodes.length > 0) {
    await prisma.node.createMany({
      data: filteredNodes,
    });
  }

  // Return all nodes
  return prisma.node.findMany({ where: { id: { in: ids } } });
};

export default { findOrCreateMany };
