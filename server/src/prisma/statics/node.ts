async function findOrCreateMany(ids, nodes) {
  if (!this) return;
  // Find existing nodes
  const existingNodes = await this.findMany({
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
    await this.createMany({
      data: filteredNodes,
    });
  }

  // Return all nodes
  return this.findMany({ where: { id: { in: ids } } });
};

export default { findOrCreateMany };
