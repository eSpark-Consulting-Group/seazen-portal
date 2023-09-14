import "./style.css"

const ContactButton = ({color,text,icon_image,handleclick}) => {
    return (
        <button
            className="contact_button"
            onClick={handleclick}
            style={{backgroundColor: color}}>
            <span className="contact_button_span"><img src={icon_image} alt="iconimage" /></span>
            {text}
        </button>);
}
 
export default ContactButton;