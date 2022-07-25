import React, {ChangeEvent, DetailedHTMLProps, FormEvent, SelectHTMLAttributes} from 'react'
import s from './Paginations.module.scss'


type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SelectPropsType = DefaultSelectPropsType & {
    // options?: string[]
    pageCount: number
    onChangeOption: (option: number) => void
    // onClickSelectHandler: () => void
}

const Select = (props: SelectPropsType ) => {

    const arr = [5, 10, 20, 50, 100]


    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        props.onChangeOption(+e.currentTarget.value)
    }

    return (

        <select className={s.select}
                onChange={onChangeCallback}
                value={props.pageCount}
            // onClick={props.onClickSelectHandler}
        >
            {arr.map((o, i) => (
                <option className={s.option}
                        key={'option-' + i}
                        value={o}
                    // onClick={props.onClickSelectHandler}
                >{o}</option>
            ))}
        </select>


    )
}

export default Select;