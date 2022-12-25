import { React } from "react";
import s from "./Notification.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faXmark } from '@fortawesome/free-solid-svg-icons'

const Notification = ({children, onClick,...props}) => {
    return (
        <div className={`${s.notification} is-bg-red is-border-red`} {...props}>
            <div className={s.delete_button} type="button" onClick={onClick}>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            {children}
        </div>
    )
}

export default Notification;