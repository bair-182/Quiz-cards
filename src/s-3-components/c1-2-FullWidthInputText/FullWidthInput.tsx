import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type PropsType = {
    label: string
}

export default function FullWidthTextField(props: PropsType) {
    return (
        <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
        >
            <TextField fullWidth label={props.label} id="fullWidth" />
        </Box>
    );
}
