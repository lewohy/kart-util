import React, { SyntheticEvent } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography, TextField } from '@material-ui/core';
import { KeyInfo } from '../../ts/config';
import HorizontalBox from '../HorizonalBox';
import KeyInput from '../KeyInput';

type KeyInfoDialogProp = {
    keyInfo: KeyInfo;
    onCancelClicked: () => void;
    onApplyClicked: (newKeyInfo: KeyInfo) => void;
};

export default function KeyInfoDialog(props: Readonly<KeyInfoDialogProp>) {
    const [name, setName] = React.useState('');
    const [x, setX] = React.useState('0');
    const [y, setY] = React.useState('0');
    const [width, setWidth] = React.useState('0');
    const [height, setHeight] = React.useState('0');
    const [code, setCode] = React.useState(-1);

    let onCancelClick = (e: SyntheticEvent) => {
        props.onCancelClicked();
    };

    let onApplyClick = (e: SyntheticEvent) => {
        props.onApplyClicked(new KeyInfo({
            name: name,
            x: Number(x),
            y: Number(y),
            width: Number(width),
            height: Number(height),
            code: Number(code),
            visible: props.keyInfo.visible
        }));
    };

    let toNumberString = (str: string) => {
        let r = Number(str);
        
        return (r ? (r > 3000 ? 3000 : r) : '').toString();
    };

    React.useEffect(() => {
        setName(props.keyInfo?.name);
        setX(props.keyInfo?.x?.toString());
        setY(props.keyInfo?.y?.toString());
        setWidth(props.keyInfo?.width?.toString());
        setHeight(props.keyInfo?.height?.toString());
        setCode(props.keyInfo?.code);
    }, [props.keyInfo]);

    return (
        <Dialog
            open={ props.keyInfo !== null }>

            <DialogTitle>키 정보</DialogTitle>
            
            <DialogContent>
                <HorizontalBox>
                    <Typography
                        component="span"
                        style={{
                            width: 96
                        }}>
                        Key Name
                    </Typography>
                    
                    <TextField
                        variant="outlined"
                        size="small"
                        value={ name ?? 0 }
                        style={{
                            width: 256 + 128
                        }}
                        onChange={ (event) => { setName(event.target.value); } }/>
                </HorizontalBox>

                <HorizontalBox>
                    <Typography
                        component="span"
                        style={{
                            width: 96
                        }}>
                        X
                    </Typography>
                    
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        value={ x ?? 0 }
                        style={{
                            width: 128
                        }}
                        onChange={ (event) => { setX(toNumberString(event.target.value)); } }/>

                    <Typography
                        component="span"
                        style={{
                            width: 96
                        }}>
                        Y
                    </Typography>
                    
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        value={ y ?? 0 }
                        style={{
                            width: 128
                        }}
                        onChange={ (event) => { setY(toNumberString(event.target.value)); } }/>
                </HorizontalBox>

                <HorizontalBox>
                    <Typography
                        component="span"
                        style={{
                            width: 96
                        }}>
                        Width
                    </Typography>
                    
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        value={ width ?? 0 }
                        style={{
                            width: 128
                        }}
                        onChange={ (event) => { setWidth(toNumberString(event.target.value)); } }/>

                    <Typography
                        component="span"
                        style={{
                            width: 96
                        }}>
                        Height
                    </Typography>
                    
                    <TextField
                        type="text"
                        variant="outlined"
                        size="small"
                        value={ height ?? 0 }
                        style={{
                            width: 128
                        }}
                        onChange={ (event) => { setHeight(toNumberString(event.target.value)); } }/>
                </HorizontalBox>
                <HorizontalBox>
                    <Typography
                        component="span"
                        style={{
                            width: 96
                        }}>
                        Key Code
                    </Typography>

                    <KeyInput
                        width={ 128 }
                        height={ 40 }
                        keyCode={ code ?? -1 }
                        onChange={ (code) => { setCode(code ?? -1); } }/>
                </HorizontalBox>
            </DialogContent>

            <DialogActions>
                <Button
                    color="primary"
                    onClick={ onCancelClick }>
                    Cancel
                </Button>
                <Button
                    color="primary"
                    onClick={ onApplyClick }
                    autoFocus>
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
}
