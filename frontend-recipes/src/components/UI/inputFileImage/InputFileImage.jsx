import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import s from './InputFileImage.module.css'

const InputFileImage = ({label, className, image, onChange}) => {
    const [stepImageForDisplay, setStepImageForDisplay] = useState();

    useEffect(() => {
        image ? 
            setStepImageForDisplay(URL.createObjectURL(image)) :
            setStepImageForDisplay();
    }, [image]);

    return (
        <div className={className}>
            <label className={s.label} htmlFor="step_input_image">{label}</label>
            <label className={s.input_picture_step}>
                <input  
                    type="file" 
                    onChange={(e) => { 
                        image = e.target.files[0];
                        onChange(image); 
                    }} />
                <span className={`is-outline-btn-orange ${s.btn_load_image}`}>
                    <div>Загрузить</div>
                    <FontAwesomeIcon className={s.btn_load_image_icon} icon={faImage}/>    
                </span>
                {
                    stepImageForDisplay &&
                    <img src={stepImageForDisplay} className={s.step_loaded_img} alt="" />
                } {
                    stepImageForDisplay &&
                    <div className={s.btn_delete_step_image} onClick={(e) => {
                        e.preventDefault(); // Отменяет нажатие на инпут
                        setStepImageForDisplay();
                        onChange(null);
                    } }>
                        <FontAwesomeIcon className={s.icon_delete_step_image} icon={faXmark}/>
                    </div>
                }
            </label>
        </div>
    )
};

export default InputFileImage;
