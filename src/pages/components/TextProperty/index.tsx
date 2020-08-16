import React from 'react';
import HorizontalBox from '../HorizonalBox';
import { Typography, TextField } from '@material-ui/core';

type TextPropertyProp = {
    name: string;
    defaultValue: string;

    valueConverter?: (value: string) => string;
    onValueChanged: (value: string) => void;
};

export default function TextProperty(props: Readonly<TextPropertyProp>) {
    const [value, setValue] = React.useState(props.defaultValue);

    let onChange = (value: string) => {
        let result = props.valueConverter ? props.valueConverter(value) : value;

        setValue(result);
        props.onValueChanged(result);
    };

    return (
        <HorizontalBox>
            <Typography
                component="span"
                style={{
                    width: 128 + 64
                }}>
                
                { props.name }

            </Typography>
            
            <TextField
                variant="outlined"
                size="small"
                value={ value }
                style={{
                    width: 'calc(100% - 128px - 64px)'
                }}
                onChange={ (event) => { onChange(event.target.value); } }/>
        </HorizontalBox>
    );
}
