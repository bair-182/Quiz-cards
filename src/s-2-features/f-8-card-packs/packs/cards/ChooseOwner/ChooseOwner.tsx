 import React from 'react';
// import {useDispatch, useSelector} from 'react-redux';
// import s from './ChooseOwner.module.scss';

// import {RootStateType} from "../../../../../s-1-main/m-2-bll/store";
// import {setCardsPacksCountFromRangeAC} from "../../packs-reducer";
//
// export const ChooseOwner = React.memo(() => {
//     const dispatch = useDispatch()
//     const withMyId = useSelector<RootStateType, boolean>(state => state.packs.)
//
//     return <div className={s.ChooseOwner}>
//         <div className={s.Choose__text}><b>Show packs cards</b></div>
//         <button className={
//             withMyId
//                 ? `${s.active} ${s.Choose__button}`
//                 :  s.Choose__button
//         }
//                 onClick={() => {
//                     dispatch(setWithMyIdAC(true))
//                     dispatch(setCardsPacksCountFromRangeAC([0,1000]))
//
//                 }
//                 }>My
//         </button>
//         <button className={
//             !withMyId
//                 ? `${s.active} ${s.Choose__button}`
//                 :  s.Choose__button
//         }
//                 onClick={() => {
//                     dispatch(setWithMyIdAC(false))
//                     dispatch(setCardsPacksCountFromRangeAC([0,1000]))
//
//                 }}>All
//         </button>
//     </div>
// })