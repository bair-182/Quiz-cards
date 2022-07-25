import React, {MouseEvent, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {PROFILE_PATH, RECOVER_PASSWORD_PATH, SIGN_IN_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {Alert, Button, Checkbox, FormControlLabel, Snackbar, TextField} from "@mui/material";
import styled from "styled-components";
import {ForgotAPI} from "../f-3-dal/ForgotAPI";
import {useDispatch} from "react-redux";
import {setRecoveryEmail} from "../f-2-bll/b-2-redux/forgotReducer";

interface IForgotProps {

}

const ForgotPage: React.FC<IForgotProps> = (
    {}
) => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const buttonOnClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        ForgotAPI.forgot(email)
            .then(res => {
                dispatch(setRecoveryEmail(email))
                navigate(RECOVER_PASSWORD_PATH)
            })
            .catch(error => {
                setError(true)
            })

    }
    return (
        <>
            <SignInStyled>
                <h3>Forgot your password?</h3>
                <form name={"login"}>
                    <TextField type="text"
                               name={"email"}
                               placeholder={"enter your email"}
                               value={email}
                               variant="standard"
                               onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                    <p>Enter your email address and we will send you further instructions</p>
                    <Button type={"submit"}
                            onClick={buttonOnClickHandler}
                            variant="contained"
                    >
                        send instructions
                    </Button>
                </form>
                <p>Did you remember your password?</p>
                <Button onClick={() => navigate(SIGN_IN_PATH)}>
                    Try logging in
                </Button>
            </SignInStyled>
            <Snackbar open={error} autoHideDuration={6000} onClose={() => setError(false)}>
                <Alert severity="error" sx={{width: "100%"}}>
                    Not correct email /ᐠ-ꞈ-ᐟ\\"
                </Alert>
            </Snackbar>
        </>
    );
};

export const SignInStyled = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 10px;

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 350px;
    min-height: 400px;
    gap: 20px;

    input {
      padding: 10px;
    }
  }
`

export default ForgotPage;
