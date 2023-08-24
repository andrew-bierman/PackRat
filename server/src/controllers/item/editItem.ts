import { editItemService } from '../../services/item/item.service'

export const editItem = async (req, res) => {
  try {
    const { _id, name, weight, unit, quantity, type } = req.body

    const newItem = await editItemService(_id, name, weight, unit, quantity, type)

    res.status(200).json(newItem)
  } catch (error) {
    res.status(404).json({ msg: 'Unable to edit item' })
  }
}
