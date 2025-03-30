export const createFilter = (queryParams) => {
  const { category, subcategory, size, color, shipping } = queryParams;
  // Basisfilter: Zeige nur aktive Items
  let filter = { status: 'aktiv' };

  // Weitere Filter hinzufügen
  if (category) filter.category = { $in: category.split(',') };
  if (subcategory) filter.subcategory = { $in: subcategory.split(',') };
  if (size) filter.size = { $in: size.split(',') };
  if (color) filter.color = { $elemMatch: { name: { $in: color.split(',') } } };
  if (shipping) filter.shipping = shipping;

  return filter;
};
