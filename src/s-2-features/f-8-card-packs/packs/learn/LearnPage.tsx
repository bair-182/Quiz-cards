import React, {useEffect, useState} from 'react';
import s from "./LearnPage.module.css";
import SuperButton from "../../../../s-3-components/c2-SuperButton/SuperButton";
import {PACKS_PATH, SIGN_IN_PATH} from "../../../../s-1-main/m-1-ui/Routing";
import {useSelector} from "react-redux";
import {IAppStore, useAppDispatch} from "../../../../s-1-main/m-2-bll/store";
import {UserType} from "../../../f-1-authorization/a-1-sign-in/s-3-dal/SignInAPI";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {PackParamsType} from "../PacksAPI";
import {CardsParamsType, CardType} from "../cards/CardsAPI";
import Button from "@mui/material/Button";
import PikachuLoading from "../../../../s-3-components/PikachuLoading";
import {getAllPacksAC} from "../packs-reducer";
import {
    getAllCardsAC,
    GetCardsThunk,
    setPackIdAC,
    setPackNameAC,
    setPackUserNameAC,
    UpdateCardGradeThunk
} from "../cards/cards-reducer";


const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал ответ'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}


const LearnPage = () => {

    //react-router v6
    let navigate = useNavigate();
    const routeChange = (newPath: string) => {
        navigate(newPath)
    }

    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const userData = useSelector<IAppStore, UserType>(state => state.profile.userData)

    const packsParams = useSelector<IAppStore, PackParamsType>((state) => state.packs.params);
    const cardsParams = useSelector<IAppStore, CardsParamsType>((state) => state.cards.params);
    const createdBy = useSelector<IAppStore, string>((state) => state.cards.createdBy);
    const cardsData = useSelector<IAppStore, CardType[]>(state => state.cards.cards)
    const packNameInMap = useSelector<IAppStore, string>((state) => state.cards.packNameInMap);


    // хуки
    const [isAnswered, setIsAnswered] = useState<boolean>(false)
    const [first, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardType>({
        answer: '',
        question: '',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: ''
    });
    const [newGrade, setNewGrade] = useState<number>(0)


    useEffect(() => {
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(GetCardsThunk());
            setFirst(false);
        }

        console.log('cards', cardsData)
        if (cardsData.length > 0 ) setCard(getCard(cardsData));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, cardsParams.cardsPack_id, cardsData, first]);

    const onNext = () => {
        if (newGrade !== 0) {
            setIsAnswered(false);
            setNewGrade(0);
            if ( cardsData.length > 0 ) {
                dispatch(UpdateCardGradeThunk({grade: newGrade, card_id: card._id}))
            } else {

            }
        }
    }

    const sendGradeHandler = (g: string, ind: number) => {
        grades.map(gr => gr === g ? setNewGrade(ind + 1) : null)
    }

    const learnEndHandler = () => {
        dispatch(setPackIdAC(''))
        dispatch(setPackUserNameAC(''))
        dispatch(setPackNameAC(''))
        dispatch(getAllCardsAC([]))
        dispatch(getAllPacksAC([]))
        routeChange(PACKS_PATH)
    }

    // useEffect сюда потом добавить
    // useEffect(()=>{
    //     getAllCardsAC()
    // })

    // редирект на логин тут:
    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.headerContainer}>
                <h1>Learn cards</h1>
                <h3>Колода: {packNameInMap}</h3>
                <h3>Created by: {createdBy}</h3>
                <h3>Total cards: {}</h3>
                <h3>Средняя оценка по колоде: </h3>
            </div>

            {isLoading || !card.question
                ? <PikachuLoading/>
                : <div className={s.questContainer}>
                    <div>
                        <div>Вопрос:</div>
                        <div><b>{card.question}</b></div>
                    </div>
                    <div>
                        <div>Ответ:</div>
                        <div>
                            {isAnswered
                                ? <b>{card.answer}</b>
                                : <div><button onClick={() => setIsAnswered(true)}>Показать правильный ответ</button></div>
                            }
                        </div>
                    </div>
                    <div className={s.gradeBox}>
                        <div>Оцените себя:</div>
                        <div>
                            {grades.map((g, i) => (
                                <Button
                                    key={'grade-' + i}
                                    color={(newGrade !== (i + 1) && newGrade !== 0) ? "warning" : "primary"}
                                    onClick={() => sendGradeHandler(g, i)}
                                >{g}</Button>
                            ))}
                        </div>
                    </div>
                </div>
            }

            <div className={s.buttonBox}>
                <SuperButton
                    onClick={() => learnEndHandler()}
                    disabled={isLoading}
                >
                    Завершить обучение
                </SuperButton>
                <SuperButton onClick={() => onNext()}
                             disabled={isLoading || newGrade === 0}>Следующая карточка</SuperButton>
            </div>
        </div>
    );
};

export default LearnPage;
