# Adding catalog gear to a pack

Takes a product a user found in the gear catalog and puts it in one of their
packs, with the details that matter for that trip, in a few taps.

## The model in one paragraph

The catalog knows what a product is: its name, weight, brand, photo and the
categories it belongs to. A pack knows how a user organises their own gear.
Adding a catalog item joins the two. The user picks the pack, confirms how
many they're bringing and which group it belongs in, and the item lands in
the pack with the catalog's weight converted to the user's preferred unit.
Most adds need no typing at all: the category is already filled in from the
catalog, and the groups the user already uses in that pack are one tap away.

## Choosing the pack

From a catalog item, **Add to Pack** opens a list of the user's packs. Picking
one opens the details step for that pack. The details step shows what is
being added (photo, name, weight, brand) and which pack it is going into,
with that pack's item count and type.

## The details

- **Quantity**: starts at one. Minus and plus buttons change it, and the
  number itself can be typed. It never goes below one.
- **Category**: the group the item sits under in the pack. It starts filled
  with the catalog's own category for the product. Below the field, a row of
  suggestions offers the catalog's categories followed by the groups already
  used in this pack. Tapping a suggestion fills the field, and the chip that
  matches the current category shows as selected. The user can still type any
  category they like.
- **Notes**: free text for anything trip-specific.
- **Consumable**: marks an item that gets used up during the trip, such as
  food or fuel.
- **Worn**: marks an item that is worn rather than carried, so it stays out
  of the carried weight.

Whatever field the user is typing in stays visible above the keyboard. The
screen scrolls so the field and a little of what follows it are in view, and
the keyboard can be dragged down to dismiss it.

## Finishing

**Add to Pack** adds the item and confirms with a short "Item added" message,
then returns to the catalog item. **Cancel** goes back without adding
anything. The catalog item's usage count goes up by one, so popular gear
shows how many packs it appears in.

## What this feature does not do

- It does not create new packs from the details step. A user with no packs is
  pointed to create one first.
- It does not edit the item's name, weight or photo while adding. Those come
  from the catalog and can be changed afterwards from the pack.
- It does not add the same product to several packs at once.
