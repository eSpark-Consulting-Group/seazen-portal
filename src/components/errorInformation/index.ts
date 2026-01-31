import React from "react";
import "./style.css"

const ErrorInformation = ({errorMessage}) => {
    return ( <div className="error_information_outer_container p-2 px-3 px-sm-4">
        <div className="error_information_inner_container">
            <div className="error_information_icon_container">
                <img src="/assets/img/Icon - Error.svg" alt="error_icon" />
            </div>
            <div className="error_information_text_container">{errorMessage}</div>
        </div>
    </div> );
}
 
export default ErrorInformation;