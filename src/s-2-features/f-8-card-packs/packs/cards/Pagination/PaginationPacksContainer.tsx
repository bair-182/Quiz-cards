import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pagination} from './Paginationn';
import {RootStateType} from "../../../../../s-1-main/m-2-bll/store";
import {setCardPacksCurrentPageAC, setCardPacksPageCountAC} from "../../packs-reducer";



export const PaginationPacksContainer = React.memo(() => {
    const dispatch = useDispatch()
    const pageCount = useSelector<RootStateType, number>(state => state.cards.params.pageCount)
    const cardPacksTotalCount = useSelector<RootStateType, number>(state => state.packs.cardPacksTotalCount)
    const page = useSelector<RootStateType, number>(state =>state.packs.params.page)

    const currentPageHandler = (page: number) => {
        dispatch(setCardPacksCurrentPageAC(page))
    }

    const onChangeOption = (value: number) => {
        dispatch(setCardPacksPageCountAC(value))
    }

    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onChangeOption={onChangeOption}
        page={page}
        currentPageHandler={currentPageHandler}
    />
})