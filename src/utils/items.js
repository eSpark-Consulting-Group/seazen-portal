export const extractPriceAndCurrency = (priceInfo) => {
  const pattern = /(\b[A-Z]{3}\s*)(\d+(\.\d+)?)/;

  // Use match to find the first match in the input string.
  const match = priceInfo.match(pattern);

  if (match) {
    // Extract the currency and price as separate values.
    const currency = match[1];
    const price = parseFloat(match[2]);

    return { currency, price };
  } else {
    // Return null if no match is found.
    return null;
  }
};
