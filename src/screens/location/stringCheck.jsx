export const removeDiacritics = (inputString) => {
  return inputString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const haveCommonWord = (str1, str2) => {
  // Split the strings into arrays of words
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);

  // Convert arrays to sets for efficient intersection check
  const set1 = new Set(words1);
  const set2 = new Set(words2);

  // Check if there is any common word
  for (let word of set1) {
    if (set2.has(word)) {
      return true;
    }
  }

  return false;
};
