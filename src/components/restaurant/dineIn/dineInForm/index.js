import React from "react";
import Select from "react-select";
import styles from "./style.module.css";

const DineInForm = ({
  firstName,
  handleFirstNameChange,
  lastName,
  handleLastNameChange,
  countryCode,
  handleCountryCodeChange,
  phoneNumber,
  handlePhoneNumberChange,
  selectBranch,
  handleChangeSelectBranch,
  dummy_options,
  seatingArea,
  handleChangeSeatingArea,
  numberOfPersons,
  handleChangeNumberOfPersons,
  specialRequirements,
  handleSpecialRequirementsChange,
  handleSubmit,
}) => {
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "#C0CDD7" : "#C0CDD7",
      "&:hover": {
        border: "1px solid #c0cdd7 !important",
      },
      boxShadow: state.isFocused ? 0 : 0,
      border: "1px solid #c0cdd7",
      borderRadius: "12px",
      height: "52px",
      paddingRight: "12px",
      backgroundColor: "#fafafa",
      fontFamily: "Titillium Web",
      fontSize: "16px",
      fontWeight: "700",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#F0F6F5" : "#fafafa",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: "5px",
      color: "#6B7580",
      backgroundColor: "white",
      borderRadius: "50%",
      boxShadow: "0px 8px 12px rgba(49, 79, 124, 0.12)",
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
    indicatorSeparator: (baseStyles) => ({ display: "none" }),
    placeholder: (baseStyles) => {
      return {
        ...baseStyles,
        color: "#959fa8",
      };
    },
  };

  return (
    <div className={styles.dineInFormOuterContainer}>
      <div className={styles.dineInFormInnerContainer}>
        <div className={styles.dineInFormHeadingText}>
          Fill your details below, and we will contact you at the earliest.
        </div>
        <div className={styles.dineInFormDividerLine}></div>
        <div className={styles.dineInFormContactDetails}>
          <div className={styles.dineInFormContactDetailsHeading}>
            Contact Details
          </div>
          <form
            action=""
            className={styles.dineInFormContactDetailsFormContainer}
          >
            <div className={styles.dineInFormContactDetailsNameContainer}>
              <input
                className={styles.firstNameInput}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={handleFirstNameChange}
                required
              />
              <input
                className={styles.lastNameInput}
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
                required
              />
            </div>
            <div className={styles.dineInFormContactDetailsPhonenumberContainer}>
              <input
                className={styles.countryCodeInput}
                type="text"
                name="CountryCode"
                placeholder="+965"
                value={countryCode}
                onChange={handleCountryCodeChange}
                required
              />
              <input
                className={styles.phoneNumberInput}
                type="text"
                name="PhoneNumber"
                placeholder="Mobile Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
          </form>
        </div>
        <div className={styles.dineInFormQueueInformation}>
          <div className={styles.dineInFormQueueInformationHeading}>
            Queue Information Details
          </div>
          <form className={styles.dineInFormQueueInformationFormContainer}>
            <div className={styles.selectContainer}>
              <Select
                placeholder="Select Branch"
                value={selectBranch}
                options={dummy_options}
                onChange={handleChangeSelectBranch}
                styles={customStyles}
                getOptionLabel={(e) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#959fa8",
                      fontFamily: "Titillium Web",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {e.icon}
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                  </div>
                )}
              />
            </div>
            <div className={styles.selectContainer}>
              <Select
                placeholder="Seating Area"
                value={seatingArea}
                options={dummy_options}
                onChange={handleChangeSeatingArea}
                styles={customStyles}
                getOptionLabel={(e) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#959fa8",
                      fontFamily: "Titillium Web",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {e.icon}
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                  </div>
                )}
              />
            </div>
            <div className={styles.selectContainer}>
              <Select
                placeholder="Number of Persons"
                value={numberOfPersons}
                options={dummy_options}
                onChange={handleChangeNumberOfPersons}
                styles={customStyles}
                getOptionLabel={(e) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#959fa8",
                      fontFamily: "Titillium Web",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                  >
                    {e.icon}
                    <span style={{ marginLeft: 5 }}>{e.text}</span>
                  </div>
                )}
              />
            </div>
            <textarea
              className={styles.specialRequirementTextArea}
              name="SpecialRequirement"
              id="SpecialRequirement"
              placeholder="Special Requirement"
              value={specialRequirements}
              onChange={handleSpecialRequirementsChange}
            ></textarea>
          </form>
        </div>
        <button
          type="submit"
          className={styles.dineInFormSubmitButton}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DineInForm;
