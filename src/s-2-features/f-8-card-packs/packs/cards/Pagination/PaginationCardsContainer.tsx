import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Pagination} from './Paginationn';
import {RootStateType} from "../../../../../s-1-main/m-2-bll/store";
import {setCardsCurrentPageAC, setCardsPageCountAC} from "../cards-reducer";


export const PaginationCardsContainer = React.memo(() => {
    const dispatch = useDispatch()
    let pageCount = useSelector<RootStateType, number>(state => state.cards.params.pageCount)
    let cardPacksTotalCount = useSelector<RootStateType, number>(state => state.cards.cardsTotalCount)
    let page = useSelector<RootStateType, number>(state => state.cards.params.page)


    const currentPageHandler = useCallback((page: number) => {
        dispatch(setCardsCurrentPageAC(page))
    }, [dispatch])

    const onChangeOption = useCallback((value: number) => {
        dispatch(setCardsPageCountAC(value))
    }, [dispatch])


    return <Pagination
        cardPacksTotalCount={cardPacksTotalCount}
        pageCount={pageCount}
        onChangeOption={onChangeOption}
        page={page}
        currentPageHandler={currentPageHandler}
    />
})