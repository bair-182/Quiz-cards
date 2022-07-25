import React, {useState} from 'react';
import s from './Paginations.module.scss'
import Select from './Select';

type PropsType = {
    cardPacksTotalCount: number
    pageCount: number
    onChangeOption: (value: number) => void
    page: number
    currentPageHandler(page: number): void
}

export const Pagination: React.FC<PropsType> = React.memo((props) => {
    let pagesCount = Math.ceil(props.cardPacksTotalCount / props.pageCount); // count of all pages, before pagination
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    console.log(props.cardPacksTotalCount / props.pageCount)
    const portionSize = 5; // по 5 страниц показывать до точек
    const portionCount = Math.ceil(pagesCount / portionSize) // сколько всего pagination кнопок

    const [portion, setPortion] = useState(Math.ceil(props.page / portionSize))

    const leftNumber = (portion - 1) * portionSize + 1
    const rightNumber = portion * portionSize

    const onFirstPageClick = () => {
        props.currentPageHandler(1)
        setPortion(1)
    }

    const onLastPageClick = () => {
        props.currentPageHandler(pagesCount)
        setPortion(portionCount)
    }


    return (
        <div className={s.pagination}>
            {
                portion === 1 && <button disabled>&lt;</button>
            }
            {portion > 1 &&
                <>
                    <button onClick={() => {
                        props.currentPageHandler((portionSize * (portion - 2)) + 1)
                        setPortion(portion - 1)
                    }}>&lt;</button>
                    <div className={s.item} onClick={onFirstPageClick}>1</div>
                    {/*first page click*/}
                    <div className={s.points}>...</div>
                </>}

            {pages
                .filter((p) => p ? p >= leftNumber && p <= rightNumber : '')
                .map(q => {
                    return <div
                        key={q}
                        className={`${s.item} ${props.page === q ? s.select : ''}`}

                        onClick={() => {
                            props.currentPageHandler(q)
                        }}>
                        {q}
                    </div>
                })}
            {portion !== portionCount &&
                <>
                    <div className={s.points}>...</div>
                    <div className={s.item} onClick={onLastPageClick}>{pagesCount}</div>
                    {/*last page click*/}
                </>
            }
            {portionCount > portion &&
                <button disabled={portion === portionCount}
                        className={s.btnRight}
                        onClick={() => {
                            setPortion(portion + 1)
                            props.currentPageHandler(portionSize * portion + 1)
                        }}>&gt;</button>}
            <div className={s.selectBlock}>


                <span className={s.label1}>Show</span>
                <Select
                    pageCount={props.pageCount}
                    onChangeOption={props.onChangeOption}
                    className={`${s.select} ${s.superSelect}`}
                />
                <span className={s.label2}>Cards per Page</span>
            </div>


        </div>
    )
})