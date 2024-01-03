export const removeDiacritics = (inputString) => {
  return inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
