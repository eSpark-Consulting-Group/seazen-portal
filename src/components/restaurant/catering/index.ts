import React from "react";
import ContactButton from "../../contact_button/index.js";
import "./style.css"
import FooterSection from "../../footer/footerTextBox/footerSection.js";
import DetailsButton from "../../socialButtonTabs/detailsButtons/index.js";

const CateringDetails = () => {
    return (<div className="catering_outer_container">
        <div className="catering_inner_container">
            <div>
                <div className="catering_text_container">Please contact us to arrange
                your catering.</div> 
                <div className="catering_button_container">
            <DetailsButton calledFrom="catering"/>
            </div>
            </div>
            {/* <div style={{marginLeft:"280px"}}>
            <FooterSection />
        </div> */}
        </div>
    </div>);
}

export default CateringDetails;