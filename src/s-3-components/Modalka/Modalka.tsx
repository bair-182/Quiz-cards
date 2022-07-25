import React, {FC} from "react";
import s from "./Modalka.module.css"



type PropsType = {
    active: boolean;
    setActive: (active: boolean)=> void
    children?: React.ReactNode
}

const Modalka: React.FC<PropsType> = (props:PropsType) => {

    const handleClose = () => {
        props.setActive(false)
    }

    return (

            <div className={props.active ? s.modalkaActive : s.modalka} onClick={handleClose}>
                <div className={props.active ? s.modalka__contentActive : s.modalka__content} onClick={(e)=>e.stopPropagation()}>

                    <div className={s.modalkaChildren}>
                        {props.children}
                    </div>
                </div>
            </div>
    );
};

export default Modalka;