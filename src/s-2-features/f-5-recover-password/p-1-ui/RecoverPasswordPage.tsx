import React from "react";
import styled from "styled-components";
import recoveryImg from "../../../assets/images/recovery-pass.png"
import {useSelector} from "react-redux";
import {IAppStore} from "../../../s-1-main/m-2-bll/store";

interface IRecoverPasswordProps {

}

const RecoverPasswordPage: React.FC<IRecoverPasswordProps> = () => {

    const recoveryEmail = useSelector<IAppStore, string>(state => state.forgot.recoveryEmail)

    return (
        <SignInStyled>
            <div>
                <img src={recoveryImg} alt=""/>
            </div>
            <h3>
                Check Email
            </h3>
            <p>
                We’ve sent an Email with instructions to {recoveryEmail ? recoveryEmail : "some@yandex.by"}
            </p>
        </SignInStyled>
    );
};

export const SignInStyled = styled.div`
  background-color: white;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  border-radius: 10px;

  p {
    text-align: center;
    max-width: 300px;
  }
`;

export default RecoverPasswordPage;
