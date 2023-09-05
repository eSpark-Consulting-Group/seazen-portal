import "./style.css"

const ContactButton = ({color,text,icon_image,handleclick}) => {
    return (
        <button
            className="contact_button"
            onClick={handleclick}
            style={{backgroundColor: color}}>
            <span><img src={icon_image} alt="icon_image" /></span>
            {text}
        </button>);
}
 
export default ContactButton;