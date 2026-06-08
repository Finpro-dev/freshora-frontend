// search formatter, expected e.g. this-is-novpa , as we need to send the request thru the req params (cannot receive any space)
export const formatSearch = (search: string) => {
  const searchArr = search.trim().split(" ");

  const formatSearchArr: string[] = [];
  searchArr.forEach((str) => {
    if (str.trim() !== "") formatSearchArr.push(str.trim());
  });

  return formatSearchArr.join("-");
};
