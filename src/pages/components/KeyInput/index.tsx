import React, { SyntheticEvent } from 'react';
import './style.scss';
import { Keyboard } from '../../ts/addon';
import { Typography } from '@material-ui/core';

type KeyInputProp = {
    width: number,
    height: number,
    keyCode: number,
    onChange?: (code: number) => void;
}

export default function KeyInput(props: Readonly<KeyInputProp>) {
    const [keyCode, setKeyCode] = React.useState(props.keyCode);
    const [prevKeyCode, setPrevKeyCode] = React.useState(props.keyCode);
    const [detecting, setDetecting] = React.useState(false);

    let input = React.createRef<HTMLInputElement>();

    let onKeyDown = (event: SyntheticEvent) => {
        event.preventDefault();
    };

    let onFocus = (event: SyntheticEvent) => {
        setPrevKeyCode(keyCode);
        setKeyCode(-1);
        
        Keyboard.detectKey(keyCode, onKeyDetected);

        setDetecting(true);
    };

    let onBlur = (event: SyntheticEvent) => {
        if (keyCode === -1) {
            setKeyCode(prevKeyCode);
        }

        setDetecting(false);
        Keyboard.removeCallback(prevKeyCode);
    };

    let onKeyDetected = (keyCode: number, keyState: number) => {
        setKeyCode(keyCode);
        setDetecting(false);

        if (props.onChange) {
            props.onChange(keyCode);
        }

        input.current.blur();

        Keyboard.removeCallback(prevKeyCode);
    };

    return (
        <div
            className="key-input"
            style={{
                width: props.width,
                height: props.height
            }}>
            
            <input
                className="value-input"
                type="text"
                value={ keyCode === -1 ? '' : keyCode }
                ref={ input }
                onChange={ () => {} }
                onKeyDown={ onKeyDown }
                onFocus= { onFocus }
                onBlur= { onBlur }/>

            {
                detecting ? 
                <Typography
                    className="key-input-placeholder">
                    Press a key
                </Typography>   :
                null
            }
        </div>
    );
}
