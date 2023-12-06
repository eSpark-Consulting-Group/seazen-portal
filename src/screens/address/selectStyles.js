export const selectStyles = (errorState) => {
  return {
    option: (provided, state) => ({
      ...provided,
      cursor: "pointer",
      backgroundColor: state.isSelected
        ? "rgba(189,197,209,.3)"
        : "transparent",
      color: "#000000",
      ":hover": {
        backgroundColor: "rgba(189,197,209,.3)",
      },
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      border: "none",
      position: "absolute",
      right: "16px",
      top: "11px",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      boxShadow: "0px 10px 30px rgba(49, 79, 124, 0.16)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "#fafafa",
      border: errorState?.areaErr
        ? "1px solid #e02020 !important"
        : "1px solid #c0cdd7 !important",
      borderRadius: "12px !important",
      opacity: "1",
      padding: "10px 10px 10px 8px",
      width: "100%",
      marginBottom: "10px",
      height: "64px",
      color: "#000000",
      boxShadow: "none",
      cursor: "pointer",
    }),
    valueContainer: (baseStyles) => ({
      ...baseStyles,
      paddingLeft: "0px",
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: errorState?.areaErr ? "#e02020" : "#959fa8",
      font: "normal normal bold 16px/28px Titillium Web",
    }),
    menu: (provided) => ({
      ...provided,
      color: "#000000",
      borderRadius: "8px",
      marginTop: "0px",
    }),
    menuList: (base) => ({
      ...base,
      scrollbarWidth: "none",
      "::-webkit-scrollbar": {
        display: "none",
      },
    }),
    group: (base) => ({
      ...base,
      padding: "0px",
    }),
    groupHeading: (base) => ({
      ...base,
      display: "none",
      padding: "0px",
    }),
  };
};
