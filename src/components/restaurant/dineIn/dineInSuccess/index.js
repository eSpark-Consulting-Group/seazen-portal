import ContactButton from "../../../contact_button";
import "./style.css"

const DineInSuccess = ({
    firstName,
    lastName,
    countryCode,
    phoneNumber,
    selectBranch,
    seatingArea,
    numberOfPersons,
    specialRequirements,
    handleSpecialRequirementsChange,
}) => {
    return (<div className="dine_in_success_outer_container">
        <div className="dine_in_success_inner_container">
            <div className="dine_in_success_message_container">
                <div className="dine_in_success_icon_container">
                    <img src=".\assets\img\Icon - Succes.svg" alt="success_icon" />
                </div>
                <div className="dine_in_success_text_container">
                Thank you!<br/>
                We will contact you soon
                </div>
            </div>
            <div className="dine_in_guest_information_card_container">
                <div className="dine_in_guest_information_card_inner_container">
                    <div className="dine_in_guest_information_card_heading">
                        Guest Information
                    </div>
                    <div className="dine_in_guest_information_card_line_saperator"></div>
                    <div className="dine_in_guest_information_guestname_branch_text_container">
                        <div className="dine_in_guest_name_container">
                            <div className="dine_in_guest_name_heading">Guest name</div>
                            <div className="dine_in_guest_name">{`${firstName}`}</div>
                        </div>
                        <div className="dine_in_guest_branch_container">
                            <div className="dine_in_branch_heading">Branch</div>
                            <div className="dine_in_branch_name">{selectBranch}</div>
                        </div>
                    </div>
                    <div className="dine_in_guest_information_seatingarea_numberofpersons_text_container">
                        <div className="dine_in_seating_area_container">
                            <div className="dine_in_seating_area_heading">Seating area</div>
                            <div className="dine_in_seating_area">{seatingArea}</div>
                        </div>
                        <div className="dine_in_guest_numberofpersons_container">
                            <div className="dine_in_numberofpersons_heading">Number of Persons</div>
                            <div className="dine_in_numberofpersons">{numberOfPersons}</div>
                        </div>
                    </div>
                    <div className="dine_in_guest_information_phone_number_text_container">
                        <div className="dine_in_phone_number_container">
                            <div className="dine_in_phone_number_heading">Phone Number</div>
                            <div className="dine_in_phone_number">{`${countryCode} ${phoneNumber}`}</div>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="dine_in_contact_us_container">
                <div className="dine_in_contact_us_heading">Contact Us</div>
                <div className="dine_in_contact_us_buttons">
                    <ContactButton text={1818555} color={"#98694E"} icon_image=".\assets\img\Icon - Call.svg"/>
                    <ContactButton text={"Live Chat"} color={"#1B6483"} icon_image=".\assets\img\Icon - Chat.svg"/>
                    <ContactButton text={"Send Message"} color={"#2FA124"} icon_image=".\assets\img\Icon - Message.svg"/>
                </div>
            </div>
        </div>
    </div>);
}
 
export default DineInSuccess;