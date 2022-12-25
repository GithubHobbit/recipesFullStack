import { React } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/userSlice";
import Button from 'components/UI/button/Button'
import s from "./Navbar.module.css";


const Navbar = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.users.isLogin);

    const Logout = async () => {
        dispatch(logout());
        history("/login");
    }
 
    return (
        <div className={s.nav_container}>
            <nav className={s.nav}>
                <div className={s.nav_start}>
                    <Link to="/">
                        <img className={s.nav_logo} src="/images/logo.png" alt="logo" />                    
                    </Link>
                    
                    <Link to="/dashboard">Home</Link>
                    <Link to="/create_dish">Create dish</Link>
                    <Link to="/dishes">All dishes</Link>
                </div>

                <div className={s.nav_end}>
                    { !isLogin ? (
                            <div className={s.buttons}>
                                <Link className={s.header_button} to="/register">
                                    <Button myStyle={`is-btn-violet`}>Регистрация</Button>
                                </Link>

                                <Link className={s.header_button} to="/login">
                                    <Button myStyle={`is-btn-vinous ${s.header_button}`}>Вход</Button>
                                </Link> 
                            </div>
                    ) : (
                        <div className={s.buttons}>
                            <Button myStyle={`is-btn-violet`} onClick={Logout}>
                                Log Out
                            </Button>
                        </div>

                    )}
                </div>
            </nav>
        </div>
    )
}
 
export default Navbar