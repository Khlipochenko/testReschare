export const sortItems = (items, sortOrder) => {
  if (sortOrder === 'Neueste') {
    return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (sortOrder === 'Älteste') {
    return items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }
  return items;
};
