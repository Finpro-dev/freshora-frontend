export const getIdAndNameLocation = (location: string) => {
  const arr = location.split("%");
  const id = arr.at(0);
  const name = arr.at(1);

  return { id, name };
};
