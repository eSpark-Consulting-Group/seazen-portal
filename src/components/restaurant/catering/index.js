import React from "react";
import ContactButton from "../../contact_button/index.js";
import "./style.css"
import FooterSection from "../../footer/footerTextBox/footerSection.js";

const CateringDetails = () => {
    return (<div className="catering_outer_container">
        <div className="catering_inner_container">
            <div className="catering_text_button_combined_container">
                <div className="catering_text_container">Please contact us to arrange
                your catering.</div>
                <div className="catering_button_container">
                    <ContactButton text={1818555} color={"#98694E"} icon_image="/assets/img/Icon - Call.svg"/>
                    <ContactButton text={"Live Chat"} color={"#1B6483"} icon_image="/assets/img/Icon - Chat.svg"/>
                    <ContactButton text={"Send Message"} color={"#2FA124"} icon_image="/assets/img/Icon - Message.svg"/>
                </div>
            </div>
            {/* <div style={{marginLeft:"280px"}}>
            <FooterSection />
        </div> */}
        </div>
    </div>);
}

export default CateringDetails;