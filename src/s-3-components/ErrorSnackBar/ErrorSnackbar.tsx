import React, {useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {IAppStore} from "../../s-1-main/m-2-bll/store";
import {setAppErrorAC} from "../../s-1-main/m-2-bll/app-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
));

type snackBarPropsType = {
    severity?: 'error' | 'warning' | 'info' | 'success',
    text?: string,
    width?: string,
    vertical?: 'top' | 'bottom';
    horizontal?: 'left' | 'center' | 'right';
}

export const ErrorSnackbar = React.memo((props: snackBarPropsType) => {

    const dispatch = useDispatch();
    const error = useSelector<IAppStore, string | null>((state) => state.app.appError);
    let isTextProps = props.text

    const [openByProps, setOpenByProps] = useState<boolean>(isTextProps ? true : false)


    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        dispatch(setAppErrorAC(null))
        setOpenByProps(false)
        if (reason === 'clickaway') {
            return;
        }
    };

    return (
        <Snackbar
            anchorOrigin={{horizontal : props.horizontal ? props.horizontal : 'center', vertical: props.vertical ? props.vertical : 'bottom'}}
            open={ (error !== null || openByProps)}
            autoHideDuration={4000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={props.severity ? props.severity : 'error'}
                sx={{width: props.width ? props.width : '100%'}}>
                {isTextProps ? isTextProps : error}
            </Alert>
        </Snackbar>
    );
})