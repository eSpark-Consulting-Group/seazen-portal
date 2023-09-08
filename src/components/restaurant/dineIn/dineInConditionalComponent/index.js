import { useState } from "react";
import DineInForm from "../dineInForm";
import DineInSuccess from "../dineInSuccess";


const DineInCoditionalComponent = () => {

    // State used for conditional rendering
    const [submit, setSubmit] = useState(false);

    const formValidation = () => {
        const formData = {
            firstName: firstName, 
            lastName: lastName, 
            countryCode: countryCode, 
            phoneNumber: phoneNumber, 
            selectBranch: selectBranch, 
            seatingArea: seatingArea, 
            numberOfPersons: numberOfPersons
        };

        const allEmptyString = Object.values(formData).every(data => data === '');
    
        return !allEmptyString;
    }

    // handle submit on "Submit Branch"
    const handleSubmit = () =>{
        console.log("form validation:", formValidation());
        setSubmit(formValidation);
        // formValidation ? setSubmit(true) : setSubmit(false);
    }    

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleCountryCodeChange = (event) => {
    // Use regex to remove non-numeric characters
    const numericValue = event.target.value.replace(/\D/g, '');
    setCountryCode(numericValue);
    };

    const handlePhoneNumberChange = (event) => {
    // Use regex to allow only digits and optional spaces or dashes
    const regex = /^[0-9]*[-\s]?[0-9]*$/;
    if (regex.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
    };

    // state of the "Select Branch"
    const [selectBranch, setSelectBranch] = useState('');

     // handle onChange event of the "Select Branch"
    const handleChangeSelectBranch = e => {
        setSelectBranch(e);
    }

    // state of the "Seating Area"
    const [seatingArea, setSeatingArea] = useState('');

     // handle onChange event of the "Seating Area"
    const handleChangeSeatingArea = e => {
        setSeatingArea(e);
    }

    // state of the "Number Of Persons"
    const [numberOfPersons, setNumberOfPersons] = useState('');

     // handle onChange event of the "Number Of Persons"
    const handleChangeNumberOfPersons = e => {
        setNumberOfPersons(e);
    }

    // dummy data for "Dropdowns"
    const dummy_options = [
        {
          value: 1,
          text: 'Option 1',
        },
        {
          value: 2,
          text: 'Option 2',
        },
        {
          value: 3,
          text: 'Option 3',
        },
        {
          value: 4,
          text: 'Option 4',
        }
      ];

  switch (submit) {
    case true: 
      return (<DineInSuccess
        firstName={firstName}
        lastName={lastName}
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        selectBranch={selectBranch.text}
        seatingArea={seatingArea.text}
        numberOfPersons={numberOfPersons.text}
        />);
    case false: 
      return (<DineInForm
        firstName={firstName}
        handleFirstNameChange={handleFirstNameChange}
        lastName={lastName}
        handleLastNameChange={handleLastNameChange}
        countryCode={countryCode}
        handleCountryCodeChange={handleCountryCodeChange}
        phoneNumber={phoneNumber}
        handlePhoneNumberChange={handlePhoneNumberChange}
        selectBranch={selectBranch}
        handleChangeSelectBranch={handleChangeSelectBranch}
        dummy_options={dummy_options}
        seatingArea={seatingArea}
        handleChangeSeatingArea={handleChangeSeatingArea}
        numberOfPersons={numberOfPersons}
        handleChangeNumberOfPersons={handleChangeNumberOfPersons}
        handleSubmit={handleSubmit}
        />);
    default: 
      return (<DineInSuccess />);
  }

}
 
export default DineInCoditionalComponent;