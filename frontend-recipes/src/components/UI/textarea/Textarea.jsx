import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./Textarea.module.css"

const Textarea = ({ className, label, styleLabel, myStyle, id, ...props }) => {
    
    return (
        <div className={className}>
            {
            label && 
            <label htmlFor={id} className={`${styleLabel} label`}>{label}</label>
            }

            <textarea 
                className={`${s.textarea} ${myStyle}`} 
                id={id} 
                {...props} />
        </div>
    )
}

export default Textarea;