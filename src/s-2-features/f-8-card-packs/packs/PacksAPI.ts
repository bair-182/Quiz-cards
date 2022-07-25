import {instance} from "../../../base-url";
import {AxiosResponse} from "axios";

export const PacksAPI = {
    getPacksData(params: PackParamsType) {
        return instance.get<PacksType>('/cards/pack', {params})
    },
    postNewPack(cardsPack: AddNewPackType) {
        return instance.post<AddNewPackType, AxiosResponse<NewAddedPackType>>('/cards/pack', {cardsPack})
    },
    deletePack(_id: string) {
        return instance.delete<string, AxiosResponse<DeletedPackType>>(`/cards/pack?id=${_id}`)
    },
    editPackName(cardsPack: EditPackType) {
        return instance.put<EditPackType, AxiosResponse<any>>('/cards/pack', {cardsPack: {_id: cardsPack._id, name: cardsPack.name}})
    }
};


export type SortingPacksType =
    "0cardsCount"
    | "1cardsCount"
    | "0name"
    | "1name"
    | "0updated"
    | "1updated"

export type EditPackType = {
    _id: string,
    name: string,
}

export type DeletedPackType = {
    deletedCardsPack: {}
}

export type AddNewPackType = {
    name: string
    deckCover?: string
    private: boolean
}

export type PackParamsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks:  SortingPacksType,
    page: number
    pageCount?: number
    user_id?: string

}

export type PacksType = {
    cardPacks: CardPackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number
    created: string
    updated: string
    deckCover: string
}

export type NewAddedPackType = {
    newCardsPack: {
        _id: string,
        user_id: string,
        user_name: string,
        private: boolean,
        name: string,
        path: string,
        grade: number,
        shots: number,
        deckCover: string,
        cardsCount: number,
        type: string,
        rating: number,
        created: string,
        updated: string,
        more_id: string,
        __v: number
    },
    token: string,
    tokenDeathTime: number
}
