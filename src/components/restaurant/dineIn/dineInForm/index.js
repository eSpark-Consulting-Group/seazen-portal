import { useState } from "react";
import "./style.css"
import Select from 'react-select';
import DineInSuccess from "./dineInSuccess";


const DineInForm = () => {

    // State used for conditional rendering
    const [submit, setSubmit] = useState(false);

    const [countryCode, setCountryCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    // state of the "Select Branch"
    const [selectBranch, setSelectBranch] = useState(null);

     // handle onChange event of the "Select Branch"
    const handleChangeSelectBranch = e => {
        setSelectBranch(e);
    }

    // state of the "Seating Area"
    const [seatingArea, setSeatingArea] = useState(null);

     // handle onChange event of the "Seating Area"
    const handleChangeSeatingArea = e => {
        setSeatingArea(e);
    }

    // state of the "Number Of Persons"
    const [numberOfPersons, setNumberOfPersons] = useState(null);

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

    const styles = {
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? '#C0CDD7' : '#C0CDD7',
          '&:hover': {
            border: '1px solid #c0cdd7 !important'
         },
          boxShadow: state.isFocused ? 0 : 0,
          border: '1px solid #c0cdd7',
          borderRadius: '12px',
          height: '52px',
          paddingRight:'12px',
          backgroundColor: '#fafafa',
          fontFamily: 'Titillium Web',
          fontSize: '16px',
          fontWeight: '700',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#F0F6F5" : "#fafafa",
          }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            padding: '5px',
            color: '#6B7580',
            backgroundColor: 'white',
            borderRadius: '50%',
            boxShadow: '0px 8px 12px rgba(49, 79, 124, 0.12)',
            transition: 'all .2s ease',
            transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : null,
          }),
          indicatorSeparator: (baseStyles) => ({display:'none'}),
          placeholder: (baseStyles) => {
            return {
                ...baseStyles,
                color: '#959fa8',
            }
        }};


    const handleSubmit = () =>{
        setSubmit(true);
    }    

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

  switch (submit) {
    case true: 
      return (<DineInSuccess />);
    case false: 
      return (<div className="dine_in_form_outer_container">
      <div className="dine_in_form_inner_container">
          <div className="dine_in_form_heading_text">
              Fill your details below and
              we will contact you at the earliest.
          </div>
          <div className="dine_in_form_divider_line"></div>
          <div className="dine_in_form_contact_details">
              <div className="dine_in_form_contact_details_heading">
                  Contact Details
              </div>
              <form action="" className="dine_in_form_contact_details_form_container">
                  <div className="dine_in_form_contact_details_name_container">
                      <input
                      className="first_name_input"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      />
                      <input
                      className="last_name_input"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      />
                  </div>
                  <div className="dine_in_form_contact_details_phonenumber_container">
                      <input
                      className="country_code_input"
                      type="text"
                      name="CountryCode"
                      placeholder="+965"
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      required
                      />
                      <input
                      className="phone_number_input"
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
          <div className="dine_in_form_queue_information">
              <div className="dine_in_form_queue_information_heading">
                  Queue information details
              </div>
              <form className="dine_in_form_queue_information_form_container">
                  <div className="select_container">
                      <Select
                          placeholder="Select branch"
                          value={selectBranch}
                          options={dummy_options}
                          onChange={handleChangeSelectBranch}
                          styles={styles}
                          getOptionLabel={e => (
                              <div style={{ display: 'flex', alignItems: 'center',color: '#959fa8',fontFamily: 'Titillium Web',fontSize:'16px',fontWeight: '600', }}>
                              {e.icon}
                              <span style={{ marginLeft: 5 }}>{e.text}</span>
                          </div>
                          )}
                      />
                  </div>
                  <div className="select_container">
                      <Select
                          placeholder="Seating area"
                          value={seatingArea}
                          options={dummy_options}
                          onChange={handleChangeSeatingArea}
                          styles={styles}
                          getOptionLabel={e => (
                              <div style={{ display: 'flex', alignItems: 'center',color: '#959fa8',fontFamily: 'Titillium Web',fontSize:'16px',fontWeight: '600', }}>
                              {e.icon}
                              <span style={{ marginLeft: 5 }}>{e.text}</span>
                          </div>
                          )}
                      />
                  </div>
                  <div className="select_container">
                      <Select
                          placeholder="Number of Persons"
                          value={numberOfPersons}
                          options={dummy_options}
                          onChange={handleChangeNumberOfPersons}
                          styles={styles}
                          getOptionLabel={e => (
                              <div style={{ display: 'flex', alignItems: 'center',color: '#959fa8',fontFamily: 'Titillium Web',fontSize:'16px',fontWeight: '600', }}>
                              {e.icon}
                              <span style={{ marginLeft: 5 }}>{e.text}</span>
                          </div>
                          )}
                      />
                  </div>
                  <textarea className="special_requirement_text_area" name="SpecialRequirement" id="SpecialRequirement" placeholder="Special requirement"></textarea>
              </form>
          </div>
          <button type="submit" className="dine_in_form_submit_button" onClick={handleSubmit}>Submit</button>      
      </div>
  </div>);
    default: 
      return (<div className="dine_in_form_outer_container">
      <div className="dine_in_form_inner_container">
          <div className="dine_in_form_heading_text">
              Fill your details below and
              we will contact you at the earliest.
          </div>
          <div className="dine_in_form_divider_line"></div>
          <div className="dine_in_form_contact_details">
              <div className="dine_in_form_contact_details_heading">
                  Contact Details
              </div>
              <form action="" className="dine_in_form_contact_details_form_container">
                  <div className="dine_in_form_contact_details_name_container">
                      <input
                      className="first_name_input"
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      required
                      />
                      <input
                      className="last_name_input"
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      required
                      />
                  </div>
                  <div className="dine_in_form_contact_details_phonenumber_container">
                      <input
                      className="country_code_input"
                      type="text"
                      name="CountryCode"
                      placeholder="+965"
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      required
                      />
                      <input
                      className="phone_number_input"
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
          <div className="dine_in_form_queue_information">
              <div className="dine_in_form_queue_information_heading">
                  Queue information details
              </div>
              <form className="dine_in_form_queue_information_form_container">
                  <div className="select_container">
                      <Select
                          placeholder="Select branch"
                          value={selectBranch}
                          options={dummy_options}
                          onChange={handleChangeSelectBranch}
                          styles={styles}
                          getOptionLabel={e => (
                              <div style={{ display: 'flex', alignItems: 'center',color: '#959fa8',fontFamily: 'Titillium Web',fontSize:'16px',fontWeight: '600', }}>
                              {e.icon}
                              <span style={{ marginLeft: 5 }}>{e.text}</span>
                          </div>
                          )}
                      />
                  </div>
                  <div className="select_container">
                      <Select
                          placeholder="Seating area"
                          value={seatingArea}
                          options={dummy_options}
                          onChange={handleChangeSeatingArea}
                          styles={styles}
                          getOptionLabel={e => (
                              <div style={{ display: 'flex', alignItems: 'center',color: '#959fa8',fontFamily: 'Titillium Web',fontSize:'16px',fontWeight: '600', }}>
                              {e.icon}
                              <span style={{ marginLeft: 5 }}>{e.text}</span>
                          </div>
                          )}
                      />
                  </div>
                  <div className="select_container">
                      <Select
                          placeholder="Number of Persons"
                          value={numberOfPersons}
                          options={dummy_options}
                          onChange={handleChangeNumberOfPersons}
                          styles={styles}
                          getOptionLabel={e => (
                              <div style={{ display: 'flex', alignItems: 'center',color: '#959fa8',fontFamily: 'Titillium Web',fontSize:'16px',fontWeight: '600', }}>
                              {e.icon}
                              <span style={{ marginLeft: 5 }}>{e.text}</span>
                          </div>
                          )}
                      />
                  </div>
                  <textarea className="special_requirement_text_area" name="SpecialRequirement" id="SpecialRequirement" placeholder="Special requirement"></textarea>
              </form>
          </div>
          <button type="submit" className="dine_in_form_submit_button" onClick={handleSubmit}>Submit</button>      
      </div>
  </div>);
  }

}
 
export default DineInForm;