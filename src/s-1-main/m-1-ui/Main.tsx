import React from 'react';
import Header from "./Header";
import Routing from "./Routing";
import s from './Main.module.css'

// headers, routes, footers
const Main: React.FC = () => {
    return (
        <div className={s.mainContainer}>
            <Header/>
            <Routing/>
        </div>
    );
};

export default Main;