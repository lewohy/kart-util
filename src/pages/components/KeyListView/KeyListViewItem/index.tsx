import React, { SyntheticEvent } from 'react';
import './style.scss';
import { KeyInfo } from '../../../ts/config';
import Button from '../../Button';
import { Remove, Delete, Clear } from '@material-ui/icons';
import { Switch, IconButton } from '@material-ui/core';

type KeyListViewItemProp = {
    index: number;
    keyInfo: KeyInfo;
    onKeyVisibleChanged: (index: number, keyInfo: KeyInfo) => void;
    onKeyInfoDeleteButtonClicked: (index: number) => void;
    onKeyInfoClicked: (index: number, keyInfo: KeyInfo) => void;
};

export default function KeyListViewItem(props: Readonly<KeyListViewItemProp>) {
    const [keyInfo, setKeyInfo] = React.useState(props.keyInfo);

    let onItemClick = (event: SyntheticEvent) => {
        props.onKeyInfoClicked(props.index, keyInfo);
    }

    let onVisibleSwitchClick = (event: SyntheticEvent) => {
        event.stopPropagation();

        let newKeyInfo = new KeyInfo({
            name: keyInfo.name,
            code: keyInfo.code,
            width: keyInfo.width,
            height: keyInfo.height,
            x: keyInfo.x,
            y: keyInfo.y,
            visible: !keyInfo.visible
        });

        setKeyInfo(newKeyInfo);
        props.onKeyVisibleChanged(props.index, newKeyInfo);
    };

    let onKeyInfoDeleteButtonClick = (event: SyntheticEvent) => {
        event.stopPropagation();

        props.onKeyInfoDeleteButtonClicked(props.index);
    };

    return (
        <div
            className="key-list-view-item"
            onClick={ onItemClick }>
            
            <div
                className="name-area">
                { props.keyInfo.name }
            </div>

            <div
                className="right-area"
                >
                <Switch
                    color="primary"
                    
                    checked={ keyInfo.visible }
                    onClick={ onVisibleSwitchClick }
                    style={{
                        //color: '#aaaaff'
                    }}
                    />

                <IconButton
                    className="key-delete-button"
                    size="small"
                    onClick={ onKeyInfoDeleteButtonClick }>
                        <Clear/>
                </IconButton>
            </div>
        </div>
    );
}
