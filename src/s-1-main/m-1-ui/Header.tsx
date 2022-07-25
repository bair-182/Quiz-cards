import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {
    SIGN_IN_PATH, REGISTER_PATH, FORGOT_PATH,
    PROFILE_PATH, ERROR404_PATH, RECOVER_PASSWORD_PATH, NEW_PASSWORD_PATH, SUPER_COMPONENTS_PATH, PACKS_PATH, CARDS_PATH
} from "./Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../m-2-bll/store";
import {LogOutThunk} from "../../s-2-features/f-1-authorization/a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";
import SuperButton from "../../s-3-components/c2-SuperButton/SuperButton";
import {setAppErrorAC} from "../m-2-bll/app-reducer";
import s from "./Header.module.css"
import PackImg from "./../../assets/images/PacksListImg.png"
import ProfileImg from "./../../assets/images/ProfileImg.png"

const Header: React.FC = () => {

    //react-REDUX
    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<IAppStore, boolean>(state => state.login.isLoggedIn)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);

    //react-router v6
    let navigate = useNavigate();
    const routeChange = (newPath: string) => {
        navigate(newPath)
    }

    const logOutHandler = () => {
        dispatch(LogOutThunk())
    }

    const isLoggedInHandler = () => {
        if (!isLoggedIn) {
            dispatch(setAppErrorAC("You are not authorized. Please log in"))
        }
    }

    return (
        <div className={s.header}>
            <div className={s.headerLogoButton}>
                {isLoggedIn &&
                    <div><SuperButton onClick={logOutHandler} disabled={isLoading}>LOGOUT</SuperButton></div>}
                {!isLoggedIn &&
                    <>
                        <SuperButton onClick={() => routeChange(SIGN_IN_PATH)} disabled={isLoading}>LOGIN</SuperButton>
                        <SuperButton onClick={() => routeChange(REGISTER_PATH)}
                                     disabled={isLoading}>REGISTER</SuperButton>
                    </>}
            </div>
            {/*<SuperButton onClick={() => routeChange(RECOVER_PASSWORD_PATH)} disabled={isLoading}>*/}
            {/*    recover password*/}
            {/*</SuperButton>*/}
            {/*<SuperButton onClick={() => routeChange(NEW_PASSWORD_PATH)} disabled={isLoading}>*/}
            {/*    new password*/}
            {/*</SuperButton>*/}
            <div className={s.nav}>
                {/*{!isLoggedIn && <NavLink to={SIGN_IN_PATH}>sign-in</NavLink>}*/}
                {/*<NavLink to={REGISTER_PATH}>Register</NavLink>*/}
                {/*<NavLink to={FORGOT_PATH}>forgot</NavLink>*/}
               <NavLink to={PACKS_PATH}> <img src={PackImg}/>Packs</NavLink>
                {/*<NavLink to={CARDS_PATH}>Cards</NavLink>*/}
                <NavLink to={PROFILE_PATH} onClick={isLoggedInHandler}><img src={ProfileImg}/>Profile</NavLink>
                {/*<NavLink to={ERROR404_PATH}>error404</NavLink>*/}
                {/*<NavLink to={RECOVER_PASSWORD_PATH}>recover password</NavLink>*/}
                {/*<NavLink to={NEW_PASSWORD_PATH}>new password</NavLink>*/}
                {/*<NavLink to={SUPER_COMPONENTS_PATH}>super components</NavLink>*/}
            </div>
        </div>
    );
};

export default Header;
