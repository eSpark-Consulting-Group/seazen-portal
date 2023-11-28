import React from "react";
import "./style.css"

const ContactButton = ({color,text,icon_image,handleButtonClick}) => {
    return (
        <button
            className="contact_button"
            onClick={handleButtonClick}
            style={{backgroundColor: color}}>
            <span className="contact_button_span"><img src={icon_image} alt="iconimage" /></span>
            <span className="contact_button_text" style={{width: "100%"}}>{text}</span>
        </button>);
}
 
export default ContactButton;