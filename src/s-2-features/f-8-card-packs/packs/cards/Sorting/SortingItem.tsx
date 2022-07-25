import {Dispatch} from 'redux';
import s from './Sorting.module.css';
import ArrowBackIcon from '../../../../../assets/images/ArrowBackIcon.svg';
import arrow  from '../../../../../assets/images/img_1.png';
import React from 'react';
import {SortingPacksType} from "../../PacksAPI";
import {setSortPacksValueAC} from "../../packs-reducer";

type SortingPropsType = {

    title: string
    isArrowUp: boolean
    setArrowUp: (value: boolean) => void
    dispatch: Dispatch
    setSortPacksValues: SortingPacksType[]
    sortBy:   SortingPacksType
}
// type SortingPack = [{sort:SortingPacksType}]


export const SortingItem = React.memo((props: SortingPropsType) => {


    return (
        <div className={s.openDivStyles}>
            <button className={props.setSortPacksValues.some((element: string) => element === props.sortBy)
                ? `${s.filter__btn} ${s.chosenButtonBackground}`
                : s.filter__btn
            }
                    onClick={() => props.setArrowUp(!props.isArrowUp)}
                // onBlur={() => props.setArrowUp(false)}
            >
                <span>{props.title}</span>
                <img src={arrow}
                     className={props.isArrowUp
                         ? s.filterIcon_imgOpened
                         : s.filterIcon_img}
                />
            </button>


            {props.isArrowUp &&
                // <div
                //     onClick={() => props.setArrowUp(false)}
                //     className={s.onBlurStyle}
                // >
                <div className={s.dropdown}>
                    <ul className={s.sortingUl}>
                        <li className={s.dropdownItem}
                            onClick={() => {
                                props.dispatch(setSortPacksValueAC(props.setSortPacksValues[1]))
                                props.setArrowUp(!props.isArrowUp)
                            }}
                        ><img src={ArrowBackIcon} height={'20px'}
                              style={{
                                  transform: 'rotate(90deg)',
                                  display: 'inline-block'
                              }}/>
                            ascending
                        </li>
                        <li className={s.dropdownItem}
                            onClick={() => {
                                props.dispatch(setSortPacksValueAC(props.setSortPacksValues[0]))
                                props.setArrowUp(!props.isArrowUp)
                            }}
                        ><img src={ArrowBackIcon} height={'20px'}
                              style={{
                                  transform: 'rotate(270deg)',
                                  display: 'inline-block'
                              }}/>
                            descending
                        </li>
                    </ul>
                </div>
                // </div>
            }
        </div>

    )
})