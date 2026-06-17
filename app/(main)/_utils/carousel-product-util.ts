export const calculateTotalPrice = (price: number, discount: number) => {
  return price - (price * discount) / 100;
};

export const calculateDiscount = (price: number, discount: number) => {
  return (price * discount) / 100;
};
