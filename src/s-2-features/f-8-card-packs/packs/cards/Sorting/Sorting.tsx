import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {SortingItem} from './SortingItem';
import s from './Sorting.module.css';
import {RootStateType} from "../../../../../s-1-main/m-2-bll/store";
import {SortingPacksType} from "../../PacksAPI";
import {setSortPacksValueAC} from "../../packs-reducer";


export const Sorting = React.memo(() => {
    const dispatch = useDispatch()
    const [isNameArrowUp, setNameArrowUp] = useState<boolean>(false);
    const [isCardsArrowUp, setCardsArrowUp] = useState<boolean>(false);
    const [isLastUpdatedArrowUp, setLastUpdatedArrowUp] = useState<boolean>(false);

    const sortBy = useSelector<RootStateType,  SortingPacksType >(state =>state.packs.params.sortPacks)

    // useEffect(() => {
    //     // return () => {
    //     //     dispatch(setSortPacksValueAC('0updated'))
    //     // }
    // }, [])

    return (
        <div className={s.sortingPage}>
            <span> <h4> Sort </h4> </span>
            <div className={s.sortingItemsWrapper}>

                <SortingItem isArrowUp={isNameArrowUp}
                             setArrowUp={setNameArrowUp}
                             dispatch={dispatch}
                             title={'Name'}
                             setSortPacksValues={['0name', '1name']}
                             sortBy={sortBy}
                />

                <SortingItem isArrowUp={isCardsArrowUp}
                             setArrowUp={setCardsArrowUp}
                             dispatch={dispatch}
                             title={'Cards amount'}
                             setSortPacksValues={['0cardsCount', '1cardsCount']}
                             sortBy={sortBy}
                />

                <SortingItem isArrowUp={isLastUpdatedArrowUp}
                             setArrowUp={setLastUpdatedArrowUp}
                             dispatch={dispatch}
                             title={'Update date'}
                             setSortPacksValues={['0updated', '1updated']}
                             sortBy={sortBy}
                />
                <div
                    className={s.resetSortingFilter}
                    onClick={() => dispatch(setSortPacksValueAC("0updated"))}
                ><button className={s.resetSortingButton}>Reset sorting</button></div>
            </div>
        </div>
    )

})