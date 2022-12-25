import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Input.module.css"

const Input = ({ className, label, styleLabel, icon, myStyle, id, ...props }) => {
    
    return (
        <div className={className}>
            {
            label && 
            <label htmlFor={id} className={`${styleLabel} label`}>{label}</label>
            }
            
            <div className={s.input_wrapper}>
                {
                icon && 
                <FontAwesomeIcon className={s.icon} icon={icon} />
                }
                <input 
                    className={`${s.input} ${myStyle}`} 
                    id={id} 
                    {...props} 
                    style={icon ? {paddingLeft: "2.5rem"} : {}}/>
            </div>
        </div>
    )
}

export default Input;