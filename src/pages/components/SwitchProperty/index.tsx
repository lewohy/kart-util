import React from 'react';
import './style.scss';
import HorizontalBox from '../HorizonalBox';
import { Typography, TextField, Switch } from '@material-ui/core';

type SwitchProperty = {
    name: string;
    defaultValue: boolean;

    onValueChanged: (value: boolean) => void;
};

export default function SwitchProperty(props: Readonly<SwitchProperty>) {
    const [value, setValue] = React.useState(props.defaultValue);

    let onChange = (value: boolean) => {
        setValue(value);
        props.onValueChanged(value);
    };

    return (
        <div
            className="switch-property">
                
            <HorizontalBox>

                <Typography
                    component="span"
                    style={{
                        width: 128 + 64
                    }}>
                    
                    { props.name }

                </Typography>
                

                <div
                    className="right-area"
                    >
                    
                    <Switch
                        color="primary"
                        checked={ value }
                        onChange={ (event) => { onChange(event.target.checked); } }/>
                </div>
            </HorizontalBox>
        </div>
    );
}
