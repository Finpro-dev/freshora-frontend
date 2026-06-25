export const calculateTotalWeight = (cartItems: any[]) => {
  const totalWeightInGram = cartItems?.reduce((acc, item) => {
    const qty = item?.quantity || 0;
    const weight = Number(item?.product?.weightPerGram) || 0;

    return acc + weight * qty;
  }, 0);

  const totalWeightInKg = totalWeightInGram / 1000;

  return {
    totalWeightInGram,
    totalWeightInKg,
  };
};
