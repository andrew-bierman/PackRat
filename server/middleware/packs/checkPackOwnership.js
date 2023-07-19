export const checkPackOwnership = async (req, res, next) => {
    try {
      const { ownerId } = req.params; // or req.body, depending on your endpoint design
      const { packId } = req.params;
  
      const pack = await Pack.findById(packId);
  
      if (!pack) {
        return res.status(404).json({ msg: 'Pack not found' });
      }
  
      if (!pack.owners.includes(ownerId)) {
        return res.status(403).json({ msg: 'User does not have permission to perform this operation' });
      }
  
      next(); // move on to the route handler
    } catch (error) {
      console.error('checkPackOwnership error', error);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
  