import * as React from 'react';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RangeSlider} from './RangeSlider';
import {setCardsPacksCountFromRangeAC} from "../../packs-reducer";
import {RootStateType} from "../../../../../s-1-main/m-2-bll/store";



export const RangeSliderContainer = React.memo(() => {
    const dispatch = useDispatch()
    const maxCardsCount = useSelector<RootStateType, number>(state => state.packs.maxCardsCount)
    const minCardsCount = useSelector<RootStateType, number>(state => state.packs.minCardsCount)


    const onChangeCommitted = useCallback((values: number[]) => {
        dispatch(setCardsPacksCountFromRangeAC(values))
    }, [dispatch])

    return (<RangeSlider
            onChangeCommitted={onChangeCommitted}
            maxCardsCount={maxCardsCount}
            minCardsCount={minCardsCount}
        />
    );
})