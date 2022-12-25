import { React } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import s from "./Select.module.css"

const Select = ({ className, items, id, label, styleLabel, myStyle, ...props }) => {
    
    return (
        <div className={className}>
            {
            label && 
            <label htmlFor={id} className={`${styleLabel} label`}>{label}</label>
            }
            <div className={s.select_wrapper}>
                <select 
                    id={id} 
                    className={`${s.select} ${myStyle}`} 
                    {...props}>
                        {
                            items.length > 0 && (items.map(item => {
                                return <option key={item.id} value={item.id} >{item.name}</option>
                            }))
                        }
                </select>
                <FontAwesomeIcon className={s.icon} icon={faCaretDown}/>
            </div>
        </div>
    )
}

export default Select;