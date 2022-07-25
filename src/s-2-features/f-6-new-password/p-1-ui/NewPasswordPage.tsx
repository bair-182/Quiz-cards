import React, {MouseEvent, useState} from "react";
import {Button, TextField} from "@mui/material";
import styled from "styled-components";
import {ForgotAPI} from "../../f-1-authorization/a-3-forgot/f-3-dal/ForgotAPI";
import {useNavigate, useParams} from "react-router-dom";
import {SIGN_IN_PATH} from "../../../s-1-main/m-1-ui/Routing";

interface INewPasswordProps {

}

const NewPasswordPage: React.FC<INewPasswordProps> = () => {

    const [pass, setPass] = useState("")
    const params = useParams();
    const navigate = useNavigate()
    const createNewPassword = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        ForgotAPI.setNewPass(pass, params.token!)
            .then(res => {
                navigate(SIGN_IN_PATH)
            })
    }
    return (
        <SignInStyled>
            <h3>Create new password</h3>
            <form name={"login"}>
                <TextField type="text"
                           name={"email"}
                           label={"enter new password"}
                           value={pass}
                           variant="standard"
                           onChange={(e) => setPass(e.currentTarget.value)}
                />
                <p>Create new password and we will send you further instructions to email</p>
                <Button type={"submit"}
                        onClick={createNewPassword}
                        variant="contained"
                >
                    Create new password
                </Button>
            </form>
        </SignInStyled>
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
export default NewPasswordPage;
