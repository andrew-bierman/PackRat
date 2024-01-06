import Item from '../../models/itemModel';

/**
 * Retrieves globally available items.
 *
 * @param {Object} req - The request object.
 * @return {Object} An object containing items, page, and totalPages.
 */
export const getItemsGloballyService = async (
  reqlimit: any,
  reqpage: any,
  searchString: string,
) => {
  const totalItems = await Item.countDocuments({
    global: true,
    name: { $regex: searchString, $options: 'i' },
  });
  const limit = Number(reqlimit) || totalItems;
  const totalPages = Math.ceil(totalItems / limit);
  const page = Number(reqpage) || 1;
  const startIndex = (page - 1) * limit;

  const items = await Item.find({ global: true })
    .populate('category', 'name')
    .skip(startIndex)
    .limit(limit)
    .sort({
      createdAt: -1,
    });

  return {
    items,
    page,
    totalPages,
  };
};
