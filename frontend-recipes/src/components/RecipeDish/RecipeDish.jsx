import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import Dropdown from "components/UI/inputDropdown/Dropdown";
import Input from "components/UI/input/Input";
import Button from "components/UI/button/Button";
import Select from "components/UI/select/Select";
import s from './RecipeDish.module.css'

const RecipeDish = ({ recipe, ingredients, measures, index, onChange, onDelete }) => {
    return (
        <div className={s.row}>
            <Dropdown 
                className={`${s.column} ${s.column_ingredient}`} 
                data={ingredients} 
                value={recipe.ingredient_id}
                setItem={(id) => { 
                    recipe.ingredient_id = id;
                    onChange(recipe, index);
                }} />

            <Input 
                className={`${s.column}  ${s.column_count}`} 
                placeholder="Количество" 
                value={recipe.quantity || ''}
                onChange={(e) => {
                    recipe.quantity = Number(e.target.value);
                    onChange(recipe, index);
                }} />

            <Select 
                className={`${s.column} ${s.column_measure}`} 
                items={measures}
                value={recipe.measure_id || ''}
                onChange={(e) => { 
                    recipe.measure_id = Number(e.target.value);
                    onChange(recipe, index);
                }} />
            <Button 
                type="button" 
                myStyle={`is-outline-btn-red ${s.column}  ${s.btn_delete_recipe}`} 
                onClick={() => onDelete(index)}
                icon={faDeleteLeft} />
        </div>
    )
};

export default RecipeDish;