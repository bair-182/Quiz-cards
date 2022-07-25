import React, {MouseEvent, useState} from "react";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {RegisterThunk} from "../../a-1-sign-in/s-2-bll/b-2-redux/signIn-reducer";
import {ErrorSnackbar} from "../../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import SuperInputText from "../../../../s-3-components/c1-SuperInputText/SuperInputText";
import s from './Register.module.css'
import companyLogo from "../../../../assets/images/snorlax2.png";
import {setAppErrorAC} from "../../../../s-1-main/m-2-bll/app-reducer";

interface IRegisterProps {

}

const Register: React.FC<IRegisterProps> = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useAppDispatch()
    const isAppLoading = useSelector<IAppStore, boolean>(state => state.app.isLoading)
    const error = useSelector<IAppStore, string | null>(state => state.app.appError)


    const buttonOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        dispatch(RegisterThunk(email, password))
    }

    //redirect to profile
    

    return (
        <div>
            {(error) && (
                <span>
                    <ErrorSnackbar />
                </span>
            )}
            <form name={"register"} className={s.authContainer}>
                <img src={companyLogo}/>
                <h3>Registration</h3>
                <SuperInputText
                        className={s.input}
                        type="text"
                       name={"email"}
                       placeholder={"enter your email"}
                       value={email}
                       onChange={(e) => setEmail(e.currentTarget.value)}/>
                <div>
                    <SuperInputText className={s.input}
                                    type="text"
                                    name={"password"}
                                    placeholder={"enter your password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.currentTarget.value)}/>
                </div>
                <div>
                    <SuperButton type={"submit"}
                                 onClick={(e)=>buttonOnClickHandler(e)}
                                 disabled={isAppLoading}
                    >
                        sign up
                    </SuperButton>
                </div>

            </form>
        </div>
    );
};

export default Register;
