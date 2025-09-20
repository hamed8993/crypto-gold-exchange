export const deleteCommas = (value: string | undefined) => {
  return value?.split(",").join("") || "";
};
