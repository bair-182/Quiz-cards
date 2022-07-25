import {instance} from "../../../../base-url";

export interface IForgotData {

}

export const ForgotAPI = {
    forgot(email: string) {
        return instance.post("auth/forgot", {
            email: email, // кому восстанавливать пароль
            from: "test-front-admin <ai73a@yandex.by>",
            // можно указать разработчика фронта)
            message: `
    <div style="background-color: lime; padding: 15px">
    password recovery link: 
    <a href='https://fogelo.github.io/cards-nya/#/set-new-password/$token$'>link</a>
    </div>
` // хтмп-письмо, вместо $token$ бэк вставит токен
// 'http://localhost:3000/#/set-new-password/$token$'
        })
    },
    setNewPass(password: string, resetPasswordToken: string) {
        return instance.post("auth/set-new-password", {password, resetPasswordToken})
    }
};
