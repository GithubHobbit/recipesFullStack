import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { login } from 'store/userSlice'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import Notification from 'components/UI/notification/Notification'
import Input from 'components/UI/input/Input'
import Button from 'components/UI/button/Button'
import s from "./styles/Login.module.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    
    const history = useNavigate();
    const dispatch = useDispatch();

    

    const Login = async (e) => {
        try {
            e.preventDefault();
            await dispatch(login({email, password})).unwrap(); 
            history("/dashboard");
        } catch (e) {
            setErr(e.message);
            console.log(e)
        }
    }

    return (
        <form className={`${s.form} ${s.form_in_center} `} onSubmit={Login}>
                <h2 className={s.formTitle}>Вход</h2>
                { 
                err &&        
                <Notification onClick={() => setErr('')}>
                    {err}
                </Notification>
                }
                
                <Input 
                    label="Почта"
                    icon={faEnvelope}
                    type="email" 
                    placeholder="Email" 
                    id="emailField" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} />

                <Input 
                    label="Пароль"
                    icon={faLock}
                    type="password" 
                    placeholder="password" 
                    id="passwordField" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}/>    
                
                <Button myStyle={`is-btn-green`} type="submit">Войти</Button>
        </form>
    )
}
 
export default Login