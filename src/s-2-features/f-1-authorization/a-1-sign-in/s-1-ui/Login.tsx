import React, {useState, MouseEvent} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";
import {FORGOT_PATH, PROFILE_PATH, REGISTER_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {LoginThunk} from "../s-2-bll/b-2-redux/signIn-reducer";
import {ErrorSnackbar} from "../../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import SuperInputText from "../../../../s-3-components/c1-SuperInputText/SuperInputText";
import s from "./LogIn.module.css"
import SuperCheckbox from "../../../../s-3-components/c3-SuperCheckbox/SuperCheckbox";
import companyLogo from "../../../../assets/images/snorlax.png"
import {Button} from "@mui/material";
import PikachuLoading from "../../../../s-3-components/PikachuLoading";

const Login = React.memo(() => {
    const [email, setEmail] = useState("qwdqwd@wwerer.ru");
    const [password, setPassword] = useState("qwerty182");
    const [rememberMe, setRememberMe] = useState(true);

    // Глазик для пароля
    const [eye, setEye] = useState(false)

    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);

    const error = useSelector<IAppStore, string | null>((state) => state.app.appError);
    const dispatch = useAppDispatch();
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(LoginThunk(email, password, rememberMe));
    };

    const navigate = useNavigate()

    return (
        isLoggedIn
            ?
            <Navigate to={PROFILE_PATH}/>
            :
            <div className={s.authContainer}>
                {isLoading ? <PikachuLoading/> : ""}
                {(error) && (
                    <span>
                        <ErrorSnackbar severity={"error"}/>
                    </span>
                )}
                <img src={companyLogo}/>
                <h3>Login</h3>
                <>
                    <div>
                        <div>
                            <label> Email <br/>
                                <SuperInputText
                                    className={s.input}
                                    value={email}
                                    type="email"
                                    name="email"
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                />
                            </label>
                        </div>
                        <div>
                            <label>Password<br/>
                                <SuperInputText
                                    className={s.input}
                                    value={password}
                                    type={!eye ? "password" : "text"}
                                    name="password"
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                />
                            </label>
                        </div>


                        <div>
                            <SuperCheckbox
                                type="checkbox"
                                name="passEye"
                                onChange={(e) => setEye(e
                                    .currentTarget.checked)}
                            > Показать пароль
                            </SuperCheckbox>
                        </div>
                        <div>
                            <SuperCheckbox
                                type="checkbox"
                                name="rememberMe"
                                onChange={(e) => setRememberMe(e
                                    .currentTarget.checked)}
                            > Remember Me
                            </SuperCheckbox>
                        </div>
                    </div>
                    <div>
                        <Button onClick={() => navigate(FORGOT_PATH)}>
                            Forgot password
                        </Button>
                    </div>
                    <div>
                        <SuperButton
                            onClick={(e) => handleSubmit(e)}
                            disabled={isLoading}
                        >
                            Login
                        </SuperButton>
                    </div>
                </>
                <p>Don't have an account?</p>
                <div>
                    <Button onClick={() => navigate(REGISTER_PATH)} color={"secondary"} variant={"outlined"}>
                        Sign Up
                    </Button>
                </div>

            </div>
    );
});

export default Login;