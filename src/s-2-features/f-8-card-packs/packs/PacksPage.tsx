import React, {MouseEvent, ChangeEvent, useEffect, useState} from "react";
import s from "./PacksPage.module.css"
import SuperButton from "../../../s-3-components/c2-SuperButton/SuperButton";
import {useSelector} from "react-redux";
import {IAppStore, RootStateType, useAppDispatch} from "../../../s-1-main/m-2-bll/store";
import {CardPackType, PackParamsType} from "./PacksAPI";
import {
    AddNewPackThunk,
    DeletePackThunk,
    EditPackThunk, getAllPacksAC,
    GetPacksThunk,
    ParamAC_SetSearch, ParamAC_SetUserId
} from "./packs-reducer";

import {Navigate, useNavigate} from "react-router-dom";
import {CARDS_PATH, LEARN_PATH, SIGN_IN_PATH} from "../../../s-1-main/m-1-ui/Routing";
import {ErrorSnackbar} from "../../../s-3-components/ErrorSnackBar/ErrorSnackbar";
import {RangeSliderContainer} from "./cards/RangeSlider/RangeSliderContainer";
import {Button, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import PikachuLoading from "../../../s-3-components/PikachuLoading";
import {getAllCardsAC, GetCardsThunk, setPackIdAC, setPackNameAC, setPackUserNameAC} from "./cards/cards-reducer";
import LinearIndeterminate from "../../../s-3-components/c8-ProgressBarLinear/ProgressBarLinear";
import FormDialog from "../../../s-3-components/c9-ModalBox/DialogForm";
import {Sorting} from "./cards/Sorting/Sorting";
import {PaginationPacksContainer} from "./cards/Pagination/PaginationPacksContainer";
import Modalka from "../../../s-3-components/Modalka/Modalka";
import modalka from "../../../s-3-components/Modalka/Modalka";
import learnPage from "./learn/LearnPage";
import useDebounce from "../../../hooks/useDebounce";
import {changeIsLoadingAC} from "../../../s-1-main/m-2-bll/app-reducer";

const PacksPage = () => {

    //react-router v6
    let navigate = useNavigate();
    const routeChange = (newPath: string) => {
        navigate(newPath)
    }

    //react-redux:
    const dispatch = useAppDispatch();
    const appError = useSelector<IAppStore, string | null>(state => state.app.appError)
    const isLoading = useSelector<IAppStore, boolean>((state) => state.app.isLoading);
    const isLoggedIn = useSelector<IAppStore, boolean>((state) => state.login.isLoggedIn);
    const loggedUserId = useSelector<IAppStore, string>((state) => state.profile.userData._id);
    const loggedUserName = useSelector<IAppStore, string>((state) => state.profile.userData.name);
    const params = useSelector<IAppStore, PackParamsType>((state) => state.packs.params);
    const packsData = useSelector<IAppStore, CardPackType[]>(state => state.packs.cardPacks)
    const page = useSelector<RootStateType, number>(state => state.packs.params.page)

    //хуки сюда:
    const [isPrivate, setPrivate] = useState<boolean>(false);
    const [packName, setPackName] = useState<string>("");
    const [searchItem, setSearchItem] = useState<string>("");

    const [editPackMode, setEditPackMode] = useState(false)
    const [editedName, setEditedName] = useState<string>("");
    const [packIdToEdit] = useState<string>("")
    // const [packIdToEdit, setPackIdToEdit] = useState<string>("")

    //хуки для модалки удаления колоды
    const [isOpenDeletePackModal, setIsOpenDeletePackModal] = useState(false)
    const [isOpenAddNewPackModal, setIsOpenAddNewPackModal] = useState(false)
    const [isOpenEditPackModal, setIsOpenEditPackModal] = useState(false)
    const [packId, setPackId] = useState("")

    //
    const debouncedValue = useDebounce(searchItem, 2000)
    // хуки для Modalka
    const [activeModalka, setActiveModalka] = useState(false)


    // коллбэки тут:
    const sendSearchInputValue = (value: string) => {
        console.log("debounce")
        dispatch(ParamAC_SetSearch(value))
        dispatch(GetPacksThunk())
    }

    const onSearchInputClick = () => {
        sendSearchInputValue(searchItem)
    }

    // useEffect(() => {
    //     sendSearchInputValue(debouncedValue)
    // }, [debouncedValue])


    const searchInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchItem(e.currentTarget.value)
    }

    const newPackInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    const sendNewPackHandler = () => {
        dispatch(AddNewPackThunk({name: packName, deckCover: "", private: isPrivate}))
        setPackName("");
        setPrivate(false);
    }

    // коллбэки для кнопок внутри таблицы:
    const deletePackHandler = () => {
        dispatch(DeletePackThunk(packId))
    }

    const openDeletePackModal = (event: MouseEvent<HTMLButtonElement>, packId: string) => {
        event.stopPropagation();
        setPackId(packId)
        setIsOpenDeletePackModal(true)
    }
    const openEditPackModal = (event: MouseEvent<HTMLButtonElement>, packId: string, packName: string) => {
        event.stopPropagation();
        setPackId(packId)
        setIsOpenEditPackModal(true)
        setPackName(packName)
    }

    const sendEditPackHandler = (packId: string, oldName: string) => {
        if (oldName !== editedName) {
            dispatch(EditPackThunk({_id: packId, name: editedName}))
        }
        setEditedName("")
        setEditPackMode(!editPackMode)
    }

    // const changeEditModeHandler = (event: MouseEvent<HTMLButtonElement>, userIdFromMap: string, packNameFromMap: string) => {
    //     event.stopPropagation();
    //     if (editPackMode) {
    //         setEditedName("")
    //     }
    //     setEditedName(packNameFromMap)
    //     setPackIdToEdit(userIdFromMap)
    //     setEditPackMode(true)
    // }

    const editPackNameInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEditedName(e.currentTarget.value)
    }

    const openPackHandler = (packId: string, createdBy: string, packNameInMap: string) => {
        if (!isOpenEditPackModal) {
            dispatch(changeIsLoadingAC(true))
            dispatch(setPackIdAC(packId))
            dispatch(setPackUserNameAC(createdBy))
            dispatch(setPackNameAC(packNameInMap))
            dispatch(getAllCardsAC([]))
            routeChange(CARDS_PATH)
        }
    }

    const learnButtonHandler = (event: MouseEvent<HTMLButtonElement>, packId: string, createdBy: string, packNameInMap: string) => {
        event.stopPropagation();
        dispatch(setPackIdAC(packId))
        dispatch(setPackUserNameAC(createdBy))
        dispatch(setPackNameAC(packNameInMap))
        setActiveModalka(true)
    }

    const startLearnHandler = () => {
        dispatch(changeIsLoadingAC(true))
        routeChange(LEARN_PATH)
    }

    const getMyPacks = () => {
        dispatch(ParamAC_SetUserId(loggedUserId))
    }
    const getAllPacks = () => {
        dispatch(ParamAC_SetUserId(""))
    }

    useEffect(() => {
        dispatch(GetPacksThunk());
    }, [dispatch, params]);

    // редирект на логин тут:
    if (!isLoggedIn) {
        return <Navigate to={SIGN_IN_PATH}/>
    }

    return (
        <div className={s.mainContainer}>
            {appError && <ErrorSnackbar/>}
            <div className={s.leftContainer}>
                <div className={s.sideBox}>

                    <h3> {loggedUserName} </h3>
                    <h4> Show packs cards </h4>

                    <Button disabled={isLoading || params.user_id !== ''} variant={"contained"} onClick={getMyPacks}>MY</Button>
                    <Button disabled={isLoading || params.user_id === ''} variant={"contained"} onClick={getAllPacks}
                            color={"secondary"}>ALL</Button>
                </div>
                <div>
                    <RangeSliderContainer/>
                    <Sorting/>
                </div>
            </div>
            <div className={s.rightContainer}>
                <div>
                    <div className={s.findContainer}>
                        <div className={s.search}>
                            <TextField type="text"
                                       disabled={isLoading}
                                       value={searchItem}
                                       placeholder={"Search"}
                                       onChange={searchInputHandler}
                                       variant={"outlined"}
                                       size={"small"}
                                       className={s.input}
                                       sx={{maxWidth: 250}}
                                       InputProps={{
                                           startAdornment: <InputAdornment
                                               position="start"><SearchIcon/></InputAdornment>,
                                           endAdornment: <InputAdornment position={"end"}>
                                               <CancelIcon
                                                   onClick={() => setSearchItem("")}
                                                   className={s.clearButton}
                                               /></InputAdornment>
                                       }}
                            />
                            <SuperButton
                                disabled={isLoading}
                                onClick={onSearchInputClick}
                            >
                                Search
                            </SuperButton></div>

                        <SuperButton
                            disabled={isLoading}
                            onClick={() => setIsOpenAddNewPackModal(true)}
                            green
                            width={250}
                        >
                            Add new pack
                        </SuperButton>

                    </div>
                    <div className={s.tableBox}>
                        <table className={s.table}>
                            <thead className={s.thead}>
                            <tr className={s.trHead}>
                                <th className={s.th}>Pack name</th>
                                <th className={s.th}>Cards</th>
                                <th className={s.th}>Last updated</th>
                                <th className={s.th}>Created by</th>
                                <th className={s.th}>Actions</th>
                            </tr>
                            </thead>
                            <tbody
                                className={s.trBody}>{!(packsData.length > 0) || !packsData
                                ? <tr>
                                    <td>{!isLoading && <ErrorSnackbar vertical={"top"}
                                                                      severity={"warning"}
                                                                      text={"Колоды не найдены"}/>}</td>
                                </tr>
                                : packsData.map((t) =>
                                    <tr key={t._id}
                                        className={s.trItem}
                                        onClick={() => {(t.cardsCount !== 0 || t.user_id === loggedUserId) && openPackHandler(t._id, t.user_name, t.name)} }
                                    >
                                        <td className={s.td}>{t.name}</td>
                                        <td className={s.tdTotalCards}>{t.cardsCount}</td>
                                        <td className={s.tdDate}>{t.updated.slice(0, 10).replace(/-/g, ".")}</td>
                                        <td className={s.tdCreatedBy}>{t.user_name}</td>
                                        <td className={s.tdButtons}>
                                            {t.user_id === loggedUserId && <button
                                                className={s.delButton}
                                                onClick={(event) => openDeletePackModal(event, t._id)}
                                                disabled={isLoading}
                                            >Delete</button>}
                                            {t.user_id === loggedUserId && <button
                                                className={s.editButton}
                                                onClick={(event) => openEditPackModal(event, t._id, t.name)}
                                                disabled={isLoading}
                                            >Edit</button>}
                                                <button
                                                    onClick={(event) => learnButtonHandler(event,t._id, t.user_name, t.name)}
                                                    className={s.learnButton}
                                                    disabled={isLoading || t.cardsCount === 0}
                                                >Learn
                                                </button>

                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </div>
                    {isLoading && <><PikachuLoading/><LinearIndeterminate/></>}
                </div>
                <div className={s.paginationBox}>
                    {/*<Pagination/>*/}
                    <PaginationPacksContainer/>
                </div>
            </div>
            <FormDialog title={"Delete Pack"}
                        buttonTitle={"Delete"}
                        buttonAction={deletePackHandler}
                        open={isOpenDeletePackModal}
                        setOpen={setIsOpenDeletePackModal}
                        text={"Do you really want to remove this Pack? All cards will be excluded from this course."}
            />
            <FormDialog title={"Add New Pack"}
                        buttonTitle={"Save"}
                        buttonAction={sendNewPackHandler}
                        open={isOpenAddNewPackModal}
                        setOpen={setIsOpenAddNewPackModal}
                        text={"Enter new pack name"}
            >
                <TextField
                    disabled={isLoading}
                    value={packName}
                    onChange={newPackInputHandler}
                    placeholder={"New pack name"}
                    fullWidth
                    className={s.input}
                />
            </FormDialog>
            <FormDialog title={"Add New Pack"}
                        buttonTitle={"Save"}
                        buttonAction={sendNewPackHandler}
                        open={isOpenAddNewPackModal}
                        setOpen={setIsOpenAddNewPackModal}
                        text={"Enter new pack name"}
            >
                <TextField
                    disabled={isLoading}
                    value={packName}
                    onChange={newPackInputHandler}
                    placeholder={"New pack name"}
                    fullWidth
                    className={s.input}
                />
            </FormDialog>
            <FormDialog title={"Edit Pack"}
                        buttonTitle={"Save"}
                        buttonAction={() => sendEditPackHandler(packId, packName)}
                        open={isOpenEditPackModal}
                        setOpen={setIsOpenEditPackModal}
                        text={"Enter new pack name"}
            >
                <input
                    placeholder={packName}
                    value={editedName}
                    onChange={(e) => editPackNameInputHandler(e)}
                    autoFocus
                />
            </FormDialog>

            <Modalka active={activeModalka} setActive={setActiveModalka}>
                <b>Начать обучение колоды?</b>
                <div>
                    Pack name: {params.packName}
                </div>
                <div>
                    <button onClick={()=>setActiveModalka(false)}>Cancel</button>
                    <button onClick={startLearnHandler}>START</button>
                </div>
            </Modalka>

        </div>
    );
};

export default PacksPage;
