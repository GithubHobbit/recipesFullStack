import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-regular-svg-icons'
import Textarea from "components/UI/textarea/Textarea";
import Button from "components/UI/button/Button";
import InputFileImage from "components/UI/inputFileImage/InputFileImage";
import s from './StepDish.module.css'

const StepDish = ({ step, index, stepImage, onChange, onDelete }) => {
    return (
        <div className={s.row}>
            <Textarea 
                className={`${s.column} ${s.column_step_description}`}
                myStyle={s.description}
                label="Описание"
                id="step_description" 
                placeholder='1'
                value={step.description || ''} 
                onChange={(e) => {
                    step.description = e.target.value;
                    onChange(stepImage, index);
                }} />

            <InputFileImage 
                label="Фото"
                className={`${s.column} ${s.column_step_image}`} 
                image={stepImage}
                onDelete={() => {onDelete(index)}}
                onChange={(image) => {onChange(image, index)}} />
            
            <div className={`${s.column} ${s.column_step_btn_delete}`}>
                <label className={`${s.hide_label} label`}>hide</label>
                <Button type="button" myStyle={`is-outline-btn-red ${s.btn_delete_step}`} onClick={() => {onDelete(index)}}>
                    <FontAwesomeIcon icon={faDeleteLeft} />
                </Button>
            </div>
        </div>
    )
};

export default StepDish;