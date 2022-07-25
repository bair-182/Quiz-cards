import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "./s-1-main/m-2-bll/store";
import Main from "./s-1-main/m-1-ui/Main";
import {initializeAppTC} from "./s-1-main/m-2-bll/app-reducer";
import pikachu from "../src/assets/images/pikachu.gif"
import PikachuLoading from "./s-3-components/PikachuLoading";

// add context
const App: React.FC = () => {

    //react-REDUX
    const dispatch = useAppDispatch();
    const isAppInitialized = useSelector<IAppStore, boolean>(state => state.app.isAppInitialized)


    // хук эффекта сюда
    useEffect(() => {
        dispatch(initializeAppTC(true))
    }, [dispatch])

    if (!isAppInitialized) {
        return <PikachuLoading/>
    }

    return (
        <div>
            <Main/>
        </div>
    );
};

export default App;
