import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart } from '@fortawesome/free-regular-svg-icons'
import { fetchDishes, getDishesCount } from "store/dishSlice";
import s from "./styles/DishesView.module.css"
import Pagination from 'components/Pagination/Pagination';
import DownloadWindow from 'components/UI/downloadWindow/DownloadWindow';

const DishesView = () => {
    const dispatch = useDispatch();
    const [dishes, setDishes] = useState([]);
    const [page, setPage] = useState(1);
    const [dishesCount, setDishesCount] = useState(0);
    let items = 3;

    useEffect(() => {
        console.log(page);
        const start = page * items - items;
        dispatch(fetchDishes({start, items})).then((res) => {setDishes(res.payload)});
        dispatch(getDishesCount()).then((res) => {
            setDishesCount(res.payload);    
        })
    }, [page]);

    return (
        <div className={s.container_cards}>
            {(!dishes && !dishesCount) && <DownloadWindow />}
            
            <div className={s.cards}>
            {
                dishes && 
                dishes.map(dish => {
                    return (
                        <div key={dish.id} className={s.card}>
                            {/* <div>{dish.id}</div> */}
                            <Link to={`/dishes/${dish.id}`}>
                                <div className={s.container_dish_img}>
                                    <img className={s.dish_img} src={`data:image/jpeg;base64,${dish.picture}`} alt="" />
                                </div>
                            </Link>
                            <div className={s.body}>
                                <div className={s.content}>
                                    <Link to={`/dishes/${dish.id}`}>                            
                                        <h3 className={s.dish_title}>{dish.title}</h3>
                                    </Link>
                                    <div className={s.ingredients}>
                                        <span style={{fontWeight: "500"}}>Ингридиенты: </span> 
                                        { 
                                        dish.ingredients.map((ingredient) => {
                                            return (
                                                <Link key={ingredient.order_number} className={s.ingredient} to='/'>
                                                    {ingredient.name}
                                                </Link>
                                            )
                                        })
                                        } 
                                    </div>
                                </div>

                                <div className={s.user}>
                                    <img className={s.avatar_img} 
                                        src={dish.avatar ? 
                                            `data:image/jpeg;base64,${dish.avatar}` :
                                            "/images/default_avatar.jpg"
                                        }/>
                                    <div className={s.user_data}>
                                        <div className={s.username}>{dish.username}</div>
                                        <div className={s.created}>{dish.created}</div>
                                    </div>
                                </div>
                            </div>
                            <div className={s.footer}>
                                <div className={s.views}>
                                    <FontAwesomeIcon icon={faEye} />
                                    <div>123</div>
                                </div>
                                <div className={s.likes}>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <div>12</div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }        
            </div>

            <Pagination 
                listCount={7}
                currentPage={page}
                pages={Math.ceil(dishesCount / items)}
                onClick={e => setPage(e)}/>

        </div>
    )
}
export default DishesView