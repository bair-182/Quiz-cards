import {instance} from "../../../../base-url";
import {AxiosResponse} from "axios";

export const CardsAPI = {
    getCardsData(params: CardsParamsType) {
        return instance.get<CardsParamsType, AxiosResponse<AllCardsData>>(`/cards/card`, {params})
    },
    sendNewCardData (card: SendNewCardType) {
        return instance.post<SendNewCardType, AxiosResponse<newCardRespType>>(`/cards/card`, {card})
    },
    deleteCard(cardId: string) {
        return instance.delete<string, AxiosResponse<deletedCardRespType>>(`/cards/card?id=${cardId}` )
    },
    sendUpdateCardData (card: SendNewCard) {
        return instance.put<SendNewCard, AxiosResponse<UpdatedCardType>>(`/cards/card`, {card})
    },
    sendGradeCard (CardGrade: SendCardGradeType){
        return instance.put<SendCardGradeType, AxiosResponse<UpdatedGradeType>>(`/cards/grade`, CardGrade)
    }
};

export type UpdatedGradeType = {
    updatedGrade: {
        _id: string,
        cardsPack_id: string,
        card_id: string,
        user_id: string,
        grade: number,
        shots: number
    }
}

export type SendCardGradeType = {
    grade: number,
    card_id: string
}


export type UpdatedCardType = {
    updatedCard: {}
}

export type SendNewCard = {
    _id: string
    question: string
    comments: string
}

export type deletedCardRespType = {
    deletedCard: {}
}

export type newCardRespType = {
    newCard: {}
}

export type SendNewCardType = {
    cardsPack_id: string
    answer?: string
    question?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type CardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: number
    page: number
    pageCount: number
}

export type AllCardsData = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}