import { useEffect, useState } from "react";
import Input from "components/UI/input/Input";
import s from "./Dropdown.module.css"

const Dropdown = ({data, setItem, value, className }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [itemList, setItemList] = useState([]);
    const [itemFilter, setItemFilter] = useState('');
    const filterItems = (filter) => {
        setItemFilter(filter);
        setItemList(
            data.filter(({ name }) => 
                name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
            )
        )
    }

    useEffect(() => {
        if (data.length) {
            const item = data.find(item => item.id === value);
            item ? 
                setItemFilter(item.name) :
                setItemFilter('');
        }
    }, [value])

    const set = (id, name) => {
        setIsDropdownOpen(false);
        setItemFilter(name);
        setItem(id);
    }

    return (
        <div className={`${className} ${s.dropdown}`}>
            <Input 
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={() => setIsDropdownOpen(false)}
                myStyle={s.dropdown_ingredient_input} 
                placeholder='Ингридиент' 
                value={itemFilter} 
                onChange={e => filterItems(e.target.value)} />
            
            {
            (itemList.length > 0 && itemFilter.length > 0 && isDropdownOpen === true) &&
            (<div className={s.dropdown_content} onClick={(e) => { set(e.target.innerText) }}>
                {
                itemList.map(item => (
                    <div key={item.id} className={s.dropdown_ingredient} onMouseDown={(e) => { set(item.id, item.name) }}>
                        {item.name}
                    </div>
                ))
                }
            </div>)
            }
        </div>
        
    )
}

export default Dropdown;

