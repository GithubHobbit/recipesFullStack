import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Button.module.css"

const Button = ({children, icon, myStyle, ...props}) => {
    return (
            <button type="button" className={`${s.button} ${myStyle}`} {...props}>
                {
                icon && 
                <FontAwesomeIcon 
                    icon={icon} 
                    style={children && {marginRight: "0.3rem"}}/> 
                }
                {children}
            </button>
    )
}

export default Button;