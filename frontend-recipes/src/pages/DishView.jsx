import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchDish } from "store/dishSlice";
import s from "./styles/DishView.module.css"

const DishView = () => {
    const params = useParams();
    const id = params.id;
    const [dish, setDish] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDish(id))
            .then((res) => setDish({...res.payload}))
            .catch(e => console.log(e));
    }, [])

    useEffect(() => {
        console.log(dish)
    }, [dish]);

    return (
        dish &&
        <div className={s.dish_content}>
            <div class={s.form}>
                <h2 className={s.title}>{dish.title}</h2>
                <img className={s.dish_img} src={`data:image/jpeg;base64,${dish.picture}`} alt="" />

                <div className={s.user}>
                    <img className={s.avatar_img} 
                        src={dish.avatar ? 
                            `data:image/jpeg;base64,${dish.avatar}` :
                            "/images/default_avatar.jpg"
                        } />
                    <div className={s.user_data}>
                        <div className={s.username}>{dish.username}</div>
                        <div className={s.created}>{dish.created}</div>
                    </div>
                </div>
                
                <div className={s.description}>
                    {dish.description}
                </div>

                <h2>Ингредиенты</h2>
                <div className={s.recipes}>
                    {
                    dish.recipes.map(recipe => {
                        return (
                            <div key={recipe.order_number} className={s.recipe}>
                                <span className={s.ingredient}>{recipe.ingredient}</span>
                                <span className={s.quantity}> &mdash; {recipe.quantity}</span>
                                <span className={s.measure}>{recipe.measure}</span>
                            </div>
                            
                        )
                    })
                    }
                </div>
            </div>
            
            <h2>Шаги</h2>
            <div className={s.steps}>
                    {
                    dish.steps.map(step => {
                        return (
                            <div class={s.form}>
                                <div key={step.step_number} className={s.step}>
                                    <div className={s.step_order}># ШАГ {step.step_number}/{dish.steps.length}</div>
                                    {
                                        step.picture &&
                                        <img className={s.step_img} src={`data:image/jpeg;base64,${step.picture}`} alt="" />
                                    }
                                    <div className={s.step_description}>{step.description}</div>
                                </div>
                            </div>
                        )
                    })
                    }
            </div>
        </div>
    );
}


export default DishView;