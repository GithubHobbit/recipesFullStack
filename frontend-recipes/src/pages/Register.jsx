import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registration } from "store/userSlice"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import Notification from 'components/UI/notification/Notification'
import Input from 'components/UI/input/Input'
import Button from 'components/UI/button/Button'
import s from './styles/Register.module.css'

const Register = () => {
    const [username, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');

    
    const history = useNavigate();
    const dispatch = useDispatch();

    const Register = async (e) => {
        try {
            e.preventDefault();
            await dispatch(registration({username, email, password})).unwrap();  
            history("/login");
        } catch (e) {
            setErr(e.message);
            console.log(e)
        }
    }

    return (
        <form className={`${s.form} ${s.form_in_center} `} onSubmit={Register}>
            <h2 className={s.formTitle}>Регистрация</h2>
            { 
            err &&        
            <Notification onClick={() => setErr('')}>
                {err}
            </Notification>
            }

            <Input 
                label="Имя"
                icon={faUser}
                type="text" 
                placeholder="Username" 
                id="nameField" 
                value={username} 
                onChange={e => setName(e.target.value)} />

            <Input 
                label="Почта"
                type="email" 
                icon={faEnvelope}
                placeholder="Email" 
                id="emailField" 
                value={email} 
                onChange={e => setEmail(e.target.value)} />

            <Input 
                label="Пароль"
                type="password" 
                icon={faLock}
                placeholder="password" 
                id="passwordField" 
                value={password} 
                onChange={e => setPassword(e.target.value)} />
            
            <Button myStyle={`is-btn-green`} type="submit">Войти</Button>
        </form>
    )
}
 
export default Register