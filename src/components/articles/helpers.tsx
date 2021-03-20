export const getItem = (data, index) => {
  const item = data[index];

  return {
    ...item,
    index: index,
    key: item._id,
  };
};
export const getItemCount = (data) => data.length;

export const getKey = (item) => item._id.toString();
