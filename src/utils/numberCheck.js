const arabicCountryMCCRegex =
  /^\+?(971|966|965|974|968|962|961|973|967|963|961|964|20|249|212|213|216|218|220|221|222|223|224|225|226|227|228|229|230|231|232|233|234|235|236|237|238|239|240|241|242|243|244|245|246|247|248|249|250|251|252|253|254|255|256|257|258|260|261|262|263|264|265|266|267|268|269|291|297|298|299|350|351|352|353|354|355|356|357|358|359|36|370|371|372|373|374|375|376|377|378|379|380|381|382|383|385|386|387|388|389|420|421|422|423|43|44|45|46|47|48|49)\d{0,1}$/;

export const isArabicCountryMCC = (mcc) => {
  return arabicCountryMCCRegex.test(mcc);
};

export const checkIfIncludesPlus = (country_code) => {
  let updateMobileCode;

  if (country_code.toString().includes("+")) {
    updateMobileCode = country_code;
  } else {
    updateMobileCode = `+${country_code}`;
  }

  return updateMobileCode;
};

export const checkNumberLength = (number) => {
  const numberLength = /^\d{8}$/;
  return numberLength.test(number);
};
