import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { fetchMeasures, fetchIngredients } from 'store/dishSlice'
import {client} from "utils/Api";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import Input from 'components/UI/input/Input'
import Textarea from 'components/UI/textarea/Textarea'
import Button from 'components/UI/button/Button'
import InputFileImage from 'components/UI/inputFileImage/InputFileImage'
import s from './styles/CreateDish.module.css'

import StepDish from "components/StepDish/StepDish";
import RecipeDish from "components/RecipeDish/RecipeDish";

const CreateDish = () => {
    const history = useNavigate();
    const isAuth = useSelector(state => state.users.isLogin);
    if (isAuth === false) {
        history('/login');        
    }

    const sendDish = async (e) => {
        try {
            e.preventDefault();

            const dishData = dish;

            dishData.recipes = [];
            for (let i in dishRecipes) {
                dishData.recipes.push({
                    ...dishRecipes[i], 
                    order_number: i + 1
                });
            }

            dishData.steps = steps;
            const dishData_str = JSON.stringify(dishData);

            const data = new FormData();
            data.append('dish', dishData_str);
            data.append('dish_picture', dishPicture);
            
            for (let i in stepImages) {
                if (stepImages[i]) {
                    console.log(`imageStep${Number(i) + 1}`);
                    data.append(`imageStep${Number(i) + 1}`, stepImages[i]);
                }
            }
            const token = localStorage.getItem('token')
            client.formData('dishes', data, { Authorization: `Bearer ${token}` });
            //history('/')
        } catch (e) {
            console.log(e);
        }

    }

    //------RECIPE_PICTURE-------
    const [dishPicture, setDishPicture] = useState(null);
    const user = useSelector(state => state.users.user);
    const [dish, setDish] = useState({
        title: '',
        description: '',
        user_id: null,
    });
    useEffect(() => {
        setDish(dish => ({...dish, user_id: user.id}))
    }, [user]);

    //------RECIPES-------
    const dispatch = useDispatch();
    const [measures, setMeasures] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        dispatch(fetchMeasures()).then(res => setMeasures(res.payload));
        dispatch(fetchIngredients()).then(res => setIngredients(res.payload));
    }, []);

    const [dishRecipes, setDishRecipes] = useState([{
        ingredient_id: null,
        quantity: null,
        measure_id: null,
    }]);


    useEffect(() => {
        if (dishRecipes.length && measures.length) {
            dishRecipes.map(recipe => recipe.measure_id = measures[0].id);
            setDishRecipes([...dishRecipes])
        }
    }, [measures])

    const addRecipe = () => {
        setDishRecipes([...dishRecipes, {
            ingredient_id: null,
            quantity: null,
            measure_id: measures[0].id,
        }])
    }

    const deleteRecipe = (index) => {
        dishRecipes.splice(index, 1);
        setDishRecipes([...dishRecipes]);
    }

    //--------------STEPS---------------
    const [stepImages, setStepImages] = useState([]);
    const [steps, setSteps] = useState([
        {
            step_number: 1,
            description: null
        }
    ]);

    const addStep = () => {
        setSteps([...steps, {
            step_number: steps.length + 1,
            description: null
        }])
    }

    const changeStep = (stepImage, index) => {
        setSteps([...steps]);
        stepImages[index] = stepImage;
        setStepImages([...stepImages]);
    }

    const deleteStep = (index) => {
        steps.splice(index, 1);
        setSteps([...steps]);
        stepImages.splice(index, 1);
        setStepImages([...stepImages]);
    }

    return (
        <section>
            <form className={s.create_dish_form} onSubmit={sendDish}>
                <div className={s.field}>
                    <h2>Добавление рецепта</h2>

                    <Input 
                        label="Название блюда:"
                        id="dishName" 
                        value={dish.title} 
                        onChange={e => { setDish({...dish, title: e.target.value}) }}/>    

                    <Textarea 
                        label="Краткое описание:"
                        id="dishDescription" 
                        value={dish.description} 
                        onChange={(e) => { setDish({...dish, description: e.target.value}) }} />

                    <InputFileImage 
                        className={s.input_picture_dish}
                        label="Фото готового блюда"
                        image={dishPicture}
                        onChange={(image) => {setDishPicture(image)}} />   
                </div>

                <div className={s.field}>
                    <h4>Ингредиенты:</h4>
                    
                    {
                    dishRecipes.map((recipe, index) => {
                        return <RecipeDish 
                            key={index} 
                            recipe={recipe} 
                            index={index} 
                            ingredients={ingredients} 
                            measures={measures}
                            onChange={(recipe, index) => {
                                dishRecipes[index] = recipe;
                                setDishRecipes([...dishRecipes])
                            }}
                            onDelete={index => deleteRecipe(index)} />
                    })
                    }

                    <Button 
                        icon={faPlus}
                        myStyle={`is-btn-green`} 
                        onClick={() => addRecipe()}>
                        Добавить ингредиент
                    </Button>
                </div>

                <div className={s.field}>
                    <h4>Шаги:</h4>
                    {
                    steps.map((step, index) => {
                        return <StepDish 
                            key={index} 
                            step={step} 
                            index={index}
                            stepImage={stepImages[index]} 
                            onChange={(stepImage, index) => {
                                changeStep(stepImage, index)
                            }}
                            onDelete={(index) => {deleteStep(index)}}/>
                    })
                    }
                    <Button 
                        icon={faPlus}
                        myStyle={`is-btn-green`} 
                        onClick={() => addStep()}>
                        Добавить шаг
                    </Button>
                </div>

                <Button 
                    myStyle={`is-btn-orange ${s.btn_submit}`} 
                    type="submit" 
                    onClick={(e) => sendDish(e)}>
                    Создать рецепт
                </Button>
            </form>
        </section>
    )
}
 
export default CreateDish
